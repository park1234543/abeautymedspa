export const API_BASE_URL = 'https://abeautymedspa.com/api';

export const API_ENDPOINTS = {
  login: '/auth/login',
  register: '/auth/register',
  logout: '/auth/logout',
  me: '/auth/me',
  booking: '/booking',
  bookingSlots: '/booking/slots',
  bookingCancel: '/booking/cancel',
  gallery: '/gallery',
  reviews: '/reviews',
  inquiry: '/inquiry',
  heroVideo: '/hero-video',
};

export const SERVICES = [
  {
    id: 'facial',
    names: { ko: '페이셜', en: 'Facial', es: 'Facial', zh: '面部护理' },
    descriptions: {
      ko: '프리미엄 안면 피부 관리',
      en: 'Premium facial skin care treatment',
      es: 'Tratamiento facial de cuidado de la piel premium',
      zh: '高端面部皮肤护理',
    },
    duration: 60,
    price: 120,
    image: require('../../assets/images/treatment-1.jpg'),
  },
  {
    id: 'massage',
    names: { ko: '마사지', en: 'Massage', es: 'Masaje', zh: '按摩' },
    descriptions: {
      ko: '전신 릴렉싱 마사지',
      en: 'Full body relaxing massage',
      es: 'Masaje relajante de cuerpo completo',
      zh: '全身放松按摩',
    },
    duration: 60,
    price: 100,
    image: require('../../assets/images/service-filler.jpg'),
  },
  {
    id: 'nail',
    names: { ko: '네일 케어', en: 'Nail Care', es: 'Cuidado de Uñas', zh: '美甲护理' },
    descriptions: {
      ko: '젤 네일 & 네일 아트',
      en: 'Gel nails & nail art',
      es: 'Uñas de gel y nail art',
      zh: '凝胶美甲 & 美甲艺术',
    },
    duration: 45,
    price: 60,
    image: require('../../assets/images/service-laser.jpg'),
  },
  {
    id: 'skincare',
    names: { ko: '스킨케어', en: 'Skincare', es: 'Cuidado de la Piel', zh: '护肤疗程' },
    descriptions: {
      ko: '프리미엄 페이셜 트리트먼트',
      en: 'Premium facial treatment',
      es: 'Tratamiento facial premium',
      zh: '高端面部护理',
    },
    duration: 60,
    price: 150,
    image: require('../../assets/images/service-skincare.jpg'),
  },
  {
    id: 'body',
    names: { ko: '바디 케어', en: 'Body Care', es: 'Cuidado Corporal', zh: '身体护理' },
    descriptions: {
      ko: '전신 보습 바디 트리트먼트',
      en: 'Full body moisturizing treatment',
      es: 'Tratamiento hidratante corporal completo',
      zh: '全身保湿身体护理',
    },
    duration: 60,
    price: 130,
    image: require('../../assets/images/service-iv.jpg'),
  },
];

export const DOCTORS = [
  {
    id: 'specialist-kim',
    names: { ko: '김 원장', en: 'Kim', es: 'Kim', zh: '金' },
    specialties: {
      ko: '뷰티 전문가',
      en: 'Beauty Specialist',
      es: 'Especialista en Belleza',
      zh: '美容专家',
    },
    experience: '15',
    image: require('../../assets/images/doctor-1.jpg'),
  },
  {
    id: 'specialist-lee',
    names: { ko: '이 원장', en: 'Lee', es: 'Lee', zh: '李' },
    specialties: {
      ko: '스킨케어 전문가',
      en: 'Skincare Specialist',
      es: 'Especialista en Cuidado de Piel',
      zh: '护肤专家',
    },
    experience: '12',
    image: require('../../assets/images/doctor-2.jpg'),
  },
  {
    id: 'specialist-park',
    names: { ko: '박 원장', en: 'Park', es: 'Park', zh: '朴' },
    specialties: {
      ko: '웰니스 전문가',
      en: 'Wellness Specialist',
      es: 'Especialista en Bienestar',
      zh: '健康专家',
    },
    experience: '10',
    image: require('../../assets/images/doctor-3.jpg'),
  },
];

export type Service = typeof SERVICES[number];
export type Doctor = typeof DOCTORS[number];
export type LangKey = 'ko' | 'en' | 'es' | 'zh';

export function getServiceName(service: Service, lang: LangKey): string {
  return service.names[lang] ?? service.names.en;
}
export function getServiceDesc(service: Service, lang: LangKey): string {
  return service.descriptions[lang] ?? service.descriptions.en;
}
export function getDoctorName(doctor: Doctor, lang: LangKey): string {
  return doctor.names[lang] ?? doctor.names.en;
}
export function getDoctorSpecialty(doctor: Doctor, lang: LangKey): string {
  return doctor.specialties[lang] ?? doctor.specialties.en;
}
