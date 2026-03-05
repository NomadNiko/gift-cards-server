import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateGiftCardDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  templateId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  widgetId?: string;

  @ApiProperty({ example: 50 })
  @IsNumber()
  @Min(1)
  originalAmount: number;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  purchaserEmail: string;

  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  purchaserName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  recipientEmail?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  recipientName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}
