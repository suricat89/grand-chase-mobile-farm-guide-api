#! /usr/bin/env node
'use strict';
import {initServer} from '../server/server';
import {config} from 'dotenv-safe';
import environment from '../config/environment';

config();

initServer()
  .then(() => {
    console.info(`Server started on port ${environment.application.port}`);
  })
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(error.message);
    }
  });
