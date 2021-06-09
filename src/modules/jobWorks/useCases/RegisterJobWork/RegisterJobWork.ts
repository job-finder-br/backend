import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories';
import { RegisterAddress } from '@modules/addresses/useCases/RegisterAddress';
import { ICreateJobsWorks } from '@modules/jobWorks/domain';
import {
  ICategoryRepository,
  IJobsWorkRepository,
} from '@modules/jobWorks/repositories';

@injectable()
class RegisterJobWork {
  constructor(
    @inject('JobsWorkRepository')
    private jobsWorkRepository: IJobsWorkRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CategoryRepository')
    private categoriesRepository: ICategoryRepository,

    private registerAdress: RegisterAddress,
  ) {}

  async execute({
    description,
    email,
    phone_number,
    remuneration_value,
    title,
    type,
    represents,
    user_id,
    category_id,
    city_name,
    state_name,
  }: ICreateJobsWorks): Promise<void> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new Error('User does not exists!');
    }

    const category = await this.categoriesRepository.findById(category_id);

    if (!category) {
      throw new Error('Category does not exists!');
    }

    const city = await this.registerAdress.execute({
      city_name,
      state_name,
    });

    await this.jobsWorkRepository.create({
      description,
      email,
      phone_number,
      represents,
      remuneration_value,
      title,
      type,
      user,
      category,
      city,
    });
  }
}

export { RegisterJobWork };
