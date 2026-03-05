import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class WidgetCustomizationDto {
  @ApiProperty({ example: '#ff6b6b' })
  @IsString()
  primaryColor: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  secondaryColor?: string;

  @ApiProperty({ example: 'Buy Gift Card' })
  @IsString()
  buttonText: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  logoUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  headerText?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  footerText?: string;
}

export class CreateWidgetDto {
  @ApiProperty({ example: 'Main Website Widget' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  templateId: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  allowedDomains?: string[];

  @ApiProperty({ type: WidgetCustomizationDto })
  @ValidateNested()
  @Type(() => WidgetCustomizationDto)
  customization: WidgetCustomizationDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
