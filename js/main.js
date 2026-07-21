const PRODUCTS = {
  origen70: {
    id: 'origen70',
    name: 'AMAKAO Origen 70%',
    shortName: 'Origen 70%',
    price: 32.90,
    category: 'oscuro',
    cacao: '70% cacao',
    image: 'assets/product-70.svg',
    description: 'Chocolate oscuro de perfil equilibrado, elaborado para resaltar el carácter del cacao amazónico peruano.',
    longDescription: 'Una tableta elegante e intensa, con notas profundas de cacao, frutos secos y un final suavemente tostado. Diseñada para quienes buscan una experiencia premium con identidad peruana.',
    features: ['Cacao amazónico peruano', 'Perfil intenso y equilibrado', 'Presentación premium de 80 g', 'Ideal para regalo o consumo personal'],
    ingredients: 'Pasta de cacao, azúcar, manteca de cacao y vainilla natural. Información referencial para fines académicos.',
    origin: 'Amazonía peruana. Producto conceptual desarrollado para el proyecto académico AMAKAO.'
  },
  selva80: {
    id: 'selva80',
    name: 'AMAKAO Selva Intensa 80%',
    shortName: 'Selva Intensa 80%',
    price: 35.90,
    category: 'intenso',
    cacao: '80% cacao',
    image: 'assets/product-80.svg',
    description: 'Una experiencia de sabor profundo para quienes prefieren chocolates con mayor concentración de cacao.',
    longDescription: 'Chocolate oscuro de gran intensidad, con aroma persistente, amargor elegante y textura fina. Su identidad visual y sensorial se inspira en la fuerza de la selva peruana.',
    features: ['Mayor concentración de cacao', 'Sabor profundo y persistente', 'Presentación premium de 80 g', 'Perfil ideal para amantes del chocolate oscuro'],
    ingredients: 'Pasta de cacao, azúcar, manteca de cacao. Información referencial para fines académicos.',
    origin: 'Amazonía peruana. Producto conceptual desarrollado para el proyecto académico AMAKAO.'
  },
  aguaymanto: {
    id: 'aguaymanto',
    name: 'AMAKAO Cacao y Aguaymanto',
    shortName: 'Cacao y Aguaymanto',
    price: 34.90,
    category: 'frutal',
    cacao: '65% cacao',
    image: 'assets/product-aguaymanto.svg',
    description: 'Chocolate peruano con notas frutales inspirado en la combinación del cacao y el aguaymanto.',
    longDescription: 'Una propuesta contemporánea que une la intensidad del cacao amazónico con el carácter cítrico y delicado del aguaymanto peruano.',
    features: ['Combinación de ingredientes peruanos', 'Perfil frutal y equilibrado', 'Presentación premium de 80 g', 'Ideal para descubrir nuevos sabores'],
    ingredients: 'Pasta de cacao, azúcar, manteca de cacao y aguaymanto deshidratado. Información referencial para fines académicos.',
    origin: 'Perú. Producto conceptual desarrollado para el proyecto académico AMAKAO.'
  },
  descubrimiento: {
    id: 'descubrimiento',
    name: 'Caja Descubrimiento AMAKAO',
    shortName: 'Caja Descubrimiento',
    price: 79.90,
    category: 'regalo',
    cacao: '4 variedades',
    image: 'assets/product-box.svg',
    description: 'Una selección de chocolates creada para conocer distintos sabores y porcentajes de cacao.',
    longDescription: 'La opción ideal para regalar o explorar el universo AMAKAO. Incluye cuatro propuestas conceptuales de chocolate premium inspiradas en el cacao y los ingredientes del Perú.',
    features: ['Cuatro variedades', 'Presentación de regalo', 'Selección de perfiles intensos y frutales', 'Experiencia premium para compartir'],
    ingredients: 'Varía según cada chocolate. Información referencial para fines académicos.',
    origin: 'Perú. Producto conceptual desarrollado para el proyecto académico AMAKAO.'
  }
};

const money = value => new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(value);

function getCart() {
  try {
    return JSON.parse(localStorage.getItem('amakaoCart')) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('amakaoCart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const total = getCart().reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('.cart-count').forEach(el => el.textContent = total);
}

function addToCart(productId, quantity = 1) {
  const product = PRODUCTS[productId];
  if (!product) return;
  const cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) existing.quantity += Number(quantity);
  else cart.push({ id: productId, quantity: Number(quantity) });
  saveCart(cart);
  showToast(`${product.shortName} fue agregado al carrito.`);
}

function showToast(message) {
  let toast = document.querySelector('.site-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'site-toast';
    Object.assign(toast.style, {
      position: 'fixed', right: '20px', bottom: '20px', zIndex: 2000,
      maxWidth: '340px', padding: '15px 18px', borderRadius: '10px',
      background: '#233a24', color: '#fffdf8', boxShadow: '0 14px 40px rgba(0,0,0,.25)',
      opacity: '0', transform: 'translateY(12px)', transition: '.25s ease'
    });
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });
  clearTimeout(window.__amakaoToast);
  window.__amakaoToast = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
  }, 2400);
}

function initHeader() {
  const toggle = document.querySelector('.menu-toggle');
  const panel = document.querySelector('.mobile-panel');
  if (toggle && panel) {
    toggle.addEventListener('click', () => {
      const open = panel.classList.toggle('open');
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });
    panel.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      panel.classList.remove('open');
      document.body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }));
  }
}

function initQuickAdd() {
  document.querySelectorAll('[data-add-to-cart]').forEach(button => {
    button.addEventListener('click', () => addToCart(button.dataset.addToCart, 1));
  });
}

function initFilters() {
  const buttons = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-category]');
  const search = document.querySelector('#catalogSearch');
  if (!cards.length) return;

  let activeFilter = 'todos';
  const apply = () => {
    const term = (search?.value || '').trim().toLowerCase();
    cards.forEach(card => {
      const matchesFilter = activeFilter === 'todos' || card.dataset.category === activeFilter;
      const matchesSearch = !term || card.dataset.name.toLowerCase().includes(term);
      card.classList.toggle('hidden', !(matchesFilter && matchesSearch));
    });
  };

  buttons.forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    buttons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    apply();
  }));
  search?.addEventListener('input', apply);
}

function initProductPage() {
  const root = document.querySelector('#productDetailRoot');
  if (!root) return;
  const params = new URLSearchParams(location.search);
  const id = params.get('id') || 'origen70';
  const p = PRODUCTS[id] || PRODUCTS.origen70;
  document.title = `${p.name} | AMAKAO`;
  root.innerHTML = `
    <div class="product-gallery fade-in">
      <div class="product-main-image"><img src="${p.image}" alt="${p.name}"></div>
    </div>
    <div class="product-detail-copy fade-in">
      <p class="product-kicker">Chocolate peruano premium · ${p.cacao}</p>
      <h1>${p.name}</h1>
      <p class="lead">${p.longDescription}</p>
      <div class="product-detail-price">${money(p.price)}</div>
      <ul class="product-bullets">
        ${p.features.map(item => `<li><i class="fa-solid fa-check"></i><span>${item}</span></li>`).join('')}
      </ul>
      <div class="quantity-row">
        <div class="quantity-control" aria-label="Cantidad">
          <button type="button" id="qtyMinus" aria-label="Disminuir cantidad">−</button>
          <input id="productQty" type="number" min="1" value="1" aria-label="Cantidad">
          <button type="button" id="qtyPlus" aria-label="Aumentar cantidad">+</button>
        </div>
        <button class="btn btn-primary" id="detailAdd"><i class="fa-solid fa-bag-shopping"></i> Agregar al carrito</button>
      </div>
      <div class="notice">Los nombres, precios e ingredientes son referenciales y forman parte de una propuesta académica.</div>
      <div class="detail-panels">
        <details class="detail-panel" open><summary>Descripción</summary><p>${p.description}</p></details>
        <details class="detail-panel"><summary>Ingredientes</summary><p>${p.ingredients}</p></details>
        <details class="detail-panel"><summary>Origen</summary><p>${p.origin}</p></details>
      </div>
    </div>`;

  const qty = root.querySelector('#productQty');
  root.querySelector('#qtyMinus').addEventListener('click', () => qty.value = Math.max(1, Number(qty.value) - 1));
  root.querySelector('#qtyPlus').addEventListener('click', () => qty.value = Number(qty.value) + 1);
  root.querySelector('#detailAdd').addEventListener('click', () => addToCart(p.id, Math.max(1, Number(qty.value))));
}

function renderCart() {
  const itemsRoot = document.querySelector('#cartItems');
  const summaryRoot = document.querySelector('#cartSummary');
  if (!itemsRoot || !summaryRoot) return;
  const cart = getCart();
  if (!cart.length) {
    itemsRoot.innerHTML = `<div class="empty-cart"><i class="fa-solid fa-bag-shopping"></i><h2>Tu carrito está vacío</h2><p>Explora nuestros chocolates y agrega tus favoritos.</p><a class="btn btn-primary" href="chocolates.html">Ver chocolates</a></div>`;
    summaryRoot.innerHTML = `<h3>Resumen</h3><div class="summary-row"><span>Subtotal</span><strong>${money(0)}</strong></div><div class="summary-row total"><span>Total</span><strong>${money(0)}</strong></div><button class="btn btn-primary btn-block" disabled>Continuar compra</button>`;
    return;
  }

  itemsRoot.innerHTML = cart.map(item => {
    const p = PRODUCTS[item.id];
    const line = p.price * item.quantity;
    return `<article class="cart-item fade-in" data-cart-id="${p.id}">
      <a href="producto.html?id=${p.id}"><img src="${p.image}" alt="${p.name}"></a>
      <div>
        <h3><a href="producto.html?id=${p.id}">${p.name}</a></h3>
        <p>${p.cacao} · Presentación conceptual</p>
        <div class="cart-item-actions">
          <div class="quantity-control">
            <button type="button" data-cart-minus="${p.id}" aria-label="Disminuir">−</button>
            <input type="number" min="1" value="${item.quantity}" data-cart-qty="${p.id}" aria-label="Cantidad de ${p.name}">
            <button type="button" data-cart-plus="${p.id}" aria-label="Aumentar">+</button>
          </div>
          <button class="remove-button" data-cart-remove="${p.id}">Eliminar</button>
        </div>
      </div>
      <div class="cart-line-price">${money(line)}</div>
    </article>`;
  }).join('');

  const subtotal = cart.reduce((sum, item) => sum + PRODUCTS[item.id].price * item.quantity, 0);
  const delivery = subtotal >= 120 ? 0 : 12;
  summaryRoot.innerHTML = `
    <h3>Resumen de compra</h3>
    <div class="summary-row"><span>Subtotal</span><strong>${money(subtotal)}</strong></div>
    <div class="summary-row"><span>Envío referencial</span><strong>${delivery ? money(delivery) : 'Gratis'}</strong></div>
    <div class="summary-row total"><span>Total</span><strong>${money(subtotal + delivery)}</strong></div>
    <button class="btn btn-primary btn-block" id="checkoutButton">Continuar compra</button>
    <p style="font-size:.78rem;color:#75675c;margin-top:14px">Demo académica: no procesa pagos reales.</p>`;

  itemsRoot.querySelectorAll('[data-cart-minus]').forEach(btn => btn.addEventListener('click', () => changeQty(btn.dataset.cartMinus, -1)));
  itemsRoot.querySelectorAll('[data-cart-plus]').forEach(btn => btn.addEventListener('click', () => changeQty(btn.dataset.cartPlus, 1)));
  itemsRoot.querySelectorAll('[data-cart-qty]').forEach(input => input.addEventListener('change', () => setQty(input.dataset.cartQty, Number(input.value))));
  itemsRoot.querySelectorAll('[data-cart-remove]').forEach(btn => btn.addEventListener('click', () => removeCartItem(btn.dataset.cartRemove)));
  document.querySelector('#checkoutButton')?.addEventListener('click', () => showToast('Esta es una demostración académica. El pago no está habilitado.'));
}

function changeQty(id, amount) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.quantity = Math.max(1, item.quantity + amount);
  saveCart(cart);
  renderCart();
}
function setQty(id, value) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.quantity = Math.max(1, Number(value) || 1);
  saveCart(cart);
  renderCart();
}
function removeCartItem(id) {
  saveCart(getCart().filter(item => item.id !== id));
  renderCart();
}

function initForms() {
  document.querySelectorAll('[data-demo-form]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const message = form.querySelector('.form-message');
      if (message) {
        message.className = 'form-message success';
        message.textContent = 'Gracias. Tu mensaje fue registrado correctamente en esta demostración.';
      } else {
        showToast('Gracias por registrarte en AMAKAO.');
      }
      form.reset();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  updateCartCount();
  initQuickAdd();
  initFilters();
  initProductPage();
  renderCart();
  initForms();
});
