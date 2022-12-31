import { User } from "../entity/User";

export class UserResponse {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string
  ) {}

  public static toDto(user: User): UserResponse {
    return new UserResponse(user.id, user.firstName, user.lastName, user.email);
  }

  public static toDtos(users: User[]): UserResponse[] {
    let userResponses: UserResponse[] = [];
    users.forEach((user: User) => {
      userResponses.push(UserResponse.toDto(user));
    });
    return userResponses;
  }
}
