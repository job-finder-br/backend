import { User } from '@modules/accounts/domain';

type ICreateJobsWorks = {
  title: string;

  description: string;

  phone_number: string;

  email: string;

  type: string;

  remuneration_value: number;

  represents: string;

  user_id?: string;

  user?: User;
};

export { ICreateJobsWorks };
