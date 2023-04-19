import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class EditPostDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  postId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  content: string;
}

export interface EditPostArgs {
  userId: string;
  postId: string;
  content: string;
}
