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

// FORMULARIO DE CONTACTO COMPLETAMENTE FUNCIONAL
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoading = submitBtn.querySelector('.btn-loading');
const formStatus = document.getElementById('formStatus');
const successMessage = document.getElementById('successMessage');
const closeMessage = document.getElementById('closeMessage');

// URL de Formspree - REEMPLAZA CON TU EMAIL REAL
// Para que funcione: visita https://formspree.io/, regístrate y obtén tu URL
const FORMSPREE_URL = 'https://formspree.io/f/xpqdqzak'; // URL de ejemplo
method="POST"
// Alternativa: EmailJS - También gratuita
// const EMAILJS_SERVICE_ID = 'tuserviceid';
// const EMAILJS_TEMPLATE_ID = 'tutemplateid';
// const EMAILJS_USER_ID = 'tupublickey';

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validar formulario
        if (!validateForm()) {
            return;
        }
        
        // Mostrar estado de carga
        showLoading(true);
        formStatus.textContent = '';
        formStatus.className = 'form-status';
        
        try {
            // OPCIÓN 1: Usando Formspree (RECOMENDADO - MÁS SIMPLE)
            const formData = new FormData(this);
            
            // Convertir FormData a objeto
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Enviar a Formspree
            const response = await fetch(FORMSPREE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                // Éxito
                showSuccessMessage();
                contactForm.reset();
                showLoading(false);
                
                // OPCIÓN ALTERNATIVA: Mostrar mensaje de confirmación
                formStatus.textContent = '¡Mensaje enviado correctamente! Te contactaremos pronto.';
                formStatus.className = 'form-status success';
                
                // También puedes usar esta función si prefieres el popup
                // showSuccessPopup();
                
            } else {
                throw new Error('Error en el servidor');
            }
            
        } catch (error) {
            console.error('Error:', error);
            
            // OPCIÓN 2: Simulación de envío (para desarrollo)
            // Descomenta esta sección si Formspree no funciona
            /*
            setTimeout(() => {
                showSuccessMessage();
                contactForm.reset();
                showLoading(false);
                
                formStatus.textContent = '¡Mensaje enviado correctamente! (Modo simulación)';
                formStatus.className = 'form-status success';
            }, 1500);
            */
            
            // O mostrar error
            formStatus.textContent = 'Error al enviar el mensaje. Por favor, inténtalo de nuevo o contáctanos por teléfono.';
            formStatus.className = 'form-status error';
            showLoading(false);
        }
    });
}

// Función para validar el formulario
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name) {
        showError('Por favor, ingresa tu nombre completo.');
        return false;
    }
    
    if (!email) {
        showError('Por favor, ingresa tu correo electrónico.');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showError('Por favor, ingresa un correo electrónico válido.');
        return false;
    }
    
    if (!message) {
        showError('Por favor, escribe tu mensaje.');
        return false;
    }
    
    return true;
}

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para mostrar errores
function showError(message) {
    formStatus.textContent = message;
    formStatus.className = 'form-status error';
    
    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
    }, 5000);
}

// Función para mostrar/ocultar estado de carga
function showLoading(show) {
    if (show) {
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-block';
        submitBtn.disabled = true;
    } else {
        btnText.style.display = 'inline-block';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    }
}

// Función para mostrar mensaje de éxito (popup)
function showSuccessPopup() {
    successMessage.style.display = 'flex';
    
    // Cerrar mensaje después de 5 segundos automáticamente
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
}

// Función para mostrar mensaje de éxito
function showSuccessMessage() {
    // Mostrar en el formulario
    formStatus.textContent = '¡Mensaje enviado correctamente! Te contactaremos en 24-48 horas.';
    formStatus.className = 'form-status success';
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
    }, 5000);
}

// Cerrar mensaje de éxito
if (closeMessage) {
    closeMessage.addEventListener('click', () => {
        successMessage.style.display = 'none';
    });
}

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
document.querySelectorAll('.product-card, .about-content, .contact-container, .recipe-card').forEach(el => {
    observer.observe(el);
});


