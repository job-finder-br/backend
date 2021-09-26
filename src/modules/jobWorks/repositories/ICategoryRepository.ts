import { Category } from '../domain';

interface ICategoryRepository {
  findById(id: string): Promise<Category | undefined>;
  list(): Promise<Category[]>;
}

export { ICategoryRepository };
