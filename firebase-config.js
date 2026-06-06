// Firebase Configuration
// TODO: Ganti dengan credentials Firebase Anda sendiri

const firebaseConfig = {
  apiKey: "AIzaSyDemoKeyGantiBelakangan",
  authDomain: "undangan-husaini-ayu.firebaseapp.com",
  databaseURL: "https://undangan-husaini-ayu-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "undangan-husaini-ayu",
  storageBucket: "undangan-husaini-ayu.appspot.com",
  messagingSenderId: "123456789000",
  appId: "1:123456789000:web:abcdef1234567890"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

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
      guests.push(childSnapshot.val());
    });
    callback(guests);
  });
}

// Fungsi untuk delete guest
function deleteGuest(guestId) {
  return guestRef.child(guestId).remove();
}
