import { User } from "../entities/User";

import { ICreateUsersDTO } from "../dtos/ICreateUsersDTO";

interface IUsersRepository {
  create(CreateUserDTO: ICreateUsersDTO): Promise<User>;
  list(): Promise<User[]>;
  save(users: User): Promise<User>
  remove(users: User): Promise<User>;
  findByName(name: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>;
  

}
export { IUsersRepository }

