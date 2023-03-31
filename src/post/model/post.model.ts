import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/user/models/user.model';

@ObjectType({ description: 'post' })
export class PostModel {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  content: string;

  @Field((type) => String)
  userId: string;

  @Field((type) => UserModel)
  user: UserModel;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;
}
