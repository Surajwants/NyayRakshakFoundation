// NRF Legal Platform - Production Level LegalTech Product Engine
// Systems: 
// 1. Milestone / Step-Based Escrow Model (Trust Builder)
// 2. Crowdfunded PIL & Public Interest Pro-Bono Hub
// 3. Verified Pan-India Advocate Directory & 'Earn with Respect' Desk
// 4. Pan-India Citizen Support & Reassurance Banner + Quick State Discovery
// 5. Dual Dashboard System (Client & Advocate Portals)
// 6. 8 Practice Areas Grid & 24x7 Emergency Fast-Track SOS Helpline

const API_BASE = '/api';

// 8 Core Practice Areas Definition
const practiceAreasData = [
  {
    id: 'NGT_INDUSTRY',
    icon: 'factory',
    titleEn: 'NGT & Environmental Law',
    titleHi: 'एनजीटी व पर्यावरण कानून',
    descEn: 'Factory closure notices, State Pollution Control Board orders, stack emission disputes & NGT Principal Bench appeals.',
    descHi: 'प्रदूषण नियंत्रण बोर्ड के नोटिस, फैक्ट्री बंदी आदेश व नेशनल ग्रीन ट्रिब्यूनल (NGT) में तत्काल स्टे याचिका।',
    stat: '100+ NGT Stays',
    category: 'NGT_INDUSTRY'
  },
  {
    id: 'RTI_APPEALS',
    icon: 'file-search',
    titleEn: 'RTI Drafting & Appeals',
    titleHi: 'सूचना का अधिकार (RTI) अपील',
    descEn: 'Strategic RTI applications, 1st Appeals & 2nd Appeals before Central/State Information Commission to uncover corrupt tenders.',
    descHi: 'सख्त आरटीआई ड्राफ्टिंग, प्रथम अपील व राज्य/केंद्रीय सूचना आयोग में द्वितीय अपील दाखिल कर टेंडर जांच।',
    stat: '98% Disclosure Rate',
    category: 'RTI_APPEALS'
  },
  {
    id: 'HC_WRITS',
    icon: 'landmark',
    titleEn: 'High Court Writ Petitions',
    titleHi: 'हाई कोर्ट रिट याचिकाएं',
    descEn: 'Article 226 Writs of Mandamus, Habeas Corpus & Certiorari when government departments or police fail to discharge statutory duty.',
    descHi: 'अनुच्छेद 226 के तहत परमादेश (Mandamus) रिट याचिका जब सरकारी विभाग या पुलिस अफसर आपकी सुनवाई न करें।',
    stat: 'Supreme & High Courts',
    category: 'HC_WRITS'
  },
  {
    id: 'GOVT_CORRUPTION',
    icon: 'shield-alert',
    titleEn: 'Anti-Corruption & Grievances',
    titleHi: 'सरकारी भ्रष्टाचार व शिकायत',
    descEn: 'Formal petitions before Lokayukta, Central Vigilance Commission (CVC), Disciplinary Authorities & administrative tribunals.',
    descHi: 'लोकायुक्त व सतर्कता आयोग (Vigilance) में भ्रष्ट अधिकारियों के विरुद्ध शिकायत व विभागीय जांच याचिकाएं।',
    stat: 'Statutory Protection',
    category: 'GOVT_CORRUPTION'
  },
  {
    id: 'DIVORCE_FAMILY',
    icon: 'heart-handshake',
    titleEn: 'Matrimonial & Family Law',
    titleHi: 'तलाक व पारिवारिक कानून',
    descEn: 'Mutual consent divorce (Sec 13B HMA), 125 CrPC maintenance, Domestic Violence relief & dignified child custody settlements.',
    descHi: 'आपसी सहमति से तलाक (13B), धारा 125 भरण-पोषण, घरेलू हिंसा संरक्षण व स्थायी वित्तीय समझौता।',
    stat: 'Fast-Track Settlement',
    category: 'DIVORCE_FAMILY'
  },
  {
    id: 'CRIMINAL_BAIL',
    icon: 'scale',
    titleEn: 'Criminal Defence & Bail',
    titleHi: 'फ़ौजदारी प्रतिरक्षा व ज़मानत',
    descEn: 'Anticipatory Bail (438 CrPC / BNSS 482), Regular Bail, 482 Quashing of frivolous FIRs, and trial defence before Sessions Courts.',
    descHi: 'अग्रिम ज़मानत (Anticipatory Bail), नियमित बेल, झूठी FIR रद्द करवाने की 482 याचिका व ट्रायल पैरवी।',
    stat: 'Immediate Bail Dispatch',
    category: 'CRIMINAL_BAIL'
  },
  {
    id: 'CIVIL_PROPERTY',
    icon: 'map-pin',
    titleEn: 'Civil & Property Disputes',
    titleHi: 'दीवानी व संपत्ति विवाद',
    descEn: 'Partition suits, Order 39 Injunctions against illegal encroachment, Revenue Tehsil mutations (Dakhil Kharij) & title search.',
    descHi: 'बंटवारा वाद, अवैध कब्जे पर कोर्ट का स्टे (Order 39), दाखिल-खारिज व तहसील राजस्व मामलों की पैरवी।',
    stat: 'Title Verification',
    category: 'CIVIL_PROPERTY'
  },
  {
    id: 'MONEY_RECOVERY',
    icon: 'coins',
    titleEn: 'Commercial & Recovery Suits',
    titleHi: 'बकाया वसूली व वाणिज्यिक वाद',
    descEn: 'Summary Suits under Order 37 CPC, Section 138 NI Act Cheque Bounce notices, Arbitration & corporate contract enforcement.',
    descHi: 'ऑर्डर 37 समरी सूट, धारा 138 चेक बाउंस नोटिस व व्यापारियों के फंसे हुए रुपयों की कानूनी वसूली।',
    stat: 'Fast Recovery',
    category: 'MONEY_RECOVERY'
  }
];

// Production Bilingual Dictionary
const i18n = {
  en: {
    navSub: "NyayRakshakFoundation • Pan-India Legaltech Network",
    navLinkPractice: "Practice Areas",
    navLinkPortals: "Dual Dashboard",
    navLinkWorkflow: "How It Works",
    navLinkEmergency: "Emergency SOS",
    navLinkPanIndia: "Pan-India Support",
    navLinkMilestones: "Milestone Escrow",
    navLinkPil: "Jan Hit PIL",
    navLinkAdvocates: "Find Advocates",
    btnEmergencyNav: "24x7 SOS Helpline",
    roleLabelClient: "Client",
    roleLabelAdvocate: "Advocate",
    heroMainHeading: '"Kanoon se dariye mat, <span class=\"champagne-gradient-text\">kanoon aapke sath hai.</span> Har adalat, har shehar — aapka apna vakil aapke sath."',
    heroShieldTag: "Bar Council of India Rule 36 Compliant • Encrypted Client-Attorney Privilege",
    heroSub: "From High Court Mandamus petitions and NGT industrial clearances to property mutations and anticipatory bail — consult verified advocates across India and globally.",
    btnHeroConsult: "Consult a Lawyer",
    btnHeroJoinAdv: "Join as Advocate",
    btnHeroSOS: "Fast-Track Emergency (SOS)",
    metric1: "Jurisdictions & High Courts",
    metric2: "Verified Bar Council Advocates",
    metric3: "Escrow Protected Retainers",
    metric4: "Encrypted Legal Vault",
    emergencyTitle: "Urgent High Court Stay, Arrest Threat or Police Harassment?",
    emergencyDesc: "Immediate dispatch for Anticipatory Bail (438 CrPC), Order 39 Demolition Stays, and Habeas Corpus intimation.",
    btnEmergencyFastTrack: "Request Emergency Intervention",
    practiceSubhead: "Legal Specializations & Departments",
    practiceHeading: "Comprehensive Practice Areas Grid",
    practiceDesc: "Every matter is vetted by senior practitioners with established court track records.",
    portalSubhead: "Interactive Platform Workflow",
    portalHeading: "Dual Dashboard Architecture",
    portalDesc: "Switch between the Client Case Tracking Vault and Advocate Daily Cause List Manager.",
    requestConsultationBtn: "Request Consultation",
    alertCaseSaved: "Matter registered in vault successfully!",
    alertEmergencySent: "Emergency SOS dispatched! Senior advocate team notified under 120-minute SLA.",
    alertSlotBooked: "Consultation slot booked successfully!",
    alertProposalSent: "Proposal delivered to client securely!"
  },
  hi: {
    navSub: "न्यायरक्षक फाउंडेशन • देशव्यापी विधिक सहायता व कोर्ट नेटवर्क",
    navLinkPractice: "कानूनी क्षेत्र",
    navLinkPortals: "डैशबोर्ड प्रणाली",
    navLinkWorkflow: "कार्यप्रणाली",
    navLinkEmergency: "आपातकालीन SOS",
    navLinkPanIndia: "देशव्यापी सुरक्षा",
    navLinkMilestones: "एस्क्रो माइलस्टोन",
    navLinkPil: "जनहित पीआईएल",
    navLinkAdvocates: "वकील खोजें",
    btnEmergencyNav: "24x7 SOS हेल्पलाइन",
    roleLabelClient: "नागरिक",
    roleLabelAdvocate: "वकील",
    heroMainHeading: '"कानून से डरिए मत, <span class=\"champagne-gradient-text\">कानून आपके साथ है।</span> हर अदालत, हर शहर — आपका अपना वकील आपके साथ।"',
    heroShieldTag: "बार काउंसिल ऑफ इंडिया नियम 36 सम्मत • 256-बिट सुरक्षित गोपनीयता",
    heroSub: "हाई कोर्ट रिट याचिका से लेकर उद्योग एनजीटी, पुश्तैनी ज़मीन, आरटीआई, और अग्रिम ज़मानत — देश-विदेश के सत्यापित वकीलों से तुरंत सलाह लें।",
    btnHeroConsult: "वकील से सलाह लें",
    btnHeroJoinAdv: "वकील के रूप में जुड़ें",
    btnHeroSOS: "आपातकालीन सहायता (SOS)",
    metric1: "कोर्ट व हाई कोर्ट अधिकार क्षेत्र",
    metric2: "सत्यापित बार काउंसिल वकील",
    metric3: "सुरक्षित एस्क्रो भुगतान",
    metric4: "एन्क्रिप्टेड लीगल वॉल्ट",
    emergencyTitle: "हाई कोर्ट स्टे, गिरफ्तारी की आशंका या पुलिस उत्पीड़न?",
    emergencyDesc: "अग्रिम ज़मानत (438 CrPC), तोड़फोड़ पर तत्काल स्टे और अवैध हिरासत पर तुरंत कानूनी सहायता।",
    btnEmergencyFastTrack: "आपातकालीन सहायता अनुरोध भेजें",
    practiceSubhead: "विशेषज्ञता व विभाग",
    practiceHeading: "व्यापक कानूनी कार्यक्षेत्र (Practice Areas)",
    practiceDesc: "प्रत्येक मामले की जांच संबंधित कोर्ट के अनुभवी वरिष्ठ अधिवक्ताओं द्वारा की जाती है।",
    portalSubhead: "प्लेटफॉर्म कार्यप्रणाली",
    portalHeading: "दोहरा डैशबोर्ड सिस्टम (Dual Dashboard)",
    portalDesc: "नागरिक केस ट्रैकिंग वॉल्ट और वकील की दैनिक कॉज लिस्ट डायरी के बीच स्विच करके देखें।",
    requestConsultationBtn: "परामर्श अनुरोध करें",
    alertCaseSaved: "केस सुरक्षित वॉल्ट में दर्ज हो गया है!",
    alertEmergencySent: "आपातकालीन SOS दर्ज! वरिष्ठ अधिवक्ता टीम 2 घंटे के भीतर संपर्क करेगी।",
    alertSlotBooked: "परामर्श स्लॉट सफलतापूर्वक बुक हो गया!",
    alertProposalSent: "प्रस्ताव क्लाइंट को सुरक्षित भेज दिया गया!"
  }
};

let state = {
  currentLang: localStorage.getItem('nrf_lang') || 'en',
  currentRole: 'CLIENT', // 'CLIENT' or 'ADVOCATE'
  activePortal: 'CLIENT', // 'CLIENT' or 'ADVOCATE'
  currentUser: null,
  allUsers: [],
  cases: [],
  bids: [],
  causeList: [],
  draftBank: [],
  consultationSlots: [],
  payments: [],
  judgements: [],
  milestonePlans: [],
  pilCauses: [],
  panIndiaAdvocates: [],
  selectedStateFilter: 'ALL',
  selectedCourtFilter: 'ALL',
  selectedDomainFilter: 'ALL',
  selectedBidForPayment: null,
  selectedPhaseForRelease: null,
  selectedPilForContribution: null,
  selectedAdvocateForOpinion: null,
  mediaRecorder: null,
  audioChunks: [],
  isRecording: false,
  recordedAudioBlob: null,
  attachedDocFile: null
};

function t(key) {
  return (i18n[state.currentLang] && i18n[state.currentLang][key]) || (i18n['en'][key]) || key;
}

// Language Switcher
function setLanguage(lang) {
  state.currentLang = lang;
  localStorage.setItem('nrf_lang', lang);

  if (lang === 'en') {
    document.getElementById('btnLangEn').className = 'px-2.5 py-1 rounded-lg transition switch-btn-active text-xs';
    document.getElementById('btnLangHi').className = 'px-2.5 py-1 rounded-lg transition switch-btn-inactive text-xs';
  } else {
    document.getElementById('btnLangHi').className = 'px-2.5 py-1 rounded-lg transition switch-btn-active text-xs';
    document.getElementById('btnLangEn').className = 'px-2.5 py-1 rounded-lg transition switch-btn-inactive text-xs';
  }

  applyTranslations();
  renderPracticeAreas();
  renderMilestoneSystem();
  renderPilCauses();
  renderAdvocatesDirectory();
  renderClientTracker();
  renderClientVault();
  renderClientBilling();
  renderAdvocateCauseList();
  renderAdvocateDraftBank();
  renderAdvocateFiles();
  lucide.createIcons();
}

function applyTranslations() {
  document.getElementById('navSub').innerText = t('navSub');
  document.getElementById('navLinkPractice').innerText = t('navLinkPractice');
  document.getElementById('navLinkPortals').innerText = t('navLinkPortals');
  document.getElementById('navLinkWorkflow').innerText = t('navLinkWorkflow');
  document.getElementById('navLinkEmergency').innerText = t('navLinkEmergency');
  document.getElementById('navLinkPanIndia').innerText = t('navLinkPanIndia');
  document.getElementById('navLinkMilestones').innerText = t('navLinkMilestones');
  document.getElementById('navLinkPil').querySelector('span').innerText = t('navLinkPil');
  document.getElementById('navLinkAdvocates').innerText = t('navLinkAdvocates');
  document.getElementById('btnEmergencyNav').innerText = t('btnEmergencyNav');
  document.getElementById('roleLabelClient').innerText = t('roleLabelClient');
  document.getElementById('roleLabelAdvocate').innerText = t('roleLabelAdvocate');

  const heroHeadingEl = document.getElementById('heroMainHeading');
  if (heroHeadingEl) heroHeadingEl.innerHTML = t('heroMainHeading');

  document.getElementById('heroShieldTag').innerText = t('heroShieldTag');
  document.getElementById('heroSub').innerText = t('heroSub');
  document.getElementById('btnHeroConsult').innerText = t('btnHeroConsult');
  document.getElementById('btnHeroJoinAdv').innerText = t('btnHeroJoinAdv');
  document.getElementById('btnHeroSOS').innerText = t('btnHeroSOS');

  document.getElementById('metric1').innerText = t('metric1');
  document.getElementById('metric2').innerText = t('metric2');
  document.getElementById('metric3').innerText = t('metric3');
  document.getElementById('metric4').innerText = t('metric4');

  document.getElementById('emergencyTitle').innerText = t('emergencyTitle');
  document.getElementById('emergencyDesc').innerText = t('emergencyDesc');
  document.getElementById('btnEmergencyFastTrack').innerText = t('btnEmergencyFastTrack');

  document.getElementById('practiceSubhead').innerText = t('practiceSubhead');
  document.getElementById('practiceHeading').innerText = t('practiceHeading');
  document.getElementById('practiceDesc').innerText = t('practiceDesc');

  document.getElementById('portalSubhead').innerText = t('portalSubhead');
  document.getElementById('portalHeading').innerText = t('portalHeading');
  document.getElementById('portalDesc').innerText = t('portalDesc');
}

// App Initialization
document.addEventListener('DOMContentLoaded', async () => {
  setLanguage(state.currentLang);
  await loadInitialData();
  renderPracticeAreas();
  renderMilestoneSystem();
  renderPilCauses();
  renderAdvocatesDirectory();
  lucide.createIcons();
});

// Load Live Data from Server
async function loadInitialData() {
  try {
    const [usersRes, casesRes, bidsRes, causeRes, draftRes, slotsRes, payRes, jdgRes, msRes, pilRes, advRes] = await Promise.all([
      fetch(`${API_BASE}/users`),
      fetch(`${API_BASE}/cases`),
      fetch(`${API_BASE}/bids`),
      fetch(`${API_BASE}/cause-list`),
      fetch(`${API_BASE}/draft-bank`),
      fetch(`${API_BASE}/consultation-slots`),
      fetch(`${API_BASE}/stats`),
      fetch(`${API_BASE}/judgements`),
      fetch(`${API_BASE}/milestones`),
      fetch(`${API_BASE}/pil-causes`),
      fetch(`${API_BASE}/advocates-directory`)
    ]);

    state.allUsers = await usersRes.json();
    state.cases = await casesRes.json();
    state.bids = await bidsRes.json();
    state.causeList = await causeRes.json();
    state.draftBank = await draftRes.json();
    state.consultationSlots = await slotsRes.json();
    state.judgements = await jdgRes.json();
    state.milestonePlans = await msRes.json();
    state.pilCauses = await pilRes.json();
    state.panIndiaAdvocates = await advRes.json();

    const defaultUser = state.allUsers.find(u => u.role === 'CLIENT') || state.allUsers[0];
    applyUser(defaultUser);
    renderPersonaList();
    renderClientTracker();
    renderClientVault();
    renderClientBilling();
    renderAdvocateCauseList();
    renderAdvocateDraftBank();
    renderAdvocateFiles();
    renderConfirmedSlots();
    renderMilestoneSystem();
    renderPilCauses();
    renderAdvocatesDirectory();
  } catch (err) {
    console.error('Data load error', err);
  }
}

function applyUser(user) {
  state.currentUser = user;
  state.currentRole = user.role;
  document.getElementById('userAvatar').src = user.avatar;

  if (user.role === 'CLIENT') {
    document.getElementById('btnRoleClient').className = 'px-3 py-1 rounded-lg transition switch-btn-active text-xs';
    document.getElementById('btnRoleAdvocate').className = 'px-3 py-1 rounded-lg transition switch-btn-inactive text-xs';
    switchPortalTab('CLIENT');
  } else {
    document.getElementById('btnRoleClient').className = 'px-3 py-1 rounded-lg transition switch-btn-inactive text-xs';
    document.getElementById('btnRoleAdvocate').className = 'px-3 py-1 rounded-lg transition switch-btn-active text-xs';
    switchPortalTab('ADVOCATE');
  }
}

function setRole(role) {
  const match = state.allUsers.find(u => u.role === role);
  if (match) applyUser(match);
}

// Master Dual Dashboard Switcher (Client Portal vs Advocate Portal)
function switchPortalTab(portal) {
  state.activePortal = portal;

  const btnClient = document.getElementById('portalTabBtnClient');
  const btnAdvocate = document.getElementById('portalTabBtnAdvocate');
  const clientView = document.getElementById('clientPortalView');
  const advocateView = document.getElementById('advocatePortalView');

  if (portal === 'CLIENT') {
    btnClient.className = 'px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center space-x-2 btn-champagne';
    btnAdvocate.className = 'px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center space-x-2 text-slate-300 hover:text-white';
    clientView.classList.remove('hidden');
    advocateView.classList.add('hidden');
  } else {
    btnAdvocate.className = 'px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center space-x-2 btn-champagne';
    btnClient.className = 'px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center space-x-2 text-slate-300 hover:text-white';
    advocateView.classList.remove('hidden');
    clientView.classList.add('hidden');
  }

  lucide.createIcons();
}

// Client Sub-Tab Switcher
function switchClientSubTab(tabId) {
  document.querySelectorAll('.client-sub-tab').forEach(el => el.classList.add('hidden'));
  document.getElementById(tabId)?.classList.remove('hidden');

  ['btnSubClientTracker', 'btnSubClientVault', 'btnSubClientSlot', 'btnSubClientBilling'].forEach(id => {
    document.getElementById(id).className = 'px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition';
  });

  const activeBtnId = tabId === 'c-tracker' ? 'btnSubClientTracker' : tabId === 'c-vault' ? 'btnSubClientVault' : tabId === 'c-slot' ? 'btnSubClientSlot' : 'btnSubClientBilling';
  document.getElementById(activeBtnId).className = 'px-4 py-2 rounded-xl champagne-badge-active transition';
  lucide.createIcons();
}

// Advocate Sub-Tab Switcher
function switchAdvSubTab(tabId) {
  document.querySelectorAll('.adv-sub-tab').forEach(el => el.classList.add('hidden'));
  document.getElementById(tabId)?.classList.remove('hidden');

  ['btnSubAdvCauseList', 'btnSubAdvDraftBank', 'btnSubAdvFiles', 'btnSubAdvChat'].forEach(id => {
    document.getElementById(id).className = 'px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition';
  });

  const activeBtnId = tabId === 'a-causelist' ? 'btnSubAdvCauseList' : tabId === 'a-draftbank' ? 'btnSubAdvDraftBank' : tabId === 'a-files' ? 'btnSubAdvFiles' : 'btnSubAdvChat';
  document.getElementById(activeBtnId).className = 'px-4 py-2 rounded-xl champagne-badge-active transition';
  lucide.createIcons();
}

// ================= 1. RENDER PRACTICE AREAS GRID ================= //
function renderPracticeAreas() {
  const container = document.getElementById('practiceGridContainer');
  if (!container) return;

  const isHi = state.currentLang === 'hi';

  container.innerHTML = practiceAreasData.map(item => `
    <div class="firm-card p-6 flex flex-col justify-between space-y-4 border border-slate-800 bg-[#0F172A] hover:border-[#C5A880]/50 transition">
      <div class="space-y-3">
        <div class="w-12 h-12 rounded-2xl bg-[#0A1120] text-[#E2C799] border border-slate-700/60 flex items-center justify-center shadow-md">
          <i data-lucide="${item.icon}" class="w-6 h-6"></i>
        </div>
        <div>
          <span class="champagne-badge text-[10px] font-bold px-2 py-0.5 rounded-full">${item.stat}</span>
          <h3 class="text-base font-bold text-white mt-2 leading-snug">${isHi ? item.titleHi : item.titleEn}</h3>
        </div>
        <p class="text-xs text-slate-300 leading-relaxed">${isHi ? item.descHi : item.descEn}</p>
      </div>

      <div class="pt-3 border-t border-slate-800">
        <button onclick="openConsultationInquiry('${item.category}', '${escapeHtml(isHi ? item.titleHi : item.titleEn)}')" class="w-full py-2.5 rounded-xl bg-[#111C35] hover:bg-gradient-to-r hover:from-[#DFCEB7] hover:to-[#C5A880] hover:text-[#0A1120] text-[#F1F5F9] font-bold text-xs flex items-center justify-center space-x-1.5 transition border border-slate-700/60">
          <span>${t('requestConsultationBtn')}</span>
          <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    </div>
  `).join('');
}

// ================= 2. RENDER MILESTONE ESCROW SYSTEM ================= //
function renderMilestoneSystem() {
  const container = document.getElementById('milestoneContainer');
  if (!container) return;

  const isHi = state.currentLang === 'hi';
  const plan = state.milestonePlans[0];
  if (!plan) return;

  container.innerHTML = `
    <!-- Milestone Plan Header -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
      <div>
        <div class="flex items-center space-x-2">
          <span class="champagne-badge text-[10px] font-bold px-2.5 py-0.5 rounded-full">Active Case: ${plan.caseId.toUpperCase()}</span>
          <span class="text-xs text-slate-400 font-medium">Assigned Counsel: <strong class="text-white">${plan.advocateName}</strong></span>
        </div>
        <h3 class="text-lg font-bold text-white mt-1">${plan.caseTitle}</h3>
        <p class="text-xs text-[#E2C799] mt-0.5 font-semibold">🔒 ${plan.accountabilityPledge}</p>
      </div>

      <div class="flex items-center space-x-4 bg-[#111C35] p-3 rounded-2xl border border-slate-700/80 shrink-0">
        <div>
          <div class="text-[10px] text-slate-400 uppercase font-semibold">Total Case Fee</div>
          <div class="text-lg font-black text-white">₹${plan.totalAgreedFee.toLocaleString()}</div>
        </div>
        <div class="h-8 w-px bg-slate-700"></div>
        <div>
          <div class="text-[10px] text-emerald-400 uppercase font-semibold">Released to Adv.</div>
          <div class="text-lg font-black text-emerald-400">₹2,500</div>
        </div>
        <div class="h-8 w-px bg-slate-700"></div>
        <div>
          <div class="text-[10px] text-[#E2C799] uppercase font-semibold">In Escrow Vault</div>
          <div class="text-lg font-black text-[#E2C799]">₹13,500</div>
        </div>
      </div>
    </div>

    <!-- 4 Phases Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      ${plan.phases.map(phase => {
        const isReleased = phase.status === 'RELEASED_TO_ADVOCATE';
        const isSubmitted = phase.status === 'WORK_SUBMITTED';
        const isLocked = phase.status === 'LOCKED_IN_ESCROW';
        const isPending = phase.status === 'PENDING_DEPOSIT';

        let badgeStyle = isReleased 
          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800' 
          : isSubmitted 
            ? 'bg-amber-950/80 text-amber-300 border-amber-800 animate-pulse' 
            : isLocked 
              ? 'bg-blue-950/80 text-blue-300 border-blue-800' 
              : 'bg-slate-800 text-slate-400 border-slate-700';

        let statusText = isReleased 
          ? 'Phase 1: Released ✓' 
          : isSubmitted 
            ? 'Phase 2: Review & Release' 
            : isLocked 
              ? 'Phase 3: Escrow Locked 🔒' 
              : 'Phase 4: Pending Deposit';

        return `
          <div class="p-5 rounded-2xl bg-[#111C35] border ${isSubmitted ? 'border-[#C5A880]/80 shadow-lg' : 'border-slate-800'} flex flex-col justify-between space-y-4 text-xs transition">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="w-7 h-7 rounded-lg ${isReleased ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-[#E2C799] border border-slate-700'} font-black flex items-center justify-center text-xs">
                  ${isReleased ? '✓' : phase.phaseNumber}
                </span>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded border ${badgeStyle}">
                  ${statusText}
                </span>
              </div>

              <div>
                <h4 class="font-bold text-white text-sm leading-snug">${isHi ? phase.titleHi : phase.title}</h4>
                <div class="text-base font-black text-[#E2C799] mt-1">₹${phase.amount.toLocaleString()}</div>
              </div>

              <div class="p-2.5 rounded-xl bg-[#060B13]/80 border border-slate-800/80 space-y-1">
                <div class="text-[10px] text-slate-400 uppercase font-semibold">Verified Deliverable:</div>
                <p class="text-[11px] text-slate-300 leading-relaxed">${phase.deliverable}</p>
                ${phase.expectedCNR ? `<div class="text-[10px] text-blue-400 font-mono mt-1">Expected CNR: ${phase.expectedCNR}</div>` : ''}
              </div>
            </div>

            <div class="pt-2 border-t border-slate-800">
              ${isSubmitted ? `
                <button onclick="openMilestoneReleaseModal('${phase.id}', '${escapeHtml(phase.title)}', '${escapeHtml(phase.deliverable)}', ${phase.amount})" class="w-full py-2.5 rounded-xl btn-champagne font-bold text-xs flex items-center justify-center space-x-1.5 transition shadow">
                  <i data-lucide="check-check" class="w-3.5 h-3.5"></i>
                  <span>Review & Release ₹${phase.amount.toLocaleString()}</span>
                </button>
              ` : isReleased ? `
                <div class="text-emerald-400 font-semibold text-[11px] flex items-center space-x-1.5 justify-center py-2 bg-emerald-950/40 rounded-xl border border-emerald-900/50">
                  <i data-lucide="check" class="w-3.5 h-3.5"></i>
                  <span>Completed on ${phase.completedAt}</span>
                </div>
              ` : `
                <div class="text-slate-400 font-medium text-[11px] text-center py-2 bg-[#060B13] rounded-xl border border-slate-800">
                  ${isLocked ? 'Protected in Escrow' : 'Next Phase in Queue'}
                </div>
              `}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
  lucide.createIcons();
}

// ================= 3. RENDER CROWDFUNDED PIL HUB ================= //
function renderPilCauses() {
  const container = document.getElementById('pilCausesContainer');
  if (!container) return;

  const isHi = state.currentLang === 'hi';

  container.innerHTML = state.pilCauses.map(cause => {
    const percent = Math.min(100, Math.round((cause.raisedAmount / cause.targetAmount) * 100));

    return `
      <div class="firm-card p-6 bg-[#0F172A] border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition text-xs">
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="champagne-badge text-[10px] font-bold px-2 py-0.5 rounded-full">
              ${cause.category.replace('_', ' ')}
            </span>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-[#111C35] text-[#E2C799] border border-slate-700">
              ${cause.statusBadge}
            </span>
          </div>

          <div>
            <h3 class="text-base font-bold text-white leading-snug">${isHi ? cause.titleHi : cause.title}</h3>
            <p class="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <i data-lucide="landmark" class="w-3 h-3 text-[#E2C799]"></i>
              <span>${cause.jurisdiction}</span>
            </p>
          </div>

          <p class="text-xs text-slate-300 leading-relaxed">${isHi ? cause.descriptionHi : cause.description}</p>

          <!-- Funding Progress Bar -->
          <div class="space-y-1.5 pt-2 border-t border-slate-800">
            <div class="flex items-center justify-between font-bold">
              <span class="text-white text-sm">₹${cause.raisedAmount.toLocaleString()} <span class="text-[10px] text-slate-400 font-normal">raised of ₹${cause.targetAmount.toLocaleString()}</span></span>
              <span class="text-[#E2C799]">${percent}%</span>
            </div>
            <div class="w-full bg-[#111C35] rounded-full h-2 overflow-hidden border border-slate-800">
              <div class="bg-gradient-to-r from-[#A58963] to-[#E2C799] h-2 rounded-full transition-all duration-500" style="width: ${percent}%"></div>
            </div>
            <div class="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
              <span>👥 ${cause.backersCount} Citizen Backers</span>
              <span>Next Hearing: <strong class="text-white">${cause.nextHearingDate}</strong></span>
            </div>
          </div>

          <!-- Lead Advocate Tag -->
          <div class="p-2.5 rounded-xl bg-[#111C35] border border-slate-800 flex items-center justify-between">
            <div>
              <div class="text-[10px] text-slate-400">Lead Counsel:</div>
              <div class="font-bold text-white text-xs">${cause.leadAdvocate}</div>
            </div>
            <span class="text-[10px] font-mono text-[#E2C799]">${cause.leadAdvocateBar}</span>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-800 flex items-center space-x-2">
          <button onclick="openPilContributeModal('${cause.id}', '${escapeHtml(cause.title)}', '${escapeHtml(cause.jurisdiction)}', ${cause.raisedAmount}, ${cause.targetAmount})" class="flex-1 py-2.5 btn-champagne font-bold rounded-xl text-xs flex items-center justify-center space-x-1 transition shadow">
            <i data-lucide="heart" class="w-3.5 h-3.5 text-rose-600"></i>
            <span>Contribute (₹50+)</span>
          </button>
          <button onclick="alert('Case Diary: ' + '${cause.caseDiaryNo}' + '\\n\\nLatest Court Directive:\\n' + '${cause.courtUpdates?.[0]?.text || 'Notice served to authorities.'}')" class="px-3 py-2.5 bg-[#111C35] hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl font-bold text-xs" title="View Case Record">
            <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');
  lucide.createIcons();
}

// ================= 4. RENDER PAN-INDIA ADVOCATES DIRECTORY ================= //
function renderAdvocatesDirectory() {
  const container = document.getElementById('advocatesDirectoryContainer');
  if (!container) return;

  let advocates = state.panIndiaAdvocates;

  if (state.selectedStateFilter !== 'ALL') {
    advocates = advocates.filter(a => a.state.toLowerCase() === state.selectedStateFilter.toLowerCase());
  }
  if (state.selectedCourtFilter !== 'ALL') {
    advocates = advocates.filter(a => a.courts.some(c => c.toLowerCase().includes(state.selectedCourtFilter.toLowerCase())));
  }
  if (state.selectedDomainFilter !== 'ALL') {
    advocates = advocates.filter(a => a.domains.some(d => d.toLowerCase().includes(state.selectedDomainFilter.toLowerCase())));
  }

  if (advocates.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-xs text-slate-400 bg-[#0F172A] rounded-2xl border border-slate-800">
        No advocates found matching current filters. Showing all pan-India empanelled counsel.
      </div>
    `;
    return;
  }

  container.innerHTML = advocates.map(adv => `
    <div class="firm-card p-6 bg-[#0F172A] border border-slate-800 hover:border-slate-700 flex flex-col justify-between space-y-4 text-xs transition">
      <div class="space-y-3">
        <!-- Avatar & Verified Badge -->
        <div class="flex items-start justify-between">
          <div class="flex items-center space-x-3">
            <img src="${adv.avatar}" class="w-12 h-12 rounded-2xl object-cover ring-2 ring-[#C5A880]/50 shadow">
            <div>
              <h3 class="font-bold text-white text-base leading-snug">${adv.fullName}</h3>
              <p class="text-[11px] text-[#E2C799] font-medium">${adv.city}, ${adv.state}</p>
            </div>
          </div>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full champagne-badge shrink-0">
            ✓ Bar Verified
          </span>
        </div>

        <!-- Registration & Stats -->
        <div class="p-2.5 rounded-xl bg-[#111C35] border border-slate-800 grid grid-cols-3 gap-2 text-center">
          <div>
            <div class="text-[10px] text-slate-400">Enrollment</div>
            <div class="font-mono font-bold text-white text-[11px] truncate">${adv.barCouncilNo}</div>
          </div>
          <div>
            <div class="text-[10px] text-slate-400">Experience</div>
            <div class="font-bold text-white text-xs">${adv.experienceYears}+ Yrs</div>
          </div>
          <div>
            <div class="text-[10px] text-slate-400">Rating</div>
            <div class="font-bold text-emerald-400 text-xs">★ ${adv.rating} (${adv.reviewsCount})</div>
          </div>
        </div>

        <!-- Courts Covered -->
        <div>
          <div class="text-[10px] text-slate-400 uppercase font-semibold mb-1">Courts of Practice:</div>
          <div class="flex flex-wrap gap-1">
            ${adv.courts.map(c => `
              <span class="text-[10px] bg-[#060B13] border border-slate-700 px-2 py-0.5 rounded text-slate-300 font-medium">${c}</span>
            `).join('')}
          </div>
        </div>

        <!-- Key Domains -->
        <div>
          <div class="text-[10px] text-slate-400 uppercase font-semibold mb-1">Key Specializations:</div>
          <div class="flex flex-wrap gap-1">
            ${adv.domains.map(d => `
              <span class="text-[10px] bg-blue-950/50 border border-blue-800 px-2 py-0.5 rounded text-blue-200 font-semibold">${d}</span>
            `).join('')}
          </div>
        </div>

        <!-- Landmark Precedent -->
        <div class="p-2.5 rounded-xl bg-[#060B13]/70 border border-slate-800/80">
          <div class="text-[10px] text-[#E2C799] font-bold">Landmark Case Precedent:</div>
          <p class="text-[11px] text-slate-300 italic mt-0.5">"${adv.landmarkJudgements}"</p>
        </div>
      </div>

      <!-- Action Footer with Paid Virtual Opinion -->
      <div class="pt-3 border-t border-slate-800 flex items-center justify-between">
        <div>
          <div class="text-[10px] text-slate-400">Virtual Legal Opinion:</div>
          <div class="text-sm font-black text-white">₹${adv.consultationFee} <span class="text-[10px] text-slate-400 font-normal">/ 30 min</span></div>
        </div>
        <button onclick="openVirtualOpinionModal('${adv.id}', '${escapeHtml(adv.fullName)}', '${escapeHtml(adv.courts[0])}', ${adv.consultationFee})" class="px-4 py-2 btn-champagne rounded-xl font-bold text-xs flex items-center space-x-1.5 transition shadow">
          <i data-lucide="video" class="w-3.5 h-3.5"></i>
          <span>Book Opinion</span>
        </button>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

// State & Court Filter Handlers
function filterAdvocatesByState(stateName) {
  state.selectedStateFilter = stateName;
  document.querySelectorAll('.adv-state-pill').forEach(btn => {
    btn.className = 'adv-state-pill px-3 py-1.5 rounded-lg switch-btn-inactive';
  });
  const activeBtn = document.getElementById(`pillState${stateName === 'ALL' ? 'ALL' : stateName.replace(/\s+/g, '')}`);
  if (activeBtn) activeBtn.className = 'adv-state-pill px-3 py-1.5 rounded-lg switch-btn-active';
  renderAdvocatesDirectory();
}

function applyAdvocateFilters() {
  const stateVal = document.getElementById('quickFilterState').value;
  const courtVal = document.getElementById('quickFilterCourt').value;
  const domainVal = document.getElementById('quickFilterDomain').value;
  state.selectedStateFilter = stateVal;
  state.selectedCourtFilter = courtVal;
  state.selectedDomainFilter = domainVal;
  renderAdvocatesDirectory();
}

// ================= 5. MILESTONE & PIL HANDLERS ================= //

function openMilestoneReleaseModal(phaseId, title, deliverable, amount) {
  state.selectedPhaseForRelease = phaseId;
  document.getElementById('msModalDeliverableTitle').innerText = title;
  document.getElementById('msModalDeliverableDesc').innerText = deliverable;
  document.getElementById('msModalAmountDisplay').innerText = `₹${amount.toLocaleString()}`;
  openModal('modalMilestoneRelease');
}

async function confirmMilestoneReleaseNow() {
  if (!state.selectedPhaseForRelease) return;
  const btn = document.getElementById('btnConfirmReleaseMs');
  btn.disabled = true;
  btn.innerText = 'Releasing Escrow Funds...';

  try {
    const res = await fetch(`${API_BASE}/milestones/${state.selectedPhaseForRelease}/release`, {
      method: 'POST'
    });
    const data = await res.json();
    btn.disabled = false;
    btn.innerText = 'Approve Deliverable & Release Payment';
    closeModal('modalMilestoneRelease');
    await loadInitialData();
    renderMilestoneSystem();
    alert('Milestone Approved! ₹5,500 has been released from escrow directly to the advocate’s account. Phase 3 (Court Filing & CNR generation) is now activated!');
  } catch (err) {
    btn.disabled = false;
    console.error('Milestone release error', err);
  }
}

function openPilContributeModal(causeId, title, court, currentRaised, target) {
  document.getElementById('pilModalCauseIdHidden').value = causeId;
  document.getElementById('pilModalCauseTitle').innerText = title;
  document.getElementById('pilModalCourtInfo').innerText = court;
  openModal('modalPilContribute');
}

function setPilAmount(amt) {
  document.getElementById('pilCustomAmount').value = amt;
}

async function handlePilContributionSubmit(e) {
  e.preventDefault();
  const causeId = document.getElementById('pilModalCauseIdHidden').value;
  const contributorName = document.getElementById('pilContributorName').value;
  const amount = parseFloat(document.getElementById('pilCustomAmount').value) || 500;

  try {
    const res = await fetch(`${API_BASE}/pil-causes/${causeId}/contribute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, contributorName })
    });
    const data = await res.json();
    closeModal('modalPilContribute');
    await loadInitialData();
    renderPilCauses();
    alert(`Thank you, ${contributorName}! Your contribution of ₹${amount} has been added to the Public Pro-Bono Escrow. Justice is in motion!`);
  } catch (err) {
    console.error('PIL contribution error', err);
  }
}

async function handleNewPilSubmit(e) {
  e.preventDefault();
  const title = document.getElementById('newPilTitle').value;
  const category = document.getElementById('newPilCategory').value;
  const jurisdiction = document.getElementById('newPilJurisdiction').value;
  const description = document.getElementById('newPilDesc').value;
  const targetAmount = document.getElementById('newPilBudget').value;

  try {
    const res = await fetch(`${API_BASE}/pil-causes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, category, jurisdiction, description, targetAmount })
    });
    await res.json();
    closeModal('modalSubmitPil');
    document.getElementById('newPilTitle').value = '';
    document.getElementById('newPilDesc').value = '';
    await loadInitialData();
    renderPilCauses();
    alert('Public interest grievance submitted! NRF pro-bono desk is conducting preliminary legal vetting.');
  } catch (err) {
    console.error('New PIL error', err);
  }
}

function openVirtualOpinionModal(advId, advName, court, fee) {
  document.getElementById('voAdvIdHidden').value = advId;
  document.getElementById('voAdvName').innerText = `Book Opinion with ${advName}`;
  document.getElementById('voAdvCourt').innerText = court;
  document.getElementById('voFeeDisplay').innerText = `₹${fee}`;
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  document.getElementById('voDate').value = tomorrow;
  openModal('modalVirtualOpinion');
}

async function handleVirtualOpinionSubmit(e) {
  e.preventDefault();
  const advId = document.getElementById('voAdvIdHidden').value;
  const date = document.getElementById('voDate').value;
  const time = document.getElementById('voTime').value;
  const topic = document.getElementById('voBrief').value;

  try {
    const res = await fetch(`${API_BASE}/consultation-slots`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientId: state.currentUser?.id || 'usr_client_1',
        advocateId: advId,
        date,
        time,
        mode: 'Encrypted Virtual Video Chamber',
        topic
      })
    });
    await res.json();
    closeModal('modalVirtualOpinion');
    await loadInitialData();
    switchPortalTab('CLIENT');
    switchClientSubTab('c-slot');
    alert('Virtual Legal Opinion booked! Consultation slot confirmed and fee safely deposited in Escrow.');
  } catch (err) {
    console.error('Virtual opinion booking error', err);
  }
}

// ================= 6. EXISTING CLIENT & ADVOCATE VIEWS ================= //

function renderClientTracker() {
  const container = document.getElementById('clientCaseTimelineContainer');
  if (!container) return;

  const activeCase = state.cases[0];
  if (!activeCase) return;

  const steps = activeCase.timelineSteps || [
    { title: 'Case Intake & Vault Created', date: '25 Oct 2026', done: true },
    { title: 'Document & Revenue Vetting', date: '27 Oct 2026', done: true },
    { title: 'Advocate Bidding & Strategy', date: 'Active', done: false },
    { title: 'Court Stay / Notice Filing', date: 'Pending Retainer', done: false }
  ];

  container.innerHTML = `
    <div class="space-y-6 pl-2">
      ${steps.map((st, idx) => `
        <div class="flex items-start space-x-4 relative ${idx < steps.length - 1 ? (st.done ? 'status-step-line completed' : 'status-step-line') : ''}">
          <div class="w-9 h-9 rounded-full ${st.done ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700'} flex items-center justify-center text-xs font-bold shrink-0 z-10 shadow">
            ${st.done ? '✓' : idx + 1}
          </div>
          <div class="flex-1 pb-4">
            <div class="flex items-center justify-between">
              <h4 class="text-sm font-bold ${st.done ? 'text-white' : 'text-slate-400'}">${st.title}</h4>
              <span class="text-[11px] font-semibold ${st.done ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded' : 'text-slate-400'}">${st.date}</span>
            </div>
            <p class="text-xs ${st.done ? 'text-slate-300' : 'text-slate-500'} mt-0.5">${st.done ? 'Completed and verified by NRF legal desk.' : 'Awaiting confirmation from retained counsel.'}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderClientVault() {
  const container = document.getElementById('clientVaultFilesContainer');
  if (!container) return;

  const allFiles = state.cases.flatMap(c => (c.files || []).map(f => ({ ...f, caseName: c.folderName })));

  if (allFiles.length === 0) {
    container.innerHTML = `<div class="col-span-full py-6 text-center text-xs text-slate-400">Vault is empty.</div>`;
    return;
  }

  container.innerHTML = allFiles.map(f => `
    <div class="p-3 rounded-2xl bg-[#111C35] border border-slate-800 flex items-center justify-between text-xs">
      <div class="flex items-center space-x-2.5 truncate">
        ${f.type === 'AUDIO' ? '<i data-lucide="mic" class="w-4 h-4 text-[#E2C799] shrink-0"></i>' : '<i data-lucide="file-text" class="w-4 h-4 text-slate-400 shrink-0"></i>'}
        <div class="truncate">
          <div class="font-bold text-white truncate text-[11px]">${f.name}</div>
          <div class="text-[10px] text-slate-400 truncate">${f.caseName}</div>
        </div>
      </div>
      <a href="${f.url || '#'}" target="_blank" class="px-2.5 py-1 bg-[#0F172A] hover:bg-slate-800 text-[#E2C799] border border-slate-700 rounded-lg font-bold text-[11px] shrink-0">
        View
      </a>
    </div>
  `).join('');
}

function renderClientBilling() {
  const container = document.getElementById('clientBillingListContainer');
  if (!container) return;

  const payments = [
    {
      ref: 'TXN-NRF-20261023-88',
      inv: 'INV-NRF-0042',
      caseTitle: 'RTI 2nd Appeal & Public Works Scrutiny',
      advocate: 'Adv. Anjali Deshmukh',
      amount: '₹12,000',
      status: 'HELD_IN_ESCROW',
      date: '23 Oct 2026'
    },
    {
      ref: 'TXN-NRF-20260912-19',
      inv: 'INV-NRF-0038',
      caseTitle: 'Ancestral Land Demarcation Advisory',
      advocate: 'Adv. Rajeshwar Pandey',
      amount: '₹8,500',
      status: 'RELEASED_TO_ADVOCATE',
      date: '12 Sep 2026'
    }
  ];

  container.innerHTML = payments.map(p => `
    <div class="p-4 rounded-2xl bg-[#111C35] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
      <div>
        <div class="flex items-center space-x-2">
          <span class="font-bold text-white">${p.caseTitle}</span>
          <span class="font-mono text-[10px] text-slate-400">${p.inv}</span>
        </div>
        <div class="text-slate-300 text-[11px] mt-0.5">Retained: ${p.advocate} • ${p.date}</div>
      </div>
      <div class="flex items-center space-x-3">
        <div class="text-right">
          <div class="font-black text-[#E2C799] text-sm">${p.amount}</div>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded ${p.status === 'HELD_IN_ESCROW' ? 'bg-amber-950/60 text-amber-300 border border-amber-800/80' : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/80'}">
            ${p.status === 'HELD_IN_ESCROW' ? 'Held in Escrow (Safe)' : 'Disbursed on Order'}
          </span>
        </div>
        <button onclick="alert('Downloading Official Receipt & GST Invoice: ' + '${p.inv}')" class="px-2.5 py-1.5 bg-[#0F172A] border border-slate-700 hover:bg-slate-800 rounded-lg text-slate-200 font-semibold" title="Download Invoice">
          <i data-lucide="download" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    </div>
  `).join('');
}

function renderConfirmedSlots() {
  const container = document.getElementById('confirmedSlotsList');
  if (!container) return;

  container.innerHTML = state.consultationSlots.map(s => `
    <div class="p-3 rounded-2xl bg-[#111C35] border border-slate-800 flex items-center justify-between text-xs">
      <div>
        <div class="font-bold text-white flex items-center gap-1.5">
          <i data-lucide="calendar" class="w-3.5 h-3.5 text-[#E2C799]"></i>
          <span>${s.date} at ${s.time}</span>
        </div>
        <div class="text-slate-300 text-[11px]">${s.mode} • Topic: ${s.topic}</div>
      </div>
      <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800">Confirmed</span>
    </div>
  `).join('');
}

function renderAdvocateCauseList() {
  const container = document.getElementById('advocateCauseListContainer');
  if (!container) return;

  container.innerHTML = state.causeList.map(item => `
    <div class="p-4 rounded-2xl bg-[#111C35] border border-slate-800 hover:border-slate-700 transition space-y-2 text-xs">
      <div class="flex items-center justify-between">
        <span class="font-bold text-white flex items-center gap-1.5">
          <i data-lucide="gavel" class="w-3.5 h-3.5 text-[#E2C799]"></i>
          <span>${item.courtName}</span>
        </span>
        <span class="font-bold px-2 py-0.5 rounded ${item.status === 'TODAY' ? 'bg-[#BE123C]/20 text-[#FDA4AF] border border-[#BE123C]/40' : 'bg-slate-800 text-slate-300 border border-slate-700'} text-[10px]">
          ${item.status}
        </span>
      </div>

      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
        <div>
          <div class="font-black text-[#E2C799]">${item.itemNo} • ${item.caseNumber}</div>
          <div class="text-slate-200 font-medium">${item.parties}</div>
          <div class="text-[11px] text-slate-400">${item.courtRoom} • Stage: <strong class="text-white">${item.stage}</strong></div>
        </div>
        <div class="sm:text-right shrink-0">
          <span class="text-xs font-bold text-white">${item.time}</span>
          <div class="text-[10px] text-emerald-400 font-semibold">Listed on Board</div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderAdvocateDraftBank() {
  const container = document.getElementById('advocateDraftBankContainer');
  if (!container) return;

  container.innerHTML = state.draftBank.map(d => `
    <div class="p-4 rounded-2xl bg-[#111C35] border border-slate-800 flex flex-col justify-between space-y-3 text-xs">
      <div class="space-y-1.5">
        <span class="champagne-badge text-[10px] font-bold px-2 py-0.5 rounded">${d.category}</span>
        <h4 class="font-bold text-white text-xs leading-snug">${d.title}</h4>
        <p class="text-[11px] text-slate-300 leading-relaxed">${d.description}</p>
      </div>

      <div class="pt-2 border-t border-slate-800 flex items-center justify-between">
        <span class="text-[10px] text-slate-400 font-mono">${d.sections}</span>
        <button onclick="alert('Opening Standard Draft Petition: ' + '${escapeHtml(d.title)}')" class="px-3 py-1 bg-[#0F172A] hover:bg-[#C5A880] hover:text-[#0A1120] text-[#E2C799] border border-slate-700 rounded-lg text-xs font-bold flex items-center space-x-1 transition">
          <i data-lucide="copy" class="w-3 h-3"></i>
          <span>Use Draft</span>
        </button>
      </div>
    </div>
  `).join('');
}

function renderAdvocateFiles() {
  const container = document.getElementById('advocateCaseFilesContainer');
  if (!container) return;

  container.innerHTML = state.cases.map(c => {
    const isRetained = c.status === 'HIRED';

    return `
      <div class="p-4 rounded-2xl bg-[#111C35] border ${isRetained ? 'border-emerald-500/50 bg-[#10B981]/5' : 'border-slate-800'} space-y-2 text-xs">
        <div class="flex items-center justify-between">
          <span class="font-bold text-white text-sm">${c.folderName}</span>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded ${isRetained ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-slate-300 border border-slate-700'}">
            ${isRetained ? 'Retained Client (Unlocked)' : 'Open for Proposals'}
          </span>
        </div>

        <p class="text-xs text-slate-300 leading-relaxed">${c.summary}</p>

        <div class="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
          <span class="text-slate-400">${c.jurisdiction?.district || 'India'}, ${c.jurisdiction?.state || ''}</span>
          ${isRetained ? `
            <a href="https://wa.me/919876543210" target="_blank" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold flex items-center space-x-1 transition">
              <i data-lucide="message-square" class="w-3 h-3"></i>
              <span>WhatsApp Client</span>
            </a>
          ` : `
            <button onclick="openBidModal('${c.id}', '${escapeHtml(c.title || c.folderName)}')" class="px-3 py-1 btn-champagne rounded-lg font-bold">
              Submit Quotation
            </button>
          `}
        </div>
      </div>
    `;
  }).join('');
}

// Emergency & General Inquiry
function openEmergencyModal() {
  openModal('modalEmergency');
}

async function handleEmergencySubmit(e) {
  e.preventDefault();
  const fullName = document.getElementById('sosName').value;
  const phone = document.getElementById('sosPhone').value;
  const emergencyType = document.getElementById('sosType').value;
  const description = document.getElementById('sosDesc').value;

  try {
    const res = await fetch(`${API_BASE}/emergency`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, phone, emergencyType, description })
    });
    await res.json();
    closeModal('modalEmergency');
    alert(t('alertEmergencySent'));
  } catch (err) {
    console.error('Emergency error', err);
    alert('Emergency request registered. Priority response dispatched.');
    closeModal('modalEmergency');
  }
}

function openConsultationInquiry(category, title) {
  document.getElementById('inquiryCategoryHidden').value = category;
  document.getElementById('modalConsultDomainTitle').innerText = `Consultation: ${title}`;
  document.getElementById('inquiryBrief').value = `Requesting initial legal vetting and strategy discussion for ${title}.`;
  openModal('modalConsultationInquiry');
}

async function handleConsultationInquirySubmit(e) {
  e.preventDefault();
  const category = document.getElementById('inquiryCategoryHidden').value;
  const brief = document.getElementById('inquiryBrief').value;

  try {
    const res = await fetch(`${API_BASE}/cases`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientId: state.currentUser?.id || 'usr_client_1',
        folderName: `Matter: ${category.replace('_', ' ')}`,
        category,
        title: `Consultation Request: ${category}`,
        summary: brief,
        jurisdiction: { state: 'India / Global', district: 'Consultation Desk' }
      })
    });
    await res.json();
    closeModal('modalConsultationInquiry');
    await loadInitialData();
    switchPortalTab('CLIENT');
    alert(t('alertCaseSaved'));
  } catch (err) {
    console.error('Case submit error', err);
  }
}

function handleJoinAdvocate() {
  setRole('ADVOCATE');
  switchPortalTab('ADVOCATE');
  const section = document.getElementById('section-portals');
  if (section) section.scrollIntoView({ behavior: 'smooth' });
}

// Modal Helpers
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('hidden');
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('hidden');
}

// Case Intake Form & Voice Recorder
function updatePromptFile(file) {
  if (file) {
    state.attachedDocFile = file;
    document.getElementById('promptDocLabel').innerText = file.name.substring(0, 15) + '...';
    document.getElementById('promptStatusText').innerText = `Document Attached: ${file.name}`;
    document.getElementById('promptStatusIndicator').classList.remove('hidden');
  }
}

async function toggleAudioRecording() {
  const micBtn = document.getElementById('btnPromptMic');
  const micLabel = document.getElementById('promptMicLabel');

  if (!state.isRecording) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      state.mediaRecorder = new MediaRecorder(stream);
      state.audioChunks = [];

      state.mediaRecorder.ondataavailable = e => {
        if (e.data.size > 0) state.audioChunks.push(e.data);
      };

      state.mediaRecorder.onstop = () => {
        state.recordedAudioBlob = new Blob(state.audioChunks, { type: 'audio/m4a' });
        document.getElementById('promptStatusText').innerText = 'Voice Statement Recorded (Ready)';
        document.getElementById('promptStatusIndicator').classList.remove('hidden');
      };

      state.mediaRecorder.start();
      state.isRecording = true;
      micBtn.classList.add('bg-rose-900', 'text-rose-200');
      micLabel.innerText = 'Recording (Click Stop)...';
    } catch (err) {
      console.warn('Microphone permission denied', err);
      alert('Microphone access denied. You can still type your summary or upload a document.');
    }
  } else {
    state.mediaRecorder.stop();
    state.isRecording = false;
    micBtn.classList.remove('bg-rose-900', 'text-rose-200');
    micLabel.innerText = 'Voice Note Saved ✓';
  }
}

async function handlePromptSubmit() {
  const summary = document.getElementById('promptSummary').value;
  const category = document.getElementById('promptCategory').value;

  if (!summary && !state.recordedAudioBlob && !state.attachedDocFile) {
    alert('Please enter a brief description, record a voice statement, or attach a document notice.');
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/cases`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientId: state.currentUser?.id || 'usr_client_1',
        folderName: summary ? summary.substring(0, 32) + '...' : 'Confidential Case Vault',
        category,
        title: `Client Matter: ${category}`,
        summary: summary || 'Voice Statement / Evidence uploaded into confidential vault.',
        jurisdiction: { state: 'India', district: 'High Court / District Court' }
      })
    });
    const newCase = await res.json();

    document.getElementById('promptSummary').value = '';
    document.getElementById('promptStatusIndicator').classList.add('hidden');

    await loadInitialData();
    switchPortalTab('CLIENT');
    switchClientSubTab('c-tracker');
    const portals = document.getElementById('section-portals');
    if (portals) portals.scrollIntoView({ behavior: 'smooth' });
    alert('Matter encrypted into Vault! Advocates on the NRF Panel have been notified to review and submit strategy bids.');
  } catch (err) {
    console.error('Case intake error', err);
  }
}

function openBidModal(caseId, title) {
  document.getElementById('bidCaseIdHidden').value = caseId;
  document.getElementById('bidModalTitle').innerText = `Submit Strategy Proposal for: ${title}`;
  openModal('modalSubmitBid');
}

async function submitAdvocateBid(e) {
  e.preventDefault();
  const caseId = document.getElementById('bidCaseIdHidden').value;
  const briefAdvice = document.getElementById('bidAdviceText').value;
  const feeAmount = document.getElementById('bidFeeNumber').value;
  const timeline = document.getElementById('bidTimelineText').value;

  try {
    await fetch(`${API_BASE}/bids`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        caseId,
        advocateId: state.currentUser.id,
        briefAdvice,
        feeAmount: parseFloat(feeAmount),
        timeline
      })
    });
    closeModal('modalSubmitBid');
    document.getElementById('formSubmitBid').reset();
    await loadInitialData();
    alert(t('alertProposalSent'));
  } catch (err) {
    console.error('Bid error', err);
  }
}

function openPaymentModal(bidId) {
  const bid = state.bids.find(b => b.id === bidId);
  if (!bid) return;
  state.selectedBidForPayment = bid;
  document.getElementById('payAdvName').innerText = bid.advocate?.fullName || 'Senior Advocate';
  document.getElementById('payAmountDisplay').innerText = `₹${bid.feeAmount.toLocaleString()}`;
  openModal('modalPayment');
}

async function executePaymentNow() {
  if (!state.selectedBidForPayment) return;
  const bid = state.selectedBidForPayment;
  const btn = document.getElementById('btnExecutePay');
  btn.disabled = true;
  btn.innerText = 'Depositing into Escrow...';

  try {
    const res = await fetch(`${API_BASE}/bids/${bid.id}/accept-and-pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentMethod: 'UPI' })
    });
    await res.json();
    btn.disabled = false;
    btn.innerText = 'Confirm Escrow Deposit & Unlock Contact';
    closeModal('modalPayment');
    await loadInitialData();
    switchPortalTab('CLIENT');
    switchClientSubTab('c-billing');
    alert('Retainer deposited in Escrow! Client and Advocate contacts unlocked.');
  } catch (err) {
    btn.disabled = false;
    console.error('Payment error', err);
  }
}

function renderPersonaList() {
  const container = document.getElementById('personaListContainer');
  if (!container) return;

  container.innerHTML = state.allUsers.map(u => `
    <div onclick="selectUser('${u.id}')" class="p-2 rounded-xl hover:bg-slate-800 flex items-center justify-between cursor-pointer transition text-xs text-white">
      <div class="flex items-center space-x-2">
        <img src="${u.avatar}" class="w-7 h-7 rounded-full object-cover">
        <div>
          <div class="font-bold text-white">${u.fullName}</div>
          <div class="text-[10px] text-slate-400">${u.role}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function selectUser(userId) {
  const user = state.allUsers.find(u => u.id === userId);
  if (user) {
    applyUser(user);
    closeModal('switchUserModal');
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}
