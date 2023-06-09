const User = require('../models/user');
import { Body, Controller, Post, Route, Security, Get, Path, Hidden, Put, Request, Delete } from "tsoa";
import { UserCreateDto, UserDto, UserEditDto } from "../dtos/user-dto";
import { inject } from "inversify";
import { UserService } from "../services/user.service";
import { provideSingleton } from "../util/provide-singleton";

@Route("/api/users")
@Hidden()
@provideSingleton(UserController)
export class UserController extends Controller {
    constructor(
        @inject(UserService) private userService: UserService
    ) {
        super();
    }

    @Get("")
    public async list() : Promise<UserDto[]>{
        console.log("Hello");
        console.log("Bellow");
        return await this.userService.list()
    }

    @Post("")
    public async createUser(
        @Body() user: UserCreateDto
    ) {
        const newUser = await this.userService.addUser(user);
        return newUser;
    }

    @Get("{userID}")
    public async getByID(
        @Path() userID: string
    ): Promise<UserDto> {
        return await this.userService.getUserById(userID);
    }

    @Put("{userID}")
    public async updateUser(
        @Path() userID: string,
        @Body() userEditDto: UserEditDto

    ): Promise<UserDto> {
        return await this.userService.updateUser(userID, userEditDto);
    }

    @Delete("{userID}")
    public async deleteUser(
        @Path() userID: string
    ){
        return await this.userService.deleteUser(userID);
    }
}