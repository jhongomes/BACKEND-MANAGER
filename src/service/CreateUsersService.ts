import { hash } from "bcryptjs";
import { User } from "../entities/User";
import AppError from "../errors/AppError";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";


interface IRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUsersService {
    private usersRepository: IUsersRepository;

    constructor(usersRepository: IUsersRepository){
        this.usersRepository = usersRepository;
    }

    public async execute({
        name,
        email,
        password,
    }:IRequest): Promise<User>{
        const passwordHash = await hash(password, 8);

        const users = await this.usersRepository.findByEmail(email);


        if(users){
            throw new AppError("User already exists!", 400);
        }

        const user = await this.usersRepository.create({
            name,
            email,
            password: passwordHash,        
        })

        return user;

    }

}
export { CreateUsersService }