import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import colors from '../../theme/colors';
import { useNotifications } from '../../context/NotificationContext';

export default function NotificationsScreen({ navigation }) {
  const { notifications, markAllRead } = useNotifications();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>← वापस</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>कानूनी सूचनाएं (Alerts)</Text>
        </View>

        <TouchableOpacity onPress={markAllRead} style={styles.markReadBtn}>
          <Text style={styles.markReadText}>सभी पढ़ी गईं चिन्हित करें ✓</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {notifications.map((notif) => {
          const isUrgent = notif.urgent;

          return (
            <View key={notif.id} style={[styles.notifCard, isUrgent && styles.notifCardUrgent]}>
              <View style={styles.notifTopRow}>
                <View style={styles.typeBadge}>
                  <Text style={styles.typeBadgeText}>
                    {notif.type === 'HEARING_ALERT' ? '⚡ तारीख अलर्ट' : 
                     notif.type === 'MILESTONE_RELEASE' ? '💰 फीस रिलीज' :
                     notif.type === 'EMERGENCY_DISPATCH' ? '🚨 आपातकालीन SOS' : '⚖️ जनहित अपडेट'}
                  </Text>
                </View>
                <Text style={styles.timeText}>{notif.time}</Text>
              </View>

              <Text style={styles.notifTitle}>{notif.title}</Text>
              <Text style={styles.notifBody}>{notif.body}</Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.canvas
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.header,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  backBtn: {
    paddingVertical: 4
  },
  backBtnText: {
    color: colors.champagneLight,
    fontSize: 12,
    fontWeight: '700'
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.white
  },
  markReadBtn: {
    paddingVertical: 4
  },
  markReadText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600'
  },
  scrollContent: {
    padding: 16,
    gap: 12
  },
  notifCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border
  },
  notifCardUrgent: {
    borderColor: 'rgba(190, 18, 60, 0.6)',
    backgroundColor: '#160B10'
  },
  notifTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6
  },
  typeBadge: {
    backgroundColor: colors.cardInner,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border
  },
  typeBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.champagneLight
  },
  timeText: {
    fontSize: 10,
    color: colors.textMuted
  },
  notifTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 4
  },
  notifBody: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16
  }
});
