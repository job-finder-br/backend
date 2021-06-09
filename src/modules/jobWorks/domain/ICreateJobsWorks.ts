import { User } from '@modules/accounts/domain';
import { City } from '@modules/addresses/domain';

import { Category } from './Category';

type ICreateJobsWorks = {
  title: string;

  description: string;

  phone_number: string;

  email: string;

  type: string;

  remuneration_value: number;

  represents: string;

  city_name?: string;
  state_name?: string;
  city?: City;

  category_id?: string;
  category?: Category;

  user_id?: string;
  user?: User;
};

export { ICreateJobsWorks };
