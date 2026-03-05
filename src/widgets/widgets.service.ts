import { Injectable } from '@nestjs/common';
import { WidgetRepository } from './infrastructure/persistence/widget.repository';
import { Widget } from './domain/widget';
import { CreateWidgetDto } from './dto/create-widget.dto';
import { UpdateWidgetDto } from './dto/update-widget.dto';
import { NullableType } from '../utils/types/nullable.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { randomBytes } from 'crypto';

@Injectable()
export class WidgetsService {
  constructor(private readonly repository: WidgetRepository) {}

  create(dto: CreateWidgetDto, userId: string): Promise<Widget> {
    const apiKey = `wgt_${randomBytes(16).toString('hex')}`;
    return this.repository.create({
      name: dto.name,
      templateId: dto.templateId,
      apiKey,
      allowedDomains: dto.allowedDomains || [],
      customization: dto.customization,
      isActive: dto.isActive ?? true,
      createdBy: userId,
    });
  }

  findManyWithPagination(params: {
    paginationOptions: IPaginationOptions;
  }): Promise<Widget[]> {
    return this.repository.findManyWithPagination(params);
  }

  findById(id: string): Promise<NullableType<Widget>> {
    return this.repository.findById(id);
  }

  findByApiKey(apiKey: string): Promise<NullableType<Widget>> {
    return this.repository.findByApiKey(apiKey);
  }

  update(id: string, dto: UpdateWidgetDto): Promise<Widget | null> {
    return this.repository.update(id, dto);
  }

  remove(id: string): Promise<void> {
    return this.repository.remove(id);
  }
}
