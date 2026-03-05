import { Module } from '@nestjs/common';
import { GiftCardsController } from './gift-cards.controller';
import { GiftCardsService } from './gift-cards.service';
import { DocumentGiftCardPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [DocumentGiftCardPersistenceModule],
  controllers: [GiftCardsController],
  providers: [GiftCardsService],
  exports: [GiftCardsService],
})
export class GiftCardsModule {}
