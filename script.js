// Pharma Soluções - Website JavaScript
// Funcionalidades principais do site

// Configurações globais
const CONFIG = {
    animationDuration: 300,
    scrollOffset: 80,
    parallaxSpeed: 0.5
};

// Utilitários
const utils = {
    // Debounce function para otimizar performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function para scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    },

    // Verificar se elemento está visível na viewport
    isInViewport(element, offset = 0) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= -offset &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Smooth scroll para âncoras
    smoothScrollTo(target, offset = CONFIG.scrollOffset) {
        const element = typeof target === 'string' ? document.querySelector(target) : target;
        if (element) {
            const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
};

// Gerenciamento do Header
class HeaderManager {
    constructor() {
        this.header = document.querySelector('.header');
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.lastScrollY = window.scrollY;
        this.isMenuOpen = false;
        
        this.init();
    }

    init() {
        if (!this.header) return;
        
        this.setupScrollBehavior();
        this.setupMobileMenu();
        this.setupDropdowns();
        this.setupSmoothScrolling();
    }

    setupScrollBehavior() {
        const handleScroll = utils.throttle(() => {
            const currentScrollY = window.scrollY;
            
            // Header background on scroll
            if (currentScrollY > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll direction
            if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
                this.header.style.transform = 'translateY(-100%)';
            } else {
                this.header.style.transform = 'translateY(0)';
            }
            
            this.lastScrollY = currentScrollY;
        }, 10);

        window.addEventListener('scroll', handleScroll);
    }

    setupMobileMenu() {
        if (!this.navToggle || !this.navMenu) return;

        this.navToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Fechar menu ao clicar em link
        this.navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (this.isMenuOpen) {
                    this.toggleMobileMenu();
                }
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !this.header.contains(e.target)) {
                this.toggleMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    setupDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const menu = dropdown.querySelector('.dropdown-menu');
            let timeout;

            dropdown.addEventListener('mouseenter', () => {
                clearTimeout(timeout);
                menu.style.display = 'block';
                setTimeout(() => {
                    menu.classList.add('show');
                }, 10);
            });

            dropdown.addEventListener('mouseleave', () => {
                menu.classList.remove('show');
                timeout = setTimeout(() => {
                    menu.style.display = 'none';
                }, CONFIG.animationDuration);
            });
        });
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                utils.smoothScrollTo(href);
            });
        });
    }
}

// Efeitos de Parallax
class ParallaxManager {
    constructor() {
        this.parallaxElements = document.querySelectorAll('.parallax-bg, .expertise-numbers');
        this.init();
    }

    init() {
        if (this.parallaxElements.length === 0) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        
        this.setupParallax();
    }

    setupParallax() {
        const handleScroll = utils.throttle(() => {
            const scrolled = window.pageYOffset;
            
            this.parallaxElements.forEach(element => {
                const rate = scrolled * CONFIG.parallaxSpeed;
                
                if (element.classList.contains('parallax-bg')) {
                    element.style.transform = `translateY(${rate}px)`;
                } else if (element.classList.contains('expertise-numbers')) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        element.style.setProperty('--parallax-offset', `${rate * 0.3}px`);
                    }
                }
            });
        }, 16);

        window.addEventListener('scroll', handleScroll);
    }
}

// Animações de entrada
class AnimationManager {
    constructor() {
        this.animatedElements = document.querySelectorAll(
            '.service-card, .team-member, .stat-item, .testimonial-card, .number-item'
        );
        this.init();
    }

    init() {
        if (this.animatedElements.length === 0) return;
        
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        this.animatedElements.forEach(element => {
            element.classList.add('animate-ready');
            observer.observe(element);
        });
    }
}

// Contador animado para números
class CounterManager {
    constructor() {
        this.counters = document.querySelectorAll('.number-value, .stat-number');
        this.init();
    }

    init() {
        if (this.counters.length === 0) return;
        
        this.setupCounters();
    }

    setupCounters() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            const suffix = element.textContent.includes('+') ? '+' : '';
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    }
}

// Slider de clientes
class ClientsSlider {
    constructor() {
        this.slider = document.querySelector('.clients-slider');
        this.track = document.querySelector('.clients-track');
        this.init();
    }

    init() {
        if (!this.slider || !this.track) return;
        
        this.setupSlider();
    }

    setupSlider() {
        // Duplicar itens para loop infinito
        const items = this.track.children;
        const itemsArray = Array.from(items);
        
        itemsArray.forEach(item => {
            const clone = item.cloneNode(true);
            this.track.appendChild(clone);
        });

        // Configurar animação
        const totalWidth = this.track.scrollWidth / 2;
        const duration = totalWidth / 50; // 50px por segundo
        
        this.track.style.animation = `slideClients ${duration}s linear infinite`;
        
        // Pausar animação no hover
        this.slider.addEventListener('mouseenter', () => {
            this.track.style.animationPlayState = 'paused';
        });
        
        this.slider.addEventListener('mouseleave', () => {
            this.track.style.animationPlayState = 'running';
        });
    }
}

// Formulários
class FormManager {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }

    init() {
        if (this.forms.length === 0) return;
        
        this.setupForms();
    }

    setupForms() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });

            // Validação em tempo real
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        // Validações básicas
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            message = 'Este campo é obrigatório';
        } else if (field.type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            message = 'Email inválido';
        } else if (field.type === 'tel' && value && !this.isValidPhone(value)) {
            isValid = false;
            message = 'Telefone inválido';
        }

        this.showFieldValidation(field, isValid, message);
        return isValid;
    }

    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    isValidPhone(phone) {
        const regex = /^[\d\s\(\)\+\-]{10,}$/;
        return regex.test(phone);
    }

    showFieldValidation(field, isValid, message) {
        const container = field.closest('.form-group') || field.parentElement;
        let errorElement = container.querySelector('.field-error');

        if (!isValid) {
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'field-error';
                container.appendChild(errorElement);
            }
            errorElement.textContent = message;
            field.classList.add('error');
        } else {
            if (errorElement) {
                errorElement.remove();
            }
            field.classList.remove('error');
        }
    }

    handleFormSubmit(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            this.submitForm(form);
        } else {
            this.showFormError('Por favor, corrija os erros antes de enviar.');
        }
    }

    async submitForm(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Loading state
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;

        try {
            const formData = new FormData(form);
            
            // Simular envio (substituir pela URL real)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            this.showFormSuccess('Mensagem enviada com sucesso!');
            form.reset();
        } catch (error) {
            this.showFormError('Erro ao enviar mensagem. Tente novamente.');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }

    showFormSuccess(message) {
        this.showFormMessage(message, 'success');
    }

    showFormError(message) {
        this.showFormMessage(message, 'error');
    }

    showFormMessage(message, type) {
        const messageElement = document.createElement('div');
        messageElement.className = `form-message form-message--${type}`;
        messageElement.textContent = message;
        
        document.body.appendChild(messageElement);
        
        setTimeout(() => {
            messageElement.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            messageElement.classList.remove('show');
            setTimeout(() => {
                messageElement.remove();
            }, 300);
        }, 5000);
    }
}

// Otimizações de performance
class PerformanceManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.setupImageOptimization();
        this.setupCriticalResourceHints();
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback para navegadores sem suporte
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }

    setupImageOptimization() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        });
    }

    setupCriticalResourceHints() {
        // Preload critical resources
        const criticalResources = [
            { href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap', as: 'style' }
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            document.head.appendChild(link);
        });
    }
}

// Inicialização quando DOM estiver pronto
class App {
    constructor() {
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    }

    start() {
        // Inicializar todos os managers
        new HeaderManager();
        new ParallaxManager();
        new AnimationManager();
        new CounterManager();
        new ClientsSlider();
        new FormManager();
        new PerformanceManager();

        // Adicionar classes CSS para animações
        this.addAnimationStyles();
        
        // Configurar service worker se disponível
        this.setupServiceWorker();
        
        console.log('Pharma Soluções - Website carregado com sucesso!');
    }

    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .animate-ready {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .form-message {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 10000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            }
            
            .form-message.show {
                transform: translateX(0);
            }
            
            .form-message--success {
                background-color: #10b981;
            }
            
            .form-message--error {
                background-color: #ef4444;
            }
            
            .field-error {
                color: #ef4444;
                font-size: 0.875rem;
                margin-top: 0.25rem;
            }
            
            .error {
                border-color: #ef4444 !important;
            }
            
            .loaded {
                opacity: 1;
            }
            
            @media (prefers-reduced-motion: reduce) {
                .animate-ready,
                .animate-in {
                    transition: none;
                    transform: none;
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registrado com sucesso:', registration);
                    })
                    .catch(error => {
                        console.log('Falha ao registrar SW:', error);
                    });
            });
        }
    }
}

// Inicializar aplicação
new App();