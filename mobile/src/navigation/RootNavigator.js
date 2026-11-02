import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import colors from '../theme/colors';
import { useAuth } from '../context/AuthContext';

// Screens
import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import ClientHomeScreen from '../screens/client/ClientHomeScreen';
import AdvocateHomeScreen from '../screens/advocate/AdvocateHomeScreen';
import DocScannerScreen from '../screens/advocate/DocScannerScreen';
import JanHitFeedScreen from '../screens/public/JanHitFeedScreen';
import NotificationsScreen from '../screens/shared/NotificationsScreen';

export default function RootNavigator() {
  const { isAuthenticated, role } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('HOME');

  if (showSplash) {
    return <SplashScreen onGetStarted={() => setShowSplash(false)} />;
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  // Navigation simulation for React Native with robust tab routing
  const renderCurrentScreen = () => {
    if (role === 'CLIENT') {
      switch (activeTab) {
        case 'HOME':
          return <ClientHomeScreen navigation={{ navigate: setActiveTab }} />;
        case 'PIL':
          return <JanHitFeedScreen />;
        case 'NOTIFICATIONS':
          return <NotificationsScreen navigation={{ goBack: () => setActiveTab('HOME') }} />;
        default:
          return <ClientHomeScreen navigation={{ navigate: setActiveTab }} />;
      }
    } else {
      // Advocate Role
      switch (activeTab) {
        case 'HOME':
          return <AdvocateHomeScreen navigation={{ navigate: setActiveTab }} />;
        case 'SCANNER':
          return <DocScannerScreen />;
        case 'PIL':
          return <JanHitFeedScreen />;
        case 'NOTIFICATIONS':
          return <NotificationsScreen navigation={{ goBack: () => setActiveTab('HOME') }} />;
        default:
          return <AdvocateHomeScreen navigation={{ navigate: setActiveTab }} />;
      }
    }
  };

  const clientTabs = [
    { id: 'HOME', label: 'केस वॉल्ट', icon: '⚖️' },
    { id: 'PIL', label: 'जनहित PIL', icon: '🤝' },
    { id: 'NOTIFICATIONS', label: 'सूचनाएं', icon: '🔔' }
  ];

  const advocateTabs = [
    { id: 'HOME', label: 'कॉज लिस्ट', icon: '🏛️' },
    { id: 'SCANNER', label: 'स्कैनर / वॉल्ट', icon: '📷' },
    { id: 'PIL', label: 'जनहित PIL', icon: '🤝' },
    { id: 'NOTIFICATIONS', label: 'अलर्ट्स', icon: '🔔' }
  ];

  const currentTabs = role === 'CLIENT' ? clientTabs : advocateTabs;

  return (
    <SafeAreaView style={styles.navContainer}>
      <View style={styles.screenWrapper}>
        {renderCurrentScreen()}
      </View>

      {/* Institutional Bottom Tab Bar */}
      <View style={styles.tabBar}>
        {currentTabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tabItem, isActive && styles.tabItemActive]}
              onPress={() => setActiveTab(tab.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.tabIcon}>{tab.icon}</Text>
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    flex: 1,
    backgroundColor: colors.canvas
  },
  screenWrapper: {
    flex: 1
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.header,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: 8,
    paddingHorizontal: 10,
    justifyContent: 'space-around'
  },
  tabItem: {
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12
  },
  tabItemActive: {
    backgroundColor: colors.cardInner
  },
  tabIcon: {
    fontSize: 18,
    marginBottom: 2
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textSecondary
  },
  tabLabelActive: {
    color: colors.champagne,
    fontWeight: '800'
  }
});
