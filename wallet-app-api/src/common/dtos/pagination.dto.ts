// Nest
import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

// External
import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class PaginationDto {
  @ApiProperty({ required: false, type: Number, default: 1 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Field(() => Number, {
    description: 'Page number',
    nullable: true,
  })
  page?: number;

  @ApiProperty({ required: false, type: Number, default: 100 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(1000)
  @IsOptional()
  @Field(() => Number, {
    description: 'Records By Page',
    nullable: true,
  })
  recordsByPage?: number;
}

@ObjectType()
export abstract class ResponsePaginationDto<T> extends PaginationDto {
  @Field(() => Number, {
    description: 'Total records',
    nullable: true,
  })
  totalRecords? = 0;

  @Field(() => Number, {
    description: 'Total pages',
    nullable: true,
  })
  totalPages? = 0;

  @Field(() => Number, {
    description: 'Page number',
    nullable: true,
  })
  page? = 1;

  @Field(() => Number, {
    description: 'Records By Page',
    nullable: true,
  })
  recordsByPage? = 100;

  data?: T[];

  constructor(paginationDto?: PaginationDto) {
    super();
    if (!paginationDto) {
      this.totalRecords = undefined;
      this.totalPages = undefined;
      this.page = undefined;
      this.recordsByPage = undefined;
    }
    this.page = paginationDto?.page || this.page;
    this.recordsByPage = paginationDto?.recordsByPage || this.recordsByPage;
  }

  get skip() {
    return (this.page - 1) * this.recordsByPage;
  }

  setTotalPagesAndData(totalRecords: number, data: T[]) {
    this.totalRecords = totalRecords;
    this.totalPages = Math.ceil(totalRecords / this.recordsByPage);
    this.data = data;
  }

  setOnlyData(data: T[]) {
    this.data = data;
    this.page = 1;
    this.totalPages = 1;
    this.totalRecords = data.length;
  }
}
