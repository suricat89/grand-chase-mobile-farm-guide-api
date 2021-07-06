import {Response} from 'express';
import {BusinessEnvelope} from '../../types';
import {StatusCodes} from 'http-status-codes';

export default class Controller<T> {
  render(res: Response) {
    return (data: BusinessEnvelope<T>) => {
      if (!data || !data.records || !data.records.length) {
        res.status(StatusCodes.NO_CONTENT).json();
        return;
      }

      res.status(StatusCodes.OK).json(data);
    };
  }
}
