const scheduledNotifications = [
  {
    id: 1,
    type: 'BL 노티',
    target: '현대모비스',
    bl: 'HLCU4567890',
    scheduledAt: '2026-06-23 09:00',
    eta: '2026-06-24',
    channel: '이메일',
    status: '예정',
    statusColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 2,
    type: 'BL 노티',
    target: '기아자동차',
    bl: 'COSU1234567',
    scheduledAt: '2026-06-24 09:00',
    eta: '2026-06-25',
    channel: '이메일',
    status: '예정',
    statusColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 3,
    type: '청구서 발송',
    target: '포스코',
    bl: 'EVGU6789012',
    scheduledAt: '2026-06-25 10:00',
    eta: '-',
    channel: '이메일',
    status: '예정',
    statusColor: 'bg-blue-100 text-blue-700',
  },
]

const sentNotifications = [
  {
    id: 4,
    type: 'BL 노티',
    target: 'LG화학',
    bl: 'MSCU3456789',
    sentAt: '2026-06-22 09:00',
    channel: '이메일',
    status: '발송완료',
    statusColor: 'bg-green-100 text-green-700',
    opened: true,
  },
  {
    id: 5,
    type: '청구서 발송',
    target: 'SK하이닉스',
    bl: 'OOLU5678901',
    sentAt: '2026-06-21 14:30',
    channel: '이메일',
    status: '발송완료',
    statusColor: 'bg-green-100 text-green-700',
    opened: false,
  },
  {
    id: 6,
    type: '연체 알림',
    target: 'SK하이닉스',
    bl: 'OOLU5678901',
    sentAt: '2026-06-21 10:00',
    channel: '이메일',
    status: '발송완료',
    statusColor: 'bg-green-100 text-green-700',
    opened: true,
  },
  {
    id: 7,
    type: 'BL 노티',
    target: '롯데케미칼',
    bl: 'CMAU9876543',
    sentAt: '2026-06-19 09:00',
    channel: '이메일',
    status: '발송완료',
    statusColor: 'bg-green-100 text-green-700',
    opened: true,
  },
]

const notificationTypes = [
  {
    type: 'BL 노티',
    desc: '입항 D-1 자동 발송',
    enabled: true,
    timing: '입항 1일 전 09:00',
  },
  {
    type: '청구서 발행 알림',
    desc: '매월 10/20/30일 자동 마감',
    enabled: true,
    timing: '마감일 오전 10:00',
  },
  {
    type: '미수금 독촉',
    desc: '만기 후 D+3 자동 발송',
    enabled: true,
    timing: '만기일 기준 3일 후',
  },
  {
    type: '부킹 컨펌',
    desc: '화주 부킹 확인 요청',
    enabled: false,
    timing: 'ETD 7일 전',
  },
]

export default function NotificationsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">알림 관리</h1>
          <p className="text-gray-500 text-sm mt-1">자동 발송 설정 및 발송 내역</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          수동 발송
        </button>
      </div>

      {/* Notification Type Settings */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">자동 알림 설정</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {notificationTypes.map((n) => (
            <div key={n.type} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${n.enabled ? 'bg-green-500' : 'bg-gray-300'}`} />
                <div>
                  <p className="text-sm font-medium text-gray-900">{n.type}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{n.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-xs text-gray-500">{n.timing}</span>
                <div
                  className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${
                    n.enabled ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      n.enabled ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduled */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">발송 예정 ({scheduledNotifications.length}건)</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">유형</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">수신 화주</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">BL번호</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">예정 시각</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">채널</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">상태</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {scheduledNotifications.map((n) => (
              <tr key={n.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3 text-sm font-medium text-gray-900">{n.type}</td>
                <td className="px-6 py-3 text-sm text-gray-700">{n.target}</td>
                <td className="px-6 py-3 text-sm font-mono text-gray-500">{n.bl}</td>
                <td className="px-6 py-3 text-sm text-gray-600">{n.scheduledAt}</td>
                <td className="px-6 py-3 text-sm text-gray-600">{n.channel}</td>
                <td className="px-6 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${n.statusColor}`}>
                    {n.status}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <button className="text-gray-400 hover:text-gray-600 text-sm">취소</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sent History */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">발송 내역</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">유형</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">수신 화주</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">BL번호</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">발송 시각</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">채널</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">상태</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">열람</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {sentNotifications.map((n) => (
              <tr key={n.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3 text-sm font-medium text-gray-900">{n.type}</td>
                <td className="px-6 py-3 text-sm text-gray-700">{n.target}</td>
                <td className="px-6 py-3 text-sm font-mono text-gray-500">{n.bl}</td>
                <td className="px-6 py-3 text-sm text-gray-600">{n.sentAt}</td>
                <td className="px-6 py-3 text-sm text-gray-600">{n.channel}</td>
                <td className="px-6 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${n.statusColor}`}>
                    {n.status}
                  </span>
                </td>
                <td className="px-6 py-3">
                  {n.opened
                    ? <span className="text-xs text-green-600">열람</span>
                    : <span className="text-xs text-gray-400">미열람</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
