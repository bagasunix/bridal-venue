# Wedding Rental Demo App PRD

## Problem Statement
Bangun aplikasi mobile demo wedding rental dengan Expo/React Native yang menampilkan daftar vendor, detail vendor, booking form, dan halaman sukses. Aplikasi ini fokus pada frontend premium bertema wedding dan integrasi webhook n8n yang saat ini berjalan dalam mode **MOCKED** untuk cek ketersediaan tanggal dan submit booking.

## Architecture
- **Frontend:** Expo Router + React Native + TypeScript
- **UI Layer:** `frontend/presentation/screens` dan `frontend/presentation/components`
- **Mock Data:** `frontend/mock/vendors.ts`, `frontend/mock/imageAssets.ts`, `frontend/mock/images/*`
- **API Client:** `frontend/services/api.ts`, `availability.ts`, `webhook.ts`
- **Backend:** FastAPI di `backend/server.py`
- **Storage:** MongoDB lokal untuk menyimpan booking demo
- **Routing Prefix:** semua endpoint backend di bawah `/api`

## Implemented
- Home screen dengan daftar 4 vendor wedding
- Vendor detail screen dengan gambar hero, paket, dan tombol cek availability
- Booking screen dengan custom calendar grid dan form nama/telepon/paket
- Success screen dengan ringkasan booking
- Redesign visual menyeluruh dengan gaya **minimal luxury**
- Sistem warna baru **Midnight plum + copper** untuk light/dark theme
- Dark mode **auto + manual toggle** (cycle AUTO / DARK / LIGHT) dengan penyimpanan preferensi lokal
- Layout dibuat lebih responsif dan seimbang untuk mobile + web preview
- Animasi halus untuk entrance card dan state sukses
- Endpoint backend:
  - `GET /api/health`
  - `GET /api/availability/{vendor_slug}`
  - `POST /api/bookings`
  - `GET /api/integration-status`
- Gambar vendor berbentuk base64 telah dipecah ke file terpisah di `frontend/mock/images/`
- Fallback frontend ke mock local jika request backend gagal

## Verification Completed
- Preview frontend berhasil dimuat
- Gambar base64 hasil split berhasil tampil di Home dan Vendor Detail
- Calendar grid berhasil menandai tanggal booked sebagai merah/nonaktif
- Tanggal tersedia berhasil dipilih
- Submit booking berhasil menuju Success screen
- Backend endpoint health, availability, dan booking mengembalikan respons valid
- Redesign baru tervalidasi secara visual lewat static web build lokal pada Home, Vendor Detail, dan Booking
- Manual dark mode toggle tervalidasi berjalan
- TypeScript frontend lulus `tsc --noEmit`

## Current Status
- App demo end-to-end berfungsi
- Integrasi n8n masih **MOCKED** sampai webhook live diberikan/diaktifkan
- Public preview Expo masih dapat terganggu oleh limit tunnel eksternal, tetapi build statis lokal berhasil diekspor dan tervalidasi

## Backlog
### P0
- Tidak ada blocker aktif; flow demo utama sudah terverifikasi

### P1
- Ganti webhook mock dengan webhook n8n live saat URL final tersedia
- Tambahkan navigasi bulan berikutnya/sebelumnya pada calendar grid
- Tambahkan state error/loading yang lebih eksplisit untuk submit booking
- Validasi ulang redesign pada preview publik ketika tunnel kembali stabil

### P2
- Simpan riwayat booking demo per device
- Tambahkan filter vendor per kategori
- Tambahkan animasi transisi antar screen yang lebih halus