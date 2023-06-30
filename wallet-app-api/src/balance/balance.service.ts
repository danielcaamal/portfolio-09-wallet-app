// Nest
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// External
import { Repository } from 'typeorm';

// Internal
import {
  CreateBalanceInput,
  FilterBalanceInput,
  UpdateBalanceInput,
} from './dto';
import { Balance } from './entities';
import { BaseFindAllDto, PaginationDto } from 'src/common';
import { ResponsePaginationBalanceDto } from './dto/paginate-balance.output';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Balance)
    private readonly repository: Repository<Balance>,
  ) {
    //
  }

  create = async (createInput: CreateBalanceInput): Promise<Balance> => {
    const newEntity = this.repository.create(createInput);
    return await this.repository.save(newEntity);
  };

  findAll = async ({
    filterDto,
    recordsByPage,
    isCounter,
    skip,
  }: BaseFindAllDto<FilterBalanceInput>): Promise<Balance[] | number> => {
    const filter = FilterBalanceInput.getFilter(filterDto) || {};
    let query = this.repository.createQueryBuilder();

    if (recordsByPage) {
      query = query.take(recordsByPage);
    }

    if (skip) {
      query = query.skip(skip);
    }

    if (isCounter) {
      return await query.getCount();
    } else {
      return await query.getMany();
    }
  };

  findAllPaginated = async (
    filterDto?: FilterBalanceInput,
    paginationDto?: PaginationDto,
  ): Promise<ResponsePaginationBalanceDto> => {
    const response = new ResponsePaginationBalanceDto(paginationDto);
    if (paginationDto) {
      const [data, totalRecords] = await Promise.all([
        this.findAll({ filterDto }),
        this.findAll({ filterDto, isCounter: true }),
      ]);
      response.setTotalPagesAndData(totalRecords as number, data as Balance[]);
    } else {
      const data = (await this.findAll({ filterDto })) as Balance[];
      response.setOnlyData(data);
    }
    return response;
  };

  findOneById = async (id: string): Promise<Balance> => {
    return await this.repository.findOneBy({ id });
  };

  update = async (
    id: string,
    updateBalanceInput: UpdateBalanceInput,
  ): Promise<Balance> => {
    const updateEntity = await this.repository.preload({
      id,
      ...updateBalanceInput,
    });
    updateEntity.updatedAt = new Date();
    return this.repository.save(updateEntity);
  };

  remove = async (id: string): Promise<Balance> => {
    const entityToDelete = await this.repository.findOneBy({ id });
    entityToDelete.isDeleted = true;
    return await this.repository.save(entityToDelete);
  };
}
