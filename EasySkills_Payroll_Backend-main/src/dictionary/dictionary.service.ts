import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiResponse } from 'src/payrolls/types/types';
import { Dictionary } from './schemas/dictionary.schema';
import { DictionaryDto } from './dto/dictionary.dto';

@Injectable()
export class DictionaryService {
  private logger = new Logger(DictionaryService.name);

  constructor(
    private httpService: HttpService,
    @InjectModel(Dictionary.name) private dictionaryModel: Model<Dictionary>,
  ) {}

  async fetchDictionaryFromBoondManager() {
    try {
      this.logger.debug('Fetching dictionary from BoondManager...');
      const dictionaryResponse = await this.httpService
        .get<ApiResponse<DictionaryDto>>('/application/dictionary', {
          params: {
            ignoreStateSort: true,
          },
        })
        .toPromise();

      const contracts = dictionaryResponse.data?.data.setting.typeOf.contract ?? [];
      const currency = dictionaryResponse.data?.data.setting.currency ?? [];
      const projects = dictionaryResponse.data?.data.setting.typeOf.project ?? [];

      return {
        contracts,
        currency,
        projects,
      };
    } catch (error) {
      this.logger.error('Error fetching dictionary from BoondManager:', error);
      throw new Error(`Failed to fetch dictionary: ${error.message}`);
    }
  }

  async saveDictionary(dictionary: Dictionary) {
    this.logger.debug('Attempting to save dictionary');
    try {
      const updatedDictionary = await this.dictionaryModel.findOneAndUpdate(
        {},
        {
          $set: {
            currency: dictionary.currency,
            contracts: dictionary.contracts,
            projects: dictionary.projects,
          },
        },
        { upsert: true, new: true },
      );
      this.logger.debug(`Dictionary saved: ${JSON.stringify(updatedDictionary)}`);
    } catch (error) {
      this.logger.error('Error saving dictionary:', error);
    }
  }

  async getDictionary() {
    return await this.dictionaryModel.findOne();
  }
}
