export const getSchemaValidateData = async () => ({
  VALIDATE_E_001: {
    request: {
      userName: 'initialUser',
    },
  },
  VALIDATE_E_002: {
    request: {
      userName: 'initialUser',
      password: '123',
    },
  },
});

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

const promise = getSchemaValidateData();
export type IReturnSchemaValidateData = ThenArg<typeof promise>;
