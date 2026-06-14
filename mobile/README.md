# A Beauty MedSpa - React Native App

의료 예약 플랫폼의 React Native 모바일 앱입니다.

## 시작하기

### 필수 요구사항

- Node.js 18 이상
- npm 또는 yarn
- Expo CLI
- iOS 시뮬레이터 (Mac) 또는 Android 에뮬레이터

### 설치

```bash
# 프로젝트 폴더로 이동
cd react-native-app

# 의존성 설치
npm install

# Expo 개발 서버 시작
npx expo start
```

### 실행

```bash
# iOS 시뮬레이터에서 실행
npm run ios

# Android 에뮬레이터에서 실행
npm run android

# 웹 브라우저에서 실행
npm run web
```

## 프로젝트 구조

```
react-native-app/
├── App.tsx                 # 앱 진입점
├── src/
│   ├── constants/          # 테마, API 설정
│   │   ├── theme.ts
│   │   └── api.ts
│   ├── navigation/         # 네비게이션 설정
│   │   ├── RootNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   └── MainTabNavigator.tsx
│   ├── screens/            # 화면 컴포넌트
│   │   ├── auth/
│   │   │   ├── WelcomeScreen.tsx
│   │   │   ├── LoginScreen.tsx
│   │   │   └── RegisterScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── ServicesScreen.tsx
│   │   ├── ServiceDetailScreen.tsx
│   │   ├── BookingScreen.tsx
│   │   ├── BookingConfirmationScreen.tsx
│   │   ├── GalleryScreen.tsx
│   │   ├── GalleryDetailScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── store/              # 상태 관리 (Zustand)
│   │   ├── authStore.ts
│   │   └── bookingStore.ts
│   └── services/           # API 서비스
│       └── api.ts
└── assets/                 # 이미지, 폰트 등
```

## 주요 기능

- **인증**: 로그인, 회원가입, 자동 로그인
- **홈**: 서비스 소개, 의료진 소개, 빠른 예약
- **서비스**: 서비스 목록, 카테고리 필터, 상세 정보
- **예약**: 5단계 예약 플로우 (서비스 → 의사 → 날짜/시간 → 정보 → 확인)
- **갤러리**: 시술 전후 사진, 클리닉 사진
- **프로필**: 내 정보, 예약 내역, 설정

## 기술 스택

- **Expo**: React Native 개발 플랫폼
- **React Navigation**: 네비게이션
- **Zustand**: 상태 관리
- **Expo Secure Store**: 보안 저장소
- **date-fns**: 날짜 처리

## API 연동

앱은 기존 Next.js 웹사이트의 API를 사용합니다. `src/constants/api.ts`에서 API_BASE_URL을 설정하세요.

```typescript
export const API_BASE_URL = 'https://abeautymedspa.com/api';
```

## 앱 빌드 (배포용)

### iOS (App Store)

```bash
# EAS CLI 설치
npm install -g eas-cli

# EAS 로그인
eas login

# iOS 빌드
eas build --platform ios
```

### Android (Google Play)

```bash
# Android 빌드
eas build --platform android
```

## 이미지 에셋

`assets/images/` 폴더에 다음 이미지가 필요합니다:

- hero-spa.jpg
- doctor-1.jpg, doctor-2.jpg, doctor-3.jpg
- service-filler.jpg, service-laser.jpg, service-skincare.jpg, service-iv.jpg
- treatment-1.jpg, treatment-2.jpg
- spa-interior-1.jpg, spa-interior-2.jpg
- placeholder-user.jpg

## 라이센스

Private - A Beauty MedSpa
