import { City } from '@modules/addresses/domain';
import { Category } from '@modules/jobWorks/domain';

type ICreateUserDTO = {
  name: string;

  email: string;

  description: string;

  password: string;

  phone_number: string;

  category?: Category;

  category_id?: string;

  city_name?: string;
  state_name?: string;

  city?: City;
  state?: string;
};

export { ICreateUserDTO };
