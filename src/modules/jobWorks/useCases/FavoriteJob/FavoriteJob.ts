import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories';
import { IJobsWorkRepository } from '@modules/jobWorks/repositories';
import { AppException } from '@shared/errors/AppException';

type IFavoriteRequest = {
  user_id: string;
  job_id: string;
};

@injectable()
class FavoriteJob {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('JobsWorkRepository')
    private jobsWorkRepository: IJobsWorkRepository,
  ) {}

  async execute({ job_id, user_id }: IFavoriteRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppException({
        message: 'User does not exists!',
        statusCode: 404,
      });
    }

    const job = await this.jobsWorkRepository.findById(job_id);

    if (!job) {
      throw new AppException({
        message: 'Job Work does not exists!',
        statusCode: 404,
      });
    }

    user.favorites_jobs.push(job);

    await this.usersRepository.save(user);
  }
}

export { FavoriteJob };
