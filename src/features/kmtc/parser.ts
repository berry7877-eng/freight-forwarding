// KMTC 메일 파싱 유틸리티

import { KMTC_BOOKING_PATTERNS, KMTC_EMAIL_DOMAINS, KMTC_KEYWORDS } from './types';

interface Email {
  from: string;
  subject: string;
  body: string;
  attachments?: string[];
}

/**
 * KMTC 관련 메일인지 확인
 */
export function isKMTCEmail(email: Email): boolean {
  // 1. 도메인 체크
  const isKMTCDomain = KMTC_EMAIL_DOMAINS.some(domain =>
    email.from.toLowerCase().includes(domain)
  );

  if (isKMTCDomain) return true;

  // 2. 키워드 체크
  const content = (email.subject + ' ' + email.body).toUpperCase();
  const hasKeyword = KMTC_KEYWORDS.some(keyword =>
    content.includes(keyword.toUpperCase())
  );

  return hasKeyword;
}

/**
 * 메일에서 KMTC 부킹 번호 추출
 */
export function extractKMTCBookingNo(text: string): string | null {
  for (const pattern of KMTC_BOOKING_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      return match[0];
    }
  }
  return null;
}

/**
 * 여러 개의 부킹 번호 추출
 */
export function extractAllKMTCBookingNos(text: string): string[] {
  const bookingNos: string[] = [];

  for (const pattern of KMTC_BOOKING_PATTERNS) {
    const matches = text.matchAll(new RegExp(pattern, 'g'));
    for (const match of matches) {
      if (!bookingNos.includes(match[0])) {
        bookingNos.push(match[0]);
      }
    }
  }

  return bookingNos;
}

/**
 * 선박 타입 감지 (훼리 vs 화물선)
 */
export function detectShipType(text: string): 'FERRY' | 'CARGO' | null {
  const upperText = text.toUpperCase();

  if (upperText.includes('DNA001') || upperText.includes('NEW GOLDEN') || upperText.includes('훼리')) {
    return 'FERRY';
  }

  if (upperText.includes('BKI121') || upperText.includes('화물선')) {
    return 'CARGO';
  }

  return null;
}

/**
 * 선적항 코드 추출
 */
export function extractPOL(text: string): string | null {
  const polPattern = /(?:POL|선적항|FROM)[:\s]+([A-Z]{3})/i;
  const match = text.match(polPattern);

  if (match) return match[1];

  // 알려진 항구 코드 직접 검색
  const ports = ['SHA', 'TAO', 'XMN', 'SGN', 'QIN'];
  for (const port of ports) {
    if (text.toUpperCase().includes(port)) {
      return port;
    }
  }

  return null;
}

/**
 * 도착항 코드 추출
 */
export function extractPOD(text: string): string | null {
  const podPattern = /(?:POD|도착항|TO)[:\s]+([A-Z]{3})/i;
  const match = text.match(podPattern);

  if (match) return match[1];

  // 한국 항구
  const koreaPorts = ['INC', 'PUS', 'ICN'];
  for (const port of koreaPorts) {
    if (text.toUpperCase().includes(port)) {
      return port;
    }
  }

  return null;
}

/**
 * 날짜 추출 (ETD/ETA)
 */
export function extractDates(text: string): { etd?: Date; eta?: Date } {
  const result: { etd?: Date; eta?: Date } = {};

  // ETD 패턴
  const etdPattern = /ETD[:\s]+(\d{4}[-\/]\d{2}[-\/]\d{2}|\d{2}[-\/]\d{2}[-\/]\d{4})/i;
  const etdMatch = text.match(etdPattern);
  if (etdMatch) {
    result.etd = new Date(etdMatch[1]);
  }

  // ETA 패턴
  const etaPattern = /ETA[:\s]+(\d{4}[-\/]\d{2}[-\/]\d{2}|\d{2}[-\/]\d{2}[-\/]\d{4})/i;
  const etaMatch = text.match(etaPattern);
  if (etaMatch) {
    result.eta = new Date(etaMatch[1]);
  }

  return result;
}

/**
 * 컨테이너 사이즈 추출
 */
export function extractContainerSize(text: string): '20' | '40' | null {
  if (text.includes('40') || text.toUpperCase().includes('40FT') || text.toUpperCase().includes('40\'')) {
    return '40';
  }

  if (text.includes('20') || text.toUpperCase().includes('20FT') || text.toUpperCase().includes('20\'')) {
    return '20';
  }

  return null;
}

/**
 * FCL/LCL 구분
 */
export function detectContainerType(text: string): 'FCL' | 'LCL' | null {
  const upperText = text.toUpperCase();

  if (upperText.includes('FCL')) return 'FCL';
  if (upperText.includes('LCL')) return 'LCL';

  return null;
}

/**
 * 빠른 파싱 (정규식만 사용)
 */
export function quickParse(email: Email) {
  const fullText = email.subject + '\n' + email.body;

  return {
    isKMTC: isKMTCEmail(email),
    bookingNos: extractAllKMTCBookingNos(fullText),
    shipType: detectShipType(fullText),
    pol: extractPOL(fullText),
    pod: extractPOD(fullText),
    dates: extractDates(fullText),
    containerSize: extractContainerSize(fullText),
    containerType: detectContainerType(fullText)
  };
}

/**
 * KMTC 담당자 찾기
 */
export function getKMTCContactByEmail(email: string): string | null {
  const lowerEmail = email.toLowerCase();

  if (lowerEmail.includes('yukyung@ekmtc.com')) return '정유경 (반납지 변경)';
  if (lowerEmail.includes('geonhwa@ekmtc.com')) return '홍건화 (SC 연장)';
  if (lowerEmail.includes('docid@ekmtc.com')) return '다큐팀 (서류)';
  if (lowerEmail.includes('filasi@kmtclogistics.com')) return 'Filasi (선적)';
  if (lowerEmail.includes('rana@kmtclogistics.com')) return 'Rana (선적)';

  return null;
}
