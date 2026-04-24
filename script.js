/* =================================================================
   GARBO EVENTOS - SCRIPT
   ================================================================= */

const WHATSAPP = "https://wa.me/5519989808910";

// DOM refs
const grid = document.getElementById("productGrid");
const heroGrid = document.getElementById("heroProducts");
const filters = document.getElementById("filters");
const input = document.getElementById("searchInput");
const heroInput = document.getElementById("heroSearchInput");
const header = document.getElementById("siteHeader");
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.getElementById("mobileNav");
const yearEl = document.getElementById("year");

let currentCategory = "Todos";

/* ---------- Helpers ---------- */
function whatsappFor(productName) {
  return `${WHATSAPP}?text=${encodeURIComponent(
    `Olá! Vi no site e quero orçamento para: ${productName}. Podem me passar valores e disponibilidade?`
  )}`;
}

function categories() {
  return ["Todos", ...new Set(window.PRODUTOS_GARBO.map((p) => p.category))];
}

function iconFilter() {
  return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`;
}

function iconCamera() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`;
}

function iconWhatsapp() {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.06L2 22l4.94-1.36A10 10 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>`;
}

/* ---------- Filtros ---------- */
function renderFilters() {
  filters.innerHTML = categories()
    .map(
      (c) =>
        `<button class="filter-btn ${c === currentCategory ? "active" : ""}" onclick="setCategory('${c.replace(/'/g, "\\'")}')">${c}</button>`
    )
    .join("");
}

/* ---------- Cards ---------- */
function productCard(p, i) {
  return `
    <article class="product-card" data-index="${i}">
      <div class="product-image" onclick="openModal(${i})" role="button" tabindex="0" aria-label="Ver fotos de ${p.name}">
        <img src="${p.images[0]}" alt="${p.name} - Garbo Eventos Campinas" loading="lazy">
        <span class="tag">${p.category}</span>
        <span class="photo-count">${iconCamera()} ${p.images.length}</span>
      </div>
      <div class="product-content">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <div class="product-actions">
          <a class="btn btn-whatsapp" href="${whatsappFor(p.name)}" target="_blank" rel="noopener noreferrer">
            ${iconWhatsapp()} Orçar
          </a>
          <button type="button" class="ghost-btn" onclick="openModal(${i})">Ver fotos</button>
        </div>
      </div>
    </article>`;
}

function heroProductCard(p, globalIndex) {
  return `
    <article class="hero-product-card" onclick="openModal(${globalIndex})" role="button" tabindex="0" aria-label="Ver detalhes de ${p.name}">
      <img src="${p.images[0]}" alt="${p.name}" loading="eager" fetchpriority="high">
      <div class="hero-product-info">
        <small>${p.category}</small>
        <h3>${p.name}</h3>
        <span class="view-cta">Ver fotos →</span>
      </div>
    </article>`;
}

function renderHeroProducts() {
  // Seleciona até 4 produtos com variedade de categorias quando possível
  const byCategory = new Map();
  window.PRODUTOS_GARBO.forEach((p, idx) => {
    if (!byCategory.has(p.category)) byCategory.set(p.category, { product: p, index: idx });
  });
  const featured = Array.from(byCategory.values()).slice(0, 4);
  // Se ainda faltar, complementa com os primeiros
  if (featured.length < 4) {
    for (let i = 0; i < window.PRODUTOS_GARBO.length && featured.length < 4; i++) {
      if (!featured.some((f) => f.index === i)) {
        featured.push({ product: window.PRODUTOS_GARBO[i], index: i });
      }
    }
  }
  heroGrid.innerHTML = featured.map((f) => heroProductCard(f.product, f.index)).join("");
}

/* ---------- Produtos (listagem) ---------- */
function getSearchValue() {
  return (input?.value || "").toLowerCase().trim();
}

function renderProducts() {
  const q = getSearchValue();
  const items = window.PRODUTOS_GARBO
    .map((p, i) => ({ p, i }))
    .filter(({ p }) =>
      (currentCategory === "Todos" || p.category === currentCategory) &&
      `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(q)
    );

  grid.innerHTML =
    items.map(({ p, i }) => productCard(p, i)).join("") ||
    `<div class="no-results">
       <p>Nenhum produto encontrado para <strong>"${q}"</strong>.</p>
       <p style="margin-top:8px;font-size:14px">Tente buscar por <em>mesa</em>, <em>toalha</em> ou <em>ombrelone</em>.</p>
     </div>`;
}

function setCategory(c) {
  currentCategory = c;
  renderFilters();
  renderProducts();
}
window.setCategory = setCategory;

/* ---------- Busca sincronizada ---------- */
function syncHeroSearch() {
  if (!heroInput || !input) return;
  input.value = heroInput.value;
  document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth", block: "start" });
  renderProducts();
}

if (input) input.addEventListener("input", renderProducts);
if (heroInput) {
  heroInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      syncHeroSearch();
    }
  });
  heroInput.addEventListener("input", () => {
    if (input) input.value = heroInput.value;
    renderProducts();
  });
}

/* ---------- Modal ---------- */
let currentGalleryIndex = 0;
let currentProductImages = [];

function renderGallery(images, activeIndex = 0) {
  currentGalleryIndex = activeIndex;
  currentProductImages = images;
  const main = images[activeIndex] || images[0];
  const thumbs = images.slice(0, 8);

  document.getElementById("gallery").innerHTML = `
    <div class="gallery-main">
      <img id="galleryMainImg" src="${main}" alt="Foto principal do produto">
    </div>
    <div class="gallery-side">
      ${thumbs
        .map(
          (src, idx) =>
            `<img src="${src}" alt="Foto ${idx + 1}" onclick="setGalleryIndex(${idx})" style="${idx === activeIndex ? 'outline:3px solid var(--gold);outline-offset:-3px;' : ''}">`
        )
        .join("")}
    </div>`;
}

function setGalleryIndex(idx) {
  if (idx < 0 || idx >= currentProductImages.length) return;
  renderGallery(currentProductImages, idx);
}
window.setGalleryIndex = setGalleryIndex;

function openModal(i) {
  const p = window.PRODUTOS_GARBO[i];
  if (!p) return;
  document.getElementById("modalTitle").innerText = p.name;
  document.getElementById("modalCategory").innerText = p.category;
  document.getElementById("modalDesc").innerText = p.description;
  document.getElementById("modalWhatsapp").href = whatsappFor(p.name);

  renderGallery(p.images, 0);

  const modal = document.getElementById("modal");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}
window.openModal = openModal;

function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}
window.closeModal = closeModal;

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
  if (document.getElementById("modal").classList.contains("open")) {
    if (event.key === "ArrowRight") setGalleryIndex(currentGalleryIndex + 1);
    if (event.key === "ArrowLeft") setGalleryIndex(currentGalleryIndex - 1);
  }
});

document.getElementById("modal")?.addEventListener("click", (event) => {
  if (event.target.id === "modal") closeModal();
});

/* ---------- Header scroll effect ---------- */
let lastScrollY = 0;
window.addEventListener("scroll", () => {
  const currentY = window.scrollY;
  if (currentY > 20) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
  lastScrollY = currentY;
}, { passive: true });

/* ---------- Menu mobile ---------- */
if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    });
  });
}

/* ---------- Ano dinâmico no footer ---------- */
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- Smooth scroll para âncoras ---------- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#" || href.length < 2) return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

/* ---------- Teclado: ativar card com Enter ---------- */
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && document.activeElement?.matches(".product-image, .hero-product-card")) {
    document.activeElement.click();
  }
});

/* ---------- Inicialização ---------- */
renderFilters();
renderHeroProducts();
renderProducts();
