import React from 'react';
import { Platform } from 'react-native';
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
  { name: 'Home'     as const, key: 'home',     icon: 'home'     as const, iconOutline: 'home-outline'     as const },
  { name: 'Services' as const, key: 'services', icon: 'sparkles' as const, iconOutline: 'sparkles-outline' as const },
  { name: 'Gallery'  as const, key: 'gallery',  icon: 'images'   as const, iconOutline: 'images-outline'   as const },
  { name: 'Profile'  as const, key: 'profile',  icon: 'person'   as const, iconOutline: 'person-outline'   as const },
];

export function MainTabNavigator() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const pb = insets.bottom > 0 ? insets.bottom : Platform.OS === 'android' ? 10 : 8;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const tab = TAB_DEFS.find((td) => td.name === route.name)!;
        const label = t('tabs', tab.key);

        return {
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: '#B0A090',
          tabBarStyle: {
            backgroundColor: '#FDFAF7',
            borderTopWidth: 1,
            borderTopColor: 'rgba(212,165,116,0.15)',
            paddingTop: 8,
            paddingBottom: pb,
            height: 56 + pb,
            elevation: 8,
          },
          tabBarItemStyle: {
            paddingVertical: 0,
          },
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? tab.icon : tab.iconOutline}
              size={22}
              color={color}
            />
          ),
          tabBarLabel: label,
          tabBarLabelStyle: {
            fontSize: 11,
            marginTop: 2,
            includeFontPadding: false,
          },
        };
      }}
    >
      <Tab.Screen name="Home"     component={HomeScreen} />
      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="Gallery"  component={GalleryScreen} />
      <Tab.Screen name="Profile"  component={ProfileScreen} />
    </Tab.Navigator>
  );
}
