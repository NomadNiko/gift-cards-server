import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { GiftCardRepository } from './infrastructure/persistence/gift-card.repository';
import { GiftCard, Redemption } from './domain/gift-card';
import { CreateGiftCardDto } from './dto/create-gift-card.dto';
import { RedeemGiftCardDto } from './dto/redeem-gift-card.dto';
import { NullableType } from '../utils/types/nullable.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { SortGiftCardDto } from './dto/query-gift-card.dto';
import { generateGiftCardCode } from './utils/generate-code';
import { randomBytes } from 'crypto';

@Injectable()
export class GiftCardsService {
  constructor(private readonly repository: GiftCardRepository) {}

  async purchase(dto: CreateGiftCardDto): Promise<GiftCard> {
    let code: string;
    do {
      code = generateGiftCardCode();
    } while (!(await this.repository.isCodeUnique(code)));

    return this.repository.create({
      code,
      templateId: dto.templateId,
      widgetId: dto.widgetId,
      originalAmount: dto.originalAmount,
      currentBalance: dto.originalAmount,
      purchaseDate: new Date(),
      purchaserEmail: dto.purchaserEmail,
      purchaserName: dto.purchaserName,
      recipientEmail: dto.recipientEmail,
      recipientName: dto.recipientName,
      status: 'active',
      redemptions: [],
      notes: dto.notes,
    });
  }

  findManyWithPagination(params: {
    filterOptions?: { status?: string; templateId?: string } | null;
    sortOptions?: SortGiftCardDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<GiftCard[]> {
    return this.repository.findManyWithPagination(params);
  }

  findById(id: string): Promise<NullableType<GiftCard>> {
    return this.repository.findById(id);
  }

  findByCode(code: string): Promise<NullableType<GiftCard>> {
    return this.repository.findByCode(code);
  }

  findByEmail(email: string): Promise<GiftCard[]> {
    return this.repository.findByEmail(email);
  }

  async redeem(
    id: string,
    dto: RedeemGiftCardDto,
    userId: string,
  ): Promise<GiftCard> {
    const giftCard = await this.repository.findById(id);

    if (!giftCard) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { id: 'giftCardNotFound' },
      });
    }

    if (
      giftCard.status === 'fully_redeemed' ||
      giftCard.status === 'cancelled'
    ) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { status: 'giftCardNotRedeemable' },
      });
    }

    if (dto.amount > giftCard.currentBalance) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { amount: 'amountExceedsBalance' },
      });
    }

    const remainingBalance =
      Math.round((giftCard.currentBalance - dto.amount) * 100) / 100;

    const redemption: Redemption = {
      id: randomBytes(12).toString('hex'),
      amount: dto.amount,
      redeemedBy: userId,
      redeemedAt: new Date(),
      notes: dto.notes,
      remainingBalance,
    };

    const newStatus =
      remainingBalance === 0 ? 'fully_redeemed' : 'partially_redeemed';

    const updated = await this.repository.update(id, {
      currentBalance: remainingBalance,
      status: newStatus as GiftCard['status'],
      redemptions: [...giftCard.redemptions, redemption],
    });

    if (!updated) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { id: 'updateFailed' },
      });
    }

    return updated;
  }

  async cancel(id: string): Promise<GiftCard | null> {
    return this.repository.update(id, { status: 'cancelled' });
  }
}
