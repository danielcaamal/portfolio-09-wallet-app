import { Field, ObjectType } from '@nestjs/graphql';

import { PaginationDto, ResponsePaginationDto } from 'src/common';
import { Balance } from '../entities';

@ObjectType()
export class ResponsePaginationBalanceDto extends ResponsePaginationDto<Balance> {
  constructor(paginationDto: PaginationDto) {
    super(paginationDto);
  }
  @Field(() => [Balance], {
    description: 'Total records',
    nullable: true,
  })
  data?: Balance[];
}
