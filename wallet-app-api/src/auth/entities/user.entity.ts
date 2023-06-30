// Nest
import { Field, ObjectType } from '@nestjs/graphql';

// External
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// Local
import { Balance } from 'src/balance/entities';

@ObjectType()
@Entity('users')
export class User {
  @Field(() => String, { description: 'User unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { description: 'User email' })
  @Column({ unique: true, nullable: false, length: 50 })
  email: string;

  @Field(() => String, { description: 'User password' })
  @Column({ nullable: false, length: 250 })
  password: string;

  @Field(() => String, { description: 'User full name' })
  @Column({ nullable: false, length: 50 })
  fullName: string;

  @Field(() => Boolean, { description: 'Is this user active?' })
  @Column({ nullable: false, default: true })
  active: boolean;

  @Field(() => [Balance], { description: 'User balances' })
  @OneToMany(() => Balance, (balance) => balance.user)
  balances: Balance[];
}
