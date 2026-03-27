// ═══ AZ KONNECT CREATIVE OS — RENDERERS (engine2.js) ═══

// ═══ ADS MODE ═══
let adsTab = 'hooks', adsAngle = 'all', adSize = 'all', adAngle = 'all';
function renderAds() {
    const v = document.getElementById('v-ads');
    const tabs = [{ k: 'hooks', l: 'Hooks' }, { k: 'headlines', l: 'Headlines' }, { k: 'primary', l: 'Primary Texts' }, { k: 'ctas', l: 'CTAs' }, { k: 'images', l: 'Image Ads' }, { k: 'html', l: 'HTML Ads' }, { k: 'combos', l: 'Combinations' }, { k: 'stories', l: 'Storyboards' }];
    v.innerHTML = `<div class="view-header"><h2>Ads Creative</h2><p>${C.company} \u2014 ${C.product}</p></div>
    <div class="filter-bar">${tabs.map(t => `<button class="f-pill ${adsTab === t.k ? 'active' : ''}" onclick="adsTab='${t.k}';renderAds()">${t.l}</button>`).join('')}</div>
    <div id="ads-content"></div>`;
    const r = { hooks: rHooks, headlines: rHeads, primary: rPrims, ctas: rCTAs, images: rImages, html: rHTMLAds, combos: rCombos, stories: rStories };
    if (r[adsTab]) r[adsTab](document.getElementById('ads-content'));
}
function angleFilter(id) { return `<div class="filter-bar" id="${id}"><div class="filter-group"><span class="filter-label">Angle</span>${['all', ...ANGLES].map(a => `<button class="f-pill ${adsAngle === a ? 'active' : ''}" data-a="${a}">${a === 'all' ? 'All' : AL[a]}</button>`).join('')}</div></div>` }
function wireAngle(id, fn) { document.getElementById(id)?.querySelectorAll('.f-pill').forEach(b => b.addEventListener('click', () => { adsAngle = b.dataset.a; fn() })) }

function rHooks(el) {
    const d = adsAngle === 'all' ? HOOKS : HOOKS.filter(h => h.a === adsAngle);
    el.innerHTML = angleFilter('fh') + `<div class="card-grid">${d.map(h => `<div class="c-card" onclick="copyText('${h.t.replace(/'/g, "\\'")}',this)"><div class="c-card-head"><span class="c-card-num">Hook #${h.id}</span>${actionsHTML()}</div><div class="c-card-body">${h.t}</div><div class="c-card-foot"><span class="tag tag-${h.a}">${AL[h.a]}</span></div></div>`).join('')}</div>`;
    wireAngle('fh', () => renderAds());
}
function rHeads(el) {
    const d = adsAngle === 'all' ? HEADS : HEADS.filter(h => h.a === adsAngle);
    el.innerHTML = angleFilter('fhl') + `<div class="card-grid">${d.map(h => `<div class="c-card" onclick="copyText('${h.t.replace(/'/g, "\\'")}',this)"><div class="c-card-head"><span class="c-card-num">Headline #${h.id}</span>${actionsHTML()}</div><div class="c-card-body headline-style">${h.t}</div><div class="c-card-foot"><span class="tag tag-${h.a}">${AL[h.a]}</span></div></div>`).join('')}</div>`;
    wireAngle('fhl', () => renderAds());
}
function rPrims(el) {
    const d = adsAngle === 'all' ? PRIMS : PRIMS.filter(p => p.a === adsAngle);
    el.innerHTML = angleFilter('fp') + `<div class="card-grid">${d.map(p => `<div class="c-card" onclick="copyText(\`${p.t.replace(/`/g, '')}\`,this)"><div class="c-card-head"><span class="c-card-num">Primary #${p.id} \u00b7 ${p.l}</span>${actionsHTML()}</div><div class="c-card-body truncated" id="pt${p.id}">${p.t.replace(/\n/g, '<br>')}</div><button class="expand-btn" onclick="event.stopPropagation();const e=document.getElementById('pt${p.id}');e.classList.toggle('expanded');this.textContent=e.classList.contains('expanded')?'Show less':'Read more'">Read more</button><div class="c-card-foot"><span class="tag tag-${p.a}">${AL[p.a]}</span><span class="tag tag-type">${p.l}</span></div></div>`).join('')}</div>`;
    wireAngle('fp', () => renderAds());
}
function rCTAs(el) {
    el.innerHTML = `<div class="card-grid">${CTAS.map(c => `<div class="c-card" onclick="copyText('${c.t.replace(/'/g, "\\'")}',this)"><div class="c-card-head"><span class="c-card-num">CTA #${c.id} \u00b7 ${c.tp === 'lead' ? 'Lead Gen' : 'Traffic'}</span>${actionsHTML()}</div><div class="c-card-body headline-style">${c.t}</div><div class="c-card-foot"><span class="tag tag-type">${c.tp === 'lead' ? 'Lead Gen' : 'Traffic'}</span></div></div>`).join('')}</div>`;
}
function rImages(el) {
    const imgs = [{ f: 'ads_square/ad_sq_01_stats.png', l: 'Stats Power' }, { f: 'ads_square/ad_sq_02_problem.png', l: 'Problem' }, { f: 'ads_square/ad_sq_03_comparison.png', l: 'Comparison' }, { f: 'ads_square/ad_sq_04_curiosity.png', l: 'Curiosity' }, { f: 'ads_square/ad_sq_05_urgency.png', l: 'Urgency' }, { f: 'ads_square/ad_sq_06_features.png', l: 'Features' }];
    el.innerHTML = `<div class="gallery-grid">${imgs.map(i => `<div class="gallery-item"><img src="assets/${i.f}" alt="${i.l}" loading="lazy"><div class="gallery-label">${i.l}</div></div>`).join('')}</div>`;
}
function rHTMLAds(el) {
    const subs = [`${C.product}. ${C.metric}. ${C.result}. ${C.urgency}.`, `${C.solution} for ${C.audience.toLowerCase()}. Results in days.`, `${C.result} \u2014 on complete autopilot. ${C.price}.`, `Stop ${C.old.toLowerCase()}. Start closing. ${C.urgency}.`, `Built for ${C.audience.toLowerCase()} who want real results.`, `${C.metric} automated. ${C.result}. Zero manual work.`, `The #1 ${C.solution} in ${C.niche}. ${C.price}.`, `Replace ${C.old.toLowerCase()} with AI. Go live in ${C.urgency}.`, `Enterprise-grade AI. ${C.price}. Money-back guarantee.`, `${C.product}: ${C.metric}. No contracts. No risk.`, `Trusted by top ${C.audience.toLowerCase()} since 2020.`, `${C.result}. Week one. On autopilot. ${C.price}.`, `${C.solution} that works. ${C.price}. ${C.urgency}.`, `${C.metric}. ${C.result}. Money-back guarantee.`, `Scale faster with ${C.product}. ${C.urgency}.`, `Outperform the competition. ${C.metric}.`, `AI-powered ${C.solution}. Live in ${C.urgency}.`, `From zero to ${C.result} in one week.`, `${C.product}: the ${C.solution} for ${C.niche}.`, `${C.audience} are switching to AI.`, `${C.metric} per week. ${C.result}. Start now.`, `Why top performers chose ${C.product}.`, `The smart way to grow. ${C.urgency}. ${C.price}.`, `One week. ${C.result}. Guaranteed.`];
    let ads = []; for (let i = 0; i < 24; i++) { ads.push({ hook: HOOKS[i % HOOKS.length], style: STYLES[i % 6], vert: i >= 12, cta: CTAS[i % CTAS.length], sub: subs[i], angle: HOOKS[i % HOOKS.length].a, size: i >= 12 ? 'vertical' : 'square' }) }
    let f = ads; if (adSize !== 'all') f = f.filter(a => a.size === adSize); if (adAngle !== 'all') f = f.filter(a => a.angle === adAngle);
    el.innerHTML = `<div class="filter-bar"><div class="filter-group"><span class="filter-label">Size</span>${['all', 'square', 'vertical'].map(s => `<button class="f-pill ${adSize === s ? 'active' : ''}" onclick="adSize='${s}';renderAds()">${s === 'all' ? 'All' : s === 'square' ? '1:1 Square' : '4:5 Vertical'}</button>`).join('')}</div><div class="filter-group"><span class="filter-label">Angle</span>${['all', ...ANGLES].map(a => `<button class="f-pill ${adAngle === a ? 'active' : ''}" onclick="adAngle='${a}';renderAds()">${a === 'all' ? 'All' : AL[a]}</button>`).join('')}</div></div>
    <div class="ad-grid">${f.map(a => `<div class="ad-frame ${a.style} ${a.vert ? 'vertical' : ''}"><div class="ad-dim">${a.vert ? '1080\u00d71350' : '1080\u00d71080'}</div><div class="ad-hook">${a.hook.t}</div><div class="ad-sub">${a.sub}</div><div class="ad-cta">${a.cta.t}</div><div class="ad-logo">${C.company}</div></div>`).join('')}</div>`;
}
function rCombos(el) {
    const rows = COMBOS.slice(0, 50).map(c => `<tr><td class="id-cell">${c.name}</td><td>${c.camp}</td><td>${c.hook.substring(0, 50)}${c.hook.length > 50 ? '\u2026' : ''}</td><td style="font-weight:600">${c.head}</td><td>${c.prim.substring(0, 60)}\u2026</td><td>${c.cta}</td><td><span class="tag tag-${c.angle}">${AL[c.angle]}</span></td></tr>`).join('');
    el.innerHTML = `<div class="table-wrap"><table class="c-table"><thead><tr><th>Ad</th><th>Campaign</th><th>Hook</th><th>Headline</th><th>Primary</th><th>CTA</th><th>Angle</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}
function rStories(el) {
    const st = [{ n: 'Stats Power', s1: { ts: '0:00\u20130:03', lb: 'Hook', tx: `${C.metric}. ${C.result}.` }, s2: { ts: '0:03\u20130:07', lb: 'Proof', tx: `Week one results with ${C.product}. All on autopilot.` }, s3: { ts: '0:07\u20130:12', lb: 'CTA', tx: `${C.price}. ${C.urgency}. Reserve your spot.` } }, { n: 'Problem Agitation', s1: { ts: '0:00\u20130:03', lb: 'Hook', tx: `Still ${C.old.toLowerCase()} in 2026?` }, s2: { ts: '0:03\u20130:07', lb: 'Agitate', tx: `Your competitors aren't waiting. They're using ${C.solution}.` }, s3: { ts: '0:07\u20130:12', lb: 'CTA', tx: `${C.product}. ${C.urgency}. See how it works.` } }, { n: 'Before / After', s1: { ts: '0:00\u20130:03', lb: 'Before', tx: `Before: ${C.old}. 2-3 results/week.` }, s2: { ts: '0:03\u20130:07', lb: 'After', tx: `After ${C.product}: ${C.metric}. ${C.result}.` }, s3: { ts: '0:07\u20130:12', lb: 'CTA', tx: `Make the switch. ${C.price}. Money-back guarantee.` } }, { n: 'Curiosity Loop', s1: { ts: '0:00\u20130:03', lb: 'Hook', tx: `Top 1% of ${C.audience.toLowerCase()} don't do ${C.old.toLowerCase()}.` }, s2: { ts: '0:03\u20130:07', lb: 'Reveal', tx: `Their weapon: ${C.product}. ${C.metric} automated.` }, s3: { ts: '0:07\u20130:10', lb: 'CTA', tx: `Discover it now. ${C.urgency}. ${C.price}.` } }, { n: 'Social Proof', s1: { ts: '0:00\u20130:03', lb: 'Hook', tx: `${C.result}. Zero manual effort.` }, s2: { ts: '0:03\u20130:07', lb: 'Story', tx: `One client. One week. ${C.product}. On complete autopilot.` }, s3: { ts: '0:07\u20130:12', lb: 'CTA', tx: `Get Started. ${C.price}. ${C.urgency}.` } }, { n: 'Urgency Close', s1: { ts: '0:00\u20130:03', lb: 'Hook', tx: `Only 7 spots left this month.` }, s2: { ts: '0:03\u20130:07', lb: 'Value', tx: `${C.metric}. ${C.result}. Go live in ${C.urgency}.` }, s3: { ts: '0:07\u20130:10', lb: 'CTA', tx: `Claim your spot. ${C.price}. Money-back guarantee.` } }];
    el.innerHTML = `<div class="story-list">${st.map((s, i) => `<div class="story-card"><div class="story-head"><div style="display:flex;align-items:center;gap:10px"><div class="story-id">${i + 1}</div><div class="story-info"><div class="story-name">${s.n}</div><div class="story-dur">10\u201312s \u00b7 Vertical 9:16</div></div></div><button class="story-play" onclick="playStory(${i})">${IC.play} Preview</button></div><div class="story-progress"><div class="story-progress-fill" id="sp${i}"></div></div><div class="story-timeline" id="st${i}"><div class="story-scene" data-s="1"><div class="scene-ts">${s.s1.ts}</div><div class="scene-label">${s.s1.lb}</div><div class="scene-copy">${s.s1.tx}</div></div><div class="story-scene" data-s="2"><div class="scene-ts">${s.s2.ts}</div><div class="scene-label">${s.s2.lb}</div><div class="scene-copy">${s.s2.tx}</div></div><div class="story-scene" data-s="3"><div class="scene-ts">${s.s3.ts}</div><div class="scene-label">${s.s3.lb}</div><div class="scene-copy">${s.s3.tx}</div></div></div></div>`).join('')}</div>`;
}
function playStory(i) { const tl = document.getElementById('st' + i), pr = document.getElementById('sp' + i), sc = tl.querySelectorAll('.story-scene'); sc.forEach(s => s.classList.remove('scene-active')); pr.style.width = '0%'; pr.style.transition = 'none'; setTimeout(() => { sc[0].classList.add('scene-active'); pr.style.transition = 'width 3s linear'; pr.style.width = '33%' }, 50); setTimeout(() => { sc[0].classList.remove('scene-active'); sc[1].classList.add('scene-active'); pr.style.transition = 'width 4s linear'; pr.style.width = '75%' }, 3050); setTimeout(() => { sc[1].classList.remove('scene-active'); sc[2].classList.add('scene-active'); pr.style.transition = 'width 3s linear'; pr.style.width = '100%' }, 7050); setTimeout(() => { sc[2].classList.remove('scene-active') }, 10050) }

// ═══ CONTENT MODE ═══
let contentTab = 'ig-post';
function renderContent() {
    const v = document.getElementById('v-content');
    const tabs = [{ k: 'ig-post', l: 'IG Post' }, { k: 'ig-story', l: 'IG Story' }, { k: 'ig-carousel', l: 'IG Carousel' }, { k: 'linkedin', l: 'LinkedIn' }, { k: 'blog', l: 'Blog Post' }, { k: 'captions', l: 'Captions' }];
    v.innerHTML = `<div class="view-header"><h2>Content Creation</h2><p>Multi-platform content for ${C.company}</p></div>
    <div class="filter-bar">${tabs.map(t => `<button class="f-pill ${contentTab === t.k ? 'active' : ''}" onclick="contentTab='${t.k}';renderContent()">${t.l}</button>`).join('')}</div><div id="cc-out"></div>`;
    const gen = {
        'ig-post': genIGPosts, 'ig-story': genIGStories, 'ig-carousel': genCarousels,
        'linkedin': genLinkedIn, 'blog': genBlog, 'captions': genCaptions
    };
    if (gen[contentTab]) gen[contentTab](document.getElementById('cc-out'));
}
function contentCard(platform, ratio, hook, body, visual, cta, tags) {
    return `<div class="content-output"><div class="co-actions"><button class="c-action act-copy" onclick="copyText(\`${(hook + ' ' + body).replace(/`/g, '')}\`,this.closest('.content-output'))">${IC.copy}</button><button class="c-action act-fav">${IC.star}</button></div><div class="co-platform">${IC.bolt}<span>${platform} \u00b7 ${ratio}</span></div><div class="co-section"><div class="co-label">Hook</div><div class="co-text" style="font-weight:600">${hook}</div></div><div class="co-section"><div class="co-label">Body</div><div class="co-text">${body}</div></div>${visual ? `<div class="co-section"><div class="co-label">Visual Direction</div><div class="co-visual">${visual}</div></div>` : ''}<div class="co-section"><div class="co-label">CTA</div><div class="co-text" style="font-weight:600;color:var(--brand-light)">${cta}</div></div><div class="c-card-foot">${tags.map(t => `<span class="tag tag-platform">${t}</span>`).join('')}</div></div>`
}

function genIGPosts(el) {
    const posts = [
        { h: `${C.old} is dead.`, b: `${C.audience} who still rely on ${C.old.toLowerCase()} are leaving money on the table. ${C.product} delivers ${C.metric} \u2014 on autopilot. No scripts. No burnout. Just results.`, v: 'Clean dark background, bold white text overlay, brand blue accent stripe', cta: 'Link in bio for a free demo' },
        { h: `${C.result}. Week one.`, b: `That's not a goal. That's what ${C.product} delivered for one client in 7 days. ${C.solution} that works while you sleep.`, v: 'Split screen: left side shows manual work, right side shows automated dashboard with results', cta: `DM "${C.company}" to learn more` },
        { h: `The top 1% don't hustle harder.`, b: `They automate smarter. ${C.product} handles ${C.metric} so you can focus on closing. ${C.price}. ${C.urgency}.`, v: 'Minimalist design with a single compelling stat centered, brand colors', cta: 'Book your demo today' },
        { h: `Your competitor just booked ${C.result}.`, b: `They didn't work harder. They deployed ${C.solution}. ${C.product} gives you the same edge. ${C.price}. Money-back guarantee.`, v: 'Dark gradient background with urgency-style countdown or limited spots indicator', cta: 'Tap the link before spots fill' },
        { h: `We replaced 50 SDRs with one AI.`, b: `${C.metric}. ${C.result}. ${C.urgency} to go live. The future of ${C.niche.toLowerCase()} outreach is here.`, v: 'Futuristic AI brain visual with data streams, dark background, blue glow', cta: 'See it in action \u2014 link in bio' }
    ];
    el.innerHTML = `<div class="card-grid">${posts.map(p => contentCard('Instagram', '1:1', p.h, p.b, p.v, p.cta, ['Instagram', 'Post', '1:1'])).join('')}</div>`;
}
function genIGStories(el) {
    const stories = [
        { h: `Still doing ${C.old.toLowerCase()}?`, b: `Swipe to see what ${C.solution} looks like in 2026.`, v: 'Slide 1: Bold question. Slide 2: Before/after comparison. Slide 3: CTA with swipe-up', cta: 'Swipe up to book a demo' },
        { h: `${C.result} in 7 days.`, b: `No ${C.old.toLowerCase()}. No manual work. Just ${C.product}.`, v: 'Full-screen stat with animated counter effect, dark bg, brand blue text', cta: 'Tap to learn more' },
        { h: `POV: You deployed ${C.solution}`, b: `Your calendar tomorrow: full. Your effort: zero. ${C.product} \u2014 ${C.price}.`, v: 'Screenshot-style mockup of a full calendar, clean and premium', cta: 'DM us to get started' }
    ];
    el.innerHTML = `<div class="card-grid">${stories.map(p => contentCard('Instagram Story', '9:16', p.h, p.b, p.v, p.cta, ['Instagram', 'Story', '9:16'])).join('')}</div>`;
}
function genCarousels(el) {
    const c = [
        { h: `5 Ways ${C.solution} Beats ${C.old}`, b: `Slide 1: Cover \u2014 bold title\nSlide 2: Speed \u2014 ${C.metric} vs manual pace\nSlide 3: Cost \u2014 ${C.price} vs hiring SDRs\nSlide 4: Quality \u2014 AI-qualified leads\nSlide 5: Consistency \u2014 24/7 operation\nSlide 6: CTA \u2014 Book your demo`, v: 'Each slide uses dark bg with one key visual/stat. Brand blue accents. Clean typography.', cta: 'Save this post and DM us to start' },
        { h: `From ${C.old} to ${C.result}`, b: `Slide 1: The old way\nSlide 2: The frustration\nSlide 3: The turning point \u2014 ${C.product}\nSlide 4: The results \u2014 ${C.metric}\nSlide 5: The proof \u2014 ${C.result}\nSlide 6: Your turn`, v: 'Story arc format: problem, agitation, solution, proof, CTA. Dark gradients per slide.', cta: 'Link in bio to get started' }
    ];
    el.innerHTML = `<div class="card-grid">${c.map(p => contentCard('Instagram Carousel', '4:5', p.h, p.b.replace(/\n/g, '<br>'), p.v, p.cta, ['Instagram', 'Carousel', '4:5'])).join('')}</div>`;
}
function genLinkedIn(el) {
    const posts = [
        { h: `I stopped ${C.old.toLowerCase()} 6 months ago.`, b: `Best decision I ever made.\n\nHere's what happened:\n\u2192 Deployed ${C.product}\n\u2192 ${C.metric} in week one\n\u2192 ${C.result} booked automatically\n\u2192 Zero manual outreach\n\nThe old playbook is dead. ${C.solution} is the new standard.\n\nIf you're still grinding through ${C.old.toLowerCase()}, there's a better way.\n\n${C.price}. ${C.urgency}. Money-back guarantee.`, v: 'No image needed \u2014 text-first format. Optional: clean stat graphic.', cta: 'Comment "AI" and I\'ll send you the details' },
        { h: `Unpopular opinion: ${C.old} should be illegal in 2026.`, b: `There. I said it.\n\nWhen you can reach ${C.metric} with AI, qualify every lead, and book ${C.result} \u2014 why would anyone do it manually?\n\n${C.product} is changing ${C.niche.toLowerCase()} forever.\n\nAnd no, this isn't a pitch. It's math.\n\n${C.price}. ${C.urgency}. Full refund if it doesn't work.`, v: 'Optional: simple comparison infographic (manual vs AI)', cta: 'DM me for a walkthrough' }
    ];
    el.innerHTML = `<div class="card-grid">${posts.map(p => contentCard('LinkedIn', 'Text-first', p.h, p.b.replace(/\n/g, '<br>'), p.v, p.cta, ['LinkedIn', 'Post', 'Text'])).join('')}</div>`;
}
function genBlog(el) {
    const posts = [
        { h: `How ${C.solution} Is Replacing ${C.old} in ${C.niche}`, b: `Introduction: The problem with ${C.old.toLowerCase()} in 2026.\n\nSection 1: Why manual outreach fails \u2014 response rates, time investment, burnout.\n\nSection 2: The rise of ${C.solution} \u2014 how AI handles ${C.metric} while you sleep.\n\nSection 3: Real results \u2014 ${C.result} in the first week.\n\nSection 4: How ${C.product} works \u2014 setup in ${C.urgency}, CRM integration, auto follow-ups.\n\nConclusion: The math is clear. ${C.price}. Money-back guarantee.`, v: 'Hero image: split-screen comparison of old way vs new way. 16:9 ratio. Dark, premium.', cta: `Try ${C.product} free \u2014 ${C.urgency} setup` }
    ];
    el.innerHTML = `<div class="card-grid">${posts.map(p => contentCard('Blog', '16:9', p.h, p.b.replace(/\n/g, '<br>'), p.v, p.cta, ['Blog', 'Article', '16:9'])).join('')}</div>`;
}
function genCaptions(el) {
    const caps = [
        { platform: 'Instagram', text: `${C.old} is dead. ${C.product} delivers ${C.metric} on autopilot. ${C.price}. Link in bio.` },
        { platform: 'LinkedIn', text: `I replaced my entire outreach team with ${C.product}. ${C.result} in week one. Here's how \u2192` },
        { platform: 'Facebook', text: `${C.audience}: stop ${C.old.toLowerCase()}. ${C.product} gets you ${C.result}. ${C.price}. ${C.urgency}. Click to learn more.` },
        { platform: 'GBP', text: `${C.company} uses ${C.solution} to deliver ${C.result} for ${C.audience.toLowerCase()}. ${C.urgency}. Contact us today.` }
    ];
    el.innerHTML = `<div class="card-grid">${caps.map(c => `<div class="c-card" onclick="copyText('${c.text.replace(/'/g, "\\'")}',this)"><div class="c-card-head"><span class="c-card-num">${c.platform} Caption</span>${actionsHTML()}</div><div class="c-card-body">${c.text}</div><div class="c-card-foot"><span class="tag tag-platform">${c.platform}</span><span class="tag tag-type">Caption</span></div></div>`).join('')}</div>`;
}

// ═══ BRAND KIT ═══
function renderBrandKit() {
    const v = document.getElementById('v-brandkit');
    v.innerHTML = `<div class="view-header"><h2>Brand Kit</h2><p>Visual identity and messaging framework</p></div>
    <div class="bk-grid"><div class="bk-card"><h3>Identity</h3><div class="bk-row"><img src="assets/logo/az_konnect_logo.png" alt="" style="width:32px;height:32px;border-radius:6px"></div><div class="bk-row"><div class="bk-value">${C.company}</div></div><div class="bk-row"><div class="bk-value">${C.product}</div></div></div>
    <div class="bk-card"><h3>Colors</h3><div class="bk-row"><div class="bk-swatch" style="background:${C.color}"></div><div class="bk-value">${C.color} \u2014 Primary</div></div><div class="bk-row"><div class="bk-swatch" style="background:#05070A"></div><div class="bk-value">#05070A \u2014 Dark</div></div><div class="bk-row"><div class="bk-swatch" style="background:#38A3F5"></div><div class="bk-value">#38A3F5 \u2014 Light</div></div></div>
    <div class="bk-card"><h3>Audience</h3><div class="bk-row"><div class="bk-value">${C.audience}</div></div><div class="bk-row"><div class="bk-value">Niche: ${C.niche}</div></div><div class="bk-row"><div class="bk-value">Pain: ${C.old}</div></div></div>
    <div class="bk-card"><h3>Messaging</h3><div class="bk-row"><div class="bk-value">Solution: ${C.solution}</div></div><div class="bk-row"><div class="bk-value">Metric: ${C.metric}</div></div><div class="bk-row"><div class="bk-value">Result: ${C.result}</div></div><div class="bk-row"><div class="bk-value">Price: ${C.price}</div></div><div class="bk-row"><div class="bk-value">Urgency: ${C.urgency}</div></div></div></div>`;
}

// ═══ ASSET LIBRARY ═══
function renderLibrary() {
    const v = document.getElementById('v-library');
    v.innerHTML = `<div class="view-header"><h2>Asset Library</h2><p>All generated content across projects</p></div>
    <div class="lib-toolbar"><input type="text" class="lib-search" placeholder="Search assets..." id="lib-q"><div class="filter-group"><span class="filter-label">Type</span><button class="f-pill active" onclick="this.parentElement.querySelectorAll('.f-pill').forEach(b=>b.classList.remove('active'));this.classList.add('active')">All</button><button class="f-pill">Hooks</button><button class="f-pill">Headlines</button><button class="f-pill">Ads</button><button class="f-pill">Content</button></div></div>
    <div class="card-grid">${HOOKS.slice(0, 8).map(h => `<div class="c-card" onclick="copyText('${h.t.replace(/'/g, "\\'")}',this)"><div class="c-card-head"><span class="c-card-num">Hook #${h.id}</span>${actionsHTML()}</div><div class="c-card-body">${h.t}</div><div class="c-card-foot"><span class="tag tag-${h.a}">${AL[h.a]}</span><span class="tag tag-type">Hook</span></div></div>`).join('')}${HEADS.slice(0, 4).map(h => `<div class="c-card" onclick="copyText('${h.t.replace(/'/g, "\\'")}',this)"><div class="c-card-head"><span class="c-card-num">Headline #${h.id}</span>${actionsHTML()}</div><div class="c-card-body headline-style">${h.t}</div><div class="c-card-foot"><span class="tag tag-${h.a}">${AL[h.a]}</span><span class="tag tag-type">Headline</span></div></div>`).join('')}</div>`;
}

// ═══ TEMPLATES / HISTORY / EXPORT / PROJECTS / SETTINGS ═══
function renderTemplates() { document.getElementById('v-templates').innerHTML = `<div class="view-header"><h2>Templates</h2><p>Saved generation recipes</p></div><div class="empty-state"><div class="empty-icon">${IC.grid}</div><div class="empty-title">No templates saved</div><div class="empty-desc">Save a project configuration as a template for quick reuse.</div><button class="btn-sm btn-primary" onclick="openCreateModal()">${IC.plus} Create First</button></div>` }

function renderHistory() {
    const v = document.getElementById('v-history');
    const p = JSON.parse(localStorage.getItem('cos_projects') || '[]');
    v.innerHTML = `<div class="view-header"><h2>History</h2><p>All past projects</p></div>${p.length ? `<div class="recent-list">${p.map(x => `<div class="recent-item" onclick="loadProject(${x.id})"><div class="recent-icon">${x.mode === 'ads' ? IC.bolt : IC.edit}</div><div class="recent-info"><div class="recent-name">${x.name || x.company}</div><div class="recent-meta">${x.mode === 'ads' ? 'Ads Creative' : 'Content'} \u00b7 ${x.date}</div></div><span class="recent-status status-${x.status || 'draft'}">${x.status || 'draft'}</span></div>`).join('')}</div>` : `<div class="empty-state"><div class="empty-icon">${IC.folder}</div><div class="empty-title">No history</div><div class="empty-desc">Your projects will appear here after generation.</div></div>`}`;
}

function renderExport() {
    document.getElementById('v-export').innerHTML = `<div class="view-header"><h2>Export</h2><p>Download assets in production-ready formats</p></div>
    <div class="export-grid"><div class="export-card"><div class="export-icon">${IC.dl}</div><h3>Meta Ads CSV</h3><p>${COMBOS.length} ad combinations for bulk upload</p><button class="export-btn" onclick="dlCSV()">Download CSV</button></div><div class="export-card"><div class="export-icon">${IC.copy}</div><h3>Copy Library</h3><p>All hooks, headlines, texts, CTAs</p><button class="export-btn" onclick="dlCopy()">Download TXT</button></div><div class="export-card"><div class="export-icon">${IC.bolt}</div><h3>Marketing Angles</h3><p>5 angle frameworks with messaging</p><button class="export-btn" onclick="dlAngles()">Download TXT</button></div></div>
    <div class="dash-section-title" style="margin-top:28px">Publish (Coming Soon)</div>
    <div class="export-grid"><div class="export-card" style="opacity:.5;pointer-events:none"><div class="export-icon">${IC.bolt}</div><h3>Meta Business Suite</h3><p>Publish directly to Facebook & Instagram</p><button class="export-btn">Connect</button></div><div class="export-card" style="opacity:.5;pointer-events:none"><div class="export-icon">${IC.edit}</div><h3>LinkedIn</h3><p>Schedule LinkedIn posts</p><button class="export-btn">Connect</button></div><div class="export-card" style="opacity:.5;pointer-events:none"><div class="export-icon">${IC.grid}</div><h3>Blog CMS</h3><p>Push drafts to WordPress / Webflow</p><button class="export-btn">Connect</button></div></div>`;
}

function renderProjects() { renderHistory() }
function renderSettings() {
    document.getElementById('v-settings').innerHTML = `<div class="view-header"><h2>Settings</h2><p>Application preferences</p></div>
    <div class="bk-grid"><div class="bk-card"><h3>General</h3><div class="bk-row"><div class="bk-value">Version: Creative OS 1.0</div></div><div class="bk-row"><div class="bk-value">Theme: Dark</div></div></div><div class="bk-card"><h3>Data Reset</h3>
    <div class="bk-row" style="flex-direction: column; align-items: flex-start; gap: 8px;">
        <p style="color: var(--text-muted); font-size: 13px; margin: 0;">Danger Zone: This will permanently wipe all generated content, hooks, strings, and project history from this browser.</p>
        <button class="btn-sm" style="background:#e74c3c;color:#fff;border-color:#c0392b" onclick="if(confirm('Are you sure you want to completely wipe all app data? This action cannot be undone.')) { localStorage.clear(); location.reload(); }">Factory Reset Data</button>
    </div></div></div>`}

// ═══ PROJECT SAVE/LOAD ═══
function saveProject() { const p = JSON.parse(localStorage.getItem('cos_projects') || '[]'); p.unshift({ id: Date.now(), company: C.company, name: document.getElementById('in-project').value || C.company, product: C.product, mode: C.mode, date: new Date().toLocaleDateString(), status: 'draft', client: { ...C } }); if (p.length > 30) p.length = 30; localStorage.setItem('cos_projects', JSON.stringify(p)) }
function loadProject(id) { const p = JSON.parse(localStorage.getItem('cos_projects') || '[]'); const pr = p.find(x => x.id === id); if (!pr) return; C = { ...pr.client }; generate(); navigateTo(C.mode === 'ads' ? 'ads' : 'content'); toast('Loaded: ' + C.company) }

// ═══ DOWNLOADS ═══
function dlCSV() { const h = ['Campaign,Ad Set,Ad Name,Headline,Primary Text,Hook,CTA,Angle']; const r = COMBOS.map(c => [c.camp, c.set, c.name, `"${c.head}"`, `"${c.prim.replace(/"/g, '""').replace(/\n/g, ' ')}"`, `"${c.hook.replace(/"/g, '""')}"`, c.ctaType, c.angle].join(',')); downloadFile([...h, ...r].join('\n'), `${C.company.replace(/\s/g, '_')}_meta_ads.csv`, 'text/csv'); toast('CSV downloaded') }
function dlCopy() { let d = `${C.company.toUpperCase()} \u2014 COPY LIBRARY\n\n--- HOOKS ---\n\n`; HOOKS.forEach(h => d += `#${h.id} [${AL[h.a]}]\n${h.t}\n\n`); d += '\n--- HEADLINES ---\n\n'; HEADS.forEach(h => d += `#${h.id} [${AL[h.a]}]\n${h.t}\n\n`); d += '\n--- PRIMARY TEXTS ---\n\n'; PRIMS.forEach(p => d += `#${p.id} [${AL[p.a]}] [${p.l}]\n${p.t}\n\n---\n\n`); d += '\n--- CTAs ---\n\n'; CTAS.forEach(c => d += `#${c.id} [${c.tp}] ${c.t}\n`); downloadFile(d, `${C.company.replace(/\s/g, '_')}_copy.txt`, 'text/plain'); toast('Copy library downloaded') }
function dlAngles() { let d = `${C.company.toUpperCase()} \u2014 MARKETING ANGLES\n\n1. PROBLEM\nPain: ${C.old}\nEnemy: Manual outreach\n\n2. CURIOSITY\nHook: What if ${C.solution} could do it?\n\n3. AUTHORITY\nProof: Since 2020, trusted by top performers\n\n4. SOCIAL PROOF\nEvidence: ${C.metric} > ${C.result} in week one\n\n5. URGENCY\n${C.urgency}, money-back guarantee\n`; downloadFile(d, `${C.company.replace(/\s/g, '_')}_angles.txt`, 'text/plain'); toast('Angles downloaded') }
