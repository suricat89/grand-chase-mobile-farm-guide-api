import {hostname} from 'os';
import {BusinessEnvelope, CustomFirestoreModel} from './types';

export default class Business<T> {
  envelope(documents: T[] | T | CustomFirestoreModel): BusinessEnvelope<T> {
    const response: BusinessEnvelope<T> = {
      meta: {
        self: hostname() || '',
      },
      records: [],
    };

    if (Array.isArray(documents)) {
      response.records = documents;
    } else if (documents) {
      response.records = [documents];
    }

    return response;
  }
}
