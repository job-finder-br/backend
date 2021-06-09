import { inject, injectable } from 'tsyringe';

import { JobWork } from '@modules/jobWorks/domain';
import { IJobsWorkRepository } from '@modules/jobWorks/repositories';

type IFilterRequest = {
  category_id: string;
};

@injectable()
class ListJobsWork {
  constructor(
    @inject('JobsWorkRepository')
    private jobsWorkRepository: IJobsWorkRepository,
  ) {}

  async execute(filters: IFilterRequest): Promise<JobWork[]> {
    if (filters.category_id) {
      return this.jobsWorkRepository.listByCategoryId(filters.category_id);
    }

    return this.jobsWorkRepository.list();
  }
}

export { ListJobsWork };
