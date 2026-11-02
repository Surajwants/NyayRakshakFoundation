# NyayaSetu Mobile App (Android & iOS) — React Native Expo Specification

Is directory me mobile app ka architecture aur API integration blueprint hai, jo ki hamare running backend server (`http://localhost:4000` ya production domain) se directly connect hoga.

---

## 1. Mobile App Screens & User Flows

### Client Flow (Mobile App)
1. **Welcome / KYC Screen**:
   - Mobile OTP / Google Login.
   - Profile select: Citizen (India) ya NRI / Global Client.
2. **Legal Vault (Folder Screen)**:
   - View all folders (`Ancestral Property`, `IEC Clearance`, `Passport Issue`).
   - In-app Voice Recorder (`expo-av`): Ek click me voice record karke upload karein.
   - Camera & Video statement recorder.
   - PDF Document picker (`expo-document-picker`).
3. **Bidding & Legal Advice Stream**:
   - Push notification jab koi Advocate preliminary strategy aur quotation submit kare.
   - Advocate card with Bar Council badge, experience, preliminary advice preview.
4. **Razorpay / Stripe Mobile SDK Integration**:
   - 1-click UPI (GPay, PhonePe, Paytm) ya International Cards (Stripe).
   - Escrow lock & instant unlock of Advocate phone & direct calling.

### Advocate Flow (Mobile App)
1. **Advocate Verification Screen**:
   - Upload Bar Council Enrollment Certificate & ID.
   - Practice areas & Court selection.
2. **Masked Case Radar / Opportunities Feed**:
   - Filter by State (UP, Delhi, Punjab, Maharashtra) or Domain (Revenue, Tehsil, High Court, IEC, Visas).
   - Problem summary & audio brief preview.
   - **Client PII is 100% Redacted** until payment.
3. **Submit Proposal Screen**:
   - Quick Voice Note / Text strategy input.
   - Professional Fee & Timeline.
4. **My Retained Cases & In-App Calling**:
   - Unlocked cases with WhatsApp quick launcher and VoIP calling.
5. **Judgements Portfolio Showcase**:
   - Upload landmark court orders directly from phone.

---

## 2. Recommended Mobile Stack
- **Framework**: React Native + Expo SDK 51+ (Single codebase for Android & iOS)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Audio/Video**: `expo-av`, `expo-camera`, `expo-image-picker`
- **Networking**: Axios / React Query querying backend REST API
- **Payments**: `react-native-razorpay` (India) & `@stripe/stripe-react-native` (NRI/Global)
- **Realtime**: `socket.io-client` for live chat & consultation notifications

---

## 3. Quickstart to launch Mobile App
```bash
# 1. Initialize Expo project
npx create-expo-app NyayaSetuApp --template blank
cd NyayaSetuApp

# 2. Install dependencies
npx expo install expo-av expo-document-picker expo-image-picker nativewind react-native-reanimated

# 3. Configure API URL in config.js
const API_URL = "http://<YOUR_LAN_IP_OR_DOMAIN>:4000/api";
```
