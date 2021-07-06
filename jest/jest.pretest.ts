import {waterfall} from 'async';
import {config} from 'dotenv';
import environment from '../src/config/environment';
import firestore from '../src/config/firestore';
import {getUserData} from '../src/routes/__data__/user.data';

config();

const getCollections = () => {
  return Object.values(environment.firestore.collections);
};

const cleanDatabase = async () => {
  const collections = getCollections();

  console.log(collections);

  for (let i = 0, length = collections.length; i < length; i++) {
    const collection = firestore.collection(collections[i]);
    const documents = await collection.listDocuments();
    documents.forEach(async doc => await doc.delete());
  }
};

const populateInitialData = async () => {
  const userCollection = firestore.collection(
    environment.firestore.collections.users
  );

  const userData = await getUserData();

  userData.initialData.forEach(async user => {
    const newUser = userCollection.doc();
    await newUser.set({
      ...user,
      id: newUser.id,
    });
  });
};

interface IWaterfallCallback {
  (error: unknown, ...args: unknown[]);
}

waterfall([
  (callback: IWaterfallCallback) => {
    cleanDatabase().then(callback(null));
  },
  (callback: IWaterfallCallback) => {
    populateInitialData().then(callback(null));
  },
]);
