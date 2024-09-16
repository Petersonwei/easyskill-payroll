import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CurrencyDocument = HydratedDocument<Currency>;

@Schema()
export class Currency {
  @Prop({ required: true })
  id: number;

  @Prop()
  iso: string;

  @Prop()
  isEnabled: boolean;

  @Prop()
  value: string;

  @Prop()
  symbol: string;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);
