import { User } from '@modules/accounts/domain';

import { Category } from './Category';

type ICreateJobsWorks = {
  title: string;

  description: string;

  phone_number: string;

  email: string;

  type: string;

  remuneration_value: number;

  represents: string;

  user_id?: string;

  category_id?: string;

  category?: Category;

  user?: User;
};

export { ICreateJobsWorks };
