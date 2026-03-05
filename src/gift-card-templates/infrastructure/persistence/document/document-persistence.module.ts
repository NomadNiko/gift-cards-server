import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  GiftCardTemplateSchema,
  GiftCardTemplateSchemaClass,
} from './entities/gift-card-template.schema';
import { GiftCardTemplateRepository } from '../gift-card-template.repository';
import { GiftCardTemplatesDocumentRepository } from './repositories/gift-card-template.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: GiftCardTemplateSchemaClass.name,
        schema: GiftCardTemplateSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: GiftCardTemplateRepository,
      useClass: GiftCardTemplatesDocumentRepository,
    },
  ],
  exports: [GiftCardTemplateRepository],
})
export class DocumentGiftCardTemplatePersistenceModule {}
