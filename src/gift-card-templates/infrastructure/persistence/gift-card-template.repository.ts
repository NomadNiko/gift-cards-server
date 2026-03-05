import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { GiftCardTemplate } from '../../domain/gift-card-template';
import { SortGiftCardTemplateDto } from '../../dto/query-gift-card-template.dto';

export abstract class GiftCardTemplateRepository {
  abstract create(
    data: Omit<GiftCardTemplate, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<GiftCardTemplate>;

  abstract findManyWithPagination({
    sortOptions,
    paginationOptions,
  }: {
    sortOptions?: SortGiftCardTemplateDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<GiftCardTemplate[]>;

  abstract findById(
    id: GiftCardTemplate['id'],
  ): Promise<NullableType<GiftCardTemplate>>;

  abstract findActive(): Promise<GiftCardTemplate[]>;

  abstract update(
    id: GiftCardTemplate['id'],
    payload: DeepPartial<GiftCardTemplate>,
  ): Promise<GiftCardTemplate | null>;

  abstract softDelete(id: GiftCardTemplate['id']): Promise<void>;
}
