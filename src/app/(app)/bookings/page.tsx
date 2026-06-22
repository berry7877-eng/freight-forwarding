const bookings = [
  {
    id: 1,
    bl: 'COSU2345678',
    shipper: '삼성전자',
    origin: 'SEL',
    dest: 'LAX',
    etd: '2026-06-25',
    eta: '2026-07-10',
    container: "20' x2",
    carrier: 'COSCO',
    status: '진행중',
    statusColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 2,
    bl: 'MSCU3456789',
    shipper: 'LG화학',
    origin: 'PUS',
    dest: 'HKG',
    etd: '2026-06-23',
    eta: '2026-06-28',
    container: "40'HC x1",
    carrier: 'MSC',
    status: '입항완료',
    statusColor: 'bg-green-100 text-green-700',
  },
  {
    id: 3,
    bl: 'HLCU4567890',
    shipper: '현대모비스',
    origin: 'ICN',
    dest: 'SGP',
    etd: '2026-06-28',
    eta: '2026-07-05',
    container: "20' x3",
    carrier: 'Hapag-Lloyd',
    status: '예약',
    statusColor: 'bg-gray-100 text-gray-600',
  },
  {
    id: 4,
    bl: 'OOLU5678901',
    shipper: 'SK하이닉스',
    origin: 'PUS',
    dest: 'NYC',
    etd: '2026-07-02',
    eta: '2026-07-20',
    container: "40'HC x2",
    carrier: 'OOCL',
    status: '예약',
    statusColor: 'bg-gray-100 text-gray-600',
  },
  {
    id: 5,
    bl: 'EVGU6789012',
    shipper: '포스코',
    origin: 'ICN',
    dest: 'ROT',
    etd: '2026-06-30',
    eta: '2026-07-15',
    container: "20' x4",
    carrier: 'Evergreen',
    status: '진행중',
    statusColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 6,
    bl: 'COSU1234567',
    shipper: '기아자동차',
    origin: 'ICN',
    dest: 'HAM',
    etd: '2026-06-20',
    eta: '2026-07-08',
    container: "40'HC x3",
    carrier: 'COSCO',
    status: '진행중',
    statusColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 7,
    bl: 'CMAU9876543',
    shipper: '롯데케미칼',
    origin: 'PUS',
    dest: 'MRS',
    etd: '2026-06-15',
    eta: '2026-07-03',
    container: "20' x2",
    carrier: 'CMA CGM',
    status: '입항완료',
    statusColor: 'bg-green-100 text-green-700',
  },
]

const statusOptions = ['전체', '예약', '진행중', '입항완료', '취소']

export default function BookingsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">부킹 관리</h1>
          <p className="text-gray-500 text-sm mt-1">총 {bookings.length}건</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          + 신규 부킹
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-5 flex items-center gap-4">
        <input
          type="text"
          placeholder="BL번호, 화주명 검색..."
          className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-400"
        />
        <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-400 text-gray-700">
          {statusOptions.map((s) => <option key={s}>{s}</option>)}
        </select>
        <input
          type="month"
          defaultValue="2026-06"
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-400 text-gray-700"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">BL번호</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">화주</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">구간</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">선사</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">컨테이너</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">ETD</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">ETA</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">상태</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-mono text-gray-700 font-medium">{b.bl}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{b.shipper}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <span className="font-medium">{b.origin}</span>
                  <span className="mx-1 text-gray-400">→</span>
                  <span className="font-medium">{b.dest}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{b.carrier}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{b.container}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{b.etd}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{b.eta}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${b.statusColor}`}>
                    {b.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-gray-400 hover:text-gray-600 text-sm">상세</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
