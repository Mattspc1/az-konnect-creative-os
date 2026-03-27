// ═══ AZ KONNECT CREATIVE OS — CORE ═══
const IC = { copy: '<svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>', star: '<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>', check: '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>', dl: '<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>', play: '<svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>', bolt: '<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>', edit: '<svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>', grid: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>', folder: '<svg viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>', plus: '<svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' };
const ANGLES = ['problem', 'curiosity', 'authority', 'social', 'urgency'];
const AL = { problem: 'Problem', curiosity: 'Curiosity', authority: 'Authority', social: 'Social Proof', urgency: 'Urgency' };
const STYLES = ['as-1', 'as-2', 'as-3', 'as-4', 'as-5', 'as-6'];
let C = { company: 'AZ Konnect', product: 'AZ Konnect LIVE', audience: 'Real estate agents', old: 'Cold calling', solution: 'AI-powered calling', metric: '6,500 calls/week', result: '27 meetings booked', price: '$999 one-time', urgency: '72-hour setup', color: '#057ED6', tone: 'confident', niche: 'Real Estate', mode: 'ads', platforms: ['facebook', 'instagram'] };
let HOOKS = [], HEADS = [], PRIMS = [], CTAS = [], COMBOS = [];
let favorites = new Set();

// Toast
function toast(m) { const o = document.querySelector('.toast'); if (o) o.remove(); const t = document.createElement('div'); t.className = 'toast'; t.innerHTML = IC.check + ' ' + m; document.body.appendChild(t); setTimeout(() => t.remove(), 2300) }
function copyText(t, el) { navigator.clipboard.writeText(t).catch(() => { const a = document.createElement('textarea'); a.value = t; a.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(a); a.select(); document.execCommand('copy'); document.body.removeChild(a) }); toast('Copied to clipboard'); if (el) { el.classList.add('copied'); setTimeout(() => el.classList.remove('copied'), 800) } }
function downloadFile(c, f, t) { const b = new Blob([c], { type: t }); const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = f; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(u) }

// Actions HTML
function actionsHTML() { return `<div class="c-card-actions"><button class="c-action act-copy" title="Copy">${IC.copy}</button><button class="c-action act-fav" title="Favorite">${IC.star}</button></div>` }

// Router
document.addEventListener('DOMContentLoaded', () => {
  initRouter(); initModal(); generate(); renderDashboard();
});
function initRouter() {
  document.querySelectorAll('.sb-item[data-view]').forEach(b => { b.addEventListener('click', () => navigateTo(b.dataset.view)) });
}
function navigateTo(v) {
  document.querySelectorAll('.sb-item').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.view').forEach(p => p.classList.remove('active'));
  const btn = document.querySelector(`.sb-item[data-view="${v}"]`); if (btn) btn.classList.add('active');
  document.getElementById('v-' + v).classList.add('active');
  const titles = { dashboard: 'Dashboard', projects: 'Projects', ads: 'Ads Creative', content: 'Content Creation', library: 'Asset Library', brandkit: 'Brand Kit', templates: 'Templates', history: 'History', export: 'Export', settings: 'Settings' };
  document.getElementById('toolbar-title').textContent = titles[v] || v;
  const renderers = { dashboard: renderDashboard, ads: renderAds, content: renderContent, library: renderLibrary, brandkit: renderBrandKit, templates: renderTemplates, history: renderHistory, export: renderExport, projects: renderProjects, settings: renderSettings };
  if (renderers[v]) renderers[v]();
}

// Modal
function openCreateModal() {
  document.getElementById('in-project').value = '';
  document.getElementById('in-company').value = '';
  document.getElementById('in-product').value = '';
  document.getElementById('in-audience').value = '';
  document.getElementById('in-old').value = '';
  document.getElementById('in-solution').value = '';
  document.getElementById('in-metric').value = '';
  document.getElementById('in-result').value = '';
  document.getElementById('in-price').value = '';
  document.getElementById('in-urgency').value = '';
  document.getElementById('in-color').value = '#057ED6';
  document.getElementById('in-tone').value = 'confident';
  document.getElementById('create-overlay').classList.add('open');
}

function initModal() {
  const ov = document.getElementById('create-overlay');
  document.getElementById('btn-create').addEventListener('click', openCreateModal);
  document.getElementById('toolbar-create-btn').addEventListener('click', openCreateModal);
  document.getElementById('create-close').addEventListener('click', () => ov.classList.remove('open'));
  ov.addEventListener('click', e => { if (e.target === ov) ov.classList.remove('open') });
  document.querySelectorAll('.mode-opt').forEach(o => o.addEventListener('click', () => { document.querySelectorAll('.mode-opt').forEach(x => x.classList.remove('selected')); o.classList.add('selected'); C.mode = o.dataset.mode }));
  document.querySelectorAll('.p-chip').forEach(c => c.addEventListener('click', () => { c.classList.toggle('selected') }));
  document.getElementById('btn-go').addEventListener('click', () => {
    C.company = document.getElementById('in-company').value; C.product = document.getElementById('in-product').value;
    C.audience = document.getElementById('in-audience').value; C.old = document.getElementById('in-old').value;
    C.solution = document.getElementById('in-solution').value; C.metric = document.getElementById('in-metric').value;
    C.result = document.getElementById('in-result').value; C.price = document.getElementById('in-price').value;
    C.urgency = document.getElementById('in-urgency').value; C.color = document.getElementById('in-color').value;
    C.tone = document.getElementById('in-tone').value; C.niche = C.audience.replace(/s$/, '').replace(/^.*\s/, '');
    C.platforms = Array.from(document.querySelectorAll('.p-chip.selected')).map(c => c.dataset.platform);
    generate(); saveProject(); document.getElementById('create-overlay').classList.remove('open');
    navigateTo(C.mode === 'ads' ? 'ads' : 'content'); toast('Generated assets for ' + C.company);
  });
}

// ═══ GENERATORS ═══
function generate() { genHooks(); genHeads(); genPrims(); genCTAs(); COMBOS = genCombos(100); }
function genHooks() {
  const a = C.audience.toLowerCase(), o = C.old.toLowerCase(), s1 = a.endsWith('s') ? a.slice(0, -1) : a;
  HOOKS = [
    { id: 1, t: `You're still using ${o} in 2026? There's a better way.`, a: 'problem' },
    { id: 2, t: `${C.old} is costing you time, money, and results. Here's the fix.`, a: 'problem' },
    { id: 3, t: `Your current approach is broken. Here's what ${C.price} gets you instead.`, a: 'problem' },
    { id: 4, t: `Stop wasting resources on ${o} that doesn't deliver.`, a: 'problem' },
    { id: 5, t: `You're falling behind the ${s1} who switched to ${C.solution}.`, a: 'problem' },
    { id: 6, t: `${C.old} is dead. ${C.solution} is the new standard.`, a: 'problem' },
    { id: 7, t: `What happens when you achieve ${C.metric} in 7 days?`, a: 'curiosity' },
    { id: 8, t: `This ${s1} ditched ${o} 6 months ago. Never been busier.`, a: 'curiosity' },
    { id: 9, t: `The top 1% of ${a} don't use ${o}. Here's what they do instead.`, a: 'curiosity' },
    { id: 10, t: `We tested ${C.solution} against ${o}. The results were extraordinary.`, a: 'curiosity' },
    { id: 11, t: `What if ${C.product} could handle ${o} for you automatically?`, a: 'curiosity' },
    { id: 12, t: `There's a smarter way to get results — and it doesn't involve ${o}.`, a: 'curiosity' },
    { id: 13, t: `Built by a team that's helped ${a} succeed since 2020.`, a: 'authority' },
    { id: 14, t: `The ${C.solution} trusted by leading ${a}.`, a: 'authority' },
    { id: 15, t: `${C.product} uses the same strategies as top-performing ${a}.`, a: 'authority' },
    { id: 16, t: `We've helped hundreds of ${a} move beyond ${o}. Here's how.`, a: 'authority' },
    { id: 17, t: `${C.solution} outperforms ${o} by 3x. The data proves it.`, a: 'authority' },
    { id: 18, t: `From the team that's driven massive results for ${a}.`, a: 'authority' },
    { id: 19, t: `${C.metric}. ${C.result}. Week one.`, a: 'social' },
    { id: 20, t: `One ${s1} achieved ${C.result} — completely on autopilot.`, a: 'social' },
    { id: 21, t: `${C.product} delivers ${C.result} faster than you'd think possible.`, a: 'social' },
    { id: 22, t: `Real ${a}. Real results. Zero ${o}.`, a: 'social' },
    { id: 23, t: `See how one ${s1} went from ${o} to ${C.result}.`, a: 'social' },
    { id: 24, t: `From struggling with ${o} to achieving ${C.result}. Here's the story.`, a: 'social' },
    { id: 25, t: `Only 7 spots left for ${C.product} this month.`, a: 'urgency' },
    { id: 26, t: `${C.urgency}. Money-back guarantee.`, a: 'urgency' },
    { id: 27, t: `The market is shifting. Your competitors are switching to ${C.solution}.`, a: 'urgency' },
    { id: 28, t: `Every day you wait on ${o}, your competitors using ${C.solution} pull ahead.`, a: 'urgency' },
    { id: 29, t: `Limited spots available. ${C.urgency}. Don't wait.`, a: 'urgency' },
    { id: 30, t: `${C.urgency}. If ${C.product} doesn't deliver, you pay nothing.`, a: 'urgency' }
  ];
}
function genHeads() {
  HEADS = [
    { id: 1, t: `Stop ${C.old}. Start Closing.`, a: 'problem' }, { id: 2, t: `Your Leads Are Going to Waste`, a: 'problem' },
    { id: 3, t: `Replace the Old Way with ${C.solution}`, a: 'problem' }, { id: 4, t: `Still Doing Things the Hard Way?`, a: 'problem' },
    { id: 5, t: `End ${C.old} Forever`, a: 'problem' }, { id: 6, t: `The High Cost of Manual Outreach`, a: 'problem' },
    { id: 7, t: `The ${C.solution} That Works While You Sleep`, a: 'curiosity' }, { id: 8, t: `What ${C.metric} Looks Like in 1 Week`, a: 'curiosity' },
    { id: 9, t: `Top ${C.audience} Stopped ${C.old}. Here's Why.`, a: 'curiosity' }, { id: 10, t: `Your Next Win Is One Decision Away`, a: 'curiosity' },
    { id: 11, t: `The Secret Weapon Behind Top Performers`, a: 'curiosity' }, { id: 12, t: `${C.solution} Just Changed Everything`, a: 'curiosity' },
    { id: 13, t: `Trusted by Top Performers in ${C.niche}`, a: 'authority' }, { id: 14, t: `Scaling ${C.niche} Sales Since 2020`, a: 'authority' },
    { id: 15, t: `The #1 ${C.solution} Built for ${C.niche}`, a: 'authority' }, { id: 16, t: `Enterprise-Grade AI. Friendly Pricing.`, a: 'authority' },
    { id: 17, t: `Built by Sales Experts. Powered by AI.`, a: 'authority' }, { id: 18, t: `The ${C.solution} Used by 7-Figure Teams`, a: 'authority' },
    { id: 19, t: `${C.result} in 7 Days`, a: 'social' }, { id: 20, t: `${C.metric}. Zero Effort. Real Results.`, a: 'social' },
    { id: 21, t: `From Zero to ${C.result} in One Week`, a: 'social' }, { id: 22, t: `Real Results in ${C.niche}`, a: 'social' },
    { id: 23, t: `${C.solution} Outperforms 3 to 1`, a: 'social' }, { id: 24, t: `Real People. Real Results. Real Closings.`, a: 'social' },
    { id: 25, t: `Limited Spots. Go Live in ${C.urgency}`, a: 'urgency' }, { id: 26, t: `The Market Waits for No One`, a: 'urgency' },
    { id: 27, t: `Lock In Your ${C.solution} Before Spots Fill`, a: 'urgency' }, { id: 28, t: `${C.urgency} to Your First Win`, a: 'urgency' },
    { id: 29, t: `Money-Back Guarantee. Zero Risk.`, a: 'urgency' }, { id: 30, t: `Don't Let Another Opportunity Slip Away`, a: 'urgency' }
  ];
}
function genPrims() {
  PRIMS = [
    { id: 1, t: `Stop wasting time on ${C.old.toLowerCase()}. ${C.product} does the heavy lifting — ${C.metric} on complete autopilot. ${C.price}.`, a: 'problem', l: 'short' },
    { id: 2, t: `${C.old} wastes your time and kills your momentum. By the time you see results, it's too late.\n\n${C.product} uses ${C.solution} to deliver ${C.metric} — automatically.\n\n${C.result}. All on autopilot.`, a: 'problem', l: 'medium' },
    { id: 3, t: `${C.old} is broken. Wasted hours, poor results, and zero scalability.\n\n${C.product} delivers ${C.metric} with ${C.solution}:\n- Fully automated workflow\n- Intelligent optimization\n- Real-time tracking\n- Seamless integration\n- Live in ${C.urgency}\n\n${C.price}. No contracts. Money-back guarantee.`, a: 'problem', l: 'long' },
    { id: 4, t: `The top 1% of ${C.audience.toLowerCase()} don't rely on ${C.old.toLowerCase()}. They use ${C.solution} to hit ${C.metric} — achieving ${C.result} without lifting a finger.`, a: 'curiosity', l: 'short' },
    { id: 5, t: `We built ${C.product} to replace ${C.old.toLowerCase()} entirely.\n\n${C.metric}\n${C.result}\nResults in week one\n\nNo manual effort. Pure ${C.solution}. Setup: ${C.urgency}. Money-back guarantee.`, a: 'curiosity', l: 'medium' },
    { id: 6, t: `What if you could forget about ${C.old.toLowerCase()} forever?\n\n${C.product} leverages ${C.solution} to deliver ${C.metric} automatically. Set it up in ${C.urgency} and watch the results roll in.\n\n${C.price}. Money-back guarantee.`, a: 'curiosity', l: 'long' },
    { id: 7, t: `${C.company} has helped ${C.audience.toLowerCase()} succeed since 2020. Our latest: ${C.product} — ${C.solution} at a fraction of the cost. ${C.price}. ${C.urgency}.`, a: 'authority', l: 'short' },
    { id: 8, t: `${C.product} is built by experts who understand ${C.audience.toLowerCase()}. We've analyzed what works and built ${C.solution} that delivers.\n\n${C.metric}. ${C.result}. All automated.`, a: 'authority', l: 'medium' },
    { id: 9, t: `Most ${C.old.toLowerCase()} fails because it can't scale. We studied what top-performing ${C.audience.toLowerCase()} do differently and built ${C.product}.\n\n${C.solution}\nFully automated\nReal-time optimization\nSeamless integration\nLive in ${C.urgency}\n\n${C.price}. Money-back guarantee.`, a: 'authority', l: 'long' },
    { id: 10, t: `${C.metric}. ${C.result}. All in 7 days with ${C.product}.\n\n${C.price}. ${C.urgency}. Money-back guarantee.`, a: 'social', l: 'short' },
    { id: 11, t: `BEFORE:\n- Wasting hours on ${C.old.toLowerCase()}\n- Inconsistent results\n- Falling behind competitors\n\nAFTER ${C.product}:\n- ${C.metric}\n- ${C.result}\n- Fully automated with ${C.solution}\n\n${C.price}. No contracts.`, a: 'social', l: 'medium' },
    { id: 12, t: `We don't ask you to trust us. We ask you to test us.\n\nSet up ${C.product} in ${C.urgency}. See ${C.result} for yourself.\n\nIf it doesn't deliver? Full refund. That's the ${C.product} promise.`, a: 'social', l: 'long' },
    { id: 13, t: `Only 7 spots left for ${C.product} this month.\n\n${C.price}. ${C.urgency}. Money-back guarantee.\n\nSecure your spot now.`, a: 'urgency', l: 'short' },
    { id: 14, t: `Every day you stick with ${C.old.toLowerCase()}:\n- You lose ground to competitors\n- Results stay flat\n- Opportunities slip away\n\nMeanwhile ${C.product} users: ${C.metric}, ${C.result}, on autopilot.\n\n${C.price}. ${C.urgency}. 7 spots left.`, a: 'urgency', l: 'medium' },
    { id: 15, t: `Last call: 3 spots remaining for ${C.product}.\n\n${C.metric}. ${C.result}. ${C.urgency}. ${C.price}. Money-back guarantee.\n\nAfter this, you're on the waitlist.`, a: 'urgency', l: 'long' }
  ];
}
function genCTAs() {
  CTAS = [
    { id: 1, t: 'Reserve Your Spot \u2014 Only 7 Left', tp: 'lead' }, { id: 2, t: 'Book a Free Demo Call', tp: 'lead' },
    { id: 3, t: `Get Started \u2014 Go Live in ${C.urgency}`, tp: 'lead' }, { id: 4, t: 'Claim Your Spot Now', tp: 'lead' },
    { id: 5, t: `See ${C.product} in Action`, tp: 'traffic' }, { id: 6, t: `Learn How AI Delivers ${C.result}`, tp: 'traffic' },
    { id: 7, t: 'Watch the 2-Minute Demo', tp: 'traffic' }, { id: 8, t: `Test ${C.product} Live`, tp: 'traffic' },
    { id: 9, t: `See How ${C.audience} Are Using AI`, tp: 'traffic' }, { id: 10, t: 'Book a Zero-Pressure Strategy Call', tp: 'lead' }
  ];
}
function genCombos(n) { const c = []; const u = new Set(); let at = 0; while (c.length < n && at < n * 10) { at++; const h = HOOKS[Math.floor(Math.random() * HOOKS.length)]; const hl = HEADS[Math.floor(Math.random() * HEADS.length)]; const p = PRIMS[Math.floor(Math.random() * PRIMS.length)]; const ct = CTAS[Math.floor(Math.random() * CTAS.length)]; const k = `${h.id}-${hl.id}-${p.id}-${ct.id}`; if (u.has(k)) continue; u.add(k); c.push({ id: c.length + 1, camp: `${C.company.replace(/\s+/g, '_').toUpperCase()}_${h.a.toUpperCase()}`, set: `${h.a.toUpperCase()}_BROAD`, name: `AD_${String(c.length + 1).padStart(3, '0')}`, hook: h.t, head: hl.t, prim: p.t, cta: ct.t, ctaType: ct.tp === 'lead' ? 'SIGN_UP' : 'LEARN_MORE', angle: h.a }) } return c }

// ═══ RENDER: DASHBOARD ═══
function renderDashboard() {
  const v = document.getElementById('v-dashboard');
  const projects = JSON.parse(localStorage.getItem('cos_projects') || '[]');
  v.innerHTML = `<div class="view-header"><h2>Welcome back</h2><p>${C.company} Creative OS</p></div>
    <div class="quick-actions"><button class="qa-btn" onclick="openCreateModal()">${IC.plus} New Project</button><button class="qa-btn" onclick="navigateTo('ads')">${IC.bolt} Ads Creative</button><button class="qa-btn" onclick="navigateTo('content')">${IC.edit} Content Mode</button><button class="qa-btn" onclick="navigateTo('library')">${IC.grid} Asset Library</button></div>
    <div class="dash-grid"><div class="dash-card"><div class="dash-card-label">Hooks</div><div class="dash-card-value">${HOOKS.length}</div><div class="dash-card-sub">5 angles</div></div><div class="dash-card"><div class="dash-card-label">Headlines</div><div class="dash-card-value">${HEADS.length}</div><div class="dash-card-sub">5 angles</div></div><div class="dash-card"><div class="dash-card-label">Primary Texts</div><div class="dash-card-value">${PRIMS.length}</div><div class="dash-card-sub">3 lengths</div></div><div class="dash-card"><div class="dash-card-label">Combinations</div><div class="dash-card-value">${COMBOS.length}</div><div class="dash-card-sub">Meta-ready</div></div></div>
    <div class="dash-section-title">Recent Projects</div>
    ${projects.length ? `<div class="recent-list">${projects.slice(0, 5).map(p => `<div class="recent-item" onclick="loadProject(${p.id})"><div class="recent-icon">${p.mode === 'ads' ? IC.bolt : IC.edit}</div><div class="recent-info"><div class="recent-name">${p.name || p.company}</div><div class="recent-meta">${p.mode === 'ads' ? 'Ads Creative' : 'Content'} \u00b7 ${p.date}</div></div><span class="recent-status status-${p.status || 'draft'}">${p.status || 'draft'}</span></div>`).join('')}</div>` : `<div class="empty-state"><div class="empty-icon">${IC.folder}</div><div class="empty-title">No projects yet</div><div class="empty-desc">Create your first project to start generating content.</div><button class="btn-sm btn-primary" onclick="openCreateModal()">${IC.plus} Create Project</button></div>`};`;
}
