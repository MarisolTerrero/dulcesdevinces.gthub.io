// Navegación responsive
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = burger.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = burger.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Manejo del formulario de contacto CON ENVÍO REAL
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const closeMessage = document.getElementById('closeMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Mostrar indicador de carga
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        try {
            // Enviar formulario usando Formspree (servicio gratuito)
            const formData = new FormData(this);
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Mostrar mensaje de éxito
                successMessage.style.display = 'flex';
                
                // Limpiar formulario
                this.reset();
                
                // Restaurar botón
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Opcional: Enviar datos a Google Analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submission', {
