import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WidgetCustomization {
  @ApiProperty({ example: '#ff6b6b' })
  primaryColor: string;

  @ApiPropertyOptional({ example: '#ffffff' })
  secondaryColor?: string;

  @ApiProperty({ example: 'Buy Gift Card' })
  buttonText: string;

  @ApiPropertyOptional()
  logoUrl?: string;

  @ApiPropertyOptional()
  headerText?: string;

  @ApiPropertyOptional()
  footerText?: string;
}

export class Widget {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ example: 'Main Website Widget' })
  name: string;

  @ApiProperty({ type: String })
  templateId: string;

  @ApiProperty({ example: 'wgt_abc123xyz' })
  apiKey: string;

  @ApiProperty({ type: [String] })
  allowedDomains: string[];

  @ApiProperty({ type: () => WidgetCustomization })
  customization: WidgetCustomization;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty({ type: String })
  createdBy: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
