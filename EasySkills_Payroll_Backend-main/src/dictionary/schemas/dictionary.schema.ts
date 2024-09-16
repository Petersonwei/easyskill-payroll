import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ContractType, Currency, ProjectType } from '../dto/dictionary.dto';
import { CurrencySchema } from './currency.schema';
import { ContractTypeSchema } from './contract-type.schema';
import { ProjectTypeSchema } from './project-type.schema';

export type DictionaryDocument = HydratedDocument<Dictionary>;

@Schema()
export class Dictionary {
  @Prop({ type: [CurrencySchema] })
  currency: Currency[];

  @Prop({ type: [ProjectTypeSchema] })
  projects: ProjectType[];

  @Prop({ type: [ContractTypeSchema] })
  contracts: ContractType[];
}

export const DictionarySchema = SchemaFactory.createForClass(Dictionary);
