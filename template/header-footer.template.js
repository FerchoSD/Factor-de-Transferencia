// TEMPLATE HEADER & FOOTER JS - InmunoMedi
// Efectos premium para header y footer: sticky, scroll, menú móvil, contador de carrito, carga dinámica de templates, accesibilidad.

// Google Tag Manager
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MCPS5HTD');
  
/**
 * Carga dinámica de templates para header y footer en sitios estáticos
 * @param {string} id - ID del contenedor donde insertar el HTML
 * @param {string} url - Ruta del archivo template
 */
async function loadTemplate(id, url) {
  const container = document.getElementById(id);
  if (container) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('No se pudo cargar el template: ' + url);
      const html = await response.text();
      container.innerHTML = html;
      console.log(`Template ${id} cargado con éxito desde ${url}`);
    } catch (err) {
      console.error('Error cargando template', url, err);
    }
  } else {
    console.warn(`Contenedor ${id} no encontrado`);
  }
}

// Efecto hover para botones premium si no hay soporte CSS :hover
function addPremiumNavBtnHoverEffect() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      if (btn.classList.contains('premium-cart')) {
        btn.style.background = 'linear-gradient(135deg, #fff2df 0%, #fff2df 100%)';
        btn.style.color = '#056afa';
        btn.style.transform = 'translateY(-3px)';
        btn.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.2)';
      } else {
        btn.style.background = 'rgba(255,242,223,0.25)';
        btn.style.transform = 'translateY(-3px)';
        btn.style.boxShadow = '0 10px 25px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.1)';
        btn.style.color = '#056afa';
      }
    });
    btn.addEventListener('mouseleave', function() {
      if (btn.classList.contains('premium-cart')) {
        btn.style.background = 'linear-gradient(135deg, rgba(255,242,223,0.3) 0%, rgba(255,242,223,0.15) 100%)';
        btn.style.color = 'white';
        btn.style.transform = 'translateY(0)';
        btn.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.1)';
      } else {
        btn.style.background = 'rgba(255,255,255,0.12)';
        btn.style.transform = 'translateY(0)';
        btn.style.boxShadow = '0 6px 15px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.05)';
        btn.style.color = 'white';
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  addPremiumNavBtnHoverEffect();
  loadTemplate("header-placeholder", "/template/header.template.html");
  loadTemplate("footer-placeholder", "/template/footer.template.html");

  // Verificar carga del mapa
  setTimeout(() => {
    const mapIframe = document.querySelector('#map-container iframe');
    const mapFallback = document.querySelector('#map-container .map-fallback');
    if (mapIframe && mapFallback) {
      mapIframe.addEventListener('error', () => {
        mapIframe.style.display = 'none';
        mapFallback.style.display = 'block';
      });
      // Verificar si el iframe tiene contenido
      if (!mapIframe.contentDocument || mapIframe.contentDocument.readyState === 'failed') {
        mapIframe.style.display = 'none';
        mapFallback.style.display = 'block';
      }
    }
  }, 1000);

  // Header efecto scroll dinámico
  const header = document.querySelector("header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 10);
    });
  }

  // Menú móvil toggle seguro y accesible
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
      const icon = menuToggle.querySelector("i");
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-times");
    });
    // Cierra menú al hacer click en un enlace
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute('aria-expanded', 'false');
        const icon = menuToggle.querySelector("i");
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-times");
      });
    });
    // Cierra menú al hacer click fuera
    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target) && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        menuToggle.setAttribute('aria-expanded', 'false');
        const icon = menuToggle.querySelector("i");
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-times");
      }
    });
  }

  // Contador de carrito (placeholder con localStorage)
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    let count = 0;
    try {
      count = parseInt(localStorage.getItem('cartCount'), 10);
      if (isNaN(count)) count = 0;
    } catch (e) { count = 0; }
    cartCount.textContent = count;
    // TODO: Integrar con la lógica real del carrito (e.g., actualizar desde script.js o API)
  }

  // Accesibilidad: focus visible para navegación teclado
  document.body.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
    }
  });
  document.body.addEventListener('mousedown', () => {
    document.body.classList.remove('user-is-tabbing');
  });
});