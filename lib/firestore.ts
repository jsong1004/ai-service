import { Firestore } from '@google-cloud/firestore';
import { firebaseConfig } from '@/firebaseConfig';
import path from 'path';
import fs from 'fs';

let firestore: Firestore;

try {
  let credentials;
  
  if (process.env.NODE_ENV === 'production') {
    // In production (Cloud Run), use the mounted secret file
    credentials = {
      keyFilename: '/secrets/service-account-key/key.json',
    };
  } else {
    // In local development, use the environment variable
    const credentialsString = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    
    if (!credentialsString) {
      throw new Error('GOOGLE_APPLICATION_CREDENTIALS environment variable is not set.');
    }

    try {
      credentials = {
        credentials: JSON.parse(credentialsString),
      };
    } catch (e) {
      // Fallback for local development if it's a path
      credentials = {
        keyFilename: credentialsString,
      };
    }
  }

  firestore = new Firestore(credentials);
  console.log('Firestore initialized successfully.');

} catch (error) {
  console.error('Failed to initialize Firestore:', error);
  // Create a mock or dummy Firestore instance to prevent crashes
  firestore = {} as Firestore; 
}

export default firestore; 