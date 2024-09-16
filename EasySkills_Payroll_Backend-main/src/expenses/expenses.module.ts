import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { HttpModule } from '@nestjs/axios';

const username = 'deborah.chan@easy-skill.com';
const password = 'Sibeh7lazyset';
const token = btoa(`${username}:${password}`);

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://ui.boondmanager.com/api',
      headers: {
        Authorization: `Basic ${token}`,
      },
    }),
  ],
  controllers: [ExpensesController],
  providers: [ExpensesService],
  exports: [ExpensesService],
})
export class ExpensesModule {}
