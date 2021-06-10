import {Response} from 'express';
import {NO_CONTENT, OK} from 'http-status';
import {BusinessEnvelope} from './types';

export default class Controller<T> {
  render(res: Response) {
    return (data: BusinessEnvelope<T>) => {
      if (!data || !data.records || !data.records.length) {
        res.status(NO_CONTENT).json();
        return;
      }

      res.status(OK).json(data);
    };
  }
}
