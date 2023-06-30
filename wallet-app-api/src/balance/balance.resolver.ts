// Nest
import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

// Local
import { AuthGpl } from 'src/auth/decorators';
import { Balance } from './entities/balance.entity';
import { BalanceService } from './balance.service';
import { PaginationDto } from 'src/common';
import {
  CreateBalanceInput,
  FilterBalanceInput,
  UpdateBalanceInput,
  ResponsePaginationBalanceDto,
} from './dto';
import { User } from 'src/auth/entities';
import { GetUserGpl } from 'src/auth/decorators/get-user.decorator';

@AuthGpl()
@Resolver(() => Balance)
export class BalanceResolver {
  constructor(private readonly balanceService: BalanceService) {}

  @Mutation(() => Balance)
  createBalance(
    @Args('createBalanceInput') createBalanceInput: CreateBalanceInput,
    @GetUserGpl() user: User,
  ) {
    return this.balanceService.create(createBalanceInput, user);
  }

  @Query(() => ResponsePaginationBalanceDto, { name: 'balances' })
  findAll(
    @Args('filter', { nullable: true }) filterDto: FilterBalanceInput,
    @Args('pagination', { nullable: true }) paginationDto: PaginationDto,
  ) {
    return this.balanceService.findAllPaginated(filterDto, paginationDto);
  }

  @Query(() => Balance, { name: 'balance' })
  findOne(@Args('id', { type: () => String }, ParseUUIDPipe) id: string) {
    return this.balanceService.findOneById(id);
  }

  @Mutation(() => Balance)
  updateBalance(
    @Args('updateBalanceInput') updateBalanceInput: UpdateBalanceInput,
    @GetUserGpl() user: User,
  ) {
    return this.balanceService.update(
      updateBalanceInput.id,
      updateBalanceInput,
      user,
    );
  }

  @Mutation(() => Balance)
  removeBalance(
    @Args('id', { type: () => String }, ParseUUIDPipe) id: string,
    @GetUserGpl() user: User,
  ) {
    return this.balanceService.remove(id, user);
  }
}
