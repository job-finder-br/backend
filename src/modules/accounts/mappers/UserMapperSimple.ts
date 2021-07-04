import 'dotenv/config';
import { User } from '../domain';
import { IUserResponseMapper } from '../dtos';

class UserMapperSimple {
  public static render = ({
    id,
    email,
    name,
    avatar,
    phone_number,
    is_active,
    curriculum,
    description,
  }: User): IUserResponseMapper => {
    const avatar_uri = `${process.env.FIREBASE_URI_VIEW_FILES}avatars%2F${avatar}`;
    const curriculum_uri = `${process.env.FIREBASE_URI_VIEW_FILES}curriculums%2F${curriculum}`;

    return {
      id,
      name,
      description,
      email,
      avatar,
      avatar_uri,
      curriculum,
      curriculum_uri,
      phone_number,
      is_active,
    };
  };

  public static renderMany(users: User[]): IUserResponseMapper[] {
    return users.map(this.render);
  }
}

export { UserMapperSimple };
