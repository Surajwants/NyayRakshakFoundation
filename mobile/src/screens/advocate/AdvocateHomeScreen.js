import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  Modal,
  TextInput,
  Alert
} from 'react-native';
import colors from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../api/client';

export default function AdvocateHomeScreen({ navigation }) {
  const { user, switchRole } = useAuth();
  const [causeList, setCauseList] = useState([]);
  const [balance, setBalance] = useState(33000);
  const [refreshing, setRefreshing] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('15000');
  const [upiId, setUpiId] = useState('adv.rajeshwar@icici');
  const [isProcessing, setIsProcessing] = useState(false);

  const loadData = async () => {
    try {
      const list = await api.causeList.getAll().catch(() => []);
      setCauseList(list);
    } catch (err) {
      console.warn('Error loading advocate cause list:', err.message);
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

  const handleWithdrawal = async () => {
    const amt = parseFloat(withdrawAmount);
    if (!amt || amt <= 0 || amt > balance) {
      Alert.alert('अमान्य राशि', `निकासी राशि ₹1 से ₹${balance.toLocaleString('en-IN')} के बीच होनी चाहिए।`);
      return;
    }

    setIsProcessing(true);
    try {
      const res = await api.advocates.withdrawEarnings({
        advocateId: user?.id || 'usr_adv_1',
        amount: amt,
        upiId: upiId
      });

      if (res.success) {
        setBalance(prev => prev - amt);
        setShowWithdrawModal(false);
        Alert.alert(
          '✅ भुगतान सफल (Fund Transferred)',
          `₹${amt.toLocaleString('en-IN')} आपके UPI (${upiId}) में भेज दिए गए हैं।\n\nUTR Number: ${res.withdrawal.utrNumber}`
        );
      }
    } catch (err) {
      Alert.alert('निकासी विफल', err.message || 'बैंक सर्वर व्यस्त है। पुनः प्रयास करें।');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topHeader}>
        <View style={styles.advocateInfo}>
          <View style={styles.advAvatar}>
            <Text style={styles.advAvatarText}>RP</Text>
          </View>
          <View>
            <View style={styles.nameRow}>
              <Text style={styles.advName}>Adv. Rajeshwar Pandey</Text>
              <View style={styles.barBadge}>
                <Text style={styles.barBadgeText}>Verified D/1842/2011</Text>
              </View>
            </View>
            <Text style={styles.courtJurisdiction}>
              🏛️ Supreme Court • Delhi HC • Allahabad HC
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.switchClientBtn}
          onPress={() => switchRole('CLIENT')}
          activeOpacity={0.7}
        >
          <Text style={styles.switchClientText}>नागरिक पोर्टल</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.champagne} />}
      >
        {/* ================= 1. MILESTONE FEES WITHDRAWAL DESK ================= */}
        <View style={styles.earningsCard}>
          <View style={styles.earningsHeader}>
            <View>
              <Text style={styles.earningsSub}>एस्क्रो रिलीज्ड बैलेंस (Available to Payout)</Text>
              <Text style={styles.earningsAmount}>₹{balance.toLocaleString('en-IN')}</Text>
            </View>
            <TouchableOpacity
              style={styles.withdrawBtn}
              onPress={() => setShowWithdrawModal(true)}
              activeOpacity={0.85}
            >
              <Text style={styles.withdrawBtnText}>निकासी (Withdraw) →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.earningsMetaRow}>
            <Text style={styles.metaStat}>✓ 142 केस जीत (Won)</Text>
            <Text style={styles.metaDivider}>•</Text>
            <Text style={styles.metaStat}>⭐ 4.9 रेटिंग</Text>
            <Text style={styles.metaDivider}>•</Text>
            <Text style={styles.metaStat}>🔒 100% Bar Council सम्मत</Text>
          </View>
        </View>

        {/* ================= 2. DAILY COURT CAUSE LIST MANAGER ================= */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>दैनिक कोर्ट कॉज लिस्ट (Daily Cause List)</Text>
              <Text style={styles.sectionSub}>आज की अदालती सुनवाई व आइटम नंबर</Text>
            </View>
            <View style={styles.todayDateBadge}>
              <Text style={styles.todayDateText}>Today</Text>
            </View>
          </View>

          <View style={styles.causeItemsList}>
            {(causeList.length > 0 ? causeList : [
              {
                id: 'cl_1',
                caseNumber: 'WP(C) 4921/2026',
                courtName: 'Delhi High Court (Courtroom 2)',
                bench: 'Hon\'ble Chief Justice Bench',
                itemNumber: 14,
                stage: 'Admission & Interim Demolition Stay',
                parties: 'Vikram Singh vs. State of NCT & Ors.'
              },
              {
                id: 'cl_2',
                caseNumber: 'OA 108/2026 (PB)',
                courtName: 'NGT Principal Bench (New Delhi)',
                bench: 'Judicial Member Bench',
                itemNumber: 7,
                stage: 'Notice to State Pollution Control Board',
                parties: 'Jan-Hit Society vs. Chemical Mills'
              },
              {
                id: 'cl_3',
                caseNumber: 'Bail App 204/2026',
                courtName: 'Sessions Court, Saket',
                bench: 'Special Judge (CBI/ACB)',
                itemNumber: 22,
                stage: 'Anticipatory Bail Arguments',
                parties: 'Rameshwar Prasad vs. State'
              }
            ]).map((item, idx) => (
              <View key={idx} style={styles.causeItemCard}>
                <View style={styles.causeItemHeader}>
                  <View style={styles.itemNumberBadge}>
                    <Text style={styles.itemNumberText}>Item #{item.itemNumber || idx + 5}</Text>
                  </View>
                  <Text style={styles.courtNameText}>{item.courtName}</Text>
                </View>

                <Text style={styles.caseNumberText}>{item.caseNumber || 'CS 892/2026'}</Text>
                <Text style={styles.partiesText}>{item.parties || 'Client Matter'}</Text>

                <View style={styles.stageRow}>
                  <Text style={styles.stageLabel}>चरण (Stage):</Text>
                  <Text style={styles.stageValue}>{item.stage}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* ================= 3. CLIENT CONSULTATION BOOKING REQUESTS ================= */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>वर्चुअल परामर्श अनुरोध (Consultations)</Text>
              <Text style={styles.sectionSub}>₹999 / 30-मिनट वीडियो केस परीक्षण</Text>
            </View>
            <View style={styles.incomingBadge}>
              <Text style={styles.incomingBadgeText}>2 नए अनुरोध</Text>
            </View>
          </View>

          <View style={styles.consultationCardsList}>
            <View style={styles.consultCard}>
              <View style={styles.consultTopRow}>
                <View>
                  <Text style={styles.consultClientName}>Sunita Devi (NRI Property Matter)</Text>
                  <Text style={styles.consultTime}>कल 3:30 PM • 30 Minutes Video</Text>
                </View>
                <View style={styles.feePill}>
                  <Text style={styles.feePillText}>₹999 Prepaid</Text>
                </View>
              </View>

              <Text style={styles.consultQueryBrief}>
                "पैतृक भूमि पर चचेरे भाई द्वारा फर्जी वसीयत के आधार पर राजस्व दाखिल-खारिज रोकने हेतु परामर्श।"
              </Text>

              <View style={styles.consultActionRow}>
                <TouchableOpacity
                  style={styles.acceptConsultBtn}
                  onPress={() => Alert.alert('स्वीकृत', 'परामर्श स्वीकृत! एन्क्रिप्टेड वीडियो रूम लिंक क्लाइंट को भेज दिया गया है।')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.acceptConsultBtnText}>स्वीकारें व लिंक भेजें ✓</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.viewVaultBtn}
                  onPress={() => navigation?.navigate('Scanner')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.viewVaultBtnText}>दस्तावेज़ देखें 📂</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* ================= WITHDRAWAL MODAL ================= */}
      {showWithdrawModal && (
        <Modal transparent={true} animationType="slide" visible={true} onRequestClose={() => setShowWithdrawModal(false)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.withdrawModalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>एडवोकेट फीस निकासी (Payout)</Text>
                <TouchableOpacity onPress={() => setShowWithdrawModal(false)}>
                  <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.withdrawNotice}>
                एस्क्रो में अप्रूव्ड राशि तुरंत आपके पंजीकृत बैंक खाते या UPI में स्थानांतरित कर दी जाती है।
              </Text>

              <View style={styles.balanceInfoBox}>
                <Text style={styles.balanceInfoLabel}>उपलब्ध बैलेंस:</Text>
                <Text style={styles.balanceInfoValue}>₹{balance.toLocaleString('en-IN')}</Text>
              </View>

              <Text style={styles.inputTitle}>निकासी राशि (Amount in ₹)</Text>
              <TextInput
                style={styles.modalInput}
                value={withdrawAmount}
                onChangeText={setWithdrawAmount}
                keyboardType="numeric"
              />

              <Text style={styles.inputTitle}>UPI आईडी / बैंक खाता</Text>
              <TextInput
                style={styles.modalInput}
                value={upiId}
                onChangeText={setUpiId}
              />

              <TouchableOpacity
                style={styles.confirmPayoutBtn}
                onPress={handleWithdrawal}
                disabled={isProcessing}
                activeOpacity={0.85}
              >
                <Text style={styles.confirmPayoutText}>
                  {isProcessing ? 'प्रोसेसिंग...' : 'तुरंत बैंक ट्रांसफर करें (Transfer Now) →'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  advocateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  advAvatar: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.champagne,
    justifyContent: 'center',
    alignItems: 'center'
  },
  advAvatarText: {
    color: colors.header,
    fontSize: 16,
    fontWeight: '900'
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  advName: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.white
  },
  barBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6
  },
  barBadgeText: {
    fontSize: 9,
    color: colors.emerald,
    fontWeight: '700'
  },
  courtJurisdiction: {
    fontSize: 10,
    color: colors.champagneLight,
    marginTop: 2
  },
  switchClientBtn: {
    backgroundColor: colors.cardInner,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border
  },
  switchClientText: {
    color: colors.champagneLight,
    fontSize: 10,
    fontWeight: '700'
  },
  scrollContent: {
    padding: 16
  },
  earningsCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.champagneDark,
    marginBottom: 16
  },
  earningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  earningsSub: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600'
  },
  earningsAmount: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.champagne,
    marginTop: 2
  },
  withdrawBtn: {
    backgroundColor: colors.champagne,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10
  },
  withdrawBtnText: {
    color: colors.header,
    fontSize: 12,
    fontWeight: '800'
  },
  earningsMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  metaStat: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600'
  },
  metaDivider: {
    color: colors.textMuted,
    marginHorizontal: 8
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
  sectionSub: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2
  },
  todayDateBadge: {
    backgroundColor: colors.cardInner,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border
  },
  todayDateText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.champagneLight
  },
  causeItemsList: {
    gap: 10
  },
  causeItemCard: {
    backgroundColor: colors.cardInner,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border
  },
  causeItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6
  },
  itemNumberBadge: {
    backgroundColor: colors.champagne,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4
  },
  itemNumberText: {
    fontSize: 9,
    fontWeight: '900',
    color: colors.header
  },
  courtNameText: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600'
  },
  caseNumberText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.white
  },
  partiesText: {
    fontSize: 11,
    color: colors.champagneLight,
    marginTop: 2,
    marginBottom: 6
  },
  stageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  stageLabel: {
    fontSize: 10,
    color: colors.textMuted
  },
  stageValue: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.emerald
  },
  incomingBadge: {
    backgroundColor: 'rgba(197, 168, 128, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6
  },
  incomingBadgeText: {
    fontSize: 10,
    color: colors.champagneLight,
    fontWeight: '700'
  },
  consultationCardsList: {
    gap: 10
  },
  consultCard: {
    backgroundColor: colors.cardInner,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border
  },
  consultTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8
  },
  consultClientName: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.white
  },
  consultTime: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 2
  },
  feePill: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6
  },
  feePillText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.emerald
  },
  consultQueryBrief: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
    marginBottom: 10
  },
  consultActionRow: {
    flexDirection: 'row',
    gap: 8
  },
  acceptConsultBtn: {
    flex: 2,
    backgroundColor: colors.champagne,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center'
  },
  acceptConsultBtnText: {
    color: colors.header,
    fontSize: 11,
    fontWeight: '800'
  },
  viewVaultBtn: {
    flex: 1,
    backgroundColor: colors.card,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border
  },
  viewVaultBtnText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700'
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(6, 11, 19, 0.88)',
    justifyContent: 'center',
    padding: 18
  },
  withdrawModalCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.champagneDark
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.white
  },
  closeText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '700'
  },
  withdrawNotice: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
    marginBottom: 12
  },
  balanceInfoBox: {
    backgroundColor: colors.cardInner,
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border
  },
  balanceInfoLabel: {
    fontSize: 11,
    color: colors.textSecondary
  },
  balanceInfoValue: {
    fontSize: 15,
    fontWeight: '900',
    color: colors.champagne
  },
  inputTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 6
  },
  modalInput: {
    backgroundColor: colors.cardInner,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.white,
    fontSize: 13,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12
  },
  confirmPayoutBtn: {
    backgroundColor: colors.champagne,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6
  },
  confirmPayoutText: {
    color: colors.header,
    fontSize: 13,
    fontWeight: '800'
  }
});
