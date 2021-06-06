import { getRepository, Repository } from 'typeorm';

import { Category } from '@modules/jobWorks/domain';

import { ICategoryRepository } from '../ICategoryRepository';

class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async findById(id: string): Promise<Category | undefined> {
    return this.repository.findOne(id);
  }

  async list(): Promise<Category[]> {
    return this.repository.find();
  }
}

export { CategoryRepository };
