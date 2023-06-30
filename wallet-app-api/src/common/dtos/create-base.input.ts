// Nest
import { Field, InputType } from '@nestjs/graphql';

// External
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

@InputType()
export abstract class CreateBaseInput {
  @IsOptional()
  @IsUUID()
  @Field(() => String, { description: 'Unique identifier', nullable: true })
  id?: string;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, {
    description: 'Is this balance deleted?',
    nullable: true,
  })
  isDeleted?: boolean;

  @IsOptional()
  @Field(() => Date, {
    description: 'When this balance was created',
    nullable: true,
  })
  createdAt?: Date;

  @IsOptional()
  @Field(() => Date, {
    description: 'When this balance was last updated',
    nullable: true,
  })
  updatedAt?: Date;
}
