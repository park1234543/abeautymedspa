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
    id: 'botox',
    names: { ko: '보톡스', en: 'Botox', es: 'Bótox', zh: '肉毒素' },
    descriptions: {
      ko: '주름 개선 및 얼굴 윤곽 시술',
      en: 'Wrinkle reduction and facial contouring treatment',
      es: 'Tratamiento de reducción de arrugas y contorno facial',
      zh: '除皱和面部轮廓塑形治疗',
    },
    duration: 30,
    price: 200,
    image: require('../../assets/images/treatment-1.jpg'),
  },
  {
    id: 'filler',
    names: { ko: '필러', en: 'Filler', es: 'Relleno Dérmico', zh: '皮肤填充' },
    descriptions: {
      ko: '볼륨 보충 및 얼굴 윤곽 개선',
      en: 'Volume restoration and facial contour improvement',
      es: 'Restauración de volumen y mejora del contorno facial',
      zh: '丰盈补充和面部轮廓改善',
    },
    duration: 45,
    price: 350,
    image: require('../../assets/images/service-filler.jpg'),
  },
  {
    id: 'laser',
    names: { ko: '레이저', en: 'Laser Treatment', es: 'Tratamiento Láser', zh: '激光治疗' },
    descriptions: {
      ko: '피부 재생 및 톤 개선',
      en: 'Skin rejuvenation and tone improvement',
      es: 'Rejuvenecimiento de la piel y mejora del tono',
      zh: '皮肤再生和肤色改善',
    },
    duration: 60,
    price: 300,
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
    id: 'iv-therapy',
    names: { ko: 'IV 테라피', en: 'IV Therapy', es: 'Terapia IV', zh: 'IV疗法' },
    descriptions: {
      ko: '비타민 및 영양 수액 치료',
      en: 'Vitamin and nutrient infusion therapy',
      es: 'Terapia de infusión de vitaminas y nutrientes',
      zh: '维生素和营养输液治疗',
    },
    duration: 45,
    price: 200,
    image: require('../../assets/images/service-iv.jpg'),
  },
];

export const DOCTORS = [
  {
    id: 'dr-kim',
    names: { ko: '김 원장', en: 'Dr. Kim', es: 'Dr. Kim', zh: '金院长' },
    specialties: {
      ko: '피부과 전문의',
      en: 'Dermatologist',
      es: 'Dermatóloga',
      zh: '皮肤科专家',
    },
    experience: '15',
    image: require('../../assets/images/doctor-1.jpg'),
  },
  {
    id: 'dr-lee',
    names: { ko: '이 원장', en: 'Dr. Lee', es: 'Dr. Lee', zh: '李院长' },
    specialties: {
      ko: '성형외과 전문의',
      en: 'Plastic Surgeon',
      es: 'Cirujano Plástico',
      zh: '整形外科专家',
    },
    experience: '12',
    image: require('../../assets/images/doctor-2.jpg'),
  },
  {
    id: 'dr-park',
    names: { ko: '박 원장', en: 'Dr. Park', es: 'Dr. Park', zh: '朴院长' },
    specialties: {
      ko: '피부과 전문의',
      en: 'Dermatologist',
      es: 'Dermatóloga',
      zh: '皮肤科专家',
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
