import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuthStore } from '../store/authStore';
import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import { BookingScreen } from '../screens/BookingScreen';
import { BookingConfirmationScreen } from '../screens/BookingConfirmationScreen';
import { ServiceDetailScreen } from '../screens/ServiceDetailScreen';
import { GalleryDetailScreen } from '../screens/GalleryDetailScreen';
import { MyBookingsScreen } from '../screens/MyBookingsScreen';
import { PrivacyPolicyScreen } from '../screens/PrivacyPolicyScreen';
import { ConsultationScreen } from '../screens/ConsultationScreen';
import { COLORS } from '../constants/theme';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Booking: undefined;
  BookingConfirmation: { bookingId?: string };
  ServiceDetail: { serviceId: string };
  GalleryDetail: { imageId: string };
  MyBookings: undefined;
  PrivacyPolicy: undefined;
  Consultation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      {!isAuthenticated ? (
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ contentStyle: { backgroundColor: 'transparent' } }}
        />
      ) : (
        <>
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen
            name="Booking"
            component={BookingScreen}
            options={{
              headerShown: true,
              headerTitle: '예약하기',
              headerBackTitle: '뒤로',
              headerTintColor: COLORS.text,
              headerStyle: { backgroundColor: COLORS.background },
            }}
          />
          <Stack.Screen
            name="BookingConfirmation"
            component={BookingConfirmationScreen}
            options={{
              headerShown: true,
              headerTitle: '예약 완료',
              headerBackVisible: false,
              headerTintColor: COLORS.text,
              headerStyle: { backgroundColor: COLORS.background },
            }}
          />
          <Stack.Screen
            name="ServiceDetail"
            component={ServiceDetailScreen}
            options={{
              headerShown: true,
              headerTitle: '서비스 상세',
              headerBackTitle: '뒤로',
              headerTintColor: COLORS.text,
              headerStyle: { backgroundColor: COLORS.background },
            }}
          />
          <Stack.Screen
            name="GalleryDetail"
            component={GalleryDetailScreen}
            options={{
              headerShown: true,
              headerTitle: '갤러리',
              headerBackTitle: '뒤로',
              headerTintColor: COLORS.text,
              headerStyle: { backgroundColor: COLORS.background },
            }}
          />
          <Stack.Screen
            name="MyBookings"
            component={MyBookingsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicyScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Consultation"
            component={ConsultationScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
