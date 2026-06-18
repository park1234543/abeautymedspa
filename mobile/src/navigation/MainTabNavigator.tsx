import React from 'react';
import { Platform, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HomeScreen } from '../screens/HomeScreen';
import { ServicesScreen } from '../screens/ServicesScreen';
import { GalleryScreen } from '../screens/GalleryScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { COLORS } from '../constants/theme';
import { useTranslation } from '../i18n/useTranslation';

export type MainTabParamList = {
  Home: undefined;
  Services: undefined;
  Gallery: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_DEFS = [
  { name: 'Home' as const, key: 'home', icon: 'home' as const, iconOutline: 'home-outline' as const },
  { name: 'Services' as const, key: 'services', icon: 'sparkles' as const, iconOutline: 'sparkles-outline' as const },
  { name: 'Gallery' as const, key: 'gallery', icon: 'images' as const, iconOutline: 'images-outline' as const },
  { name: 'Profile' as const, key: 'profile', icon: 'person' as const, iconOutline: 'person-outline' as const },
];

export function MainTabNavigator() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const tabBarHeight = 60 + (insets.bottom > 0 ? insets.bottom : Platform.OS === 'android' ? 8 : 0);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const tab = TAB_DEFS.find((td) => td.name === route.name);
        return {
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: '#B0A090',
          tabBarStyle: {
            backgroundColor: '#FDFAF7',
            borderTopWidth: 1,
            borderTopColor: 'rgba(212,165,116,0.15)',
            height: tabBarHeight,
            paddingTop: 6,
            paddingBottom: insets.bottom > 0 ? insets.bottom : Platform.OS === 'android' ? 8 : 6,
            elevation: 8,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            marginTop: 2,
            marginBottom: 0,
          },
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? (tab?.icon ?? 'home') : (tab?.iconOutline ?? 'home-outline')}
              size={22}
              color={color}
            />
          ),
        };
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: t('tabs', 'home') }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesScreen}
        options={{ tabBarLabel: t('tabs', 'services') }}
      />
      <Tab.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{ tabBarLabel: t('tabs', 'gallery') }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: t('tabs', 'profile') }}
      />
    </Tab.Navigator>
  );
}
