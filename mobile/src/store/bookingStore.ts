import { create } from 'zustand';
import { Platform } from 'react-native';

interface Service {
  id: string;
  name: string;
  nameEn: string;
  duration: number;
  price: number;
}

interface Doctor {
  id: string;
  names: { ko: string; en: string; es: string; zh: string };
  specialties: { ko: string; en: string; es: string; zh: string };
  experience: string;
  image: any;
}

export type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

export interface BookingRecord {
  id: string;
  service: Service;
  doctor: Doctor;
  date: string;
  time: string;
  customerInfo: { name: string; email: string; phone: string; notes: string };
  status: BookingStatus;
  totalPrice: number;
  createdAt: string;
  userId?: string;
}

interface BookingState {
  selectedService: Service | null;
  selectedDoctor: Doctor | null;
  selectedDate: Date | null;
  selectedTime: string | null;
  customerInfo: { name: string; email: string; phone: string; notes: string };
  currentStep: number;
  bookingHistory: BookingRecord[];

  setService: (service: Service | null) => void;
  setDoctor: (doctor: Doctor | null) => void;
  setDate: (date: Date | null) => void;
  setTime: (time: string | null) => void;
  setCustomerInfo: (info: Partial<BookingState['customerInfo']>) => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetBooking: () => void;
  getTotalPrice: () => number;

  addBookingRecord: (record: BookingRecord) => void;
  cancelBooking: (id: string) => void;
  loadBookingHistory: (userId?: string) => void;
}

const STORAGE_KEY = 'booking_history';

const isFirebaseConfigured = () =>
  !!(process.env.EXPO_PUBLIC_FIREBASE_API_KEY && process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID);

const saveLocalHistory = async (history: BookingRecord[]) => {
  try {
    if (Platform.OS === 'web') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } else {
      const SecureStore = await import('expo-secure-store');
      await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(history));
    }
  } catch {}
};

const loadLocalHistory = async (): Promise<BookingRecord[]> => {
  try {
    let raw: string | null = null;
    if (Platform.OS === 'web') {
      raw = localStorage.getItem(STORAGE_KEY);
    } else {
      const SecureStore = await import('expo-secure-store');
      raw = await SecureStore.getItemAsync(STORAGE_KEY);
    }
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const MOCK_HISTORY: BookingRecord[] = [
  {
    id: 'bk001',
    service: { id: 'facial', name: '페이셜', nameEn: 'Facial', duration: 30, price: 200 },
    doctor: { id: 'specialist-kim', names: { ko: '김 원장', en: 'Kim', es: 'Kim', zh: '金' }, specialties: { ko: '뷰티 전문가', en: 'Beauty Specialist', es: 'Especialista en Belleza', zh: '美容专家' }, experience: '15', image: require('../../assets/images/doctor-1.jpg') },
    date: (() => { const d = new Date(); d.setDate(d.getDate() + 7); return d.toISOString(); })(),
    time: '14:00',
    customerInfo: { name: '', email: '', phone: '', notes: '' },
    status: 'upcoming',
    totalPrice: 200,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'bk002',
    service: { id: 'massage', name: '마사지', nameEn: 'Massage', duration: 45, price: 350 },
    doctor: { id: 'specialist-lee', names: { ko: '이 원장', en: 'Lee', es: 'Lee', zh: '李' }, specialties: { ko: '스킨케어 전문가', en: 'Skincare Specialist', es: 'Especialista en Cuidado de Piel', zh: '护肤专家' }, experience: '12', image: require('../../assets/images/doctor-2.jpg') },
    date: (() => { const d = new Date(); d.setDate(d.getDate() + 14); return d.toISOString(); })(),
    time: '11:00',
    customerInfo: { name: '', email: '', phone: '', notes: '' },
    status: 'upcoming',
    totalPrice: 350,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'bk003',
    service: { id: 'nail', name: '네일', nameEn: 'Nail', duration: 60, price: 300 },
    doctor: { id: 'specialist-park', names: { ko: '박 원장', en: 'Park', es: 'Park', zh: '朴' }, specialties: { ko: '웰니스 전문가', en: 'Wellness Specialist', es: 'Especialista en Bienestar', zh: '健康专家' }, experience: '10', image: require('../../assets/images/doctor-3.jpg') },
    date: (() => { const d = new Date(); d.setDate(d.getDate() - 14); return d.toISOString(); })(),
    time: '10:00',
    customerInfo: { name: '', email: '', phone: '', notes: '' },
    status: 'completed',
    totalPrice: 300,
    createdAt: new Date().toISOString(),
  },
];

const initialCustomerInfo = { name: '', email: '', phone: '', notes: '' };

export const useBookingStore = create<BookingState>((set, get) => ({
  selectedService: null,
  selectedDoctor: null,
  selectedDate: null,
  selectedTime: null,
  customerInfo: initialCustomerInfo,
  currentStep: 0,
  bookingHistory: [],

  setService: (service) => set({ selectedService: service }),
  setDoctor: (doctor) => set({ selectedDoctor: doctor }),
  setDate: (date) => set({ selectedDate: date }),
  setTime: (time) => set({ selectedTime: time }),
  setCustomerInfo: (info) => set((state) => ({ customerInfo: { ...state.customerInfo, ...info } })),
  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
  resetBooking: () => set({ selectedService: null, selectedDoctor: null, selectedDate: null, selectedTime: null, customerInfo: initialCustomerInfo, currentStep: 0 }),
  getTotalPrice: () => get().selectedService?.price || 0,

  addBookingRecord: async (record) => {
    const history = [record, ...get().bookingHistory];
    set({ bookingHistory: history });

    if (isFirebaseConfigured() && record.userId) {
      try {
        const { db } = await import('../services/firebase');
        const { doc, setDoc } = await import('firebase/firestore');
        await setDoc(doc(db, 'bookings', record.id), {
          ...record,
          createdAt: new Date().toISOString(),
        });
        return;
      } catch (e) {
        console.error('Firestore save error:', e);
      }
    }
    saveLocalHistory(history);
  },

  cancelBooking: async (id) => {
    const history = get().bookingHistory.map((b) =>
      b.id === id ? { ...b, status: 'cancelled' as BookingStatus } : b
    );
    set({ bookingHistory: history });

    if (isFirebaseConfigured()) {
      try {
        const { db } = await import('../services/firebase');
        const { doc, updateDoc } = await import('firebase/firestore');
        await updateDoc(doc(db, 'bookings', id), { status: 'cancelled' });
        return;
      } catch (e) {
        console.error('Firestore cancel error:', e);
      }
    }
    saveLocalHistory(history);
  },

  loadBookingHistory: async (userId?: string) => {
    if (isFirebaseConfigured() && userId) {
      try {
        const { db } = await import('../services/firebase');
        const { collection, query, where, orderBy, getDocs } = await import('firebase/firestore');
        const q = query(
          collection(db, 'bookings'),
          where('userId', '==', userId),
          orderBy('createdAt', 'desc')
        );
        const snap = await getDocs(q);
        const history = snap.docs.map((d) => d.data() as BookingRecord);
        set({ bookingHistory: history.length > 0 ? history : MOCK_HISTORY });
        return;
      } catch (e) {
        console.error('Firestore load error:', e);
      }
    }
    const local = await loadLocalHistory();
    set({ bookingHistory: local.length > 0 ? local : MOCK_HISTORY });
  },
}));
