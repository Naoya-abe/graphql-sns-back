import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'user' })
export class UserModel {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  hashedPassword: string;

  @Field((type) => String)
  nickname: string;

  @Field((type) => String)
  selfIntroduction: string;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;
}
