import { UserCreateDto, UserDto, UserDtoFactory, UserEditDto } from "../dtos/user-dto";
import User, { UserInterface } from "../models/user"
import { provideSingleton } from "../util/provide-singleton";

@provideSingleton(UserService)
export class UserService {
    public async list(): Promise<UserDto[]> {
        try {
            const userModels = await User.findAll();
            return userModels.map((x: UserInterface) => UserDtoFactory.FromModel(x));
        } catch (err) {
            console.error(err)
            //throw new InternalServerError("Failed to fetch users")
            throw new Error("Failed to fetch users");
        }
    }

    public async getUserById(userID: string): Promise<UserDto> {
        const user = await User.findByPk(userID);

        if (user === null) {
            //throw new NotFoundError("User Not Found");
            throw new Error("User not found");
        }

        return UserDtoFactory.FromModel(user);
    }

    public async addUser(newUser: UserCreateDto): Promise<UserDto> {
        try {
            var createdUser = await User.create(newUser);
        } catch (err) {
            console.error(err)
            throw new Error("Adding user failed");
            //throw new InternalServerError("Adding user failed");
        }
        console.log("We made it this far");
        return UserDtoFactory.FromModel(createdUser);
    }

    public async updateUser(userID: string, userEditDto: UserEditDto): Promise<UserDto> {
        let updatedUser;

        let currentUser: UserDto = User.findByPk(userID);

        if (!currentUser) {
            throw new Error("User not found");
        }

        currentUser.FirstName = userEditDto.FirstName;
        currentUser.LastName = userEditDto.LastName;
        currentUser.Email = userEditDto.Email;

        try {
            updatedUser = await User.update(
                currentUser,
                {
                    where: { UserID: userID },
                    returning: true,
                    plain: true
                });
        }
        catch (err) {
            console.error(err)
            //throw new InternalServerError("Failed to udate user");
            throw new Error("Failed to update user");
        }
        return UserDtoFactory.FromModel(updatedUser[1].dataValues);
    }

    public async deleteUser(userID: string) {
        let currentUser = User.findByPk(userID);

        if (!currentUser) {
            throw new Error("User not found");
        }

        try {
            await User.destroy(
                {
                    where:
                    {
                        UserID: userID
                    }
                });
        }
        catch (err) {
            console.error(err)
            //throw new InternalServerError("Failed to udate user");
            throw new Error("Failed to delete user");
        }
    }
}