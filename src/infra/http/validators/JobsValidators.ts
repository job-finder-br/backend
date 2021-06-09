import { Joi, Segments } from 'celebrate';

const JobsValidators = {
  BODY: {
    [Segments.BODY]: Joi.object().keys({
      remuneration_value: Joi.number().required(),
      category_id: Joi.string().uuid().required(),
      email: Joi.string().email().required(),
      phone_number: Joi.string().required(),
      description: Joi.string().required(),
      state_name: Joi.string().required(),
      represents: Joi.string().required(),
      city_name: Joi.string().required(),
      title: Joi.string().required(),
      type: Joi.string().required(),
    }),
  },
  ID_PARAM: {
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  },
};

export { JobsValidators };
