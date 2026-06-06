# Setup Firebase untuk RSVP System

## 📋 Langkah-Langkah Setup

### 1. Buat Firebase Project
1. Kunjungi [Firebase Console](https://console.firebase.google.com/)
2. Klik "Create Project" atau "Add Project"
3. Berikan nama project: `undangan-husaini-ayu`
4. Aktifkan Google Analytics (opsional)
5. Klik "Create Project" dan tunggu selesai

### 2. Setup Realtime Database
1. Di Firebase Console, pilih project Anda
2. Klik "Realtime Database" di menu kiri
3. Klik "Create Database"
4. Pilih lokasi: **Asia Southeast 1 (Singapore)**
5. Pilih mode: **Start in test mode** (untuk development)
6. Klik "Enable"

### 3. Dapatkan Konfigurasi Firebase
1. Di Firebase Console, klik ⚙️ (Settings) → Project Settings
2. Scroll ke bagian "Your apps"
3. Klik ikon Web (`</>`) untuk membuat web app
4. Berikan nama app: `undangan-rsvp`
5. Copy konfigurasi Firebase yang ditampilkan

### 4. Update `firebase-config.js`
1. Buka file `firebase-config.js` di text editor
2. Ganti nilai berikut dengan yang Anda dapat dari Firebase:

```javascript
const firebaseConfig = {
  apiKey: "GANTI_DENGAN_API_KEY_ANDA",
  authDomain: "GANTI_DENGAN_AUTH_DOMAIN_ANDA",
  databaseURL: "GANTI_DENGAN_DATABASE_URL_ANDA",
  projectId: "GANTI_DENGAN_PROJECT_ID_ANDA",
  storageBucket: "GANTI_DENGAN_STORAGE_BUCKET_ANDA",
  messagingSenderId: "GANTI_DENGAN_MESSAGING_SENDER_ID_ANDA",
  appId: "GANTI_DENGAN_APP_ID_ANDA"
};
```

3. Save file

### 5. Setup Security Rules (Realtime Database)
1. Di Firebase Console, buka "Realtime Database"
2. Klik tab "Rules"
3. Ganti dengan rules berikut:

```json
{
  "rules": {
    "guests": {
      ".read": true,
      ".write": true
    }
  }
}
```

4. Klik "Publish"

## 🔐 Keamanan Admin Panel

**Password default admin:** `admin123`

**PENTING: Ubah password di `admin.html` sebelum production!**

```javascript
// Di admin.html, cari bagian ini dan ubah:
const ADMIN_PASSWORD = 'admin123'; // Ganti dengan password yang lebih aman
```

## 📱 Fitur yang Tersedia

### Halaman Tamu (`index.html`)
- ✅ Formulir RSVP lengkap
- ✅ Validasi input
- ✅ Notifikasi submit status
- ✅ Data otomatis ke Firebase

### Admin Dashboard (`admin.html`)
- ✅ Login dengan password
- ✅ Statistik real-time (Total, Hadir, Tidak Hadir, Ragu)
- ✅ Filter status kehadiran
- ✅ Tabel daftar tamu lengkap
- ✅ Link WhatsApp direct ke nomor tamu
- ✅ Hapus data tamu
- ✅ Export CSV

### Landing Page (`klik.html`)
- ✅ Modal invitation cantik
- ✅ Redirect ke dashboard utama

## 🚀 Deployment di GitHub Pages

Semua file sudah siap untuk GitHub Pages:

1. **Frontend (HTML/CSS/JS)** - Hosted di GitHub Pages ✅
2. **Database (Firebase)** - Hosted di Firebase Cloud ✅
3. **Password protection** - Session storage di browser ✅

## 🔗 URLs

Setelah GitHub Pages aktif:
- Landing Page: `https://username.github.io/undangan-husaini-ayu/klik.html`
- Dashboard Undangan: `https://username.github.io/undangan-husaini-ayu/index.html`
- Admin Panel: `https://username.github.io/undangan-husaini-ayu/admin.html`

## ⚠️ Testing Mode vs Production

### Saat Development:
- Gunakan Firebase **Test Mode** (tidak perlu auth)
- Password admin bisa sederhana

### Saat Production (Undangan Real):
1. **Update Security Rules:**
   ```json
   {
     "rules": {
       "guests": {
         ".read": "root.child('adminSecret').val() == auth.uid",
         ".write": true
       }
     }
   }
   ```

2. **Gunakan Authentication:** Aktifkan Firebase Auth untuk admin
3. **Ubah Admin Password:** Ganti dengan password yang kuat
4. **Set Backup:** Enable automated backups di Firebase

## 📊 Melihat Data RSVP

### Opsi 1: Firebase Console
- Buka Firebase Console → Realtime Database
- Lihat structure: `guests → [id] → data tamu`

### Opsi 2: Admin Panel
- Buka `admin.html`
- Login dengan password
- Dashboard menampilkan semua data realtime

### Opsi 3: Export CSV
- Buka Admin Panel
- Klik tombol "Export CSV"
- File otomatis terdownload

## 🆘 Troubleshooting

### "Data tidak muncul di admin panel"
- ✅ Cek apakah Firebase credentials sudah benar di `firebase-config.js`
- ✅ Cek Security Rules di Firebase Console
- ✅ Pastikan browser console tidak ada error

### "Form RSVP tidak bisa submit"
- ✅ Buka browser console (F12)
- ✅ Cek error message
- ✅ Pastikan Firebase config sudah update

### "Admin login tidak bisa masuk"
- ✅ Cek password (default: `admin123`)
- ✅ Pastikan session storage tidak di-clear
- ✅ Coba refresh halaman

## 📝 Contoh Data Struktur Firebase

```
guests/
├── 1717638400000_abc123def456
│   ├── id: "1717638400000_abc123def456"
│   ├── name: "Bambang Sutrisno"
│   ├── email: "bambang@email.com"
│   ├── phone: "628123456789"
│   ├── status: "hadir"
│   ├── guestCount: 2
│   ├── message: "Amin, semoga lancar acara nikahnya"
│   └── timestamp: "2026-06-06T10:00:00.000Z"
└── 1717638500000_xyz789uvw012
    └── (data tamu lainnya)
```

## ✅ Checklist Sebelum Go Live

- [ ] Firebase project sudah dibuat
- [ ] Realtime Database sudah setup
- [ ] `firebase-config.js` sudah update dengan credentials
- [ ] Security Rules sudah di-set
- [ ] Admin password sudah diganti
- [ ] Test form RSVP di local
- [ ] Test admin login
- [ ] Push ke GitHub
- [ ] GitHub Pages aktif
- [ ] Test di mobile browser
- [ ] Share link ke tamu

---

**Pertanyaan? Hubungi tim development!** 🎉
