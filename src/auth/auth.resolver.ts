import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { GqlAuthGuard } from './guards/gqlAuth.guard';
import { LoginModel } from './models/login.model';

@Resolver((of) => LoginModel)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginModel, { name: 'login' })
  @UseGuards(GqlAuthGuard)
  async login(@Args('loginDto') loginDto: LoginDto, @Context() context) {
    const jwt = await this.authService.login(context.user);
    return jwt;
  }
}
