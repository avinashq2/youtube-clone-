const VIDEOS = [
  { t: 'HTML & CSS Full Course for Beginners | Build a Website', c: 'CodeWithAvi', v: '1.2M', ago: '8 months ago', d: '1:02:45', cat: 'Coding', g: ['#ff7e5f', '#feb47b'], e: '💻', s: '540K' },
  { t: 'JavaScript DOM Manipulation Explained in 20 Minutes', c: 'CodeWithAvi', v: '860K', ago: '5 months ago', d: '20:12', cat: 'Coding', g: ['#36d1dc', '#5b86e5'], e: '⚡', s: '540K' },
  { t: 'Lo-fi Beats to Study & Relax To 🎧', c: 'Chill Station', v: '12M', ago: '2 years ago', d: '3:00:00', cat: 'Music', g: ['#8e2de2', '#4a00e0'], e: '🎧', s: '2.1M' },
  { t: 'Top 10 Open World Games You Must Play', c: 'GameZone', v: '3.4M', ago: '1 month ago', d: '14:38', cat: 'Gaming', g: ['#11998e', '#38ef7d'], e: '🎮', s: '1.4M' },
  { t: 'A Week in the Himalayas | Travel Vlog', c: 'Wander Daily', v: '980K', ago: '3 weeks ago', d: '18:05', cat: 'Travel', g: ['#2193b0', '#6dd5ed'], e: '🏔️', s: '720K' },
  { t: 'Street Food Tour of Old Delhi | Must Try Dishes', c: 'Foodie Diaries', v: '2.8M', ago: '6 months ago', d: '22:41', cat: 'Food', g: ['#f12711', '#f5af19'], e: '🍛', s: '1.1M' },
  { t: 'How Do Black Holes Actually Work?', c: 'Cosmos Lab', v: '5.6M', ago: '1 year ago', d: '11:27', cat: 'Science', g: ['#0f2027', '#2c5364'], e: '🌌', s: '3.2M' },
  { t: 'React JS Crash Course 2026 | Build a Project', c: 'DevSimplified', v: '640K', ago: '2 weeks ago', d: '45:30', cat: 'Coding', g: ['#00c6ff', '#0072ff'], e: '⚛️', s: '890K' },
  { t: 'Best Acoustic Guitar Songs | Cover Playlist', c: 'Chill Station', v: '1.9M', ago: '9 months ago', d: '1:15:20', cat: 'Music', g: ['#c31432', '#240b36'], e: '🎸', s: '2.1M' },
  { t: 'Daily News Brief: Top Headlines of the Day', c: 'Newsroom Live', v: '420K', ago: '5 hours ago', d: '8:14', cat: 'News', g: ['#485563', '#29323c'], e: '📰', s: '4.5M' },
  { t: 'Easy 15 Minute Pasta Recipes for Students', c: 'Foodie Diaries', v: '1.4M', ago: '4 months ago', d: '12:09', cat: 'Food', g: ['#ee9ca7', '#ffdde1'], e: '🍝', s: '1.1M' },
  { t: 'Python for Beginners | Learn in 1 Hour', c: 'DevSimplified', v: '4.1M', ago: '1 year ago', d: '1:00:12', cat: 'Coding', g: ['#f7971e', '#ffd200'], e: '🐍', s: '890K' },
  { t: 'Solo Trip to Goa Under ₹10,000 | Budget Guide', c: 'Wander Daily', v: '1.1M', ago: '7 months ago', d: '16:52', cat: 'Travel', g: ['#00b4db', '#0083b0'], e: '🏖️', s: '720K' },
  { t: 'Pro Tips to Win Every Match | Gameplay Guide', c: 'GameZone', v: '760K', ago: '10 days ago', d: '9:48', cat: 'Gaming', g: ['#ff416c', '#ff4b2b'], e: '🏆', s: '1.4M' },
  { t: 'The Science of Sleep: Why We Dream', c: 'Cosmos Lab', v: '2.3M', ago: '8 months ago', d: '13:33', cat: 'Science', g: ['#373b44', '#4286f4'], e: '🧠', s: '3.2M' },
  { t: 'Morning Piano Music for Focus & Calm', c: 'Chill Station', v: '3.8M', ago: '1 year ago', d: '2:00:00', cat: 'Music', g: ['#614385', '#516395'], e: '🎹', s: '2.1M' }
];
const CATS = ['All', 'Coding', 'Music', 'Gaming', 'Travel', 'Food', 'Science', 'News'];
const NAV = [['🏠', 'Home'], ['🎬', 'Shorts'], ['📺', 'Subscriptions'], ['👤', 'You'], ['🕘', 'History'], ['📋', 'Playlists'], ['⏰', 'Watch later'], ['👍', 'Liked videos']];
const COLORS = ['#c0392b', '#2980b9', '#27ae60', '#8e44ad', '#d35400', '#16a085'];

const $ = id => document.getElementById(id);
const grid = $('grid'), chips = $('chips'), empty = $('empty'), search = $('search');
let cat = 'All', query = '', timer;
const subbed = new Set(), liked = new Set();

function el(tag, text, cls) { const e = document.createElement(tag); if (text !== undefined) e.textContent = text; if (cls) e.className = cls; return e; }
function avatar(name) {
  const a = el('div', name.slice(0, 1).toUpperCase(), 'avatar');
  a.style.background = COLORS[name.length % COLORS.length];
  return a;
}

function buildSidebar() {
  NAV.forEach(([ic, label], i) => {
    const b = el('button', undefined, 'side-item' + (i === 0 ? ' active' : ''));
    b.append(el('span', ic, 'ic'), el('span', label));
    b.addEventListener('click', () => { document.querySelectorAll('#side-nav .side-item').forEach(x => x.classList.remove('active')); b.classList.add('active'); document.body.classList.remove('open'); });
    $('side-nav').appendChild(b);
  });
  [...new Set(VIDEOS.map(v => v.c))].forEach(name => {
    const b = el('button', undefined, 'side-item');
    b.append(avatar(name), el('span', name));
    $('subs').appendChild(b);
  });
}

function buildChips() {
  CATS.forEach(name => {
    const b = el('button', name, 'chip' + (name === 'All' ? ' on' : ''));
    b.addEventListener('click', () => {
      cat = name;
      chips.querySelectorAll('.chip').forEach(x => x.classList.toggle('on', x === b));
      load();
    });
    chips.appendChild(b);
  });
}

function skeletons() {
  grid.innerHTML = ''; empty.classList.add('hidden');
  for (let i = 0; i < 8; i++) {
    const s = el('div', undefined, 'video skeleton');
    s.append(el('div', undefined, 'thumb'), el('div', undefined, 'line'), el('div', undefined, 'line'));
    s.lastChild.style.width = '60%';
    grid.appendChild(s);
  }
}

function render() {
  const q = query.toLowerCase();
  const list = VIDEOS.filter(v => (cat === 'All' || v.cat === cat) && (!q || v.t.toLowerCase().includes(q) || v.c.toLowerCase().includes(q)));
  grid.innerHTML = '';
  empty.classList.toggle('hidden', list.length > 0);
  list.forEach(v => {
    const card = el('article', undefined, 'video');
    const th = el('div', v.e, 'thumb');
    th.style.background = `linear-gradient(135deg, ${v.g[0]}, ${v.g[1]})`;
    th.appendChild(el('span', v.d, 'dur'));
    const info = el('div');
    info.append(el('h3', v.t), el('p', v.c), el('p', `${v.v} views • ${v.ago}`));
    const meta = el('div', undefined, 'meta');
    meta.append(avatar(v.c), info);
    card.append(th, meta);
    card.addEventListener('click', () => openWatch(v));
    grid.appendChild(card);
  });
}

function load() { skeletons(); setTimeout(render, 450); }

function openWatch(v) {
  const p = $('player');
  p.innerHTML = '';
  p.style.background = `linear-gradient(135deg, ${v.g[0]}, ${v.g[1]})`;
  const play = el('div', '▶', 'play'), bar = el('div', undefined, 'progress');
  p.append(el('span', v.e), play, bar);
  let t;
  p.onclick = () => {
    const on = play.textContent === '▶';
    play.textContent = on ? '❚❚' : '▶';
    clearInterval(t);
    if (on) { let w = parseFloat(bar.style.width) || 0; t = setInterval(() => { w = (w + 0.5) % 100; bar.style.width = w + '%'; }, 100); }
  };
  const info = $('watch-info');
  info.innerHTML = '';
  const row = el('div', undefined, 'row');
  const who = el('div', undefined, 'grow'); who.append(el('b', v.c), el('small', `${v.s} subscribers`));
  const sub = el('button', subbed.has(v.c) ? 'Subscribed' : 'Subscribe', 'pill sub' + (subbed.has(v.c) ? ' on' : ''));
  sub.onclick = () => { subbed.has(v.c) ? subbed.delete(v.c) : subbed.add(v.c); sub.textContent = subbed.has(v.c) ? 'Subscribed' : 'Subscribe'; sub.classList.toggle('on', subbed.has(v.c)); };
  const like = el('button', liked.has(v.t) ? '👍 Liked' : '👍 Like', 'pill');
  like.onclick = () => { liked.has(v.t) ? liked.delete(v.t) : liked.add(v.t); like.textContent = liked.has(v.t) ? '👍 Liked' : '👍 Like'; };
  row.append(avatar(v.c), who, like, el('button', '↗ Share', 'pill'), sub);
  info.append(el('h2', v.t), row, el('div', `${v.v} views • ${v.ago}\nThis is a demo video card created for the YouTube UI clone project.`, 'desc'));
  info.lastChild.style.whiteSpace = 'pre-line';
  $('watch').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  $('watch').dataset.timer = '';
  $('watch').closeFn = () => clearInterval(t);
}
function closeWatch() { if ($('watch').closeFn) $('watch').closeFn(); $('watch').classList.add('hidden'); document.body.style.overflow = ''; }

$('watch-close').onclick = closeWatch;
$('watch').addEventListener('click', e => { if (e.target === $('watch')) closeWatch(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeWatch(); });

$('menu-btn').onclick = () => {
  if (window.innerWidth <= 900) document.body.classList.toggle('open');
  else document.body.classList.toggle('mini');
};
$('overlay').onclick = () => document.body.classList.remove('open');

$('search-form').addEventListener('submit', e => { e.preventDefault(); query = search.value.trim(); load(); });
search.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => { query = search.value.trim(); render(); }, 250); });

const themeBtn = $('theme-btn');
function setTheme(dark) { document.body.classList.toggle('dark', dark); themeBtn.textContent = dark ? '☀️' : '🌙'; try { localStorage.setItem('yt-dark', dark ? '1' : '0'); } catch (e) {} }
themeBtn.onclick = () => setTheme(!document.body.classList.contains('dark'));
try { setTheme(localStorage.getItem('yt-dark') === '1'); } catch (e) {}

buildSidebar();
buildChips();
load();
