import { CreateBalanceInput } from './create-balance.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBalanceInput extends PartialType(CreateBalanceInput) {
  @Field(() => String)
  id: string;
}
