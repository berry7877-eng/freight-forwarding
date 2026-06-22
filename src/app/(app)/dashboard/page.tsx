const stats = [
  { label: '이번 달 부킹', value: '24건', sub: '전월 대비 +3건', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: '미수금', value: '₩8,420,000', sub: '4건 미납', color: 'text-red-600', bg: 'bg-red-50' },
  { label: '입항 예정 (7일)', value: '7건', sub: '내일 2건 포함', color: 'text-green-600', bg: 'bg-green-50' },
  { label: '처리 대기', value: '3건', sub: 'BL 노티 발송 필요', color: 'text-orange-600', bg: 'bg-orange-50' },
]

const recentBookings = [
  { bl: 'COSU2345678', shipper: '삼성전자', route: 'SEL → LAX', eta: '2026-07-10', status: '진행중', statusColor: 'bg-blue-100 text-blue-700' },
  { bl: 'MSCU3456789', shipper: 'LG화학', route: 'PUS → HKG', eta: '2026-06-28', status: '입항완료', statusColor: 'bg-green-100 text-green-700' },
  { bl: 'HLCU4567890', shipper: '현대모비스', route: 'ICN → SGP', eta: '2026-07-05', status: '예약', statusColor: 'bg-gray-100 text-gray-600' },
  { bl: 'OOLU5678901', shipper: 'SK하이닉스', route: 'PUS → NYC', eta: '2026-07-20', status: '예약', statusColor: 'bg-gray-100 text-gray-600' },
  { bl: 'EVGU6789012', shipper: '포스코', route: 'ICN → ROT', eta: '2026-07-15', status: '진행중', statusColor: 'bg-blue-100 text-blue-700' },
]

const upcomingArrivals = [
  { bl: 'MSCU3456789', shipper: 'LG화학', vessel: 'EVER GIVEN', eta: '2026-06-23', notified: true },
  { bl: 'HLCU4567890', shipper: '현대모비스', vessel: 'MSC OSCAR', eta: '2026-06-24', notified: false },
  { bl: 'COSU1234567', shipper: '기아자동차', vessel: 'CMA CGM MARCO POLO', eta: '2026-06-25', notified: false },
]

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
        <p className="text-gray-500 text-sm mt-1">2026년 6월 22일 기준</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${stat.bg} mb-3`}>
              <span className={`text-lg font-bold ${stat.color}`}>#</span>
            </div>
            <p className="text-gray-500 text-xs font-medium mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-gray-400 text-xs mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">최근 부킹</h2>
            <a href="/bookings" className="text-blue-600 text-sm hover:underline">전체 보기</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">BL번호</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">화주</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">구간</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">ETA</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">상태</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentBookings.map((b) => (
                  <tr key={b.bl} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3 text-sm font-mono text-gray-700">{b.bl}</td>
                    <td className="px-6 py-3 text-sm text-gray-900">{b.shipper}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{b.route}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{b.eta}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${b.statusColor}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Arrivals */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">입항 예정 (7일)</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {upcomingArrivals.map((a) => (
              <div key={a.bl} className="px-6 py-4">
                <div className="flex items-start justify-between mb-1">
                  <span className="font-mono text-sm text-gray-700">{a.bl}</span>
                  {a.notified ? (
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">노티 완료</span>
                  ) : (
                    <span className="text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded">노티 필요</span>
                  )}
                </div>
                <p className="text-sm font-medium text-gray-900">{a.shipper}</p>
                <p className="text-xs text-gray-500 mt-0.5 truncate">{a.vessel}</p>
                <p className="text-xs text-blue-600 mt-1">ETA: {a.eta}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
