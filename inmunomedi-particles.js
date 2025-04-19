/**
 * Sistema de partículas inmunológicas premium
 * Este script genera partículas flotantes que representan elementos del sistema inmunológico
 * Está optimizado para rendimiento y compatibilidad
 */

// Google Tag Manager
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MCPS5HTD');
    
document.addEventListener('DOMContentLoaded', function() {
    console.log('Iniciando sistema de partículas inmunológicas');
    
    // Evitar inicializar múltiples veces
    if (window.inmunoParticlesInitialized) {
        return;
    }
    window.inmunoParticlesInitialized = true;
    
    // Crear contenedor de partículas si no existe
    let particlesContainer = document.getElementById('bg-particles');
    if (!particlesContainer) {
        console.log('Creando contenedor de partículas');
        particlesContainer = document.createElement('div');
        particlesContainer.id = 'bg-particles';
        particlesContainer.style.position = 'fixed';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.zIndex = '-5';
        particlesContainer.style.pointerEvents = 'none';
        particlesContainer.style.overflow = 'hidden';
        document.body.prepend(particlesContainer);
    }
    
    // Asegurar que las partículas no interfieran con eventos de mouse
    // Usando delegación de eventos para mejor rendimiento
    document.addEventListener('mousemove', function(e) {
        if (!particlesContainer) return;
        particlesContainer.style.pointerEvents = 'none';
    }, { passive: true });
    
    // Configuración optimizada de partículas
    const particleCount = window.innerWidth < 768 ? 10 : 25; // Adaptativo según tamaño de pantalla
    
    // Función centralizada para crear partículas
    function createParticle(options) {
        const {
            size,
            background,
            border,
            opacity,
            blur,
            borderRadius = '50%',
            boxShadow,
            animationType = 'float-element',
            rotateAnimation = true
        } = options;
        
        const particle = document.createElement('div');
        particle.className = 'immune-particle';
        particle.style.position = 'absolute';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '-10';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.borderRadius = borderRadius;
        
        if (background) particle.style.background = background;
        if (border) particle.style.border = border;
        if (boxShadow) particle.style.boxShadow = boxShadow;
        
        // Animación base
        const duration = Math.random() * 15 + 15;
        const delay = Math.random() * 5;
        let animation = `${animationType} ${duration}s infinite ease-in-out ${delay}s`;
        
        // Rotación opcional
        if (rotateAnimation && Math.random() > 0.5) {
            const rotateDuration = Math.random() * 30 + 20;
            animation += `, rotate-slow ${rotateDuration}s linear infinite`;
        }
        
        particle.style.animation = animation;
        particle.style.opacity = opacity || '0.7';
        if (blur) particle.style.filter = `blur(${blur}px)`;
        
        return particle;
    }
    
    // Tipos de partículas
    const particleTypes = [
        // Células inmunológicas azules
        function() {
            const size = Math.random() * 150 + 100;
            const opacity = (Math.random() * 0.3 + 0.2).toFixed(2);
            const background = `radial-gradient(circle, rgba(5, 106, 250, ${Math.random() * 0.5 + 0.3}) 0%, rgba(5, 106, 250, 0.1) 70%)`;
            const boxShadow = '0 0 40px rgba(5, 106, 250, 0.3)';
            
            return createParticle({
                size,
                background,
                boxShadow,
                opacity,
                blur: 1
            });
        },
        // Moléculas de anticuerpos
        function() {
            const size = Math.random() * 120 + 80;
            const opacity = (Math.random() * 0.2 + 0.1).toFixed(2);
            const border = `2px solid rgba(98, 200, 243, ${Math.random() * 0.4 + 0.2})`;
            const boxShadow = '0 0 30px rgba(98, 200, 243, 0.2)';
            
            return createParticle({
                size,
                border,
                boxShadow,
                opacity,
                blur: 0
            });
        },
        // Células T (tonos rosados)
        function() {
            const size = Math.random() * 130 + 70;
            const opacity = (Math.random() * 0.3 + 0.1).toFixed(2);
            const background = `radial-gradient(circle, rgba(255, 207, 250, ${Math.random() * 0.4 + 0.2}) 0%, rgba(255, 207, 250, 0.05) 70%)`;
            const boxShadow = '0 0 30px rgba(255, 207, 250, 0.3)';
            
            return createParticle({
                size,
                background,
                boxShadow,
                opacity,
                blur: 1
            });
        }
    ];
    
    // Usar fragmento para mejorar rendimiento
    const fragment = document.createDocumentFragment();
    
    // Distribución optimizada de partículas
    for (let i = 0; i < particleCount; i++) {
        // Seleccionar tipo aleatorio pero con distribución controlada
        const index = Math.floor(Math.random() * particleTypes.length);
        const particleCreator = particleTypes[index];
        const particle = particleCreator();
        
        // Posicionamiento optimizado para distribución uniforme
        // Dividimos la pantalla en sectores para evitar aglomeraciones
        const sectorX = Math.floor(i % 5) / 5;
        const sectorY = Math.floor(i / 5) / 5;
        
        particle.style.top = (sectorY * 100 + Math.random() * 20 - 10) + 'vh';
        particle.style.left = (sectorX * 100 + Math.random() * 20 - 10) + 'vw';
        
        // Usar transform para mejor rendimiento
        const initialX = Math.random() * 20 - 10;
        const initialY = Math.random() * 20 - 10;
        particle.style.transform = `translate(${initialX}px, ${initialY}px)`;
        
        // Añadir al fragmento
        fragment.appendChild(particle);
    }
    
    // Añadir todas las partículas de una vez al DOM
    particlesContainer.appendChild(fragment);
    
    // Ajustar posiciones en ventanas pequeñas
    function adjustParticles() {
        const particles = document.querySelectorAll('.immune-particle');
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        particles.forEach(particle => {
            // Asegurar que estén dentro de la pantalla
            const top = parseFloat(particle.style.top);
            const left = parseFloat(particle.style.left);
            
            if (top > height || left > width) {
                particle.style.top = (Math.random() * 70) + 'vh';
                particle.style.left = (Math.random() * 70) + 'vw';
            }
        });
    }
    
    // Ajustar en resize y orientación
    window.addEventListener('resize', adjustParticles, { passive: true });
    window.addEventListener('orientationchange', adjustParticles, { passive: true });
    // Monitorización de rendimiento
    console.log('Partículas inmunológicas inicializadas: ' + particleCount);
});

/**
 * Mejoras de interactividad para carrusel y elementos UI
 * Optimizado para rendimiento y experiencia de usuario
 */
document.addEventListener('DOMContentLoaded', function() {
    // Evitar inicializar múltiples veces
    if (window.carouselEnhancementsInitialized) return;
    window.carouselEnhancementsInitialized = true;
    
    // Función para añadir efectos de hover a elementos
    function addHoverEffect(selector, enterStyles, leaveStyles) {
        const elements = document.querySelectorAll(selector);
        if (!elements.length) return;
        
        elements.forEach(element => {
            // Usar delegación de eventos
            element.addEventListener('mouseenter', function() {
                Object.keys(enterStyles).forEach(prop => {
                    this.style[prop] = enterStyles[prop];
                });
            });
            
            element.addEventListener('mouseleave', function() {
                Object.keys(leaveStyles).forEach(prop => {
                    this.style[prop] = leaveStyles[prop];
                });
            });
        });
    }
    
    // Mejorar controles del carrusel
    addHoverEffect(
        '.carousel-control-prev, .carousel-control-next',
        { opacity: '0.9', transform: 'translateY(-50%) scale(1.1)' },
        { opacity: '0.7', transform: 'translateY(-50%) scale(1)' }
    );
    
    // Mejorar indicadores del carrusel
    addHoverEffect(
        '[data-bs-target="#carouselMain"]',
        { transform: 'scale(1.3)', background: 'rgba(255,255,255,0.8)' },
        { transform: 'scale(1)', background: 'rgba(255,255,255,0.3)' }
    );
    
    // Ocultar el preloader de manera optimizada
    function hidePreloader() {
        const preloader = document.getElementById('preloader');
        if (!preloader) return;

        // Usar requestAnimationFrame para mejor rendimiento
        requestAnimationFrame(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            // Usar evento 'transitionend' en lugar de setTimeout
            preloader.addEventListener('transitionend', function handler() {
                preloader.style.display = 'none';
                preloader.removeEventListener('transitionend', handler);
            });
        });
    }
    
    // Cargar próximamente imágenes para mejor UX
    function preloadCarouselImages() {
        const carouselImages = document.querySelectorAll('.carousel-item img');
        if (!carouselImages.length) return;
        
        carouselImages.forEach(img => {
            const src = img.getAttribute('src');
            if (src) {
                const preloadLink = document.createElement('link');
                preloadLink.rel = 'preload';
                preloadLink.as = 'image';
                preloadLink.href = src;
                document.head.appendChild(preloadLink);
            }
        });
    }
    
    // Llamar a la función de precarga
    preloadCarouselImages();
    
    // Ocultar preloader cuando todo esté listo
    if (document.readyState === 'complete') {
        hidePreloader();
    } else {
        window.addEventListener('load', hidePreloader);
    }
    
    // Respaldo para ocultar el preloader
    setTimeout(hidePreloader, 2500);
});
