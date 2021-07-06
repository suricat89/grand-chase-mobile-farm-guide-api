import * as bcrypt from 'bcrypt';
import environment from '../config/environment';

const _saltRounds = environment.security.passwordCrypto.saltRounds;

export const encode = async (decodedPassword: string) => {
  return bcrypt.hash(decodedPassword, _saltRounds);
};

export const match = async (
  decodedPassword: string,
  encodedPassword: string
) => {
  return bcrypt.compare(decodedPassword, encodedPassword);
};

export default bcrypt;
