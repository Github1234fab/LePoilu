import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const firebaseConfig = {
  apiKey: "AIzaSyAEwpAek6JuWKBWxCZRWHIpJpFtLmngzLE",
  authDomain: "bddjson.firebaseapp.com",
  projectId: "bddjson",
  storageBucket: "bddjson.firebasestorage.app",
  messagingSenderId: "797023585100",
  appId: "1:797023585100:web:2b0fe7ee054fdcc6a885e9",
  measurementId: "G-3JB2081G3X"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function importMocks() {
  const jsonPath = path.join(__dirname, '../mock_sponsors.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  console.log(`Starting import of ${data.length} mock sponsors...`);

  for (const sponsor of data) {
    const { id, ...sponsorData } = sponsor;
    
    // Convert date strings to Date objects if they exist
    if (sponsorData.updatedAt) sponsorData.updatedAt = new Date(sponsorData.updatedAt);
    if (sponsorData.stats && sponsorData.stats.lastViewDate) {
      sponsorData.stats.lastViewDate = new Date(sponsorData.stats.lastViewDate);
    }

    try {
      await setDoc(doc(db, "Sponsors", id), sponsorData);
      console.log(`✅ Imported: ${sponsorData.businessName} (${id})`);
    } catch (error) {
      console.error(`❌ Error importing ${id}:`, error);
    }
  }

  console.log("Import completed!");
  process.exit(0);
}

importMocks();
