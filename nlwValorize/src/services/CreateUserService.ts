import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IUserRequest{
    name: string;
    email: string;
    admin?: boolean

}

//Solid principals
class CreateUserService{

    async execute({ name, email, admin} : IUserRequest){

        const usersRepository = getCustomRepository(UsersRepositories)

        const userAlreadyExists = await usersRepository.findOne({
            email
        })

        if(!email){
            throw new Error("Email incorrect")
        }

        if(userAlreadyExists){
            throw new Error("User already exists")
        }

        const user = usersRepository.create({
            name,
            email,
            admin
        })

        await usersRepository.save(user)

        return user
    }

}

export {CreateUserService}