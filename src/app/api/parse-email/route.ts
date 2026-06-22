import { NextRequest, NextResponse } from 'next/server';

// GPT-4o 파싱 API 엔드포인트
export async function POST(request: NextRequest) {
  try {
    const { emailContent, fromEmail } = await request.json();

    // OpenAI API 호출
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // 테스트용으로 mini 사용 (더 저렴)
        messages: [
          {
            role: 'system',
            content: '당신은 포워딩 업무 전문가입니다. 메일에서 정확한 정보를 추출합니다.'
          },
          {
            role: 'user',
            content: `
다음은 포워딩 업무 관련 메일입니다.
주요 정보를 추출해서 JSON으로 반환해주세요.

메일 내용:
${emailContent}

발신자: ${fromEmail}

추출할 정보:
{
  "bookingNo": "부킹 번호 (예: SHY-260503KR(136))",
  "loadingDate": "선적일 (YYYY-MM-DD 형식으로 변환)",
  "etd": "출항일 (YYYY-MM-DD)",
  "eta": "입항일 (YYYY-MM-DD)",
  "pol": "선적항 3자 코드 (예: SHA)",
  "pod": "도착항 3자 코드 (예: INC, PUS)",
  "cargo": {
    "description": "화물 설명",
    "quantity": "수량 (PCS, CTNS 포함)",
    "cbm": "CBM (있으면)"
  },
  "container": {
    "type": "FCL 또는 LCL",
    "size": "20 또는 40",
    "number": "컨테이너 번호 (있으면)"
  },
  "shipper": "송화주 (있으면)",
  "consignee": "수화주 (있으면)",
  "confidence": "0-100 사이 숫자로 신뢰도"
}

날짜 변환 예시:
- APR 29TH 2026 → 2026-04-29
- MAY 3RD 2026 → 2026-05-03

정보가 없으면 null을 반환하세요.
JSON만 반환하고 다른 설명은 하지 마세요.
`
          }
        ],
        temperature: 0.1,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'OpenAI API 에러');
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    return NextResponse.json({
      success: true,
      data: result,
      tokens: {
        prompt: data.usage.prompt_tokens,
        completion: data.usage.completion_tokens,
        total: data.usage.total_tokens,
      },
      cost: calculateCost(data.usage), // 비용 계산
    });

  } catch (error: any) {
    console.error('파싱 에러:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || '알 수 없는 에러',
      },
      { status: 500 }
    );
  }
}

// 비용 계산 (GPT-4o-mini)
function calculateCost(usage: any) {
  const inputCost = (usage.prompt_tokens / 1_000_000) * 0.15; // $0.15 per 1M tokens
  const outputCost = (usage.completion_tokens / 1_000_000) * 0.6; // $0.60 per 1M tokens
  const total = inputCost + outputCost;

  return {
    input: inputCost.toFixed(6),
    output: outputCost.toFixed(6),
    total: total.toFixed(6),
    usd: `$${total.toFixed(4)}`,
  };
}
