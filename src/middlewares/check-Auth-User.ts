import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {ioc} from "../IoCContainer";

export class AuthCheckUserAuthorizationForUserAccount {
  async authCheck(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      res.sendStatus(401)
      return
    }
    const token = req.headers.authorization.split(' ')[1] // "bearer jdgjkad.jajgdj.jksadgj"
    const userId = await jwtService.getUserIdByToken(token)
    if (userId === null) {
      res.sendStatus(401)
      return
    }
    req.user = await ioc.usersAccountService.findUserByObjectId(userId)
    next()
    return
  }
}