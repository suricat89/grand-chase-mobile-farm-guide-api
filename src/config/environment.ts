export default {
  application: {
    name: 'grand-chase-mobile-farm-guide-api',
    port: process.env.PORT || 5000,
    environment: process.env.NODE_ENV || 'development',
  },
  firestore: {
    collectionUsers: process.env.FIRESTORE_COLLECTION_USERS || 'users',
  },
};
