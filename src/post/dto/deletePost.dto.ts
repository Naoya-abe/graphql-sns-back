import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class DeletePostDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  postId: string;
}

export interface DeletePostArgs {
  userId: string;
  postId: string;
}
