import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { GiftCardTemplate } from '../domain/gift-card-template';

export class SortGiftCardTemplateDto {
  @Type(() => String)
  @IsString()
  orderBy: keyof GiftCardTemplate;

  @IsString()
  order: 'ASC' | 'DESC';
}

export class QueryGiftCardTemplateDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) =>
    value
      ? plainToInstance(SortGiftCardTemplateDto, JSON.parse(value))
      : undefined,
  )
  sort?: SortGiftCardTemplateDto[] | null;
}
