const User = require('../models/user');
import { Body, Controller, Post, Route, Security, Get, Path, Hidden, Put, Request } from "tsoa";
import { UserDto } from "../dtos/user-dto";
import { inject } from "inversify";
import { UserService } from "../services/user.service";
import { provideSingleton } from "../util/provide-singleton";

@Route("/api/users")
@Hidden()
@provideSingleton(UserController)
export class UserController extends Controller {  
  constructor(
      @inject(UserService) private userService: UserService
  ){
      super();
  }

@Get("{userID}")
    public async getByID(
        @Path() userID: string
    ): Promise<UserDto> {
        return await this.userService.getUserById(userID);
    }

}