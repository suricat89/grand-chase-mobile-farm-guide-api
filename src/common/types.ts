import {FieldPath, WhereFilterOp, DocumentData} from '@google-cloud/firestore';
// import {UserSchema} from '../routes/user/types';

export interface RepositoryQueryArgs {
  field: string | FieldPath;
  operator: WhereFilterOp;
  value: unknown;
}

export interface BasicFirestoreModel {
  id?: string;
  isDeleted?: boolean;
  isActive?: boolean;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  deletedAt?: string | undefined;
}

export type CustomFirestoreModel = BasicFirestoreModel & DocumentData;

export type FullCustomModel<T> = T & CustomFirestoreModel;

export interface BusinessEnvelope<T extends CustomFirestoreModel> {
  meta: {
    self: string;
  };
  records: T[] | CustomFirestoreModel[];
}
