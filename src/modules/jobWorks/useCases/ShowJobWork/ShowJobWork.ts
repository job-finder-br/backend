import { inject, injectable } from 'tsyringe';

import { JobWork } from '@modules/jobWorks/domain';
import { IJobsWorkRepository } from '@modules/jobWorks/repositories';
import { AppException } from '@shared/errors/AppException';

@injectable()
class ShowJobWork {
  constructor(
    @inject('JobsWorkRepository')
    private jobsWorkRepository: IJobsWorkRepository,
  ) {}

  async execute(id: string): Promise<JobWork> {
    const job = await this.jobsWorkRepository.findById(id);

    if (!job) {
      throw new AppException({
        message: 'Job does not exists!',
        statusCode: 404,
      });
    }

    return job;
  }
}

export { ShowJobWork };
