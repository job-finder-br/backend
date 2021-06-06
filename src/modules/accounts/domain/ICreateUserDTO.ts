import { Category } from '@modules/jobWorks/domain';

type ICreateUserDTO = {
  name: string;

  username: string;

  email: string;

  description: string;

  password: string;

  phone_number: string;

  category?: Category;

  category_id?: string;
};

export { ICreateUserDTO };
