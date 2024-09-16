import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdvantagesToPayDocument = HydratedDocument<AdvantagesToPay>;
@Schema()
export class AdvantagesToPay {
  @Prop({ type: [{ id: String, type: { type: String, enum: ['advantage'] } }], default: [] })
  data: { id?: string; type?: 'advantage' }[];
}

export const AdvantagesToPaySchema = SchemaFactory.createForClass(AdvantagesToPay);
