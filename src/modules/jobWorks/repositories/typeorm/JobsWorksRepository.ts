import { getRepository, Repository } from 'typeorm';

import { ICreateJobsWorks, JobWork } from '@modules/jobWorks/domain';

import { IJobsWorkRepository } from '../IJobsWorkRepository';

class JobsWorksRepository implements IJobsWorkRepository {
  private repository: Repository<JobWork>;

  constructor() {
    this.repository = getRepository(JobWork);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async save(data: JobWork): Promise<void> {
    await this.repository.save(data);
  }

  async list(): Promise<JobWork[]> {
    return this.repository.find();
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
