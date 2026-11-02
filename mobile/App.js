import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import { NotificationProvider } from './src/context/NotificationContext';
import RootNavigator from './src/navigation/RootNavigator';
import colors from './src/theme/colors';

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <View style={styles.container}>
          <StatusBar style="light" backgroundColor={colors.header} />
          <RootNavigator />
        </View>
      </NotificationProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.canvas
  }
});
