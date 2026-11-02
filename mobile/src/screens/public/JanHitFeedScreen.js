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
  Alert
} from 'react-native';
import colors from '../../theme/colors';
import { api } from '../../api/client';

export default function JanHitFeedScreen() {
  const [causes, setCauses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCause, setSelectedCause] = useState(null);
  const [donationAmount, setDonationAmount] = useState(100);
  const [isContributing, setIsContributing] = useState(false);

  const loadCauses = async () => {
    try {
      const data = await api.pil.getAll();
      setCauses(data);
    } catch (err) {
      console.warn('Error loading PIL causes:', err.message);
    }
  };

  useEffect(() => {
    loadCauses();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCauses();
    setRefreshing(false);
  };

  const handleDonate = async () => {
    if (!selectedCause) return;

    setIsContributing(true);
    try {
      const res = await api.pil.contribute(selectedCause.id, donationAmount, 'Aam Nagrik (Citizen)');
      if (res.success) {
        Alert.alert(
          '🙏 जनसहयोग सफल (Contribution Received)',
          `धन्यवाद! आपने इस जनहित याचिका के लिए ₹${donationAmount} का विधिक जनसहयोग दिया है।\n\nकोर्ट आदेश व पारदर्शी खर्च आपके ऐप में अपडेट होता रहेगा।`
        );
        setSelectedCause(null);
        await loadCauses();
      }
    } catch (err) {
      Alert.alert('त्रुटि', err.message || 'UPI गेटवे कनेक्ट करने में विफल।');
    } finally {
      setIsContributing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <Text style={styles.headerTitle}>जनहित याचिका (Jan-Hit PIL Hub)</Text>
          <View style={styles.proBonoBadge}>
            <Text style={styles.proBonoText}>Pro-Bono Initiative</Text>
          </View>
        </View>
        <Text style={styles.headerSub}>
          स्थानीय भ्रष्टाचार, पर्यावरण व सार्वजनिक भूमि के मुकदमों में जनसहयोग (Crowdfund) से न्याय
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.champagne} />}
      >
        {causes.map((cause) => {
          const percent = Math.min(100, Math.round((cause.raisedAmount / cause.targetAmount) * 100));

          return (
            <View key={cause.id} style={styles.causeCard}>
              <View style={styles.cardTopRow}>
                <View style={styles.categoryPill}>
                  <Text style={styles.categoryText}>{cause.category.replace('_', ' ')}</Text>
                </View>
                <View style={styles.courtBadge}>
                  <Text style={styles.courtBadgeText}>{cause.statusBadge}</Text>
                </View>
              </View>

              <Text style={styles.causeTitle}>{cause.titleHi || cause.title}</Text>
              <Text style={styles.causeDesc}>{cause.descriptionHi || cause.description}</Text>

              <View style={styles.leadCounselRow}>
                <Text style={styles.counselLabel}>पैरवी अधिवक्ता:</Text>
                <Text style={styles.counselName}>{cause.leadAdvocate} ({cause.leadAdvocateBar})</Text>
              </View>

              {/* Progress Bar */}
              <View style={styles.progressContainer}>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${percent}%` }]} />
                </View>
                <View style={styles.progressMeta}>
                  <Text style={styles.raisedText}>
                    ₹{cause.raisedAmount.toLocaleString('en-IN')} <Text style={styles.targetText}>/ ₹{cause.targetAmount.toLocaleString('en-IN')}</Text>
                  </Text>
                  <Text style={styles.percentText}>{percent}% • {cause.backersCount} नागरिक जुड़े</Text>
                </View>
              </View>

              {/* Court Timeline Update */}
              {cause.courtUpdates && cause.courtUpdates.length > 0 && (
                <View style={styles.courtUpdateBox}>
                  <Text style={styles.updateDate}>⚖️ कोर्ट अपडेट ({cause.courtUpdates[0].date}):</Text>
                  <Text style={styles.updateText}>{cause.courtUpdates[0].text}</Text>
                </View>
              )}

              {/* Next Hearing & Donate Button */}
              <View style={styles.cardFooter}>
                <View>
                  <Text style={styles.hearingLabel}>अगली सुनवाई (Hearing):</Text>
                  <Text style={styles.hearingDate}>{cause.nextHearingDate}</Text>
                </View>

                <TouchableOpacity
                  style={styles.donateBtn}
                  onPress={() => setSelectedCause(cause)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.donateBtnText}>सहयोग करें (₹ UPI) →</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* ================= UPI MICRO-DONATION MODAL ================= */}
      {selectedCause && (
        <Modal transparent={true} animationType="slide" visible={true} onRequestClose={() => setSelectedCause(null)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>जनहित याचिका में सहयोग</Text>
                <TouchableOpacity onPress={() => setSelectedCause(null)}>
                  <Text style={styles.closeBtn}>✕</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.selectedCauseTitle} numberOfLines={2}>
                {selectedCause.titleHi || selectedCause.title}
              </Text>
              <Text style={styles.upiSub}>
                आपका सूक्ष्म योगदान (₹50 - ₹1000) वकील की ड्राफ्टिंग व कोर्ट फाइलिंग खर्च में उपयोग होगा।
              </Text>

              {/* Amount Selector Pills */}
              <View style={styles.amountPillsRow}>
                {[50, 100, 250, 500, 1000].map(amt => (
                  <TouchableOpacity
                    key={amt}
                    style={[styles.amtPill, donationAmount === amt && styles.amtPillActive]}
                    onPress={() => setDonationAmount(amt)}
                  >
                    <Text style={[styles.amtPillText, donationAmount === amt && styles.amtPillTextActive]}>
                      ₹{amt}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.upiAppsRow}>
                <Text style={styles.upiLabel}>समर्थित 1-Click UPI ऐप्स:</Text>
                <Text style={styles.upiIcons}>GPay • PhonePe • Paytm • BHIM UPI</Text>
              </View>

              <TouchableOpacity
                style={styles.confirmUpiBtn}
                onPress={handleDonate}
                disabled={isContributing}
                activeOpacity={0.85}
              >
                <Text style={styles.confirmUpiText}>
                  {isContributing ? 'भुगतान सत्यापित हो रहा है...' : `₹${donationAmount} UPI से योगदान करें →`}
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
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.header,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  headerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.white
  },
  proBonoBadge: {
    backgroundColor: 'rgba(197, 168, 128, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6
  },
  proBonoText: {
    fontSize: 9,
    color: colors.champagneLight,
    fontWeight: '700'
  },
  headerSub: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 4,
    lineHeight: 14
  },
  scrollContent: {
    padding: 16,
    gap: 14
  },
  causeCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  categoryPill: {
    backgroundColor: colors.cardInner,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border
  },
  categoryText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.champagneLight
  },
  courtBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6
  },
  courtBadgeText: {
    fontSize: 9,
    color: colors.emerald,
    fontWeight: '700'
  },
  causeTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 4,
    lineHeight: 20
  },
  causeDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
    marginBottom: 10
  },
  leadCounselRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  counselLabel: {
    fontSize: 10,
    color: colors.textMuted,
    marginRight: 4
  },
  counselName: {
    fontSize: 10,
    color: colors.white,
    fontWeight: '700'
  },
  progressContainer: {
    marginBottom: 12
  },
  progressTrack: {
    height: 7,
    backgroundColor: colors.cardInner,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.champagne,
    borderRadius: 4
  },
  progressMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  raisedText: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.champagne
  },
  targetText: {
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: '400'
  },
  percentText: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600'
  },
  courtUpdateBox: {
    backgroundColor: colors.cardInner,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12
  },
  updateDate: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.champagneLight,
    marginBottom: 2
  },
  updateText: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 15
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  hearingLabel: {
    fontSize: 9,
    color: colors.textMuted
  },
  hearingDate: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.white
  },
  donateBtn: {
    backgroundColor: colors.champagne,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8
  },
  donateBtnText: {
    color: colors.header,
    fontSize: 11,
    fontWeight: '800'
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(6, 11, 19, 0.88)',
    justifyContent: 'center',
    padding: 18
  },
  modalCard: {
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
  closeBtn: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '700'
  },
  selectedCauseTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.champagneLight,
    marginBottom: 4
  },
  upiSub: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
    marginBottom: 16
  },
  amountPillsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16
  },
  amtPill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.cardInner,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border
  },
  amtPillActive: {
    backgroundColor: colors.champagne,
    borderColor: colors.champagneLight
  },
  amtPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white
  },
  amtPillTextActive: {
    color: colors.header,
    fontWeight: '900'
  },
  upiAppsRow: {
    backgroundColor: colors.cardInner,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border
  },
  upiLabel: {
    fontSize: 10,
    color: colors.textMuted
  },
  upiIcons: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.white,
    marginTop: 2
  },
  confirmUpiBtn: {
    backgroundColor: colors.champagne,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center'
  },
  confirmUpiText: {
    color: colors.header,
    fontSize: 13,
    fontWeight: '900'
  }
});
