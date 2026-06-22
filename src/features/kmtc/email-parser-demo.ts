// KMTC 메일 파싱 봇 - 실제 샘플 데모

interface ParsedEmail {
  from: string;
  sender: string;
  bookingNo: string;
  loadingDate: string;
  etd: string;
  eta: string;
  cargo: string;
  quantity: string;
  containerInfo: string;
  shipType: 'FERRY' | 'CARGO' | 'UNKNOWN';
  clientCode: string;
  confidence: number;
}

// 실제 Candy 메일 샘플 (image4.png 기반)
const SAMPLE_CANDY_EMAIL = `
From: Candy <Candy@snk.sina.net>
Subject: Re: shipping document for SHY-260503KR(136)

Dear All,

Attached pls find the shipping documents for SHY-260503KR(136)

Loading date: APR 29TH 2026
estimated ETD: MAY 3RD 2026
estimated ETA: MAY 5TH 2026

We make the invoice according to your new request, please check and advise us if any questions.

PAPER BAGS PAPER BOXES :
MrRV Box 1                1,048 PCS    262 CTNS
TOTAL                     1,048        262

Attachments:
- Container loading pict... (1 MB)
- QDSAD20260505(1)... (489 KB)
- SHY-260503KR (136... (288 KB)
- SHY-260503KR (136... (166 KB)
`;

// 발신자 → 거래처 코드 매핑
const SENDER_TO_CLIENT: Record<string, string> = {
  'Candy@snk.sina.net': 'SKL110',
  'lucy@snk.sina.net': 'SKL110',
  'mjlee@fila.com': 'FLK999',
  'nylee@fila.com': 'FLK999',
};

/**
 * 메일 파싱 (정규식 기반)
 */
export function parseKMTCEmail(emailContent: string, fromEmail: string): ParsedEmail {
  // 발신자 이름 추출
  const senderMatch = emailContent.match(/From:\s*(\w+)\s*</);
  const sender = senderMatch ? senderMatch[1] : 'Unknown';

  // 부킹 번호 추출
  const bookingMatch = emailContent.match(/SHY-\d+[A-Z]+\(\d+\)/);
  const bookingNo = bookingMatch ? bookingMatch[0] : '';

  // 날짜 추출
  const loadingMatch = emailContent.match(/Loading date:\s*([A-Z]+\s+\d+[A-Z]+\s+\d{4})/i);
  const loadingDate = loadingMatch ? loadingMatch[1] : '';

  const etdMatch = emailContent.match(/estimated ETD:\s*([A-Z]+\s+\d+[A-Z]+\s+\d{4})/i);
  const etd = etdMatch ? etdMatch[1] : '';

  const etaMatch = emailContent.match(/estimated ETA:\s*([A-Z]+\s+\d+[A-Z]+\s+\d{4})/i);
  const eta = etaMatch ? etaMatch[1] : '';

  // 화물 정보
  const cargoMatch = emailContent.match(/PAPER\s+BAGS\s+PAPER\s+BOXES/i);
  const cargo = cargoMatch ? cargoMatch[0] : '';

  // 수량 정보
  const qtyMatch = emailContent.match(/(\d+,?\d*)\s+PCS\s+(\d+)\s+CTNS/);
  const quantity = qtyMatch ? `${qtyMatch[1]} PCS / ${qtyMatch[2]} CTNS` : '';

  // 컨테이너 정보 추출 (첨부파일명에서)
  const containerMatch = emailContent.match(/(\d+GP|20GP|40GP|40HQ)/i);
  const containerInfo = containerMatch ? containerMatch[0] : '';

  // 선박 타입 감지
  let shipType: 'FERRY' | 'CARGO' | 'UNKNOWN' = 'UNKNOWN';
  if (emailContent.toUpperCase().includes('NEW GOLDEN') || emailContent.includes('DNA001')) {
    shipType = 'FERRY';
  } else if (emailContent.includes('BKI121') || emailContent.toUpperCase().includes('CARGO')) {
    shipType = 'CARGO';
  }

  // 거래처 코드
  const clientCode = SENDER_TO_CLIENT[fromEmail] || 'UNKNOWN';

  // 신뢰도 계산
  let confidence = 0;
  if (bookingNo) confidence += 30;
  if (etd && eta) confidence += 30;
  if (cargo) confidence += 20;
  if (quantity) confidence += 10;
  if (clientCode !== 'UNKNOWN') confidence += 10;

  return {
    from: fromEmail,
    sender,
    bookingNo,
    loadingDate,
    etd,
    eta,
    cargo,
    quantity,
    containerInfo,
    shipType,
    clientCode,
    confidence: confidence / 100,
  };
}

/**
 * 날짜 정규화 (APR 29TH 2026 → 2026-04-29)
 */
export function normalizeDate(dateStr: string): string {
  const months: Record<string, string> = {
    'JAN': '01', 'FEB': '02', 'MAR': '03', 'APR': '04',
    'MAY': '05', 'JUN': '06', 'JUL': '07', 'AUG': '08',
    'SEP': '09', 'OCT': '10', 'NOV': '11', 'DEC': '12',
  };

  const match = dateStr.match(/([A-Z]{3})\s+(\d+)[A-Z]*\s+(\d{4})/i);
  if (!match) return dateStr;

  const month = months[match[1].toUpperCase()];
  const day = match[2].padStart(2, '0');
  const year = match[3];

  return `${year}-${month}-${day}`;
}

/**
 * 샘플 테스트 실행
 */
export function runSampleTest() {
  console.log('=' .repeat(80));
  console.log('🤖 KMTC 메일 파싱 봇 - 샘플 테스트');
  console.log('=' .repeat(80));

  const result = parseKMTCEmail(SAMPLE_CANDY_EMAIL, 'Candy@snk.sina.net');

  console.log('\n📧 원본 메일:');
  console.log(SAMPLE_CANDY_EMAIL.substring(0, 300) + '...');

  console.log('\n✨ 파싱 결과:');
  console.log('─'.repeat(80));
  console.log(`발신자: ${result.sender} (${result.from})`);
  console.log(`거래처 코드: ${result.clientCode} (SKL110 = SNK)`);
  console.log(`부킹 번호: ${result.bookingNo}`);
  console.log(`선적일: ${result.loadingDate} → ${normalizeDate(result.loadingDate)}`);
  console.log(`ETD: ${result.etd} → ${normalizeDate(result.etd)}`);
  console.log(`ETA: ${result.eta} → ${normalizeDate(result.eta)}`);
  console.log(`화물: ${result.cargo}`);
  console.log(`수량: ${result.quantity}`);
  console.log(`컨테이너: ${result.containerInfo || 'N/A'}`);
  console.log(`선박 타입: ${result.shipType}`);
  console.log(`신뢰도: ${(result.confidence * 100).toFixed(0)}%`);

  console.log('\n' + '='.repeat(80));
  console.log('✅ 파싱 완료!');
  console.log('='.repeat(80));

  return result;
}

// 다음 단계: 실제 메일함 연결
export const NEXT_STEPS = `
📋 다음 구현 단계:

1. IMAP 연동 (Gmail/Outlook)
   - nodemailer 또는 imap 패키지
   - Candy@snk.sina.net 메일 자동 감지

2. 자동 실행 (Cron)
   - 5분마다 새 메일 체크
   - Vercel Cron 또는 로컬 스케줄러

3. 알림 전송
   - 카카오톡 or 이메일
   - "새 부킹 도착: SHY-260503KR(136)"

4. DB 저장
   - Supabase에 자동 저장
   - 대시보드에 표시
`;
