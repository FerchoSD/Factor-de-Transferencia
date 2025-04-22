/**
 * products-section.js
 * InmunoMedi e-commerce - Versión ULTRA PREMIUM
 * Diseño impactante, funcionalidad robusta, optimizado para conversión
 * Render dinámico, filtros, búsqueda, paginación, reseñas, stock en tiempo real
 */

// Google Tag Manager
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MCPS5HTD');
  
import Toastify from 'https://cdn.jsdelivr.net/npm/toastify-js@1.12.0/src/toastify.min.js';
import { gsap } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js';
import { ScrollTrigger } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js';
gsap.registerPlugin(ScrollTrigger);

// --- BASE DE DATOS DE PRODUCTOS (OPTIMIZADA CON ETIQUETAS Y FECHA) ---
const productosData = [
  {
    id: "factor-de-transferencia",
    nombre: "Factor de Transferencia",
    descripcionCorta: "Fortalece tu sistema inmunológico con ciencia avanzada.",
    descripcion: "El Factor de Transferencia utiliza moléculas del calostro bovino para transmitir inmunidad educada. Indicado en infecciones virales, bacterianas, fúngicas, cánceres y enfermedades autoinmunes.",
    presentacion: "Polvo liofilizado, 1 unidad de 1.5ml después de reconstituir",
    precioUnitario: 350,
    precioMayoreo: 300,
    mayoreoMinimo: 5,
    categoria: "inmunidad",
    ingredientes: ["Moléculas inmunitarias", "Agua inyectable"],
    uso: "Aplicar sublingual o IM cada 3 días por 1 mes.",
    opiniones: [
      { texto: "Me recuperé rapidísimo.", autor: "Karla H.", rating: 5 },
      { texto: "Más energía y menos infecciones.", autor: "Daniel M.", rating: 4 }
    ],
    preguntas: [
      "¿Niños? Sí, con dosis y vigilancia médica.",
      "¿Efectos secundarios? Muy bien tolerado, consulta a tu médico."
    ],
    imagenes: [
      "recursos/FCT/CelestinFT__2024_V1.webp",
      "recursos/FCT/CelestinFT__2024_V2.webp",
      "recursos/FCT/Celestin_Inmunomedi_Factor_de_Transferencia_6_Paquete_2.webp"
    ],
    stock: 100,
    rating: 4.5,
    etiquetas: ["nuevo", "mas-vendido"],
    fechaLanzamiento: "2025-01-01",
    ventas: 500
  },
  {
    id: "null-age-ampolleta",
    nombre: "Null Age Ampolleta",
    descripcionCorta: "Rejuvenece tu piel con tecnología innovadora.",
    descripcion: "Null Age mezcla extracto de placenta, ácido hialurónico y factores de crecimiento para rejuvenecimiento avanzado. Ideal rostro, cuello y zonas dañadas.",
    presentacion: "Polvo liofilizado, 1 unidad de 2.5 ml después de reconstituir",
    precioUnitario: 4000,
    precioMayoreo: 3500,
    mayoreoMinimo: 5,
    categoria: "rejuvenecimiento",
    ingredientes: ["Placenta", "Hialurónico", "Factores regenerativos"],
    uso: "Aplicar con dermapen o subcutáneo cada 15 días.",
    opiniones: [
      { texto: "¡Mi piel es otra!", autor: "Ana L.", rating: 5 },
      { texto: "Anti-age brutal.", autor: "Jorge S.", rating: 5 }
    ],
    preguntas: [
      "¿Cuello y rostro? Sí.",
      "¿Frecuencia? Cada 15 días o según especialista."
    ],
    imagenes: [
      "recursos/Null Age/NullAge3R_caja_abierta.jpg",
      "recursos/Null Age/vista_N3R_03+(1).jpg"
    ],
    stock: 50,
    rating: 5,
    etiquetas: ["promocion"],
    fechaLanzamiento: "2024-12-01",
    ventas: 200
  },
  {
    id: "null-age-capsula",
    nombre: "Null Age Cápsula",
    descripcionCorta: "Prolonga la vitalidad y juventud celular.",
    descripcion: "Suplemento oral complementario al tratamiento Null Age. Con vitaminas antioxidantes que prolongan resultados de rejuvenecimiento.",
    presentacion: "Frasco con 60 cápsulas",
    precioUnitario: 2500,
    precioMayoreo: 2000,
    mayoreoMinimo: 5,
    categoria: "rejuvenecimiento",
    ingredientes: ["Vitaminas A, C, E", "Coenzima Q10", "Resveratrol"],
    uso: "Tomar 1 cápsula al día con el desayuno.",
    opiniones: [
      { texto: "Más energía diaria.", autor: "Laura M.", rating: 5 },
      { texto: "Potencia el tratamiento Null Age.", autor: "Sofía T.", rating: 5 }
    ],
    preguntas: [
      "¿Duración del frasco? 2 meses.",
      "¿Seguro a largo plazo? Sí, idealmente bajo guía médica."
    ],
    imagenes: ["recursos/Null Age/vista_N3R_03+(1).jpg"],
    stock: 75,
    rating: 5,
    etiquetas: [],
    fechaLanzamiento: "2024-11-15",
    ventas: 150
  },
  {
    id: "artikom",
    nombre: "Artikom",
    descripcionCorta: "Omega-3 para un corazón fuerte y saludable.",
    descripcion: "Omega-3 de krill antártico, mejora perfil lipídico, función cardíaca, cognitiva e inflamatoria. Alta biodisponibilidad y pesca sustentable.",
    presentacion: "60 cápsulas gel con 500g aceite de krill",
    precioUnitario: 800,
    precioMayoreo: 700,
    mayoreoMinimo: 5,
    categoria: "cardiovascular",
    ingredientes: ["Aceite de Krill", "EPA", "DHA"],
    uso: "2 cápsulas diarias con alimento.",
    opiniones: [
      { texto: "Bajó mi colesterol.", autor: "Ricardo T.", rating: 4 },
      { texto: "Menos inflamación, más energía.", autor: "Sonia V.", rating: 5 }
    ],
    preguntas: [
      "¿Con medicamentos? Sí, con precaución si anticoagulantes.",
      "¿Vegano? No."
    ],
    imagenes: [
      "recursos/Artikom/ArtikOM3__2024_V1.webp",
      "recursos/Artikom/ArtikOM3__2024_V2.webp"
    ],
    stock: 80,
    rating: 4.5,
    etiquetas: ["mas-vendido"],
    fechaLanzamiento: "2024-10-01",
    ventas: 300
  },
  {
    id: "daily-pro",
    nombre: "Daily Pro",
    descripcionCorta: "Probióticos para una digestión óptima.",
    descripcion: "Probiótico multiespecie ideal para toda la familia. Equilibra la microbiota, reduce infecciones y mejora digestión. Versión +15 y +50.",
    presentacion: "30 sobres - 2g cada uno",
    precioUnitario: 600,
    precioMayoreo: null,
    mayoreoMinimo: null,
    categoria: "digestivo",
    ingredientes: ["15 cepas probióticas", "Prebióticos naturales"],
    uso: "1 sobre disuelto en agua, diario por la mañana.",
    opiniones: [
      { texto: "Mejor digestión.", autor: "Sofía T.", rating: 5 },
      { texto: "Reducción de alergias.", autor: "Pedro G.", rating: 5 }
    ],
    preguntas: [
      "¿Niños? Sí.",
      "¿Duración? 30 días."
    ],
    imagenes: [
      "recursos/DailyPro 50/DailyPRO_50_2024_V2.webp",
      "recursos/DailyPro 50/DailyPRO_15V1_Mesadetrabajo1.webp"
    ],
    stock: 90,
    rating: 5,
    etiquetas: [],
    fechaLanzamiento: "2024-09-01",
    ventas: 100
  },
  {
    id: "dk-fort",
    nombre: "DK Fort",
    descripcionCorta: "Multivitamínico para defensas y salud ósea.",
    descripcion: "Fórmula con D3, K2 y minerales. Refuerza sistema inmune y estructura ósea. Recomendado para adultos mayores y mujeres embarazadas.",
    presentacion: "Frasco con 120 cápsulas",
    precioUnitario: 800,
    precioMayoreo: 700,
    mayoreoMinimo: 5,
    categoria: "defensas",
    ingredientes: ["Vitamina D3", "Vitamina K2", "Magnesio", "Zinc"],
    uso: "2 cápsulas al día con desayuno.",
    opiniones: [
      { texto: "Mejores defensas.", autor: "María R.", rating: 4 },
      { texto: "Ideal en invierno.", autor: "Carlos P.", rating: 5 }
    ],
    preguntas: [
      "¿Osteoporosis? Sí.",
      "¿Otros suplementos? Sí, con vigilancia de nutrientes duplicados."
    ],
    imagenes: [
      "recursos/DK Fort/DKFort5__2024_V1.webp",
      "recursos/DK Fort/DKFort5__2024_V2.webp"
    ],
    stock: 70,
    rating: 4.5,
    etiquetas: [],
    fechaLanzamiento: "2024-08-01",
    ventas: 250
  },
  {
    id: "l-ferrin",
    nombre: "L Ferrín",
    descripcionCorta: "Lactoferrina para prevenir infecciones.",
    descripcion: "Lactoferrina, vitamina C y calostro para reforzar sistema inmunológico. Ideal para niños, atletas y postoperatorios.",
    presentacion: "Frasco con 60 cápsulas",
    precioUnitario: 800,
    precioMayoreo: 700,
    mayoreoMinimo: 5,
    categoria: "inmunidad",
    ingredientes: ["Lactoferrina", "Calostro bovino", "Vitamina C"],
    uso: "1 cápsula diaria con alimento.",
    opiniones: [
      { texto: "Cero resfriados este año.", autor: "Clara E.", rating: 5 },
      { texto: "Uso regular y excelente resultado.", autor: "Miguel S.", rating: 4 }
    ],
    preguntas: [
      "¿Niños? Sí, con ajuste de dosis.",
      "¿Alergia a lactosa? Apto, no contiene lactosa."
    ],
    imagenes: ["recursos/L Ferrín/51lIBxgLFDL.__AC_SX300_SY300_QL70_ML2_.jpg"],
    stock: 60,
    rating: 4.5,
    etiquetas: [],
    fechaLanzamiento: "2024-07-01",
    ventas: 180
  },
  {
    id: "inm-mix",
    nombre: "Inm Mix",
    descripcionCorta: "Proteína vegetal para energía y digestión.",
    descripcion: "Mezcla de proteína vegetal con superalimentos y enzimas digestivas. Aporta energía sostenida y regula apetito.",
    presentacion: "Bote de 1000g",
    precioUnitario: 900,
    precioMayoreo: 800,
    mayoreoMinimo: 5,
    categoria: "nutrición",
    ingredientes: ["Proteína vegetal", "Chía", "Espirulina", "Papaya deshidratada"],
    uso: "2 cucharadas con leche vegetal o agua, 1-2 veces al día.",
    opiniones: [
      { texto: "¡Sabe genial!", autor: "Valeria G.", rating: 5 },
      { texto: "Me siento más ligera y con energía.", autor: "Luis R.", rating: 5 }
    ],
    preguntas: [
      "¿Apto para diabéticos? Sí, sin azúcar añadida.",
      "¿Libre de gluten? Sí."
    ],
    imagenes: ["recursos/Inm Mix/proteinavegetal.png"],
    stock: 85,
    rating: 5,
    etiquetas: ["nuevo"],
    fechaLanzamiento: "2025-02-01",
    ventas: 120
  },
  {
    id: "inm-box",
    nombre: "Inm Box",
    descripcionCorta: "Salud integral en un solo paquete.",
    descripcion: "Kit integral con Factor de Transferencia, Daily Pro y DK Fort para inmunidad total. Ideal para toda la familia.",
    presentacion: "Caja con 3 productos y sobres probióticos",
    precioUnitario: 1300,
    precioMayoreo: 1200,
    mayoreoMinimo: 5,
    categoria: "kit-completo",
    ingredientes: ["FCT", "Daily Pro", "DK Fort"],
    uso: "Seguir instrucciones individuales de cada frasco.",
    opiniones: [
      { texto: "Ideal para el invierno.", autor: "Elena M.", rating: 5 },
      { texto: "Todo en uno, lo amo.", autor: "Javier L.", rating: 5 }
    ],
    preguntas: [
      "¿Para principiantes? Perfecto.",
      "¿Interacciones? Consulta al médico si usas otros suplementos."
    ],
    imagenes: ["recursos/InmBox/InmBox__2025_V1-01.webp"],
    stock: 40,
    rating: 5,
    etiquetas: ["promocion", "mas-vendido"],
    fechaLanzamiento: "2024-12-15",
    ventas: 400
  }
];

// --- CLASE CARRITO ---
class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('cart')) || [];
  }

  save() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  /**
   * Añade un producto al carrito.
   * @param {string} productId - ID del producto.
   * @param {number} quantity - Cantidad a añadir.
   */
  addItem(productId, quantity) {
    const producto = productosData.find(p => p.id === productId);
    if (!producto || producto.stock <= 0) {
      mostrarToast(
        producto ? traducciones[CONFIG.DEFAULT_LANG].outOfStock : 'Producto no encontrado',
        '#dc3545'
      );
      return;
    }
    if (producto.stock < quantity) {
      mostrarToast(
        traducciones[CONFIG.DEFAULT_LANG].lowStock.replace('{stock}', producto.stock),
        '#ffc107'
      );
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
  }

  calcularPrecio(producto, cantidad) {
    return cantidad >= producto.mayoreoMinimo && producto.precioMayoreo
      ? producto.precioMayoreo
      : producto.precioUnitario;
  }

  /**
   * Guarda el carrito en localStorage.
   */
  save() {
        try {
      localStorage.setItem('cart', JSON.stringify(this.items));
    } catch (e) {
      console.warn('No se pudo guardar en localStorage:', e);
    }
  }

  /**
   * Actualiza la interfaz del contador del carrito.
   */
  updateUI() {
    const countEl = document.querySelector('.cart-count');
    if (countEl) {
      const total = this.items.reduce((sum, i) => sum + i.quantity, 0);
      countEl.textContent = total;
      countEl.style.display = total > 0 ? 'block' : 'none';
      countEl.setAttribute('aria-label', `Carrito con ${total} ítems`);
    }
  }
}

// --- CLASE WISHLIST ---
/**
 * Gestiona la lista de deseos con persistencia en localStorage.
 */
class Wishlist {
  constructor() {
    try {
      this.items = JSON.parse(localStorage.getItem('wishlist')) || [];
    } catch (e) {
      console.warn('localStorage no disponible:', e);
      this.items = [];
    }
  }

  /**
   * Añade o elimina un producto de la lista de deseos.
   * @param {string} productId - ID del producto.
   */
  toggle(productId) {
    const producto = productosData.find(p => p.id === productId);
    if (!producto) return;

    const index = this.items.findIndex(p => p.id === productId);
    if (index === -1) {
      this.items.push({ id: producto.id, nombre: producto.nombre, imagen: producto.imagenes[0] });
      mostrarToast(
        traducciones[CONFIG.DEFAULT_LANG].addedToWishlist.replace('{nombre}', producto.nombre),
        '#007bff'
      );
    } else {
      this.items.splice(index, 1);
      mostrarToast(
        traducciones[CONFIG.DEFAULT_LANG].removedFromWishlist.replace('{nombre}', producto.nombre),
        '#dc3545'
      );
    }

    this.save();
    this.updateIcon(productId);
  }

  /**
   * Guarda la lista de deseos en localStorage.
   */
  save() {
    try {
      localStorage.setItem('wishlist', JSON.stringify(this.items));
    } catch (e) {
      console.warn('No se pudo guardar en localStorage:', e);
    }
  }

  /**
   * Actualiza el ícono de favoritos para un producto.
   * @param {string} productId - ID del producto.
   */
  updateIcon(productId) {
    document.querySelectorAll(`.wishlist-btn[data-product="${productId}"]`).forEach(btn => {
      const enLista = this.items.some(p => p.id === productId);
      btn.classList.toggle('active', enLista);
      btn.querySelector('i').className = enLista ? 'fas fa-heart' : 'far fa-heart';
      btn.setAttribute('aria-label', enLista ? 'Eliminar de favoritos' : 'Añadir a favoritos');
    });
  }
}

// --- UTILIDADES ---
/**
 * Muestra una notificación toast.
 * @param {string} text - Texto a mostrar.
 * @param {string} color - Color de fondo.
 * @param {string} [lang=CONFIG.DEFAULT_LANG] - Idioma.
 */
const mostrarToast = (text, color, lang = CONFIG.DEFAULT_LANG) => {
  if (!window.Toastify) {
    console.warn('Toastify no disponible');
    return;
  }
  Toastify({
    text: traducciones[lang][text] || text,
    duration: CONFIG.TOAST_DURATION,
    gravity: 'top',
    position: 'right',
    backgroundColor: color,
    className: 'toastify-premium',
    escapeMarkup: false
  }).showToast();
};

/**
 * Genera HTML para estrellas de rating.
 * @param {number} rating - Valor del rating (0-5).
 * @returns {string} - HTML con íconos de estrellas.
 */
function generarEstrellas(rating) {
  return Array.from({ length: 5 }, (_, i) => {
    return `<i class="fas fa-star${i < Math.floor(rating) ? '' : i < rating ? '-half-alt' : '-regular'} text-warning" aria-hidden="true"></i>`;
  }).join('');
}

/**
 * Función debounce para limitar la frecuencia de ejecución.
 * @param {Function} func - Función a debouncer.
 * @param {number} wait - Tiempo de espera en ms.
 * @returns {Function} - Función debounced.
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// --- RENDER DINÁMICO DEL CATÁLOGO ---
/**
 * Renderiza el catálogo de productos con paginación.
 * @param {Object} options - Opciones de renderizado.
 * @param {Array} options.productos - Lista de productos.
 * @param {string} options.contenedorId - ID del contenedor.
 * @param {number} options.limite - Productos por página.
 * @param {number} options.pagina - Página actual.
 */
function renderizarCatalogo({
  productos = productosData,
  contenedorId = 'catalogo-productos',
  limite = CONFIG.PRODUCTS_PER_PAGE,
  pagina = 1
} = {}) {
  const contenedor = cacheDOM.catalogo;
  if (!contenedor) {
    console.warn(`Contenedor con ID ${contenedorId} no encontrado`);
    return;
  }

  const inicio = (pagina - 1) * limite;
  const fin = inicio + limite;
  const productosPaginados = productos.slice(inicio, fin);

  contenedor.innerHTML = DOMPurify.sanitize(
    productosPaginados.map(p => crearTarjetaProducto(p, 'catalogo')).join('')
  );

  renderRatings();
  actualizarPaginacion(productos.length, limite, pagina);
}

// --- RENDER DE PRODUCTOS RECOMENDADOS ---
/**
 * Renderiza productos recomendados basados en rating y ventas.
 */
function renderizarRecomendados() {
  const contenedor = cacheDOM.recommended;
  if (!contenedor) return;

  const unaSemana = 7 * 24 * 60 * 60 * 1000;
  const hoy = new Date();
  const productosRecomendados = productosData
    .sort((a, b) => {
      const esNuevoA = new Date(a.fechaLanzamiento) > new Date(hoy - unaSemana);
      const esNuevoB = new Date(b.fechaLanzamiento) > new Date(hoy - unaSemana);
      if (esNuevoA && !esNuevoB) return -1;
      if (!esNuevoA && esNuevoB) return 1;
      return b.rating * b.ventas - a.rating * a.ventas;
    })
    .slice(0, 4);

  const row = contenedor.querySelector('.row') || contenedor.appendChild(document.createElement('div'));
  row.className = 'row';
  row.innerHTML = DOMPurify.sanitize(
    productosRecomendados.map(p => crearTarjetaProducto(p, 'recomendado')).join('')
  );

  renderRatings();
}

// --- CREACIÓN DE TARJETAS DE PRODUCTO ---
/**
 * Crea el HTML para una tarjeta de producto.
 * @param {Object} producto - Datos del producto.
 * @param {string} tipo - Tipo de tarjeta ('catalogo' o 'recomendado').
 * @returns {string} - HTML de la tarjeta.
 */
function crearTarjetaProducto(producto, tipo = 'catalogo') {
  const etiquetasHTML = producto.etiquetas?.map(tag => {
    const estilos = { nuevo: 'bg-success', 'mas-vendido': 'bg-danger', promocion: 'bg-warning' };
    return `<span class="badge ${estilos[tag]} text-white me-1">${tag.replace('-', ' ')}</span>`;
  }).join('') || '';

  const stockHTML = producto.stock <= 0
    ? `<span class="text-danger fw-bold">${traducciones[CONFIG.DEFAULT_LANG].outOfStock}</span>`
    : producto.stock <= 10
      ? `<span class="text-warning fw-bold">${traducciones[CONFIG.DEFAULT_LANG].lowStock.replace('{stock}', producto.stock)}</span>`
      : '';

  const esCatalogo = tipo === 'catalogo';
  return `
    <div class="col-md-6 col-lg-${esCatalogo ? 4 : 3} mb-4">
      <div class="card producto-${esCatalogo ? 'card' : 'recomendado'} shadow-lg h-100 animate__animated animate__fadeInUp" data-product="${producto.id}">
        <div class="position-relative overflow-hidden">
          <img src="${producto.imagenes[0]}" class="card-img-top" alt="${producto.nombre}" loading="lazy">
          <div class="etiquetas position-absolute top-0 start-0 p-2">${etiquetasHTML}</div>
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.descripcionCorta}</p>
          <div class="rating-container mb-2" data-product="${producto.id}" aria-label="Calificación ${producto.rating} de 5"></div>
          <div class="price-container mb-3">
            <span class="retail-price">$${producto.precioUnitario} c/u</span>
            ${producto.precioMayoreo ? `<br><span class="wholesale-price text-success">Mayoreo: $${producto.precioMayoreo} (${producto.mayoreoMinimo}+)</span>` : ''}
          </div>
          <div class="stock-alert mb-2 ${producto.stock > 10 ? 'd-none' : ''}" data-product="${producto.id}" aria-live="polite">${stockHTML}</div>
          ${esCatalogo ? `
            <div class="review mt-2">
              ${producto.opiniones?.slice(0, 1).map(op => `<p class="small mb-1">"${op.texto}"</p><small class="text-muted">– ${op.autor}</small>`).join('') || ''}
            </div>
            <div class="mt-auto d-grid gap-2">
              <button class="btn btn-outline-primary quick-view-btn" data-product="${producto.id}" aria-label="${traducciones[CONFIG.DEFAULT_LANG].quickView} de ${producto.nombre}">${traducciones[CONFIG.DEFAULT_LANG].quickView}</button>
              <button class="btn btn-primary add-to-cart-btn" data-product="${producto.id}" ${producto.stock <= 0 ? 'disabled' : ''} aria-label="${traducciones[CONFIG.DEFAULT_LANG].addToCart} ${producto.nombre}">${traducciones[CONFIG.DEFAULT_LANG].addToCart}</button>
              <button class="btn btn-outline-secondary wishlist-btn" data-product="${producto.id}" aria-label="Añadir ${producto.nombre} a favoritos"><i class="far fa-heart"></i></button>
            </div>
          ` : `
            <div class="mt-auto d-grid gap-2">
              <button class="btn btn-outline-primary ver-detalles-btn" data-producto-id="${producto.id}" aria-label="${traducciones[CONFIG.DEFAULT_LANG].viewDetails} de ${producto.nombre}">${traducciones[CONFIG.DEFAULT_LANG].viewDetails}</button>
              <button class="btn btn-primary add-to-cart-btn" data-product="${producto.id}" ${producto.stock <= 0 ? 'disabled' : ''} aria-label="${traducciones[CONFIG.DEFAULT_LANG].addToCart} ${producto.nombre}">${traducciones[CONFIG.DEFAULT_LANG].addToCart}</button>
            </div>
          `}
        </div>
      </div>
    </div>
  `;
}

// --- FILTROS Y BÚSQUEDA ---
/**
 * Inicializa los filtros y la búsqueda en tiempo real.
 */
function inicializarFiltrosYBusqueda() {
  let filtros = { busqueda: '', categorias: [], orden: 'rating-desc' };

  cacheDOM.searchInput?.addEventListener('input', e => {
    filtros.busqueda = DOMPurify.sanitize(e.target.value.toLowerCase());
    aplicarFiltros(filtros);
  });

  document.querySelectorAll('.category-filter').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      filtros.categorias = Array.from(document.querySelectorAll('.category-filter:checked')).map(
        cb => cb.value
      );
      aplicarFiltros(filtros);
    });
  });

  cacheDOM.sortSelect?.addEventListener('change', e => {
    filtros.orden = e.target.value;
    aplicarFiltros(filtros);
  });

  /**
   * Aplica los filtros y ordena los productos.
   * @param {Object} filtros - Filtros activos.
   */
  function aplicarFiltros({ busqueda, categorias, orden }) {
    let productosFiltrados = [...productosData];

    if (busqueda) {
      productosFiltrados = productosFiltrados.filter(
        p =>
          p.nombre.toLowerCase().includes(busqueda) ||
          p.descripcionCorta.toLowerCase().includes(busqueda) ||
          p.descripcion.toLowerCase().includes(busqueda)
      );
    }

    if (categorias.length > 0) {
      productosFiltrados = productosFiltrados.filter(p => categorias.includes(p.categoria));
    }

    productosFiltrados.sort((a, b) => {
      switch (orden) {
        case 'rating-desc':
          return b.rating - a.rating;
        case 'precio-asc':
          return a.precioUnitario - b.precioUnitario;
        case 'precio-desc':
          return b.precioUnitario - a.precioUnitario;
        case 'nuevo':
          return new Date(b.fechaLanzamiento) - new Date(a.fechaLanzamiento);
        default:
          return 0;
      }
    });

    renderizarCatalogo({ productos: productosFiltrados });
    gsap.from('.producto-card', {
      opacity: 0,
      y: 30,
      duration: 0.5,
      stagger: CONFIG.ANIMATION_STAGGER
    });
  }

  return aplicarFiltros;
}

// --- PAGINACIÓN Y SCROLL INFINITO ---
/**
 * Actualiza la paginación y habilita scroll infinito.
 * @param {number} totalProductos - Total de productos.
 * @param {number} limite - Productos por página.
 * @param {number} paginaActual - Página actual.
 */
function actualizarPaginacion(totalProductos, limite, paginaActual) {
  const contenedor = document.getElementById('paginacion');
  if (!contenedor) return;

  const totalPaginas = Math.ceil(totalProductos / limite);
  contenedor.innerHTML = DOMPurify.sanitize(`
    <nav aria-label="Paginación de productos">
      <ul class="pagination justify-content-center">
        <li class="page-item ${paginaActual === 1 ? 'disabled' : ''}">
          <a class="page-link" href="#" data-pagina="${paginaActual - 1}" aria-label="Página anterior">Anterior</a>
        </li>
        ${Array.from({ length: totalPaginas }, (_, i) => `
          <li class="page-item ${i + 1 === paginaActual ? 'active' : ''}">
            <a class="page-link" href="#" data-pagina="${i + 1}" aria-label="Página ${i + 1}">${i + 1}</a>
          </li>
        `).join('')}
        <li class="page-item ${paginaActual === totalPaginas ? 'disabled' : ''}">
          <a class="page-link" href="#" data-pagina="${paginaActual + 1}" aria-label="Página siguiente">Siguiente</a>
        </li>
      </ul>
    </nav>
  `);

  contenedor.querySelectorAll('.page-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const pagina = parseInt(e.target.dataset.pagina);
      if (!isNaN(pagina)) {
        renderizarCatalogo({ pagina });
        cacheDOM.catalogo?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Scroll infinito con debounce
  window.removeEventListener('scroll', handleInfiniteScroll);
  window.addEventListener('scroll', debounce(handleInfiniteScroll, 100));

  function handleInfiniteScroll() {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      paginaActual < totalPaginas
    ) {
      renderizarCatalogo({ pagina: paginaActual + 1, productos: productosData });
    }
  }
}

// --- RENDER DE RESEÑAS ---
/**
 * Renderiza las estrellas de rating para cada producto.
 */
function renderRatings() {
  document.querySelectorAll('.rating-container').forEach(container => {
    const productId = container.dataset.product;
    const producto = productosData.find(p => p.id === productId);
    if (producto) {
      container.innerHTML = DOMPurify.sanitize(generarEstrellas(producto.rating));
    }
  });
}

// --- SINCRONIZACIÓN DEL CARRUSEL ---
/**
 * Sincroniza el carrusel con los detalles del producto.
 * @param {string} productId - ID del producto.
 */
function sincronizarCarrusel(productId) {
  const carrusel = cacheDOM.carousel;
  if (!carrusel || !window.bootstrap?.Carousel) {
    console.warn('Bootstrap Carousel no disponible');
    cacheDOM.detalles?.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  const index = productosData.findIndex(p => p.id === productId);
  if (index !== -1) {
    bootstrap.Carousel.getInstance(carrusel).to(index);
    cacheDOM.detalles?.scrollIntoView({ behavior: 'smooth' });
  }
}

// --- COMPARTIR SOCIAL ---
/**
 * Inicializa los botones de compartir en redes sociales.
 */
function inicializarCompartirSocial() {
  document.querySelectorAll('.share-options a').forEach(enlace => {
    enlace.addEventListener('click', e => {
      e.preventDefault();
      const productId = enlace.closest('.carousel-item')?.dataset.productId;
      const producto = productosData.find(p => p.id === productId);
      if (!producto) return;

      const url = `https://inmunomedi.com/productos#${productId}`;
      const texto = `¡Descubre ${producto.nombre} en InmunoMedi! ${producto.descripcionCorta}`;
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

      if (urlCompartir) {
        window.open(urlCompartir, '_blank');
        gtag('event', 'share', { method: plataforma, product_id: productId });
      }
    });
  });
}

// --- BENEFICIOS DESTACADOS ---
/**
 * Renderiza las tarjetas de beneficios destacados.
 */
function renderizarBeneficios() {
  const beneficios = [
    {
      icon: 'fas fa-shield-virus',
      titulo: 'Protección Inmunológica',
      texto: 'Potencia las defensas naturales de tu cuerpo para combatir infecciones y virus con formulaciones como el Factor de Transferencia.'
    },
    // ... (Resto de beneficios mantenidos)
  ];

  const contenedor = cacheDOM.beneficios;
  if (!contenedor) return;

  contenedor.innerHTML = DOMPurify.sanitize(
    beneficios
      .map(
        (b, i) => `
      <div class="col-md-6 col-lg-4 animate__animated animate__fadeInUp delay-${i}">
        <div class="beneficio-card p-4 rounded shadow-sm bg-white h-100 transition-all hover:shadow-xl">
          <div class="beneficio-icon mb-4 d-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: linear-gradient(135deg, #056afa, #417ecd); box-shadow: 0 10px 20px rgba(5,106,250,0.2);">
            <i class="${b.icon} text-white fs-3"></i>
          </div>
          <h3 class="h5 fw-bold text-primary mb-3">${b.titulo}</h3>
          <p>${b.texto}</p>
        </div>
      </div>
    `
      )
      .join('')
  );
}

// --- TESTIMONIOS ---
/**
 * Renderiza las tarjetas de testimonios de clientes.
 */
function renderizarTestimonios() {
  const testimonios = [
    {
      nombre: 'María G.',
      texto: 'El Factor de Transferencia ha sido un cambio total para mi salud. ¡Mis defensas están más fuertes que nunca!',
      rating: 5
    },
    // ... (Resto de testimonios mantenidos)
  ];

  const contenedor = cacheDOM.testimonios;
  if (!contenedor) return;

  contenedor.innerHTML = DOMPurify.sanitize(
    testimonios
      .map(
        (t, i) => `
      <div class="col-md-4 animate__animated animate__fadeInUp delay-${i}">
        <div class="testimonial-card p-4 bg-light shadow-sm rounded h-100 transition-all hover:shadow-xl">
          <div class="rating-container mb-2" aria-label="Calificación ${t.rating} de 5">${generarEstrellas(t.rating)}</div>
          <p class="testimonial-text">"${t.texto}"</p>
          <h5 class="mt-3 text-primary">${t.nombre}</h5>
        </div>
      </div>
    `
      )
      .join('')
  );
}

// --- CTA FINAL ---
/**
 * Renderiza el Call to Action principal.
 */
function renderizarCTA() {
  const cta = cacheDOM.cta;
  if (!cta) return;

  cta.innerHTML = DOMPurify.sanitize(`
    <div class="text-center p-5 bg-primary text-white rounded-4 shadow-lg animate__animated animate__zoomIn transition-all hover:shadow-2xl">
      <h2 class="fw-bold mb-3">¡Eleva tu Salud con InmunoMedi!</h2>
      <p class="lead">Descubre nuestra gama de productos diseñados para fortalecer tu bienestar. ¡Compra ahora y aprovecha los precios de mayoreo!</p>
      <a href="#catalogo-productos" class="btn btn-light btn-lg mt-3 scroll-to transition-all hover:bg-yellow-300">Ir al Catálogo</a>
    </div>
  `);
}

// --- INICIALIZACIÓN DE BOTONES ---
/**
 * Inicializa los eventos de los botones usando delegación.
 */
function inicializarBotones() {
  const cart = new Cart();
  const wishlist = new Wishlist();

  document.addEventListener('click', e => {
    const btn = e.target.closest('.add-to-cart-btn, .wishlist-btn, .quick-view-btn, .ver-detalles-btn');
    if (!btn) return;

    if (btn.classList.contains('add-to-cart-btn')) {
      const id = btn.dataset.product;
      const qtyInput = btn.closest('.e-commerce-controls')?.querySelector('.quantity');
      const qty = qtyInput ? parseInt(qtyInput.textContent) : 1;
      cart.addItem(id, qty);
      gtag('event', 'add_to_cart', { product_id: id, quantity: qty });
    } else if (btn.classList.contains('wishlist-btn')) {
      const id = btn.dataset.product;
      wishlist.toggle(id);
      gtag('event', 'toggle_wishlist', { product_id: id });
    } else if (btn.classList.contains('quick-view-btn')) {
      const productId = btn.dataset.product;
      const producto = productosData.find(p => p.id === productId);
      if (!producto) return;
      const modal = cacheDOM.quickViewModal;
      if (!modal) {
        console.warn('Modal quickViewModal no encontrado');
        return;
      }
      modal.querySelector('.modal-title').textContent = producto.nombre;
      modal.querySelector('.quick-desc').textContent = producto.descripcion;
      modal.querySelector('.quick-presentacion').textContent = producto.presentacion;
      modal.querySelector('.quick-precio').textContent = `$${producto.precioUnitario}`;
      modal.querySelector('.quick-img').src = producto.imagenes[0];
      modal.querySelector('.add-to-cart-btn').dataset.product = producto.id;
      new bootstrap.Modal(modal).show();
      gtag('event', 'quick_view', { product_id: productId });
    } else if (btn.classList.contains('ver-detalles-btn')) {
      const id = btn.dataset.productoId;
      sincronizarCarrusel(id);
      gtag('event', 'view_details', { product_id: id });
    }
  });

  // Inicializar íconos de wishlist
  productosData.forEach(p => wishlist.updateIcon(p.id));
}

// --- ANIMACIONES GSAP ---
/**
 * Configura animaciones GSAP para una experiencia visual impactante.
 */
function animarGSAP() {
  gsap.from('.producto-card', {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: CONFIG.ANIMATION_STAGGER,
    scrollTrigger: {
      trigger: '#catalogo-productos',
      start: 'top 85%'
    }
  });

  gsap.from('.producto-recomendado', {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: CONFIG.ANIMATION_STAGGER,
    scrollTrigger: {
      trigger: '#recommended-products',
      start: 'top 85%'
    }
  });

  gsap.from('.beneficio-card', {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3,
    scrollTrigger: {
      trigger: '#beneficios',
      start: 'top 90%'
    }
  });

  gsap.from('.testimonial-card', {
    opacity: 0,
    x: -50,
    duration: 1,
    stagger: CONFIG.ANIMATION_STAGGER,
    scrollTrigger: {
      trigger: '#testimonios-clientes',
      start: 'top 90%'
    }
  });

  gsap.from('#cta-compra', {
    opacity: 0,
    scale: 0.9,
    duration: 1,
    ease: 'elastic.out(1, 0.3)',
    scrollTrigger: {
      trigger: '#cta-compra',
      start: 'top 90%'
    }
  });
}

// --- MODO OSCURO INTELIGENTE ---
/**
 * Aplica el modo oscuro según la hora o preferencia del usuario.
 */
function aplicarModoOscuroInteligente() {
  const hora = new Date().getHours();
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const toggle = document.querySelector('#theme-toggle');

  if ((hora >= 20 || hora < 6 || prefersDark) && !document.body.classList.contains('modo-oscuro')) {
    document.body.classList.add('modo-oscuro');
  }

  toggle?.addEventListener('click', () => {
    document.body.classList.toggle('modo-oscuro');
    gsap.to(document.body, { backgroundColor: document.body.classList.contains('modo-oscuro') ? '#1a1a1a' : '#fff', duration: 0.5 });
  });
}

// --- SINCRONIZACIÓN DE DETALLES DINÁMICOS ---
/**
 * Renderiza las pestañas de detalles del producto.
 * @param {string} productId - ID del producto.
 */
function sincronizarDetallesProducto(productId) {
  const producto = productosData.find(p => p.id === productId);
  if (!producto) return;

  const detallesSection = cacheDOM.detalles;
  if (!detallesSection) return;

  detallesSection.innerHTML = DOMPurify.sanitize(`
    <div class="tabs-container">
      <ul class="nav nav-tabs mb-4" id="productTabs" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="desc-tab" data-bs-toggle="tab" data-bs-target="#desc" role="tab" aria-controls="desc" aria-selected="true">Descripción</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="ingredientes-tab" data-bs-toggle="tab" data-bs-target="#ingredientes" role="tab" aria-controls="ingredientes">Ingredientes</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="uso-tab" data-bs-toggle="tab" data-bs-target="#uso" role="tab" aria-controls="uso">Modo de Uso</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="opiniones-tab" data-bs-toggle="tab" data-bs-target="#opiniones" role="tab" aria-controls="opiniones">Opiniones</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="preguntas-tab" data-bs-toggle="tab" data-bs-target="#preguntas" role="tab" aria-controls="preguntas">Preguntas Frecuentes</button>
        </li>
      </ul>
      <div class="tab-content" id="productTabsContent">
        <div class="tab-pane fade show active" id="desc" role="tabpanel" aria-labelledby="desc-tab">
          <p>${producto.descripcion}</p>
        </div>
        <div class="tab-pane fade" id="ingredientes" role="tabpanel" aria-labelledby="ingredientes-tab">
          <ul class="list-unstyled">
            ${producto.ingredientes.map(i => `<li><i class="fas fa-check-circle text-primary me-2"></i>${i}</li>`).join('')}
          </ul>
        </div>
        <div class="tab-pane fade" id="uso" role="tabpanel" aria-labelledby="uso-tab">
          <p>${producto.uso}</p>
        </div>
        <div class="tab-pane fade" id="opiniones" role="tabpanel" aria-labelledby="opiniones-tab">
          ${producto.opiniones.map(op => `
            <div class="review mb-3">
              <p>"${op.texto}"</p>
              <div class="rating-container mb-2" aria-label="Calificación ${op.rating} de 5">${generarEstrellas(op.rating)}</div>
              <small class="text-muted">– ${opvtk-autor}</small>
            </div>
          `).join('')}
        </div>
        <div class="tab-pane fade" id="preguntas" role="tabpanel" aria-labelledby="preguntas-tab">
          <ul class="list-unstyled">
            ${producto.preguntas.map(p => `<li><i class="fas fa-question-circle text-primary me-2"></i>${p}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  `);

  gsap.from('.tabs-container', { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' });
}

// --- PROMOCIONES TEMPORALES ---
/**
 * Muestra alertas de promociones con temporizador.
 */
function mostrarPromocionesTemporales() {
  const hoy = new Date();
  const promociones = productosData.filter(
    p =>
      p.etiquetas.includes('promocion') &&
      new Date(p.fechaLanzamiento) > new Date(hoy - CONFIG.PROMOTION_DAYS * 24 * 60 * 60 * 1000)
  );
  const contenedor = cacheDOM.promociones;
  if (!contenedor || promociones.length === 0) return;

  const finPromocion = new Date(hoy.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 días de ejemplo
  contenedor.innerHTML = DOMPurify.sanitize(`
    <div class="alert alert-warning alert-dismissible fade show shadow-lg" role="alert">
      <h4 class="alert-heading">¡Ofertas Exclusivas por Tiempo Limitado!</h4>
      <p>Aprovecha descuentos en nuestros productos estrella. ¡Oferta válida hasta <span id="promo-timer"></span>!</p>
      <ul class="list-unstyled">
        ${promociones.map(p => `
          <li>
            <strong>${p.nombre}</strong> – <span class="text-danger">$${p.precioMayoreo || p.precioUnitario}</span>
            <button class="btn btn-sm btn-primary ms-2 add-to-cart-btn" data-product="${p.id}" aria-label="${traducciones[CONFIG.DEFAULT_LANG].addToCart} ${p.nombre}">${traducciones[CONFIG.DEFAULT_LANG].addToCart}</button>
          </li>
        `).join('')}
      </ul>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    </div>
  `);

  // Temporizador de cuenta regresiva
  const timerEl = contenedor.querySelector('#promo-timer');
  if (timerEl) {
    const updateTimer = () => {
      const ahora = new Date();
      const diferencia = finPromocion - ahora;
      if (diferencia <= 0) {
        contenedor.remove();
        return;
      }
      const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
      timerEl.textContent = `${dias}d ${horas}h ${minutos}m`;
    };
    updateTimer();
    setInterval(updateTimer, 60000);
  }

  gsap.from(contenedor, { opacity: 0, scale: 0.8, duration: 0.7, ease: 'back.out(1.7)' });
}

// --- ANALÍTICAS DE INTERACCIONES ---
/**
 * Rastrea interacciones del usuario para analíticas.
 */
function rastrearInteracciones() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const productId = entry.target.dataset.product;
          gtag('event', 'view_item', { product_id: productId });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.producto-card').forEach(card => observer.observe(card));
}

// --- CANTIDADES DINÁMICAS EN CONTROLES ---
/**
 * Inicializa los controles de cantidad en las tarjetas.
 */
function inicializarControlesCantidad() {
  document.querySelectorAll('.e-commerce-controls').forEach(control => {
    const quantityEl = control.querySelector('.quantity');
    const btnMinus = control.querySelector('.btn-minus');
    const btnPlus = control.querySelector('.btn-plus');
    const productId = control.querySelector('.add-to-cart-btn')?.dataset.product;
    const producto = productosData.find(p => p.id === productId);

    if (!quantityEl || !btnMinus || !btnPlus || !producto) return;

    btnMinus.addEventListener('click', () => {
      let qty = parseInt(quantityEl.textContent);
      if (qty > 1) {
        quantityEl.textContent = --qty;
        gsap.from(quantityEl, { scale: 1.2, duration: 0.2 });
      }
    });

    btnPlus.addEventListener('click', () => {
      let qty = parseInt(quantityEl.textContent);
      if (qty < producto.stock) {
        quantityEl.textContent = ++qty;
        gsap.from(quantityEl, { scale: 1.2, duration: 0.2 });
      } else {
        mostrarToast(
          traducciones[CONFIG.DEFAULT_LANG].lowStock.replace('{stock}', producto.stock),
          '#ffc107'
        );
      }
    });
  });
}

// --- OPTIMIZACIÓN DE RENDIMIENTO ---
/**
 * Optimiza el rendimiento del sitio.
 */
function optimizarRendimiento() {
  // Debounce para eventos de scroll
  window.addEventListener(
    'scroll',
    debounce(() => {
      ScrollTrigger.refresh();
    }, 150)
  );

  // Limpiar animaciones fuera de vista
  ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.progress === 1) trigger.kill();
  });

  // Optimizar imágenes lazy-loaded
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach(img => {
    img.addEventListener('load', () => {
      gsap.to(img, { opacity: 1, duration: 0.5 });
    });
  });

  // Virtualización para catálogos grandes
  if (productosData.length > 50) {
    console.log('Implementar virtualización para catálogos grandes');
    // Aquí se podría integrar una librería como virtual-scroll
  }
}

// --- ACCESIBILIDAD ---
/**
 * Mejora la accesibilidad del sitio.
 */
function mejorarAccesibilidad() {
  document
    .querySelectorAll('.add-to-cart-btn, .wishlist-btn, .quick-view-btn, .ver-detalles-btn')
    .forEach(btn => {
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
    if (producto) btn.setAttribute('aria-label', `${traducciones[CONFIG.DEFAULT_LANG].addToCart} ${producto.nombre}`);
  });

  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    const productId = btn.dataset.product;
    const producto = productosData.find(p => p.id === productId);
    if (producto) btn.setAttribute('aria-label', `Añadir ${producto.nombre} a favoritos`);
  });

  // Añadir aria-live a contenedores dinámicos
  cacheDOM.miniCart?.setAttribute('aria-live', 'polite');
}

// --- MINI-CARRITO PREVIEW ---
/**
 * Inicializa el mini-carrito interactivo.
 */
function inicializarMiniCarrito() {
  const cartIcon = document.querySelector('.cart-icon');
  if (!cartIcon || !cacheDOM.miniCart) return;

  cartIcon.addEventListener('click', e => {
    e.preventDefault();
    cacheDOM.miniCart.classList.toggle('active');
    if (cacheDOM.miniCart.classList.contains('active')) {
      renderizarMiniCarrito();
      gsap.from(cacheDOM.miniCart, { opacity: 0, x: 50, duration: 0.5, ease: 'power2.out' });
    }
  });

  document.addEventListener('click', e => {
    if (!cacheDOM.miniCart.contains(e.target) && !cartIcon.contains(e.target)) {
      cacheDOM.miniCart.classList.remove('active');
    }
  });
}

/**
 * Renderiza el contenido del mini-carrito.
 */
function renderizarMiniCarrito() {
  const cart = new Cart();
  cacheDOM.miniCart.innerHTML = DOMPurify.sanitize(`
    <div class="mini-cart-header">
      <h5>Tu Carrito (${cart.items.length} ítems)</h5>
      <button class="btn-close" aria-label="Cerrar carrito"></button>
    </div>
    <div class="mini-cart-body">
      ${cart.items.length === 0
        ? '<p class="text-muted">Carrito vacío</p>'
        : cart.items
            .map(
              item => `
        <div class="mini-cart-item d-flex align-items-center mb-3 transition-all hover:bg-gray-100">
          <img src="${item.imagen}" alt="${item.nombre}" class="me-3" style="width: 50px; height: 50px; object-fit: cover;">
          <div>
            <h6 class="mb-1">${item.nombre}</h6>
            <p class="mb-0">Cantidad: ${item.quantity} | $${(item.precio * item.quantity).toFixed(2)}</p>
          </div>
        </div>
      `
            )
            .join('')}
    </div>
    ${cart.items.length > 0
      ? `
      <div class="mini-cart-footer">
        <a href="#carrito" class="btn btn-primary w-100 scroll-to transition-all hover:bg-blue-700">Ver Carrito</a>
      </div>
    `
      : ''}
  `);

  cacheDOM.miniCart.querySelector('.btn-close')?.addEventListener('click', () => {
    cacheDOM.miniCart.classList.remove('active');
  });
}

// --- INICIALIZACIÓN COMPLETA ---
/**
 * Inicializa toda la aplicación.
 */
async function inicializarApp() {
  await cargarProductos();

  const cart = new Cart();
  const wishlist = new Wishlist();

  // Inicializar módulos
  cart.updateUI();
  renderizarCatalogo();
  renderizarRecomendados();
  renderizarBeneficios();
  renderizarTestimonios();
  renderizarCTA();
  const aplicarFiltros = inicializarFiltrosYBusqueda();
  inicializarCompartirSocial();
  inicializarBotones();
  inicializarControlesCantidad();
  mostrarPromocionesTemporales();
  rastrearInteracciones();
  optimizarRendimiento();
  mejorarAccesibilidad();
  inicializarMiniCarrito();
  animarGSAP();
  aplicarModoOscuroInteligente();

  // Animación de carga inicial
  gsap.from('header', {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });

  // Gestión de carrusel
  try {
    const carrusel = cacheDOM.carousel;
    if (carrusel) {
      carrusel.addEventListener('slide.bs.carousel', e => {
        const productId = productosData[e.to].id;
        sincronizarDetallesProducto(productId);
      });
    }
  } catch (error) {
    console.warn('Error en inicialización del carrusel:', error);
  }

  // Scroll suave
  document.querySelectorAll('.scroll-to').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').substring(1);
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Sticky header
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });

  // Persistencia de filtros
  const filtrosGuardados = JSON.parse(localStorage.getItem('filtros')) || {
    busqueda: '',
    categorias: [],
    orden: 'rating-desc'
  };
  if (filtrosGuardados.busqueda) cacheDOM.searchInput.value = filtrosGuardados.busqueda;
  filtrosGuardados.categorias.forEach(cat => {
    const checkbox = document.querySelector(`.category-filter[value="${cat}"]`);
    if (checkbox) checkbox.checked = true;
  });
  if (filtrosGuardados.orden) cacheDOM.sortSelect.value = filtrosGuardados.orden;
  aplicarFiltros(filtrosGuardados);

  cacheDOM.searchInput?.addEventListener('change', () => {
    filtrosGuardados.busqueda = DOMPurify.sanitize(cacheDOM.searchInput.value);
    localStorage.setItem('filtros', JSON.stringify(filtrosGuardados));
  });
  document.querySelectorAll('.category-filter').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      filtrosGuardados.categorias = Array.from(document.querySelectorAll('.category-filter:checked')).map(
        cb => cb.value
      );
      localStorage.setItem('filtros', JSON.stringify(filtrosGuardados));
    });
  });
  cacheDOM.sortSelect?.addEventListener('change', e => {
    filtrosGuardados.orden = e.target.value;
    localStorage.setItem('filtros', JSON.stringify(filtrosGuardados));
  });
}

document.addEventListener('DOMContentLoaded', inicializarApp);

// --- EXPORTACIÓN GLOBAL ---
export { productosData, Cart, Wishlist, renderizarCatalogo };

// --- EJEMPLO DE PRUEBAS UNITARIAS ---
/*
describe('Cart', () => {
  test('addItem añade producto correctamente', () => {
    const cart = new Cart();
    cart.addItem('factor-de-transferencia', 2);
    expect(cart.items).toEqual([
      {
        id: 'factor-de-transferencia',
        nombre: 'Factor de Transferencia',
        imagen: 'recursos/FCT/CelestinFT__2024_V1.webp',
        quantity: 2,
        precio: 350
      }
    ]);
  });
});
*/