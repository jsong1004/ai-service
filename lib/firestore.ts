import { Firestore } from '@google-cloud/firestore';
import { firebaseConfig } from '@/firebaseConfig';
import path from 'path';
import fs from 'fs';

// Initialize Firestore client using the Firebase config
const firestoreConfig: any = {
  projectId: firebaseConfig.projectId,
  databaseId: 'ai-biz' // Explicitly specify the ai-biz database
};

// Use service account key file locally, credentials from environment in cloud
if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  // Cloud environment - GOOGLE_APPLICATION_CREDENTIALS contains the JSON content
  console.log('Using GOOGLE_APPLICATION_CREDENTIALS from Secret Manager');
  try {
    // Parse the JSON credentials
    const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    firestoreConfig.credentials = credentials;
  } catch (error) {
    console.error('Failed to parse GOOGLE_APPLICATION_CREDENTIALS:', error);
    // Fallback: try as file path
    firestoreConfig.keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  }
} else {
  // Local environment - use the service account key file
  console.log('Using local service account key file');
  firestoreConfig.keyFilename = path.join(process.cwd(), 'serviceAccountKey.json');
}

console.log('Firestore config:', { projectId: firestoreConfig.projectId, databaseId: firestoreConfig.databaseId });
const firestore = new Firestore(firestoreConfig);

export default firestore; 