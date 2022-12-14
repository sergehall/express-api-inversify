import {Request, Response} from "express";
import {PayloadType} from "../types/tsTypes";
import {SecurityDevicesService} from "../domain/securityDevices-service";
import {inject, injectable} from "inversify";
import {TYPES} from "../types/types";
import {myContainer} from "../types/container";
import {JWTService} from "../application/jwt-service";

@injectable()
export class SecurityDevicesController {
  constructor(@inject(TYPES.SecurityDevicesService) protected securityDevicesService: SecurityDevicesService) {
  }

  async getAllDevices(req: Request, res: Response) {
    const jwtService = myContainer.resolve<JWTService>(JWTService)
    const refreshToken = req.cookies.refreshToken
    const payload: PayloadType = await jwtService.jwt_decode(refreshToken);
    const getDevices = await this.securityDevicesService.getAllDevices(payload)
    return res.send(getDevices)
  }

  async deleteAllDevicesExceptCurrent(req: Request, res: Response) {
    try {
      const jwtService = myContainer.resolve<JWTService>(JWTService)
      const refreshToken = req.cookies.refreshToken
      const payloadRefreshToken: PayloadType = await jwtService.jwt_decode(refreshToken)
      await this.securityDevicesService.deleteAllDevicesExceptCurrent(payloadRefreshToken)
      return res.sendStatus(204)
    } catch (e) {
      console.log(e)
      return res.sendStatus(500)
    }
  }

  async deleteDeviceByDeviceId(req: Request, res: Response) {
    const jwtService = myContainer.resolve<JWTService>(JWTService)
    try {
      const deletedId = req.params.deviceId
      const refreshToken = req.cookies.refreshToken
      const payloadRefreshToken: PayloadType = await jwtService.jwt_decode(refreshToken)

      const result = await this.securityDevicesService.deleteDeviceByDeviceId(deletedId, payloadRefreshToken)
      if (result === "204") {
        return res.sendStatus(204)
      }
      if (result === "404") {
        return res.sendStatus(404)
      }
      if (result === "403") {
        return res.sendStatus(403)
      }
      return res.send({result: result})
    } catch (e) {
      console.log(e)
      return res.sendStatus(500)
    }
  }
}