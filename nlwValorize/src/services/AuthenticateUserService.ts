import { compare } from "bcryptjs"
import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { sign } from "jsonwebtoken"


interface IAuthenticateRequest{
    email: string,
    password: string
}


class AuthenticateUserService{

    async execute({email, password} : IAuthenticateRequest){
        const usersRepositories = getCustomRepository(UsersRepositories)
        
        //Verificar se email existe
        const user = await usersRepositories.findOne({
            email
        })

        if(!user){
            throw new Error("Email/Password incorrect")
        }

        //Verificar se senha ta correta
       const passwordMatch = await compare(password, user.password)

       if(!passwordMatch){
             throw new Error("Email/Password incorrect")
       }

       // Gerar Token
       const token = sign({
           email: user.email
       },"054cc9e8c194a102af04e2239068ad66",{
           subject : user.id,
           expiresIn: "1d"
       }
       )
       return token
    }
}

export { AuthenticateUserService }