// Firebase Configuration
// Paste credentials dari Firebase Console (Project settings → Your apps)
// Jika belum membuat Realtime Database, buat terlebih dahulu dan tambahkan databaseURL di bawah

const firebaseConfig = {
  apiKey: "AIzaSyCaLUjIJah11qZhd-XHp1cxW0vzPaU4TWI",
  authDomain: "undangan-husaini-ayu-20d1d.firebaseapp.com",
  // Realtime Database URL (tambahkan seperti baris di bawah)
  databaseURL: "https://undangan-husaini-ayu-20d1d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "undangan-husaini-ayu-20d1d",
  storageBucket: "undangan-husaini-ayu-20d1d.firebasestorage.app",
  messagingSenderId: "814687073558",
  appId: "1:814687073558:web:3707417c17f80dfac84c37",
  measurementId: "G-908YZQSG4E"
};

// Initialize Firebase (compat)
firebase.initializeApp(firebaseConfig);
if (firebase.analytics) {
  try { firebase.analytics(); } catch (e) { console.warn('Analytics init failed', e); }
}

// Get reference ke Realtime Database
const database = firebase.database();

// Reference ke guest list
const guestRef = database.ref('guests');

// Fungsi untuk submit RSVP
function submitRSVP(formData) {
  const guestId = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  
  const guestData = {
    id: guestId,
    name: formData.guestName,
    email: formData.guestEmail,
    phone: formData.guestPhone,
    status: formData.attendanceStatus,
    guestCount: parseInt(formData.guestCount),
    message: formData.guestMessage || '',
    timestamp: new Date().toISOString()
  };

  return guestRef.child(guestId).set(guestData);
}

// Fungsi untuk ambil semua guest (untuk admin)
function getAllGuests(callback) {
  guestRef.on('value', (snapshot) => {
    const guests = [];
    snapshot.forEach((childSnapshot) => {
      const guest = childSnapshot.val();
      guest._key = childSnapshot.key;
      guests.push(guest);
    });
    callback(guests);
  });
}

// Fungsi untuk delete guest
function deleteGuest(guestId) {
  return guestRef.child(guestId).remove();
}
