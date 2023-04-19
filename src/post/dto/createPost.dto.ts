import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreatePostDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  content: string;
}

export interface CreatePostArgs {
  userId: string;
  content: string;
}
