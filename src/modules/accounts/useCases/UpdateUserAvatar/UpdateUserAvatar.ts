import { inject, injectable } from 'tsyringe';

import { IStorageProvider } from '@infra/providers/StorageProvider/IStorageProvider';
import { IUsersRepository } from '@modules/accounts/repositories';
import { AppException } from '@shared/errors/AppException';

type IUpdateUserAvatarRequest = {
  user_id: string;
  avatar_file: string;
};

@injectable()
class UpdateUserAvatar {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({
    avatar_file,
    user_id,
  }: IUpdateUserAvatarRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppException({
        message: 'User not found, unauthorized!',
        statusCode: 401,
      });
    }

    if (user.avatar) {
      const [fileName] = user.avatar.split('?');

      await this.storageProvider.deleteFile('avatars', fileName);
    }

    const avatar_pointer = await this.storageProvider.saveFile(
      'avatars',
      avatar_file,
    );

    user.avatar = avatar_pointer;

    await this.usersRepository.save(user);
  }
}

export { UpdateUserAvatar };
