import { inject, injectable } from 'tsyringe';

import { IJobsWorkRepository } from '@modules/jobWorks/repositories';
import { AppException } from '@shared/errors/AppException';

type IUpdateRequest = {
  job_id: string;
  user_id: string;
};

@injectable()
class DeleteJobWork {
  constructor(
    @inject('JobsWorkRepository')
    private jobsWorkRepository: IJobsWorkRepository,
  ) {}

  async execute({ job_id, user_id }: IUpdateRequest): Promise<void> {
    const job = await this.jobsWorkRepository.findById(job_id);

    if (!job) {
      throw new AppException({
        message: 'Job listing not found!',
        statusCode: 404,
      });
    }

    if (job.fk_user_id !== user_id) {
      throw new AppException({
        message: 'This job listing cannot be updated by this user!',
        statusCode: 403,
      });
    }

    job.users_favorites = [];

    job.user = undefined;
    job.category = undefined;

    await this.jobsWorkRepository.save(job);

    await this.jobsWorkRepository.delete(job_id);
  }
}

export { DeleteJobWork };
