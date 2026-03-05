import { randomBytes } from 'crypto';

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function randomSegment(length: number): string {
  const bytes = randomBytes(length);
  return Array.from(bytes)
    .map((b) => CHARS[b % CHARS.length])
    .join('');
}

export function generateGiftCardCode(): string {
  return `GC-${randomSegment(4)}-${randomSegment(4)}-${randomSegment(4)}`;
}
