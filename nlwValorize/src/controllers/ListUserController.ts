import { Request, Response } from "express";
import { ListUsersService } from "../services/ListUsersService";

class ListUserController{
    async hanndle(request: Request, response: Response){

        const listUsersService = new ListUsersService()

        const users = await listUsersService.execute();

        return response.json(users)
    }

}

export {ListUserController}