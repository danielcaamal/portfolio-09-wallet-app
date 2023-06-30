// Nest
import { Field, Float, InputType, PartialType } from '@nestjs/graphql';

// External
import { Brackets } from 'typeorm';
import { IsDate, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

// Local
import { CreateBalanceInput } from './create-balance.input';

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

  static getFilter = (input?: FilterBalanceInput): Brackets | undefined => {
    if (!input) return undefined;
    return new Brackets((qb) => {
      if (input.amount) {
        qb = qb.andWhere('balance.amount = :amount', { amount: input.amount });
      }

      if (input.isDeleted !== undefined) {
        qb = qb.andWhere('balance.isDeleted = :isDeleted', {
          isDeleted: input.isDeleted,
        });
      }

      if (input.createdAt) {
        const formattedCreatedAt = input.createdAt.toISOString().split('T')[0]; // Convert to 'YYYY-MM-DD' format
        qb = qb.andWhere(
          `TO_CHAR(balance.createdAt AT TIME ZONE 'UTC', 'YYYY-MM-DD') = :createdAt`,
          {
            createdAt: formattedCreatedAt,
          },
        );
      }

      if (input.userId) {
        qb = qb.andWhere('user.id = :userId', { userId: input.userId });
      }

      return qb;
    });
  };
}
