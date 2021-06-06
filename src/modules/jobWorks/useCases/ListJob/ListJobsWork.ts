import { inject, injectable } from 'tsyringe';

import { JobWork } from '@modules/jobWorks/domain';
import { IJobsWorkRepository } from '@modules/jobWorks/repositories';

@injectable()
class ListJobsWork {
  constructor(
    @inject('JobsWorkRepository')
    private jobsWorkRepository: IJobsWorkRepository,
  ) {}

  async execute(): Promise<JobWork[]> {
    const jobs = await this.jobsWorkRepository.list();

    return jobs;
  }
}

export { ListJobsWork };
