const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Disable aggressive browser caching for instant dev live reloads
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// Serve static frontend files
app.use(express.static(path.join(__dirname, '..', 'public'), { etag: false, maxAge: 0 }));

// Configure Multer for Case media uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${uuidv4().substring(0, 8)}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Helper: Mask client PII for unauthorized viewers
function maskCaseForAdvocate(caseItem, currentAdvocateId, allUsers) {
  const isHiredAdvocate = caseItem.status === 'HIRED' && caseItem.hiredAdvocateId === currentAdvocateId;
  const clientUser = allUsers.find(u => u.id === caseItem.clientId);

  if (isHiredAdvocate) {
    return {
      ...caseItem,
      isUnlocked: true,
      client: {
        id: clientUser?.id,
        fullName: clientUser?.fullName,
        email: clientUser?.email,
        phone: clientUser?.phone,
        location: clientUser?.location,
        avatar: clientUser?.avatar
      }
    };
  }

  const maskedName = clientUser ? `Citizen (${clientUser.location || 'India / Global'})` : 'Confidential Client';
  const maskedFiles = (caseItem.files || []).map(file => {
    if (file.confidential) {
      return {
        id: file.id,
        name: 'Confidential Document (Locked until hired)',
        type: file.type,
        size: file.size,
        confidential: true,
        url: null
      };
    }
    return file;
  });

  return {
    ...caseItem,
    isUnlocked: false,
    client: {
      id: caseItem.clientId,
      fullName: maskedName,
      location: caseItem.jurisdiction ? `${caseItem.jurisdiction.district || ''}, ${caseItem.jurisdiction.state || ''}` : 'Confidential',
      phone: '•••••••••• (Hidden until paid)',
      email: '••••••••••@••••• (Hidden until paid)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
    },
    files: maskedFiles
  };
}

// ================= API ROUTES ================= //

// 1. Stats & Vitals
app.get('/api/stats', (req, res) => {
  const users = db.getUsers();
  const cases = db.getCases();
  const bids = db.getBids();
  const judgements = db.getJudgements();
  const payments = db.getPayments();

  res.json({
    totalUsers: users.length,
    clientsCount: users.filter(u => u.role === 'CLIENT').length,
    advocatesCount: users.filter(u => u.role === 'ADVOCATE').length,
    totalCases: cases.length,
    openCases: cases.filter(c => c.status === 'OPEN_FOR_BIDS').length,
    activeBids: bids.length,
    judgementsCount: judgements.length,
    totalEscrowINR: payments.reduce((acc, p) => acc + (p.amount || 0), 0)
  });
});

// 2. Users
app.get('/api/users', (req, res) => {
  const role = req.query.role;
  let users = db.getUsers();
  if (role) users = users.filter(u => u.role === role);
  res.json(users);
});

// 3. Cases
app.get('/api/cases', (req, res) => {
  const { role, userId } = req.query;
  const allCases = db.getCases();
  const allUsers = db.getUsers();

  if (role === 'CLIENT') {
    const clientCases = allCases.filter(c => c.clientId === userId);
    return res.json(clientCases);
  }

  if (role === 'ADVOCATE') {
    const maskedCases = allCases.map(c => maskCaseForAdvocate(c, userId, allUsers));
    return res.json(maskedCases);
  }

  res.json(allCases);
});

app.post('/api/cases', (req, res) => {
  const { clientId, folderName, category, jurisdiction, title, summary } = req.body;
  if (!clientId || !folderName || !summary) {
    return res.status(400).json({ error: 'Missing required case information' });
  }

  const newCase = {
    id: `case_${Date.now()}`,
    clientId,
    folderName,
    category: category || 'CIVIL_PROPERTY',
    jurisdiction: jurisdiction || { country: 'India', state: 'All-India', district: 'India' },
    title: title || folderName,
    summary,
    guidelineFeePaid: true,
    status: 'OPEN_FOR_BIDS',
    currentStage: 'LEGAL_VETTING',
    timelineSteps: [
      { title: 'Case Intake & Vault Created', date: new Date().toLocaleDateString('en-GB'), done: true },
      { title: 'Document & Revenue Vetting', date: 'In Progress', done: true },
      { title: 'Advocate Bidding & Strategy', date: 'Active', done: false },
      { title: 'Court Stay / Notice Filing', date: 'Pending Retainer', done: false }
    ],
    hiredAdvocateId: null,
    createdAt: new Date().toISOString(),
    files: []
  };

  db.addCase(newCase);
  res.status(201).json(newCase);
});

app.post('/api/cases/:id/upload', upload.single('file'), (req, res) => {
  const caseId = req.params.id;
  const caseItem = db.getCases().find(c => c.id === caseId);
  if (!caseItem) return res.status(404).json({ error: 'Case folder not found' });

  const { fileType, duration, confidential } = req.body;
  const file = req.file;

  const newFile = {
    id: `file_${Date.now()}`,
    name: file ? file.originalname : (req.body.name || 'Recorded_Statement.mp3'),
    type: fileType || 'DOCUMENT',
    duration: duration || null,
    size: file ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : '1.5 MB',
    url: file ? `/uploads/${file.filename}` : '/uploads/sample_deed.pdf',
    confidential: confidential === 'true' || confidential === true
  };

  const updatedFiles = [...(caseItem.files || []), newFile];
  const updatedCase = db.updateCase(caseId, { files: updatedFiles });

  res.json({ message: 'File added to vault', file: newFile, case: updatedCase });
});

// 4. Bids
app.get('/api/bids', (req, res) => {
  const { caseId } = req.query;
  let bids = db.getBids();
  if (caseId) bids = bids.filter(b => b.caseId === caseId);

  const allAdvocates = db.getUsers().filter(u => u.role === 'ADVOCATE');
  const enriched = bids.map(bid => {
    const adv = allAdvocates.find(a => a.id === bid.advocateId);
    return {
      ...bid,
      advocate: adv || null
    };
  });

  res.json(enriched);
});

app.post('/api/bids', (req, res) => {
  const { caseId, advocateId, briefAdvice, feeAmount, currency, timeline } = req.body;
  const newBid = {
    id: `bid_${Date.now()}`,
    caseId,
    advocateId,
    briefAdvice,
    feeAmount: parseFloat(feeAmount),
    currency: currency || 'INR',
    timeline: timeline || '3-5 days',
    status: 'PENDING',
    createdAt: new Date().toISOString()
  };

  db.addBid(newBid);
  res.status(201).json(newBid);
});

app.post('/api/bids/:id/accept-and-pay', (req, res) => {
  const bidId = req.params.id;
  const allBids = db.getBids();
  const bid = allBids.find(b => b.id === bidId);
  if (!bid) return res.status(404).json({ error: 'Bid not found' });

  const caseItem = db.getCases().find(c => c.id === bid.caseId);
  if (!caseItem) return res.status(404).json({ error: 'Case not found' });

  // Update Case
  const updatedCase = db.updateCase(caseItem.id, {
    status: 'HIRED',
    hiredAdvocateId: bid.advocateId,
    unlockedAt: new Date().toISOString()
  });

  // Add Payment
  const platformFee = Math.round(bid.feeAmount * 0.10);
  const payment = {
    id: `pay_${Date.now()}`,
    caseId: caseItem.id,
    bidId: bid.id,
    clientId: caseItem.clientId,
    advocateId: bid.advocateId,
    amount: bid.feeAmount,
    platformFee,
    advocatePayout: bid.feeAmount - platformFee,
    currency: bid.currency,
    paymentMethod: req.body.paymentMethod || 'UPI / Instant Escrow',
    status: 'HELD_IN_ESCROW',
    transactionRef: `TXN-NRF-${Date.now()}`,
    invoiceNumber: `INV-NRF-${Date.now().toString().slice(-4)}`,
    createdAt: new Date().toISOString()
  };
  db.addPayment(payment);

  const advocate = db.getUsers().find(u => u.id === bid.advocateId);
  const client = db.getUsers().find(u => u.id === caseItem.clientId);

  res.json({
    success: true,
    message: 'Payment completed! Contact and vault unlocked.',
    payment,
    unlockedAdvocate: advocate,
    unlockedClient: client,
    case: updatedCase
  });
});

// 5. Advocate Portal: Court Daily Cause List
app.get('/api/cause-list', (req, res) => {
  const { advocateId } = req.query;
  let list = db.getCauseList();
  if (advocateId) list = list.filter(cl => cl.advocateId === advocateId);
  res.json(list);
});

// 6. Advocate Portal: Legal Draft Bank
app.get('/api/draft-bank', (req, res) => {
  res.json(db.getDraftBank());
});

// 7. Client Portal: Consultation Slots Booking
app.get('/api/consultation-slots', (req, res) => {
  res.json(db.getConsultationSlots());
});

app.post('/api/consultation-slots', (req, res) => {
  const { clientId, advocateId, date, time, mode, topic } = req.body;
  const newSlot = {
    id: `slot_${Date.now()}`,
    clientId,
    advocateId,
    date,
    time,
    mode: mode || 'Encrypted Video Consultation',
    topic: topic || 'General Legal Strategy',
    status: 'CONFIRMED',
    createdAt: new Date().toISOString()
  };
  db.addConsultationSlot(newSlot);
  res.status(201).json(newSlot);
});

// 8. Emergency Fast-Track Intake (High Court Stay / Bail / Police Harassment)
app.post('/api/emergency', (req, res) => {
  const { fullName, phone, emergencyType, city, description } = req.body;
  const emergencyReq = {
    id: `sos_${Date.now()}`,
    fullName,
    phone,
    emergencyType: emergencyType || 'URGENT_BAIL',
    city: city || 'High Court Jurisdiction',
    description,
    status: 'PRIORITY_DISPATCHED',
    responseTarget: 'Under 120 Minutes',
    createdAt: new Date().toISOString()
  };
  db.addEmergencyRequest(emergencyReq);
  res.status(201).json({
    success: true,
    message: 'Emergency request registered. Priority advocate dispatched.',
    emergency: emergencyReq
  });
});

// 9. Judgements
app.get('/api/judgements', (req, res) => {
  res.json(db.getJudgements());
});

app.post('/api/judgements', (req, res) => {
  const newJudgement = {
    id: `jdg_${Date.now()}`,
    ...req.body,
    year: req.body.year || new Date().getFullYear().toString()
  };
  db.addJudgement(newJudgement);
  res.status(201).json(newJudgement);
});

// 10. Milestone / Step-Based Escrow Model APIs
app.get('/api/milestones', (req, res) => {
  res.json(db.getMilestonePlans());
});

app.post('/api/milestones/:id/release', (req, res) => {
  const result = db.releaseMilestone(req.params.id);
  if (!result.success) {
    return res.status(404).json(result);
  }
  res.json({
    success: true,
    message: 'Milestone approved and retainer portion released to advocate account!',
    ...result
  });
});

// 11. Crowdfunded PIL & Public Interest Pro-Bono Hub APIs
app.get('/api/pil-causes', (req, res) => {
  res.json(db.getPilCauses());
});

app.post('/api/pil-causes/:id/contribute', (req, res) => {
  const { amount, contributorName } = req.body;
  const result = db.contributeToPil(req.params.id, amount, contributorName);
  if (!result.success) {
    return res.status(404).json(result);
  }
  res.json({
    success: true,
    message: `Thank you for contributing ₹${amount} to public interest justice!`,
    ...result
  });
});

app.post('/api/pil-causes', (req, res) => {
  const { title, titleHi, category, jurisdiction, targetAmount, description, leadAdvocate } = req.body;
  const newPil = {
    id: `pil_${Date.now()}`,
    title,
    titleHi: titleHi || title,
    category: category || 'GOVT_CORRUPTION',
    jurisdiction: jurisdiction || 'High Court of Judicature',
    targetAmount: parseFloat(targetAmount) || 50000,
    raisedAmount: 0,
    backersCount: 1,
    leadAdvocate: leadAdvocate || 'Empanelled Senior Advocate',
    leadAdvocateBar: 'BCI/VERIFIED',
    leadAdvocateCourt: jurisdiction || 'High Court',
    description,
    descriptionHi: description,
    caseDiaryNo: `HC-PIL-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    status: 'SUBMITTED_FOR_VETTING',
    statusBadge: 'Citizen Grievance Vetted',
    nextHearingDate: 'Registry Listing Pending',
    courtUpdates: [
      { date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), text: 'Public interest issue verified by NRF pro-bono desk. Opened for citizen backing.' }
    ]
  };
  db.addPilCause(newPil);
  res.status(201).json(newPil);
});

// 12. Verified Pan-India Advocates Directory & Monetization Desk APIs
app.get('/api/advocates-directory', (req, res) => {
  const { state, court } = req.query;
  let advocates = db.getPanIndiaAdvocates();

  if (state && state !== 'ALL') {
    advocates = advocates.filter(a => a.state.toLowerCase() === state.toLowerCase());
  }
  if (court && court !== 'ALL') {
    advocates = advocates.filter(a => a.courts.some(c => c.toLowerCase().includes(court.toLowerCase())));
  }

  res.json(advocates);
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`⚖️  NRF Legal Platform Production API running on Port ${PORT}`);
  console.log(`🌐 Live Platform: http://localhost:${PORT}`);
  console.log(`=======================================================`);
});
