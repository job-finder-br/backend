import 'dotenv/config';
import { User } from '../domain';
import { IUserResponseMapper } from '../dtos';

class UserMapper {
  public static render = ({
    id,
    email,
    name,
    avatar,
    category,
    phone_number,
    is_active,
    is_recolocation,
    curriculum,
    description,
    city,
    jobs,
    favorites_jobs,
  }: User): IUserResponseMapper => {
    const avatar_uri = `${process.env.FIREBASE_URI_VIEW_FILES}avatars%2F${avatar}`;

    return {
      id,
      name,
      description,
      email,
      avatar,
      avatar_uri,
      curriculum,
      category,
      phone_number,
      city,
      jobs,
      favorites_jobs,
      is_recolocation,
      is_active,
    };
  };

  public static renderMany(users: User[]): IUserResponseMapper[] {
    return users.map(user => this.render(user));
  }
}

export { UserMapper };
