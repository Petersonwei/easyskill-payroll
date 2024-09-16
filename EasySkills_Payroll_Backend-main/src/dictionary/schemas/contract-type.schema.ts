import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContractTypeDocument = HydratedDocument<ContractType>;

@Schema()
export class ContractType {
  @Prop({ required: true })
  id: number;

  @Prop()
  value: string;

  @Prop()
  isEnabled: boolean;
}

export const ContractTypeSchema = SchemaFactory.createForClass(ContractType);
