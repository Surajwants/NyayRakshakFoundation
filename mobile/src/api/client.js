// Centralized API Client connecting to NRF Production & Development Server
const PRODUCTION_API = 'https://nrfsathi.onrender.com/api';
const LOCAL_DEV_API = 'http://10.0.2.2:4000/api'; // Android Emulator alias for localhost

export const API_BASE = PRODUCTION_API;

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...(options.headers || {})
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: Failed request`);
    }

    return await response.json();
  } catch (err) {
    console.warn(`[NRF API ERROR] ${endpoint}:`, err.message);
    throw err;
  }
}

export const api = {
  // Authentication & Dual Profile
  auth: {
    sendOtp: (phone, role) => request('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, role })
    }),
    verifyOtp: (phone, otp, role) => request('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, otp, role })
    })
  },

  // Cases & CNR Tracking
  cases: {
    getAll: () => request('/cases'),
    getTimeline: (caseId) => request(`/client/timeline/${caseId}`)
  },

  // 4-Phase Milestone Escrow System
  milestones: {
    getAll: () => request('/milestones'),
    release: (milestoneId) => request(`/milestones/${milestoneId}/release`, {
      method: 'POST'
    })
  },

  // Crowdfunded Jan-Hit PIL Feed
  pil: {
    getAll: () => request('/pil-causes'),
    contribute: (causeId, amount, citizenName) => request(`/pil-causes/${causeId}/contribute`, {
      method: 'POST',
      body: JSON.stringify({ amount, citizenName })
    })
  },

  // Advocates Directory & Monetization
  advocates: {
    getDirectory: (state = 'ALL', court = 'ALL') => 
      request(`/advocates-directory?state=${encodeURIComponent(state)}&court=${encodeURIComponent(court)}`),
    bookSlot: (slotData) => request('/consultation-slots', {
      method: 'POST',
      body: JSON.stringify(slotData)
    }),
    withdrawEarnings: (withdrawalData) => request('/advocate/withdraw', {
      method: 'POST',
      body: JSON.stringify(withdrawalData)
    })
  },

  // Daily Court Cause List
  causeList: {
    getAll: () => request('/cause-list')
  },

  // 24x7 Emergency Fast-Track SOS
  emergency: {
    dispatch: (emergencyData) => request('/emergency', {
      method: 'POST',
      body: JSON.stringify(emergencyData)
    })
  },

  // National Judicial & Quasi-Judicial Integration Grid (Courts, Tribunals, Commissions, Ombudsman)
  judicial: {
    getInstitutions: () => request('/judicial/institutions'),
    lookupDocket: (query) => request(`/judicial/lookup?query=${encodeURIComponent(query)}`),
    getMultiCourtCauseList: () => request('/judicial/multi-court-causelist'),
    trackCase: (data) => request('/judicial/track-case', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },

  // Real-Time Notifications
  notifications: {
    getAll: () => request('/notifications')
  }
};

export default api;
