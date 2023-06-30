import { BaseEntity } from 'src/common';
import { Column, Entity } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity('balance')
export class Balance extends BaseEntity {
  @Column({ nullable: false })
  @Field(() => Number, { description: 'Example field (placeholder)' })
  amount: number;
}
