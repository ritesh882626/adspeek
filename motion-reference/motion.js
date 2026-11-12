(function () {
  if (!window.gsap || !window.ScrollTrigger) { document.documentElement.classList.remove('js-motion'); return; }
  gsap.registerPlugin(ScrollTrigger);
  var root = document.documentElement;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { root.classList.remove('js-motion'); return; }

  var ACC = '#C8F03C', INK = '#111410', FOREST = '#0F3D2E';
  var FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var GLYPHS = '01#/[]<>_+=*%';

  /* ---------- helpers ---------- */
  function splitChars(el) {
    var out = [];
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            var w = document.createElement('span'); w.className = 'w';
            part.split('').forEach(function (c) {
              var s = document.createElement('span'); s.className = 'ch'; s.textContent = c; w.appendChild(s); out.push(s);
            });
            frag.appendChild(w);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') { walk(n); }
      });
    })(el);
    return out;
  }
  function words(el) { splitChars(el); return $$('.w', el); }
  function scramble(el, opts) {
    opts = opts || {};
    var final = el.getAttribute('data-final') || el.textContent;
    el.setAttribute('data-final', final);
    var o = { p: 0 };
    return gsap.to(o, {
      p: 1, duration: opts.duration || 0.9, delay: opts.delay || 0, ease: 'none',
      onUpdate: function () {
        var n = Math.floor(o.p * final.length), s = final.slice(0, n);
        for (var i = n; i < final.length; i++) s += final[i] === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        el.textContent = s;
      },
      onComplete: function () { el.textContent = final; }
    });
  }
  function wrapText(el, cls) {
    var s = document.createElement('span'); s.className = cls;
    while (el.firstChild) s.appendChild(el.firstChild);
    el.appendChild(s); return s;
  }
  function sweepBg(el) { el.style.backgroundImage = 'linear-gradient(' + ACC + ',' + ACC + ')'; el.style.backgroundRepeat = 'no-repeat'; el.style.backgroundSize = '0% 100%'; el.style.backgroundPosition = '0 0'; }

  /* ---------- header: sticky, hide on scroll down, shutter-blink logo ---------- */
  var header = $('header');
  var logoSq = $('header a span');
  function blink() { gsap.fromTo(logoSq, { scaleY: 1 }, { scaleY: 0.12, duration: 0.09, yoyo: true, repeat: 3, repeatDelay: 0.04, ease: 'power1.inOut', transformOrigin: '50% 50%' }); }
  Object.assign(header.style, { position: 'sticky', top: '0', zIndex: '50', background: '#FAFAF7' });
  var hidden = false;
  ScrollTrigger.create({
    start: 'top -140', end: 'max',
    onUpdate: function (self) {
      var menuOpen = $('.menubtn') && $('.menubtn').getAttribute('aria-expanded') === 'true';
      var hide = self.direction === 1 && !menuOpen;
      if (hide !== hidden) { hidden = hide; gsap.to(header, { yPercent: hide ? -100 : 0, duration: 0.35, ease: 'power2.out', overwrite: true }); if (!hide) blink(); }
    },
    onLeaveBack: function () { if (hidden) { hidden = false; gsap.to(header, { yPercent: 0, duration: 0.3 }); } }
  });
  gsap.delayedCall(0.2, blink);
  (function idleBlink() { gsap.delayedCall(5 + Math.random() * 4, function () { if (!hidden) blink(); idleBlink(); }); })();

  /* ---------- desktop: viewfinder cursor that frames links and buttons ---------- */
  if (FINE) {
    var vf = document.createElement('div'); vf.id = 'vf'; vf.setAttribute('aria-hidden', 'true');
    vf.innerHTML = '<i></i><i></i><i></i><i></i>'; document.body.appendChild(vf);
    var vx = gsap.quickTo(vf, 'x', { duration: 0.25, ease: 'power3.out' }), vy = gsap.quickTo(vf, 'y', { duration: 0.25, ease: 'power3.out' });
    var locked = null, SIZE = 28;
    gsap.set(vf, { width: SIZE, height: SIZE, opacity: 0 });
    window.addEventListener('mousemove', function (e) {
      gsap.to(vf, { opacity: 1, duration: 0.2, overwrite: 'auto' });
      if (!locked) { vx(e.clientX - SIZE / 2); vy(e.clientY - SIZE / 2); }
    });
    document.addEventListener('mouseover', function (e) {
      var t = e.target.closest('a, button');
      if (!t || t === locked) return;
      locked = t; var r = t.getBoundingClientRect(), pad = 6;
      gsap.to(vf, { x: r.left - pad, y: r.top - pad, width: r.width + pad * 2, height: r.height + pad * 2, duration: 0.35, ease: 'expo.out', overwrite: 'auto' });
    });
    document.addEventListener('mouseout', function (e) {
      var t = e.target.closest('a, button');
      if (!t || (e.relatedTarget && t.contains(e.relatedTarget))) return;
      locked = null; gsap.to(vf, { width: SIZE, height: SIZE, duration: 0.3, ease: 'expo.out' });
    });
    window.addEventListener('scroll', function () { if (locked) { var r = locked.getBoundingClientRect(); gsap.set(vf, { x: r.left - 6, y: r.top - 6 }); } }, { passive: true });
  }

  /* ---------- hero: build, highlight, flip; spec card prints like a receipt ---------- */
  var hero = $('#top'), heroWrap = $('.wrap', hero);
  var eyebrow = $('p', heroWrap), h1 = $('h1', hero), lead = $('.lead', hero);
  var btns = $$('.btnrow > a', hero);
  var spec = heroWrap.children[1];
  var nodes = Array.prototype.slice.call(h1.childNodes);
  var l1 = document.createElement('span'), l3 = document.createElement('span'), hl = h1.querySelector('span');
  h1.insertBefore(l1, nodes[0]); l1.appendChild(nodes[0]);
  var last = nodes[nodes.length - 1]; h1.insertBefore(l3, last); l3.appendChild(last);
  var c1 = splitChars(l1), cHl = splitChars(hl), w3 = words(l3);
  h1.style.perspective = '700px';
  hl.style.background = 'none'; sweepBg(hl); hl.style.backgroundSize = '0% 100%';
  var rows = $$('dl > div', spec), dds = rows.map(function (r) { return $('dd', r); });
  var code = $('div > span:last-child', spec);

  var tl = gsap.timeline({ delay: 0.15 });
  tl.set(heroWrap, { opacity: 1 })
    .add(scramble(eyebrow, { duration: 0.7 }), 0)
    .from(c1, { scaleY: 0, y: 24, opacity: 0, transformOrigin: '50% 100%', duration: 0.55, ease: 'back.out(2.4)', stagger: { each: 0.028, from: 'random' } }, 0.1)
    .to(hl, { backgroundSize: '100% 100%', duration: 0.6, ease: 'power3.inOut' }, '-=0.2')
    .from(cHl, { yPercent: 70, opacity: 0, duration: 0.35, ease: 'power2.out', stagger: 0.022 }, '<0.25')
    .from(w3, { rotateX: -100, opacity: 0, transformOrigin: '50% 0%', duration: 0.7, ease: 'back.out(1.7)', stagger: 0.08 }, '-=0.15')
    .from(lead, { clipPath: 'inset(0 0 100% 0)', y: 10, duration: 0.6, ease: 'power3.out' }, '-=0.35')
    .from(btns, { y: 18, opacity: 0, scale: 0.94, duration: 0.45, ease: 'back.out(2)', stagger: 0.08 }, '-=0.3');
  // receipt printer
  tl.fromTo(spec, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.5, ease: 'steps(16)' }, 0.55);
  dds.forEach(function (dd, i) { tl.add(scramble(dd, { duration: 0.5 }), 0.75 + i * 0.25); });
  tl.add(scramble(code, { duration: 0.6 }), 0.6)
    .to(spec, { rotate: -0.9, duration: 0.12, yoyo: true, repeat: 1, ease: 'power1.inOut' }, '>-0.1');

  var mm = gsap.matchMedia();
  mm.add('(min-width: 1024px) and (hover: hover)', function () {
    spec.parentElement.style.perspective = '900px';
    var rx = gsap.quickTo(spec, 'rotationX', { duration: 0.6, ease: 'power3.out' }), ry = gsap.quickTo(spec, 'rotationY', { duration: 0.6, ease: 'power3.out' });
    function move(e) { var r = hero.getBoundingClientRect(); ry(((e.clientX - r.left) / r.width - 0.5) * 12); rx(-((e.clientY - r.top) / r.height - 0.5) * 9); }
    function out() { rx(0); ry(0); }
    hero.addEventListener('mousemove', move); hero.addEventListener('mouseleave', out);
    return function () { hero.removeEventListener('mousemove', move); hero.removeEventListener('mouseleave', out); gsap.set(spec, { rotationX: 0, rotationY: 0 }); };
  });

  /* ---------- eyebrows decode on enter (site-wide signature) ---------- */
  $$('section p').filter(function (p) { return /letter-spacing: 0.06em; text-transform: uppercase/.test(p.getAttribute('style') || '') && /font-size: 13px/.test(p.getAttribute('style') || '') && !hero.contains(p); })
    .forEach(function (p) { ScrollTrigger.create({ trigger: p, start: 'top 88%', once: true, onEnter: function () { scramble(p, { duration: 0.8 }); } }); });

  /* ---------- trust strip: numbers decode, tools flip like a split-flap board ---------- */
  var trust = $('.trust');
  var nums = $$('.trust > div > p:first-child').slice(0, 3);
  var tools = $('.trust > div:last-child > p:last-child');
  tools.innerHTML = tools.textContent.split(' · ').map(function (t) { return '<span class="flap">' + t + '</span>'; }).join('<span class="dot"> · </span>');
  var flaps = $$('.flap', tools); tools.style.perspective = '400px';
  gsap.set(flaps, { rotateX: -90, opacity: 0, transformOrigin: '50% 50%' });
  ScrollTrigger.create({
    trigger: trust, start: 'top 85%', once: true, onEnter: function () {
      nums.forEach(function (n, i) { scramble(n, { duration: 1, delay: i * 0.15 }); });
      gsap.to(flaps, { rotateX: 0, opacity: 1, duration: 0.5, ease: 'back.out(2)', stagger: 0.12, onComplete: function () {
        (function tick() { gsap.delayedCall(2.2, function () { var f = flaps[(Math.random() * flaps.length) | 0]; gsap.fromTo(f, { rotateX: 0 }, { rotateX: 360, duration: 0.7, ease: 'power2.inOut' }); tick(); }); })();
      } });
    }
  });

  /* ---------- comparison: strike the typical answer, highlight AdsPeek ---------- */
  var cmp = $('.cmp-table').closest('section');
  mm.add('(min-width: 640px)', function () {
    var rowsC = $$('.cmp-inner > div', cmp).slice(1);
    var t = gsap.timeline({ scrollTrigger: { trigger: $('.cmp-table'), start: 'top 78%', end: 'bottom 50%', scrub: 0.7 } });
    rowsC.forEach(function (row, i) {
      var typ = row.children[1], ads = row.children[2];
      var tt = typ.querySelector('.tx') || wrapText(typ, 'tx'), at = ads.querySelector('.tx') || wrapText(ads, 'tx');
      var strike = tt.querySelector('.strike') || tt.appendChild(Object.assign(document.createElement('span'), { className: 'strike' }));
      sweepBg(at);
      t.fromTo(strike, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power2.inOut' }, i)
       .to(typ, { color: '#9CA196', duration: 0.6 }, i + 0.4)
       .to(at, { backgroundSize: '100% 100%', duration: 1, ease: 'power2.inOut' }, i + 0.5);
    });
    return function () { t.scrollTrigger && t.scrollTrigger.kill(); t.kill(); };
  });
  mm.add('(max-width: 639px)', function () {
    var made = [];
    $$('.cmp-cards > div', cmp).forEach(function (card) {
      var ps = $$('p', card), typ = ps[1], ads = ps[2];
      var typText = typ.lastChild; var tt = document.createElement('span'); tt.className = 'tx'; typ.replaceChild(tt, typText); tt.appendChild(typText);
      var strike = tt.appendChild(Object.assign(document.createElement('span'), { className: 'strike' }));
      var mark = ads.children[0], adsText = ads.children[1].lastChild;
      var at = document.createElement('span'); ads.children[1].replaceChild(at, adsText); at.appendChild(adsText); sweepBg(at);
      var t = gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 82%', end: 'top 42%', scrub: 0.6 } });
      t.fromTo(strike, { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0)
       .to(typ, { opacity: 0.5 }, 0.3)
       .fromTo(mark, { rotate: 0, scale: 1 }, { rotate: 225, scale: 1.5, ease: 'power2.inOut' }, 0.3)
       .to(mark, { scale: 1 }, 0.8)
       .to(at, { backgroundSize: '100% 100%', ease: 'power2.inOut' }, 0.4);
      made.push(t);
    });
    return function () { made.forEach(function (t) { t.scrollTrigger.kill(); t.kill(); }); };
  });

  /* ---------- services: lime wipe + decoding code (hover on desktop, focus-follow on phone) ---------- */
  var svcRows = $$('#services a.svc-row');
  svcRows.forEach(function (row) {
    row.style.position = 'relative'; row.style.overflow = 'hidden';
    var fill = document.createElement('span'); fill.className = 'svc-fill'; row.insertBefore(fill, row.firstChild);
    Array.prototype.slice.call(row.children).forEach(function (c) { if (c !== fill) { c.style.position = 'relative'; c.style.zIndex = '1'; } });
    row._fill = fill; row._code = $('div > span', row); row._name = $('div > span:last-child', row);
    gsap.set(fill, { scaleX: 0, transformOrigin: '0% 50%' });
  });
  function svcOn(row) { gsap.to(row._fill, { scaleX: 1, transformOrigin: '0% 50%', duration: 0.5, ease: 'expo.out', overwrite: true }); gsap.to(row._name, { x: 14, duration: 0.5, ease: 'expo.out' }); scramble(row._code, { duration: 0.4 }); }
  function svcOff(row) { gsap.to(row._fill, { scaleX: 0, transformOrigin: '100% 50%', duration: 0.45, ease: 'expo.inOut', overwrite: true }); gsap.to(row._name, { x: 0, duration: 0.45, ease: 'expo.out' }); }
  ScrollTrigger.create({ trigger: '#services', start: 'top 70%', once: true, onEnter: function () { svcRows.forEach(function (r, i) { scramble(r._name, { duration: 0.6, delay: i * 0.12 }); }); } });
  mm.add('(hover: hover) and (min-width: 640px)', function () {
    var on = function () { svcOn(this); }, off = function () { svcOff(this); };
    svcRows.forEach(function (r) { r.addEventListener('mouseenter', on); r.addEventListener('mouseleave', off); });
    return function () { svcRows.forEach(function (r) { r.removeEventListener('mouseenter', on); r.removeEventListener('mouseleave', off); svcOff(r); }); };
  });
  mm.add('(hover: none), (max-width: 639px)', function () {
    var st = svcRows.map(function (r) { return ScrollTrigger.create({ trigger: r, start: 'top 62%', end: 'bottom 38%', onToggle: function (s) { s.isActive ? svcOn(r) : svcOff(r); } }); });
    return function () { st.forEach(function (s) { s.kill(); }); };
  });

  /* ---------- growth system: a lime order travels the loop and switches each part on ---------- */
  var sys = $('#system'), grid = $('.cellsd', sys), cols = Array.prototype.slice.call(grid.children);
  grid.style.position = 'relative';
  var NS = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('class', 'loop-svg'); svg.setAttribute('aria-hidden', 'true');
  var base = document.createElementNS(NS, 'path'), prog = document.createElementNS(NS, 'path'), halo = document.createElementNS(NS, 'circle'), dot = document.createElementNS(NS, 'circle');
  base.setAttribute('class', 'loop-base'); prog.setAttribute('class', 'loop-prog'); halo.setAttribute('r', '13'); halo.setAttribute('class', 'loop-halo'); dot.setAttribute('r', '6'); dot.setAttribute('class', 'loop-dot');
  [base, prog, halo, dot].forEach(function (n) { svg.appendChild(n); }); grid.insertBefore(svg, grid.firstChild);
  var chips = [], marks = [];
  cols.forEach(function (c) {
    c.style.position = 'relative'; c.style.zIndex = '1';
    var top = c.children[0]; var chip = top.children[0]; chips.push(chip); marks.push(top.children[1]);
    chip.classList.add('sys-chip');
    gsap.set([$('h3', c), $('ul', c)], { opacity: 0.32 });
    $$('li', c).forEach(function (li) { var t = document.createElement('span'); t.className = 'tick'; t.textContent = '✓'; li.insertBefore(t, li.firstChild); });
  });
  gsap.set(marks, { opacity: 0 });
  var L = 1, fr = [0, 0.25, 0.5, 0.75], state = [false, false, false, false], loopTween = null;
  var proxy = { p: 0 };
  function buildLoop() {
    var g = grid.getBoundingClientRect(), W = g.width, H = g.height;
    var pts = chips.map(function (ch) { var r = ch.getBoundingClientRect(); return { x: r.left - g.left + r.width / 2, y: r.top - g.top + r.height / 2 }; });
    var oneRow = pts.every(function (p) { return Math.abs(p.y - pts[0].y) < 2; });
    var path, reach;
    if (oneRow) {
      // along the chip row, then back around the inside edge of the box
      var e = 14;
      path = [pts[0], pts[3], { x: W - e, y: pts[3].y }, { x: W - e, y: H - e }, { x: e, y: H - e }, { x: e, y: pts[0].y }, pts[0]];
      reach = function (i) { return Math.abs(pts[i].x - pts[0].x); };
    } else {
      // stacked: a spine down the left padding, back up the right padding
      var s = Math.max(8, Math.min(12, pts[0].x - chips[0].getBoundingClientRect().width / 2 - 10));
      var top = 10, bot = H - 10, right = W - 10;
      path = [{ x: s, y: pts[0].y }, { x: s, y: bot }, { x: right, y: bot }, { x: right, y: top }, { x: s, y: top }, { x: s, y: pts[0].y }];
      reach = function (i) { return Math.max(0, pts[i].y - pts[0].y); };
    }
    var d = '', total = 0;
    path.forEach(function (p, i) { d += (i ? ' L' : 'M') + p.x + ' ' + p.y; if (i) total += Math.abs(p.x - path[i - 1].x) + Math.abs(p.y - path[i - 1].y); });
    fr = [0, 1, 2, 3].map(function (i) { return reach(i) / total; });
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    base.setAttribute('d', d); prog.setAttribute('d', d);
    L = prog.getTotalLength(); prog.style.strokeDasharray = L; render();
  }
  function activate(i, on) {
    if (state[i] === on) return; state[i] = on;
    var c = cols[i];
    gsap.to(chips[i], { backgroundColor: on ? ACC : FOREST, color: on ? INK : ACC, duration: 0.25 });
    if (on) gsap.fromTo(chips[i], { scale: 1.5, rotate: -10 }, { scale: 1, rotate: 0, duration: 0.6, ease: 'back.out(3)' });
    gsap.to([$('h3', c), $('ul', c)], { opacity: on ? 1 : 0.32, duration: 0.35 });
    gsap.to($$('.tick', c), { scale: on ? 1 : 0, opacity: on ? 1 : 0, duration: 0.3, ease: 'back.out(3)', stagger: on ? 0.08 : 0 });
  }
  function placeDot(p) { var pt = prog.getPointAtLength(((p % 1) + 1) % 1 * L); dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y); halo.setAttribute('cx', pt.x); halo.setAttribute('cy', pt.y); }
  function render() {
    var p = proxy.p; prog.style.strokeDashoffset = L * (1 - p); placeDot(p);
    for (var i = 0; i < 4; i++) activate(i, p > 0 && p >= fr[i] - 0.001);
  }
  function startLoop() {
    if (loopTween) return;
    var lp = { p: 0 };
    loopTween = gsap.to(lp, { p: 1, duration: 7, ease: 'none', repeat: -1, onUpdate: function () { placeDot(lp.p); }, onRepeat: function () { gsap.fromTo(chips[0], { scale: 1.4 }, { scale: 1, duration: 0.5, ease: 'back.out(3)' }); } });
  }
  function stopLoop() { if (loopTween) { loopTween.kill(); loopTween = null; } }
  gsap.to(halo, { attr: { r: 18 }, opacity: 0, duration: 1.1, repeat: -1, ease: 'power1.out' });
  buildLoop();
  ScrollTrigger.addEventListener('refresh', buildLoop);
  mm.add('(min-width: 1024px)', function () {
    var t = gsap.to(proxy, { p: 1, ease: 'none', onUpdate: render, scrollTrigger: { trigger: sys, start: 'top top', end: '+=130%', pin: true, scrub: 0.8, onLeave: startLoop, onEnterBack: stopLoop } });
    return function () { stopLoop(); t.scrollTrigger.kill(); t.kill(); };
  });
  mm.add('(max-width: 1023px)', function () {
    var t = gsap.to(proxy, { p: 1, ease: 'none', onUpdate: render, scrollTrigger: { trigger: grid, start: 'top 72%', end: 'bottom 55%', scrub: 0.8, onLeave: startLoop, onEnterBack: stopLoop } });
    return function () { stopLoop(); t.scrollTrigger.kill(); t.kill(); };
  });

  /* ---------- selected work: camera-iris reveal + viewfinder corners ---------- */
  var cards = $$('#work .swipe > a');
  cards.forEach(function (card) {
    var ph = card.children[0];
    var wrap = document.createElement('div'); wrap.className = 'vf-wrap'; card.insertBefore(wrap, ph); wrap.appendChild(ph);
    ['tl', 'tr', 'bl', 'br'].forEach(function (k) { var s = document.createElement('span'); s.className = 'vf-c vf-' + k; wrap.appendChild(s); });
    card._wrap = wrap; card._ph = ph; card._corners = $$('.vf-c', wrap); card._meta = $$('div > span', card).filter(function (s) { return s.parentElement !== wrap; });
    gsap.set(ph, { clipPath: 'circle(0% at 50% 50%)' });
  });
  function cornersFrom(card) {
    var r = card._wrap.getBoundingClientRect(), dx = r.width / 2 - 26, dy = r.height / 2 - 26;
    return [{ x: dx, y: dy }, { x: -dx, y: dy }, { x: dx, y: -dy }, { x: -dx, y: -dy }];
  }
  ScrollTrigger.create({
    trigger: '#work .swipe', start: 'top 78%', once: true, onEnter: function () {
      cards.forEach(function (card, i) {
        var d = i * 0.18, from = cornersFrom(card);
        card._corners.forEach(function (c, k) { gsap.fromTo(c, { x: from[k].x, y: from[k].y, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.8, delay: d + 0.15, ease: 'back.out(2.2)' }); });
        gsap.to(card._ph, { clipPath: 'circle(75% at 50% 50%)', duration: 1.2, delay: d + 0.35, ease: 'expo.inOut' });
        card._meta.forEach(function (m, j) { scramble(m, { duration: 0.6, delay: d + 0.6 + j * 0.1 }); });
      });
    }
  });
  mm.add('(hover: hover) and (min-width: 640px)', function () {
    function on() { gsap.to(this._corners, { x: function (k) { return [-8, 8, -8, 8][k]; }, y: function (k) { return [-8, -8, 8, 8][k]; }, duration: 0.4, ease: 'expo.out' }); gsap.to(this._ph, { scale: 1.03, duration: 0.5, ease: 'expo.out' }); }
    function off() { gsap.to(this._corners, { x: 0, y: 0, duration: 0.4, ease: 'expo.out' }); gsap.to(this._ph, { scale: 1, duration: 0.5, ease: 'expo.out' }); }
    cards.forEach(function (c) { c.addEventListener('mouseenter', on); c.addEventListener('mouseleave', off); });
    return function () { cards.forEach(function (c) { c.removeEventListener('mouseenter', on); c.removeEventListener('mouseleave', off); }); };
  });

  /* ---------- process: progress line fills and stamps each step; "Every month" flips ---------- */
  var ol = $('.proc-ol'), steps = $$('li', ol);
  var labels = steps.map(function (li) {
    li.style.position = 'relative';
    var bar = document.createElement('span'); bar.className = 'pbar'; li.insertBefore(bar, li.firstChild);
    var lab = li.children[1]; lab.style.alignSelf = 'flex-start'; lab.style.padding = '2px 6px'; lab.style.marginLeft = '-6px';
    return lab;
  });
  var monthly = labels[labels.length - 1];
  var pt = gsap.timeline({ scrollTrigger: { trigger: ol, start: 'top 78%', end: 'bottom 45%', scrub: 0.6 } });
  steps.forEach(function (li, i) {
    var bar = li.children[0], lab = labels[i];
    pt.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'none' }, i)
      .fromTo(lab, { scale: 1, rotate: 0, backgroundColor: i === steps.length - 1 ? ACC : 'rgba(200,240,60,0)' }, { keyframes: [{ scale: 1.45, rotate: -7, backgroundColor: ACC, duration: 0.15 }, { scale: 1, rotate: 0, duration: 0.25, ease: 'back.out(3)' }] }, i + 0.85)
      .to(lab, { color: INK, duration: 0.1 }, i + 0.85);
  });
  monthly.parentElement.style.perspective = '300px';
  gsap.to(monthly, { rotateX: 360, duration: 0.8, ease: 'power2.inOut', repeat: -1, repeatDelay: 2.6, delay: 2 });

  /* ---------- ways to work: dealt from a deck ---------- */
  var deck = $('.pr'), dealt = Array.prototype.slice.call(deck.children);
  gsap.set(dealt, { opacity: 0 });
  ScrollTrigger.create({
    trigger: deck, start: 'top 80%', once: true, onEnter: function () {
      var g = deck.getBoundingClientRect(), cx = g.left + g.width / 2, cy = g.top + Math.min(g.height, 360) / 2;
      dealt.forEach(function (c, i) {
        var r = c.getBoundingClientRect();
        gsap.fromTo(c, { x: cx - (r.left + r.width / 2), y: cy - (r.top + Math.min(r.height, 360) / 2) - 60, rotate: [-7, 5, -3][i], opacity: 1, zIndex: 3 - i },
          { x: 0, y: 0, rotate: 0, duration: 0.9, delay: 0.15 + (dealt.length - 1 - i) * 0.16, ease: 'power4.out', clearProps: 'zIndex' });
      });
      var chosen = $('.first-m', deck); if (chosen) { var lbl = $('p', chosen), price = $$('p', chosen)[1]; scramble(lbl, { delay: 0.9, duration: 0.6 }); scramble(price, { delay: 1.05, duration: 0.7 }); }
    }
  });
  mm.add('(hover: hover) and (min-width: 640px)', function () {
    function on() { var price = $$('p', this)[1]; scramble(price, { duration: 0.45 }); gsap.to(this, { y: -6, duration: 0.3, ease: 'power2.out' }); }
    function off() { gsap.to(this, { y: 0, duration: 0.3, ease: 'power2.out' }); }
    dealt.forEach(function (c) { c.addEventListener('mouseenter', on); c.addEventListener('mouseleave', off); });
    return function () { dealt.forEach(function (c) { c.removeEventListener('mouseenter', on); c.removeEventListener('mouseleave', off); }); };
  });

  /* ---------- FAQ: a highlighter sweeps through each question, answer unmasks ---------- */
  var faqDl = $$('dl').filter(function (d) { return d.querySelector('dt'); }).pop();
  $$('div', faqDl).forEach(function (item) {
    var dt = $('dt', item), dd = $('dd', item), hl2 = wrapText(dt, 'q'); sweepBg(hl2);
    gsap.set(dd, { clipPath: 'inset(0 0 100% 0)' });
    ScrollTrigger.create({ trigger: item, start: 'top 85%', once: true, onEnter: function () {
      gsap.timeline()
        .to(hl2, { backgroundSize: '100% 100%', duration: 0.45, ease: 'power2.in' })
        .to(hl2, { backgroundPosition: '100% 0', backgroundSize: '0% 100%', duration: 0.45, ease: 'power2.out' })
        .to(dd, { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'power3.out' }, 0.35);
    } });
  });

  /* ---------- final CTA: letters drop and bounce; repel the cursor; tap to jump ---------- */
  var cta = $('#book'), ctaH = $('h2', cta), cc = splitChars(ctaH);
  var ctaBtns = $$('.btnrow > a', cta);
  ScrollTrigger.create({ trigger: cta, start: 'top 75%', once: true, onEnter: function () {
    gsap.from(cc, { y: function () { return -140 - Math.random() * 120; }, rotate: function () { return gsap.utils.random(-40, 40); }, opacity: 0, duration: 1.1, ease: 'bounce.out', stagger: { each: 0.018, from: 'random' } });
    gsap.from(ctaBtns, { scale: 0, opacity: 0, duration: 0.6, delay: 0.9, ease: 'back.out(2.5)', stagger: 0.1 });
  } });
  mm.add('(hover: hover) and (min-width: 1024px)', function () {
    var qx = cc.map(function (c) { return gsap.quickTo(c, 'x', { duration: 0.5, ease: 'power3.out' }); });
    var qy = cc.map(function (c) { return gsap.quickTo(c, 'y', { duration: 0.5, ease: 'power3.out' }); });
    var centers = [];
    function measure() { centers = cc.map(function (c) { var r = c.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 + window.scrollY }; }); }
    function move(e) {
      if (!centers.length) measure();
      cc.forEach(function (c, i) {
        var dx = centers[i].x - e.clientX, dy = centers[i].y - (e.clientY + window.scrollY), d = Math.sqrt(dx * dx + dy * dy), R = 140;
        if (d < R) { var f = (R - d) / R * 26; qx[i](dx / (d || 1) * f); qy[i](dy / (d || 1) * f); } else { qx[i](0); qy[i](0); }
      });
      ctaBtns.forEach(function (b) { var r = b.getBoundingClientRect(), bx = r.left + r.width / 2, by = r.top + r.height / 2, ddx = e.clientX - bx, ddy = e.clientY - by;
        if (Math.abs(ddx) < r.width / 2 + 40 && Math.abs(ddy) < r.height / 2 + 40) gsap.to(b, { x: ddx * 0.25, y: ddy * 0.35, duration: 0.4, ease: 'power3.out' }); else gsap.to(b, { x: 0, y: 0, duration: 0.5, ease: 'power3.out' }); });
    }
    function leave() { qx.forEach(function (f) { f(0); }); qy.forEach(function (f) { f(0); }); gsap.to(ctaBtns, { x: 0, y: 0, duration: 0.5 }); }
    cta.addEventListener('mousemove', move); cta.addEventListener('mouseleave', leave);
    ScrollTrigger.addEventListener('refresh', measure); window.addEventListener('scroll', function () { centers = []; }, { passive: true });
    return function () { cta.removeEventListener('mousemove', move); cta.removeEventListener('mouseleave', leave); leave(); };
  });
  mm.add('(hover: none)', function () {
    function jump() { gsap.fromTo(cc, { y: 0 }, { y: -18, duration: 0.22, yoyo: true, repeat: 1, ease: 'power2.out', stagger: { each: 0.015, from: 'start' } }); }
    ctaH.addEventListener('click', jump);
    return function () { ctaH.removeEventListener('click', jump); };
  });

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
