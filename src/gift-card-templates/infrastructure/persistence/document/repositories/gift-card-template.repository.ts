import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { GiftCardTemplate } from '../../../../domain/gift-card-template';
import { GiftCardTemplateRepository } from '../../gift-card-template.repository';
import { GiftCardTemplateSchemaClass } from '../entities/gift-card-template.schema';
import { GiftCardTemplateMapper } from '../mappers/gift-card-template.mapper';
import { SortGiftCardTemplateDto } from '../../../../dto/query-gift-card-template.dto';

@Injectable()
export class GiftCardTemplatesDocumentRepository
  implements GiftCardTemplateRepository
{
  constructor(
    @InjectModel(GiftCardTemplateSchemaClass.name)
    private readonly model: Model<GiftCardTemplateSchemaClass>,
  ) {}

  async create(data: GiftCardTemplate): Promise<GiftCardTemplate> {
    const persistence = GiftCardTemplateMapper.toPersistence(data);
    const created = new this.model(persistence);
    const saved = await created.save();
    return GiftCardTemplateMapper.toDomain(saved);
  }

  async findManyWithPagination({
    sortOptions,
    paginationOptions,
  }: {
    sortOptions?: SortGiftCardTemplateDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<GiftCardTemplate[]> {
    const results = await this.model
      .find({ deletedAt: null })
      .sort(
        sortOptions?.reduce(
          (acc, sort) => ({
            ...acc,
            [sort.orderBy === 'id' ? '_id' : sort.orderBy]:
              sort.order.toUpperCase() === 'ASC' ? 1 : -1,
          }),
          {},
        ) || { createdAt: -1 },
      )
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return results.map(GiftCardTemplateMapper.toDomain);
  }

  async findById(
    id: GiftCardTemplate['id'],
  ): Promise<NullableType<GiftCardTemplate>> {
    const result = await this.model.findById(id);
    return result ? GiftCardTemplateMapper.toDomain(result) : null;
  }

  async findActive(): Promise<GiftCardTemplate[]> {
    const results = await this.model
      .find({ isActive: true, deletedAt: null })
      .sort({ createdAt: -1 });
    return results.map(GiftCardTemplateMapper.toDomain);
  }

  async update(
    id: GiftCardTemplate['id'],
    payload: Partial<GiftCardTemplate>,
  ): Promise<GiftCardTemplate | null> {
    const existing = await this.model.findById(id);
    if (!existing) return null;

    const merged = {
      ...GiftCardTemplateMapper.toDomain(existing),
      ...payload,
    };
    const result = await this.model.findByIdAndUpdate(
      id,
      GiftCardTemplateMapper.toPersistence(merged),
      { new: true },
    );
    return result ? GiftCardTemplateMapper.toDomain(result) : null;
  }

  async softDelete(id: GiftCardTemplate['id']): Promise<void> {
    await this.model.findByIdAndUpdate(id, { deletedAt: new Date() });
  }
}
