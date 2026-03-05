import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Widget } from '../../domain/widget';

export abstract class WidgetRepository {
  abstract create(
    data: Omit<Widget, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Widget>;

  abstract findManyWithPagination(params: {
    paginationOptions: IPaginationOptions;
  }): Promise<Widget[]>;

  abstract findById(id: Widget['id']): Promise<NullableType<Widget>>;

  abstract findByApiKey(apiKey: string): Promise<NullableType<Widget>>;

  abstract update(
    id: Widget['id'],
    payload: Partial<Widget>,
  ): Promise<Widget | null>;

  abstract remove(id: Widget['id']): Promise<void>;
}
