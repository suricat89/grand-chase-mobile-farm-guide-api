export default {
  application: {
    name: 'grand-chase-mobile-farm-guide-api',
    port: process.env.PORT || 5000,
    environment: process.env.NODE_ENV || 'development',
  },
  firestore: {
    collections: {
      users: process.env.FIRESTORE_COLLECTION_USERS || 'users',
    },
  },
  security: {
    jwt: {
      secretKey: process.env.JWT_SECRET_KEY as string,
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
    defaultAdmin: {
      password: process.env.DEFAULT_ADMIN_PASSWORD || '123',
    },
    passwordCrypto: {
      saltRounds: 10,
    },
  },
};
