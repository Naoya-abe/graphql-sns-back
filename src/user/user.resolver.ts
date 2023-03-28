import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UserModel } from './models/user.model';
import { UserService } from './user.service';

@Resolver((of) => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserModel], { name: 'users' })
  async getUsers() {
    return [
      {
        id: '1',
        email: 'test@example.com',
        nickname: 'testuser',
        selfIntroduction: 'Hello, I am a test user!',
        createdAt: new Date('2022-03-27T10:00:00Z'),
        updatedAt: new Date('2022-03-27T12:00:00Z'),
      },
      {
        id: '2',
        email: 'john@example.com',
        nickname: 'johnsmith',
        selfIntroduction: 'Hi, I am John Smith!',
        createdAt: new Date('2022-03-28T09:00:00Z'),
        updatedAt: new Date('2022-03-28T10:30:00Z'),
      },
      {
        id: '3',
        email: 'jane@example.com',
        nickname: 'jane_doe',
        selfIntroduction: 'Nice to meet you! I am Jane Doe.',
        createdAt: new Date('2022-03-29T14:00:00Z'),
        updatedAt: new Date('2022-03-29T15:20:00Z'),
      },
    ];
  }

  @Mutation(() => UserModel, { name: 'createUser' })
  async createUser(
    @Args('createUserDto') createUserDto: CreateUserDto,
  ): Promise<UserModel> {
    const createdUser = await this.userService.createUser(createUserDto);
    return createdUser;
  }
}
