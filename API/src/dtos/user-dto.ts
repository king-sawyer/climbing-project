
import { UserInterface } from "../models/user";

export class UserDto {
    UserID?: string;
    UserUuid?: string;
    Name?: string;
    Email?: string;
  }

  export class UserDtoFactory{
      public static FromModel(user: UserInterface) : UserDto{
          return {
              UserID: user.UserID.toString(),
              UserUuid: user.UserUuid,
              Name: user.Name,
              Email: user.Email
          }
      }
  }
  