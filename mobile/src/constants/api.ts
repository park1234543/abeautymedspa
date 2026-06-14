// 기존 Next.js 웹사이트의 API를 사용
export const API_BASE_URL = 'https://abeautymedspa.com/api';

export const API_ENDPOINTS = {
  // Auth
  login: '/auth/login',
  register: '/auth/register',
  logout: '/auth/logout',
  me: '/auth/me',
  
  // Booking
  booking: '/booking',
  bookingSlots: '/booking/slots',
  bookingCancel: '/booking/cancel',
  
  // Gallery
  gallery: '/gallery',
  
  // Reviews
  reviews: '/reviews',
  
  // Inquiry
  inquiry: '/inquiry',
  
  // Hero Video
  heroVideo: '/hero-video',
};

export const SERVICES = [
  {
    id: 'botox',
    name: '보톡스',
    nameEn: 'Botox',
    description: '주름 개선 및 얼굴 윤곽 시술',
    duration: 30,
    price: 200,
    image: require('../../assets/images/service-filler.jpg'),
  },
  {
    id: 'filler',
    name: '필러',
    nameEn: 'Filler',
    description: '볼륨 보충 및 얼굴 윤곽 개선',
    duration: 45,
    price: 350,
    image: require('../../assets/images/service-filler.jpg'),
  },
  {
    id: 'laser',
    name: '레이저',
    nameEn: 'Laser Treatment',
    description: '피부 재생 및 톤 개선',
    duration: 60,
    price: 300,
    image: require('../../assets/images/service-laser.jpg'),
  },
  {
    id: 'skincare',
    name: '스킨케어',
    nameEn: 'Skincare',
    description: '프리미엄 페이셜 트리트먼트',
    duration: 60,
    price: 150,
    image: require('../../assets/images/service-skincare.jpg'),
  },
  {
    id: 'iv-therapy',
    name: 'IV 테라피',
    nameEn: 'IV Therapy',
    description: '비타민 및 영양 수액 치료',
    duration: 45,
    price: 200,
    image: require('../../assets/images/service-iv.jpg'),
  },
];

export const DOCTORS = [
  {
    id: 'dr-kim',
    name: 'Dr. Kim',
    nameKo: '김 원장',
    specialty: '피부과 전문의',
    specialtyEn: 'Dermatologist',
    experience: '15년+',
    image: require('../../assets/images/doctor-1.jpg'),
  },
  {
    id: 'dr-lee',
    name: 'Dr. Lee',
    nameKo: '이 원장',
    specialty: '성형외과 전문의',
    specialtyEn: 'Plastic Surgeon',
    experience: '12년+',
    image: require('../../assets/images/doctor-2.jpg'),
  },
  {
    id: 'dr-park',
    name: 'Dr. Park',
    nameKo: '박 원장',
    specialty: '피부과 전문의',
    specialtyEn: 'Dermatologist',
    experience: '10년+',
    image: require('../../assets/images/doctor-3.jpg'),
  },
];
