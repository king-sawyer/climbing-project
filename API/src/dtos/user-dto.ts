import { UserInterface } from "../models/user";

export class UserDto {
    UserID?: string;
    UserUuid?: string;
    Name?: string;
    Email?: string;
}

//Although Create and Edit are basically the same right now,
// it's worth separating them in anticipation of them diverging
export interface UserCreateDto{
    Name: string;
    Email: string;
}

export interface UserEditDto{
    UserUuid?: string;
    Name: string;
    Email: string;
}

export class UserDtoFactory {
    public static FromModel(user: UserInterface): UserDto {
        return {
            UserID: user.UserID.toString(),
            UserUuid: user.UserUuid,
            Name: user.Name,
            Email: user.Email
        }
    }
}
