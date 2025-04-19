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
      className: "toastify-premium"
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

  toast(text, color) {
    Toastify({
      text,
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: color,
      className: "toastify-premium"
    }).showToast();
  }
}

// --- RENDER DINÁMICO DEL CATÁLOGO ---
function renderizarCatalogo({ productos = productosData, contenedorId = 'catalogo-productos', limite = 6, pagina = 1 } = {}) {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;

  const inicio = (pagina - 1) * limite;
  const fin = inicio + limite;
  const productosPaginados = productos.slice(inicio, fin);

  contenedor.innerHTML = ''; // Limpiar contenedor

  productosPaginados.forEach(producto => {
    const etiquetasHTML = producto.etiquetas?.map(tag => {
      const estilos = {
        'nuevo': 'bg-success',
        'mas-vendido': 'bg-danger',
        'promocion': 'bg-warning'
      };
      return `<span class="badge ${estilos[tag]} text-white me-1">${tag.replace('-', ' ')}</span>`;
    }).join('') || '';

    const stockHTML = producto.stock <= 0
      ? '<span class="text-danger fw-bold">¡Agotado!</span>'
      : producto.stock <= 10
        ? `<span class="text-warning fw-bold">¡Últimas ${producto.stock} unidades!</span>`
        : '';

    const opinionesHTML = producto.opiniones?.slice(0, 1).map(op => `
      <div class="review mt-2">
        <p class="small mb-1">"${op.texto}"</p>
        <small class="text-muted">– ${op.autor}</small>
      </div>
    `).join('') || '';

    const card = document.createElement('div');
    card.className = 'col-md-6 col-lg-4 mb-4';
    card.innerHTML = `
      <div class="card producto-card shadow-lg h-100 animate__animated animate__fadeInUp">
        <div class="position-relative">
          <img src="${producto.imagenes[0]}" class="card-img-top" alt="${producto.nombre}" loading="lazy">
          <div class="etiquetas position-absolute top-0 start-0 p-2">${etiquetasHTML}</div>
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.descripcionCorta}</p>
          <div class="rating-container mb-2" data-product="${producto.id}"></div>
          <div class="price-container mb-3">
            <span class="retail-price">$${producto.precioUnitario} c/u</span>
            ${producto.precioMayoreo ? `<br><span class="wholesale-price text-success">Mayoreo: $${producto.precioMayoreo} (${producto.mayoreoMinimo}+)</span>` : ""}
          </div>
          <div class="stock-alert mb-2 ${producto.stock > 10 ? 'd-none' : ''}" data-product="${producto.id}">${stockHTML}</div>
          ${opinionesHTML}
          <div class="mt-auto d-grid gap-2">
            <button class="btn btn-outline-primary quick-view-btn" data-product="${producto.id}">Vista Rápida</button>
            <button class="btn btn-primary add-to-cart-btn" data-product="${producto.id}" ${producto.stock <= 0 ? 'disabled' : ''}>Añadir al Carrito</button>
            <button class="btn btn-outline-secondary wishlist-btn" data-product="${producto.id}"><i class="far fa-heart"></i></button>
          </div>
        </div>
      </div>
    `;
    contenedor.appendChild(card);
  });

  renderRatings();
  inicializarBotones();
  actualizarPaginacion(productos.length, limite, pagina);
}

// --- RENDER DE PRODUCTOS RECOMENDADOS ---
function renderizarRecomendados() {
  const contenedor = document.getElementById('recommended-products');
  if (!contenedor) return;

  // Lógica dinámica para recomendaciones
  const unaSemana = 7 * 24 * 60 * 60 * 1000;
  const hoy = new Date();
  const productosRecomendados = productosData
    .sort((a, b) => {
      const esNuevoA = new Date(a.fechaLanzamiento) > new Date(hoy - unaSemana);
      const esNuevoB = new Date(b.fechaLanzamiento) > new Date(hoy - unaSemana);
      if (esNuevoA && !esNuevoB) return -1;
      if (!esNuevoA && esNuevoB) return 1;
      return (b.rating * b.ventas) - (a.rating * a.ventas); // Priorizar rating y ventas
    })
    .slice(0, 4); // Mostrar 4 productos

  const row = contenedor.querySelector('.row') || contenedor.appendChild(document.createElement('div'));
  row.className = 'row';
  row.innerHTML = ''; // Limpiar antes

  productosRecomendados.forEach(product => {
    const etiquetasHTML = product.etiquetas?.map(tag => {
      const estilos = {
        'nuevo': 'bg-success',
        'mas-vendido': 'bg-danger',
        'promocion': 'bg-warning'
      };
      return `<span class="badge ${estilos[tag]} text-white me-1">${tag.replace('-', ' ')}</span>`;
    }).join('') || '';

    const stockHTML = product.stock <= 0
      ? '<span class="text-danger fw-bold">¡Agotado!</span>'
      : product.stock <= 10
        ? `<span class="text-warning fw-bold">¡Últimas ${product.stock} unidades!</span>`
        : '';

    const card = document.createElement('div');
    card.className = 'col-md-6 col-lg-3 mb-4';
    card.innerHTML = `
      <div class="card producto-recomendado shadow-lg h-100 animate__animated animate__fadeInUp">
        <div class="position-relative">
          <img src="${product.imagenes[0]}" class="card-img-top" alt="${product.nombre}" loading="lazy">
          <div class="etiquetas position-absolute top-0 start-0 p-2">${etiquetasHTML}</div>
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.nombre}</h5>
          <p class="card-text">${product.descripcionCorta}</p>
          <div class="rating-container mb-2" data-product="${product.id}"></div>
          <div class="price-container mb-3">
            <span class="retail-price">$${product.precioUnitario} c/u</span>
            ${product.precioMayoreo ? `<br><span class="wholesale-price text-success">Mayoreo: $${product.precioMayoreo} (${product.mayoreoMinimo}+)</span>` : ""}
          </div>
          <div class="stock-alert mb-2 ${product.stock > 10 ? 'd-none' : ''}" data-product="${product.id}">${stockHTML}</div>
          <div class="mt-auto d-grid gap-2">
            <button class="btn btn-outline-primary ver-detalles-btn" data-producto-id="${product.id}">Ver Detalles</button>
            <button class="btn btn-primary add-to-cart-btn" data-product="${product.id}" ${product.stock <= 0 ? 'disabled' : ''}>Añadir al Carrito</button>
          </div>
        </div>
      </div>
    `;
    row.appendChild(card);
  });

  renderRatings();
  inicializarBotones();
}

// --- FILTROS Y BÚSQUEDA ---
function inicializarFiltrosYBusqueda() {
  const searchInput = document.getElementById('search-input');
  const categoryFilters = document.querySelectorAll('.category-filter');
  const sortSelect = document.getElementById('sort-select');
  let filtros = { busqueda: '', categorias: [], orden: 'rating-desc' };

  // Búsqueda en tiempo real
  searchInput?.addEventListener('input', e => {
    filtros.busqueda = e.target.value.toLowerCase();
    aplicarFiltros(filtros);
  });

  // Filtros por categoría
  categoryFilters.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      filtros.categorias = Array.from(categoryFilters)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
      aplicarFiltros(filtros);
    });
  });

  // Ordenamiento
  sortSelect?.addEventListener('change', e => {
    filtros.orden = e.target.value;
    aplicarFiltros(filtros);
  });

  function aplicarFiltros({ busqueda, categorias, orden }) {
    let productosFiltrados = [...productosData];

    // Filtrar por búsqueda
    if (busqueda) {
      productosFiltrados = productosFiltrados.filter(p =>
        p.nombre.toLowerCase().includes(busqueda) ||
        p.descripcionCorta.toLowerCase().includes(busqueda) ||
        p.descripcion.toLowerCase().includes(busqueda)
      );
    }

    // Filtrar por categoría
    if (categorias.length > 0) {
      productosFiltrados = productosFiltrados.filter(p => categorias.includes(p.categoria));
    }

    // Ordenar
    productosFiltrados.sort((a, b) => {
      switch (orden) {
        case 'rating-desc': return b.rating - a.rating;
        case 'precio-asc': return a.precioUnitario - b.precioUnitario;
        case 'precio-desc': return b.precioUnitario - a.precioUnitario;
        case 'nuevo': return new Date(b.fechaLanzamiento) - new Date(a.fechaLanzamiento);
        default: return 0;
      }
    });

    renderizarCatalogo({ productos: productosFiltrados });
    gsap.from('.producto-card', { opacity: 0, y: 30, duration: 0.5, stagger: 0.1 });
  }
}

// --- PAGINACIÓN Y SCROLL INFINITO ---
function actualizarPaginacion(totalProductos, limite, paginaActual) {
  const contenedor = document.getElementById('paginacion');
  if (!contenedor) return;

  const totalPaginas = Math.ceil(totalProductos / limite);
  contenedor.innerHTML = `
    <nav aria-label="Paginación de productos">
      <ul class="pagination justify-content-center">
        <li class="page-item ${paginaActual === 1 ? 'disabled' : ''}">
          <a class="page-link" href="#" data-pagina="${paginaActual - 1}">Anterior</a>
        </li>
        ${Array.from({ length: totalPaginas }, (_, i) => `
          <li class="page-item ${i + 1 === paginaActual ? 'active' : ''}">
            <a class="page-link" href="#" data-pagina="${i + 1}">${i + 1}</a>
          </li>
        `).join('')}
        <li class="page-item ${paginaActual === totalPaginas ? 'disabled' : ''}">
          <a class="page-link" href="#" data-pagina="${paginaActual + 1}">Siguiente</a>
        </li>
      </ul>
    </nav>
  `;

  contenedor.querySelectorAll('.page-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const pagina = parseInt(e.target.dataset.pagina);
      if (!isNaN(pagina)) {
        renderizarCatalogo({ pagina });
        window.scrollTo({ top: document.getElementById('catalogo-productos').offsetTop - 100, behavior: 'smooth' });
      }
    });
  });

  // Scroll infinito
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && paginaActual < totalPaginas) {
      renderizarCatalogo({ pagina: paginaActual + 1, productos: productosData });
    }
  }, { once: true });
}

// --- RENDER DE RESEÑAS ---
function renderRatings() {
  document.querySelectorAll('.rating-container').forEach(container => {
    const productId = container.dataset.product;
    const producto = productosData.find(p => p.id === productId);
    if (!producto) return;

    const estrellas = Array.from({ length: 5 }, (_, i) => {
      return `<i class="fas fa-star${i < Math.floor(producto.rating) ? '' : i < producto.rating ? '-half-alt' : '-regular'} text-warning"></i>`;
    }).join('');
    container.innerHTML = estrellas;
  });
}

// --- SINCRONIZACIÓN DEL CARRUSEL ---
function sincronizarCarrusel(productId) {
  const carrusel = document.getElementById('carouselProductos');
  if (!carrusel || !bootstrap.Carousel.getInstance(carrusel)) {
    console.warn('Carrusel no encontrado, usando fallback de scroll suave');
    const seccion = document.getElementById('main-product-section');
    if (seccion) seccion.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  const index = productosData.findIndex(p => p.id === productId);
  if (index !== -1) {
    bootstrap.Carousel.getInstance(carrusel).to(index);
    document.getElementById('main-product-section').scrollIntoView({ behavior: 'smooth' });
  }
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
      const texto = `¡Descubre ${producto.nombre} en InmunoMedi! ${producto.descripcionCorta}`;
      let urlCompartir = "";

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
    });
  });
}

// --- BENEFICIOS DESTACADOS ---
function renderizarBeneficios() {
  const beneficios = [
    {
      icon: 'fas fa-shield-virus',
      titulo: 'Protección Inmunológica',
      texto: 'Potencia las defensas naturales de tu cuerpo para combatir infecciones y virus con formulaciones como el Factor de Transferencia.'
    },
    {
      icon: 'fas fa-heartbeat',
      titulo: 'Salud Cardiovascular',
      texto: 'Apoya el funcionamiento óptimo del corazón con productos como Artikom y DK Fort, que favorecen arterias saludables.'
    },
    {
      icon: 'fas fa-bacteria',
      titulo: 'Equilibrio Intestinal',
      texto: 'Restablece la microbiota intestinal con fórmulas probióticas como Daily Pro para una digestión óptima.'
    },
    {
      icon: 'fas fa-hourglass-half',
      titulo: 'Antienvejecimiento',
      texto: 'Combate los signos del envejecimiento con Null Age Ampolleta y Cápsula para una piel y células rejuvenecidas.'
    },
    {
      icon: 'fas fa-brain',
      titulo: 'Función Cognitiva',
      texto: 'Mejora memoria y claridad mental con suplementos ricos en omega-3 y vitaminas neuroprotectoras.'
    },
    {
      icon: 'fas fa-bolt',
      titulo: 'Energía Natural',
      texto: 'Aumenta tu rendimiento físico y mental con fórmulas revitalizantes como Null Age y Inm Mix.'
    }
  ];

  const contenedor = document.querySelector('#beneficios-grid');
  if (!contenedor) return;

  beneficios.forEach((b, i) => {
    const div = document.createElement('div');
    div.className = `col-md-6 col-lg-4 animate__animated animate__fadeInUp delay-${i}`;
    div.innerHTML = `
      <div class="beneficio-card p-4 rounded shadow-sm bg-white h-100">
        <div class="beneficio-icon mb-4 d-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: linear-gradient(135deg, #056afa, #417ecd); box-shadow: 0 10px 20px rgba(5,106,250,0.2);">
          <i class="${b.icon} text-white fs-3"></i>
        </div>
        <h3 class="h5 fw-bold text-primary mb-3">${b.titulo}</h3>
        <p>${b.texto}</p>
      </div>
    `;
    contenedor.appendChild(div);
  });
}

// --- TESTIMONIOS ---
function renderizarTestimonios() {
  const testimonios = [
    {
      nombre: "María G.",
      texto: "El Factor de Transferencia ha sido un cambio total para mi salud. ¡Mis defensas están más fuertes que nunca!",
      rating: 5
    },
    {
      nombre: "Ana L.",
      texto: "Null Age Ampolleta rejuveneció mi piel en semanas. ¡Altamente recomendado!",
      rating: 5
    },
    {
      nombre: "Carlos R.",
      texto: "Inm Box es práctico y efectivo. Siento más energía y mi digestión ha mejorado.",
      rating: 4
    }
  ];

  const contenedor = document.querySelector('#testimonios-clientes');
  if (!contenedor) return;

  testimonios.forEach((t, i) => {
    const estrellas = Array.from({ length: 5 }, (_, j) => {
      return `<i class="fas fa-star${j < t.rating ? '' : '-regular'} text-warning"></i>`;
    }).join('');

    const div = document.createElement('div');
    div.className = `col-md-4 animate__animated animate__fadeInUp delay-${i}`;
    div.innerHTML = `
      <div class="testimonial-card p-4 bg-light shadow-sm rounded h-100">
        <div class="rating-container mb-2">${estrellas}</div>
        <p class="testimonial-text">"${t.texto}"</p>
        <h5 class="mt-3 text-primary">${t.nombre}</h5>
      </div>
    `;
    contenedor.appendChild(div);
  });
}

// --- CTA FINAL ---
function renderizarCTA() {
  const cta = document.querySelector('#cta-compra');
  if (!cta) return;

  cta.innerHTML = `
    <div class="text-center p-5 bg-primary text-white rounded-4 shadow-lg animate__animated animate__zoomIn">
      <h2 class="fw-bold mb-3">¡Eleva tu Salud con InmunoMedi!</h2>
      <p class="lead">Descubre nuestra gama de productos diseñados para fortalecer tu bienestar. ¡Compra ahora y aprovecha los precios de mayoreo!</p>
      <a href="#catalogo-productos" class="btn btn-light btn-lg mt-3 scroll-to">Ir al Catálogo</a>
    </div>
  `;
}

// --- INICIALIZACIÓN DE BOTONES ---
function inicializarBotones() {
  const cart = new Cart();
  const wishlist = new Wishlist();

  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.product;
      const qtyInput = btn.closest('.e-commerce-controls')?.querySelector('.quantity');
      const qty = qtyInput ? parseInt(qtyInput.textContent) : 1;
      cart.addItem(id, qty);
    });
  });

  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    const id = btn.dataset.product;
    wishlist.updateIcon(id);
    btn.addEventListener('click', () => wishlist.toggle(id));
  });

  document.querySelectorAll('.quick-view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const productId = btn.dataset.product;
      const producto = productosData.find(p => p.id === productId);
      if (!producto) return;

      const modal = document.getElementById('quickViewModal');
      if (!modal) return;

      modal.querySelector('.modal-title').textContent = producto.nombre;
      modal.querySelector('.quick-desc').textContent = producto.descripcion;
      modal.querySelector('.quick-presentacion').textContent = producto.presentacion;
      modal.querySelector('.quick-precio').textContent = `$${producto.precioUnitario}`;
      modal.querySelector('.quick-img').src = producto.imagenes[0];
      modal.querySelector('.add-to-cart-btn').dataset.product = producto.id;

      new bootstrap.Modal(modal).show();
    });
  });

  document.querySelectorAll('.ver-detalles-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.productoId;
      sincronizarCarrusel(id);
    });
  });
}

// --- ANIMACIONES GSAP ---
function animarGSAP() {
  gsap.from('.producto-card', {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: '#catalogo-productos',
      start: 'top 85%',
    }
  });

  gsap.from('.producto-recomendado', {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: '#recommended-products',
      start: 'top 85%',
    }
  });

  gsap.from('.beneficio-card', {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3,
    scrollTrigger: {
      trigger: '#beneficios',
      start: 'top 90%',
    }
  });

  gsap.from('.testimonial-card', {
    opacity: 0,
    x: -50,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: '#testimonios-clientes',
      start: 'top 90%',
    }
  });
}

// --- MODO OSCURO INTELIGENTE ---
function aplicarModoOscuroInteligente() {
  const hora = new Date().getHours();
  if (hora >= 20 || hora < 6) {
    document.body.classList.add('modo-oscuro');
  }
}

// --- INICIALIZACIÓN GLOBAL ---
document.addEventListener('DOMContentLoaded', () => {
  const cart = new Cart();
  const wishlist = new Wishlist();

  cart.updateUI();
  renderizarCatalogo();
  renderizarRecomendados();
  renderizarBeneficios();
  renderizarTestimonios();
  renderizarCTA();
  inicializarFiltrosYBusqueda();
  inicializarCompartirSocial();
  animarGSAP();
  aplicarModoOscuroInteligente();

  // Scroll suave para enlaces
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
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });
});

// --- EXPORTACIÓN GLOBAL ---
export { productosData };

// --- SINCRONIZACIÓN DE DETALLES DINÁMICOS ---
function sincronizarDetallesProducto(productId) {
  const producto = productosData.find(p => p.id === productId);
  if (!producto) return;

  const detallesSection = document.getElementById('detalles-producto');
  if (!detallesSection) return;

  // Renderizar pestañas dinámicas con Bootstrap
  detallesSection.innerHTML = `
    <div class="tabs-container">
      <ul class="nav nav-tabs mb-4" id="productTabs" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="desc-tab" data-bs-toggle="tab" data-bs-target="#desc" role="tab">Descripción</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="ingredientes-tab" data-bs-toggle="tab" data-bs-target="#ingredientes" role="tab">Ingredientes</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="uso-tab" data-bs-toggle="tab" data-bs-target="#uso" role="tab">Modo de Uso</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="opiniones-tab" data-bs-toggle="tab" data-bs-target="#opiniones" role="tab">Opiniones</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="preguntas-tab" data-bs-toggle="tab" data-bs-target="#preguntas" role="tab">Preguntas Frecuentes</button>
        </li>
      </ul>
      <div class="tab-content" id="productTabsContent">
        <div class="tab-pane fade show active" id="desc" role="tabpanel">
          <p>${producto.descripcion}</p>
        </div>
        <div class="tab-pane fade" id="ingredientes" role="tabpanel">
          <ul class="list-unstyled">
            ${producto.ingredientes.map(i => `<li><i class="fas fa-check-circle text-primary me-2"></i>${i}</li>`).join('')}
          </ul>
        </div>
        <div class="tab-pane fade" id="uso" role="tabpanel">
          <p>${producto.uso}</p>
        </div>
        <div class="tab-pane fade" id="opiniones" role="tabpanel">
          ${producto.opiniones.map(op => `
            <div class="review mb-3">
              <p>"${op.texto}"</p>
              <div class="rating-container mb-2">
                ${Array.from({ length: 5 }, (_, i) => `<i class="fas fa-star${i < op.rating ? '' : '-regular'} text-warning"></i>`).join('')}
              </div>
              <small class="text-muted">– ${op.autor}</small>
            </div>
          `).join('')}
        </div>
        <div class="tab-pane fade" id="preguntas" role="tabpanel">
          <ul class="list-unstyled">
            ${producto.preguntas.map(p => `<li><i class="fas fa-question-circle text-primary me-2"></i>${p}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;

  // Animar entrada de pestañas
  gsap.from('.tabs-container', { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' });
}

// --- PROMOCIONES TEMPORALES ---
function mostrarPromocionesTemporales() {
  const hoy = new Date();
  const promociones = productosData.filter(p => p.etiquetas.includes('promocion') && new Date(p.fechaLanzamiento) > new Date(hoy - 30 * 24 * 60 * 60 * 1000));
  const contenedor = document.getElementById('promociones-temporales');
  if (!contenedor || promociones.length === 0) return;

  contenedor.innerHTML = `
    <div class="alert alert-warning alert-dismissible fade show shadow-lg" role="alert">
      <h4 class="alert-heading">¡Ofertas Exclusivas por Tiempo Limitado!</h4>
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

  // Animar entrada de la alerta
  gsap.from(contenedor, { opacity: 0, scale: 0.8, duration: 0.7, ease: 'back.out(1.7)' });

  // Re-inicializar botones de la alerta
  inicializarBotones();
}

// --- ANALÍTICAS DE INTERACCIONES ---
function rastrearInteracciones() {
  const eventos = ['click:add-to-cart', 'click:wishlist', 'click:quick-view', 'click:ver-detalles'];
  eventos.forEach(evento => {
    const [action, tipo] = evento.split(':');
    document.querySelectorAll(`.${tipo}-btn`).forEach(btn => {
      btn.addEventListener(action, () => {
        const productId = btn.dataset.product || btn.dataset.productoId;
        const eventData = {
          event: tipo,
          productId,
          timestamp: new Date().toISOString()
        };
        console.log('Evento registrado:', eventData);
        // Integración con Google Analytics o similar
        // gtag('event', tipo, { product_id: productId });
      });
    });
  });

  // Rastrear vistas de productos
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const productId = entry.target.dataset.product;
        console.log('Producto visto:', productId);
        // gtag('event', 'view_item', { product_id: productId });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.producto-card').forEach(card => observer.observe(card));
}

// --- CANTIDADES DINÁMICAS EN CONTROLES ---
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
        new Cart().toast(`Solo quedan ${producto.stock} unidades`, '#ffc107');
      }
    });
  });
}

// --- OPTIMIZACIÓN DE RENDIMIENTO ---
function optimizarRendimiento() {
  // Debounce para eventos de scroll
  let isScrolling;
  window.addEventListener('scroll', () => {
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  });

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
}

// --- ACCESIBILIDAD ---
function mejorarAccesibilidad() {
  // Soporte para teclado
  document.querySelectorAll('.add-to-cart-btn, .wishlist-btn, .quick-view-btn, .ver-detalles-btn').forEach(btn => {
    btn.setAttribute('tabindex', '0');
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // ARIA labels para botones
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

// --- MINI-CARRITO PREVIEW ---
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
    }
  });

  // Cerrar al hacer clic fuera
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
    <div class="mini-cart-header">
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
}

// --- INICIALIZACIÓN COMPLETA ---
document.addEventListener('DOMContentLoaded', () => {
  mostrarPromocionesTemporales();
  rastrearInteracciones();
  inicializarControlesCantidad();
  optimizarRendimiento();
  mejorarAccesibilidad();
  inicializarMiniCarrito();

  // Re-inicializar botones después de renderizados dinámicos
  inicializarBotones();

  // Animación de carga inicial
  gsap.from('header', {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });

  // Animación de CTA
  gsap.from('#cta-compra', {
    opacity: 0,
    scale: 0.9,
    duration: 1,
    delay: 0.5,
    ease: 'elastic.out(1, 0.3)'
  });

  // Gestión de errores en carrusel
  try {
    const carrusel = document.getElementById('carouselProductos');
    if (carrusel) {
      carrusel.addEventListener('slide.bs.carousel', e => {
        const productId = productosData[e.to].id;
        sincronizarDetallesProducto(productId);
      });
    }
  } catch (error) {
    console.warn('Error en inicialización del carrusel:', error);
  }

  // Persistencia de filtros
  const filtrosGuardados = JSON.parse(localStorage.getItem('filtros')) || { busqueda: '', categorias: [], orden: 'rating-desc' };
  if (filtrosGuardados.busqueda) document.getElementById('search-input').value = filtrosGuardados.busqueda;
  filtrosGuardados.categorias.forEach(cat => {
    const checkbox = document.querySelector(`.category-filter[value="${cat}"]`);
    if (checkbox) checkbox.checked = true;
  });
  if (filtrosGuardados.orden) document.getElementById('sort-select').value = filtrosGuardados.orden;
  aplicarFiltros(filtrosGuardados);

  // Guardar filtros al cambiar
  document.getElementById('search-input')?.addEventListener('change', () => {
    filtrosGuardados.busqueda = document.getElementById('search-input').value;
    localStorage.setItem('filtros', JSON.stringify(filtrosGuardados));
  });
  document.querySelectorAll('.category-filter').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      filtrosGuardados.categorias = Array.from(document.querySelectorAll('.category-filter:checked')).map(cb => cb.value);
      localStorage.setItem('filtros', JSON.stringify(filtrosGuardados));
    });
  });
  document.getElementById('sort-select')?.addEventListener('change', e => {
    filtrosGuardados.orden = e.target.value;
    localStorage.setItem('filtros', JSON.stringify(filtrosGuardados));
  });
});