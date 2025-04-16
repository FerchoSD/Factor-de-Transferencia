// Script para generar partículas inmunológicas en el fondo
document.addEventListener('DOMContentLoaded', function() {
    // Crear el contenedor de partículas
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'bg-immune-particles';
    document.body.appendChild(particlesContainer);
    
    // Generar partículas inmunológicas
    const particleCount = 15; // Número de partículas
    const particleTypes = [
        // Células inmunológicas (círculos con gradientes)
        {
            create: function() {
                const size = Math.random() * 100 + 50;
                const particle = document.createElement('div');
                particle.className = 'immune-particle';
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                particle.style.background = `radial-gradient(circle, rgba(5, 106, 250, ${Math.random() * 0.1 + 0.05}) 0%, rgba(5, 106, 250, 0) 70%)`;
                particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
                particle.style.animationDelay = (Math.random() * 5) + 's';
                return particle;
            }
        },
        // Moléculas de anticuerpos (formas más complejas con pseudo-elementos)
        {
            create: function() {
                const size = Math.random() * 80 + 40;
                const particle = document.createElement('div');
                particle.className = 'immune-particle';
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                particle.style.border = `2px solid rgba(98, 200, 243, ${Math.random() * 0.1 + 0.05})`;
                particle.style.borderRadius = '50%';
                particle.style.animationDuration = (Math.random() * 12 + 10) + 's';
                particle.style.animationDelay = (Math.random() * 5) + 's';
                return particle;
            }
        },
        // Células T (círculos con borde)
        {
            create: function() {
                const size = Math.random() * 60 + 30;
                const particle = document.createElement('div');
                particle.className = 'immune-particle';
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                particle.style.background = `radial-gradient(circle, rgba(255, 207, 250, ${Math.random() * 0.1 + 0.05}) 0%, rgba(255, 207, 250, 0) 70%)`;
                particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
                particle.style.animationDelay = (Math.random() * 5) + 's';
                return particle;
            }
        }
    ];
    
    // Crear y posicionar las partículas
    for (let i = 0; i < particleCount; i++) {
        // Seleccionar un tipo aleatorio de partícula
        const particleType = particleTypes[Math.floor(Math.random() * particleTypes.length)];
        const particle = particleType.create();
        
        // Posicionar aleatoriamente en la pantalla
        particle.style.top = (Math.random() * 100) + 'vh';
        particle.style.left = (Math.random() * 100) + 'vw';
        
        // Añadir al contenedor
        particlesContainer.appendChild(particle);
    }
    
    // Efecto de rotación lenta para algunas partículas
    const rotatingParticles = document.querySelectorAll('.immune-particle:nth-child(odd)');
    rotatingParticles.forEach(particle => {
        particle.style.animation += ', rotate-slow ' + (Math.random() * 30 + 20) + 's linear infinite';
    });
});

// Script para mejorar la interactividad del carrusel
document.addEventListener('DOMContentLoaded', function() {
    // Añadir efecto de hover a los controles del carrusel
    const carouselControls = document.querySelectorAll('.carousel-control-prev, .carousel-control-next');
    carouselControls.forEach(control => {
        control.addEventListener('mouseenter', function() {
            this.style.opacity = '0.9';
            this.style.transform = 'scale(1.1)';
        });
        
        control.addEventListener('mouseleave', function() {
            this.style.opacity = '0.5';
            this.style.transform = 'scale(1)';
        });
    });
    
    // Añadir efecto de hover a los indicadores del carrusel
    const carouselIndicators = document.querySelectorAll('[data-bs-target="#carouselMain"]');
    carouselIndicators.forEach(indicator => {
        indicator.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3)';
            this.style.background = 'rgba(255,255,255,0.7)';
        });
        
        indicator.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = 'rgba(255,255,255,0.3)';
        });
    });
    
    // Ocultar el preloader después de cargar la página
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500);
    }
});
