import { ICreateUserDTO } from './ICreateUserDTO';

interface IUserResponseMapper extends Omit<ICreateUserDTO, 'password'> {
  id: string;
  is_active: boolean;
  avatar_uri: string;
  curriculum_uri: string;
}

export { IUserResponseMapper };
