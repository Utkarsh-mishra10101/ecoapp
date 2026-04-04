// ============================================================
// calculator.js — Carbon Footprint Calculator
// ============================================================

const EF   = { car:0.20, motorbike:0.09, bus:0.05, train:0.04, bicycle:0, walking:0 };
const FOOD = { vegetarian:2.5, mixed:4.5, meat:7.5 };

function getMode() { return document.querySelector('#modePicker .mode-btn.active')?.dataset.mode || 'walking'; }
function getPump() { return document.querySelector('#pumpPicker .mode-btn.active')?.dataset.val  || 'no'; }

function calculate() {
  const dist  = parseFloat(document.getElementById('calcDist').value) || 0;
  const diet  = document.getElementById('calcDiet').value;
  const ac    = parseFloat(document.getElementById('calcAC').value)   || 0;
  const fan   = parseFloat(document.getElementById('calcFan').value)  || 0;
  const pump  = getPump();

  const travel = EF[getMode()] * dist;
  const food   = FOOD[diet];
  const elec   = (1.2 * ac + 0.07 * fan) * 0.82;
  const pumpKg = pump === 'occasional' ? 0.41 : pump === 'daily' ? 1.64 : 0;
  const total  = +(travel + food + elec + pumpKg).toFixed(2);
  const annual = +(total * 365).toFixed(0);
  const trees  = Math.ceil(annual / 21);

  document.getElementById('co2Big').textContent  = total + ' kg CO₂/day';
  document.getElementById('bYou').style.height   = Math.min(100, +(total / 14 * 100).toFixed(0)) + '%';
  document.getElementById('bYouV').textContent   = total + ' kg/d';
  document.getElementById('iAnnual').textContent = annual.toLocaleString();
  document.getElementById('iTrees').textContent  = trees;
  document.getElementById('iVs').textContent     = total < 14 ? 'Below avg ✓' : 'Above avg ✗';

  const tr = document.getElementById('treeRow');
  tr.textContent = '🌳'.repeat(Math.min(20, trees));
  if (trees > 20) tr.textContent += ' +' + (trees - 20) + ' more';

  document.getElementById('calcResults').style.display = 'block';
  document.getElementById('calcResults').scrollIntoView({ behavior: 'smooth', block: 'start' });

  EcoStats.addPoints(2);
  const hPts = document.getElementById('hPts');
  if (hPts) hPts.textContent = EcoStats.getPoints() + ' pts';
  toast('Footprint calculated! +2 pts 🌍', 'success');
}

function resetCalc() {
  document.getElementById('calcDist').value = 5;
  document.getElementById('calcAC').value   = 1;
  document.getElementById('calcFan').value  = 4;
  document.getElementById('calcDiet').value = 'mixed';
  document.querySelectorAll('#modePicker .mode-btn').forEach(m => m.classList.remove('active'));
  document.querySelector('#modePicker .mode-btn[data-mode="walking"]').classList.add('active');
  document.querySelectorAll('#pumpPicker .mode-btn').forEach(m => m.classList.remove('active'));
  document.querySelector('#pumpPicker .mode-btn[data-val="no"]').classList.add('active');
  document.getElementById('calcResults').style.display = 'none';
}

function initModeButtons() {
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.mode-group').querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}
