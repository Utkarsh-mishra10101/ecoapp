// ============================================================
// report.js — Garbage Reporter (Supabase edition)
// ✅ All keys come from config.js — never edit this file
//    when updating your Supabase project settings.
//
// Flow:
//  1. Photo  → Supabase Storage bucket  (CONFIG.STORAGE_BUCKET)
//  2. Report → Supabase Database table  (CONFIG.REPORTS_TABLE)
//  3. Email  → EmailJS → municipality inbox
// ============================================================

let _reportPhotoFile = null;

// ── Photo preview ──────────────────────────────────────────
function previewPhoto(e) {
  const file = e.target.files[0];
  if (!file) return;
  _reportPhotoFile = file;
  const reader = new FileReader();
  reader.onload = ev => {
    const img = document.getElementById('photoPreview');
    img.src = ev.target.result;
    img.style.display = 'block';
  };
  reader.readAsDataURL(file);
}

// ── Submit report ──────────────────────────────────────────
async function submitReport() {
  const locationVal = document.getElementById('rLocation').value.trim();
  const category    = document.getElementById('rType').value;
  const desc        = document.getElementById('rDesc').value.trim();
  const btn         = document.getElementById('submitBtn');

  if (!locationVal) { toast('Please enter a location.', 'info'); return; }
  if (!_reportPhotoFile) { toast('Please add a photo.', 'info'); return; }

  btn.disabled = true;
  btn.textContent = '⏳ Submitting…';

  try {
    // ── A. Upload photo to Supabase Storage ────────────────
    const fileName = Date.now() + '-' + _reportPhotoFile.name.replace(/\s+/g, '_');

    const { data: uploadData, error: uploadError } = await window._sb
      .storage
      .from(CONFIG.STORAGE_BUCKET)
      .upload(fileName, _reportPhotoFile, { upsert: false });

    if (uploadError) throw new Error('Storage: ' + uploadError.message);

    // Get public URL
    const { data: urlData } = window._sb
      .storage
      .from(CONFIG.STORAGE_BUCKET)
      .getPublicUrl(fileName);

    const imageUrl = urlData.publicUrl;

    // ── B. Save report row to Supabase Database ────────────
    const { error: dbError } = await window._sb
      .from(CONFIG.REPORTS_TABLE)
      .insert([{
        location:    locationVal,
        category:    category,
        description: desc,
        image_url:   imageUrl,
        status:      'pending',
        // reporter_id: window._sb.auth.getUser() — optional
      }]);

    if (dbError) throw new Error('Database: ' + dbError.message);

    // ── C. Send email via EmailJS ──────────────────────────
    await emailjs.send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_ID, {
      location:    locationVal,
      category:    category,
      image_link:  imageUrl,
      description: desc || 'No additional description.',
      report_time: new Date().toLocaleString('en-IN'),
    });

    // ── D. Update local stats ──────────────────────────────
    EcoStats.incReportCount();
    EcoStats.addPoints(15);
    const hPts = document.getElementById('hPts');
    if (hPts) hPts.textContent = EcoStats.getPoints() + ' pts';

    // Save local copy for display in the list below the form
    const saved = JSON.parse(localStorage.getItem('eq_local_reports') || '[]');
    saved.unshift({
      location: locationVal, category, desc,
      imageUrl, date: new Date().toLocaleString('en-IN'), status: 'pending'
    });
    localStorage.setItem('eq_local_reports', JSON.stringify(saved.slice(0, 20)));

    toast('Report submitted! Municipality notified. +15 pts 🌱', 'success');
    clearReport();
    renderLocalReports();

  } catch (err) {
    console.error('Report error:', err);
    toast('Error: ' + err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = '📤 Submit to Municipality';
  }
}

// ── Clear form ─────────────────────────────────────────────
function clearReport() {
  document.getElementById('rLocation').value             = '';
  document.getElementById('rDesc').value                 = '';
  document.getElementById('rType').value                 = 'Garbage dumping';
  document.getElementById('photoPreview').style.display  = 'none';
  document.getElementById('photoInput').value            = '';
  _reportPhotoFile = null;
}

// ── Render local reports list ──────────────────────────────
function renderLocalReports() {
  const list = document.getElementById('reportList');
  if (!list) return;
  const reports = JSON.parse(localStorage.getItem('eq_local_reports') || '[]');
  if (!reports.length) {
    list.innerHTML = `
      <div style="color:var(--muted);font-size:13px;text-align:center;padding:30px;">
        No reports yet — be the first to report a pollution issue! 🌱
      </div>`;
    return;
  }
  list.innerHTML = reports.map(r => `
    <div class="report-card">
      <div class="report-card-top">
        ${r.imageUrl
          ? `<img src="${r.imageUrl}" class="report-card-img" alt="Photo"/>`
          : `<div class="report-card-img" style="background:var(--surface2);display:flex;
              align-items:center;justify-content:center;font-size:28px;">📍</div>`}
        <div class="report-card-info">
          <div class="report-card-title">${r.category}</div>
          <div class="report-card-meta">📍 ${r.location}<br>🕐 ${r.date}</div>
          <div class="report-status status-pending">⏳ Pending</div>
          ${r.desc ? `<div style="font-size:11px;color:var(--muted);margin-top:5px;
            line-height:1.5;">${r.desc}</div>` : ''}
        </div>
      </div>
    </div>`).join('');
}
