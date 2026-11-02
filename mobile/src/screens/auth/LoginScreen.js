import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import colors from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const { sendOtp, verifyOtp, role, setRole, isLoading } = useAuth();
  const [phone, setPhone] = useState('9876543210');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('PHONE'); // 'PHONE' or 'OTP'
  const [otpHint, setOtpHint] = useState('');

  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) {
      Alert.alert('अमान्य नंबर', 'कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें।');
      return;
    }
    try {
      const res = await sendOtp(phone, role);
      setStep('OTP');
      setOtpHint(res.otpPreview || '4321');
      setOtp(res.otpPreview || '4321'); // Pre-fill for quick developer & user testing
    } catch (err) {
      Alert.alert('त्रुटि', err.message || 'OTP भेजने में विफल। कृपया पुनः प्रयास करें।');
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 4) {
      Alert.alert('अमान्य OTP', 'कृपया 4 अंकों का OTP दर्ज करें।');
      return;
    }
    try {
      await verifyOtp(phone, otp, role);
    } catch (err) {
      Alert.alert('सत्यापन विफल', err.message || 'गलत OTP कोड।');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        <View style={styles.header}>
          <View style={styles.miniLogo}>
            <Text style={styles.miniLogoText}>NRF</Text>
          </View>
          <Text style={styles.screenTitle}>कानूनी साथी लॉगिन</Text>
          <Text style={styles.screenSub}>
            सुरक्षित OTP प्रमाणीकरण द्वारा अपने विधिक पोर्टल में प्रवेश करें
          </Text>
        </View>

        {/* Dual Profile Switcher Pill */}
        <View style={styles.profileToggleCard}>
          <Text style={styles.toggleLabel}>आपकी भूमिका (Select Persona):</Text>
          <View style={styles.toggleRow}>
            <TouchableOpacity
              style={[
                styles.toggleBtn,
                role === 'CLIENT' && styles.toggleBtnActive
              ]}
              onPress={() => setRole('CLIENT')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.toggleBtnText,
                  role === 'CLIENT' && styles.toggleBtnTextActive
                ]}
              >
                ⚖️ नागरिक (Citizen / Client)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.toggleBtn,
                role === 'ADVOCATE' && styles.toggleBtnActive
              ]}
              onPress={() => setRole('ADVOCATE')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.toggleBtnText,
                  role === 'ADVOCATE' && styles.toggleBtnTextActive
                ]}
              >
                👨‍⚖️ अधिवक्ता (Advocate)
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Input Card */}
        <View style={styles.formCard}>
          {step === 'PHONE' ? (
            <View>
              <Text style={styles.inputLabel}>मोबाइल नंबर (Mobile Phone)</Text>
              <View style={styles.phoneInputRow}>
                <View style={styles.countryCode}>
                  <Text style={styles.countryCodeText}>🇮🇳 +91</Text>
                </View>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="98765 43210"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>

              <TouchableOpacity
                style={styles.actionBtn}
                onPress={handleSendOtp}
                disabled={isLoading}
                activeOpacity={0.85}
              >
                {isLoading ? (
                  <ActivityIndicator color={colors.header} />
                ) : (
                  <Text style={styles.actionBtnText}>OTP प्राप्त करें (Send OTP) →</Text>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <View style={styles.otpHeaderRow}>
                <Text style={styles.inputLabel}>दर्ज करें 4-अंकीय OTP</Text>
                <TouchableOpacity onPress={() => setStep('PHONE')}>
                  <Text style={styles.editPhoneText}>बदलें (+91 {phone})</Text>
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.otpInput}
                placeholder="4321"
                placeholderTextColor={colors.textMuted}
                keyboardType="number-pad"
                maxLength={6}
                value={otp}
                onChangeText={setOtp}
              />

              {otpHint ? (
                <View style={styles.otpNotice}>
                  <Text style={styles.otpNoticeText}>
                    ⚡ परीक्षण OTP: <Text style={styles.boldText}>{otpHint}</Text> (स्वतः भरा गया)
                  </Text>
                </View>
              ) : null}

              <TouchableOpacity
                style={styles.actionBtn}
                onPress={handleVerifyOtp}
                disabled={isLoading}
                activeOpacity={0.85}
              >
                {isLoading ? (
                  <ActivityIndicator color={colors.header} />
                ) : (
                  <Text style={styles.actionBtnText}>पोर्टल में प्रवेश करें (Verify & Enter) ✓</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Footer Guarantee */}
        <View style={styles.footerNote}>
          <Text style={styles.footerNoteText}>
            🔒 एंड-टू-एंड 256-बिट एन्क्रिप्टेड लीगल प्रिविलेज • कोई थर्ड-पार्टी शेयरिंग नहीं
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.canvas
  },
  keyboardContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  header: {
    alignItems: 'center',
    marginBottom: 24
  },
  miniLogo: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.champagne,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12
  },
  miniLogoText: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.header
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.white
  },
  screenSub: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 20
  },
  profileToggleCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16
  },
  toggleLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 8
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.cardInner,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border
  },
  toggleBtnActive: {
    backgroundColor: colors.champagne,
    borderColor: colors.champagneLight
  },
  toggleBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary
  },
  toggleBtnTextActive: {
    color: colors.header,
    fontWeight: '800'
  },
  formCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 8
  },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  countryCode: {
    backgroundColor: colors.cardInner,
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8
  },
  countryCodeText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700'
  },
  phoneInput: {
    flex: 1,
    backgroundColor: colors.cardInner,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.white,
    fontSize: 15,
    fontWeight: '600'
  },
  otpHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  editPhoneText: {
    fontSize: 11,
    color: colors.champagneLight,
    fontWeight: '700'
  },
  otpInput: {
    backgroundColor: colors.cardInner,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.champagne,
    color: colors.white,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 8,
    marginBottom: 12
  },
  otpNotice: {
    backgroundColor: 'rgba(197, 168, 128, 0.1)',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.champagneDark,
    marginBottom: 16
  },
  otpNoticeText: {
    fontSize: 11,
    color: colors.champagneLight,
    textAlign: 'center'
  },
  boldText: {
    fontWeight: '800'
  },
  actionBtn: {
    backgroundColor: colors.champagne,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: colors.champagne,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4
  },
  actionBtnText: {
    color: colors.header,
    fontSize: 14,
    fontWeight: '800'
  },
  footerNote: {
    marginTop: 24,
    alignItems: 'center'
  },
  footerNoteText: {
    fontSize: 10,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 16
  }
});
