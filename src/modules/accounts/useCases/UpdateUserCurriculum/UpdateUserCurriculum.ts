import { inject, injectable } from 'tsyringe';

import { IStorageProvider } from '@infra/providers/StorageProvider/IStorageProvider';
import { IUsersRepository } from '@modules/accounts/repositories';
import { AppException } from '@shared/errors/AppException';

type IUpdateUserCurriculumRequest = {
  user_id: string;
  curriculum_file: string;
};

@injectable()
class UpdateUserCurriculum {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({
    curriculum_file,
    user_id,
  }: IUpdateUserCurriculumRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppException({
        message: 'User not found, unauthorized!',
        statusCode: 401,
      });
    }

    if (user.avatar) {
      const [fileName] = user.avatar.split('?');

      await this.storageProvider.deleteFile('curriculums', fileName);
    }

    const curriculum_pointer = await this.storageProvider.saveFile(
      'curriculums',
      curriculum_file,
    );

    user.curriculum = curriculum_pointer;

    await this.usersRepository.save(user);
  }
}

export { UpdateUserCurriculum };
