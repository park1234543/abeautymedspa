import { create } from 'zustand';

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

interface BookingState {
  // Booking data
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
  
  // Booking flow step
  currentStep: number;
  
  // Actions
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
}

const initialCustomerInfo = {
  name: '',
  email: '',
  phone: '',
  notes: '',
};

export const useBookingStore = create<BookingState>((set, get) => ({
  selectedService: null,
  selectedDoctor: null,
  selectedDate: null,
  selectedTime: null,
  customerInfo: initialCustomerInfo,
  currentStep: 0,

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
  
  getTotalPrice: () => {
    const { selectedService } = get();
    return selectedService?.price || 0;
  },
}));
