const API_URL = window.CONFIG?.API_URL || 'http://localhost:5000/api';

let inactivityTimer;
const dashboardState = {
  contacts: [],
  newsletters: [],
  jobs: [],
};

// Session management
function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    if (window.Toast) {
      window.Toast.warning('Session expired due to inactivity');
    }
    logout();
  }, 30 * 60 * 1000);
}

document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('keypress', resetInactivityTimer);

function setupPasswordToggle(toggleButtonId, inputId) {
  const toggleBtn = document.getElementById(toggleButtonId);
  const input = document.getElementById(inputId);
  const icon = toggleBtn?.querySelector('i');
  if (!toggleBtn || !input) return;

  toggleBtn.addEventListener('click', () => {
    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
    toggleBtn.classList.toggle('is-visible', isHidden);
    if (icon) {
      icon.classList.toggle('fa-eye', !isHidden);
      icon.classList.toggle('fa-eye-slash', isHidden);
    }
    toggleBtn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
  });
}

function setupCreateAccountModal() {
  // Toggle between login and sign-up views
  document.getElementById('showSignUp')?.addEventListener('click', () => {
    document.getElementById('loginView').style.display = 'none';
    document.getElementById('signUpView').style.display = 'block';
    const err = document.getElementById('setupError');
    if (err) { err.style.display = 'none'; err.textContent = ''; }
  });

  document.getElementById('showLogin')?.addEventListener('click', () => {
    document.getElementById('signUpView').style.display = 'none';
    document.getElementById('loginView').style.display = 'block';
  });

  const form = document.getElementById('createAccountForm');
  const errorEl = document.getElementById('setupError');
  const submitBtn = document.getElementById('submitCreateAccount');

  if (!form || !submitBtn) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('setupName')?.value?.trim();
    const email = document.getElementById('setupEmail')?.value?.trim().toLowerCase();
    const password = document.getElementById('setupPassword')?.value;
    const setupKey = document.getElementById('setupKey')?.value?.trim();

    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creating...';

    try {
      const response = await fetch(`${API_URL}/admin/setup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, setupKey })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || data.message || 'Unable to create account');
      }

      form.reset();
      document.getElementById('signUpView').style.display = 'none';
      document.getElementById('loginView').style.display = 'block';
      if (window.Toast) window.Toast.success('Account created. You can now log in.');
      else alert('Account created. You can now log in.');
    } catch (error) {
      try {
        await saveLocalAdmin({ name, email, password });
        form.reset();
        document.getElementById('signUpView').style.display = 'none';
        document.getElementById('loginView').style.display = 'block';
        if (window.Toast) window.Toast.success('Local admin created — you can log in now.');
        else alert('Local admin created — you can log in now.');
      } catch (ex2) {
        if (errorEl) {
          errorEl.style.display = 'block';
          errorEl.textContent = error.message || ex2.message || 'Unable to create account';
        }
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

// ---- Local admin helpers (demo/offline mode) ----
async function sha256Hex(text) {
  const enc = new TextEncoder();
  const data = enc.encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  const bytes = new Uint8Array(hash);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function saveLocalAdmin({ name, email, password }) {
  if (!email || !password) throw new Error('Email and password required');
  const hash = await sha256Hex(password + '::SNC::' + email.toLowerCase());
  const admin = { name, email: email.toLowerCase(), hash, role: 'admin', created: new Date().toISOString() };
  localStorage.setItem('local_admin', JSON.stringify(admin));
}

async function verifyLocalAdmin(email, password) {
  const stored = localStorage.getItem('local_admin');
  if (!stored) return false;
  const admin = JSON.parse(stored);
  if (admin.email !== (email || '').toLowerCase()) return false;
  const hash = await sha256Hex((password || '') + '::SNC::' + email.toLowerCase());
  return hash === admin.hash ? admin : false;
}

// Login
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const btn = e.target.querySelector('button[type="submit"]');
  const errorEl = document.getElementById('errorMsg');

  btn.disabled = true;
  btn.textContent = 'Logging in...';
  if (errorEl) errorEl.style.display = 'none';

  // Try local admin first (works offline)
  try {
    const local = await verifyLocalAdmin(email, password);
    if (local) {
      sessionStorage.setItem('adminData', JSON.stringify(local));
      showDashboard();
      resetInactivityTimer();
      btn.disabled = false;
      btn.textContent = 'Login';
      return;
    }
  } catch (ex) {
    console.warn('local admin verify failed', ex);
  }

  // Try remote API
  try {
    const response = await fetch(`${API_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      sessionStorage.setItem('adminData', JSON.stringify(data.admin));
      if (data.token) sessionStorage.setItem('adminToken', data.token);
      showDashboard();
      resetInactivityTimer();
    } else {
      if (errorEl) {
        errorEl.style.display = 'block';
        errorEl.textContent = data.error || 'Invalid email or password.';
      }
    }
  } catch {
    // Backend not running — show a clean message
    if (errorEl) {
      errorEl.style.display = 'block';
      errorEl.textContent = 'No account found. Please create an account first.';
    }
  } finally {
    btn.disabled = false;
    btn.textContent = 'Login';
  }
});

// Verify session on load
window.addEventListener('DOMContentLoaded', async () => {
  setupPasswordToggle('togglePassword', 'password');
  setupPasswordToggle('toggleSetupPassword', 'setupPassword');
  setupCreateAccountModal();

  try {
    const token = sessionStorage.getItem('adminToken');
    const response = await fetch(`${API_URL}/admin/verify`, {
      credentials: 'include',
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    
    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem('adminData', JSON.stringify(data.admin));
      showDashboard();
      resetInactivityTimer();
    }
  } catch (error) {
    console.log('Not authenticated');
  }
});

function showDashboard() {
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('dashboard').style.display = 'block';
  applyRolePermissions();
  setupTableFilters();
  loadData();
}

function currentAdminRole() {
  try {
    const admin = JSON.parse(sessionStorage.getItem('adminData') || '{}');
    return (admin.role || 'admin').toLowerCase();
  } catch {
    return 'admin';
  }
}

function applyRolePermissions() {
  const role = currentAdminRole();
  const badge = document.getElementById('roleBadge');
  if (badge) badge.textContent = role;

  const manageTabButton = document.getElementById('manageTabButton');
  const manageTab = document.getElementById('manage-tab');
  const isAdmin = role === 'admin';

  if (manageTabButton) manageTabButton.style.display = isAdmin ? 'inline-block' : 'none';
  if (manageTab) manageTab.style.display = isAdmin ? 'block' : 'none';
}

let tableFiltersInitialized = false;

function setupTableFilters() {
  if (tableFiltersInitialized) return;
  tableFiltersInitialized = true;

  const contactSearch = document.getElementById('contactSearch');
  const contactServiceFilter = document.getElementById('contactServiceFilter');
  const newsletterSearch = document.getElementById('newsletterSearch');
  const jobSearch = document.getElementById('jobSearch');

  contactSearch?.addEventListener('input', renderContactsTable);
  contactServiceFilter?.addEventListener('change', renderContactsTable);
  newsletterSearch?.addEventListener('input', renderNewslettersTable);
  jobSearch?.addEventListener('input', renderJobsTable);
}

async function logout() {
  try {
    await fetch(`${API_URL}/admin/logout`, {
      method: 'POST',
      credentials: 'include'
    });
  } catch (error) {
    console.error('Logout error:', error);
  }
  sessionStorage.removeItem('adminData');
  sessionStorage.removeItem('adminToken');
  location.reload();
}

function showTab(tab, event) {
  if (event && typeof event.preventDefault === 'function') {
    event.preventDefault();
  }
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  const fallbackEvent = window.event;
  const target = event?.target || fallbackEvent?.target || null;
  const tabBtn = target?.closest ? target.closest('.tab') : null;
  if (tabBtn) tabBtn.classList.add('active');
  const tabContent = document.getElementById(tab + '-tab');
  if (tabContent) tabContent.classList.add('active');
}

async function fetchWithAuth(endpoint, options = {}) {
  const token = sessionStorage.getItem('adminToken');
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });
  
  if (response.status === 401) {
    logout();
    throw new Error('Session expired');
  }
  
  return response;
}

async function loadData() {
  try {
    await Promise.all([
      loadAnalytics(),
      loadContacts(),
      loadNewsletters(),
      loadJobs()
    ]);
  } catch (err) {
    console.warn('Remote data load failed, falling back to local storage where available', err);
  }

  // Always attempt to load local submissions to ensure demo/offline visibility
  loadLocalSubmissions();
}

// ---- Local submissions fallback for offline/demo ----
function loadLocalSubmissions() {
  try {
    // Contacts
    const contactRaw = localStorage.getItem('contact_messages');
    if (contactRaw && (!dashboardState.contacts || dashboardState.contacts.length === 0)) {
      const arr = JSON.parse(contactRaw || '[]');
      dashboardState.contacts = arr.map((it, idx) => ({
        _id: it._id || `local-c-${Date.now()}-${idx}`,
        name: it.name || 'Anonymous',
        email: it.email || '',
        phone: it.phone || '',
        service: it.service || '',
        createdAt: it.ts || it.createdAt || new Date().toISOString()
      }));
    }

    // Newsletters
    const subsRaw = localStorage.getItem('newsletter_subs');
    if (subsRaw && (!dashboardState.newsletters || dashboardState.newsletters.length === 0)) {
      const arr = JSON.parse(subsRaw || '[]');
      dashboardState.newsletters = arr.map((email, idx) => ({
        _id: `local-n-${Date.now()}-${idx}`,
        email,
        status: 'active',
        subscribedAt: new Date().toISOString()
      }));
    }

    // Jobs
    const jobsRaw = localStorage.getItem('job_applications');
    if (jobsRaw && (!dashboardState.jobs || dashboardState.jobs.length === 0)) {
      const arr = JSON.parse(jobsRaw || '[]');
      dashboardState.jobs = arr.map((it, idx) => ({
        _id: it._id || `local-j-${Date.now()}-${idx}`,
        name: it.name || it.fullName || 'Applicant',
        email: it.email || '',
        phone: it.phone || '',
        position: it.role || it.position || '',
        createdAt: it.ts || it.appliedAt || new Date().toISOString(),
        raw: it
      }));
    }

    // Update counts and re-render tables
    document.getElementById('contactCount').textContent = dashboardState.contacts.length || 0;
    document.getElementById('newsletterCount').textContent = dashboardState.newsletters.length || 0;
    document.getElementById('jobCount').textContent = dashboardState.jobs.length || 0;

    renderContactsTable();
    renderNewslettersTable();
    renderJobsTable();
  } catch (ex) {
    console.error('loadLocalSubmissions error', ex);
  }
}

function formatDelta(value) {
  const num = Number(value) || 0;
  if (num > 0) return `+${num}% vs previous period`;
  if (num < 0) return `${num}% vs previous period`;
  return '0% vs previous period';
}

function setDeltaState(el, value) {
  if (!el) return;
  el.classList.remove('up', 'down');
  const num = Number(value) || 0;
  if (num > 0) el.classList.add('up');
  if (num < 0) el.classList.add('down');
}

function renderTrendChart(series = []) {
  const container = document.getElementById('trend-chart');
  if (!container) return;

  if (!series.length) {
    container.innerHTML = '<p class="status-line-muted">No trend data available.</p>';
    return;
  }

  const lastSeven = series.slice(-7);
  const peak = Math.max(...lastSeven.map(item => item.count), 1);

  container.innerHTML = lastSeven.map((item) => {
    const day = new Date(item.date).toLocaleDateString(undefined, { weekday: 'short' });
    const width = Math.max(4, Math.round((item.count / peak) * 100));
    return `
      <div class="mini-row">
        <span>${day}</span>
        <div class="mini-bar"><div class="mini-fill" style="width:${width}%"></div></div>
        <strong>${item.count}</strong>
      </div>
    `;
  }).join('');
}

function renderServiceMix(rows = []) {
  const container = document.getElementById('service-mix');
  if (!container) return;

  if (!rows.length) {
    container.innerHTML = '<li><span>No services recorded</span><strong>0</strong></li>';
    return;
  }

  container.innerHTML = rows
    .slice(0, 6)
    .map((row) => `<li><span>${row._id || 'other'}</span><strong>${row.count}</strong></li>`)
    .join('');
}

async function loadAnalytics() {
  try {
    const res = await fetchWithAuth('/analytics/dashboard?days=30');
    const payload = await res.json();
    if (!payload?.success || !payload.data) return;

    const { contacts, newsletter, applications, conversion, deltas, charts } = payload.data;

    const leadsEl = document.getElementById('kpi-leads');
    const subsEl = document.getElementById('kpi-subscribers');
    const appsEl = document.getElementById('kpi-applications');
    const conversionEl = document.getElementById('kpi-conversion');
    const appsConversionEl = document.getElementById('kpi-app-conversion');

    if (leadsEl) leadsEl.textContent = contacts?.new30d || 0;
    if (subsEl) subsEl.textContent = newsletter?.new30d || 0;
    if (appsEl) appsEl.textContent = applications?.recent7d || 0;
    if (conversionEl) conversionEl.textContent = `${conversion?.leadToSubscriberRate || 0}%`;
    if (appsConversionEl) appsConversionEl.textContent = `Apps/Lead: ${conversion?.applicationToLeadRate || 0}%`;

    const leadsDeltaEl = document.getElementById('kpi-leads-delta');
    const subsDeltaEl = document.getElementById('kpi-subscribers-delta');
    const appsDeltaEl = document.getElementById('kpi-applications-delta');

    if (leadsDeltaEl) {
      leadsDeltaEl.textContent = formatDelta(deltas?.contacts);
      setDeltaState(leadsDeltaEl, deltas?.contacts);
    }
    if (subsDeltaEl) {
      subsDeltaEl.textContent = formatDelta(deltas?.subscribers);
      setDeltaState(subsDeltaEl, deltas?.subscribers);
    }
    if (appsDeltaEl) {
      appsDeltaEl.textContent = formatDelta(deltas?.applications);
      setDeltaState(appsDeltaEl, deltas?.applications);
    }

    renderTrendChart(charts?.contactsDaily || []);
    renderServiceMix(charts?.contactsByService || []);
  } catch (error) {
    console.error('Analytics load failed:', error);
  }
}

// Setup event delegation for delete buttons
function setupDeleteButtons() {
  document.querySelectorAll('.delete-btn[data-id]').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = btn.getAttribute('data-id');
      const type = btn.getAttribute('data-type');
      if (!confirm('Are you sure you want to delete this item?')) return;
      
      try {
        await fetchWithAuth(`/${type}/${id}`, { method: 'DELETE' });
        if (window.Toast) {
          window.Toast.success('Item deleted successfully');
        }
        loadData();
      } catch (err) {
        if (window.Toast) {
          window.Toast.error('Error deleting item');
        }
      }
    });
  });
}

async function loadContacts() {
  try {
    const res = await fetchWithAuth('/contact');
    const data = await res.json();
    const contacts = data.data || data;

    dashboardState.contacts = Array.isArray(contacts) ? contacts : [];
    document.getElementById('contactCount').textContent = dashboardState.contacts.length || 0;
    renderContactsTable();
  } catch (err) {
    console.error(err);
  }
}

function renderContactsTable() {
  const contacts = dashboardState.contacts;
  const searchTerm = (document.getElementById('contactSearch')?.value || '').trim().toLowerCase();
  const serviceFilter = (document.getElementById('contactServiceFilter')?.value || '').trim().toLowerCase();

  const filtered = contacts.filter((item) => {
    const text = `${item.name || ''} ${item.email || ''} ${item.company || ''}`.toLowerCase();
    const service = (item.service || '').toLowerCase();
    const textMatch = !searchTerm || text.includes(searchTerm);
    const serviceMatch = !serviceFilter || service === serviceFilter;
    return textMatch && serviceMatch;
  });

  if (!filtered.length) {
    document.getElementById('contactsTable').innerHTML = '<div class="empty-state">No contacts match current filters</div>';
    return;
  }

  let html = '<table><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Service</th><th>Date</th><th>Action</th></tr></thead><tbody>';
  filtered.forEach(item => {
    const escapedId = item._id.replace(/'/g, '&#39;');
    const escapedName = (item.name || 'N/A').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const escapedEmail = (item.email || 'N/A').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    html += `<tr>
      <td>${escapedName}</td>
      <td>${escapedEmail}</td>
      <td>${(item.phone || 'N/A').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td>
      <td>${(item.service || 'N/A').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td>
      <td>${new Date(item.createdAt).toLocaleDateString()}</td>
      <td><button class="delete-btn" data-id="${escapedId}" data-type="contact">Delete</button></td>
    </tr>`;
  });
  html += '</tbody></table>';
  const contactsTable = document.getElementById('contactsTable');
  if (contactsTable) {
    contactsTable.innerHTML = html;
    setupDeleteButtons();
  }
}

async function loadNewsletters() {
  try {
    const res = await fetchWithAuth('/newsletter');
    const data = await res.json();
    const newsletters = data.data || data;

    dashboardState.newsletters = Array.isArray(newsletters) ? newsletters : [];
    document.getElementById('newsletterCount').textContent = dashboardState.newsletters.length || 0;
    renderNewslettersTable();
  } catch (err) {
    console.error(err);
  }
}

function renderNewslettersTable() {
  const newsletters = dashboardState.newsletters;
  const searchTerm = (document.getElementById('newsletterSearch')?.value || '').trim().toLowerCase();

  const filtered = newsletters.filter((item) => {
    const email = (item.email || '').toLowerCase();
    return !searchTerm || email.includes(searchTerm);
  });

  if (!filtered.length) {
    document.getElementById('newslettersTable').innerHTML = '<div class="empty-state">No subscribers match current filters</div>';
    return;
  }

  let html = '<table><thead><tr><th>Email</th><th>Status</th><th>Subscribed Date</th><th>Action</th></tr></thead><tbody>';
  filtered.forEach(item => {
    const escapedId = item._id.replace(/'/g, '&#39;');
    const escapedEmail = (item.email || 'N/A').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    html += `<tr>
      <td>${escapedEmail}</td>
      <td>${(item.status || 'active').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td>
      <td>${new Date(item.subscribedAt || item.createdAt).toLocaleDateString()}</td>
      <td><button class="delete-btn" data-id="${escapedId}" data-type="newsletter">Delete</button></td>
    </tr>`;
  });
  html += '</tbody></table>';
  const newslettersTable = document.getElementById('newslettersTable');
  if (newslettersTable) {
    newslettersTable.innerHTML = html;
    setupDeleteButtons();
  }
}

async function loadJobs() {
  try {
    const res = await fetchWithAuth('/jobs');
    const data = await res.json();
    const jobs = data.data || data;

    dashboardState.jobs = Array.isArray(jobs) ? jobs : [];
    document.getElementById('jobCount').textContent = dashboardState.jobs.length || 0;
    renderJobsTable();
  } catch (err) {
    console.error(err);
  }
}

function renderJobsTable() {
  const jobs = dashboardState.jobs;
  const searchTerm = (document.getElementById('jobSearch')?.value || '').trim().toLowerCase();

  const filtered = jobs.filter((item) => {
    const text = `${item.name || item.fullName || ''} ${item.email || ''} ${item.position || item.jobTitle || ''}`.toLowerCase();
    return !searchTerm || text.includes(searchTerm);
  });

  if (!filtered.length) {
    document.getElementById('jobsTable').innerHTML = '<div class="empty-state">No job applications match current filters</div>';
    return;
  }

  let html = '<table><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Position</th><th>Date</th><th>Action</th></tr></thead><tbody>';
  filtered.forEach(item => {
    const escapedId = item._id.replace(/'/g, '&#39;');
    const escapedName = (item.name || item.fullName || 'N/A').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const escapedEmail = (item.email || 'N/A').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const escapedPhone = (item.phone || 'N/A').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const escapedPos = (item.position || item.jobTitle || 'N/A').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const dateSource = item.createdAt || item.appliedAt;
    html += `<tr>
      <td>${escapedName}</td>
      <td>${escapedEmail}</td>
      <td>${escapedPhone}</td>
      <td>${escapedPos}</td>
      <td>${new Date(dateSource).toLocaleDateString()}</td>
      <td><button class="delete-btn" data-id="${escapedId}" data-type="jobs">Delete</button></td>
    </tr>`;
  });
  html += '</tbody></table>';
  const jobsTable = document.getElementById('jobsTable');
  if (jobsTable) {
    jobsTable.innerHTML = html;
    setupDeleteButtons();
  }
}

async function deleteItem(type, id) {
  if (!confirm('Are you sure you want to delete this item?')) return;
  
  try {
    await fetchWithAuth(`/${type}/${id}`, { method: 'DELETE' });
    if (window.Toast) {
      window.Toast.success('Item deleted successfully');
    }
    loadData();
  } catch (err) {
    if (window.Toast) {
      window.Toast.error('Error deleting item');
    }
  }
}

// Application Management (existing code)
window.onload = function() {
  loadApplicationStatus();
  loadCourseStatus();
  loadActivityLog();
  startCountdown();
};

function loadCourseStatus() {
  const status = localStorage.getItem('all_courses_status') || 'closed';
  const enrolled = parseInt(localStorage.getItem('total_enrolled') || '0');
  const sessionStart = localStorage.getItem('session_start') || '';
  const deadline = localStorage.getItem('enrollment_deadline') || '';
  
  document.getElementById('course-status').textContent = status.toUpperCase();
  document.getElementById('course-status').style.color = status === 'open' ? '#2e7d32' : '#d32f2f';
  document.getElementById('total-enrolled').textContent = enrolled;
  document.getElementById('session-start').value = sessionStart;
  document.getElementById('enrollment-deadline').value = deadline;
  
  if (status === 'open' && deadline) {
    document.getElementById('deadline-display').style.display = 'block';
  }
}

function toggleAllCourses(status) {
  const sessionStart = document.getElementById('session-start').value;
  const deadline = document.getElementById('enrollment-deadline').value;
  
  if (status === 'open' && (!sessionStart || !deadline)) {
    alert('Please set session start date and enrollment deadline!');
    return;
  }
  
  const enrolled = parseInt(localStorage.getItem('total_enrolled') || '0');
  if (status === 'open' && enrolled >= 50) {
    alert('Cannot open enrollment - capacity reached (50/50 students)');
    return;
  }
  
  localStorage.setItem('all_courses_status', status);
  localStorage.setItem('session_start', sessionStart);
  localStorage.setItem('enrollment_deadline', deadline);
  
  logActivity(`Enrollment ${status === 'open' ? 'OPENED' : 'CLOSED'}`, `Admin manually ${status === 'open' ? 'opened' : 'closed'} enrollment. Session: ${sessionStart}`);
  loadCourseStatus();
  alert(`All course enrollments ${status === 'open' ? 'opened' : 'closed'} successfully!`);
}

function resetEnrollments() {
  if (!confirm('Reset all enrollment data? This will clear enrolled count and dates.')) return;
  localStorage.setItem('total_enrolled', '0');
  localStorage.removeItem('session_start');
  localStorage.removeItem('enrollment_deadline');
  document.getElementById('session-start').value = '';
  document.getElementById('enrollment-deadline').value = '';
  logActivity('RESET', 'Admin reset enrollment count and dates');
  loadCourseStatus();
  alert('Enrollment data reset successfully!');
}

function logActivity(action, details) {
  const logs = JSON.parse(localStorage.getItem('activity_log') || '[]');
  logs.unshift({
    timestamp: new Date().toISOString(),
    action: action,
    details: details
  });
  if (logs.length > 50) logs.pop();
  localStorage.setItem('activity_log', JSON.stringify(logs));
  loadActivityLog();
}

function loadActivityLog() {
  const logs = JSON.parse(localStorage.getItem('activity_log') || '[]');
  const container = document.getElementById('activity-log');
  
  if (logs.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: #999;">No activity yet</p>';
    return;
  }
  
  let html = '<div style="display: flex; flex-direction: column; gap: 0.8rem;">';
  logs.forEach(log => {
    const date = new Date(log.timestamp);
    const color = log.action.includes('OPENED') ? '#2e7d32' : log.action.includes('CLOSED') ? '#d32f2f' : '#666';
    html += `
      <div style="padding: 1rem; background: #f8f9fa; border-left: 4px solid ${color}; border-radius: 4px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.3rem;">
          <strong style="color: ${color};">${log.action}</strong>
          <span style="color: #999; font-size: 0.85rem;">${date.toLocaleString()}</span>
        </div>
        <p style="margin: 0; color: #666; font-size: 0.9rem;">${log.details}</p>
      </div>
    `;
  });
  html += '</div>';
  container.innerHTML = html;
}

function clearActivityLog() {
  if (!confirm('Clear all activity history? This action cannot be undone.')) return;
  localStorage.removeItem('activity_log');
  loadActivityLog();
  alert('Activity history cleared successfully!');
}

function startCountdown() {
  setInterval(() => {
    const deadline = localStorage.getItem('enrollment_deadline');
    const status = localStorage.getItem('all_courses_status');
    
    if (status === 'open' && deadline) {
      const now = new Date().getTime();
      const end = new Date(deadline + 'T23:59:59').getTime();
      const diff = end - now;
      
      if (diff <= 0) {
        localStorage.setItem('all_courses_status', 'closed');
        logActivity('AUTO-CLOSED', 'Enrollment automatically closed - deadline reached');
        loadCourseStatus();
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      document.getElementById('countdown-timer').textContent = `${days}d ${hours}h ${minutes}m`;
    }
  }, 60000);
}

function loadApplicationStatus() {
  const type = 'internship';
  const status = localStorage.getItem(`${type}_status`) || 'closed';
  const link = localStorage.getItem(`${type}_link`) || '';
  
  document.getElementById(`${type}-status`).textContent = status.toUpperCase();
  document.getElementById(`${type}-status`).style.color = status === 'open' ? '#2e7d32' : '#d32f2f';
  document.getElementById(`${type}-link`).value = link;
  document.getElementById('internship-title').value = localStorage.getItem('internship_title') || '';
  document.getElementById('internship-requirements').value = localStorage.getItem('internship_requirements') || '';
  document.getElementById('internship-release').value = localStorage.getItem('internship_release') || '';
  document.getElementById('internship-deadline').value = localStorage.getItem('internship_deadline') || '';
}

function updateStatus(type, status) {
  const link = document.getElementById(`${type}-link`).value;
  const title = document.getElementById('internship-title').value;
  const requirements = document.getElementById('internship-requirements').value;
  const release = document.getElementById('internship-release').value;
  const deadline = document.getElementById('internship-deadline').value;
  
  if (status === 'open' && (!link || !title || !requirements || !release || !deadline)) {
    alert('Please fill all fields before opening applications!');
    return;
  }
  
  localStorage.setItem('internship_title', title);
  localStorage.setItem('internship_requirements', requirements);
  localStorage.setItem('internship_release', release);
  localStorage.setItem('internship_deadline', deadline);
  localStorage.setItem(`${type}_status`, status);
  localStorage.setItem(`${type}_link`, link);
  
  loadApplicationStatus();
  alert(`Internship applications ${status === 'open' ? 'opened' : 'closed'} successfully!`);
}
