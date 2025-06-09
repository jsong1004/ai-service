// firebaseConfig.ts

// IMPORTANT: Replace these placeholder values with your actual Firebase project configuration.
// You can find this in your Firebase project settings:
// Project Settings > General > Your apps > Web app > SDK setup and configuration
//
// WARNING: Do NOT commit your actual API keys and sensitive configuration details to a public repository.
// In a production environment, use environment variables or other secure methods to manage this configuration.

export const firebaseConfig = {
  apiKey: "AIzaSyAB9462ndefnzzJg44HPa40P3m9vwPUFw0",
  authDomain: "myresume-457817.firebaseapp.com",
  projectId: "myresume-457817",
  storageBucket: "myresume-457817.firebasestorage.app",
  messagingSenderId: "711582759542",
  appId: "1:711582759542:web:a2921fbd9a2967fae57d57",
  measurementId: "G-BSN3FGV679"
};

// For your specific database "investorhub" within the project "myresume-457817"
// The above projectId should match. If "investorhub" is a separate database instance
// within the same project, Firestore will typically use the default database unless specified.
// If you have multiple Firestore databases in the same project (requires Blaze plan),
// you might need additional configuration when initializing Firestore, but for most cases,
// specifying the correct projectId is sufficient.