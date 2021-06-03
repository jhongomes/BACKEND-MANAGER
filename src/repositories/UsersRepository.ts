
import { IUsersRepository } from "./IUsersRepository";
import { ICreateUsersDTO} from "../dtos/ICreateUsersDTO";
import { User } from "../entities/User";
import {  getRepository, Repository } from "typeorm";

class UsersRepository implements IUsersRepository{

    private ormRepository: Repository<User>

    constructor(){
        this.ormRepository = getRepository(User);
    }

    public async create({
        name,
        email,
        password,
    }: ICreateUsersDTO): Promise<User> {
        const users = this.ormRepository.create({
         name,
         email,
         password,
        });

        await this.ormRepository.save(users);


        return users
        
    }

    public async list(): Promise<User[]> {
        return this.ormRepository.find();

    }

    public async save(users: User): Promise<User> {
        return this.ormRepository.save(users);
    }

    public async remove(users: User): Promise<User> {
        return this.ormRepository.remove(users);
    }

    public async findByName(name: string): Promise<User | undefined> {
        return this.ormRepository.findOne(name);
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        return this.ormRepository.findOne(email);
    }

}
export { UsersRepository }