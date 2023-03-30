import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'login' })
export class LoginModel {
  @Field((type) => String)
  jwt: string;
}
