// ============================================================
// auth.js — Auth utilities + Theme system (Supabase edition)
// Requires config.js to be loaded first.
// ============================================================

// ── Theme definitions ─────────────────────────────────────
const THEMES = [
  { id:'retro',  name:'Retro Forest',   desc:'Dark pixel RPG',           cls:'',         preview:'linear-gradient(135deg,#0d1a0e,#1e2e20,#4caf50)', dots:['#7edf82','#f0c040','#2196f3'] },
  { id:'ghibli', name:'Studio Ghibli',  desc:'Soft watercolour nature',  cls:'t-ghibli', preview:'linear-gradient(135deg,#c8e0c0,#eef5ea,#7ab87a)', dots:['#4a8a5a','#c08a28','#4a7ab8'] },
  { id:'kdrama', name:'K-Drama',        desc:'Rose-gold Seoul café',      cls:'t-kdrama', preview:'linear-gradient(135deg,#fdf8f5,#f5ece6,#c4705a)', dots:['#c4705a','#2a1f1a','#fdf8f5'] },
  { id:'cyber',  name:'Cyberpunk',      desc:'Neon teal glitch city',     cls:'t-cyber',  preview:'linear-gradient(135deg,#080c14,#101828,#00dcc8)', dots:['#00dcc8','#f03060','#f0c030'] },
  { id:'neon',   name:'Neon City',      desc:'Pink anime midnight power', cls:'t-neon',   preview:'linear-gradient(135deg,#0a0820,#1a1545,#ff2d9e)', dots:['#ff2d9e','#20e870','#00e5ff'] },
];


let _currentTheme = localStorage.getItem('eq_theme') || 'retro';

function applyTheme(id) {
  const t = THEMES.find(x => x.id === id) || THEMES[0];
  document.body.className = t.cls;
  _currentTheme = id;
  localStorage.setItem('eq_theme', id);
}
function openTheme() {
  buildThemeGrid();
  document.getElementById('themeOverlay')?.classList.remove('hidden');
}
function closeTheme(e) {
  if (!e || e.target === document.getElementById('themeOverlay'))
    document.getElementById('themeOverlay')?.classList.add('hidden');
}
function buildThemeGrid() {
  const grid = document.getElementById('themeGrid');
  if (!grid) return;
  grid.innerHTML = THEMES.map(t => `
    <div class="theme-card${t.id === _currentTheme ? ' active-t' : ''}" onclick="pickTheme('${t.id}')">
      <div class="theme-preview" style="background:${t.preview};">
        <div class="theme-dots">${t.dots.map(c=>`<div class="theme-dot" style="background:${c}"></div>`).join('')}</div>
      </div>
      <div class="theme-name">${t.name}</div>
      <div class="theme-desc">${t.desc}</div>
      ${t.id === _currentTheme ? '<div class="active-badge">active</div>' : ''}
    </div>`).join('');
}
function pickTheme(id) { applyTheme(id); buildThemeGrid(); }

// ── Toast ─────────────────────────────────────────────────
let _toastTimer;
function toast(msg, type = 'info') {
  let el = document.getElementById('toastEl');
  if (!el) { el = document.createElement('div'); el.id = 'toastEl'; document.body.appendChild(el); }
  el.className = 'toast ' + type;
  el.innerHTML = '<span>' + (type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ') + '</span> ' + msg;
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.remove(), 3200);
}

// ── Local stats ───────────────────────────────────────────
function _today() { return new Date().toISOString().slice(0, 10); }

const EcoStats = {
  getPoints()        { return parseInt(localStorage.getItem('eq_points') || '0'); },
  addPoints(n)       { localStorage.setItem('eq_points', this.getPoints() + n); },
  subPoints(n)       { localStorage.setItem('eq_points', Math.max(0, this.getPoints() - n)); },
  getTasksDone()     { return Object.values(JSON.parse(localStorage.getItem('eq_tasks_' + _today()) || '{}')).filter(Boolean).length; },
  getTaskChecks()    { return JSON.parse(localStorage.getItem('eq_tasks_' + _today()) || '{}'); },
  saveTaskChecks(d)  { localStorage.setItem('eq_tasks_' + _today(), JSON.stringify(d)); },
  getQuizCount()     { return Object.values(JSON.parse(localStorage.getItem('eq_quiz_progress') || '{}')).filter(p => p && p.stars > 0).length; },
  getQuizProgress()  { return JSON.parse(localStorage.getItem('eq_quiz_progress') || '{}'); },
  saveQuizProgress(d){ localStorage.setItem('eq_quiz_progress', JSON.stringify(d)); },
  getReportCount()   { return parseInt(localStorage.getItem('eq_report_count') || '0'); },
  incReportCount()   { localStorage.setItem('eq_report_count', this.getReportCount() + 1); },
};

// ── Auth helpers (Supabase) ───────────────────────────────
const EcoAuth = {

  async getSession() {
    const { data: { session } } = await window._sb.auth.getSession();
    return session;
  },

  getUserName(session) {
    return session?.user?.user_metadata?.display_name
        || localStorage.getItem('eq_user_name')
        || session?.user?.email?.split('@')[0]
        || 'Eco Hero';
  },

  // Redirects to login if not signed in
  async requireAuth() {
    const session = await this.getSession();
    if (!session) { window.location.href = 'index.html'; return null; }
    return session;
  },

  async logout() {
    await window._sb.auth.signOut();
    window.location.href = 'index.html';
  },

  async initHeader(activePage) {
    const session = await this.requireAuth();
    if (!session) return null;

    const name = this.getUserName(session);
    const pts  = EcoStats.getPoints();

    const nameEl    = document.getElementById('hName');
    const ptsEl     = document.getElementById('hPts');
    const pillEl    = document.getElementById('userPill');
    const logoutBtn = document.getElementById('logoutBtn');
    const mainNav   = document.getElementById('mainNav');

    if (nameEl)    nameEl.textContent    = name;
    if (ptsEl)     ptsEl.textContent     = pts + ' pts';
    if (pillEl)    pillEl.style.display  = 'flex';
    if (logoutBtn) logoutBtn.style.display = '';
    if (mainNav)   mainNav.style.display  = 'flex';

    const pages = ['home', 'quiz', 'calculator', 'report'];
    document.querySelectorAll('.nav-tab').forEach((tab, i) => {
      tab.classList.toggle('active', pages[i] === activePage);
    });

    applyTheme(_currentTheme);
    return { session, name };
  },
};
