# Braze Template Builder — 작업 로그

## 프로젝트 개요

Braze In-App Message용 Custom HTML 코드를 GUI로 편집하고 미리보기할 수 있는 웹 빌더.
마케팅/디자인 팀이 코드 수정 없이 Braze 인앱 메시지 템플릿을 커스터마이징하고 코드를 생성할 수 있음.

- **배포 URL**: https://braze-template-builder.vercel.app
- **기술 스택**: Vite + React (JSX), Vercel 배포
- **참고 자료**: IAMSTUDIO 카드 모달 코드 (Braze Custom HTML)

---

## 파일 구조

```
braze-template-builder/
├── index.html                          # Pretendard + Google Fonts CDN 포함
├── src/
│   ├── App.jsx                         # 엔트리 - BrazeTemplateBuilder 렌더링
│   ├── main.jsx                        # React DOM 마운트
│   ├── BrazeTemplateBuilder.jsx        # 메인 셸 (템플릿 선택 + 공통 레이아웃)
│   ├── components/
│   │   └── ui/
│   │       ├── constants.js            # BRAND_COLOR, FONT_OPTIONS, WEIGHT_OPTIONS 등
│   │       ├── index.jsx               # 공통 UI 컴포넌트 (SectionTitle, TextInput 등)
│   │       └── utils.js                # escapeHtml, hexToRgba 유틸
│   └── templates/
│       ├── index.js                    # 템플릿 레지스트리 (모든 템플릿 export)
│       ├── center-modal/               # 센터 모달 템플릿
│       │   ├── index.js                # { id, label, description, defaultConfig, generateCode, Preview, Settings }
│       │   ├── defaultConfig.js        # 기본 설정값
│       │   ├── generateCode.js         # Braze HTML 코드 생성
│       │   ├── Preview.jsx             # 폰 미리보기 컴포넌트
│       │   └── Settings.jsx            # 설정 패널 컴포넌트
│       └── card-modal/                 # 카드 모달 템플릿
│           ├── index.js
│           ├── defaultConfig.js
│           ├── generateCode.js
│           ├── Preview.jsx
│           └── Settings.jsx
```

---

## 작업 히스토리

### 1. 프로젝트 초기 셋업
- `npm create vite@latest braze-template-builder -- --template react`로 프로젝트 생성
- `braze-template-builder.jsx` (Claude에서 받은 원본 파일)을 `src/BrazeTemplateBuilder.jsx`로 복사
- `src/App.jsx`, `src/main.jsx` 교체, `index.html`에 Pretendard/Google Fonts CDN 추가
- 불필요한 `App.css`, `index.css` 삭제

### 2. 미리보기 하단 버튼 표시
- "Don't show again" / "Close" 버튼이 미리보기에서 보이지 않던 문제 수정
- `position: absolute` → flex 컨테이너로 묶어 모달 바로 아래에 자연스럽게 표시

### 3. 태블릿 수평 중앙 정렬 보완
- 생성되는 Braze HTML의 `.center`에 `left: 50%; transform: translate(-50%, -50%)` 적용
- 태블릿 등 대형 화면에서 모달이 왼쪽에 치우치는 문제 해결

### 4. UI 개선
- Enable Custom Event logging 체크박스 제거 (Braze 탭)
- Image URL 하단에 이미지 사이즈 가이드 추가 (권장: 590×590px, 1:1, 200KB 이하)

### 5. 미리보기 하단 버튼 잘림 수정
- 텍스트 사이즈를 크게 하면 하단 버튼이 폰 프레임 밖으로 밀려 잘리는 문제 수정
- wrapper에 `maxHeight: calc(100% - 32px)`, 모달에 `flex: 1 1 auto`, 하단 버튼에 `flex: 0 0 auto` 적용

### 6. 멀티 템플릿 시스템 구축
- 893줄짜리 단일 파일을 `components/ui/`, `templates/` 구조로 분리
- 공통 UI 컴포넌트 추출: SectionTitle, FieldLabel, TextInput, ColorInput, SliderInput, SelectInput, AlignButtons, CheckboxInput
- 공통 상수/유틸 분리: constants.js, utils.js
- 템플릿 정의 구조 설계: `{ id, label, description, defaultConfig, generateCode, Preview, Settings }`
- 상단 바에 템플릿 선택 드롭다운 UI 추가
- BrazeTemplateBuilder.jsx를 동적 템플릿 로딩 방식으로 리팩토링
- 기존 센터 모달을 `templates/center-modal/`로 추출 (첫 번째 템플릿)

### 7. Card Modal 템플릿 추가
- IAMSTUDIO의 카드 모달 HTML 코드를 벤치마킹
- 이미지 중심의 심플 카드형 모달 구현 (텍스트/CTA 버튼 없이 이미지 전체 영역)
- 이미지 클릭 → 딥링크 이동, 하단에 "다시 보지 않기"/"닫기" 버튼 바
- 이미지 사이즈 가이드: 628×1164px (2x 레티나 대응), 약 1:1.85 세로형
- `templates/card-modal/`로 등록, 드롭다운에서 전환 가능

### 8. 섹션 타이틀 시각적 개선
- SectionTitle 컴포넌트의 스타일 개선 (기존: 얇은 하단 보더라인)
- 좌측 3px 그린 바 + 연한 배경색으로 섹션 구분 명확화

---

## 템플릿 추가 방법

새 템플릿을 추가할 때:

1. `src/templates/[template-name]/` 폴더 생성
2. 다음 파일 작성:
   - `defaultConfig.js` — 기본 설정값
   - `generateCode.js` — Braze HTML 코드 생성 함수 (`export function generateCode(c)`)
   - `Preview.jsx` — 폰 미리보기 컴포넌트 (`config` prop)
   - `Settings.jsx` — 설정 패널 컴포넌트 (`config`, `onUpdate`, `activeTab` props)
   - `index.js` — 위 모듈을 묶어서 `{ id, label, description, defaultConfig, generateCode, Preview, Settings }` export
3. `src/templates/index.js`에 import 및 등록

---

## 기술 메모

### 생성되는 Braze HTML 구조
- `.root` > `.background` (오버레이) + `.center`/`.modal-wrapper` (모달 본체)
- `appboyBridge.logClick()` — 버튼 클릭 추적
- `appboyBridge.closeMessage()` — 메시지 닫기
- Deeplink은 hidden div에 JSON으로 저장, DOMContentLoaded에서 파싱

### "Don't show again" vs "Close" 기능 차이
- 현재 코드에서 둘 다 동일하게 `appboyBridge.closeMessage()` 호출
- 유일한 차이는 Braze에 보내는 tracking ID (`"never show"` vs `"close"`)
- 실제 "다시 보지 않기"는 Braze 대시보드에서 tracking ID 기반 세그먼트 제외로 처리하거나, Custom User Attribute/Custom Event를 HTML에 추가해야 함

### 배포 프로세스
```bash
npm run build && npx vercel --prod --yes
```

### 이미지 가이드라인
- Center Modal: 590×590px (2x), 1:1 정사각형, 200KB 이하
- Card Modal: 628×1164px (2x), 약 1:1.85 세로형, 300KB 이하
- 모바일 인앱 메시지이므로 가능한 가볍게 유지
- PNG (투명 배경) 또는 JPG (사진류, 80% 품질 압축)
