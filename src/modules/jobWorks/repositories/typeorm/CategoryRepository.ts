import { getRepository, Repository } from 'typeorm';

import { Category } from '@modules/jobWorks/domain';

import { ICategoryRepository } from '../ICategoryRepository';

class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  findById(id: string): Promise<Category> {
    return this.repository.findOne(id);
  }

  list(): Promise<Category[]> {
    return this.repository.find();
  }
}

export { CategoryRepository };
