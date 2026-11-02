import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import colors from '../../theme/colors';

export default function SplashScreen({ onGetStarted }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* Monogram Badge */}
        <View style={styles.monogram}>
          <Text style={styles.monogramText}>NRF</Text>
        </View>

        {/* Brand Name */}
        <Text style={styles.title}>NRF Saathi</Text>
        <Text style={styles.subTitle}>NyayRakshakFoundation LegalTech</Text>

        {/* Impactful Hero Emotional Tagline */}
        <View style={styles.taglineCard}>
          <Text style={styles.taglineQuote}>“</Text>
          <Text style={styles.taglineHindi}>
            कानून से डरिए मत, कानून आपके साथ है।
          </Text>
          <Text style={styles.taglineHighlight}>
            हर अदालत, हर शहर — आपका अपना वकील आपके साथ।
          </Text>
        </View>

        {/* Regulatory Badge */}
        <View style={styles.complianceBadge}>
          <Text style={styles.complianceText}>
            🛡️ Bar Council of India Rule 36 Compliant • 256-Bit Privilege Vault
          </Text>
        </View>

      </View>

      {/* Action Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={onGetStarted} activeOpacity={0.85}>
          <Text style={styles.buttonText}>प्रवेश करें / Enter Platform →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.canvas,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 32
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  monogram: {
    width: 76,
    height: 76,
    borderRadius: 22,
    backgroundColor: colors.champagne,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: colors.champagne,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8
  },
  monogramText: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.header,
    letterSpacing: 2
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 0.5
  },
  subTitle: {
    fontSize: 13,
    color: colors.champagneLight,
    fontWeight: '600',
    marginTop: 4,
    letterSpacing: 0.3
  },
  taglineCard: {
    marginTop: 36,
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: colors.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: 'center'
  },
  taglineQuote: {
    fontSize: 28,
    lineHeight: 28,
    color: colors.champagne,
    fontWeight: '900'
  },
  taglineHindi: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
    lineHeight: 24
  },
  taglineHighlight: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.champagneLight,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20
  },
  complianceBadge: {
    marginTop: 28,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.cardInner,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border
  },
  complianceText: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '500',
    textAlign: 'center'
  },
  footer: {
    paddingBottom: 16
  },
  button: {
    backgroundColor: colors.champagne,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: colors.champagne,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4
  },
  buttonText: {
    color: colors.header,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5
  }
});
