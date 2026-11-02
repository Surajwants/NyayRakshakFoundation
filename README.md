# NyayaSetu (न्यायसेतु) — Integrated Global LegalTech Platform

> **Web & Mobile Integrated Platform for Advocates & Global Citizens (India + NRIs worldwide)**
> Built for Indian Law, Revenue / Tehsil Documentation, Sarkari Vibhag, Passports, Visas, and IEC Registrations.

---

## 🌟 Key Features Implemented

1. **Dual Role Architecture (Client & Advocate)**:
   - **Client Mode**: Global citizens and NRIs can create problem-specific folders, upload audio/video briefs, store legal documents securely, and receive competitive bids.
   - **Advocate Mode**: Licensed lawyers can browse open cases, submit preliminary legal advice + fee quotations, showcase past judgements/orders, and manage retained clients.
2. **The Legal Problem Vault (Folder System)**:
   - Dedicated folder for every legal problem (e.g. Land Encroachment, IEC Code, Passport Impoundment).
   - Multi-format evidence locker: Voice notes (MP3/Audio), Video statements, and PDF documents.
3. **Zero-Knowledge Privacy Shield (Masked Bidding)**:
   - Advocates view the problem brief and audio preview **WITHOUT seeing the client's name, phone, email, or confidential files**.
   - Advocates submit their preliminary legal analysis, strategy, estimated timeline, and fee quote.
4. **Escrow Payment & Contact Unlock Engine**:
   - Client reviews bids and selects an advocate.
   - Upon payment confirmation (Razorpay / Stripe escrow simulation), both parties are **instantly unlocked**:
     - Client sees Advocate's direct phone, Bar Council credentials, and consultation room.
     - Advocate sees Client's unmasked contact, WhatsApp launcher, and full confidential documents.
5. **Advocate Judgements & Precedents Showcase**:
   - Lawyers upload landmark Supreme Court and High Court citations, orders, and case summaries to build credibility and win clients.

---

## 🚀 How to Run the Platform

### 1. Start the Server
```bash
npm start
```
The server will start at: **`http://localhost:4000`**

### 2. Open the Interactive Web Platform
Open your browser and navigate to:
```
http://localhost:4000
```

### 3. Test Personas Included:
- **Vikram Singh (Client - NRI Dubai)**: Handling an ancestral land dispute in Punjab.
- **Sunita Devi (Client - Lucknow)**: Dealing with an IEC import-export license suspension.
- **Adv. Rajeshwar Pandey (Advocate - Supreme Court & High Court)**: 15 years experience in Land & Property.
- **Adv. Meenakshi Sundaram (Advocate - Bombay High Court)**: 10 years experience in Corporate, IEC & Trade.

---

## 📱 Mobile App (React Native Expo)
See the complete mobile app architecture, screens, and API integration guide in [`mobile-app-spec/README.md`](file:///e:/NRF/mobile-app-spec/README.md).
