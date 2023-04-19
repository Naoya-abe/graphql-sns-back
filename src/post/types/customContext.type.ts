import { GraphQLExecutionContext } from '@nestjs/graphql';
import { UserModel } from 'src/user/models/user.model';

export interface ContextWithUser extends GraphQLExecutionContext {
  req: {
    user: UserModel;
  };
}
