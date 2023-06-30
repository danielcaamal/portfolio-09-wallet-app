// Nest
import { Field, Float, InputType, PartialType } from '@nestjs/graphql';

// External
import { FindManyOptions, Between } from 'typeorm';
import { IsDate, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

// Local
import { CreateBalanceInput } from './create-balance.input';
import { Balance } from '../entities';

@InputType()
export class FilterBalanceInput extends PartialType(CreateBalanceInput) {
  @IsOptional()
  @IsNumber()
  @Field(() => Float, {
    description: 'Balance amount total (from)',
    nullable: true,
  })
  amountFrom?: number;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value).toUTCString())
  @Field(() => Date, {
    description: 'Balance created at (from)',
    nullable: true,
  })
  createdAtFrom?: Date;

  static getFilter = (
    input?: FilterBalanceInput,
  ): FindManyOptions<Balance> | undefined => {
    if (!input) return undefined;
    return {
      where: [
        // Default
        {
          // id: input.id,
          // amount: input.amount,
          // isDeleted: input.isDeleted,
          createdAt: Between(
            new Date(input.createdAt),
            new Date(input.createdAt),
          ),
          // updatedAt: input.updatedAt,
        },
        // Custom
        // {
        //   amount: MoreThanOrEqual(input.amountFrom),
        //   createdAt: MoreThanOrEqual(input.createdAtFrom),
        // },
      ],
    };
  };
}
