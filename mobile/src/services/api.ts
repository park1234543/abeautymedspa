import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async getToken(): Promise<string | null> {
    return await SecureStore.getItemAsync('token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = await this.getToken();
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'API 요청 실패');
    }

    return response.json();
  }

  // Auth
  async login(email: string, password: string) {
    return this.request(API_ENDPOINTS.login, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(name: string, email: string, password: string, phone?: string) {
    return this.request(API_ENDPOINTS.register, {
      method: 'POST',
      body: JSON.stringify({ name, email, password, phone }),
    });
  }

  async getMe() {
    return this.request(API_ENDPOINTS.me);
  }

  // Booking
  async createBooking(bookingData: {
    serviceId: string;
    doctorId: string;
    date: string;
    time: string;
    customerInfo: {
      name: string;
      email: string;
      phone: string;
      notes?: string;
    };
  }) {
    return this.request(API_ENDPOINTS.booking, {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async getBookingSlots(date: string, doctorId?: string) {
    const params = new URLSearchParams({ date });
    if (doctorId) params.append('doctorId', doctorId);
    return this.request(`${API_ENDPOINTS.bookingSlots}?${params}`);
  }

  async cancelBooking(bookingId: string) {
    return this.request(API_ENDPOINTS.bookingCancel, {
      method: 'POST',
      body: JSON.stringify({ bookingId }),
    });
  }

  // Gallery
  async getGallery() {
    return this.request(API_ENDPOINTS.gallery);
  }

  // Reviews
  async getReviews() {
    return this.request(API_ENDPOINTS.reviews);
  }

  async createReview(reviewData: {
    serviceId: string;
    rating: number;
    comment: string;
  }) {
    return this.request(API_ENDPOINTS.reviews, {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  }

  // Inquiry
  async createInquiry(inquiryData: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }) {
    return this.request(API_ENDPOINTS.inquiry, {
      method: 'POST',
      body: JSON.stringify(inquiryData),
    });
  }
}

export const apiService = new ApiService();
