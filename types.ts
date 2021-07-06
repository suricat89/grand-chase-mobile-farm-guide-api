import {DocumentData} from '@google-cloud/firestore';

/*
 * Entities definition
 */

export interface UserSchema extends FirestoreModelWithData {
  userName: string;
  profile: UserProfile;
  password: string;
}

/*
 * Models defined to integrate the app entities with Firestore types
 */

interface BasicFirestoreModel {
  id?: string;
  isDeleted?: boolean;
  isActive?: boolean;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  deletedAt?: string | undefined;
}

type FirestoreModelWithData = BasicFirestoreModel & DocumentData;

export type CustomFirestoreModel<T> = T & FirestoreModelWithData;

/*
 * Misc types used globally
 */

export interface BusinessEnvelope<T extends FirestoreModelWithData> {
  meta: {
    self: string;
  };
  records: T[];
}

export enum UserProfile {
  admin,
  user,
}

export enum ValidateType {
  BODY,
  QUERY,
}
