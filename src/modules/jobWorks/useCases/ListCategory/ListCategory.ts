import { inject, injectable } from 'tsyringe';

import { Category } from '@modules/jobWorks/domain';
import { ICategoryRepository } from '@modules/jobWorks/repositories';

@injectable()
class ListCategory {
  constructor(
    @inject('CategoryRepository')
    private categoriesRepository: ICategoryRepository,
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();

    return categories;
  }
}

export { ListCategory };
