import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ required: false, type: Number, default: 1 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiProperty({ required: false, type: Number, default: 100 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(1000)
  @IsOptional()
  recordsByPage?: number;
}

export class ResponsePaginationDto<T> extends PaginationDto {
  totalRecords? = 0;
  totalPages? = 0;
  page? = 1;
  recordsByPage? = 100;
  data?: T[] = [];
  detail?: T;
  status?: number;
  message?: string;

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

  setDetail(detail: T) {
    this.detail = detail;
  }

  setStatus(status: number) {
    this.status = status;
  }

  setMessage(message: string) {
    this.message = message;
  }
}
