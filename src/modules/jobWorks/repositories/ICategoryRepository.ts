import { Category } from '../domain';

interface ICategoryRepository {
  findById(id: string): Promise<Category>;
  list(): Promise<Category[]>;
}

export { ICategoryRepository };
