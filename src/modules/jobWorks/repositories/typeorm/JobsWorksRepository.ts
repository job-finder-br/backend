import { getRepository, Repository } from 'typeorm';

import { ICreateJobsWorks, JobWork } from '@modules/jobWorks/domain';

import { IJobsWorkRepository } from '../IJobsWorkRepository';
import { UserMapperSimple } from '@modules/accounts/mappers/UserMapperSimple';
import { User } from '@modules/accounts/domain';

class JobsWorksRepository implements IJobsWorkRepository {
  private repository: Repository<JobWork>;

  constructor() {
    this.repository = getRepository(JobWork);
  }

  async listByCategoryId(category_id: string): Promise<JobWork[]> {
    const jobs = await this.repository.find({
      relations: ['category', 'user'],
      where: {
        fk_category_id: category_id,
      },
    });

    const jobsResponse = jobs.map(element => {
      element.user = UserMapperSimple.render(element.user) as unknown as User;

      return element;
    });

    return jobsResponse;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async save(data: JobWork): Promise<void> {
    await this.repository.save(data);
  }

  async list(): Promise<JobWork[]> {
    const jobs = await this.repository.find({
      relations: ['user'],
    });

    const jobsResponse = jobs.map(element => {
      element.user = UserMapperSimple.render(element.user) as unknown as User;

      return element;
    });

    return jobsResponse;
  }

  async findById(id: string): Promise<JobWork | undefined> {
    return this.repository.findOne(id);
  }

  async findByEmail(email: string): Promise<JobWork | undefined> {
    return this.repository.findOne({ email });
  }

  async create(data: ICreateJobsWorks): Promise<void> {
    const job = this.repository.create(data);

    await this.repository.save(job);
  }

  async findByTitle(title: string): Promise<JobWork | undefined> {
    return this.repository.findOne({ title });
  }

  async findByPhone(phone_number: string): Promise<JobWork | undefined> {
    return this.repository.findOne({ phone_number });
  }
}

export { JobsWorksRepository };
