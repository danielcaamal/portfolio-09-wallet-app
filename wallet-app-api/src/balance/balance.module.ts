// Nest
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Local
import { BalanceService } from './balance.service';
import { BalanceResolver } from './balance.resolver';
import { Balance } from './entities';

@Module({
  providers: [BalanceResolver, BalanceService],
  imports: [TypeOrmModule.forFeature([Balance])],
})
export class BalanceModule {}
