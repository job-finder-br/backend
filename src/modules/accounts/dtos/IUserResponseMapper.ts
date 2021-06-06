import { ICreateUserDTO } from './ICreateUserDTO';

interface IUserResponseMapper extends Omit<ICreateUserDTO, 'password'> {
  id: string;
  is_active: boolean;
}

export { IUserResponseMapper };