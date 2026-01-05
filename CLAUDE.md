# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

한국반려문화산업학회 (Korean Association of Companion Culture and Industry) 공식 웹사이트. React SPA로 구현된 학술단체 홈페이지.

## Commands

```bash
npm run dev      # 개발 서버 시작 (Vite HMR)
npm run build    # 프로덕션 빌드 (dist/ 폴더)
npm run preview  # 빌드 결과 미리보기
npm run lint     # ESLint 검사
```

## Tech Stack

- **Vite 7** + **React 19** (SWC 컴파일러)
- **Tailwind CSS 4** - `@theme` 디렉티브로 커스텀 테마 정의 (src/index.css)
- **Lucide React** - 아이콘
- **Framer Motion** - 애니메이션
- **React Router DOM** - 라우팅 (아직 미구현)

## Architecture

```
src/
├── App.jsx                 # 루트 컴포넌트 (레이아웃 + 섹션 조합)
├── index.css               # Tailwind 설정 + 브랜드 컬러/컴포넌트 클래스
├── components/
│   ├── layout/             # Header, Footer (전역 레이아웃)
│   └── home/               # 메인 페이지 섹션들 (Hero, About, Services, News, CTA)
```

## Brand Theme

브랜드 컬러는 `src/index.css`의 `@theme` 블록에 정의:
- **Primary**: `#6B2D4A` (버건디/마젠타) - 50~900 단계
- **Secondary**: `#D98BA3` (핑크)
- **Accent**: `#F2C4D0` (라이트 핑크)

커스텀 컴포넌트 클래스: `btn-primary`, `btn-secondary`, `card`, `section-title`, `nav-link` 등

## Tailwind CSS 4 주의사항

- PostCSS 플러그인: `@tailwindcss/postcss` 사용 (tailwindcss 직접 사용 X)
- CSS에서 `@import "tailwindcss"` 구문 사용
- 폰트 URL @import는 tailwindcss import **앞에** 위치해야 함

## ESLint 규칙

- 대문자로 시작하는 미사용 변수는 허용 (`varsIgnorePattern: '^[A-Z_]'`)
- React Hooks/Refresh 플러그인 활성화
