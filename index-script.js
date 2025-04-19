/**
 * index-script.js
 * InmunoMedi e-commerce - Versión ULTRA PREMIUM
 * Página principal con diseño impactante, optimizada para captar clientes
 * Hero dinámico, carrusel destacado, beneficios, testimonios, CTA poderoso
 * Ahora con Google Tag Manager y eventos de seguimiento GA4
 */
  
// Google Tag Manager
import Toastify from 'https://cdn.jsdelivr.net/npm/toastify-js@1.12.0/src/toastify.min.js';
import { gsap } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js';
import { ScrollTrigger } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js';
import { productosData } from './products-section.js';  

// Google Tag Manager
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MCPS5HTD');

gsap.registerPlugin(ScrollTrigger);

// Inicializar Data Layer para GTM
window.dataLayer = window.dataLayer || [];

// --- CLASE CARRITO ---
class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('cart')) || [];
  }

  addItem(productId, quantity) {
    const producto = productosData.find(p => p.id === productId);
    if (!producto || producto.stock <= 0) {
      this.toast(producto ? "¡Producto agotado!" : "Producto no encontrado", "#dc3545");
      return;
    }
    if (producto.stock < quantity) {
      this.toast(`Solo quedan ${producto.stock} unidades`, "#ffc107");
      return;
    }

    const existente = this.items.find(i => i.id === productId);
    if (existente) {
      existente.quantity += quantity;
    } else {
      this.items.push({
        id: productId,
        nombre: producto.nombre,
        imagen: producto.imagenes[0],
        quantity,
        precio: this.calcularPrecio(producto, quantity)
      });
    }

    this.save();
    this.updateUI();
    this.toast(`${producto.nombre} añadido al carrito`, "#28a745");

    // Evento GA4: add_to_cart
    window.dataLayer.push({
      event: 'add_to_cart',
      ecommerce: {
        currency: 'MXN',
        value: this.calcularPrecio(producto, quantity) * quantity,
        items: [{
          item_id: producto.id,
          item_name: producto.nombre,
          price: this.calcularPrecio(producto, quantity),
          quantity: quantity
        }]
      }
    });
  }

  calcularPrecio(producto, cantidad) {
    return cantidad >= producto.mayoreoMinimo && producto.precioMayoreo
      ? producto.precioMayoreo
      : producto.precioUnitario;
  }

  save() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  updateUI() {
    const countEl = document.querySelector('.cart-count');
    if (countEl) {
      const total = this.items.reduce((sum, i) => sum + i.quantity, 0);
      countEl.textContent = total;
      countEl.style.display = total > 0 ? 'block' : 'none';
    }
  }

  toast(text, color) {
    Toastify({
      text,
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: color,
      className: "toastify-premium montserrat"
    }).showToast();
  }
}

// --- CLASE WISHLIST ---
class Wishlist {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('wishlist')) || [];
  }

  toggle(productId) {
    const index = this.items.findIndex(p => p.id === productId);
    const producto = productosData.find(p => p.id === productId);
    if (!producto) return;

    if (index === -1) {
      this.items.push({ id: producto.id, nombre: producto.nombre, imagen: producto.imagenes[0] });
      this.toast(`${producto.nombre} añadido a favoritos`, "#007bff");
      // Evento GA4: add_to_wishlist
      window.dataLayer.push({
        event: 'add_to_wishlist',
        ecommerce: {
          currency: 'MXN',
          items: [{
            item_id: producto.id,
            item_name: producto.nombre,
            price: producto.precioUnitario
          }]
        }
      });
    } else {
      this.items.splice(index, 1);
      this.toast(`${producto.nombre} eliminado de favoritos`, "#dc3545");
    }

    this.save();
    this.updateIcon(productId);
  }

  save() {
    localStorage.setItem('wishlist', JSON.stringify(this.items));
  }

  updateIcon(productId) {
    document.querySelectorAll(`.wishlist-btn[data-product="${productId}"]`).forEach(btn => {
      const enLista = this.items.some(p => p.id === productId);
      btn.classList.toggle('active', enLista);
      btn.querySelector('i').className = enLista ? "fas fa-heart" : "far fa-heart";
    });
  }

  updateAllIcons() {
    this.items.forEach(item => this.updateIcon(item.id));
  }

  toast(text, color) {
    Toastify({
      text,
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: color,
      className: "toastify-premium montserrat"
    }).showToast();
  }
}

// --- RENDER HERO ---
function renderizarHero() {
  const hero = document.querySelector('.hero-section');
  if (!hero) return;

  hero.innerHTML = `
    <div class="text-center py-5 bg-gradient-primary text-white rounded-4 shadow-lg">
      <h1 class="display-3 fw-bold montserrat">Revoluciona tu Sistema Inmune</h1>
      <p class="lead montserrat">Descubre los productos innovadores de InmunoMedi para un bienestar total.</p>
      <a href="#catalogo-productos" class="btn btn-light btn-lg mt-3 scroll-to">Explora Ahora</a>
    </div>
  `;

  gsap.from(hero, { opacity: 0, y: 100, duration: 1.5, ease: 'power4.out' });
  gsap.from(hero.querySelector('h1'), { opacity: 0, scale: 0.8, duration: 1, delay: 0.3, ease: 'elastic.out(1, 0.3)' });
  gsap.from(hero.querySelector('p'), { opacity: 0, y: 20, duration: 1, delay: 0.5, ease: 'power2.out' });
  gsap.from(hero.querySelector('a'), { opacity: 0, y: 20, duration: 1, delay: 0.7, ease: 'power2.out' });
}

// --- RENDER CARRUSEL DESTACADO ---
function renderizarCarruselDestacado() {
  const carouselInner = document.querySelector('.carousel-inner');
  if (!carouselInner) return;

  const productosDestacados = productosData
    .filter(p => p.etiquetas.length > 0)
    .slice(0, 4);

  carouselInner.innerHTML = productosDestacados.map((producto, index) => `
    <div class="carousel-item ${index === 0 ? 'active' : ''}" data-product-id="${producto.id}">
      <div class="row align-items-center">
        <div class="col-md-6">
          <img src="${producto.imagenes[0]}" alt="${producto.nombre}" class="d-block w-100" loading="lazy">
        </div>
        <div class="col-md-6 carousel-caption text-start">
          <h2 class="display-4 fw-bold montserrat">${producto.nombre}</h2>
          <p class="lead">${producto.descripcionCorta}</p>
          <p class="h4 text-primary">$${producto.precioUnitario}</p>
          <div class="d-flex gap-2 mt-3">
            <button class="btn btn-primary add-to-cart-btn" data-product="${producto.id}" ${producto.stock <= 0 ? 'disabled' : ''}>Añadir al Carrito</button>
            <button class="btn btn-outline-primary wishlist-btn" data-product="${producto.id}">
              <i class="${new Wishlist().items.some(p => p.id === producto.id) ? 'fas' : 'far'} fa-heart"></i>
            </button>
          </div>
          <div class="stock-alert mt-2 ${producto.stock > 10 ? 'd-none' : ''}">
            ${producto.stock <= 0 ? '<span class="text-danger fw-bold">¡Agotado!</span>' : `<span class="text-warning fw-bold">¡Últimas ${producto.stock} unidades!</span>`}
          </div>
        </div>
      </div>
    </div>
  `).join('');

  inicializarBotones();
  gsap.from('.carousel-item', { opacity: 0, y: 50, duration: 1, stagger: 0.2, scrollTrigger: { trigger: '.carousel', start: 'top 85%' } });

  // Evento GA4: view_item para productos en el carrusel
  productosDestacados.forEach(producto => {
    window.dataLayer.push({
      event: 'view_item',
      ecommerce: {
        currency: 'MXN',
        items: [{
          item_id: producto.id,
          item_name: producto.nombre,
          price: producto.precioUnitario
        }]
      }
    });
  });
}

// --- RENDER BENEFICIOS ---
function renderizarBeneficios() {
  const beneficios = [
    {
      icon: 'fas fa-shield-virus',
      titulo: 'Protección Inmunológica',
      texto: 'Fortalece tus defensas con productos como Factor de Transferencia.'
    },
    {
      icon: 'fas fa-heartbeat',
      titulo: 'Salud Cardiovascular',
      texto: 'Apoya tu corazón con Artikom y DK Fort.'
    },
    {
      icon: 'fas fa-bacteria',
      titulo: 'Equilibrio Intestinal',
      texto: 'Mejora tu digestión con Daily Pro.'
    },
    {
      icon: 'fas fa-hourglass-half',
      titulo: 'Antienvejecimiento',
      texto: 'Rejuvenece con Null Age Ampolleta.'
    }
  ];

  const contenedor = document.querySelector('#beneficios-grid');
  if (!contenedor) return;

  contenedor.innerHTML = beneficios.map((b, i) => `
    <div class="col-md-6 col-lg-3 animate__animated animate__fadeInUp delay-${i}">
      <div class="beneficio-card p-4 rounded shadow-sm bg-white h-100">
        <div class="beneficio-icon mb-4 d-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: linear-gradient(135deg, #056afa, #417ecd); box-shadow: 0 10px 20px rgba(5,106,250,0.2);">
          <i class="${b.icon} text-white fs-3"></i>
        </div>
        <h3 class="h5 fw-bold text-primary mb-3 montserrat">${b.titulo}</h3>
        <p>${b.texto}</p>
      </div>
    </div>
  `).join('');

  gsap.from('.beneficio-card', {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3,
    scrollTrigger: { trigger: '#beneficios', start: 'top 90%' }
  });
}

// --- RENDER TESTIMONIOS ---
function renderizarTestimonios() {
  const testimonios = [
    {
      nombre: 'María G.',
      texto: 'El Factor de Transferencia cambió mi salud. ¡Mis defensas están al 100!',
      rating: 5
    },
    {
      nombre: 'Ana L.',
      texto: 'Null Age Ampolleta rejuveneció mi piel en semanas. ¡Increíble!',
      rating: 5
    },
    {
      nombre: 'Carlos R.',
      texto: 'Inm Box es súper práctico y efectivo. Más energía y mejor digestión.',
      rating: 4
    }
  ];

  const contenedor = document.querySelector('#testimonios-clientes');
  if (!contenedor) return;

  contenedor.innerHTML = testimonios.map((t, i) => `
    <div class="col-md-4 animate__animated animate__fadeInUp delay-${i}">
      <div class="testimonial-card p-4 bg-light shadow-sm rounded h-100">
        <div class="rating-container mb-2">
          ${Array.from({ length: 5 }, (_, j) => `<i class="fas fa-star${j < t.rating ? '' : '-regular'} text-warning"></i>`).join('')}
        </div>
        <p class="testimonial-text montserrat">"${t.texto}"</p>
        <h5 class="mt-3 text-primary">${t.nombre}</h5>
      </div>
    </div>
  `).join('');

  gsap.from('.testimonial-card', {
    opacity: 0,
    x: -50,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: { trigger: '#testimonios-clientes', start: 'top 90%' }
  });
}

// --- RENDER CTA ---
function renderizarCTA() {
  const cta = document.querySelector('#cta-compra');
  if (!cta) return;

  cta.innerHTML = `
    <div class="text-center p-5 bg-primary text-white rounded-4 shadow-lg animate__animated animate__zoomIn">
      <h2 class="fw-bold mb-3 montserrat">¡Eleva tu Salud con InmunoMedi!</h2>
      <p class="lead">Explora nuestra gama de productos para un bienestar total. ¡Compra ahora y aprovecha las ofertas!</p>
      <a href="#catalogo-productos" class="btn btn-light btn-lg mt-3 scroll-to">Ir al Catálogo</a>
    </div>
  `;

  gsap.from('#cta-compra', {
    opacity: 0,
    scale: 0.9,
    duration: 1,
    delay: 0.5,
    ease: 'elastic.out(1, 0.3)'
  });

  // Evento GA4: select_content para el CTA
  cta.querySelector('a').addEventListener('click', () => {
    window.dataLayer.push({
      event: 'select_content',
      content_type: 'cta',
      content_id: 'explora-ahora'
    });
  });
}

// --- INICIALIZAR BOTONES ---
function inicializarBotones() {
  const cart = new Cart();
  const wishlist = new Wishlist();

  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.product;
      cart.addItem(id, 1);
    });
  });

  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    const id = btn.dataset.product;
    wishlist.updateIcon(id);
    btn.addEventListener('click', () => wishlist.toggle(id));
  });
}

// --- INICIALIZAR MINI-CARRITO ---
function inicializarMiniCarrito() {
  const cartIcon = document.querySelector('.cart-icon');
  const miniCart = document.getElementById('mini-cart');
  if (!cartIcon || !miniCart) return;

  cartIcon.addEventListener('click', e => {
    e.preventDefault();
    miniCart.classList.toggle('active');
    if (miniCart.classList.contains('active')) {
      renderizarMiniCarrito();
      gsap.from(miniCart, { opacity: 0, x: 50, duration: 0.5, ease: 'power2.out' });
      // Evento GA4: view_cart
      window.dataLayer.push({
        event: 'view_cart',
        ecommerce: {
          currency: 'MXN',
          items: new Cart().items.map(item => ({
            item_id: item.id,
            item_name: item.nombre,
            price: item.precio,
            quantity: item.quantity
          }))
        }
      });
    }
  });

  document.addEventListener('click', e => {
    if (!miniCart.contains(e.target) && !cartIcon.contains(e.target)) {
      miniCart.classList.remove('active');
    }
  });
}

function renderizarMiniCarrito() {
  const miniCart = document.getElementById('mini-cart');
  if (!miniCart) return;

  const cart = new Cart();
  miniCart.innerHTML = `
    <div class="mini-cart-header montserrat">
      <h5>Tu Carrito (${cart.items.length} ítems)</h5>
      <button class="btn-close" aria-label="Cerrar carrito"></button>
    </div>
    <div class="mini-cart-body">
      ${cart.items.length === 0 ? '<p class="text-muted">Carrito vacío</p>' : cart.items.map(item => `
        <div class="mini-cart-item d-flex align-items-center mb-3">
          <img src="${item.imagen}" alt="${item.nombre}" class="me-3" style="width: 50px; height: 50px; object-fit: cover;">
          <div>
            <h6 class="mb-1">${item.nombre}</h6>
            <p class="mb-0">Cantidad: ${item.quantity} | $${item.precio * item.quantity}</p>
          </div>
        </div>
      `).join('')}
    </div>
    ${cart.items.length > 0 ? `
      <div class="mini-cart-footer">
        <a href="#carrito" class="btn btn-primary w-100 scroll-to">Ver Carrito</a>
      </div>
    ` : ''}
  `;

  miniCart.querySelector('.btn-close')?.addEventListener('click', () => {
    miniCart.classList.remove('active');
  });

  // Evento GA4: begin_checkout (si se hace clic en "Ver Carrito")
  miniCart.querySelector('.scroll-to')?.addEventListener('click', () => {
    window.dataLayer.push({
      event: 'begin_checkout',
      ecommerce: {
        currency: 'MXN',
        items: cart.items.map(item => ({
          item_id: item.id,
          item_name: item.nombre,
          price: item.precio,
          quantity: item.quantity
        }))
      }
    });
  });
}

// --- PROMOCIONES TEMPORALES ---
function mostrarPromocionesTemporales() {
  const hoy = new Date();
  const promociones = productosData.filter(p => p.etiquetas.includes('promocion') && new Date(p.fechaLanzamiento) > new Date(hoy - 30 * 24 * 60 * 60 * 1000));
  const contenedor = document.getElementById('promociones-temporales');
  if (!contenedor || promociones.length === 0) return;

  contenedor.innerHTML = `
    <div class="alert alert-warning alert-dismissible fade show shadow-lg montserrat" role="alert">
      <h4 class="alert-heading">¡Ofertas Exclusivas!</h4>
      <p>Aprovecha descuentos en nuestros productos estrella:</p>
      <ul class="list-unstyled">
        ${promociones.map(p => `
          <li>
            <strong>${p.nombre}</strong> – <span class="text-danger">$${p.precioMayoreo || p.precioUnitario}</span>
            <button class="btn btn-sm btn-primary ms-2 add-to-cart-btn" data-product="${p.id}">Añadir</button>
          </li>
        `).join('')}
      </ul>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;

  gsap.from(contenedor, { opacity: 0, scale: 0.8, duration: 0.7, ease: 'back.out(1.7)' });
  inicializarBotones();

  // Evento GA4: view_promotion
  promociones.forEach(p => {
    window.dataLayer.push({
      event: 'view_promotion',
      ecommerce: {
        items: [{
          item_id: p.id,
          item_name: p.nombre,
          price: p.precioMayoreo || p.precioUnitario,
          promotion_name: 'Ofertas Exclusivas'
        }]
      }
    });
  });
}

// --- COMPARTIR SOCIAL ---
function inicializarCompartirSocial() {
  document.querySelectorAll('.share-options a').forEach(enlace => {
    enlace.addEventListener('click', e => {
      e.preventDefault();
      const productId = enlace.closest('.carousel-item')?.dataset.productId;
      const producto = productosData.find(p => p.id === productId);
      if (!producto) return;

      const url = `https://inmunomedi.com/productos#${productId}`;
      const texto = `¡Mira ${producto.nombre} en InmunoMedi! ${producto.descripcionCorta}`;
      let urlCompartir = '';

      const icon = enlace.querySelector('i');
      const plataforma = icon?.classList[1]?.split('-')[1];

      switch (plataforma) {
        case 'facebook':
          urlCompartir = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
          break;
        case 'twitter':
          urlCompartir = `https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}&url=${encodeURIComponent(url)}`;
          break;
        case 'whatsapp':
          urlCompartir = `https://api.whatsapp.com/send?text=${encodeURIComponent(texto + ' ' + url)}`;
          break;
        case 'envelope':
          urlCompartir = `mailto:?subject=${encodeURIComponent(producto.nombre)}&body=${encodeURIComponent(texto + ' ' + url)}`;
          break;
      }

      if (urlCompartir) window.open(urlCompartir, '_blank');

      // Evento GA4: share
      window.dataLayer.push({
        event: 'share',
        method: plataforma,
        content_type: 'product',
        item_id: productId
      });
    });
  });
}

// --- MODO OSCURO INTELIGENTE ---
function aplicarModoOscuroInteligente() {
  const hora = new Date().getHours();
  if (hora >= 20 || hora < 6) {
    document.body.classList.add('modo-oscuro');
  }
}

// --- ANALÍTICAS DE INTERACCIONES ---
function rastrearInteracciones() {
  const eventos = ['click:add-to-cart', 'click:wishlist'];
  eventos.forEach(evento => {
    const [action, tipo] = evento.split(':');
    document.querySelectorAll(`.${tipo}-btn`).forEach(btn => {
      btn.addEventListener(action, () => {
        const productId = btn.dataset.product;
        console.log(`Evento registrado: ${tipo}`, { productId, timestamp: new Date().toISOString() });
      });
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const productId = entry.target.dataset.productId;
        console.log('Producto visto:', productId);
        // Evento GA4: view_item (en IntersectionObserver)
        const producto = productosData.find(p => p.id === productId);
        if (producto) {
          window.dataLayer.push({
            event: 'view_item',
            ecommerce: {
              currency: 'MXN',
              items: [{
                item_id: producto.id,
                item_name: producto.nombre,
                price: producto.precioUnitario
              }]
            }
          });
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.carousel-item').forEach(item => observer.observe(item));
}

// --- OPTIMIZACIÓN DE RENDIMIENTO ---
function optimizarRendimiento() {
  let isScrolling;
  window.addEventListener('scroll', () => {
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  });

  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach(img => {
    img.addEventListener('load', () => {
      gsap.to(img, { opacity: 1, duration: 0.5 });
    });
  });
}

// --- ACCESIBILIDAD ---
function mejorarAccesibilidad() {
  document.querySelectorAll('.add-to-cart-btn, .wishlist-btn').forEach(btn => {
    btn.setAttribute('tabindex', '0');
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    const productId = btn.dataset.product;
    const producto = productosData.find(p => p.id === productId);
    if (producto) btn.setAttribute('aria-label', `Añadir ${producto.nombre} al carrito`);
  });

  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    const productId = btn.dataset.product;
    const producto = productosData.find(p => p.id === productId);
    if (producto) btn.setAttribute('aria-label', `Añadir ${producto.nombre} a favoritos`);
  });
}

// --- INICIALIZACIÓN GLOBAL ---
document.addEventListener('DOMContentLoaded', () => {
  const cart = new Cart();
  const wishlist = new Wishlist();

  cart.updateUI();
  wishlist.updateAllIcons();
  renderizarHero();
  renderizarCarruselDestacado();
  renderizarBeneficios();
  renderizarTestimonios();
  renderizarCTA();
  mostrarPromocionesTemporales();
  inicializarMiniCarrito();
  inicializarCompartirSocial();
  aplicarModoOscuroInteligente();
  rastrearInteracciones();
  optimizarRendimiento();
  mejorarAccesibilidad();

  document.querySelectorAll('.scroll-to').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').substring(1);
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    });
  });

  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });

  gsap.from('header', { y: -100, opacity: 0, duration: 1, ease: 'power3.out' });

  try {
    const carrusel = document.getElementById('carouselProductos');
    if (carrusel) {
      carrusel.addEventListener('slide.bs.carousel', e => {
        const productId = productosData[e.to].id;
        console.log('Carrusel cambiado a:', productId);
        // Evento GA4: select_item
        const producto = productosData.find(p => p.id === productId);
        if (producto) {
          window.dataLayer.push({
            event: 'select_item',
            ecommerce: {
              currency: 'MXN',
              items: [{
                item_id: producto.id,
                item_name: producto.nombre,
                price: producto.precioUnitario
              }]
            }
          });
        }
      });
    }
  } catch (error) {
    console.warn('Error en inicialización del carrusel:', error);
  }
});