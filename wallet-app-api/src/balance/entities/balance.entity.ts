// Nest
import { ObjectType, Field } from '@nestjs/graphql';

// External
import { Column, Entity, ManyToOne } from 'typeorm';

// Local
import { BaseEntity } from 'src/common';
import { User } from 'src/auth/entities';

@ObjectType()
@Entity('balances')
export class Balance extends BaseEntity {
  @Column({ nullable: false })
  @Field(() => Number, { description: 'Amount of money' })
  amount: number;

  @ManyToOne(() => User, (user) => user.balances)
  @Field(() => User, { description: 'User relation', nullable: false })
  user: User;
}
