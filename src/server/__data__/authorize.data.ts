export const getAuthorizeData = async () => ({
  AUTHORIZE_E_002: {
    request:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwicHJvZmlsZSI6MCwiaWF0IjoxNjI1NjA3NjY2fQ.4DmF0cV7MfyBTB3x3m6EEt2TarhIRPhBsiVLI61wEoA',
  },
  AUTHORIZE_E_004: {
    request:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwicHJvZmlsZSI6MCwiaWF0IjoxNjI1NjA3NjY2fQ.4DmF0cV7MfyBTB3x3m6EEt2TarhIRPhBsiVLI61wEoA',
  },
});

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

const promise = getAuthorizeData();
export type IReturnAuthorizeData = ThenArg<typeof promise>;
