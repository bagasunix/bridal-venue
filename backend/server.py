import asyncio
import logging
import os
import uuid
from calendar import monthrange
from datetime import date, datetime, timezone
from pathlib import Path
from typing import Any, Literal

import requests
from dotenv import load_dotenv
from fastapi import APIRouter, FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, field_validator
from starlette.middleware.cors import CORSMiddleware


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]
bookings_collection = db.get_collection("wedding_bookings")

app = FastAPI(title="Wedding Rental Demo API")
api_router = APIRouter(prefix="/api")


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


def build_mock_dates(day_offsets: list[int]) -> list[str]:
    today = datetime.now(timezone.utc).date()
    last_day = monthrange(today.year, today.month)[1]
    built_dates: list[str] = []
    for offset in day_offsets:
        day = min(max(today.day + offset, 2), last_day)
        built_dates.append(date(today.year, today.month, day).isoformat())
    return sorted(set(built_dates))


MOCK_BOOKED_DATES = {
    "rosewood-manor": build_mock_dates([2, 6, 10]),
    "velvet-bloom": build_mock_dates([4, 7, 11]),
    "golden-frame-studio": build_mock_dates([3, 8, 13]),
    "ivory-feast-catering": build_mock_dates([5, 9, 12]),
}


class BookingCreate(BaseModel):
    name: str = Field(min_length=2, max_length=60)
    phone: str = Field(min_length=7, max_length=24)
    vendor: str = Field(min_length=1, max_length=80)
    date: str = Field(pattern=r"^\d{4}-\d{2}-\d{2}$")
    package: str = Field(min_length=1, max_length=80)

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str) -> str:
        sanitized = "".join(character for character in value if character.isdigit() or character == "+")
        if len(sanitized.replace("+", "")) < 7:
            raise ValueError("Phone number looks too short")
        return value.strip()

    @field_validator("date")
    @classmethod
    def validate_date(cls, value: str) -> str:
        booking_date = datetime.strptime(value, "%Y-%m-%d").date()
        if booking_date < datetime.now(timezone.utc).date():
            raise ValueError("Booking date must be today or later")
        return value


class AvailabilityResponse(BaseModel):
    vendor_slug: str
    booked_dates: list[str]
    source: Literal["mock", "live", "hybrid"]
    live_configured: bool


class BookingResponse(BaseModel):
    booking_id: str
    vendor: str
    date: str
    package: str
    source: Literal["mock", "live", "hybrid"]
    submitted_to_n8n: bool
    message: str
    created_at: str


class IntegrationStatusResponse(BaseModel):
    mode: Literal["mock", "live"]
    availability_webhook_configured: bool
    booking_webhook_configured: bool


def webhook_mode() -> Literal["mock", "live"]:
    availability_ready = bool(os.getenv("N8N_AVAILABILITY_WEBHOOK_URL", "").strip())
    booking_ready = bool(os.getenv("N8N_BOOKING_WEBHOOK_URL", "").strip())
    return "live" if availability_ready and booking_ready else "mock"


def validate_iso_dates(raw_dates: list[str]) -> list[str]:
    valid_dates: set[str] = set()
    for raw_date in raw_dates:
        try:
            datetime.strptime(raw_date, "%Y-%m-%d")
            valid_dates.add(raw_date)
        except ValueError:
            logger.warning("Ignoring invalid date from external source: %s", raw_date)
    return sorted(valid_dates)


async def get_saved_dates(vendor_slug: str) -> list[str]:
    cursor = bookings_collection.find({"vendor": vendor_slug}, {"_id": 0, "date": 1})
    records = await cursor.to_list(length=200)
    return sorted({record["date"] for record in records if record.get("date")})


async def fetch_live_dates(vendor_slug: str) -> list[str]:
    availability_url = os.getenv("N8N_AVAILABILITY_WEBHOOK_URL", "").strip()
    if not availability_url:
        return []

    def request_live_dates() -> Any:
        response = requests.get(
            availability_url,
            params={"vendor": vendor_slug},
            timeout=10,
        )
        response.raise_for_status()
        return response.json()

    try:
        payload = await asyncio.to_thread(request_live_dates)
        if isinstance(payload, list):
            return validate_iso_dates(payload)
        if isinstance(payload, dict):
            raw_dates = payload.get("booked_dates") or payload.get("dates") or []
            if isinstance(raw_dates, list):
                return validate_iso_dates(raw_dates)
        return []
    except requests.RequestException as exc:
        logger.warning("Failed to fetch live availability: %s", exc)
        return []


async def get_unavailable_dates(vendor_slug: str) -> tuple[list[str], Literal["mock", "live", "hybrid"]]:
    mock_dates = MOCK_BOOKED_DATES.get(vendor_slug, [])
    saved_dates = await get_saved_dates(vendor_slug)
    live_dates = await fetch_live_dates(vendor_slug)
    merged = sorted(set(mock_dates + saved_dates + live_dates))

    if live_dates and (mock_dates or saved_dates):
        return merged, "hybrid"
    if live_dates:
        return merged, "live"
    return merged, "mock"


async def forward_booking_to_n8n(payload: dict[str, Any]) -> bool:
    booking_url = os.getenv("N8N_BOOKING_WEBHOOK_URL", "").strip()
    if not booking_url:
        await asyncio.sleep(0.8)
        return False

    def post_booking() -> None:
        response = requests.post(booking_url, json=payload, timeout=10)
        response.raise_for_status()

    try:
        await asyncio.to_thread(post_booking)
        return True
    except requests.RequestException as exc:
        logger.warning("Failed to forward booking to n8n: %s", exc)
        return False


@api_router.get("/")
async def root() -> dict[str, str]:
    return {"message": "Wedding rental demo API is running."}


@api_router.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "mode": webhook_mode()}


@api_router.get("/integration-status", response_model=IntegrationStatusResponse)
async def integration_status() -> IntegrationStatusResponse:
    return IntegrationStatusResponse(
        mode=webhook_mode(),
        availability_webhook_configured=bool(os.getenv("N8N_AVAILABILITY_WEBHOOK_URL", "").strip()),
        booking_webhook_configured=bool(os.getenv("N8N_BOOKING_WEBHOOK_URL", "").strip()),
    )


@api_router.get("/availability/{vendor_slug}", response_model=AvailabilityResponse)
async def get_availability(vendor_slug: str) -> AvailabilityResponse:
    booked_dates, source = await get_unavailable_dates(vendor_slug)
    return AvailabilityResponse(
        vendor_slug=vendor_slug,
        booked_dates=booked_dates,
        source=source,
        live_configured=webhook_mode() == "live",
    )


@api_router.post("/bookings", response_model=BookingResponse, status_code=201)
async def create_booking(booking: BookingCreate) -> BookingResponse:
    booked_dates, source = await get_unavailable_dates(booking.vendor)
    if booking.date in booked_dates:
        raise HTTPException(status_code=409, detail="Date not available")

    created_at = datetime.now(timezone.utc).isoformat()
    booking_id = str(uuid.uuid4())
    booking_record = {
        "id": booking_id,
        **booking.model_dump(),
        "created_at": created_at,
    }
    await bookings_collection.insert_one(dict(booking_record))
    submitted_to_n8n = await forward_booking_to_n8n({**booking.model_dump(), "booking_id": booking_id})

    return BookingResponse(
        booking_id=booking_id,
        vendor=booking.vendor,
        date=booking.date,
        package=booking.package,
        source="live" if submitted_to_n8n and source == "live" else source,
        submitted_to_n8n=submitted_to_n8n,
        message="Booking confirmed and ready for your workflow.",
        created_at=created_at,
    )


app.include_router(api_router)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client() -> None:
    client.close()
