// Nest
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Local
import { BalanceService } from './balance.service';
import { BalanceResolver } from './balance.resolver';
import { Balance } from './entities';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [BalanceResolver, BalanceService],
  imports: [TypeOrmModule.forFeature([Balance]), AuthModule],
})
export class BalanceModule {}
