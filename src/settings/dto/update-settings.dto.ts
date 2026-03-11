import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateSettingsDto {
  @ApiPropertyOptional({ enum: ['GBP', 'EUR', 'USD'] })
  @IsOptional()
  @IsIn(['GBP', 'EUR', 'USD'])
  currency?: 'GBP' | 'EUR' | 'USD';

  @ApiPropertyOptional({ enum: ['partial', 'full'] })
  @IsOptional()
  @IsIn(['partial', 'full'])
  defaultRedemptionType?: 'partial' | 'full';

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsEmail({}, { each: true })
  notificationEmails?: string[];

  @ApiPropertyOptional({ enum: ['sandbox', 'production'] })
  @IsOptional()
  @IsIn(['sandbox', 'production'])
  paymentMode?: 'sandbox' | 'production';

  @ApiPropertyOptional({ enum: ['stripe', 'square'] })
  @IsOptional()
  @IsIn(['stripe', 'square'])
  paymentGateway?: 'stripe' | 'square';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  stripeSecretKey?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  stripeWebhookSecret?: string;
}
