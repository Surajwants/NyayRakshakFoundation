// =========================================================================
// NRF Judicial & Tribunal Integration Grid (अखिल भारतीय एकीकृत न्याय तंत्र)
// Covers: Supreme Court, 25 High Courts, 672+ District Courts, NGT, NCLT, 
// CAT, DRT, TDSAT, ITAT, RTI Commissions, NHRC, NCDRC e-Daakhil, RBI CMS, RERA
// =========================================================================

const judicialInstitutions = {
  // 1. SUPREME COURT OF INDIA
  supremeCourt: {
    id: 'SCI',
    category: 'APEX_COURT',
    name: 'Supreme Court of India (सर्वोच्च न्यायालय)',
    shortName: 'Supreme Court',
    location: 'Tilak Marg, New Delhi',
    officialPortal: 'https://main.sci.gov.in',
    eFilingPortal: 'https://efiling.sci.gov.in',
    caseStatusUrl: 'https://main.sci.gov.in/case-status',
    causeListUrl: 'https://main.sci.gov.in/causelist',
    judgmentsPortal: 'https://digiscr.sci.gov.in', // e-SCR
    supportedIdentifiers: ['CNR', 'Diary Number', 'Case Type / Number / Year'],
    description: 'Apex judicial authority of the Republic of India with original, appellate and advisory jurisdiction under Articles 32, 131, 136, 142 & 143 of the Constitution of India.'
  },

  // 2. ALL 25 HIGH COURTS OF INDIA
  highCourts: [
    {
      id: 'HC_ALLAHABAD',
      code: 'UPHC',
      name: 'High Court of Judicature at Allahabad',
      nameHi: 'इलाहाबाद उच्च न्यायालय',
      benches: ['Principal Seat: Prayagraj (Allahabad)', 'Permanent Bench: Lucknow'],
      state: 'Uttar Pradesh',
      officialPortal: 'http://www.allahabadhighcourt.in',
      eCourtsPortal: 'https://hcservices.ecourts.gov.in/hcservices/main.php?state_code=1',
      eFilingUrl: 'https://efiling.ecourts.gov.in',
      causeListUrl: 'http://www.allahabadhighcourt.in/causelist/causelist.html',
      cnrPrefix: 'UPHC'
    },
    {
      id: 'HC_BOMBAY',
      code: 'BOMHC',
      name: 'High Court of Bombay',
      nameHi: 'बॉम्बे उच्च न्यायालय',
      benches: ['Principal Seat: Mumbai', 'Bench: Nagpur', 'Bench: Aurangabad (Chhatrapati Sambhajinagar)', 'Bench: Panaji (Goa)'],
      state: 'Maharashtra & Goa',
      officialPortal: 'https://bombayhighcourt.nic.in',
      eCourtsPortal: 'https://hcservices.ecourts.gov.in/hcservices/main.php?state_code=2',
      eFilingUrl: 'https://efiling.ecourts.gov.in',
      causeListUrl: 'https://bombayhighcourt.nic.in/causelist.php',
      cnrPrefix: 'BOMHC'
    },
    {
      id: 'HC_CALCUTTA',
      code: 'CALHC',
      name: 'High Court at Calcutta',
      nameHi: 'कलकत्ता उच्च न्यायालय',
      benches: ['Principal Seat: Kolkata', 'Circuit Bench: Jalpaiguri', 'Circuit Bench: Port Blair (A&N Islands)'],
      state: 'West Bengal & Andaman and Nicobar Islands',
      officialPortal: 'https://www.calcuttahighcourt.gov.in',
      eCourtsPortal: 'https://hcservices.ecourts.gov.in/hcservices/main.php?state_code=3',
      eFilingUrl: 'https://efiling.ecourts.gov.in',
      causeListUrl: 'https://www.calcuttahighcourt.gov.in/Cause-List',
      cnrPrefix: 'CALHC'
    },
    {
      id: 'HC_DELHI',
      code: 'DLHC',
      name: 'High Court of Delhi',
      nameHi: 'दिल्ली उच्च न्यायालय',
      benches: ['Principal Seat: Sher Shah Road, New Delhi'],
      state: 'NCT of Delhi',
      officialPortal: 'https://delhihighcourt.nic.in',
      eCourtsPortal: 'https://hcservices.ecourts.gov.in/hcservices/main.php?state_code=26',
      eFilingUrl: 'https://delhihighcourt.nic.in/efiling',
      causeListUrl: 'https://delhihighcourt.nic.in/causelist',
      cnrPrefix: 'DLHC'
    },
    {
      id: 'HC_MADRAS',
      code: 'MDRHC',
      name: 'High Court of Judicature at Madras',
      nameHi: 'मद्रास उच्च न्यायालय',
      benches: ['Principal Seat: Chennai', 'Bench: Madurai'],
      state: 'Tamil Nadu & Puducherry',
      officialPortal: 'https://www.hcmadras.tn.gov.in',
      eCourtsPortal: 'https://hcservices.ecourts.gov.in/hcservices/main.php?state_code=4',
      eFilingUrl: 'https://efiling.ecourts.gov.in',
      causeListUrl: 'https://www.hcmadras.tn.gov.in/causelist.php',
      cnrPrefix: 'MDRHC'
    },
    {
      id: 'HC_PUNJAB_HARYANA',
      code: 'PHHC',
      name: 'High Court of Punjab and Haryana',
      nameHi: 'पंजाब एवं हरियाणा उच्च न्यायालय',
      benches: ['Principal Seat: Capitol Complex, Chandigarh'],
      state: 'Punjab, Haryana & Chandigarh',
      officialPortal: 'https://highcourtchd.gov.in',
      eCourtsPortal: 'https://hcservices.ecourts.gov.in/hcservices/main.php?state_code=5',
      eFilingUrl: 'https://efiling.ecourts.gov.in',
      causeListUrl: 'https://highcourtchd.gov.in/?trs=causelist',
      cnrPrefix: 'PHHC'
    },
    {
      id: 'HC_KARNATAKA',
      code: 'KARHC',
      name: 'High Court of Karnataka',
      nameHi: 'कर्नाटक उच्च न्यायालय',
      benches: ['Principal Bench: Bengaluru', 'Benches: Dharwad & Kalaburagi'],
      state: 'Karnataka',
      officialPortal: 'https://karnatakahiighcourt.kar.nic.in',
      eCourtsPortal: 'https://hcservices.ecourts.gov.in/hcservices/main.php?state_code=6',
      eFilingUrl: 'https://efiling.ecourts.gov.in',
      causeListUrl: 'https://karnatakahiighcourt.kar.nic.in/causelist.php',
      cnrPrefix: 'KARHC'
    },
    {
      id: 'HC_GUJARAT',
      code: 'GUJHC',
      name: 'High Court of Gujarat',
      nameHi: 'गुजरात उच्च न्यायालय',
      benches: ['Principal Seat: Sola, Ahmedabad'],
      state: 'Gujarat',
      officialPortal: 'https://gujarathighcourt.nic.in',
      eCourtsPortal: 'https://hcservices.ecourts.gov.in/hcservices/main.php?state_code=7',
      eFilingUrl: 'https://efiling.ecourts.gov.in',
      causeListUrl: 'https://gujarathighcourt.nic.in/causelist',
      cnrPrefix: 'GUJHC'
    },
    {
      id: 'HC_PATNA',
      code: 'PATHC',
      name: 'High Court of Judicature at Patna',
      nameHi: 'पटना उच्च न्यायालय',
      benches: ['Principal Seat: Bailey Road, Patna'],
      state: 'Bihar',
      officialPortal: 'http://patnahighcourt.gov.in',
      eCourtsPortal: 'https://hcservices.ecourts.gov.in/hcservices/main.php?state_code=8',
      eFilingUrl: 'https://efiling.ecourts.gov.in',
      causeListUrl: 'http://patnahighcourt.gov.in/causelist',
      cnrPrefix: 'PATHC'
    },
    {
      id: 'HC_MADHYA_PRADESH',
      code: 'MPHC',
      name: 'High Court of Madhya Pradesh',
      nameHi: 'मध्य प्रदेश उच्च न्यायालय',
      benches: ['Principal Seat: Jabalpur', 'Benches: Indore & Gwalior'],
      state: 'Madhya Pradesh',
      officialPortal: 'https://mphc.gov.in',
      eCourtsPortal: 'https://hcservices.ecourts.gov.in/hcservices/main.php?state_code=9',
      eFilingUrl: 'https://efiling.ecourts.gov.in',
      causeListUrl: 'https://mphc.gov.in/causelist',
      cnrPrefix: 'MPHC'
    },
    {
      id: 'HC_RAJASTHAN',
      code: 'RAJHC',
      name: 'Rajasthan High Court',
      nameHi: 'राजस्थान उच्च न्यायालय',
      benches: ['Principal Seat: Jodhpur', 'Bench: Jaipur'],
      state: 'Rajasthan',
      officialPortal: 'https://hcraj.nic.in',
      eCourtsPortal: 'https://hcservices.ecourts.gov.in/hcservices/main.php?state_code=10',
      eFilingUrl: 'https://efiling.ecourts.gov.in',
      causeListUrl: 'https://hcraj.nic.in/causelist',
      cnrPrefix: 'RAJHC'
    },
    {
      id: 'HC_KERALA',
      code: 'KERHC',
      name: 'High Court of Kerala',
      nameHi: 'केरल उच्च न्यायालय',
      benches: ['Principal Seat: Ernakulam, Kochi'],
      state: 'Kerala & Lakshadweep',
      officialPortal: 'https://hckerala.gov.in',
      eCourtsPortal: 'https://hcservices.ecourts.gov.in/hcservices/main.php?state_code=11',
      eFilingUrl: 'https://efiling.ecourts.gov.in',
      causeListUrl: 'https://hckerala.gov.in/causelist',
      cnrPrefix: 'KERHC'
    },
    {
      id: 'HC_TELANGANA',
      code: 'TSHC',
      name: 'High Court for the State of Telangana',
      nameHi: 'तेलंगाना उच्च न्यायालय',
      benches: ['Principal Seat: Hyderabad'],
      state: 'Telangana',
      officialPortal: 'https://tshc.gov.in',
      eCourtsPortal: 'https://hcservices.ecourts.gov.in/hcservices/main.php?state_code=29',
      eFilingUrl: 'https://efiling.ecourts.gov.in',
      causeListUrl: 'https://tshc.gov.in/causelist',
      cnrPrefix: 'TSHC'
    },
    {
      id: 'HC_ANDHRA',
      code: 'APHC',
      name: 'High Court of Andhra Pradesh',
      nameHi: 'आंध्र प्रदेश उच्च न्यायालय',
      benches: ['Principal Seat: Nelapadu, Amaravati'],
      state: 'Andhra Pradesh',
      officialPortal: 'https://aphc.gov.in',
      eCourtsPortal: 'https://hcservices.ecourts.gov.in/hcservices/main.php?state_code=28',
      eFilingUrl: 'https://efiling.ecourts.gov.in',
      causeListUrl: 'https://aphc.gov.in/causelist',
      cnrPrefix: 'APHC'
    },
    {
      id: 'HC_ORISSA',
      code: 'ORIHC',
      name: 'High Court of Orissa',
      nameHi: 'उड़ीसा उच्च न्यायालय',
      benches: ['Principal Seat: Cuttack'],
      state: 'Odisha',
      officialPortal: 'https://orissahighcourt.nic.in',
      eCourtsPortal: 'https://hcservices.ecourts.gov.in/hcservices/main.php?state_code=12',
      eFilingUrl: 'https://efiling.ecourts.gov.in',
      causeListUrl: 'https://orissahighcourt.nic.in/causelist',
      cnrPrefix: 'ORIHC'
    },
    {
      id: 'HC_GAUHATI',
      code: 'GAUHC',
      name: 'Gauhati High Court',
      nameHi: 'गुवाहाटी उच्च न्यायालय',
      benches: ['Principal Seat: Guwahati (Assam)', 'Benches: Kohima, Aizawl, Itanagar'],
      state: 'Assam, Nagaland, Mizoram & Arunachal Pradesh',
      officialPortal: 'https://ghconline.gov.in',
      eCourtsPortal: 'https://hcservices.ecourts.gov.in/hcservices/main.php?state_code=13',
      eFilingUrl: 'https://efiling.ecourts.gov.in',
      causeListUrl: 'https://ghconline.gov.in/causelist',
      cnrPrefix: 'GAUHC'
    },
    {
      id: 'HC_UTTARAKHAND',
      code: 'UTTHC',
      name: 'High Court of Uttarakhand',
      nameHi: 'उत्तराखंड उच्च न्यायालय',
      benches: ['Principal Seat: Nainital'],
      state: 'Uttarakhand',
      officialPortal: 'https://highcourtofuttarakhand.gov.in',
      eCourtsPortal: 'https://hcservices.ecourts.gov.in/hcservices/main.php?state_code=15',
      eFilingUrl: 'https://efiling.ecourts.gov.in',
      causeListUrl: 'https://highcourtofuttarakhand.gov.in/causelist',
      cnrPrefix: 'UTTHC'
    },
    {
      id: 'HC_JHARKHAND',
      code: 'JHRHC',
      name: 'High Court of Jharkhand',
      nameHi: 'झारखंड उच्च न्यायालय',
      benches: ['Principal Seat: Doranda, Ranchi'],
      state: 'Jharkhand',
      officialPortal: 'https://jharkhandhighcourt.nic.in',
      eCourtsPortal: 'https://hcservices.ecourts.gov.in/hcservices/main.php?state_code=16',
      eFilingUrl: 'https://efiling.ecourts.gov.in',
      causeListUrl: 'https://jharkhandhighcourt.nic.in/causelist',
      cnrPrefix: 'JHRHC'
    },
    {
      id: 'HC_CHHATTISGARH',
      code: 'CGHC',
      name: 'High Court of Chhattisgarh',
      nameHi: 'छत्तीसगढ़ उच्च न्यायालय',
      benches: ['Principal Seat: Bodri, Bilaspur'],
      state: 'Chhattisgarh',
      officialPortal: 'https://highcourt.cg.gov.in',
      eCourtsPortal: 'https://hcservices.ecourts.gov.in/hcservices/main.php?state_code=17',
      eFilingUrl: 'https://efiling.ecourts.gov.in',
      causeListUrl: 'https://highcourt.cg.gov.in/causelist',
      cnrPrefix: 'CGHC'
    },
    {
      id: 'HC_HIMACHAL',
      code: 'HPHC',
      name: 'High Court of Himachal Pradesh',
      nameHi: 'हिमाचल प्रदेश उच्च न्यायालय',
      benches: ['Principal Seat: Ravenswood, Shimla'],
      state: 'Himachal Pradesh',
      officialPortal: 'https://hphighcourt.nic.in',
      eCourtsPortal: 'https://hcservices.ecourts.gov.in/hcservices/main.php?state_code=14',
      eFilingUrl: 'https://efiling.ecourts.gov.in',
      causeListUrl: 'https://hphighcourt.nic.in/causelist',
      cnrPrefix: 'HPHC'
    },
    {
      id: 'HC_JK_LADAKH',
      code: 'JKHC',
      name: 'High Court of Jammu & Kashmir and Ladakh',
      nameHi: 'जम्मू और कश्मीर एवं लद्दाख उच्च न्यायालय',
      benches: ['Summer Seat: Srinagar', 'Winter Seat: Jammu'],
      state: 'Jammu & Kashmir and Ladakh',
      officialPortal: 'https://jkhighcourt.nic.in',
      eCourtsPortal: 'https://hcservices.ecourts.gov.in/hcservices/main.php?state_code=18',
      eFilingUrl: 'https://efiling.ecourts.gov.in',
      causeListUrl: 'https://jkhighcourt.nic.in/causelist',
      cnrPrefix: 'JKHC'
    },
    {
      id: 'HC_MANIPUR',
      code: 'MANHC',
      name: 'High Court of Manipur',
      nameHi: 'मणिपुर उच्च न्यायालय',
      benches: ['Principal Seat: Mantripukhri, Imphal'],
      state: 'Manipur',
      officialPortal: 'https://hcmimphal.nic.in',
      eCourtsPortal: 'https://hcservices.ecourts.gov.in/hcservices/main.php?state_code=21',
      eFilingUrl: 'https://efiling.ecourts.gov.in',
      causeListUrl: 'https://hcmimphal.nic.in/causelist',
      cnrPrefix: 'MANHC'
    },
    {
      id: 'HC_MEGHALAYA',
      code: 'MEGHC',
      name: 'High Court of Meghalaya',
      nameHi: 'मेघालय उच्च न्यायालय',
      benches: ['Principal Seat: Shillong'],
      state: 'Meghalaya',
      officialPortal: 'https://meghalayahighcourt.nic.in',
      eCourtsPortal: 'https://hcservices.ecourts.gov.in/hcservices/main.php?state_code=22',
      eFilingUrl: 'https://efiling.ecourts.gov.in',
      causeListUrl: 'https://meghalayahighcourt.nic.in/causelist',
      cnrPrefix: 'MEGHC'
    },
    {
      id: 'HC_TRIPURA',
      code: 'TRPHC',
      name: 'High Court of Tripura',
      nameHi: 'त्रिपुरा उच्च न्यायालय',
      benches: ['Principal Seat: Capital Complex, Agartala'],
      state: 'Tripura',
      officialPortal: 'https://thc.nic.in',
      eCourtsPortal: 'https://hcservices.ecourts.gov.in/hcservices/main.php?state_code=23',
      eFilingUrl: 'https://efiling.ecourts.gov.in',
      causeListUrl: 'https://thc.nic.in/causelist',
      cnrPrefix: 'TRPHC'
    },
    {
      id: 'HC_SIKKIM',
      code: 'SIKHC',
      name: 'High Court of Sikkim',
      nameHi: 'सिक्किम उच्च न्यायालय',
      benches: ['Principal Seat: Gangtok'],
      state: 'Sikkim',
      officialPortal: 'https://highcourtofsikkim.nic.in',
      eCourtsPortal: 'https://hcservices.ecourts.gov.in/hcservices/main.php?state_code=24',
      eFilingUrl: 'https://efiling.ecourts.gov.in',
      causeListUrl: 'https://highcourtofsikkim.nic.in/causelist',
      cnrPrefix: 'SIKHC'
    }
  ],

  // 3. DISTRICT & SESSIONS COURTS (National e-Courts Services Infrastructure)
  districtCourtsSystem: {
    totalDistrictsCovered: 672,
    totalStatesAndUTs: 36,
    centralPortal: 'https://services.ecourts.gov.in',
    eFilingPortal: 'https://efiling.ecourts.gov.in',
    ePayPortal: 'https://pay.ecourts.gov.in',
    cnrStructure: {
      totalLength: 16,
      format: 'SSDDCC-NNNNNN-YYYY',
      example: 'PBJL01-008921-2026',
      explanation: 'SS = 2-letter State Code, DD = 2-letter District Code, CC = 2-digit Court Establishment, NNNNNN = 6-digit Case Serial, YYYY = 4-digit Year'
    },
    stateCodes: [
      { state: 'Uttar Pradesh', code: 'UP', districtCount: 75, sampleCNR: 'UPLK01-014299-2026' },
      { state: 'Maharashtra', code: 'MH', districtCount: 36, sampleCNR: 'MHMC01-009841-2026' },
      { state: 'Delhi', code: 'DL', districtCount: 11, sampleCNR: 'DLSK01-008741-2026' },
      { state: 'Punjab', code: 'PB', districtCount: 23, sampleCNR: 'PBJL01-008921-2026' },
      { state: 'Bihar', code: 'BR', districtCount: 38, sampleCNR: 'BRPT01-004512-2026' },
      { state: 'Madhya Pradesh', code: 'MP', districtCount: 52, sampleCNR: 'MPJB01-007812-2026' },
      { state: 'Rajasthan', code: 'RJ', districtCount: 33, sampleCNR: 'RJJP01-003412-2026' },
      { state: 'West Bengal', code: 'WB', districtCount: 23, sampleCNR: 'WBKL01-006781-2026' },
      { state: 'Gujarat', code: 'GJ', districtCount: 33, sampleCNR: 'GJAH01-005612-2026' },
      { state: 'Karnataka', code: 'KA', districtCount: 31, sampleCNR: 'KABN01-008912-2026' },
      { state: 'Tamil Nadu', code: 'TN', districtCount: 38, sampleCNR: 'TNCH01-004589-2026' },
      { state: 'Haryana', code: 'HR', districtCount: 22, sampleCNR: 'HRGG01-007812-2026' }
    ]
  },

  // 4. SPECIALIZED NATIONAL & STATE TRIBUNALS
  tribunals: [
    {
      id: 'NGT',
      name: 'National Green Tribunal (राष्ट्रीय हरित अधिकरण)',
      shortName: 'NGT',
      category: 'ENVIRONMENT',
      benches: ['Principal Bench: New Delhi', 'Western: Pune', 'Central: Bhopal', 'Eastern: Kolkata', 'Southern: Chennai'],
      officialPortal: 'https://greentribunal.gov.in',
      eFilingUrl: 'https://greentribunal.gov.in/efiling',
      caseStatusUrl: 'https://greentribunal.gov.in/case-status',
      causeListUrl: 'https://greentribunal.gov.in/cause-list',
      sampleDocket: 'NGT-PB-OA-2026-9041',
      description: 'Dedicated environmental tribunal established under NGT Act 2010 for speedy disposal of cases relating to pollution control, water/air contamination, forest conservation, and compensation.'
    },
    {
      id: 'NCLT',
      name: 'National Company Law Tribunal (राष्ट्रीय कंपनी विधि अधिकरण)',
      shortName: 'NCLT',
      category: 'CORPORATE_INSOLVENCY',
      benches: ['Principal Bench: New Delhi', 'Benches in Ahmedabad, Allahabad, Bengaluru, Chandigarh, Chennai, Cuttack, Guwahati, Hyderabad, Indore, Jaipur, Kochi, Kolkata, Mumbai'],
      officialPortal: 'https://nclt.gov.in',
      eFilingUrl: 'https://efiling.nclt.gov.in',
      caseStatusUrl: 'https://nclt.gov.in/case-status',
      causeListUrl: 'https://nclt.gov.in/causelist',
      appellateBody: 'NCLAT (https://nclat.nic.in)',
      sampleDocket: 'NCLT-ND-CP-2026-118',
      description: 'Quasi-judicial authority adjudicating matters under Companies Act 2013 and Insolvency and Bankruptcy Code (IBC 2016).'
    },
    {
      id: 'CAT',
      name: 'Central Administrative Tribunal (केंद्रीय प्रशासनिक अधिकरण)',
      shortName: 'CAT',
      category: 'SERVICE_LAW',
      benches: ['Principal Bench: Copernicus Marg, New Delhi', '18 Benches across State Capitals'],
      officialPortal: 'https://cgat.gov.in',
      eFilingUrl: 'https://cgat.gov.in/cat-efiling',
      caseStatusUrl: 'https://cgat.gov.in/cat-casestatus',
      causeListUrl: 'https://cgat.gov.in/cat-causelist',
      sampleDocket: 'CAT-PB-OA-2026-4412',
      description: 'Constitutional tribunal under Article 323A for adjudication of service disputes, recruitment grievances, and disciplinary actions of Central Government employees.'
    },
    {
      id: 'DRT',
      name: 'Debts Recovery Tribunal & DRAT (ऋण वसूली अधिकरण)',
      shortName: 'DRT / DRAT',
      category: 'BANKING_RECOVERY',
      benches: ['39 DRTs & 5 DRATs across Mumbai, Delhi, Kolkata, Chennai, Allahabad'],
      officialPortal: 'https://drt.gov.in',
      eFilingUrl: 'https://drt.gov.in/e-drt',
      caseStatusUrl: 'https://drt.gov.in/case-status',
      causeListUrl: 'https://drt.gov.in/cause-list',
      sampleDocket: 'DRT-DEL-OA-2026-881',
      description: 'Established under RDDBFI Act 1993 and SARFAESI Act 2002 for expeditious recovery of debts due to banks and financial institutions.'
    },
    {
      id: 'TDSAT',
      name: 'Telecom Disputes Settlement & Appellate Tribunal (TDSAT)',
      shortName: 'TDSAT',
      category: 'TELECOM_BROADCASTING',
      benches: ['New Delhi'],
      officialPortal: 'https://tdsat.gov.in',
      caseStatusUrl: 'https://tdsat.gov.in/case-status',
      causeListUrl: 'https://tdsat.gov.in/cause-list',
      sampleDocket: 'TDSAT-BP-2026-039',
      description: 'Adjudicates disputes among telecom licensors, licensees, service providers, consumers, and broadcasting/cable operators.'
    },
    {
      id: 'ITAT',
      name: 'Income Tax Appellate Tribunal (आयकर अपीलीय अधिकरण)',
      shortName: 'ITAT',
      category: 'DIRECT_TAXATION',
      benches: ['63 Benches across 27 stations in India'],
      officialPortal: 'https://itat.gov.in',
      eFilingUrl: 'https://itat.gov.in/efiling',
      caseStatusUrl: 'https://itat.gov.in/case-status',
      causeListUrl: 'https://itat.gov.in/cause-list',
      sampleDocket: 'ITAT-MUM-ITA-2026-219',
      description: 'Second appellate authority under Income Tax Act 1961 for direct tax appeals against CIT(A) orders.'
    },
    {
      id: 'CESTAT',
      name: 'Customs, Excise & Service Tax Appellate Tribunal',
      shortName: 'CESTAT',
      category: 'INDIRECT_TAXATION',
      benches: ['Principal Bench: New Delhi', 'Regional Benches: Mumbai, Kolkata, Chennai, Bengaluru, Ahmedabad, Chandigarh, Hyderabad, Allahabad'],
      officialPortal: 'https://cestat.gov.in',
      caseStatusUrl: 'https://cestat.gov.in/case-status',
      causeListUrl: 'https://cestat.gov.in/cause-list',
      sampleDocket: 'CESTAT-DEL-EX-2026-772'
    },
    {
      id: 'AFT',
      name: 'Armed Forces Tribunal (सशस्त्र बल अधिकरण)',
      shortName: 'AFT',
      category: 'DEFENCE_FORCES',
      benches: ['Principal Bench: New Delhi', 'Regional Benches: Chandigarh, Lucknow, Kolkata, Guwahati, Chennai, Kochi, Mumbai, Jabalpur, Jaipur, Srinagar'],
      officialPortal: 'https://aftdelhi.nic.in',
      caseStatusUrl: 'https://aftdelhi.nic.in/case-status',
      causeListUrl: 'https://aftdelhi.nic.in/causelist',
      sampleDocket: 'AFT-PB-OA-2026-194'
    }
  ],

  // 5. RTI (RIGHT TO INFORMATION) COMMISSIONS
  rtiCommissions: [
    {
      id: 'CIC',
      name: 'Central Information Commission (केंद्रीय सूचना आयोग)',
      jurisdiction: 'Central Public Authorities (Ministries, PSUs, Banks, Armed Forces)',
      officialPortal: 'https://cic.gov.in',
      appealTrackingUrl: 'https://cic.gov.in/appeal-complaint-status',
      causeListUrl: 'https://cic.gov.in/cause-list',
      rtiOnlinePortal: 'https://rtionline.gov.in',
      sampleDocket: 'CIC-WB-A-2026-00419',
      description: 'Highest statutory appellate body for RTI 2nd Appeals and Section 18 complaints against Central Govt Public Information Officers.'
    },
    {
      id: 'SIC_UP',
      name: 'Uttar Pradesh State Information Commission (राज्य सूचना आयोग, उ.प्र.)',
      jurisdiction: 'Uttar Pradesh State Govt Departments & Local Bodies',
      officialPortal: 'http://upsic.up.nic.in',
      appealTrackingUrl: 'http://upsic.up.nic.in/search_appeal.aspx',
      sampleDocket: 'UPSIC-APP-2026-90412'
    },
    {
      id: 'SIC_MAHARASHTRA',
      name: 'Maharashtra State Information Commission',
      jurisdiction: 'Maharashtra State Public Authorities',
      officialPortal: 'https://sic.maharashtra.gov.in',
      sampleDocket: 'MSIC-PUN-2026-3412'
    },
    {
      id: 'SIC_BIHAR',
      name: 'Bihar State Information Commission (सूचना भवन, पटना)',
      jurisdiction: 'Bihar State Govt & Police Authorities',
      officialPortal: 'http://sic.bih.nic.in',
      sampleDocket: 'BSIC-PAT-2026-1184'
    },
    {
      id: 'SIC_KARNATAKA',
      name: 'Karnataka Information Commission (KIC)',
      jurisdiction: 'Karnataka State Public Authorities',
      officialPortal: 'http://kic.gov.in',
      sampleDocket: 'KIC-BLR-2026-6701'
    },
    {
      id: 'SIC_RAJASTHAN',
      name: 'Rajasthan Information Commission (RIC)',
      jurisdiction: 'Rajasthan State Departments & Panchayats',
      officialPortal: 'http://ric.rajasthan.gov.in',
      sampleDocket: 'RIC-JPR-2026-2290'
    }
  ],

  // 6. STATUTORY COMMISSIONS (HUMAN RIGHTS, CONSUMER, WOMEN, VIGILANCE)
  statutoryCommissions: [
    {
      id: 'NHRC',
      name: 'National Human Rights Commission (राष्ट्रीय मानवाधिकार आयोग)',
      category: 'HUMAN_RIGHTS',
      officialPortal: 'https://nhrc.nic.in',
      complaintTrackingPortal: 'https://hrcnet.nic.in',
      sampleDocket: 'NHRC-CASE-2026-88190',
      description: 'Statutory body under Protection of Human Rights Act 1993 inquiring into police encounters, custodial torture, bonded labour, and atrocities.'
    },
    {
      id: 'NCDRC_EDAAKHIL',
      name: 'National Consumer Disputes Redressal Commission & e-Daakhil',
      category: 'CONSUMER_DISPUTES',
      officialPortal: 'http://ncdrc.nic.in',
      eFilingAndTracking: 'https://edaakhil.nic.in',
      sampleDocket: 'EDA-NCDRC-2026-3391',
      description: 'Comprehensive Consumer Court hierarchy (District Commissions, State Commissions & National Commission) integrated via e-Daakhil.'
    },
    {
      id: 'NCW',
      name: 'National Commission for Women (राष्ट्रीय महिला आयोग)',
      category: 'WOMEN_RIGHTS',
      officialPortal: 'http://ncw.nic.in',
      complaintPortal: 'http://ncwapps.nic.in/onlinecomplaintsv2',
      sampleDocket: 'NCW-COMP-2026-12401'
    },
    {
      id: 'CVC',
      name: 'Central Vigilance Commission (केंद्रीय सतर्कता आयोग)',
      category: 'ANTI_CORRUPTION',
      officialPortal: 'https://cvc.gov.in',
      portalGrievance: 'https://cvc.gov.in/portal/complaint-tracking',
      sampleDocket: 'CVC-VIG-2026-55901'
    },
    {
      id: 'CCI',
      name: 'Competition Commission of India (भारतीय प्रतिस्पर्धा आयोग)',
      category: 'ANTITRUST_MARKET',
      officialPortal: 'https://cci.gov.in',
      sampleDocket: 'CCI-INQ-2026-4402'
    }
  ],

  // 7. STATUTORY OMBUDSMAN & REGULATORS (BANKING, INSURANCE, RERA, ELECTRICITY)
  ombudsmenAndRegulators: [
    {
      id: 'RBI_CMS',
      name: 'Reserve Bank of India Banking Ombudsman (CMS Portal)',
      category: 'BANKING_AND_FINANCE',
      authority: 'Reserve Bank of India (RBI)',
      officialPortal: 'https://cms.rbi.org.in',
      complaintLodgingAndTracking: 'https://cms.rbi.org.in/cms/index.html',
      sampleDocket: 'RBI-CMS-2026-89412',
      description: 'One Nation One Ombudsman scheme covering all Scheduled Commercial Banks, NBFCs, Payment Banks, and Digital Wallets for unauthorized debits, loan disputes, and hidden charges.'
    },
    {
      id: 'INSURANCE_OMBUDSMAN',
      name: 'Council for Insurance Ombudsmen & Bima Bharosa (IRDAI)',
      category: 'INSURANCE_CLAIMS',
      authority: 'Insurance Regulatory and Development Authority of India (IRDAI)',
      officialPortal: 'https://www.cioins.co.in',
      bimaBharosaPortal: 'https://bimabharosa.irdai.gov.in',
      sampleDocket: 'INS-OMB-MUM-2026-4410',
      description: 'Statutory dispute redressal for repudiated mediclaim health insurance, life insurance, crop insurance, and motor vehicle accidents.'
    },
    {
      id: 'RERA_NATIONAL',
      name: 'Real Estate Regulatory Authority (RERA) Pan-India Gateway',
      category: 'REAL_ESTATE_BUILDERS',
      portalDirectory: [
        { state: 'Uttar Pradesh (UP-RERA)', portal: 'https://www.up-rera.in' },
        { state: 'Maharashtra (MahaRERA)', portal: 'https://maharera.maharashtra.gov.in' },
        { state: 'NCT of Delhi (Delhi RERA)', portal: 'https://rera.delhi.gov.in' },
        { state: 'Haryana (HRERA Gurugram & Panchkula)', portal: 'https://haryanarera.gov.in' },
        { state: 'Karnataka RERA', portal: 'https://rera.karnataka.gov.in' }
      ],
      sampleDocket: 'UPRERA-COM-2026-5510',
      description: 'State RERA Tribunals under Real Estate (Regulation and Development) Act 2016 commanding builders to refund delayed flats with 10.75% interest or execute conveyance deeds.'
    },
    {
      id: 'ELECTRICITY_OMBUDSMAN',
      name: 'Electricity Ombudsman & State Regulatory Commissions (SERCs)',
      category: 'POWER_UTILITIES',
      authorities: ['Central: CERC (cercind.gov.in)', 'UPERC (Lucknow)', 'DERC (Delhi)', 'MERC (Mumbai)'],
      sampleDocket: 'ELEC-OMB-UP-2026-1029'
    }
  ],

  // 8. UNIFIED LIVE SAMPLE DOCKETS (FOR INSTANT UNIVERSAL LOOKUP ENGINE)
  universalSampleDockets: [
    {
      docketNumber: 'PBJL01-008921-2026',
      courtType: 'DISTRICT_COURT',
      institutionName: 'Court of Civil Judge (Senior Division), Jalandhar, Punjab',
      caseTitle: 'Vikram Singh vs. Harminder Singh & Revenue Lekhpal',
      category: 'Civil Injunction (Order 39 CPC) & Revenue Mutation',
      cnrNumber: 'PBJL01-008921-2026',
      diaryNumber: 'CS/8921/2026',
      filingDate: '26 Oct 2026',
      nextHearingDate: '12 Nov 2026',
      stage: 'Interim Demolition Stay Arguments',
      courtroom: 'Courtroom No. 4',
      presidingJudge: 'Shri R.K. Bhatia, PCS (Sr. Division)',
      advocateForPetitioner: 'Adv. Rajeshwar Pandey (D/1842/2011)',
      ordersheetUrl: 'https://services.ecourts.gov.in/ecourtindia_v6/?p=home/index&app_token=demo',
      officialVerificationStatus: 'VERIFIED_ON_ECOURTS'
    },
    {
      docketNumber: 'DLHC01-014529-2026',
      courtType: 'HIGH_COURT',
      institutionName: 'High Court of Delhi (Sher Shah Road, New Delhi)',
      caseTitle: 'Sunita Devi vs. Municipal Corporation of Delhi & Ors.',
      category: 'Article 226 Constitutional Writ of Mandamus',
      cnrNumber: 'DLHC01-014529-2026',
      diaryNumber: 'WP(C) 14529/2026',
      filingDate: '29 Oct 2026',
      nextHearingDate: '14 Nov 2026',
      stage: 'Motion Hearing & Notice to Standing Counsel',
      courtroom: 'Courtroom No. 2 (Division Bench)',
      presidingJudge: 'Hon’ble Chief Justice Bench',
      advocateForPetitioner: 'Adv. Rajeshwar Pandey (D/1842/2011)',
      ordersheetUrl: 'https://delhihighcourt.nic.in/case-status',
      officialVerificationStatus: 'VERIFIED_ON_HIGHCOURT_PORTAL'
    },
    {
      docketNumber: 'SCIN01-002841-2026',
      courtType: 'SUPREME_COURT',
      institutionName: 'Supreme Court of India (Tilak Marg, New Delhi)',
      caseTitle: 'Messrs Ganga Agro Industries vs. Union of India & CPCB',
      category: 'Special Leave Petition (Civil) under Article 136',
      cnrNumber: 'SCIN01-002841-2026',
      diaryNumber: 'SLP(C) No. 2841/2026',
      filingDate: '18 Oct 2026',
      nextHearingDate: '20 Nov 2026',
      stage: 'Admission & Ad-Interim Protection',
      courtroom: 'Courtroom No. 3',
      presidingJudge: 'Hon’ble Justice Bench III',
      advocateForPetitioner: 'Adv. Meenakshi Sundaram (MAH/4921/2016)',
      ordersheetUrl: 'https://main.sci.gov.in/case-status',
      officialVerificationStatus: 'VERIFIED_ON_SCI_DIGITAL_VAULT'
    },
    {
      docketNumber: 'NGT-PB-OA-2026-9041',
      courtType: 'TRIBUNAL',
      institutionName: 'National Green Tribunal (Principal Bench, New Delhi)',
      caseTitle: 'Society for Clean Gomti River vs. State Pollution Control Board & 18 Units',
      category: 'Original Application under Section 14 & 15 of NGT Act 2010',
      cnrNumber: 'NGTPB01-009041-2026',
      diaryNumber: 'OA No. 9041/2026(PB)',
      filingDate: '15 Oct 2026',
      nextHearingDate: '18 Nov 2026',
      stage: 'SPCB Joint Test Analysis Report Consideration',
      courtroom: 'Courtroom No. 1 (Principal Bench)',
      presidingJudge: 'Hon’ble Chairperson Bench',
      advocateForPetitioner: 'Adv. Meenakshi Sundaram (MAH/4921/2016)',
      ordersheetUrl: 'https://greentribunal.gov.in/case-status',
      officialVerificationStatus: 'VERIFIED_ON_NGT_PORTAL'
    },
    {
      docketNumber: 'NCLT-ND-CP-2026-118',
      courtType: 'TRIBUNAL',
      institutionName: 'National Company Law Tribunal (New Delhi Bench III)',
      caseTitle: 'Sunrise Steels Pvt Ltd vs. Horizon Infra Projects Ltd',
      category: 'Section 7 Insolvency Petition (IBC 2016 Corporate Dispute)',
      cnrNumber: 'NCLTND-000118-2026',
      diaryNumber: 'CP (IB) No. 118/ND/2026',
      filingDate: '22 Oct 2026',
      nextHearingDate: '16 Nov 2026',
      stage: 'Notice of Default & Response by Corporate Debtor',
      courtroom: 'Courtroom No. 3',
      presidingJudge: 'Member Judicial & Member Technical Bench',
      advocateForPetitioner: 'Adv. Anjali Deshmukh',
      ordersheetUrl: 'https://nclt.gov.in/case-status',
      officialVerificationStatus: 'VERIFIED_ON_NCLT_PORTAL'
    },
    {
      docketNumber: 'CIC-WB-A-2026-00419',
      courtType: 'RTI_COMMISSION',
      institutionName: 'Central Information Commission (Baba Gang Nath Marg, New Delhi)',
      caseTitle: 'RTI Appeal: Public Tender Scrutiny vs. Ministry of Road Transport & Highways',
      category: 'RTI Second Appeal under Section 19(3) & Penalty Notice Sec 20(1)',
      cnrNumber: 'CICND01-000419-2026',
      diaryNumber: 'CIC/MORTH/A/2026/00419',
      filingDate: '12 Oct 2026',
      nextHearingDate: '18 Nov 2026',
      stage: 'Information Commissioner Formal Hearing via Hybrid Video Link',
      courtroom: 'Hearing Room No. 4',
      presidingJudge: 'Hon’ble Information Commissioner',
      advocateForPetitioner: 'Adv. Anjali Deshmukh (UP/6712/2015)',
      ordersheetUrl: 'https://cic.gov.in',
      officialVerificationStatus: 'VERIFIED_ON_CIC_PORTAL'
    },
    {
      docketNumber: 'RBI-CMS-2026-89412',
      courtType: 'OMBUDSMAN',
      institutionName: 'Reserve Bank of India Banking Ombudsman (Complaint Management System)',
      caseTitle: 'Fraudulent Online Phishing Debit Dispute vs. Scheduled Commercial Bank',
      category: 'RBI Integrated Ombudsman Scheme 2021 (Zero Liability for Unauthorized Banking)',
      cnrNumber: 'RBICMS-0089412-2026',
      diaryNumber: 'CMS-2026-89412',
      filingDate: '25 Oct 2026',
      nextHearingDate: '10 Nov 2026',
      stage: 'Bank Response & CCTV / IP-Log Production Due',
      courtroom: 'Conciliation Cell, RBI Regional Office, Sansad Marg',
      presidingJudge: 'Banking Ombudsman Officer (Chief General Manager)',
      advocateForPetitioner: 'Adv. Rajeshwar Pandey',
      ordersheetUrl: 'https://cms.rbi.org.in',
      officialVerificationStatus: 'VERIFIED_ON_RBI_CMS'
    },
    {
      docketNumber: 'UPRERA-COM-2026-5510',
      courtType: 'OMBUDSMAN',
      institutionName: 'Uttar Pradesh Real Estate Regulatory Authority (UP-RERA, Greater Noida Bench)',
      caseTitle: 'Allottee Homebuyer vs. Supertech Builders Ltd (Delayed 4-BHK Flat)',
      category: 'Section 18 RERA Claim for Immediate Refund + 10.75% MCLR Interest',
      cnrNumber: 'UPRERA-005510-2026',
      diaryNumber: 'Complaint No. 5510/UP-RERA/2026',
      filingDate: '20 Oct 2026',
      nextHearingDate: '15 Nov 2026',
      stage: 'Execution of Recovery Certificate against Escrow Bank Account',
      courtroom: 'Bench No. 2',
      presidingJudge: 'Member Bench, UP-RERA',
      advocateForPetitioner: 'Adv. Rajeshwar Pandey',
      ordersheetUrl: 'https://www.up-rera.in',
      officialVerificationStatus: 'VERIFIED_ON_UPRERA'
    },
    {
      docketNumber: 'EDA-NCDRC-2026-3391',
      courtType: 'COMMISSION',
      institutionName: 'National Consumer Disputes Redressal Commission (e-Daakhil Portal)',
      caseTitle: 'Insurance Repudiation Claim vs. National General Insurance Co.',
      category: 'Consumer Protection Act 2019 (Deficiency in Service & Mediclaim Denial)',
      cnrNumber: 'NCDRC01-003391-2026',
      diaryNumber: 'Consumer Case No. 3391/2026',
      filingDate: '24 Oct 2026',
      nextHearingDate: '17 Nov 2026',
      stage: 'Medical Board Verification & Written Arguments',
      courtroom: 'Court No. 1, Upbhokta Nyay Bhawan, New Delhi',
      presidingJudge: 'Hon’ble Justice Presiding Member',
      advocateForPetitioner: 'Adv. Meenakshi Sundaram',
      ordersheetUrl: 'https://edaakhil.nic.in',
      officialVerificationStatus: 'VERIFIED_ON_EDAAKHIL'
    }
  ]
};

module.exports = judicialInstitutions;
