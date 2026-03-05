import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
  HttpStatus,
  HttpCode,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { GiftCardsService } from './gift-cards.service';
import { CreateGiftCardDto } from './dto/create-gift-card.dto';
import { RedeemGiftCardDto } from './dto/redeem-gift-card.dto';
import { QueryGiftCardDto } from './dto/query-gift-card.dto';
import { GiftCard } from './domain/gift-card';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';

@ApiTags('Gift Cards')
@Controller({
  path: 'gift-cards',
  version: '1',
})
export class GiftCardsController {
  constructor(private readonly service: GiftCardsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  purchase(@Body() dto: CreateGiftCardDto): Promise<GiftCard> {
    return this.service.purchase(dto);
  }

  @Get()
  @ApiBearerAuth()
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOkResponse({ type: InfinityPaginationResponse(GiftCard) })
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryGiftCardDto,
  ): Promise<InfinityPaginationResponseDto<GiftCard>> {
    const page = query?.page ?? 1;
    const limit = Math.min(query?.limit ?? 10, 50);
    return infinityPagination(
      await this.service.findManyWithPagination({
        filterOptions: {
          status: query?.status,
          templateId: query?.templateId,
        },
        sortOptions: query?.sort,
        paginationOptions: { page, limit },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiBearerAuth()
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<GiftCard | null> {
    return this.service.findById(id);
  }

  @Get('code/:code')
  @HttpCode(HttpStatus.OK)
  findByCode(@Param('code') code: string): Promise<GiftCard | null> {
    return this.service.findByCode(code);
  }

  @Get('email/:email')
  @HttpCode(HttpStatus.OK)
  findByEmail(@Param('email') email: string): Promise<GiftCard[]> {
    return this.service.findByEmail(email);
  }

  @Post(':id/redeem')
  @ApiBearerAuth()
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @HttpCode(HttpStatus.OK)
  redeem(
    @Param('id') id: string,
    @Body() dto: RedeemGiftCardDto,
    @Request() req,
  ): Promise<GiftCard> {
    return this.service.redeem(id, dto, req.user.id);
  }

  @Patch(':id/cancel')
  @ApiBearerAuth()
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @HttpCode(HttpStatus.OK)
  cancel(@Param('id') id: string): Promise<GiftCard | null> {
    return this.service.cancel(id);
  }
}
