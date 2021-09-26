import { State } from '../domain';

interface IStateRepository {
  create(name: string): Promise<State | undefined>;
  findByName(name: string): Promise<State | undefined>;
  findById(id: string): Promise<State | undefined>;
  list(): Promise<State[]>;
  save(data: State): Promise<void>;
}

export { IStateRepository };
