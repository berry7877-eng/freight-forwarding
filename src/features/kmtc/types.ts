// KMTC 업무 자동화 타입 정의
// 출처: 업무인수인계서_Numbers용_완성본.xlsx

export interface KMTCBooking {
  id: string;
  bookingNo: string;         // KMTCXMN0945917, KMTCSHAP598575EUWS

  // 선박 정보
  vesselName: string;        // KMTC SHANGHAI
  voyageNo: string;          // 2506N
  shipType: 'FERRY' | 'CARGO'; // 훼리 vs 화물선
  shipCode: 'DNA001' | 'BKI121'; // DTC 코드

  // 항로
  pol: string;               // SHA, TAO, XMN
  pod: string;               // INC, PUS
  etd: Date;
  eta: Date;
  arrivalDate?: Date;

  // 컨테이너
  containerType: 'FCL' | 'LCL';
  containerSize: '20' | '40';
  containerNo?: string;

  // 화주
  clientId: string;
  clientName: string;

  // 비용
  oceanFreight?: number;
  shuttleFee?: number;       // 셔틀료 (DTC)
  loadingFee?: number;       // 상하차비

  // 반납지
  returnLocation?: 'BUGOK' | 'INCHEON' | 'KCTC';

  // 상태
  status: 'PENDING' | 'CONFIRMED' | 'ARRIVED' | 'COMPLETED';

  // 메타
  createdAt: Date;
  updatedAt: Date;
}

export interface KMTCShipRoute {
  shipType: 'FERRY' | 'CARGO';
  shipCode: 'DNA001' | 'BKI121';
  shipName: string;
  carrier: 'NEW_GOLDEN' | 'BK_ONE' | 'DTC';
  description: string;
  canSelfTransport: boolean; // 자가운송 가능 여부
}

// SNK 화주 전용 - 훼리선 vs 화물선
export const SNK_SHIP_ROUTES: KMTCShipRoute[] = [
  {
    shipType: 'FERRY',
    shipCode: 'DNA001',
    shipName: 'NEW GOLDEN',
    carrier: 'NEW_GOLDEN',
    description: '훼리선 - DTC 전용, 자가운송 불가',
    canSelfTransport: false
  },
  {
    shipType: 'CARGO',
    shipCode: 'BKI121',
    shipName: '일반 화물선',
    carrier: 'BK_ONE',
    description: '화물선 - 비케이원, 자가운송 가능',
    canSelfTransport: true
  }
];

export interface KMTCContact {
  name: string;
  email: string;
  role: 'DOCS' | 'SC' | 'RETURN_LOCATION';
  department: string;
  phone?: string;
}

// KMTC 담당자 정보
export const KMTC_CONTACTS: KMTCContact[] = [
  {
    name: '다큐팀',
    email: 'docid@ekmtc.com',
    role: 'DOCS',
    department: '수입 서류팀'
  },
  {
    name: '정유경',
    email: 'yukyung@ekmtc.com',
    role: 'RETURN_LOCATION',
    department: '반납지 변경'
  },
  {
    name: '홍건화',
    email: 'geonhwa@ekmtc.com',
    role: 'SC',
    department: 'FR 컨테이너 SC 연장'
  },
  {
    name: 'Filasi',
    email: 'filasi@kmtclogistics.com',
    role: 'DOCS',
    department: '선적 서류'
  },
  {
    name: 'Rana',
    email: 'rana@kmtclogistics.com',
    role: 'DOCS',
    department: '선적 서류'
  }
];

export interface DTCFee {
  shuttleFee: number;        // 셔틀료 대납
  loadingFee: number;        // 상하차비
  terminalFee: number;       // 터미널비
  total: number;
}

export interface KMTCInvoiceGroup {
  id: string;
  name: string;              // "KMTC_20260630"
  period: string;            // "2026-06-21 ~ 2026-06-30"
  billingDate: string;       // "10" | "20" | "30"
  bookings: KMTCBooking[];
  totalAmount: number;
  status: 'DRAFT' | 'ISSUED' | 'SENT';
  createdAt: Date;
}

// 부킹 번호 패턴
export const KMTC_BOOKING_PATTERNS = [
  /KMTC[A-Z]{3}\d{7,10}/,           // KMTCXMN0945917
  /KMTC[A-Z]{4}\d{6}[A-Z]{4}/,      // KMTCSHAP598575EUWS
  /KMTC[A-Z]{3,4}\d{6,10}/,         // KMTCSHA, KMTCSHAO
  /KS[A-Z]{3}\d{7}/                  // KSSHA2601247
];

// KMTC 메일 도메인
export const KMTC_EMAIL_DOMAINS = [
  '@kmtclogistics.com',
  '@ekmtc.com',
  '@kmtc.com'
];

// KMTC 키워드
export const KMTC_KEYWORDS = [
  'KMTC',
  '고려해운',
  'Korea Marine',
  'DTC',
  'DNA001',
  'BKI121',
  'NEW GOLDEN',
  '부킹 컨펌',
  'SC 연장',
  '반납지 변경'
];
