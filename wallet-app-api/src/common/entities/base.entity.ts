// Nest
import { Field, ObjectType } from '@nestjs/graphql';

// External
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'Unique identifier' })
  id: string;

  @Column({ nullable: false, type: Boolean, default: false })
  @Field(() => Boolean, { description: 'Is this balance deleted?' })
  isDeleted: boolean;

  @CreateDateColumn({
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date, { description: 'When this balance was created' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamp' })
  @Field(() => Date, {
    description: 'When this balance was last updated',
    nullable: true,
  })
  updatedAt?: Date;
}
