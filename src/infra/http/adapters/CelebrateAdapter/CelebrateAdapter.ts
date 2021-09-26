import { celebrate, SchemaOptions } from 'celebrate';

type CelebrateResponse = {
  abortEarly: boolean;
  messages: {
    'any.required': string;
    'string.empty': string;
    'string.min': string;
    'string.max': string;
  };
};

class CelebrateAdapter {
  private static message = (): CelebrateResponse => ({
    abortEarly: false,
    messages: {
      'any.required': 'This Field is required!',
      'string.empty': 'Requires the field to be filled!',
      'string.min': 'The {#label} has a minimum limit of {#limit} digits',
      'string.max': 'The {#label} has a maximum limit of {#limit} digits',
    },
  });

  static apply = (validationFilds: SchemaOptions): any =>
    celebrate(validationFilds, CelebrateAdapter.message());
}

export { CelebrateAdapter };
