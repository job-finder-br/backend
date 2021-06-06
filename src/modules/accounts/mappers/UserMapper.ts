import { User } from '../domain';
import { IUserResponseMapper } from '../dtos';

class UserMapper {
  public static render = ({
    id,
    email,
    name,
    avatar,
    category,
    city,
    phone_number,
    is_active,
    is_recolocation,
    jobs,
    curriculum,
    favorites_jobs,
    is_admin,
    description,
  }: User): IUserResponseMapper => ({
    id,
    email,
    name,
    avatar,
    category,
    city,
    phone_number,
    is_active,
    is_recolocation,
    jobs,
    curriculum,
    favorites_jobs,
    is_admin,
    description,
  });

  public static renderMany(users: User[]): IUserResponseMapper[] {
    return users.map(user => this.render(user));
  }
}

export { UserMapper };
