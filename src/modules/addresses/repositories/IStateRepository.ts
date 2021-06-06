import { ICreateAddressDTO, State } from '../domain';

interface IStateRepository {
  create(data: ICreateAddressDTO): Promise<State>;
  findByName(name: string): Promise<State>;
  findByAbbrev(abbrev: string): Promise<State>;
  findById(id: string): Promise<State>;
  list(): Promise<State[]>;
}

export { IStateRepository };
