import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @Field()
  @MinLength(8)
  @IsNotEmpty()
  confirmPassword: string;
}
