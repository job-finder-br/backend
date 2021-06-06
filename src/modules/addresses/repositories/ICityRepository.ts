import { ICreateAddressDTO, State, City } from '../domain';

export interface ICrateCityDTO extends ICreateAddressDTO {
  state: State;
}

interface ICityRepository {
  create(data: ICrateCityDTO): Promise<City>;
  findByName(name: string): Promise<City>;
  findByAbbrev(abbrev: string): Promise<City>;
  findById(id: string): Promise<City>;
  list(): Promise<City[]>;
  save(data: City): Promise<void>;
}

export { ICityRepository };
