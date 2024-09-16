import { Injectable } from '@nestjs/common';
import { SalaryDto } from './dto/salary.dto';
import { Salary } from './schemas/salary.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SalaryService {
  constructor(@InjectModel(Salary.name) private salaryModel: Model<Salary>) {}

  async findAll() {
    return await this.salaryModel.find().exec();
  }

  async update({ contractId, deliveryId, dailyRate, currencyId, resourceId, taxRate }: SalaryDto) {
    const id = `${contractId}#${deliveryId}`;

    await this.salaryModel.findOneAndUpdate(
      { id },
      { $set: { id, dailyRate, currencyId, resourceId, taxRate } },
      { upsert: true },
    );
  }
}
