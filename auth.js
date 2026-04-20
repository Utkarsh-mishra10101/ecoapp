// ============================================================
// auth.js — EcoQuest Auth + Stats (Supabase per-user edition)
// ============================================================
// ⚙️  SUPABASE SETUP — Run this SQL in your Supabase SQL Editor
//     to add the required columns to the profiles table:
//
//  ALTER TABLE profiles
//    ADD COLUMN IF NOT EXISTS points       int  DEFAULT 0,
//    ADD COLUMN IF NOT EXISTS quiz_progress jsonb DEFAULT '{}',
//    ADD COLUMN IF NOT EXISTS task_checks   jsonb DEFAULT '{}',
//    ADD COLUMN IF NOT EXISTS task_date     text  DEFAULT '',
//    ADD COLUMN IF NOT EXISTS quiz_count    int  DEFAULT 0,
//    ADD COLUMN IF NOT EXISTS report_count  int  DEFAULT 0;
//
// ============================================================

// ── Themes ────────────────────────────────────────────────────
const THEMES = [
  { id:'retro',   name:'Retro Forest',  bg:'#0d1a0f', surf:'#142018', surf2:'#1c2e1f', acc:'#4ade80', acc2:'#86efac', text:'#e8f5e9', muted:'#6b9171', head:'Press Start 2P' },
  { id:'sakura',  name:'Sakura',        bg:'#1a0a0f', surf:'#2a1018', surf2:'#3a1a23', acc:'#f472b6', acc2:'#fbcfe8', text:'#fdf2f8', muted:'#c084a0', head:'Nanum Myeongjo' },
  { id:'ocean',   name:'Deep Ocean',    bg:'#020d1a', surf:'#071828', surf2:'#0c2540', acc:'#38bdf8', acc2:'#7dd3fc', text:'#e0f2fe', muted:'#4a8fa8', head:'Quicksand' },
  { id:'ember',   name:'Ember',         bg:'#1a0800', surf:'#2a1005', surf2:'#3c1a08', acc:'#fb923c', acc2:'#fdba74', text:'#fff7ed', muted:'#a06030', head:'Nunito' },
  { id:'aurora',  name:'Aurora',        bg:'#07001a', surf:'#0f0528', surf2:'#18083c', acc:'#a78bfa', acc2:'#c4b5fd', text:'#f5f3ff', muted:'#7c5fbc', head:'Playfair Display' },
  { id:'mono',    name:'Mono',          bg:'#111111', surf:'#1c1c1c', surf2:'#282828', acc:'#e5e5e5', acc2:'#ffffff', text:'#f5f5f5', muted:'#888888', head:'Quicksand' },
];

function applyTheme(id) {
  const t = THEMES.find(x => x.id === id) || THEMES[0];
  const r = document.documentElement.style;
  r.setProperty('--bg',      t.bg);
  r.setProperty('--surface', t.surf);
  r.setProperty('--surface2',t.surf2);
  r.setProperty('--accent',  t.acc);
  r.setProperty('--accent2', t.acc2);
  r.setProperty('--text',    t.text);
  r.setProperty('--muted',   t.muted);
  r.setProperty('--font-head', `'${t.head}', sans-serif`);
  localStorage.setItem('eq_theme', id);
}

function openTheme() {
  const grid = document.getElementById('themeGrid');
  if (!grid) return;
  const cur = localStorage.getItem('eq_theme') || 'retro';
  grid.innerHTML = THEMES.map(t => `
    <div class="theme-card${t.id === cur ? ' active' : ''}"
         onclick="applyTheme('${t.id}');document.querySelectorAll('.theme-card').forEach(c=>c.classList.remove('active'));this.classList.add('active')"
         style="background:${t.bg};border:2px solid ${t.id===cur?t.acc:'transparent'};">
      <div style="width:100%;height:28px;border-radius:4px;background:${t.surf};margin-bottom:6px;"></div>
      <div style="width:60%;height:8px;border-radius:4px;background:${t.acc};margin-bottom:4px;"></div>
      <div style="width:80%;height:6px;border-radius:4px;background:${t.surf2};"></div>
      <div style="font-size:9px;color:${t.text};margin-top:8px;font-family:'Quicksand',sans-serif;font-weight:700;">${t.name}</div>
    </div>`).join('');
  document.getElementById('themeOverlay').classList.remove('hidden');
}

function closeTheme(e) {
  if (!e || e.target === document.getElementById('themeOverlay'))
    document.getElementById('themeOverlay').classList.add('hidden');
}

// ── Toast ─────────────────────────────────────────────────────
function toast(msg, type = 'info') {
  let el = document.getElementById('eq-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'eq-toast';
    el.style.cssText = `
      position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(20px);
      padding:10px 20px;border-radius:999px;font-size:12px;font-family:'Quicksand',sans-serif;
      font-weight:700;z-index:9999;opacity:0;transition:all .3s;white-space:nowrap;
      max-width:90vw;text-align:center;pointer-events:none;`;
    document.body.appendChild(el);
  }
  const colors = { success:'#4ade80', error:'#f87171', info:'#7dd3fc' };
  el.textContent = msg;
  el.style.background = colors[type] || colors.info;
  el.style.color = '#000';
  el.style.opacity = '1';
  el.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(el._t);
  el._t = setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-50%) translateY(20px)';
  }, 2800);
}

// ── EcoStats — localStorage cache + Supabase sync ─────────────
//
//  All reads come from localStorage (fast / offline-safe).
//  All writes go to localStorage immediately, then debounce-sync
//  to the Supabase `profiles` row for the current user.
// ─────────────────────────────────────────────────────────────
const EcoStats = (() => {
  const K = {
    pts:      'eq_pts',
    quiz:     'eq_quiz_prog',
    tasks:    'eq_task_checks',
    taskDate: 'eq_task_date',
    quizCnt:  'eq_quiz_cnt',
    repCnt:   'eq_rep_cnt',
  };

  // ── Debounced Supabase sync ──────────────────────────────
  let _syncTimer = null;
  function _scheduleSync() {
    clearTimeout(_syncTimer);
    _syncTimer = setTimeout(_pushToSupabase, 800);
  }

  async function _pushToSupabase() {
    try {
      const { data: { session } } = await window._sb.auth.getSession();
      if (!session) return;
      const uid = session.user.id;
      const payload = {
        points:        _getInt(K.pts),
        quiz_progress: _getJson(K.quiz, {}),
        task_checks:   _getJson(K.tasks, {}),
        task_date:     localStorage.getItem(K.taskDate) || '',
        quiz_count:    _getInt(K.quizCnt),
        report_count:  _getInt(K.repCnt),
      };
      const { error } = await window._sb
        .from('profiles')
        .update(payload)
        .eq('id', uid);
      if (error) console.warn('EcoStats sync error:', error.message);
    } catch (e) {
      console.warn('EcoStats sync failed:', e);
    }
  }

  // ── Load user data from Supabase into localStorage ───────
  async function loadFromDB(uid) {
    const { data, error } = await window._sb
      .from('profiles')
      .select('points,quiz_progress,task_checks,task_date,quiz_count,report_count,name')
      .eq('id', uid)
      .single();
    if (error || !data) return null;

    // Reset daily tasks if it's a new calendar day
    const today = new Date().toDateString();
    const savedDate = data.task_date || '';
    const taskChecks = (savedDate === today) ? (data.task_checks || {}) : {};

    localStorage.setItem(K.pts,      String(data.points      ?? 0));
    localStorage.setItem(K.quiz,     JSON.stringify(data.quiz_progress ?? {}));
    localStorage.setItem(K.tasks,    JSON.stringify(taskChecks));
    localStorage.setItem(K.taskDate, today);
    localStorage.setItem(K.quizCnt,  String(data.quiz_count  ?? 0));
    localStorage.setItem(K.repCnt,   String(data.report_count ?? 0));
    if (data.name) localStorage.setItem('eq_user_name', data.name);

    // If date changed, persist the reset back to DB immediately
    if (savedDate !== today) {
      await window._sb.from('profiles').update({ task_checks: {}, task_date: today }).eq('id', uid);
    }
    return data;
  }

  // ── Helpers ──────────────────────────────────────────────
  function _getInt(key)          { return parseInt(localStorage.getItem(key) || '0', 10); }
  function _setInt(key, val)     { localStorage.setItem(key, String(val)); _scheduleSync(); }
  function _getJson(key, def)    { try { return JSON.parse(localStorage.getItem(key)) || def; } catch { return def; } }
  function _setJson(key, val)    { localStorage.setItem(key, JSON.stringify(val)); _scheduleSync(); }

  // ── Public API ───────────────────────────────────────────
  return {
    loadFromDB,

    getPoints()          { return _getInt(K.pts); },
    addPoints(n)         { _setInt(K.pts, _getInt(K.pts) + n); },
    subPoints(n)         { _setInt(K.pts, Math.max(0, _getInt(K.pts) - n)); },

    getQuizProgress()    { return _getJson(K.quiz, {}); },
    saveQuizProgress(p)  {
      _setJson(K.quiz, p);
      // Increment quiz count when saving new progress
      _setInt(K.quizCnt, _getInt(K.quizCnt) + 1);
    },

    getTaskChecks()      { return _getJson(K.tasks, {}); },
    saveTaskChecks(c)    { _setJson(K.tasks, c); },
    getTasksDone()       {
      const c = _getJson(K.tasks, {});
      return Object.values(c).filter(Boolean).length;
    },

    getQuizCount()       { return _getInt(K.quizCnt); },
    getReportCount()     { return _getInt(K.repCnt); },
    incReportCount()     { _setInt(K.repCnt, _getInt(K.repCnt) + 1); },

    // Force an immediate sync (call after critical operations)
    syncNow()            { clearTimeout(_syncTimer); return _pushToSupabase(); },
  };
})();

// ── EcoAuth ───────────────────────────────────────────────────
const EcoAuth = (() => {

  // Call once per page. Returns { name, uid } or redirects to index.html
  async function initHeader(page) {
    // Apply saved theme immediately
    applyTheme(localStorage.getItem('eq_theme') || 'retro');

    // Wait for Supabase to be ready
    while (!window._sb) await new Promise(r => setTimeout(r, 50));

    const { data: { session } } = await window._sb.auth.getSession();
    if (!session) {
      window.location.href = 'index.html';
      return null;
    }

    // Load latest data from DB (overwrites stale localStorage)
    await EcoStats.loadFromDB(session.user.id);

    const name = localStorage.getItem('eq_user_name') || session.user.email.split('@')[0];
    const pts  = EcoStats.getPoints();

    // Show nav + user pill
    const nav = document.getElementById('mainNav');
    if (nav) nav.style.display = '';

    const pill = document.getElementById('userPill');
    if (pill) pill.style.display = '';

    const hName = document.getElementById('hName');
    if (hName) hName.textContent = name;

    const hPts = document.getElementById('hPts');
    if (hPts) hPts.textContent = pts + ' pts';

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.style.display = '';

    // Mark active nav tab
    document.querySelectorAll('.nav-tab').forEach(a => {
      a.classList.toggle('active', a.href.includes(page));
    });

    return { name, uid: session.user.id };
  }

  async function logout() {
    await EcoStats.syncNow();          // flush any pending writes
    await window._sb.auth.signOut();
    localStorage.removeItem('eq_user_name');
    window.location.href = 'index.html';
  }

  return { initHeader, logout };
})();
