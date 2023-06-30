// Nest
import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    if (!user)
      throw new InternalServerErrorException('User not found (request)');

    return !data ? user : user[data];
  },
);

export const GetUserGpl = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const ctxGpl = GqlExecutionContext.create(ctx);
    const req = ctxGpl.getContext().req;
    const user = req.user;

    if (!user)
      throw new InternalServerErrorException('User not found (graphql)');

    return !data ? user : user[data];
  },
);
