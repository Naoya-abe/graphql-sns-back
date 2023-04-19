import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostArgs } from './dto/createPost.dto';
import { PostModel } from './model/post.model';
import { UserService } from 'src/user/user.service';
import { GetPostByIdDto } from './dto/getPostById.dto';
import { EditPostArgs } from './dto/editPost.dto';
import { DeletePostDto } from './dto/deletePost.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createPost(createPostArgs: CreatePostArgs): Promise<PostModel> {
    const { userId, content } = createPostArgs;
    const createdPost = await this.prisma.post.create({
      data: {
        userId,
        content,
      },
    });
    const user = await this.userService.getUserById(createdPost.userId);
    const responseData = { ...createdPost, user };
    return responseData;
  }

  async getPosts(): Promise<PostModel[]> {
    const posts = await this.prisma.post.findMany();
    const response = await Promise.all(
      posts.map(async (post) => {
        const user = await this.userService.getUserById(post.userId);
        return { ...post, user };
      }),
    );
    return response;
  }

  async getPostById(getPostByIdDto: GetPostByIdDto): Promise<PostModel | null> {
    const { postId } = getPostByIdDto;
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) return null;
    const user = await this.userService.getUserById(post.userId);
    if (!user) return null;
    const response = { ...post, user };
    return response;
  }

  async editPost(editPostArgs: EditPostArgs): Promise<PostModel | null> {
    const { userId, postId, content } = editPostArgs;

    // リクエストを投げてきたユーザーがその投稿を作成したユーザーか検証
    const getPostByIdDto = { postId };
    const targetPost = await this.getPostById(getPostByIdDto);
    const targetPostAuthorId = targetPost.userId;
    const isSameUser = userId === targetPostAuthorId;
    if (!isSameUser) {
      console.error('Edit：Not Same User');
      return;
    }

    // 検証が完了したらEditの処理が走る
    const editedPost = await this.prisma.post.update({
      where: { id: postId },
      data: { content },
    });
    if (!editedPost) return;

    const user = await this.userService.getUserById(editedPost.userId);
    const response = { ...editedPost, user };
    return response;
  }

  async deletePost(deletePostDto: DeletePostDto): Promise<PostModel | null> {
    const { postId } = deletePostDto;
    const deletedPost = await this.prisma.post.delete({
      where: { id: postId },
    });
    if (!deletedPost) return null;
    const user = await this.userService.getUserById(deletedPost.userId);
    const response = { ...deletedPost, user };
    return response;
  }
}
