import { Firestore } from '@google-cloud/firestore';
import path from 'path';

let firestore: Firestore;

try {
  // Set the service account key file path for Google Cloud SDK
  process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve('./serviceAccountKey.json');

  // Initialize Firestore with the service account
  firestore = new Firestore({
    projectId: 'ai-biz-6b7ec',
  });
  
  console.log('Firestore initialized successfully.');

} catch (error) {
  console.error('Failed to initialize Firestore:', error);
  // Create a mock or dummy Firestore instance to prevent crashes
  firestore = {} as Firestore; 
}

export default firestore;
export { firestore as db };