import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HomeScreen } from '../screens/HomeScreen';
import { ServicesScreen } from '../screens/ServicesScreen';
import { GalleryScreen } from '../screens/GalleryScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { COLORS, SHADOWS } from '../constants/theme';
import { useTranslation } from '../i18n/useTranslation';

export type MainTabParamList = {
  Home: undefined;
  Services: undefined;
  Gallery: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_DEFS = [
  { name: 'Home' as const, key: 'home', icon: 'home', iconOutline: 'home-outline' },
  { name: 'Services' as const, key: 'services', icon: 'sparkles', iconOutline: 'sparkles-outline' },
  { name: 'Gallery' as const, key: 'gallery', icon: 'images', iconOutline: 'images-outline' },
  { name: 'Profile' as const, key: 'profile', icon: 'person', iconOutline: 'person-outline' },
];

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <View style={[styles.tabBarWrapper, { paddingBottom: insets.bottom }]}>
      <View style={styles.tabBarContainer}>
        {state.routes.map((route, index) => {
          const tab = TAB_DEFS.find((td) => td.name === route.name);
          if (!tab) return null;

          const isFocused = state.index === index;
          const label = t('tabs', tab.key);

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabItem}
              onPress={onPress}
              activeOpacity={0.7}
            >
              {isFocused && <View style={styles.activeDot} />}

              <View style={[styles.iconWrap, isFocused && styles.iconWrapActive]}>
                <Ionicons
                  name={(isFocused ? tab.icon : tab.iconOutline) as any}
                  size={22}
                  color={isFocused ? COLORS.primary : '#B0A090'}
                />
              </View>

              <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="Gallery" component={GalleryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarWrapper: {
    backgroundColor: '#FDFAF7',
    borderTopWidth: 1,
    borderTopColor: 'rgba(212,165,116,0.15)',
    ...SHADOWS.medium,
  },
  tabBarContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 4 : 12,
    paddingHorizontal: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 4,
    position: 'relative',
  },
  activeDot: {
    position: 'absolute',
    top: -10,
    width: 24,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#D4A574',
  },
  iconWrap: {
    width: 44,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  iconWrapActive: {
    backgroundColor: 'rgba(212,165,116,0.12)',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#B0A090',
    letterSpacing: 0.2,
    textAlign: 'center',
    includeFontPadding: false,
    lineHeight: 14,
  },
  tabLabelActive: {
    color: '#D4A574',
    fontWeight: '700',
  },
});
