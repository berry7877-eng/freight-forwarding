# 포워딩 업무 자동화 시스템

## 🚀 시작하기

### 1. 환경변수 설정

```bash
# .env.local.template 파일을 복사
cp .env.local.template .env.local

# .env.local 파일 열어서 실제 값 입력
open .env.local
```

### 2. Supabase 정보 입력

**Supabase 대시보드 (https://supabase.com/dashboard)**

1. **Settings** → **API** 메뉴
   - `Project URL` 복사 → `NEXT_PUBLIC_SUPABASE_URL`에 붙여넣기
   - `anon public` 복사 → `NEXT_PUBLIC_SUPABASE_ANON_KEY`에 붙여넣기
   - `service_role` (Reveal 클릭) → `SUPABASE_SERVICE_ROLE_KEY`에 붙여넣기

2. **Settings** → **Database** 메뉴
   - `Connection string` 복사 → `DATABASE_URL`에 붙여넣기
   - 비밀번호 부분 `[YOUR-PASSWORD]`를 실제 비밀번호로 변경

### 3. 저장 확인

```bash
# .env.local 파일이 제대로 있는지 확인
ls -la .env.local
```

---

## 📋 프로젝트 정보

- **프로젝트명**: 포워딩 업무 자동화 시스템
- **기술 스택**: Next.js 14, TypeScript, Supabase, Prisma
- **개발 기간**: 4주 (MVP)
- **자동화율**: 50% → 85%

---

## 🔒 보안

⚠️ **절대 GitHub에 올리면 안 되는 파일:**
- `.env.local` (실제 API 키 포함)
- `service_role` 키는 절대 공개 금지!

✅ **안전한 파일:**
- `.env.local.template` (템플릿만)
- `.gitignore`에 `.env.local` 포함됨

---

## 📞 문의

프로젝트 관련 문의: berry7877@gmail.com
