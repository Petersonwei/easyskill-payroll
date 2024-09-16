import { Module } from '@nestjs/common';
import { PayrollsService } from './payrolls.service';
import { PayrollsController } from './payrolls.controller';
import { ResourcesModule } from 'src/resources/resources.module';

@Module({
  imports: [ResourcesModule],
  controllers: [PayrollsController],
  providers: [PayrollsService],
  // exports: [MongooseModule],
})
export class PayrollsModule {}
