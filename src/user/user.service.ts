import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserModel } from './models/user.model';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<UserModel> {
    const { email, password } = data;
    const nickname = email.substring(0, email.indexOf('@'));
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const createdUser = await this.prisma.user.create({
      data: { email, nickname, hashedPassword },
    });
    return createdUser;
  }

  async getUserByEmail(email: string): Promise<UserModel | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      return user;
    } else {
      return null;
    }
  }
}
