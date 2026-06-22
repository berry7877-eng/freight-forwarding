'use client';

import { useState } from 'react';

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

Best regards,
Candy`;

export default function GPTParserPage() {
  const [emailContent, setEmailContent] = useState(SAMPLE_EMAIL);
  const [fromEmail, setFromEmail] = useState('Candy@snk.sina.net');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleParse = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/parse-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailContent,
          fromEmail,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || '파싱 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          🤖 GPT-4o 메일 파싱 (실전)
        </h1>
        <p className="text-gray-600">
          OpenAI GPT-4o API로 실제 메일을 파싱합니다
        </p>
      </div>

      {/* API 키 안내 */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>OPENAI_API_KEY 필요:</strong> .env.local 파일에 추가하세요
            </p>
            <code className="text-xs bg-yellow-100 px-2 py-1 rounded mt-1 inline-block">
              OPENAI_API_KEY=sk-...
            </code>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 왼쪽: 입력 */}
        <div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">📧 메일 입력</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                발신자:
              </label>
              <select
                className="w-full border rounded-lg p-3"
                value={fromEmail}
                onChange={(e) => setFromEmail(e.target.value)}
                disabled={loading}
              >
                <option value="Candy@snk.sina.net">Candy@snk.sina.net</option>
                <option value="lucy@snk.sina.net">lucy@snk.sina.net</option>
                <option value="mjlee@fila.com">mjlee@fila.com</option>
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
                disabled={loading}
              />
            </div>

            <button
              onClick={handleParse}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:from-green-700 hover:to-blue-700 transition disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  GPT-4o 파싱 중...
                </span>
              ) : (
                '🚀 GPT-4o로 파싱하기'
              )}
            </button>
          </div>
        </div>

        {/* 오른쪽: 결과 */}
        <div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">✨ 파싱 결과</h2>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                <p className="text-red-700">❌ {error}</p>
              </div>
            )}

            {!result && !error && !loading && (
              <div className="text-center py-20 text-gray-400">
                <p className="text-6xl mb-4">🤖</p>
                <p>왼쪽에서 "GPT-4o로 파싱하기" 클릭!</p>
              </div>
            )}

            {result && (
              <div className="space-y-4">
                {/* 비용 정보 */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                  <h3 className="font-bold text-purple-800 mb-2">💰 비용 정보</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>토큰 사용: {result.tokens.total.toLocaleString()}</div>
                    <div className="text-right font-bold text-purple-600">{result.cost.usd}</div>
                    <div className="text-xs text-gray-600">입력: {result.tokens.prompt}</div>
                    <div className="text-xs text-gray-600 text-right">출력: {result.tokens.completion}</div>
                  </div>
                </div>

                {/* 신뢰도 */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">🎯 신뢰도</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {result.data.confidence}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all"
                      style={{ width: `${result.data.confidence}%` }}
                    />
                  </div>
                </div>

                {/* 부킹 정보 */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-blue-800 mb-2">📦 부킹 정보</h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>부킹 번호:</strong> <code className="bg-blue-100 px-2 py-1 rounded">{result.data.bookingNo}</code></p>
                    <p><strong>선적항:</strong> {result.data.pol}</p>
                    <p><strong>도착항:</strong> {result.data.pod}</p>
                  </div>
                </div>

                {/* 일정 */}
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-bold text-yellow-800 mb-2">📅 일정</h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>선적일:</strong> {result.data.loadingDate}</p>
                    <p><strong>ETD:</strong> {result.data.etd}</p>
                    <p><strong>ETA:</strong> {result.data.eta}</p>
                  </div>
                </div>

                {/* 화물 */}
                {result.data.cargo && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-bold text-green-800 mb-2">📦 화물</h3>
                    <div className="space-y-1 text-sm">
                      <p><strong>품명:</strong> {result.data.cargo.description}</p>
                      <p><strong>수량:</strong> {result.data.cargo.quantity}</p>
                      {result.data.cargo.cbm && <p><strong>CBM:</strong> {result.data.cargo.cbm}</p>}
                    </div>
                  </div>
                )}

                {/* 컨테이너 */}
                {result.data.container && (
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="font-bold text-orange-800 mb-2">📦 컨테이너</h3>
                    <div className="space-y-1 text-sm">
                      <p><strong>타입:</strong> {result.data.container.type}</p>
                      <p><strong>사이즈:</strong> {result.data.container.size}ft</p>
                      {result.data.container.number && <p><strong>번호:</strong> {result.data.container.number}</p>}
                    </div>
                  </div>
                )}

                {/* 화주 */}
                {(result.data.shipper || result.data.consignee) && (
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-bold text-purple-800 mb-2">👤 화주 정보</h3>
                    <div className="space-y-1 text-sm">
                      {result.data.shipper && <p><strong>송화주:</strong> {result.data.shipper}</p>}
                      {result.data.consignee && <p><strong>수화주:</strong> {result.data.consignee}</p>}
                    </div>
                  </div>
                )}

                {/* Raw JSON */}
                <details className="bg-gray-50 p-4 rounded-lg">
                  <summary className="font-bold cursor-pointer">🔍 전체 JSON 데이터</summary>
                  <pre className="mt-2 text-xs overflow-x-auto">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </details>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 다음 단계 */}
      <div className="mt-8 bg-gradient-to-r from-indigo-900 to-purple-900 text-white rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">🚀 다음 단계: OCR</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold mb-2">📄 MBL/HBL OCR</h3>
            <p className="text-sm text-blue-200 mb-3">
              선하증권(B/L) 이미지 → GPT-4o Vision → 자동 텍스트 추출
            </p>
            <ul className="text-sm space-y-1">
              <li>✅ MBL/HBL 번호</li>
              <li>✅ 송화주/수화주 정보</li>
              <li>✅ 선박명/항차</li>
              <li>✅ 컨테이너 번호</li>
              <li>✅ 화물 상세 정보</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">💾 사내 시스템 자동 입력</h3>
            <p className="text-sm text-blue-200 mb-3">
              파싱된 데이터 → 포맷 변환 → 시스템 입력
            </p>
            <ul className="text-sm space-y-1">
              <li>✅ 자동 필드 매핑</li>
              <li>✅ 유효성 검증</li>
              <li>✅ RPA 또는 API 연동</li>
              <li>✅ 담당자 확인 후 승인</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
