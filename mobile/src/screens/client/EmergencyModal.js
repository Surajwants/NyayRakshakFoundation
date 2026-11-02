import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert
} from 'react-native';
import colors from '../../theme/colors';
import { api } from '../../api/client';

export default function EmergencyModal({ onClose }) {
  const [issueType, setIssueType] = useState('ARREST_THREAT');
  const [city, setCity] = useState('Lucknow');
  const [details, setDetails] = useState('');
  const [contactPhone, setContactPhone] = useState('9876543210');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!contactPhone || !details) {
      Alert.alert('अपूर्ण विवरण', 'कृपया अपना संपर्क फोन और समस्या का संक्षिप्त विवरण दर्ज करें।');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.emergency.dispatch({
        issueType,
        city,
        details,
        contactPhone,
        timestamp: new Date().toISOString()
      });
      Alert.alert(
        '🚨 आपातकालीन SOS दर्ज!',
        'आपकी सूचना NRF 24x7 इमरजेंसी लीगल सेल को भेज दी गई है। वरिष्ठ अधिवक्ता 120 मिनट के भीतर आपसे संपर्क करेंगे।',
        [{ text: 'ठीक है (OK)', onPress: onClose }]
      );
    } catch (err) {
      Alert.alert('त्रुटि', err.message || 'SOS भेजने में विफल। सीधे 1800-NYAY-HELP पर कॉल करें।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal visible={true} transparent={true} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={styles.titleBadge}>
              <Text style={styles.sosBadgeText}>🚨 24x7 EMERGENCY SOS</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.modalTitle}>फास्ट-ट्रैक कानूनी आपातकालीन सहायता</Text>
          <Text style={styles.modalSub}>
            अग्रिम ज़मानत (Bail), पुलिस उत्पीड़न या तत्काल डिमोलिशन स्टे हेतु 120 मिनट SLA रिलीफ।
          </Text>

          {/* Issue Selector Pills */}
          <View style={styles.categoryRow}>
            {[
              { id: 'ARREST_THREAT', label: 'गिरफ्तारी / Bail' },
              { id: 'POLICE_HARASSMENT', label: 'पुलिस उत्पीड़न' },
              { id: 'DEMOLITION_STAY', label: 'अवैध तोड़फोड़ स्टे' }
            ].map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.catPill,
                  issueType === cat.id && styles.catPillActive
                ]}
                onPress={() => setIssueType(cat.id)}
              >
                <Text
                  style={[
                    styles.catPillText,
                    issueType === cat.id && styles.catPillTextActive
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* City & Phone */}
          <View style={styles.inputGroup}>
            <Text style={styles.fieldLabel}>शहर व राज्य (City & State)</Text>
            <TextInput
              style={styles.textInput}
              value={city}
              onChangeText={setCity}
              placeholder="e.g. Lucknow, UP"
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.fieldLabel}>संपर्क फोन (Emergency Mobile)</Text>
            <TextInput
              style={styles.textInput}
              value={contactPhone}
              onChangeText={setContactPhone}
              keyboardType="phone-pad"
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.fieldLabel}>घटना का संक्षिप्त विवरण (Situation Brief)</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={details}
              onChangeText={setDetails}
              multiline={true}
              numberOfLines={3}
              placeholder="FIR संख्या, थाने का नाम, या कोर्ट नोटिस विवरण..."
              placeholderTextColor={colors.textMuted}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.dispatchBtn}
            onPress={handleSubmit}
            disabled={isSubmitting}
            activeOpacity={0.85}
          >
            {isSubmitting ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.dispatchBtnText}>वकील टीम तुरंत भेजें (Dispatch SOS) →</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
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
    borderColor: colors.crimson
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  titleBadge: {
    backgroundColor: colors.crimson,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6
  },
  sosBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.white
  },
  closeBtn: {
    padding: 4
  },
  closeBtnText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '700'
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 4
  },
  modalSub: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
    marginBottom: 14
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 14
  },
  catPill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.cardInner,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border
  },
  catPillActive: {
    backgroundColor: colors.crimson,
    borderColor: '#FDA4AF'
  },
  catPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textSecondary
  },
  catPillTextActive: {
    color: colors.white
  },
  inputGroup: {
    marginBottom: 10
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4
  },
  textInput: {
    backgroundColor: colors.cardInner,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.white,
    fontSize: 12,
    borderWidth: 1,
    borderColor: colors.border
  },
  textArea: {
    height: 60,
    textAlignVertical: 'top'
  },
  dispatchBtn: {
    backgroundColor: colors.crimson,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6
  },
  dispatchBtnText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '900'
  }
});
