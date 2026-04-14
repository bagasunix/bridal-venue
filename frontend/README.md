# Frontend - Wedding Rental Demo App

Frontend ini dibangun dengan:
- Expo SDK 54
- React Native
- Expo Router
- TypeScript

> Gunakan **npm**, bukan yarn.

## Install

```bash
npm install
```

## Jalankan

```bash
npm run start
```

Command tambahan:

```bash
npm run android
npm run ios
npm run web
npm run lint
```

## Struktur penting

- `app/` → route Expo Router
- `presentation/` → screen, component, theme, provider
- `mock/` → mock vendor data dan base64 image asset

## Catatan

- Frontend mengambil backend URL dari `EXPO_PUBLIC_BACKEND_URL`
- Aplikasi ini memakai base64 image untuk kompatibilitas preview
- Dark mode mendukung mode **AUTO / LIGHT / DARK**
- Home screen mendukung toggle tampilan vendor **Grid / List**

## Reset starter scaffold

Kalau memang perlu reset scaffold Expo bawaan:

```bash
npm run reset-project
```

Untuk project ini, biasanya command tersebut **tidak perlu dijalankan**.
