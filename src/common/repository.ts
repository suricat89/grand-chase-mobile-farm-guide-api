import firestore from '../config/firestore';
import {utc} from 'moment';
import RepositoryQuery from './repositoryQuery';
import {CustomFirestoreModel, FullCustomModel} from './types';

export default class Repository<T> {
  collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  constructor(collection: string) {
    this.collection = firestore.collection(collection);
  }

  async find(queries: RepositoryQuery[] = []) {
    let query = this.collection.where('isDeleted', '==', false);
    queries.forEach(q => {
      query = query.where(q.field, q.operator, q.value);
    });

    const snapshot = await query.get();

    return snapshot.empty ? [] : (snapshot.docs.map(d => d.data()) as T[]);
  }

  async findById(id: string) {
    const snapshot = await this.collection.doc(id).get();

    return !snapshot.exists || snapshot.data()?.isDeleted
      ? undefined
      : snapshot.data();
  }

  async create(model: FullCustomModel<T>) {
    model = {
      ...model,
      isDeleted: false,
      isActive: true,
      createdAt: utc().format(),
      updatedAt: utc().format(),
    };

    const snapshot = this.collection.doc();
    model.id = snapshot.id;

    await snapshot.set(model);
    return model;
  }

  async update(id: string, model: FullCustomModel<T>) {
    model.updatedAt = utc().format();

    const snapshot = this.collection.doc(id);

    await snapshot.set(model, {merge: true});

    return model;
  }

  async delete(id: string) {
    const document: CustomFirestoreModel = {
      updatedAt: utc().format(),
      deletedAt: utc().format(),
      isDeleted: true,
    };

    const snapshot = this.collection.doc(id);

    await snapshot.set(document, {merge: true});

    return document;
  }
}
