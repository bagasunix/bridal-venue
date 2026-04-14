# Wedding Rental Demo App

Demo full-stack wedding rental app dengan:
- **Frontend:** Expo + React Native + Expo Router
- **Backend:** FastAPI
- **Database:** MongoDB
- **Mode integrasi:** webhook n8n masih **MOCKED** untuk demo

> Gunakan **npm**, bukan yarn.

## Struktur Project

```bash
/app
├── backend
│   └── server.py
├── frontend
│   ├── app
│   ├── presentation
│   ├── mock
│   └── package.json
└── README.md
```

## Menjalankan Frontend (npm)

Masuk ke folder frontend:

```bash
cd frontend
```

Install dependency:

```bash
npm install
```

Jalankan Expo:

```bash
npm run start
```

Shortcut lain:

```bash
npm run android
npm run ios
npm run web
npm run lint
```

## Menjalankan Backend

Masuk ke folder backend:

```bash
cd backend
```

Install dependency Python:

```bash
pip install -r requirements.txt
```

Jalankan FastAPI lokal:

```bash
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

## Environment

- Frontend membaca URL backend dari `EXPO_PUBLIC_BACKEND_URL`
- Backend membaca `MONGO_URL`, `DB_NAME`, dan optional webhook n8n dari file `.env`
- Di environment kerja ini, beberapa `.env` dikelola platform dan **jangan diubah sembarangan**

## Fitur Utama

- Home vendor list
- Vendor detail dengan hero image
- Booking form
- Custom calendar dengan status booked / available
- Dark mode auto + manual toggle
- Toggle tampilan vendor **Grid / List**
- Month switcher di kalender booking

## Catatan Penggunaan

- Dokumentasi ini memakai **npm** sebagai package manager utama
- Jika menemukan referensi lama ke yarn, abaikan dan pakai command npm di atas
