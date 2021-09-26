import { ICreateJobsWorks, JobWork } from '../domain';

interface IJobsWorkRepository {
  create(data: ICreateJobsWorks): Promise<void>;
  findByTitle(title: string): Promise<JobWork | undefined>;
  findByPhone(phone_number: string): Promise<JobWork | undefined>;
  findByEmail(email: string): Promise<JobWork | undefined>;
  findById(id: string): Promise<JobWork | undefined>;
  list(): Promise<JobWork[]>;
  listByCategoryId(category_id: string): Promise<JobWork[]>;
  save(data: JobWork): Promise<void>;
  delete(id: string): Promise<void>;
}

export { IJobsWorkRepository };
