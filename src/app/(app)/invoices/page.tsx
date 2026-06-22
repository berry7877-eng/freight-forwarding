const invoiceSummary = [
  { label: '미발행', value: 3, amount: '₩4,210,000', color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200' },
  { label: '발행완료 (미수금)', value: 5, amount: '₩8,420,000', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
  { label: '수금완료', value: 16, amount: '₩31,850,000', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
]

const invoices = [
  {
    id: 'INV-2026-001',
    shipper: '삼성전자',
    bl: 'COSU2345678',
    amount: '₩1,250,000',
    issued: '2026-06-10',
    due: '2026-06-30',
    status: '미수금',
    statusColor: 'bg-orange-100 text-orange-700',
    overdue: false,
  },
  {
    id: 'INV-2026-002',
    shipper: 'LG화학',
    bl: 'MSCU3456789',
    amount: '₩890,000',
    issued: '2026-06-15',
    due: '2026-07-05',
    status: '수금완료',
    statusColor: 'bg-green-100 text-green-700',
    overdue: false,
  },
  {
    id: 'INV-2026-003',
    shipper: '현대모비스',
    bl: 'HLCU4567890',
    amount: '₩2,100,000',
    issued: '-',
    due: '2026-06-30',
    status: '미발행',
    statusColor: 'bg-gray-100 text-gray-600',
    overdue: false,
  },
  {
    id: 'INV-2026-004',
    shipper: 'SK하이닉스',
    bl: 'OOLU5678901',
    amount: '₩760,000',
    issued: '2026-06-01',
    due: '2026-06-20',
    status: '연체',
    statusColor: 'bg-red-100 text-red-700',
    overdue: true,
  },
  {
    id: 'INV-2026-005',
    shipper: '포스코',
    bl: 'EVGU6789012',
    amount: '₩3,400,000',
    issued: '2026-06-05',
    due: '2026-06-25',
    status: '미수금',
    statusColor: 'bg-orange-100 text-orange-700',
    overdue: false,
  },
  {
    id: 'INV-2026-006',
    shipper: '기아자동차',
    bl: 'COSU1234567',
    amount: '₩4,010,000',
    issued: '-',
    due: '2026-07-10',
    status: '미발행',
    statusColor: 'bg-gray-100 text-gray-600',
    overdue: false,
  },
  {
    id: 'INV-2026-007',
    shipper: '롯데케미칼',
    bl: 'CMAU9876543',
    amount: '₩1,580,000',
    issued: '2026-05-20',
    due: '2026-06-10',
    status: '수금완료',
    statusColor: 'bg-green-100 text-green-700',
    overdue: false,
  },
]

export default function InvoicesPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">청구서 관리</h1>
          <p className="text-gray-500 text-sm mt-1">총 {invoices.length}건</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            PDF 일괄 출력
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            + 청구서 발행
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-5 mb-8">
        {invoiceSummary.map((s) => (
          <div key={s.label} className={`rounded-xl border ${s.border} ${s.bg} p-5`}>
            <p className="text-gray-500 text-xs font-medium mb-2">{s.label}</p>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}건</p>
            <p className="text-gray-600 text-sm mt-1 font-medium">{s.amount}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-5 flex items-center gap-4">
        <input
          type="text"
          placeholder="청구서 번호, 화주명 검색..."
          className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-400"
        />
        <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-400 text-gray-700">
          <option>전체</option>
          <option>미발행</option>
          <option>미수금</option>
          <option>수금완료</option>
          <option>연체</option>
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
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">청구서 번호</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">화주</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">BL번호</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">금액</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">발행일</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">만기일</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">상태</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {invoices.map((inv) => (
              <tr key={inv.id} className={`hover:bg-gray-50 transition-colors ${inv.overdue ? 'bg-red-50/30' : ''}`}>
                <td className="px-6 py-4 text-sm font-mono text-gray-700 font-medium">{inv.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{inv.shipper}</td>
                <td className="px-6 py-4 text-sm font-mono text-gray-500">{inv.bl}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium text-right">{inv.amount}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{inv.issued}</td>
                <td className={`px-6 py-4 text-sm ${inv.overdue ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                  {inv.due}
                  {inv.overdue && <span className="ml-1 text-xs">(D+2)</span>}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${inv.statusColor}`}>
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="text-gray-400 hover:text-gray-600 text-sm">PDF</button>
                    <button className="text-gray-400 hover:text-blue-600 text-sm">발송</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
