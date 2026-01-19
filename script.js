// Navegación responsive
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.querySelector('i').classList.toggle('fa-bars');
    burger.querySelector('i').classList.toggle('fa-times');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.querySelector('i').classList.add('fa-bars');
        burger.querySelector('i').classList.remove('fa-times');
    });
});

// Formulario de contacto (simulación)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simulación de envío (en un proyecto real usarías Formspree, EmailJS, etc.)
        console.log('Datos del formulario:');
        console.log('Nombre:', name);
        console.log('Email:', email);
        console.log('Mensaje:', message);
        
        // Mostrar mensaje de éxito
        alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
        
        // Limpiar formulario
        this.reset();
    });
}

// Scroll suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto de aparición al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar elementos para animación
document.querySelectorAll('.product-card, .about-content, .contact-container').forEach(el => {
    observer.observe(el);
});