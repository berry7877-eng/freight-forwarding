// GPT-4o 메일 파싱 + OCR (MBL/HBL)
// OpenAI API 사용

interface GPT4oParseResult {
  bookingNo: string;
  loadingDate: string;
  etd: string;
  eta: string;
  pol: string;
  pod: string;
  cargo: {
    description: string;
    quantity: string;
    cbm?: string;
  };
  container?: {
    type: string;
    size: string;
    number?: string;
  };
  shipper?: string;
  consignee?: string;
  confidence: number;
}

interface MBLHBLData {
  mbl?: string;
  hbl?: string;
  shipper: {
    name: string;
    address: string;
  };
  consignee: {
    name: string;
    address: string;
  };
  notify?: {
    name: string;
    address: string;
  };
  vessel: string;
  voyage: string;
  pol: string;
  pod: string;
  containers: Array<{
    number: string;
    size: string;
    type: string;
    sealNo?: string;
  }>;
  cargo: {
    description: string;
    packages: string;
    grossWeight: string;
    measurement: string;
  };
}

/**
 * GPT-4o로 메일 파싱
 */
export async function parseEmailWithGPT4o(
  emailContent: string,
  fromEmail: string
): Promise<GPT4oParseResult> {

  const prompt = `
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
  "pod": "도착항 3자 코드 (예: INC)",
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

날짜는 반드시 YYYY-MM-DD 형식으로 변환하세요.
정보가 없으면 null을 반환하세요.
JSON만 반환하고 다른 설명은 하지 마세요.
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: '당신은 포워딩 업무 전문가입니다. 메일에서 정확한 정보를 추출합니다.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.1, // 낮은 temperature로 정확도 향상
        response_format: { type: 'json_object' }
      })
    });

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    return result;

  } catch (error) {
    console.error('GPT-4o 파싱 에러:', error);
    throw error;
  }
}

/**
 * GPT-4o Vision으로 MBL/HBL OCR
 */
export async function parseBLWithOCR(
  imageUrl: string,
  type: 'MBL' | 'HBL'
): Promise<MBLHBLData> {

  const prompt = `
이 이미지는 ${type === 'MBL' ? 'Master Bill of Lading (MBL)' : 'House Bill of Lading (HBL)'} 문서입니다.

다음 정보를 추출해서 JSON으로 반환해주세요:

{
  "mbl": "MBL 번호 (해당되면)",
  "hbl": "HBL 번호 (해당되면)",
  "shipper": {
    "name": "송화주 회사명",
    "address": "송화주 주소"
  },
  "consignee": {
    "name": "수화주 회사명",
    "address": "수화주 주소"
  },
  "notify": {
    "name": "통지처 회사명 (있으면)",
    "address": "통지처 주소 (있으면)"
  },
  "vessel": "선박명",
  "voyage": "항차",
  "pol": "선적항",
  "pod": "양하항",
  "containers": [
    {
      "number": "컨테이너 번호",
      "size": "20 또는 40",
      "type": "GP, HC, RF 등",
      "sealNo": "봉인 번호 (있으면)"
    }
  ],
  "cargo": {
    "description": "화물 상세 설명",
    "packages": "포장 개수 및 단위",
    "grossWeight": "총 중량",
    "measurement": "용적 (CBM)"
  }
}

- 정확하게 읽어주세요. 오타가 없도록!
- 정보가 없으면 null
- JSON만 반환
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: '당신은 선하증권(B/L) 문서를 정확하게 읽는 전문가입니다.'
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: prompt
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl,
                  detail: 'high' // 고해상도로 읽기
                }
              }
            ]
          }
        ],
        temperature: 0.1,
        response_format: { type: 'json_object' }
      })
    });

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    return result;

  } catch (error) {
    console.error('OCR 에러:', error);
    throw error;
  }
}

/**
 * 이메일 첨부파일에서 BL 자동 감지 및 OCR
 */
export async function processEmailAttachments(
  attachments: Array<{ filename: string; url: string }>
): Promise<MBLHBLData[]> {

  const blFiles = attachments.filter(file => {
    const name = file.filename.toLowerCase();
    return (
      name.includes('bl') ||
      name.includes('hbl') ||
      name.includes('mbl') ||
      name.includes('bill') ||
      name.includes('lading')
    );
  });

  const results: MBLHBLData[] = [];

  for (const file of blFiles) {
    const type = file.filename.toLowerCase().includes('mbl') ? 'MBL' : 'HBL';

    console.log(`📄 ${type} 파일 OCR 중: ${file.filename}`);

    const data = await parseBLWithOCR(file.url, type);
    results.push(data);
  }

  return results;
}

/**
 * 사내 시스템 자동 입력용 데이터 변환
 */
export async function convertToSystemFormat(
  parsedData: GPT4oParseResult,
  blData?: MBLHBLData
): Promise<any> {

  return {
    // 사내 시스템 필드명에 맞게 변환
    booking_number: parsedData.bookingNo,
    loading_date: parsedData.loadingDate,
    etd: parsedData.etd,
    eta: parsedData.eta,
    pol_code: parsedData.pol,
    pod_code: parsedData.pod,

    // BL 정보 (있으면)
    mbl_number: blData?.mbl || null,
    hbl_number: blData?.hbl || null,

    // 화주 정보
    shipper_name: blData?.shipper.name || parsedData.shipper,
    shipper_address: blData?.shipper.address || null,
    consignee_name: blData?.consignee.name || parsedData.consignee,
    consignee_address: blData?.consignee.address || null,

    // 선박 정보
    vessel_name: blData?.vessel || null,
    voyage_number: blData?.voyage || null,

    // 화물 정보
    cargo_description: blData?.cargo.description || parsedData.cargo.description,
    quantity: blData?.cargo.packages || parsedData.cargo.quantity,
    gross_weight: blData?.cargo.grossWeight || null,
    cbm: blData?.cargo.measurement || parsedData.cargo.cbm,

    // 컨테이너 정보
    container_type: parsedData.container?.type,
    container_size: parsedData.container?.size,
    container_numbers: blData?.containers.map(c => c.number) || [],

    // 메타 정보
    auto_parsed: true,
    confidence: parsedData.confidence,
    parsed_at: new Date().toISOString(),
  };
}

/**
 * 전체 워크플로우: 메일 수신 → 파싱 → OCR → DB 저장
 */
export async function processIncomingEmail(
  email: {
    from: string;
    subject: string;
    body: string;
    attachments: Array<{ filename: string; url: string }>;
  }
) {
  console.log('📧 새 메일 처리 시작...');

  // 1. GPT-4o로 메일 파싱
  console.log('1️⃣ GPT-4o 메일 파싱...');
  const emailContent = `${email.subject}\n\n${email.body}`;
  const parsedEmail = await parseEmailWithGPT4o(emailContent, email.from);

  console.log('✅ 파싱 완료:', parsedEmail);

  // 2. BL 첨부파일 OCR
  let blData: MBLHBLData | undefined;

  if (email.attachments.length > 0) {
    console.log('2️⃣ BL 첨부파일 OCR...');
    const blResults = await processEmailAttachments(email.attachments);

    if (blResults.length > 0) {
      blData = blResults[0]; // 첫 번째 BL 사용
      console.log('✅ OCR 완료:', blData);
    }
  }

  // 3. 사내 시스템 포맷으로 변환
  console.log('3️⃣ 시스템 포맷 변환...');
  const systemData = await convertToSystemFormat(parsedEmail, blData);

  console.log('✅ 변환 완료:', systemData);

  // 4. DB 저장 (Supabase)
  console.log('4️⃣ DB 저장...');
  // await saveToDatabase(systemData);

  // 5. 알림 발송
  console.log('5️⃣ 알림 발송...');
  // await sendNotification({
  //   title: `새 부킹 자동 등록: ${parsedEmail.bookingNo}`,
  //   message: `${parsedEmail.pol} → ${parsedEmail.pod}\nETA: ${parsedEmail.eta}`,
  // });

  console.log('✅ 전체 처리 완료!');

  return {
    parsed: parsedEmail,
    bl: blData,
    systemData,
  };
}

// 비용 계산 (참고용)
export const PRICING = {
  gpt4o_input: 0.0025, // $2.50 per 1M tokens
  gpt4o_output: 0.01,  // $10 per 1M tokens
  gpt4o_vision: 0.0075, // $7.50 per 1M tokens (이미지)

  // 예상 비용
  email_parse: 0.01,   // 메일 1건당 약 $0.01
  ocr_per_page: 0.05,  // BL 1페이지당 약 $0.05

  // 월 100건 처리시
  monthly_100: (0.01 + 0.05) * 100, // $6/월
};
