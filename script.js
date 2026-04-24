
const WHATSAPP = "https://web.whatsapp.com/send?phone=5519989808910";
const grid = document.getElementById('productGrid');
const filters = document.getElementById('filters');
const input = document.getElementById('searchInput');
let currentCategory = 'Todos';
function categories(){ return ['Todos', ...new Set(window.PRODUTOS_GARBO.map(p=>p.category))]; }
function renderFilters(){ filters.innerHTML = categories().map(c=>`<button class="filter-btn ${c===currentCategory?'active':''}" onclick="setCategory('${c}')">${c}</button>`).join(''); }
function productCard(p, i){ return `<article class="product-card" data-index="${i}"><div class="product-image" onclick="openModal(${i})"><img src="${p.images[0]}" alt="${p.name}" loading="lazy"><span class="tag">${p.category}</span><span class="photo-count">${p.images.length} fotos</span></div><div class="product-content"><h3>${p.name}</h3><p>${p.description}</p><a href="${WHATSAPP}&text=${encodeURIComponent('Olá! Quero orçamento para: '+p.name)}" target="_blank">Orçar este item →</a></div></article>`; }
function renderProducts(){ const q=(input.value||'').toLowerCase(); const items=window.PRODUTOS_GARBO.filter(p=>(currentCategory==='Todos'||p.category===currentCategory) && (p.name+' '+p.category+' '+p.description).toLowerCase().includes(q)); grid.innerHTML = items.map((p)=> productCard(p, window.PRODUTOS_GARBO.indexOf(p))).join('') || '<p class="lead">Nenhum produto encontrado.</p>'; }
function setCategory(c){ currentCategory=c; renderFilters(); renderProducts(); }
input.addEventListener('input', renderProducts);
function openModal(i){ const p=window.PRODUTOS_GARBO[i]; document.getElementById('modalTitle').innerText=p.name; document.getElementById('modalCategory').innerText=p.category; document.getElementById('modalDesc').innerText=p.description; document.getElementById('modalWhatsapp').href=WHATSAPP+'&text='+encodeURIComponent('Olá! Quero orçamento para: '+p.name); const imgs=p.images; document.getElementById('gallery').innerHTML=`<img class="gallery-main" src="${imgs[0]}" alt="${p.name}"><div class="gallery-side">${imgs.slice(1,4).map(src=>`<img src="${src}" alt="${p.name}">`).join('')}</div>`; document.getElementById('modal').classList.add('open'); }
function closeModal(){ document.getElementById('modal').classList.remove('open'); }
renderFilters(); renderProducts();
