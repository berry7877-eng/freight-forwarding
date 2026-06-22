'use client';

import { useState } from 'react';

// 실제 Candy 메일 샘플
const SAMPLE_EMAIL = `From: Candy <Candy@snk.sina.net>
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
- SHY-260503KR (136... (288 KB)`;

// 파싱 함수 (클라이언트 버전)
function parseEmail(content: string, from: string) {
  // 발신자
  const senderMatch = content.match(/From:\s*(\w+)\s*</);
  const sender = senderMatch ? senderMatch[1] : 'Unknown';

  // 부킹 번호
  const bookingMatch = content.match(/SHY-\d+[A-Z]+\(\d+\)/);
  const bookingNo = bookingMatch ? bookingMatch[0] : '';

  // 날짜
  const loadingMatch = content.match(/Loading date:\s*([A-Z]+\s+\d+[A-Z]+\s+\d{4})/i);
  const loadingDate = loadingMatch ? loadingMatch[1] : '';

  const etdMatch = content.match(/estimated ETD:\s*([A-Z]+\s+\d+[A-Z]+\s+\d{4})/i);
  const etd = etdMatch ? etdMatch[1] : '';

  const etaMatch = content.match(/estimated ETA:\s*([A-Z]+\s+\d+[A-Z]+\s+\d{4})/i);
  const eta = etaMatch ? etaMatch[1] : '';

  // 화물
  const cargoMatch = content.match(/PAPER\s+BAGS\s+PAPER\s+BOXES/i);
  const cargo = cargoMatch ? cargoMatch[0] : '';

  // 수량
  const qtyMatch = content.match(/(\d+,?\d*)\s+PCS\s+(\d+)\s+CTNS/);
  const quantity = qtyMatch ? `${qtyMatch[1]} PCS / ${qtyMatch[2]} CTNS` : '';

  // 거래처 코드
  const clientMap: Record<string, string> = {
    'Candy@snk.sina.net': 'SKL110',
    'lucy@snk.sina.net': 'SKL110',
    'mjlee@fila.com': 'FLK999',
  };
  const clientCode = clientMap[from] || 'UNKNOWN';

  // 선박 타입
  let shipType = 'UNKNOWN';
  if (content.toUpperCase().includes('NEW GOLDEN') || content.includes('DNA001')) {
    shipType = 'FERRY';
  } else if (content.includes('BKI121')) {
    shipType = 'CARGO';
  }

  // 신뢰도
  let confidence = 0;
  if (bookingNo) confidence += 30;
  if (etd && eta) confidence += 30;
  if (cargo) confidence += 20;
  if (quantity) confidence += 10;
  if (clientCode !== 'UNKNOWN') confidence += 10;

  return {
    sender,
    clientCode,
    bookingNo,
    loadingDate,
    etd,
    eta,
    cargo,
    quantity,
    shipType,
    confidence,
  };
}

// 날짜 변환
function normalizeDate(dateStr: string): string {
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

export default function KMTCDemoPage() {
  const [emailContent, setEmailContent] = useState(SAMPLE_EMAIL);
  const [fromEmail, setFromEmail] = useState('Candy@snk.sina.net');
  const [result, setResult] = useState<any>(null);

  const handleParse = () => {
    const parsed = parseEmail(emailContent, fromEmail);
    setResult(parsed);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          🤖 KMTC 메일 파싱 봇 - 실전 데모
        </h1>
        <p className="text-gray-600">
          실제 Candy 메일을 파싱해보세요 (image4.png 기반)
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 왼쪽: 메일 입력 */}
        <div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              📧 원본 메일
              <span className="text-sm font-normal text-gray-500">
                (실제 Candy 메일 샘플)
              </span>
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                발신자 이메일:
              </label>
              <select
                className="w-full border rounded-lg p-3"
                value={fromEmail}
                onChange={(e) => setFromEmail(e.target.value)}
              >
                <option value="Candy@snk.sina.net">Candy@snk.sina.net (SNK)</option>
                <option value="lucy@snk.sina.net">lucy@snk.sina.net (SNK)</option>
                <option value="mjlee@fila.com">mjlee@fila.com (미스토)</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                메일 내용:
              </label>
              <textarea
                className="w-full border rounded-lg p-3 font-mono text-sm h-96"
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
              />
            </div>

            <button
              onClick={handleParse}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition"
            >
              🚀 파싱 시작!
            </button>
          </div>
        </div>

        {/* 오른쪽: 파싱 결과 */}
        <div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">✨ 파싱 결과</h2>

            {!result ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-6xl mb-4">🤖</p>
                <p>왼쪽에서 "파싱 시작!" 버튼을 클릭하세요</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* 신뢰도 */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">🎯 신뢰도</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {result.confidence}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all"
                      style={{ width: `${result.confidence}%` }}
                    />
                  </div>
                </div>

                {/* 발신자 정보 */}
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-bold text-purple-800 mb-2">👤 발신자 정보</h3>
                  <div className="space-y-1">
                    <p><span className="font-semibold">이름:</span> {result.sender}</p>
                    <p>
                      <span className="font-semibold">거래처 코드:</span>{' '}
                      <span className="bg-purple-600 text-white px-3 py-1 rounded text-sm font-bold">
                        {result.clientCode}
                      </span>
                      {result.clientCode === 'SKL110' && ' (SNK)'}
                      {result.clientCode === 'FLK999' && ' (미스토코리아)'}
                    </p>
                  </div>
                </div>

                {/* 부킹 정보 */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-blue-800 mb-2">📦 부킹 정보</h3>
                  <div className="space-y-1">
                    <p>
                      <span className="font-semibold">부킹 번호:</span>{' '}
                      <span className="font-mono bg-blue-600 text-white px-2 py-1 rounded">
                        {result.bookingNo}
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold">선박 타입:</span>{' '}
                      {result.shipType === 'FERRY' ? (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                          🚢 훼리선 (DNA001)
                        </span>
                      ) : result.shipType === 'CARGO' ? (
                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">
                          📦 화물선 (BKI121)
                        </span>
                      ) : (
                        <span className="text-gray-500">알 수 없음</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* 일정 */}
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-bold text-yellow-800 mb-2">📅 일정</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-600">선적일 (Loading)</p>
                      <p className="font-mono">{result.loadingDate}</p>
                      <p className="text-sm text-blue-600">→ {normalizeDate(result.loadingDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">출항일 (ETD)</p>
                      <p className="font-mono">{result.etd}</p>
                      <p className="text-sm text-blue-600">→ {normalizeDate(result.etd)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">입항일 (ETA)</p>
                      <p className="font-mono">{result.eta}</p>
                      <p className="text-sm text-blue-600">→ {normalizeDate(result.eta)}</p>
                    </div>
                  </div>
                </div>

                {/* 화물 정보 */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold text-green-800 mb-2">📦 화물 정보</h3>
                  <div className="space-y-1">
                    <p><span className="font-semibold">품명:</span> {result.cargo}</p>
                    <p><span className="font-semibold">수량:</span> {result.quantity}</p>
                  </div>
                </div>

                {/* 자동 처리 제안 */}
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg border-2 border-purple-200">
                  <h3 className="font-bold text-purple-800 mb-2">💡 다음 단계 (자동화)</h3>
                  <ul className="space-y-1 text-sm">
                    <li>✅ Supabase DB에 자동 저장</li>
                    <li>✅ 담당자에게 카톡 알림 발송</li>
                    <li>✅ 대시보드에 표시</li>
                    <li>✅ 첨부파일 자동 다운로드</li>
                    {result.shipType === 'FERRY' && (
                      <li className="text-green-700 font-semibold">
                        ⚠️ 훼리선 → DTC 배차 필요 (자가운송 불가)
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 다음 단계 안내 */}
      <div className="mt-8 bg-gradient-to-r from-blue-900 to-purple-900 text-white rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">🚀 실제 구현 단계</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-bold mb-2">1️⃣ IMAP 연동</h3>
            <p className="text-sm text-blue-200">
              Gmail/Outlook 메일함 자동 감지<br/>
              5분마다 새 메일 체크
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">2️⃣ 자동 저장</h3>
            <p className="text-sm text-blue-200">
              Supabase DB 자동 저장<br/>
              대시보드 실시간 업데이트
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">3️⃣ 알림 발송</h3>
            <p className="text-sm text-blue-200">
              카카오톡/이메일 알림<br/>
              "새 부킹 도착!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
