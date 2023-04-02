import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostModel } from './model/post.model';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/createPost.dto';
import { GetPostByIdDto } from './dto/getPostById.dto';
import { EditPostDto } from './dto/editPost.dto';
import { DeletePostDto } from './dto/deletePost.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';

@Resolver((of) => PostModel)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => PostModel, { name: 'createPost' })
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Args('createPostDto') createPostDto: CreatePostDto,
  ): Promise<PostModel> {
    const createdPost = await this.postService.createPost(createPostDto);
    return createdPost;
  }

  @Query(() => [PostModel], { name: 'posts' })
  @UseGuards(JwtAuthGuard)
  async getPosts(): Promise<PostModel[]> {
    const posts = await this.postService.getPosts();
    return posts;
  }

  @Query(() => PostModel, { name: 'post' })
  @UseGuards(JwtAuthGuard)
  async getPostById(
    @Args('getPostByIdDto') getPostByIdDto: GetPostByIdDto,
  ): Promise<PostModel> {
    const post = await this.postService.getPostById(getPostByIdDto);
    return post;
  }

  @Mutation(() => PostModel, { name: 'editPost' })
  @UseGuards(JwtAuthGuard)
  async editPost(
    @Args('editPostDto') editPostDto: EditPostDto,
  ): Promise<PostModel> {
    const editedPost = await this.postService.editPost(editPostDto);
    return editedPost;
  }

  @Mutation(() => PostModel, { name: 'deletePost' })
  @UseGuards(JwtAuthGuard)
  async deletePost(
    @Args('deletePostDto') deletePostDto: DeletePostDto,
  ): Promise<PostModel> {
    const deletedPost = await this.postService.deletePost(deletePostDto);
    return deletedPost;
  }
}
