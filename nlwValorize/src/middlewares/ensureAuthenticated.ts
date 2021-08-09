import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface IPayload{
  sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){

    //Receber token
    const authToken = request.headers.authorization

    //Validar se token esta preenchido
    if(!authToken){
        return response.status(401).end()
    }

    //Validar se token é válido
    //Recuperar informações do usuário
    const [,token] = authToken.split(" ")

  try {
    const { sub } = verify(token,"054cc9e8c194a102af04e2239068ad66") as IPayload

    request.user_id = sub

  } catch (error) {
      return response.status(401).end();
  }

    return next()
}