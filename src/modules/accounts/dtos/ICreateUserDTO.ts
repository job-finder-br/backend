import { City } from '@modules/addresses/domain';
import { Category, JobWork } from '@modules/jobWorks/domain';

type ICreateUserDTO = {
  name: string;

  email: string;

  description: string;

  password: string;

  phone_number: string;

  is_recolocation?: boolean;
  is_admin?: boolean;

  category?: Category;

  avatar?: string;
  curriculum?: string;

  category_id?: string;

  city_name?: string;
  state_name?: string;

  favorites_jobs?: JobWork[];
  jobs?: JobWork[];
  city?: City;
  state?: string;
};

export { ICreateUserDTO };
