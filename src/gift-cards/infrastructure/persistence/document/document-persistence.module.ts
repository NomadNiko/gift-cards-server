import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  GiftCardSchema,
  GiftCardSchemaClass,
} from './entities/gift-card.schema';
import { GiftCardRepository } from '../gift-card.repository';
import { GiftCardsDocumentRepository } from './repositories/gift-card.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GiftCardSchemaClass.name, schema: GiftCardSchema },
    ]),
  ],
  providers: [
    {
      provide: GiftCardRepository,
      useClass: GiftCardsDocumentRepository,
    },
  ],
  exports: [GiftCardRepository],
})
export class DocumentGiftCardPersistenceModule {}
