import base64
import json
import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv("/app/backend/.env")

import asyncio
from emergentintegrations.llm.openai.image_generation import OpenAIImageGeneration

OUTPUT_TS = Path("/app/web/src/lib/generated-images.ts")
OUTPUT_JSON = Path("/app/web/src/lib/generated-images.json")
OUTPUT_DIR = Path("/app/web/public/generated")

PROMPTS = [
    {
        "key": "hero",
        "prompt": "Semi-artistic luxury wedding presentation visual, elegant grand reception venue at blue hour, sculptural florals, navy gold and warm stone palette, cinematic lighting, layered textures, premium editorial atmosphere, refined composition for a modern wedding brand homepage, original image, no text, no watermark",
    },
    {
        "key": "rosewoodManor",
        "prompt": "Semi-artistic luxury wedding venue interior, intimate ballroom with warm stone drapery, amber candlelight, navy accent shadows, sophisticated aisle styling, premium editorial composition, original image, no text, no watermark",
    },
    {
        "key": "velvetBloom",
        "prompt": "Semi-artistic luxury wedding decor installation, sculptural floral arch with ivory, blush, mocha and soft gold tones, elegant staging, premium editorial styling, modern romantic mood, original image, no text, no watermark",
    },
    {
        "key": "goldenFrameStudio",
        "prompt": "Semi-artistic luxury wedding portrait scene, elegant couple in refined editorial pose, warm cinematic photography mood, navy and gold accents, graceful composition, premium wedding campaign look, original image, no text, no watermark",
    },
    {
        "key": "ivoryFeast",
        "prompt": "Semi-artistic luxury wedding tablescape and catering detail, plated dinner setup with candlelight, champagne stone linens, gold cutlery, floral styling, premium editorial presentation, original image, no text, no watermark",
    },
]


async def generate_with_retry(image_gen: OpenAIImageGeneration, prompt: str, retry_count: int = 1) -> bytes:
    attempt = 0
    while True:
        try:
            images = await image_gen.generate_images(
                prompt=prompt,
                model="gpt-image-1",
                number_of_images=1,
            )
            if not images:
                raise RuntimeError("No image was generated")
            return images[0]
        except Exception:
            attempt += 1
            if attempt > retry_count:
                raise
            await asyncio.sleep(2)


async def main() -> None:
    api_key = os.getenv("EMERGENT_LLM_KEY") or "sk-emergent-e19752285639221Ec1"
    image_gen = OpenAIImageGeneration(api_key=api_key)

    generated: dict[str, str] = {}
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for item in PROMPTS:
        print(f"Generating {item['key']}...")
        image_bytes = await generate_with_retry(image_gen, item["prompt"])
        image_path = OUTPUT_DIR / f"{item['key']}.png"
        image_path.write_bytes(image_bytes)
        generated[item["key"]] = f"/generated/{item['key']}.png"

    OUTPUT_JSON.write_text(json.dumps(generated, ensure_ascii=False, indent=2), encoding="utf-8")
    ts_content = "export const generatedImages = " + json.dumps(generated, ensure_ascii=False) + " as const;\n"
    OUTPUT_TS.write_text(ts_content, encoding="utf-8")
    print(f"Saved {len(generated)} images to {OUTPUT_TS}")


if __name__ == "__main__":
    asyncio.run(main())
