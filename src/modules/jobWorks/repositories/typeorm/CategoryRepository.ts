import { getRepository, Repository } from 'typeorm';

import { Category } from '@modules/jobWorks/domain';

import { ICategoryRepository } from '../ICategoryRepository';

class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async findById(id: string): Promise<Category | undefined> {
    const category = await this.repository.findOne(id);

    return category;
  }

  async list(): Promise<Category[]> {
    const category = await this.repository.find();

    return category;
  }
}

export { CategoryRepository };
