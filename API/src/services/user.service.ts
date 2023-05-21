import { UserCreateDto, UserDto, UserDtoFactory, UserEditDto } from "../dtos/user-dto";
import User, { UserInterface } from "../models/user"
import { provideSingleton } from "../util/provide-singleton";

@provideSingleton(UserService)
export class UserService{
    public async list(): Promise<UserDto[]> {
        try {
            const userModels = await User.findAll();
            return userModels.map((x:UserInterface) => UserDtoFactory.FromModel(x));
        } catch (err) {
            console.error(err)
            //throw new InternalServerError("Failed to fetch users")
            throw new Error("Failed to fetch users");
        }
    }

    public async getUserById(userID: string): Promise<UserDto> {
        const user = await User.findByPk(userID);

        if (user === null){
            //throw new NotFoundError("User Not Found");
            throw new Error("User not found");
        }

        return UserDtoFactory.FromModel(user);
    }

    public async addUser(user: UserCreateDto): Promise<UserDto> {

        const xyz = user as UserInterface;

        const newUser = new User(user);

        try {
            await User.create(newUser);
         } catch (err){
             console.error(err)
             throw new Error("Adding user failed");
             //throw new InternalServerError("Adding user failed");
         }

        return UserDtoFactory.FromModel(newUser);
    }

    public async updateUser(userID: string, userEditDto: UserEditDto): Promise<UserDto> {
        let updatedUser;

        try {
            updatedUser = await User.Update(
                {
                    name : userEditDto.Name,
                    email : userEditDto.Email
                },
                {
                    where : {UserID : userID},
                    returning : true
                });
        }
        catch (err){
            console.error(err)
            //throw new InternalServerError("Failed to udate user");
            throw new Error("Failed to update user");
        }

        return UserDtoFactory.FromModel(updatedUser);
    }
}