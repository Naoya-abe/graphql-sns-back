import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/createPost.dto';
import { PostModel } from './model/post.model';
import { UserService } from 'src/user/user.service';
import { GetPostByIdDto } from './dto/getPostById.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createPost(createPostDto: CreatePostDto): Promise<PostModel> {
    const { userId, content } = createPostDto;
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
}
