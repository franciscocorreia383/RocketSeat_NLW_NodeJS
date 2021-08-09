import { Request, Response } from "express"
import { AuthenticateUserService } from "../services/AuthenticateUserService"

class AuthenticateUserController{

    async handle(request: Request, response: Response){

        const { email, password } = request.body

        const authenticateUserSevice = new AuthenticateUserService();

        const token = await authenticateUserSevice.execute({
            email,
            password
        })

        return response.json(token)
    }

}

export { AuthenticateUserController }