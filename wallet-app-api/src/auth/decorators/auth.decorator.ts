// Nest
import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GqlAuthGuard } from '../guards/gpl-auth.guard';

export function Auth() {
  return applyDecorators(UseGuards(AuthGuard()), ApiBearerAuth());
}

export function AuthGpl() {
  return applyDecorators(UseGuards(GqlAuthGuard));
}
