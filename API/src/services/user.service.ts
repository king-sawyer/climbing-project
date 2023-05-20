import { UserDto, UserDtoFactory } from "../dtos/user-dto";
import User from "../models/user"
import { provideSingleton } from "../util/provide-singleton";

@provideSingleton(UserService)
export class UserService{
    public async getUserById(userID: string): Promise<UserDto> {
        const user = await User.findByPk(userID);

        if (user === null){
            //throw new NotFoundError("User Not Found");
            throw new Error("User not found");
        }

        return UserDtoFactory.FromModel(user);
    }
}