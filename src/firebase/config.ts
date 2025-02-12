import { initializeApp } from "firebase/app";
import { getFirestore, query, where, doc, updateDoc } from "firebase/firestore";
import {
  getReactNativePersistence
} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { getStorage } from "firebase/storage";

import {
  initializeAuth,
} from "firebase/auth";
import 'firebase/compat/auth';
import { collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8EMggrcX6q5EQJaukJJ4IdtTAJeGV6E0",
  authDomain: "book-store-c2ded.firebaseapp.com",
  projectId: "book-store-c2ded",
  storageBucket: "book-store-c2ded.firebasestorage.app",
  messagingSenderId: "217887605432",
  appId: "1:217887605432:web:40ba7b41680adc5398aa4d",
  measurementId: "G-5H6YY1GTFJ"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Initialize Auth with React Native persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);
const firestore = getFirestore(app);

export {
  app, db, auth, collection, firestore, getDocs, query, updateDoc, where, doc, addDoc, storage
};