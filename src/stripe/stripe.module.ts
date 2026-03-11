import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { SettingsModule } from '../settings/settings.module';

@Module({
  imports: [SettingsModule],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
