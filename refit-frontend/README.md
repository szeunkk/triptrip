# Re:fit 독립 서비스

기존 maincamp frontend에서 Re:fit 영역만 분리한 독립 배포용 Next.js 앱입니다.

## 라우트

- `/` → `/remarket` 리다이렉트
- `/fitfeed` - fit: feed 목록
- `/fitfeed/[boardId]` - OOTD 상세
- `/remarket` - Re: market 목록
- `/remarket/[productId]` - 상품 상세
- `/user/login` - 로그인
- `/user/signup` - 회원가입
- `/user/point` - 포인트 충전

## 실행

```bash
npm install
npm run dev    # 개발 서버 (기본 http://localhost:3000)
npm run build
npm start      # 프로덕션 서버
```

## 환경 변수

- `NEXT_PUBLIC_GOOGLE_MAP_KEY` - 상품 상세 지도 표시용 (선택)
- GraphQL 엔드포인트는 `src/commons/settings/apollo-upload-setting.tsx`에서 설정

## 원본 프로젝트

원본 코드는 `../frontend`에 그대로 유지되어 있으며, 이 프로젝트는 복사본입니다.
