#!/bin/bash

# React Native 앱 배포 자동화 스크립트

set -e

echo "================================"
echo "ABeauty Medspa 앱 배포 시작"
echo "================================"
echo ""

# 1. 의존성 설치 확인
echo "[1/6] 의존성 확인 중..."
if [ ! -d "node_modules" ]; then
  echo "npm install 실행 중..."
  npm install
fi
echo "✓ 의존성 설치 완료"
echo ""

# 2. 환경 설정 확인
echo "[2/6] 환경 설정 확인 중..."
if [ ! -f ".env" ]; then
  echo "경고: .env 파일이 없습니다"
  echo ".env.example을 복사 중..."
  cp .env.example .env
  echo "✓ .env 파일 생성됨 - 값을 확인해주세요"
else
  echo "✓ .env 파일 확인됨"
fi
echo ""

# 3. Expo 로그인 확인
echo "[3/6] Expo 로그인 확인 중..."
if eas whoami > /dev/null 2>&1; then
  echo "✓ Expo 로그인됨"
else
  echo "⚠️  Expo 로그인이 필요합니다"
  echo "다음 명령어를 실행하세요: eas login"
  exit 1
fi
echo ""

# 4. 빌드 프로필 선택
echo "[4/6] 빌드 프로필 선택"
echo "1) Preview (시뮬레이터/에뮬레이터용)"
echo "2) Production (앱스토어 배포)"
read -p "선택 (1 또는 2): " profile_choice

if [ "$profile_choice" = "1" ]; then
  PROFILE="preview"
  echo "✓ Preview 프로필 선택됨"
elif [ "$profile_choice" = "2" ]; then
  PROFILE="production"
  echo "✓ Production 프로필 선택됨"
else
  echo "❌ 잘못된 선택"
  exit 1
fi
echo ""

# 5. 플랫폼 선택
echo "[5/6] 플랫폼 선택"
echo "1) iOS만 빌드"
echo "2) Android만 빌드"
echo "3) iOS + Android 빌드"
read -p "선택 (1, 2, 또는 3): " platform_choice

case $platform_choice in
  1)
    PLATFORMS="ios"
    echo "✓ iOS 빌드 선택됨"
    ;;
  2)
    PLATFORMS="android"
    echo "✓ Android 빌드 선택됨"
    ;;
  3)
    PLATFORMS="ios android"
    echo "✓ iOS + Android 빌드 선택됨"
    ;;
  *)
    echo "❌ 잘못된 선택"
    exit 1
    ;;
esac
echo ""

# 6. 빌드 실행
echo "[6/6] 빌드 시작 중..."
echo "이 과정은 몇 분이 소요될 수 있습니다..."
echo ""

for platform in $PLATFORMS; do
  echo "🔨 $platform 빌드 중..."
  if [ "$PROFILE" = "preview" ]; then
    eas build --platform $platform --profile preview
  else
    eas build --platform $platform --profile production --auto-submit
  fi
  echo "✓ $platform 빌드 완료"
done

echo ""
echo "================================"
echo "✅ 배포 완료!"
echo "================================"
echo ""
echo "다음 단계:"
echo "1. DEPLOYMENT.md 파일을 읽어보세요"
echo "2. App Store Connect (iOS) 또는 Google Play Console (Android)에서 앱을 확인하세요"
echo "3. 앱 정보를 입력하고 심사를 제출하세요"
echo ""
