import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  Alert
} from 'react-native';
import colors from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { api } from '../../api/client';
import EmergencyModal from './EmergencyModal';

export default function ClientHomeScreen({ navigation }) {
  const { user, logout, switchRole } = useAuth();
  const { unreadCount } = useNotifications();
  const [milestonePlan, setMilestonePlan] = useState(null);
  const [caseTimeline, setCaseTimeline] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [isReleasing, setIsReleasing] = useState(false);

  const loadData = async () => {
    try {
      const [plans, timeline] = await Promise.all([
        api.milestones.getAll().catch(() => []),
        api.cases.getTimeline('case_101').catch(() => null)
      ]);
      if (plans && plans.length > 0) setMilestonePlan(plans[0]);
      if (timeline) setCaseTimeline(timeline);
    } catch (err) {
      console.warn('Error loading client data:', err.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  // Step-by-step milestone release handler
  const handleReleaseMilestone = (phase) => {
    Alert.alert(
      'एस्क्रो फंड रिलीज की पुष्टि',
      `क्या आप फेज ${phase.phaseNumber} (${phase.title}) का काम संतुष्ट पाकर ₹${phase.amount.toLocaleString('en-IN')} एडवोकेट को रिलीज करना चाहते हैं?`,
      [
        { text: 'रद्द करें (Cancel)', style: 'cancel' },
        {
          text: 'हाँ, रिलीज करें (Release)',
          style: 'default',
          onPress: async () => {
            setIsReleasing(true);
            try {
              const res = await api.milestones.release(phase.id);
              if (res.success) {
                Alert.alert('सफल', `₹${phase.amount} एडवोकेट को सफलतापूर्वक ट्रांसफर कर दिए गए।`);
                await loadData();
              }
            } catch (err) {
              Alert.alert('त्रुटि', err.message || 'फंड रिलीज करने में विफल।');
            } finally {
              setIsReleasing(false);
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <View style={styles.userSection}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitials}>VS</Text>
          </View>
          <View>
            <View style={styles.badgeRow}>
              <Text style={styles.welcomeName}>{user?.fullName || 'Vikram Singh'}</Text>
              <View style={styles.clientTag}>
                <Text style={styles.clientTagText}>नागरिक पोर्टल</Text>
              </View>
            </View>
            <Text style={styles.locationText}>📍 Jalandhar, Punjab • Case: PBJL01</Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.notifIconBtn}
            onPress={() => navigation?.navigate('Notifications')}
            activeOpacity={0.7}
          >
            <Text style={styles.bellIcon}>🔔</Text>
            {unreadCount > 0 && (
              <View style={styles.notifDot}>
                <Text style={styles.notifDotText}>{unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switchRoleBtn}
            onPress={() => switchRole('ADVOCATE')}
            activeOpacity={0.7}
          >
            <Text style={styles.switchRoleText}>वकील मोड</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.champagne} />}
      >
        {/* ================= 1. UPCOMING HEARING ALERT ================= */}
        <View style={styles.alertCard}>
          <View style={styles.alertHeader}>
            <View style={styles.urgentBadge}>
              <Text style={styles.urgentBadgeText}>⚡ तारीख अलर्ट / Hearing Reminder</Text>
            </View>
            <Text style={styles.daysRemainingText}>9 दिन शेष (9 Days Left)</Text>
          </View>

          <Text style={styles.hearingTitle}>
            Civil Judge (Senior Division) • Courtroom No. 4
          </Text>
          <Text style={styles.hearingSubtitle}>
            पुश्तैनी भूमि पर अवैध कब्जे के विरुद्ध स्टे याचिका (Order 39 Demolition Stay)
          </Text>

          <View style={styles.hearingMetaRow}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>अगली तारीख (Date)</Text>
              <Text style={styles.metaValue}>12 Nov 2026</Text>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>अधिवक्ता (Counsel)</Text>
              <Text style={styles.metaValue}>Adv. Rajeshwar Pandey</Text>
            </View>
          </View>
        </View>

        {/* ================= 2. CNR TRACKING TIMELINE ================= */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>ई-कोर्ट लाइव CNR ट्रैकिंग</Text>
              <Text style={styles.cnrNumberText}>
                CNR: {caseTimeline?.cnrNumber || 'PBJL01-008921-2026'}
              </Text>
            </View>
            <View style={styles.livePill}>
              <View style={styles.greenPulse} />
              <Text style={styles.livePillText}>Live Verified</Text>
            </View>
          </View>

          <View style={styles.timelineList}>
            {(caseTimeline?.steps || [
              { title: 'Case Intake & Vault Created', date: '25 Oct 2026', done: true },
              { title: 'Document & Revenue Vetting', date: '27 Oct 2026', done: true },
              { title: 'Legal Notice & Injunction Drafting', date: '01 Nov 2026', done: true },
              { title: 'Court Filing & CNR Registration', date: 'Active Phase', done: false },
              { title: 'Interim Stay Demolition Arguments', date: '12 Nov 2026', done: false }
            ]).map((step, idx) => (
              <View key={idx} style={styles.timelineRow}>
                <View style={styles.stepIndicatorCol}>
                  <View style={[styles.stepDot, step.done ? styles.stepDotDone : styles.stepDotPending]}>
                    <Text style={styles.stepDotText}>{step.done ? '✓' : idx + 1}</Text>
                  </View>
                  {idx < 4 && <View style={[styles.stepLine, step.done ? styles.stepLineDone : styles.stepLinePending]} />}
                </View>
                <View style={styles.stepInfoCol}>
                  <Text style={[styles.stepTitle, step.done && styles.stepTitleDone]}>{step.title}</Text>
                  <Text style={styles.stepDate}>{step.date}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* ================= 3. STEP-BY-STEP MILESTONE ESCROW WALLET ================= */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>माइलस्टोन एस्क्रो वॉलेट (Escrow)</Text>
              <Text style={styles.sectionSubtitle}>
                वकील द्वारा हर चरण पूर्ण करने पर ही फंड रिलीज होगा
              </Text>
            </View>
            <View style={styles.escrowTotalBadge}>
              <Text style={styles.escrowTotalLabel}>कुल केस फीस</Text>
              <Text style={styles.escrowTotalValue}>₹25,000</Text>
            </View>
          </View>

          {/* Trust Banner */}
          <View style={styles.trustBanner}>
            <Text style={styles.trustBannerText}>
              🛡️ "Paise har step par release honge jab vakil step poora karega. No Ghosting, 100% Accountability."
            </Text>
          </View>

          {/* 4 Phases List */}
          <View style={styles.phasesList}>
            {(milestonePlan?.phases || [
              {
                id: 'ms_1',
                phaseNumber: 1,
                title: 'Legal Consultation & Merits Analysis',
                amount: 2500,
                status: 'RELEASED_TO_ADVOCATE',
                deliverable: 'Conducted 45-minute video vetting of Jamabandi records.'
              },
              {
                id: 'ms_2',
                phaseNumber: 2,
                title: 'Drafting, Legal Notice & Evidence Packaging',
                amount: 5500,
                status: 'WORK_SUBMITTED',
                deliverable: 'Completed Order 39 Injunction Plaint, Sec 80 CPC Notice & 14 maps.'
              },
              {
                id: 'ms_3',
                phaseNumber: 3,
                title: 'Court Filing & Case Registration (CNR)',
                amount: 8000,
                status: 'LOCKED_IN_ESCROW',
                deliverable: 'Pending formal e-filing before Sub-Divisional Collector.'
              },
              {
                id: 'ms_4',
                phaseNumber: 4,
                title: 'Arguments, Evidence & Final Order',
                amount: 9000,
                status: 'PENDING_DEPOSIT',
                deliverable: 'Pending appearance on hearing date for interim stay.'
              }
            ]).map((phase) => {
              const isWorkSubmitted = phase.status === 'WORK_SUBMITTED';
              const isReleased = phase.status === 'RELEASED_TO_ADVOCATE';
              const isLocked = phase.status === 'LOCKED_IN_ESCROW';

              return (
                <View key={phase.id} style={styles.phaseCard}>
                  <View style={styles.phaseHeaderRow}>
                    <View style={styles.phaseNumberPill}>
                      <Text style={styles.phaseNumberText}>फेज {phase.phaseNumber}</Text>
                    </View>
                    <Text style={styles.phaseAmount}>₹{phase.amount.toLocaleString('en-IN')}</Text>
                  </View>

                  <Text style={styles.phaseTitle}>{phase.title}</Text>
                  <Text style={styles.phaseDeliverable}>{phase.deliverable}</Text>

                  <View style={styles.phaseFooterRow}>
                    {isReleased && (
                      <View style={styles.statusBadgeReleased}>
                        <Text style={styles.statusTextReleased}>✓ वकील को भुगतान हो चुका (Paid)</Text>
                      </View>
                    )}

                    {isLocked && (
                      <View style={styles.statusBadgeLocked}>
                        <Text style={styles.statusTextLocked}>🔒 सुरक्षित एस्क्रो में लॉक (Protected)</Text>
                      </View>
                    )}

                    {phase.status === 'PENDING_DEPOSIT' && (
                      <View style={styles.statusBadgePending}>
                        <Text style={styles.statusTextPending}>⏳ आगामी चरण (Upcoming)</Text>
                      </View>
                    )}

                    {isWorkSubmitted && (
                      <TouchableOpacity
                        style={styles.reviewReleaseBtn}
                        onPress={() => handleReleaseMilestone(phase)}
                        disabled={isReleasing}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.reviewReleaseBtnText}>
                          जाँचें व ₹{phase.amount.toLocaleString('en-IN')} रिलीज करें →
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ================= 4. FLOATING SOS EMERGENCY ALERT BUTTON ================= */}
      <TouchableOpacity
        style={styles.floatingSosBtn}
        onPress={() => setShowEmergencyModal(true)}
        activeOpacity={0.85}
      >
        <Text style={styles.sosIcon}>🚨</Text>
        <Text style={styles.sosText}>SOS Emergency</Text>
      </TouchableOpacity>

      {/* Emergency Relief Modal */}
      {showEmergencyModal && (
        <EmergencyModal onClose={() => setShowEmergencyModal(false)} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.canvas
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.header,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.cardInner,
    borderWidth: 1,
    borderColor: colors.champagne,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarInitials: {
    color: colors.champagne,
    fontWeight: '800',
    fontSize: 14
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  welcomeName: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.white
  },
  clientTag: {
    backgroundColor: 'rgba(197, 168, 128, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8
  },
  clientTagText: {
    fontSize: 9,
    color: colors.champagneLight,
    fontWeight: '700'
  },
  locationText: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  notifIconBtn: {
    position: 'relative',
    padding: 6
  },
  bellIcon: {
    fontSize: 18
  },
  notifDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: colors.crimson,
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  notifDotText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: '800'
  },
  switchRoleBtn: {
    backgroundColor: colors.cardInner,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border
  },
  switchRoleText: {
    color: colors.champagneLight,
    fontSize: 10,
    fontWeight: '700'
  },
  scrollContent: {
    padding: 16
  },
  alertCard: {
    backgroundColor: '#1E1218',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.crimson,
    marginBottom: 16
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  urgentBadge: {
    backgroundColor: colors.crimson,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6
  },
  urgentBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '800'
  },
  daysRemainingText: {
    color: '#FDA4AF',
    fontSize: 11,
    fontWeight: '700'
  },
  hearingTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 4
  },
  hearingSubtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
    marginBottom: 12
  },
  hearingMetaRow: {
    flexDirection: 'row',
    backgroundColor: '#0F080C',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(190, 18, 60, 0.4)'
  },
  metaItem: {
    flex: 1
  },
  metaDivider: {
    width: 1,
    backgroundColor: 'rgba(190, 18, 60, 0.3)',
    marginHorizontal: 10
  },
  metaLabel: {
    fontSize: 9,
    color: '#FDA4AF',
    textTransform: 'uppercase',
    fontWeight: '700'
  },
  metaValue: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.white,
    marginTop: 2
  },
  sectionCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.white
  },
  sectionSubtitle: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2
  },
  cnrNumberText: {
    fontSize: 11,
    color: colors.champagneLight,
    fontWeight: '700',
    marginTop: 2
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 5
  },
  greenPulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.emerald
  },
  livePillText: {
    fontSize: 10,
    color: colors.emerald,
    fontWeight: '700'
  },
  timelineList: {
    marginTop: 6
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12
  },
  stepIndicatorCol: {
    alignItems: 'center',
    width: 28,
    marginRight: 10
  },
  stepDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center'
  },
  stepDotDone: {
    backgroundColor: colors.emerald
  },
  stepDotPending: {
    backgroundColor: colors.cardInner,
    borderWidth: 1,
    borderColor: colors.border
  },
  stepDotText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.white
  },
  stepLine: {
    width: 2,
    height: 24,
    marginTop: 4
  },
  stepLineDone: {
    backgroundColor: colors.emerald
  },
  stepLinePending: {
    backgroundColor: colors.border
  },
  stepInfoCol: {
    flex: 1,
    paddingTop: 2
  },
  stepTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary
  },
  stepTitleDone: {
    color: colors.white
  },
  stepDate: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 2
  },
  escrowTotalBadge: {
    alignItems: 'flex-end'
  },
  escrowTotalLabel: {
    fontSize: 9,
    color: colors.textMuted,
    fontWeight: '600'
  },
  escrowTotalValue: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.champagne
  },
  trustBanner: {
    backgroundColor: colors.cardInner,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14
  },
  trustBannerText: {
    fontSize: 10,
    color: colors.champagneLight,
    lineHeight: 15,
    fontWeight: '600'
  },
  phasesList: {
    gap: 10
  },
  phaseCard: {
    backgroundColor: colors.cardInner,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border
  },
  phaseHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6
  },
  phaseNumberPill: {
    backgroundColor: colors.card,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border
  },
  phaseNumberText: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '700'
  },
  phaseAmount: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.champagne
  },
  phaseTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 4
  },
  phaseDeliverable: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
    marginBottom: 10
  },
  phaseFooterRow: {
    marginTop: 2
  },
  statusBadgeReleased: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: 'flex-start'
  },
  statusTextReleased: {
    fontSize: 11,
    color: colors.emerald,
    fontWeight: '700'
  },
  statusBadgeLocked: {
    backgroundColor: 'rgba(197, 168, 128, 0.12)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: 'flex-start'
  },
  statusTextLocked: {
    fontSize: 11,
    color: colors.champagneLight,
    fontWeight: '700'
  },
  statusBadgePending: {
    backgroundColor: colors.card,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: 'flex-start'
  },
  statusTextPending: {
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: '600'
  },
  reviewReleaseBtn: {
    backgroundColor: colors.champagne,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: 'center'
  },
  reviewReleaseBtnText: {
    color: colors.header,
    fontSize: 11,
    fontWeight: '800'
  },
  floatingSosBtn: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.crimson,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 30,
    gap: 8,
    shadowColor: colors.crimson,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#FDA4AF'
  },
  sosIcon: {
    fontSize: 18
  },
  sosText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.5
  }
});
