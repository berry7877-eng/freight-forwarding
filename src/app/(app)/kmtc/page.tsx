'use client';

import { useState } from 'react';

// KMTC 업무 자동화 대시보드
export default function KMTCPage() {
  const [testEmail, setTestEmail] = useState('');
  const [parseResult, setParseResult] = useState<any>(null);

  const handleTest = () => {
    // 테스트용 - 나중에 실제 API 연동
    const mockResult = {
      isKMTC: testEmail.includes('KMTC') || testEmail.includes('@ekmtc.com'),
      bookingNos: ['KMTCXMN0945917'],
      shipType: 'FERRY',
      pol: 'SHA',
      pod: 'INC',
      confidence: 0.92
    };

    setParseResult(mockResult);
  };

  return (
    <div className="p-8">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🚢 KMTC 업무 자동화
        </h1>
        <p className="text-gray-600">
          고려해운(KMTC) 관련 업무를 자동으로 처리합니다
        </p>
      </div>

      {/* 통계 카드 */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-1">금일 처리</div>
          <div className="text-3xl font-bold text-blue-600">12</div>
          <div className="text-xs text-gray-500 mt-1">부킹 자동 등록</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-1">훼리선</div>
          <div className="text-3xl font-bold text-green-600">8</div>
          <div className="text-xs text-gray-500 mt-1">DNA001 (NEW GOLDEN)</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-1">화물선</div>
          <div className="text-3xl font-bold text-orange-600">4</div>
          <div className="text-xs text-gray-500 mt-1">BKI121 (비케이원)</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-1">반납지 변경</div>
          <div className="text-3xl font-bold text-purple-600">3</div>
          <div className="text-xs text-gray-500 mt-1">입고 D-1 자동 알림</div>
        </div>
      </div>

      {/* 메일 파싱 테스트 */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">📧 KMTC 메일 파싱 테스트</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            테스트 메일 내용:
          </label>
          <textarea
            className="w-full border rounded-lg p-3 h-32"
            placeholder="예시: KMTCXMN0945917 부킹 컨펌 / ETD: 2026-06-25 / ETA: 2026-06-27 / 훼리선 DNA001"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
          />
        </div>

        <button
          onClick={handleTest}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          파싱 테스트
        </button>

        {parseResult && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold mb-2">파싱 결과:</h3>
            <pre className="text-sm">{JSON.stringify(parseResult, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* 최근 KMTC 부킹 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">📦 최근 KMTC 부킹</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  부킹번호
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  화주
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  선박
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  항로
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  ETA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  상태
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* 샘플 데이터 */}
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  KMTCXMN0945917
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  SNK
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                    훼리 DNA001
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  SHA → INC
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  2026-06-27
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                    입고예정
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  KMTCSHAP598575EUWS
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  상해화주
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">
                    화물선 BKI121
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  SHA → INC
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  2026-06-28
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    컨펌완료
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  KSSHA2601247
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  모다이노칩
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                    훼리 DNA001
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  SHA → INC
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  2026-06-26
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                    입고완료
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 자동화 워크플로우 */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">⚙️ 자동화 워크플로우</h2>

        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mr-4">
              1
            </div>
            <div>
              <h3 className="font-bold">KMTC 메일 자동 감지</h3>
              <p className="text-sm text-gray-600">
                @kmtclogistics.com, @ekmtc.com 도메인 자동 인식
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold mr-4">
              2
            </div>
            <div>
              <h3 className="font-bold">부킹 번호 자동 추출</h3>
              <p className="text-sm text-gray-600">
                KMTCXMN0945917, KSSHA2601247 등 패턴 매칭
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold mr-4">
              3
            </div>
            <div>
              <h3 className="font-bold">선박 타입 자동 분류</h3>
              <p className="text-sm text-gray-600">
                DNA001 (훼리) / BKI121 (화물선) 자동 구분
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold mr-4">
              4
            </div>
            <div>
              <h3 className="font-bold">입고 D-1 자동 알림</h3>
              <p className="text-sm text-gray-600">
                제니픽스/에이픽스 → 반납지 변경 메일 자동 발송
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
