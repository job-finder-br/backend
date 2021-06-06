import { ICreateAddressDTO, State, City } from '../domain';

export interface ICrateCityDTO extends ICreateAddressDTO {
  state: State;
}

interface ICityRepository {
  create(data: ICrateCityDTO): Promise<City>;
  findByName(name: string): Promise<City | undefined>;
  list(): Promise<City[]>;
  save(data: City): Promise<void>;
}

export { ICityRepository };
