import { Field, Float, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';

import { CreateBaseInput } from 'src/common/dtos/create-base.input';

@InputType()
export class CreateBalanceInput extends CreateBaseInput {
  @IsNumber()
  @Field(() => Float, { description: 'Balance amount total' })
  amount: number;

  @IsOptional()
  @IsUUID()
  @Field(() => String, { description: 'User id', nullable: true })
  userId?: string;
}
