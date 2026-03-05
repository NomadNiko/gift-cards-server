import { Module } from '@nestjs/common';
import { GiftCardTemplatesController } from './gift-card-templates.controller';
import { GiftCardTemplatesService } from './gift-card-templates.service';
import { DocumentGiftCardTemplatePersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [DocumentGiftCardTemplatePersistenceModule],
  controllers: [GiftCardTemplatesController],
  providers: [GiftCardTemplatesService],
  exports: [GiftCardTemplatesService],
})
export class GiftCardTemplatesModule {}
