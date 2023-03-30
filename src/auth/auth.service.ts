import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserModel } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';
import { LoginModel } from './models/login.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserModel | null> {
    const user = await this.userService.getUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.hashedPassword))) {
      return user;
    } else {
      return null;
    }
  }

  async login(user: UserModel): Promise<LoginModel> {
    const payload = { email: user.email, sub: user.id };
    const jwt = await this.jwtService.signAsync(payload);

    return {
      jwt,
    };
  }
}
