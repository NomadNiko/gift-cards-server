# The Hurstwood — Gift Card Management System (Backend)

A NestJS REST API powering the gift card management system for The Hurstwood restaurant. Handles gift card templates, purchases, redemptions, email delivery with PDF attachments, and embeddable purchase widgets.

**Live API**: <https://gift-cards-server.nomadsoft.us/api>

**Frontend Repository**: `/var/www/gift-cards/`

## Features

### Gift Card Templates
- Full CRUD with admin-only access
- Custom image upload with configurable code overlay position (x/y/width/height as %, font size, color, alignment)
- Configurable QR code position (x/y/size as %)
- Customizable code prefix (e.g. `GC`, `HW`) — codes generated as `{PREFIX}-XXXX-XXXX`
- Optional expiration date with auto-expiry on lookup
- Redemption type per template: `full` (single use) or `partial` (multi-use balance)
- Public endpoint for active templates (used by purchase widgets)

### Gift Cards (Purchases)
- Purchase creates a gift card, generates a unique code, and sends confirmation emails
- Lookup by code or email (public endpoints)
- Redeem with full or partial amount support and audit trail
- Auto-expire on lookup when past expiration date
- Paginated listing with sort support

### Email System
- Purchase confirmation email with inline gift card image and PDF attachment
- Gift card image rendered via puppeteer-core with code overlay, expiration label, and QR code positioned per template settings
- PDF generated with the same layout plus a details section
- BCC to configurable notification email list
- Separate purchase notification email to the notification list
- Currency symbol pulled from settings

### Widgets
- CRUD for embeddable purchase widgets
- Auto-generated `wgt_` prefixed API keys
- Public endpoint to fetch widget config by API key

### Settings
- Single-document MongoDB store
- Currency (GBP/EUR/USD), default redemption type, notification email list
- Public GET + admin-only PATCH

## Tech Stack

- NestJS 10, TypeScript
- MongoDB via Mongoose
- Passport JWT authentication with role-based guards
- Nodemailer for email delivery
- Handlebars email templates
- puppeteer-core + Chrome 143 for PDF/image generation
- qrcode package for QR code data URLs

## Getting Started

```bash
cp env-example .env
npm install
npm run start:dev
```

### Environment Variables

Key variables in `.env`:
- `DATABASE_URL` — MongoDB connection string
- `FRONTEND_DOMAIN` — Frontend URL for email links (e.g. `https://gift-cards.nomadsoft.us`)
- `MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASSWORD` — SMTP config
- `APP_NAME` — Used in email subjects and templates (currently "The Hurstwood")

## API Endpoints

All endpoints are versioned under `/api/v1/`.

| Resource | Auth | Description |
|---|---|---|
| `POST /gift-card-templates` | Admin | Create template |
| `GET /gift-card-templates` | Admin | List templates (paginated) |
| `GET /gift-card-templates/active` | Public | Active templates |
| `GET /gift-card-templates/:id` | Admin | Get template |
| `PATCH /gift-card-templates/:id` | Admin | Update template |
| `DELETE /gift-card-templates/:id` | Admin | Soft delete template |
| `POST /gift-cards/purchase` | Public | Purchase a gift card |
| `GET /gift-cards` | Admin | List purchases (paginated) |
| `GET /gift-cards/code/:code` | Public | Lookup by code |
| `GET /gift-cards/email/:email` | Public | Lookup by email |
| `POST /gift-cards/redeem` | Admin | Redeem a gift card |
| `POST /gift-cards/:id/cancel` | Admin | Cancel a gift card |
| `GET /settings` | Public | Get settings |
| `PATCH /settings` | Admin | Update settings |
| `POST /widgets` | Admin | Create widget |
| `GET /widgets` | Admin | List widgets |
| `GET /widgets/public/:apiKey` | Public | Get widget by API key |
| `PATCH /widgets/:id` | Admin | Update widget |
| `DELETE /widgets/:id` | Admin | Delete widget |

## Deployment

The app runs under PM2 as `gift-cards-server` (id 30).

```bash
npx prettier --write <changed files>
npm run build
pm2 restart gift-cards-server
```
