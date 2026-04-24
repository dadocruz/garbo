const WHATSAPP = "https://wa.me/5519989808910";

const grid = document.getElementById("productGrid");
const heroGrid = document.getElementById("heroProducts");
const filters = document.getElementById("filters");
const input = document.getElementById("searchInput");
const heroInput = document.getElementById("heroSearchInput");
let currentCategory = "Todos";

function whatsappFor(productName) {
  return `${WHATSAPP}?text=${encodeURIComponent(
    `Olá! Quero orçamento para: ${productName}. Pode me passar valores e disponibilidade?`
  )}`;
}

function categories() {
  return ["Todos", ...new Set(window.PRODUTOS_GARBO.map((p) => p.category))];
}

function renderFilters() {
  filters.innerHTML = categories()
    .map(
      (c) =>
        `<button class="filter-btn ${c === currentCategory ? "active" : ""}" onclick="setCategory('${c}')">${c}</button>`
    )
    .join("");
}

function productCard(p, i) {
  return `
    <article class="product-card" data-index="${i}">
      <div class="product-image" onclick="openModal(${i})">
        <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
        <span class="tag">${p.category}</span>
        <span class="photo-count">${p.images.length} fotos</span>
      </div>
      <div class="product-content">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <div class="product-actions">
          <a class="btn btn-primary" href="${whatsappFor(p.name)}" target="_blank" rel="noreferrer">Orçar</a>
          <button type="button" onclick="openModal(${i})">Ver fotos</button>
        </div>
      </div>
    </article>`;
}

function heroProductCard(p, i) {
  return `
    <article class="hero-product-card" onclick="openModal(${i})">
      <img src="${p.images[0]}" alt="${p.name}" loading="eager">
      <div class="hero-product-info">
        <small>${p.category}</small>
        <h3>${p.name}</h3>
        <span>Orçar agora</span>
      </div>
    </article>`;
}

function renderHeroProducts() {
  const featured = window.PRODUTOS_GARBO.slice(0, 4);
  heroGrid.innerHTML = featured
    .map((p) => heroProductCard(p, window.PRODUTOS_GARBO.indexOf(p)))
    .join("");
}

function getSearchValue() {
  return (input?.value || "").toLowerCase().trim();
}

function renderProducts() {
  const q = getSearchValue();
  const items = window.PRODUTOS_GARBO.filter(
    (p) =>
      (currentCategory === "Todos" || p.category === currentCategory) &&
      `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(q)
  );

  grid.innerHTML =
    items.map((p) => productCard(p, window.PRODUTOS_GARBO.indexOf(p))).join("") ||
    '<p class="lead">Nenhum produto encontrado. Tente buscar por mesa, toalha ou ombrelone.</p>';
}

function setCategory(c) {
  currentCategory = c;
  renderFilters();
  renderProducts();
}

function syncHeroSearch() {
  if (!heroInput || !input) return;
  input.value = heroInput.value;
  document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" });
  renderProducts();
}

if (input) input.addEventListener("input", renderProducts);
if (heroInput) {
  heroInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") syncHeroSearch();
  });
  heroInput.addEventListener("input", () => {
    if (input) input.value = heroInput.value;
    renderProducts();
  });
}

function openModal(i) {
  const p = window.PRODUTOS_GARBO[i];
  document.getElementById("modalTitle").innerText = p.name;
  document.getElementById("modalCategory").innerText = p.category;
  document.getElementById("modalDesc").innerText = p.description;
  document.getElementById("modalWhatsapp").href = whatsappFor(p.name);

  const imgs = p.images;
  document.getElementById("gallery").innerHTML = `
    <img class="gallery-main" src="${imgs[0]}" alt="${p.name}">
    <div class="gallery-side">
      ${imgs
        .slice(1, 4)
        .map((src) => `<img src="${src}" alt="${p.name}">`)
        .join("")}
    </div>`;

  const modal = document.getElementById("modal");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

document.getElementById("modal")?.addEventListener("click", (event) => {
  if (event.target.id === "modal") closeModal();
});

renderFilters();
renderHeroProducts();
renderProducts();
