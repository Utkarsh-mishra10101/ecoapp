// ============================================================
// quiz.js — All 10 levels of Eco Quiz + Quiz Engine
// ============================================================

const ALL_LEVELS = [
  {
    level:1, title:"Green Basics", desc:"Everyday eco essentials", pts:10, color:"#4caf50",
    qs:[
      {q:"Which vehicle produces zero direct CO₂ emissions?",opts:["Motorbike","Electric car","Diesel car","Petrol car"],ans:"Electric car"},
      {q:"What should you do with lights when leaving a room?",opts:["Leave them on","Switch them off","Dim them","Doesn't matter"],ans:"Switch them off"},
      {q:"Which bin should food waste go in?",opts:["Blue bin","Yellow bin","Green/wet bin","Red bin"],ans:"Green/wet bin"},
      {q:"What does 'reduce, reuse, recycle' mean?",opts:["A government scheme","3 ways to cut waste","A recycling brand","None of these"],ans:"3 ways to cut waste"},
      {q:"Which material takes the longest to decompose in a landfill?",opts:["Paper","Glass","Plastic bag","Banana peel"],ans:"Glass"},
      {q:"What is the main benefit of using a reusable bag?",opts:["It looks better","Reduces single-use plastic","Costs less","Holds more items"],ans:"Reduces single-use plastic"},
      {q:"How can you save water while brushing your teeth?",opts:["Use hot water","Turn off the tap","Brush faster","Use less toothpaste"],ans:"Turn off the tap"},
      {q:"Which of these is a renewable energy source?",opts:["Coal","Natural gas","Solar","Oil"],ans:"Solar"},
      {q:"What does an eco-friendly diet include less of?",opts:["Vegetables","Fruits","Meat","Grains"],ans:"Meat"},
      {q:"Carpooling helps the environment by...",opts:["Reducing traffic noise","Cutting fuel consumption per person","Making commutes longer","Adding more cars"],ans:"Cutting fuel consumption per person"},
    ]
  },
  {
    level:2, title:"Carbon Basics", desc:"Understanding your footprint", pts:12, color:"#66bb6a",
    qs:[
      {q:"What is a carbon footprint?",opts:["A footprint made of carbon","Total greenhouse gases from activities","Size of a coal mine","Carbon tax paid"],ans:"Total greenhouse gases from activities"},
      {q:"Which food has the highest carbon footprint per kg?",opts:["Rice","Lentils","Beef","Tomatoes"],ans:"Beef"},
      {q:"What percentage of the Earth is covered by forests?",opts:["10%","31%","52%","70%"],ans:"31%"},
      {q:"CO₂ stands for...",opts:["Carbon monoxide","Carbon dioxide","Calcium oxide","Chlorine dioxide"],ans:"Carbon dioxide"},
      {q:"Which appliance typically uses the most electricity at home?",opts:["Phone charger","LED bulb","Air conditioner","Radio"],ans:"Air conditioner"},
      {q:"What is deforestation?",opts:["Planting more trees","Clearing forests for land","Pruning trees","Studying forests"],ans:"Clearing forests for land"},
      {q:"Which gas makes up the largest portion of Earth's atmosphere?",opts:["Oxygen","Carbon dioxide","Nitrogen","Argon"],ans:"Nitrogen"},
      {q:"A vegetarian diet emits roughly how much less CO₂ than a meat diet?",opts:["5%","20%","50%","90%"],ans:"50%"},
      {q:"What is the greenhouse effect?",opts:["Gases trapping heat in the atmosphere","Heat from greenhouses","A farming technique","Sunlight creating heat"],ans:"Gases trapping heat in the atmosphere"},
      {q:"Which country emits the most total CO₂ annually?",opts:["USA","India","China","Russia"],ans:"China"},
    ]
  },
  {
    level:3, title:"Eco Actions", desc:"What you can actually do", pts:14, color:"#81c784",
    qs:[
      {q:"Which mode of transport is most eco-friendly per km?",opts:["Car","Plane","Cycling","Motorbike"],ans:"Cycling"},
      {q:"What is composting?",opts:["Burning waste","Turning organic waste into fertiliser","Recycling plastics","Washing recyclables"],ans:"Turning organic waste into fertiliser"},
      {q:"LED bulbs use how much less energy than incandescent bulbs?",opts:["10% less","25% less","75% less","50% less"],ans:"75% less"},
      {q:"Which is better for the environment — a shower or a bath?",opts:["Bath","Shower","Same impact","Depends on season"],ans:"Shower"},
      {q:"What does a 5-minute shorter shower save per month?",opts:["1 litre","Negligible","Up to 150 litres","50 ml"],ans:"Up to 150 litres"},
      {q:"Buying local produce helps the environment because...",opts:["It tastes better","It reduces transport emissions","It is cheaper","It is organic"],ans:"It reduces transport emissions"},
      {q:"Which packaging is most easily recyclable?",opts:["Styrofoam","Multi-layer plastic","Cardboard","Plastic film"],ans:"Cardboard"},
      {q:"What does 'fast fashion' contribute to?",opts:["Better clothing quality","Lower emissions","Textile waste and pollution","Sustainable jobs"],ans:"Textile waste and pollution"},
      {q:"How does taking public transport help the environment?",opts:["It doesn't","Fewer vehicles on road per person","Faster travel","Less fuel globally"],ans:"Fewer vehicles on road per person"},
      {q:"What is upcycling?",opts:["Recycling upstream","Reusing waste creatively into something better","Burning waste for energy","Donating old items"],ans:"Reusing waste creatively into something better"},
    ]
  },
  {
    level:4, title:"Climate Science", desc:"How the planet actually works", pts:16, color:"#a5d6a7",
    qs:[
      {q:"What causes the ozone hole?",opts:["CO₂ emissions","CFCs from aerosols and refrigerants","Methane from cattle","Nitrogen oxides from cars"],ans:"CFCs from aerosols and refrigerants"},
      {q:"What is the Paris Agreement?",opts:["A trade deal","A global climate treaty to limit warming","A European energy policy","A solar energy initiative"],ans:"A global climate treaty to limit warming"},
      {q:"By how many degrees has Earth's average temperature risen since pre-industrial times?",opts:["0.2°C","1.1°C","3°C","5°C"],ans:"1.1°C"},
      {q:"Which gas is 80x more potent than CO₂ over 20 years?",opts:["Nitrous oxide","Water vapour","Methane","Ozone"],ans:"Methane"},
      {q:"What is ocean acidification caused by?",opts:["Plastic pollution","CO₂ dissolving into seawater","Oil spills","Overfishing"],ans:"CO₂ dissolving into seawater"},
      {q:"What percentage of global CO₂ emissions are absorbed by oceans?",opts:["5%","15%","25%","50%"],ans:"25%"},
      {q:"What is the IPCC?",opts:["International Petroleum Carbon Council","Intergovernmental Panel on Climate Change","India's climate body","A solar energy org"],ans:"Intergovernmental Panel on Climate Change"},
      {q:"Which sector globally emits the most greenhouse gases?",opts:["Transport","Industry","Agriculture","Energy/Electricity"],ans:"Energy/Electricity"},
      {q:"What is albedo in climate science?",opts:["A type of cloud","Reflectivity of Earth's surface","Carbon storage capacity","Ice thickness"],ans:"Reflectivity of Earth's surface"},
      {q:"How long does CO₂ persist in the atmosphere?",opts:["Days","Months","Decades to centuries","1 year"],ans:"Decades to centuries"},
    ]
  },
  {
    level:5, title:"Biodiversity", desc:"Life on Earth matters", pts:18, color:"#c8e6c9",
    qs:[
      {q:"What percentage of species could go extinct due to climate change by 2050?",opts:["1%","5%","15-37%","60%"],ans:"15-37%"},
      {q:"Which biome stores the most carbon?",opts:["Desert","Grassland","Tropical rainforest","Tundra"],ans:"Tropical rainforest"},
      {q:"What is a keystone species?",opts:["A species at risk","One that has a disproportionate effect on its ecosystem","The largest animal","A newly discovered species"],ans:"One that has a disproportionate effect on its ecosystem"},
      {q:"Why are bees critical to the environment?",opts:["They produce honey","They pollinate crops","They clean air","They eat pests"],ans:"They pollinate crops"},
      {q:"What is coral bleaching caused by?",opts:["Sunscreen pollution","Warming sea temperatures","Oil spills","Cold currents"],ans:"Warming sea temperatures"},
      {q:"What fraction of our food supply depends on pollinators?",opts:["1/10","1/4","1/3","1/2"],ans:"1/3"},
      {q:"What is rewilding?",opts:["Making land wild again to restore ecosystems","Breeding animals in captivity","Hunting regulation","Reforestation only"],ans:"Making land wild again to restore ecosystems"},
      {q:"Which ocean zone has the highest biodiversity?",opts:["Open ocean","Deep sea","Coral reef","Polar sea"],ans:"Coral reef"},
      {q:"What causes dead zones in oceans?",opts:["Overfishing","Agricultural runoff causing algae blooms","Submarine activity","Plastic waste"],ans:"Agricultural runoff causing algae blooms"},
      {q:"How many species are estimated to be on Earth?",opts:["100,000","1 million","8-10 million","100 million"],ans:"8-10 million"},
    ]
  },
  {
    level:6, title:"Pollution", desc:"Types, causes and solutions", pts:20, color:"#ffcc80",
    qs:[
      {q:"What is the primary source of microplastics in oceans?",opts:["Industrial waste","Synthetic clothing fibres when washed","Oil spills","Food packaging"],ans:"Synthetic clothing fibres when washed"},
      {q:"What is PM2.5?",opts:["A type of fuel","Fine particulate air pollutants under 2.5 microns","A pollution index","A chemical compound"],ans:"Fine particulate air pollutants under 2.5 microns"},
      {q:"Which Indian city frequently tops global air pollution rankings?",opts:["Mumbai","Bengaluru","Delhi","Chennai"],ans:"Delhi"},
      {q:"What is eutrophication?",opts:["Water freezing in rivers","Excess nutrients causing algae overgrowth in water","Saltwater intrusion","Acid rain in water bodies"],ans:"Excess nutrients causing algae overgrowth in water"},
      {q:"Which gas is the main cause of acid rain?",opts:["CO₂","Methane","Sulphur dioxide","Ozone"],ans:"Sulphur dioxide"},
      {q:"How long does a plastic bottle take to decompose?",opts:["1 year","10 years","100 years","450+ years"],ans:"450+ years"},
      {q:"What is light pollution?",opts:["Pollution from luminous materials","Excessive artificial light disrupting ecosystems","Reflective building surfaces","Neon sign toxins"],ans:"Excessive artificial light disrupting ecosystems"},
      {q:"What is the Great Pacific Garbage Patch?",opts:["A volcanic island","A massive floating plastic debris zone","An oil spill site","A coral reef"],ans:"A massive floating plastic debris zone"},
      {q:"Which country generates the most plastic waste per capita?",opts:["China","India","USA","Germany"],ans:"USA"},
      {q:"What does bioremediation mean?",opts:["Building eco-homes","Using living organisms to clean polluted environments","Recycling biomass","Water filtration"],ans:"Using living organisms to clean polluted environments"},
    ]
  },
  {
    level:7, title:"Renewable Energy", desc:"Powering a clean future", pts:22, color:"#ffb74d",
    qs:[
      {q:"What is the most widely installed renewable energy source worldwide?",opts:["Solar","Wind","Hydro","Geothermal"],ans:"Hydro"},
      {q:"How much of India's electricity came from renewables in 2023?",opts:["10%","22%","42%","60%"],ans:"42%"},
      {q:"What is the capacity factor of solar panels on average?",opts:["5-10%","15-25%","50-60%","80-90%"],ans:"15-25%"},
      {q:"What is green hydrogen?",opts:["Hydrogen from natural gas","Hydrogen produced using renewable electricity","A type of nuclear fuel","Hydrogen from coal"],ans:"Hydrogen produced using renewable electricity"},
      {q:"Which country generates the most geothermal energy?",opts:["Iceland","Japan","USA","Kenya"],ans:"USA"},
      {q:"What is net metering in solar energy?",opts:["Measuring solar intensity","Selling excess solar power back to the grid","Calculating roof size","Monitoring panel efficiency"],ans:"Selling excess solar power back to the grid"},
      {q:"How long do most solar panels last?",opts:["5-10 years","15-20 years","25-30 years","50+ years"],ans:"25-30 years"},
      {q:"What is a peaker plant in power systems?",opts:["The most efficient plant","A plant used only during peak demand","The tallest power station","A nuclear facility"],ans:"A plant used only during peak demand"},
      {q:"What is levelised cost of energy (LCOE)?",opts:["Monthly electricity bill","Average cost to generate 1 unit over a plant's lifetime","Tax on energy production","Grid connection fee"],ans:"Average cost to generate 1 unit over a plant's lifetime"},
      {q:"Which renewable has the highest land use per unit of energy?",opts:["Solar","Wind","Hydro","Biomass"],ans:"Biomass"},
    ]
  },
  {
    level:8, title:"Sustainability", desc:"Systems thinking for the planet", pts:24, color:"#ff8a65",
    qs:[
      {q:"What is a circular economy?",opts:["Economy shaped like a circle","System where materials are kept in use as long as possible","Only using renewable energy","Trading goods in circles"],ans:"System where materials are kept in use as long as possible"},
      {q:"What does ESG stand for?",opts:["Energy, Safety, Growth","Environmental, Social, Governance","Economic Standards Group","Eco Sustainability Goals"],ans:"Environmental, Social, Governance"},
      {q:"What is greenwashing?",opts:["Washing clothes in green water","Misleading environmental claims by companies","Cleaning with eco products","Green building certification"],ans:"Misleading environmental claims by companies"},
      {q:"What is a carbon offset?",opts:["A carbon tax","Compensating emissions by funding reductions elsewhere","Reducing emissions directly","A carbon trading penalty"],ans:"Compensating emissions by funding reductions elsewhere"},
      {q:"What does LEED certification mean for buildings?",opts:["Legal Energy Efficiency Document","Leadership in Energy and Environmental Design","Low Energy Electrical Design","Licensed Energy Expert Designation"],ans:"Leadership in Energy and Environmental Design"},
      {q:"What is regenerative agriculture?",opts:["Farming using robots","Farming that restores soil health and sequesters carbon","Organic farming only","Hydroponic farming"],ans:"Farming that restores soil health and sequesters carbon"},
      {q:"What is urban heat island effect?",opts:["Deserts near cities","Cities being significantly warmer than surrounding areas","Industrial heat zones","Underground heat storage"],ans:"Cities being significantly warmer than surrounding areas"},
      {q:"What are Scope 1, 2 and 3 emissions?",opts:["Global emission tiers","Direct, indirect, and value-chain company emissions","Three pollution types","Government classification levels"],ans:"Direct, indirect, and value-chain company emissions"},
      {q:"What is carbon neutrality?",opts:["Using no carbon at all","Balancing CO₂ produced with CO₂ removed","Only using clean energy","Zero industrial activity"],ans:"Balancing CO₂ produced with CO₂ removed"},
      {q:"What is the concept of planetary boundaries?",opts:["Earth's physical borders","Safe limits within which humanity can thrive","National environmental laws","Ocean boundaries"],ans:"Safe limits within which humanity can thrive"},
    ]
  },
  {
    level:9, title:"Climate Policy", desc:"How the world governs this", pts:26, color:"#ef9a9a",
    qs:[
      {q:"When was the Paris Agreement signed?",opts:["2009","2012","2015","2018"],ans:"2015"},
      {q:"What does NDC stand for in climate policy?",opts:["National Development Committee","Nationally Determined Contribution","Net-zero Development Charter","Non-Domestic Carbon"],ans:"Nationally Determined Contribution"},
      {q:"What is carbon pricing?",opts:["Cost of carbon credit cards","Putting a fee on greenhouse gas emissions","Price of carbon fibre","Valuing carbon in products"],ans:"Putting a fee on greenhouse gas emissions"},
      {q:"Which was the first country to declare a climate emergency?",opts:["Sweden","UK","Germany","Australia"],ans:"UK"},
      {q:"What year does the EU aim to reach climate neutrality?",opts:["2030","2040","2050","2060"],ans:"2050"},
      {q:"What is UNFCCC?",opts:["UN Fund for Climate Change","UN Framework Convention on Climate Change","United Nations Forest Carbon Committee","Universal Climate Finance Charter"],ans:"UN Framework Convention on Climate Change"},
      {q:"What is a carbon border adjustment mechanism?",opts:["Tariff on carbon-intensive imports","Border fence maintenance fee","Carbon credit exchange rate","Environmental customs duty only"],ans:"Tariff on carbon-intensive imports"},
      {q:"What is climate justice?",opts:["Suing polluters","Ensuring vulnerable communities are protected from climate impacts","Environmental law","Clean energy rights"],ans:"Ensuring vulnerable communities are protected from climate impacts"},
      {q:"What did the Kyoto Protocol require developed nations to do?",opts:["Plant more trees","Reduce greenhouse gas emissions by binding targets","Fund renewables globally","Ban nuclear energy"],ans:"Reduce greenhouse gas emissions by binding targets"},
      {q:"What is loss and damage in climate negotiations?",opts:["Property damage from storms","Financial compensation for climate-related losses in developing nations","Insurance claims","Agricultural losses only"],ans:"Financial compensation for climate-related losses in developing nations"},
    ]
  },
  {
    level:10, title:"Expert Level", desc:"Only true eco-champions pass", pts:30, color:"#b39ddb",
    qs:[
      {q:"What is the social cost of carbon?",opts:["Tax rate on carbon","Economic cost of emitting one tonne of CO₂","Social media campaign cost","Price of carbon offsets"],ans:"Economic cost of emitting one tonne of CO₂"},
      {q:"What fraction of global methane emissions come from livestock?",opts:["5%","14%","30%","45%"],ans:"14%"},
      {q:"What is the approximate CO₂ concentration in today's atmosphere?",opts:["280 ppm","350 ppm","420 ppm","500 ppm"],ans:"420 ppm"},
      {q:"What is stratospheric aerosol injection?",opts:["Spraying chemicals for crops","Reflecting sunlight by injecting particles into the stratosphere","High-altitude wind energy","Ozone layer repair technique"],ans:"Reflecting sunlight by injecting particles into the stratosphere"},
      {q:"Which feedback loop amplifies warming by melting permafrost?",opts:["Albedo feedback","Methane release from thawing permafrost","Water vapour feedback","Cloud formation feedback"],ans:"Methane release from thawing permafrost"},
      {q:"What is the Keeling Curve?",opts:["A climate model","Record of atmospheric CO₂ concentration over time","A weather prediction graph","Measurement of ocean acidity"],ans:"Record of atmospheric CO₂ concentration over time"},
      {q:"What is Direct Air Capture (DAC)?",opts:["Capturing solar energy","Technology removing CO₂ directly from the atmosphere","Air conditioning system","Drone-based deforestation monitoring"],ans:"Technology removing CO₂ directly from the atmosphere"},
      {q:"What percentage of global freshwater is available for human use?",opts:["70%","30%","10%","0.3%"],ans:"0.3%"},
      {q:"What is the EKC (Environmental Kuznets Curve) hypothesis?",opts:["Pollution decreases as income rises beyond a point","Pollution always increases with GDP","Eco tax and income are equal","Carbon credits price curve"],ans:"Pollution decreases as income rises beyond a point"},
      {q:"What causes thermohaline circulation to slow down?",opts:["El Niño patterns","Freshwater from melting ice diluting salt concentration","Volcanic activity","Solar wind changes"],ans:"Freshwater from melting ice diluting salt concentration"},
    ]
  },
];

// ── Quiz Engine ────────────────────────────────────────────
let qLevel = 0, qIdx = 0, qScore = 0;
let quizProgress = EcoStats.getQuizProgress();

function starsFromPct(p) { return p >= 90 ? 3 : p >= 60 ? 2 : p >= 40 ? 1 : 0; }
function starString(n)   { return '⭐'.repeat(n) + '☆'.repeat(3 - n); }
function isUnlocked(i)   { if (i === 0) return true; const p = quizProgress[i-1]; return p && p.stars >= 1; }

function initQuiz() {
  quizProgress = EcoStats.getQuizProgress();
  document.getElementById('qLevelSelect').style.display = 'block';
  document.getElementById('qPlay').style.display        = 'none';
  renderLevelGrid();
}

function renderLevelGrid() {
  const grid = document.getElementById('qLevelGrid');
  grid.innerHTML = '';
  ALL_LEVELS.forEach((lv, i) => {
    const prog   = quizProgress[i] || {};
    const locked = !isUnlocked(i);
    const stars  = prog.stars || 0;
    const best   = prog.bestScore || 0;
    const div    = document.createElement('div');
    div.className = 'level-card' + (locked ? ' locked' : stars > 0 ? ' completed' : '');
    div.innerHTML =
      `<div class="level-badge">${locked ? '🔒' : stars === 3 ? '🏆' : stars > 0 ? '✓' : ''}</div>` +
      `<div class="level-num">Lvl ${i+1}</div>` +
      `<div class="level-stars">${starString(stars)}</div>` +
      `<div class="level-title">${lv.title}</div>` +
      `<div class="level-sub">${lv.desc}</div>` +
      `<div class="level-pts" style="background:${lv.color}22;color:${lv.color};">${lv.pts} pts/q</div>` +
      (best > 0 ? `<div style="font-size:9px;color:var(--muted);margin-top:4px;">Best: ${best}%</div>` : '');
    div.onclick = locked
      ? () => toast('Complete Level ' + i + ' first to unlock!', 'info')
      : () => startLevel(i);
    grid.appendChild(div);
  });
}

function startLevel(idx) {
  qLevel = idx; qIdx = 0; qScore = 0;
  const lv = ALL_LEVELS[idx];
  document.getElementById('qLevelSelect').style.display = 'none';
  document.getElementById('qPlay').style.display        = 'block';
  document.getElementById('qLevelBadge').textContent    = `Level ${idx+1} — ${lv.title}`;
  document.getElementById('qActive').style.display      = '';
  document.getElementById('qDone').classList.add('hidden');
  document.getElementById('qNext').style.display        = 'none';
  loadQ();
}

function loadQ() {
  const lv = ALL_LEVELS[qLevel], q = lv.qs[qIdx];
  document.getElementById('qProg').style.width  = ((qIdx / lv.qs.length) * 100) + '%';
  document.getElementById('qCount').textContent = `Question ${qIdx+1} / ${lv.qs.length}`;
  document.getElementById('qText').textContent  = q.q;
  const opts = document.getElementById('qOpts');
  opts.innerHTML = '';
  q.opts.forEach(o => {
    const d = document.createElement('div');
    d.className = 'option'; d.textContent = o;
    d.onclick = () => pickQ(d, q.ans, lv.pts);
    opts.appendChild(d);
  });
}

function pickQ(el, correct, pts) {
  document.querySelectorAll('.option').forEach(o => o.onclick = null);
  if (el.textContent === correct) {
    el.classList.add('correct'); qScore += pts;
    EcoStats.addPoints(pts);
    const hPts = document.getElementById('hPts');
    if (hPts) hPts.textContent = EcoStats.getPoints() + ' pts';
  } else {
    el.classList.add('wrong');
    document.querySelectorAll('.option').forEach(o => { if (o.textContent === correct) o.classList.add('correct'); });
  }
  document.getElementById('qNext').style.display = '';
}

function nextQ() {
  qIdx++;
  document.getElementById('qNext').style.display = 'none';
  if (qIdx < ALL_LEVELS[qLevel].qs.length) loadQ(); else finishQ();
}

function finishQ() {
  const lv       = ALL_LEVELS[qLevel];
  const maxScore = lv.qs.length * lv.pts;
  const pct      = Math.round((qScore / maxScore) * 100);
  const stars    = starsFromPct(pct);
  const prev     = quizProgress[qLevel] || {};
  quizProgress[qLevel] = { stars: Math.max(prev.stars||0, stars), bestScore: Math.max(prev.bestScore||0, pct), unlocked: true };
  if (stars >= 1 && qLevel + 1 < ALL_LEVELS.length) {
    if (!quizProgress[qLevel+1]) quizProgress[qLevel+1] = {};
    quizProgress[qLevel+1].unlocked = true;
  }
  EcoStats.saveQuizProgress(quizProgress);
  document.getElementById('qProg').style.width          = '100%';
  document.getElementById('qActive').style.display      = 'none';
  document.getElementById('qDone').classList.remove('hidden');
  const msg = pct>=90?'🏆 Perfect! Eco Champion!':pct>=70?'🌟 Excellent!':pct>=50?'🌿 Good effort!':'🌱 Keep going!';
  document.getElementById('qScoreBig').textContent = `${qScore} / ${maxScore} pts`;
  document.getElementById('qScoreSub').textContent = `${msg} (${pct}%)`;
  document.getElementById('qStarRow').textContent  = starString(stars);
  document.getElementById('qNextLvlBtn').style.display = (stars >= 1 && qLevel+1 < ALL_LEVELS.length) ? '' : 'none';
}

function replayLevel()   { startLevel(qLevel); }
function nextLevel()     { startLevel(qLevel + 1); }
function qBackToLevels() {
  document.getElementById('qLevelSelect').style.display = 'block';
  document.getElementById('qPlay').style.display        = 'none';
  renderLevelGrid();
}
