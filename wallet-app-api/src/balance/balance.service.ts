// Nest
import { BadRequestException, Injectable } from '@nestjs/common';
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
import { User } from 'src/auth/entities';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Balance)
    private readonly repository: Repository<Balance>,
  ) {
    //
  }

  create = async (
    createInput: CreateBalanceInput,
    user?: User,
  ): Promise<Balance> => {
    const userId = createInput.userId || user?.id;
    if (!userId) throw new BadRequestException('User id is required');
    const newEntity = this.repository.create({
      ...createInput,
      user: { id: userId },
    });
    return await this.repository.save(newEntity);
  };

  findAll = async ({
    filterDto,
    recordsByPage,
    isCounter,
    skip,
    order,
  }: BaseFindAllDto<FilterBalanceInput>): Promise<Balance[] | number> => {
    const filter = FilterBalanceInput.getFilter(filterDto) || {};
    let query = this.repository
      .createQueryBuilder('balance')
      .leftJoinAndSelect('balance.user', 'user');

    if (filterDto) {
      query = query.where(filter);
    }

    if (recordsByPage) {
      query = query.take(recordsByPage);
    }

    if (skip) {
      query = query.skip(skip);
    }

    if (order) {
      query = query.orderBy({
        id: 'ASC',
      });
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
      const { skip, recordsByPage } = response;
      const [data, totalRecords] = await Promise.all([
        this.findAll({ filterDto, recordsByPage, skip }),
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
    user?: User,
  ): Promise<Balance> => {
    if (updateBalanceInput.userId) {
      throw new BadRequestException('userId cannot be updated');
    }
    const updateEntity = await this.repository.preload({
      id,
      ...updateBalanceInput,
    });
    if (!updateEntity) throw new BadRequestException('Balance not found');
    if (updateEntity.user.id !== user?.id) {
      throw new BadRequestException('You cannot update this balance');
    }
    updateEntity.updatedAt = new Date();
    return this.repository.save(updateEntity);
  };

  remove = async (id: string, user?: User): Promise<Balance> => {
    const entityToDelete = await this.repository.findOneBy({ id });
    if (!entityToDelete) throw new BadRequestException('Balance not found');
    if (entityToDelete.user.id !== user?.id) {
      throw new BadRequestException('You cannot delete this balance');
    }
    entityToDelete.isDeleted = true;
    return await this.repository.save(entityToDelete);
  };
}
