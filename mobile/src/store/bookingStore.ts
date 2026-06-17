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
  name: string;
  nameKo: string;
  specialty: string;
}

export type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

export interface BookingRecord {
  id: string;
  service: Service;
  doctor: Doctor;
  date: string;
  time: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  };
  status: BookingStatus;
  totalPrice: number;
  createdAt: string;
}

interface BookingState {
  selectedService: Service | null;
  selectedDoctor: Doctor | null;
  selectedDate: Date | null;
  selectedTime: string | null;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  };
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
  loadBookingHistory: () => void;
}

const STORAGE_KEY = 'booking_history';

const saveHistory = async (history: BookingRecord[]) => {
  try {
    if (Platform.OS === 'web') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } else {
      const SecureStore = await import('expo-secure-store');
      await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(history));
    }
  } catch {}
};

const loadHistory = async (): Promise<BookingRecord[]> => {
  try {
    let raw: string | null = null;
    if (Platform.OS === 'web') {
      raw = localStorage.getItem(STORAGE_KEY);
    } else {
      const SecureStore = await import('expo-secure-store');
      raw = await SecureStore.getItemAsync(STORAGE_KEY);
    }
    return raw ? JSON.parse(raw) : MOCK_HISTORY;
  } catch {
    return MOCK_HISTORY;
  }
};

const MOCK_HISTORY: BookingRecord[] = [
  {
    id: 'bk001',
    service: { id: 'botox', name: '보톡스', nameEn: 'Botox', duration: 30, price: 200 },
    doctor: { id: 'dr-kim', name: 'Dr. Kim', nameKo: '김 원장', specialty: '피부과 전문의' },
    date: (() => {
      const d = new Date(); d.setDate(d.getDate() + 7); return d.toISOString();
    })(),
    time: '14:00',
    customerInfo: { name: '', email: '', phone: '', notes: '' },
    status: 'upcoming',
    totalPrice: 200,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'bk002',
    service: { id: 'filler', name: '필러', nameEn: 'Filler', duration: 45, price: 350 },
    doctor: { id: 'dr-lee', name: 'Dr. Lee', nameKo: '이 원장', specialty: '성형외과 전문의' },
    date: (() => {
      const d = new Date(); d.setDate(d.getDate() + 14); return d.toISOString();
    })(),
    time: '11:00',
    customerInfo: { name: '', email: '', phone: '', notes: '' },
    status: 'upcoming',
    totalPrice: 350,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'bk003',
    service: { id: 'laser', name: '레이저', nameEn: 'Laser', duration: 60, price: 300 },
    doctor: { id: 'dr-park', name: 'Dr. Park', nameKo: '박 원장', specialty: '피부과 전문의' },
    date: (() => {
      const d = new Date(); d.setDate(d.getDate() - 14); return d.toISOString();
    })(),
    time: '10:00',
    customerInfo: { name: '', email: '', phone: '', notes: '' },
    status: 'completed',
    totalPrice: 300,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'bk004',
    service: { id: 'skincare', name: '스킨케어', nameEn: 'Skincare', duration: 60, price: 150 },
    doctor: { id: 'dr-kim', name: 'Dr. Kim', nameKo: '김 원장', specialty: '피부과 전문의' },
    date: (() => {
      const d = new Date(); d.setDate(d.getDate() - 30); return d.toISOString();
    })(),
    time: '15:00',
    customerInfo: { name: '', email: '', phone: '', notes: '' },
    status: 'completed',
    totalPrice: 150,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'bk005',
    service: { id: 'botox', name: '보톡스', nameEn: 'Botox', duration: 30, price: 200 },
    doctor: { id: 'dr-lee', name: 'Dr. Lee', nameKo: '이 원장', specialty: '성형외과 전문의' },
    date: (() => {
      const d = new Date(); d.setDate(d.getDate() - 7); return d.toISOString();
    })(),
    time: '13:00',
    customerInfo: { name: '', email: '', phone: '', notes: '' },
    status: 'cancelled',
    totalPrice: 200,
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
  setCustomerInfo: (info) => set((state) => ({
    customerInfo: { ...state.customerInfo, ...info },
  })),
  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
  resetBooking: () => set({
    selectedService: null,
    selectedDoctor: null,
    selectedDate: null,
    selectedTime: null,
    customerInfo: initialCustomerInfo,
    currentStep: 0,
  }),
  getTotalPrice: () => get().selectedService?.price || 0,

  addBookingRecord: (record) => {
    const history = [record, ...get().bookingHistory];
    set({ bookingHistory: history });
    saveHistory(history);
  },

  cancelBooking: (id) => {
    const history = get().bookingHistory.map((b) =>
      b.id === id ? { ...b, status: 'cancelled' as BookingStatus } : b
    );
    set({ bookingHistory: history });
    saveHistory(history);
  },

  loadBookingHistory: async () => {
    const history = await loadHistory();
    set({ bookingHistory: history });
  },
}));
