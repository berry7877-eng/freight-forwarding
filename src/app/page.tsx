export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              📦 포워딩 업무 자동화 시스템
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              AI 기반 물류 관리 플랫폼
            </p>
          </div>

          {/* Status Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="text-3xl mb-2">✅</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Next.js 14
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                최신 React 프레임워크
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="text-3xl mb-2">✅</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Supabase
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                데이터베이스 연동 완료
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="text-3xl mb-2">✅</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Vercel
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                클라우드 배포 준비
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              🚀 핵심 기능
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-2xl mr-3">📧</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    자동 메일 파싱
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    GPT-4o로 TOM/FAJRIAN 메일 자동 분석
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">📋</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    부킹 자동 등록
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    HBL, MBL, 일정 자동 추출 및 저장
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">💰</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    청구서 자동 발행
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    10/20/30일 자동 마감 및 PDF 생성
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">⏰</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    자동 알림
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    입항 D-1 BL 노티, 화주 컨펌 자동 발송
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Stats */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">자동화율</h3>
              <p className="text-4xl font-bold">75%</p>
              <p className="text-blue-100 mt-2">60시간/월 → 15시간/월</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">개발 진행률</h3>
              <p className="text-4xl font-bold">15%</p>
              <p className="text-green-100 mt-2">환경 설정 완료</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
