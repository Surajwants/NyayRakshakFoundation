# NRF Saathi — Cross-Platform Mobile App (Android & iOS)

> *"कानून से डरिए मत, कानून आपके साथ है। हर अदालत, हर शहर — आपका अपना वकील आपके साथ।"*

Official React Native (Expo) Mobile Application for the **NyayRakshakFoundation (NRF Legal Platform)** ecosystem, fully integrated with the production backend at `https://nrfsathi.onrender.com`.

---

## 📱 Core Features & User Flows

### 1. Splash & Clean OTP Auth
- **Dual Profile Toggle**: Instant switch between **नागरिक (Citizen/Client)** and **अधिवक्ता (Advocate)**.
- **Indian Mobile (+91) OTP Verification**: Simulated 4-digit code (`4321`) with instant token session.

### 2. Client Dashboard
- **🚨 24x7 Emergency SOS Floating Button**: Wine Red pulsing button for 120-minute SLA dispatch (Anticipatory Bail, Police Harassment, Demolition Stays).
- **⚡ Upcoming Hearing Alert**: Case CNR countdown (e.g. 12 Nov hearing before Civil Judge Senior Division).
- **🏛️ Live e-Court CNR Tracking**: Vertical milestone stepper (`PBJL01-008921-2026`).
- **💰 4-Phase Milestone Escrow Wallet**:
  - Phase 1: Merits Analysis (Paid ✅)
  - Phase 2: Drafting & Packaging (Ready to Review & Release ₹5,500)
  - Phase 3: Court Registration (Escrow Locked 🔒)
  - Phase 4: Final Arguments & Demolition Stay Order.
  - *Trust Motto: "Paise har step par release honge jab vakil step poora karega. No Ghosting, 100% Accountability."*

### 3. Advocate Dashboard
- **🏛️ Daily Court Cause List Manager**: Real-time courtroom, bench, and item number tracking.
- **💼 Virtual Consultation Desk**: Paid client opinion requests (₹999 / 30-min video vetting).
- **💳 Milestone Fees & Withdrawal Desk**: Real-time escrow earnings (₹33,000 balance) with instant UPI / Bank payout and UTR confirmation.
- **📷 Document Scanner & Vault**: Categorized camera scanning (Khatauni, Plaints, Vakalatnama, Court Orders) with AES-256 bit privilege vault.

### 4. Jan-Hit (Public Interest PIL) Feed
- **Crowdfunded PIL Cases**: Gomti River pollution (NGT), Gram Sabha land encroachment, 340 rural MNREGA laborers.
- **Micro-Donations**: 1-click UPI contribution (₹50, ₹100, ₹500, ₹1000) with live target progress meters.

### 5. Real-Time Notifications
- Case hearing date alerts (तारीख अलर्ट), milestone fee approval confirmations, emergency SOS dispatches.

---

## 🚀 Running the Mobile App Locally

### Prerequisites
- Node.js (v18+)
- Expo CLI: `npm install -g expo-cli`
- Physical Android/iOS device with **Expo Go** app installed (from Google Play Store or Apple App Store).

### Step 1: Navigate to Mobile Folder & Install Dependencies
```bash
cd mobile
npm install
```

### Step 2: Start the Expo Development Server
```bash
npx expo start
```

### Step 3: Open on Your Phone
- **Android**: Open the **Expo Go** app and scan the QR code displayed in your terminal.
- **iOS**: Open the Camera app and tap the Expo notification banner.
- **Web Browser**: Press `w` in terminal to run the app directly in your desktop browser.

---

## 📦 Building Native APK / Production Bundles

To generate a standalone `.apk` for Android or `.ipa` for iOS using Expo Application Services (EAS):

```bash
# 1. Install EAS CLI
npm install -g eas-cli

# 2. Login to your Expo account
eas login

# 3. Configure EAS build
eas build:configure

# 4. Build Android APK
eas build -p android --profile preview

# 5. Build iOS App
eas build -p ios --profile preview
```

---

## 🌐 Connected Production Endpoints
The mobile app queries `https://nrfsathi.onrender.com/api` by default:
- `POST /api/auth/send-otp`
- `POST /api/auth/verify-otp`
- `GET /api/client/timeline/:caseId`
- `GET /api/milestones` & `POST /api/milestones/:id/release`
- `GET /api/cause-list`
- `GET /api/pil-causes` & `POST /api/pil-causes/:id/contribute`
- `POST /api/advocate/withdraw`
- `POST /api/emergency`
- `GET /api/notifications`
