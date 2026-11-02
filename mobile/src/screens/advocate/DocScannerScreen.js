import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert
} from 'react-native';
import colors from '../../theme/colors';

export default function DocScannerScreen() {
  const [selectedCategory, setSelectedCategory] = useState('REVENUE_MAP');
  const [uploadedDocs, setUploadedDocs] = useState([
    {
      id: 'doc_1',
      title: 'Khatauni_Jamabandi_2026.pdf',
      category: 'राजस्व खतौनी / Jamabandi',
      size: '2.4 MB',
      date: '01 Nov 2026',
      status: 'VERIFIED_ENCRYPTED'
    },
    {
      id: 'doc_2',
      title: 'Order39_Injunction_Plaint_Draft_v2.docx',
      category: 'स्टे याचिका ड्राफ्ट',
      size: '1.1 MB',
      date: '31 Oct 2026',
      status: 'VERIFIED_ENCRYPTED'
    },
    {
      id: 'doc_3',
      title: 'Vakalatnama_Signed_Client.pdf',
      category: 'वकालतनामा',
      size: '850 KB',
      date: '28 Oct 2026',
      status: 'VERIFIED_ENCRYPTED'
    }
  ]);

  const handleScanAction = (method) => {
    Alert.alert(
      method === 'CAMERA' ? '📷 कैमरा स्कैनर सक्रिय' : '📁 फ़ाइल ब्राउज़र',
      'सुरक्षित 256-बिट लीगल वॉल्ट के लिए दस्तावेज़ स्कैन हो रहा है...',
      [
        {
          text: 'अपलोड करें (Simulate Upload)',
          onPress: () => {
            const newDoc = {
              id: `doc_${Date.now()}`,
              title: `Scanned_CourtOrder_${Date.now().toString().slice(-4)}.pdf`,
              category: selectedCategory === 'REVENUE_MAP' ? 'राजस्व नक्शा' : 'कोर्ट आदेश',
              size: '1.8 MB',
              date: 'Just Now',
              status: 'VERIFIED_ENCRYPTED'
            };
            setUploadedDocs(prev => [newDoc, ...prev]);
            Alert.alert('✅ सफलता', 'दस्तावेज़ एन्क्रिप्टेड वॉल्ट में सुरक्षित रूप से जुड़ गया है।');
          }
        },
        { text: 'रद्द करें', style: 'cancel' }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>लीगल डॉक्यूमेंट स्कैनर व वॉल्ट</Text>
        <Text style={styles.headerSub}>
          कैमरा से स्कैन करें या पीडीएफ़ अपलोड करें • 100% क्लाइंट-अटॉर्नी प्रिविलेज्ड
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Scanner Trigger Box */}
        <View style={styles.scannerBox}>
          <Text style={styles.scannerIcon}>📸</Text>
          <Text style={styles.scannerPromptTitle}>नया कानूनी दस्तावेज़ जोड़ें</Text>
          <Text style={styles.scannerPromptSub}>
            हाई-रेज़ोल्यूशन ऑटो-एज डिटेक्शन व लीगल OCR सक्षम
          </Text>

          {/* Category Selector */}
          <View style={styles.categoryWrap}>
            {[
              { id: 'REVENUE_MAP', label: 'खतौनी / नक्शा' },
              { id: 'PLAINT', label: 'याचिका ड्राफ्ट' },
              { id: 'VAKALATNAMA', label: 'वकालतनामा' },
              { id: 'ORDER_SHEET', label: 'कोर्ट आदेश' }
            ].map(cat => (
              <TouchableOpacity
                key={cat.id}
                style={[styles.catBtn, selectedCategory === cat.id && styles.catBtnActive]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <Text style={[styles.catBtnText, selectedCategory === cat.id && styles.catBtnTextActive]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionBtnRow}>
            <TouchableOpacity
              style={styles.cameraBtn}
              onPress={() => handleScanAction('CAMERA')}
              activeOpacity={0.85}
            >
              <Text style={styles.cameraBtnText}>📷 कैमरा से स्कैन करें</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.pickerBtn}
              onPress={() => handleScanAction('FILE')}
              activeOpacity={0.85}
            >
              <Text style={styles.pickerBtnText}>📂 PDF चुनें</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Uploaded Documents Vault */}
        <View style={styles.vaultSection}>
          <View style={styles.vaultHeader}>
            <Text style={styles.vaultTitle}>एन्क्रिप्टेड केस फ़ाइलें (Encrypted Vault)</Text>
            <View style={styles.vaultBadge}>
              <Text style={styles.vaultBadgeText}>AES-256 Bit</Text>
            </View>
          </View>

          <View style={styles.docList}>
            {uploadedDocs.map(doc => (
              <View key={doc.id} style={styles.docCard}>
                <View style={styles.docIconBox}>
                  <Text style={styles.docIconText}>📄</Text>
                </View>
                <View style={styles.docMeta}>
                  <Text style={styles.docTitle} numberOfLines={1}>{doc.title}</Text>
                  <View style={styles.metaRow}>
                    <Text style={styles.docCat}>{doc.category}</Text>
                    <Text style={styles.dot}>•</Text>
                    <Text style={styles.docSize}>{doc.size}</Text>
                    <Text style={styles.dot}>•</Text>
                    <Text style={styles.docDate}>{doc.date}</Text>
                  </View>
                </View>
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedBadgeText}>🔒 सुरक्षित</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
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
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.header,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.white
  },
  headerSub: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2
  },
  scrollContent: {
    padding: 16
  },
  scannerBox: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderStyle: 'dashed',
    marginBottom: 20
  },
  scannerIcon: {
    fontSize: 36,
    marginBottom: 8
  },
  scannerPromptTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.white
  },
  scannerPromptSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
    marginBottom: 14,
    textAlign: 'center'
  },
  categoryWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'center',
    marginBottom: 16
  },
  catBtn: {
    backgroundColor: colors.cardInner,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border
  },
  catBtnActive: {
    backgroundColor: colors.champagne,
    borderColor: colors.champagneLight
  },
  catBtnText: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '700'
  },
  catBtnTextActive: {
    color: colors.header,
    fontWeight: '800'
  },
  actionBtnRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%'
  },
  cameraBtn: {
    flex: 1,
    backgroundColor: colors.champagne,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center'
  },
  cameraBtnText: {
    color: colors.header,
    fontSize: 12,
    fontWeight: '800'
  },
  pickerBtn: {
    flex: 1,
    backgroundColor: colors.cardInner,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border
  },
  pickerBtnText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700'
  },
  vaultSection: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border
  },
  vaultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14
  },
  vaultTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.white
  },
  vaultBadge: {
    backgroundColor: 'rgba(197, 168, 128, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6
  },
  vaultBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.champagneLight
  },
  docList: {
    gap: 10
  },
  docCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardInner,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border
  },
  docIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  docIconText: {
    fontSize: 16
  },
  docMeta: {
    flex: 1
  },
  docTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2
  },
  docCat: {
    fontSize: 10,
    color: colors.champagneLight
  },
  dot: {
    color: colors.textMuted,
    marginHorizontal: 4,
    fontSize: 10
  },
  docSize: {
    fontSize: 10,
    color: colors.textMuted
  },
  docDate: {
    fontSize: 10,
    color: colors.textMuted
  },
  verifiedBadge: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.12)'
  },
  verifiedBadgeText: {
    fontSize: 9,
    color: colors.emerald,
    fontWeight: '700'
  }
});
