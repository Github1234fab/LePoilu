import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { browser } from '$app/environment';

// Hardcoded config provided by user
const firebaseConfig = {
  apiKey: "AIzaSyAEwpAek6JuWKBWxCZRWHIpJpFtLmngzLE",
  authDomain: "bddjson.firebaseapp.com",
  projectId: "bddjson",
  storageBucket: "bddjson.firebasestorage.app",
  messagingSenderId: "797023585100",
  appId: "1:797023585100:web:2b0fe7ee054fdcc6a885e9",
  measurementId: "G-3JB2081G3X"
};

let app;
let auth;
let db;
let storage;

if (browser) {
    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApp();
    }
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    console.log("[Firebase] Initialized on client.");
}

// Helper for lazy loading if needed, but exports above will work in client components
const initFirebase = () => {
    return { auth, db, storage };
};

export { auth, db, storage, initFirebase };
