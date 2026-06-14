# React Native 앱 배포 가이드

## 1단계: 준비 작업

### 1.1 Expo 계정 생성
```bash
npm install -g eas-cli
eas login
# 또는
eas register
```

### 1.2 환경 설정
```bash
cp .env.example .env
```

### 1.3 프로젝트 초기화
```bash
eas init
```

---

## 2단계: iOS 배포 (App Store)

### 필요 항목
- Apple Developer 계정 ($99/년)
- 유효한 프로비저닝 프로필
- 인증서

### 배포 단계

```bash
# 1. 빌드 설정 확인
eas build --platform ios --auto-submit

# 2. 앱 ID 및 인증서 설정
# app.json에 번들 ID 설정:
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.abeautymedspa"
    }
  }
}

# 3. 프로덕션 빌드
eas build --platform ios --auto-submit

# 4. App Store Connect에서 최종 승인
```

---

## 3단계: Android 배포 (Google Play Store)

### 필요 항목
- Google Play Developer 계정 ($25 일회성)
- 유효한 서명 키

### 배포 단계

```bash
# 1. 빌드 설정 확인
eas build --platform android --auto-submit

# 2. 앱 패키지명 설정
# app.json에 패키지명 설정:
{
  "expo": {
    "android": {
      "package": "com.abeautymedspa"
    }
  }
}

# 3. 프로덕션 빌드
eas build --platform android --auto-submit

# 4. Google Play Console에서 최종 승인
```

---

## 4단계: 로컬 테스트

### Expo Preview로 테스트
```bash
npx expo start
# iOS: i 키 눌러서 iOS 시뮬레이터 실행
# Android: a 키 눌러서 Android 에뮬레이터 실행
```

### Development Build로 테스트
```bash
eas build --platform ios --profile preview
eas build --platform android --profile preview
```

---

## 5단계: 앱스토어 등록

### iOS (App Store Connect)
1. https://appstoreconnect.apple.com 접속
2. My Apps → 새 앱 추가
3. 앱 정보 입력 (이름, 가격, 범주)
4. 스크린샷, 설명, 아이콘 업로드
5. 심사 제출

### Android (Google Play Console)
1. https://play.google.com/console 접속
2. 새 앱 만들기
3. 앱 정보 입력
4. 스크린샷, 설명, 아이콘 업로드
5. 프라이버시 정책, 콘텐츠 등급 입력
6. 심사 제출

---

## 앱 정보

| 항목 | 값 |
|------|-----|
| 앱 이름 | ABeauty Medspa |
| iOS 번들 ID | com.abeautymedspa |
| Android 패키지명 | com.abeautymedspa |
| 버전 | 1.0.0 |
| 최소 iOS | 14.0 |
| 최소 Android | API 24 |

---

## 문제 해결

### 빌드 실패
```bash
eas build --platform ios --monitor
# 로그 확인
```

### 인증서 문제
```bash
eas credentials
# 인증서 관리
```

### 앱이 거부된 경우
- Apple: https://developer.apple.com/app-store/review/
- Google: https://support.google.com/googleplay/android-developer/

---

## 다음 단계

1. 배포 후 사용자 리뷰 모니터링
2. 버그 수정 및 기능 업데이트
3. 정기적인 보안 패치
4. 앱 마케팅
