import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Settings {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ enum: ['GBP', 'EUR', 'USD'], example: 'GBP' })
  currency: 'GBP' | 'EUR' | 'USD';

  @ApiProperty({ enum: ['partial', 'full'], example: 'full' })
  defaultRedemptionType: 'partial' | 'full';

  @ApiProperty({ type: [String], example: ['manager@example.com'] })
  notificationEmails: string[];

  @ApiProperty({ enum: ['sandbox', 'production'], example: 'sandbox' })
  paymentMode: 'sandbox' | 'production';

  @ApiProperty({ enum: ['stripe', 'square'], example: 'stripe' })
  paymentGateway: 'stripe' | 'square';

  @ApiPropertyOptional()
  stripeSecretKey?: string;

  @ApiPropertyOptional()
  stripeWebhookSecret?: string;

  @ApiProperty()
  updatedAt: Date;
}
