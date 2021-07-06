import * as joi from 'joi';

/**
 * @typedef UserSchema
 * @property {string} userName
 * @property {('admin' | 'user')} profile
 * @property {string} password
 */

export const getUserSchema = joi.object({
  userName: joi.string(),
  id: joi.string(),
});

export const userSchema = joi.object({
  userName: joi.string().required(),
  profile: joi.string().lowercase().valid('admin', 'user').required(),
  password: joi.string(),
});

export const updateUserSchema = joi.alternatives().try(
  joi.object({
    id: joi.string().required(),
    profile: joi.string().lowercase().valid('admin', 'user'),
    password: joi.string(),
  }),
  joi.object({
    userName: joi.string().required(),
    profile: joi.string().lowercase().valid('admin', 'user'),
    password: joi.string(),
  })
);

export const deleteUserSchema = joi.alternatives().try(
  joi.object({
    id: joi.string().required(),
  }),
  joi.object({
    userName: joi.string().required(),
  })
);

export const signInSchema = joi.object({
  userName: joi.string().required(),
  password: joi.string().required(),
});
