import { Field, Float, InputType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

import { CreateBaseInput } from 'src/common/dtos/create-base.input';

@InputType()
export class CreateBalanceInput extends CreateBaseInput {
  @IsNumber()
  @Field(() => Float, { description: 'Balance amount total' })
  amount: number;
}
