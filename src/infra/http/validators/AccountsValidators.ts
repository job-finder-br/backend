import { Joi, Segments } from 'celebrate';

const AccountsValidators = {
  BODY: {
    [Segments.BODY]: Joi.object().keys({
      category_id: Joi.string().uuid().required(),
      description: Joi.string().required(),
      email: Joi.string().email().required(),
      name: Joi.string().required(),
      password: Joi.string().min(6).max(16).required(),
      phone_number: Joi.string().required(),
      state_name: Joi.string().required(),
      city_name: Joi.string().required(),
    }),
  },
  ID_PARAM: {
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  },
  BODY_UPDATE: {
    [Segments.BODY]: Joi.object().keys({
      category_id: Joi.string().uuid().required(),
      description: Joi.string().required(),
      name: Joi.string().required(),
      phone_number: Joi.string().required(),
      state_name: Joi.string().required(),
      city_name: Joi.string().required(),
    }),
  },
};

export { AccountsValidators };
