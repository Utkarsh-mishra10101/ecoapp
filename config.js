// ============================================================
// config.js — EcoQuest Configuration (Supabase edition)
// ✅ Edit ONLY this file to update ALL pages at once.
// Find your keys at: supabase.com → your project → Settings → API
// ============================================================

const CONFIG = {

  // ── Supabase ──────────────────────────────────────────────
  // Settings → API → Project URL
  SUPABASE_URL: 'https://opniurlkklspxxfuwbhw.supabase.co',

  // Settings → API → Project API Keys → anon / public
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wbml1cmxra2xzcHh4ZnV3Ymh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTUwMDIsImV4cCI6MjA5MDAzMTAwMn0.eWg4TgX98n1XjptwBb4MyMeMDXYzbFvxAtU42zQvBnM',

  // ── EmailJS ───────────────────────────────────────────────
  EMAILJS_PUBLIC_KEY:  'npf-cULIJ9CqsFX1p',
  EMAILJS_SERVICE_ID:  'service_q9ij2dg',
  EMAILJS_TEMPLATE_ID: 'template_9wc3bsg',

  // ── Supabase Storage bucket name ─────────────────────────
  // Storage → Create a bucket with this exact name
  STORAGE_BUCKET: 'garbage-photos',

  // ── Supabase Database table name ─────────────────────────
  // Table Editor → Create table with this exact name
  REPORTS_TABLE: 'reports',
};

// ── Supabase client init (shared by ALL pages) ────────────
// At the bottom of config.js
// Initialize the Supabase client and attach it to the window object
// so that auth.js and index.html can find it as "window._sb"
// Remove the old const { createClient } = supabase; line
// Use this instead at the very bottom:

// At the very bottom of config.js
(function init() {
  if (window.supabase) {
    // This creates the global variable your other files need
    window._sb = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
    console.log("✅ Supabase is ready!");
  } else {
    // If not ready, wait 50ms and try again
    setTimeout(init, 50);
  }
})();
