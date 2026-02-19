document.addEventListener('DOMContentLoaded', () => {
    // --- 1. CONFIGURAÇÃO DO CANVAS (Chuva de Bits) ---
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        const charSize = 16;
        const columns = Math.floor(width / charSize);
        const drops = Array(columns).fill(1);

        function drawMatrix() {
            ctx.fillStyle = 'rgba(5, 10, 7, 0.1)';
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = '#1586f5';
            ctx.font = `${charSize}px 'Share Tech Mono'`;
            for (let i = 0; i < drops.length; i++) {
                const text = Math.random() > 0.5 ? "0" : "1";
                const x = i * charSize;
                const y = drops[i] * charSize;
                ctx.fillText(text, x, y);
                if (y > height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
        }
        setInterval(drawMatrix, 33);
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });
    }

    // --- 2. INTERATIVIDADE HUD (Coordenadas) ---
    const coords = document.querySelector('.coordinates');
    if (coords) {
        document.addEventListener('mousemove', (e) => {
            coords.innerText = `X: ${e.clientX.toString().padStart(3, '0')} Y: ${e.clientY.toString().padStart(3, '0')}`;
        });
    }

    // --- 3. MENU RESPONSIVO (Lógica para todas as páginas) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navItems = document.querySelector('.nav-items');
    
    if (menuToggle && navItems) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Impede fechar ao abrir
            navItems.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', navItems.classList.contains('active'));
        });

        // Fechar ao clicar em um link
        navItems.querySelectorAll('.item').forEach(link => {
            link.addEventListener('click', () => {
                navItems.classList.remove('active');
            });
        });

        // Fechar ao clicar fora (exigência do usuário)
        document.addEventListener('click', (e) => {
            if (navItems.classList.contains('active') && 
                !navItems.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                navItems.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // --- 4. EFEITOS DE GLITCH (Apenas Home) ---
    const glitchWrap = document.getElementById('glitchWrap');
    if (glitchWrap) {
        const redLayer = document.querySelector('.layer-red');
        const blueLayer = document.querySelector('.layer-blue');

        const applyRandomSlice = (layer) => {
            const top = Math.floor(Math.random() * 70);
            const h = Math.floor(Math.random() * 24) + 6;
            layer.style.clipPath = `inset(${top}% 0 ${100 - top - h}% 0)`;
            layer.style.transform = `translate(${Math.random() * 20 - 10}px, ${Math.random() * 8 - 4}px)`;
        };

        const triggerGlitch = (duration = 350) => {
            glitchWrap.classList.add('glitch-active');
            applyRandomSlice(redLayer);
            applyRandomSlice(blueLayer);
            setTimeout(() => {
                glitchWrap.classList.remove('glitch-active');
                [redLayer, blueLayer].forEach(l => { l.style.clipPath = ''; l.style.transform = ''; });
            }, duration);
        };

        glitchWrap.addEventListener('mouseenter', () => triggerGlitch(280));
        setInterval(() => { if (Math.random() > 0.85) triggerGlitch(300); }, 4000);
    }

    // --- 5. EFEITOS DE TERMINAL (Apenas Projetos) ---
    const typingElements = document.querySelectorAll('.typing-text');
    if (typingElements.length > 0) {
        typingElements.forEach((el, index) => {
            const text = el.innerHTML;
            el.innerHTML = '';
            setTimeout(() => {
                let i = 0;
                const timer = setInterval(() => {
                    if (i < text.length) { el.innerHTML += text.charAt(i); i++; }
                    else { clearInterval(timer); el.style.borderRight = "none"; }
                }, 40);
            }, index * 1200);
        });
    }
});
/* tools */
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Efeito de Escrita/Scramble no Título
    const title = document.querySelector('.glitch-text');
    const originalText = title.innerText;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    
    function scrambleText(element, finalValue) {
        let iteration = 0;
        const interval = setInterval(() => {
            element.innerText = finalValue.split("")
                .map((letter, index) => {
                    if(index < iteration) return finalValue[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");
            
            if(iteration >= finalValue.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);
    }

    // 2. Observer para animar as barras e o título quando visíveis
    const observerOptions = {
        threshold: 0.5
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Inicia o efeito de texto
                scrambleText(title, originalText);
                
                // Anima as barras de progresso (Sync Bars)
                const bars = entry.target.querySelectorAll('.fill');
                bars.forEach(bar => {
                    // Recupera a largura definida no atributo style do HTML
                    const targetWidth = bar.style.width;
                    bar.style.width = '0'; // Reset inicial
                    setTimeout(() => {
                        bar.style.width = targetWidth;
                    }, 200);
                });

                // Para de observar após a primeira execução (opcional)
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const targetSection = document.querySelector('.system-interface');
    sectionObserver.observe(targetSection);

    // 3. Log de Sistema no Console (Easter Egg)
    console.log("%c [SISTEMA] Módulos de Arsenal carregados com sucesso.", "color: #1586f5; font-weight: bold;");
});
/* about */
document.addEventListener("DOMContentLoaded", () => {

    /* ============================= */
    /* TYPING EFFECT */
    /* ============================= */

    const typingElement = document.getElementById("typing-text");
    const phrases = [
        "Construindo experiências digitais imersivas.",
        "Unindo estética futurista e código preciso.",
        "Interface com identidade e intenção."
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 60;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (!isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex++);
            if (charIndex > currentPhrase.length) {
                setTimeout(() => isDeleting = true, 1200);
            }
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex--);
            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
        }

        setTimeout(typeEffect, isDeleting ? 40 : typingSpeed);
    }

    typeEffect();


    /* ============================= */
    /* SUBTLE GLITCH EFFECT */
    /* ============================= */

    const heroTitle = document.querySelector(".hero-title");

    function glitchEffect() {
        heroTitle.style.textShadow = `
            2px 0 #00f0ff,
            -2px 0 #ff00c8
        `;

        setTimeout(() => {
            heroTitle.style.textShadow = "0 0 10px rgba(0,240,255,0.6)";
        }, 120);
    }

    setInterval(() => {
        if (Math.random() > 0.85) {
            glitchEffect();
        }
    }, 2000);


    /* ============================= */
    /* SMOOTH SCROLL */
    /* ============================= */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });


    /* ============================= */
    /* PARALLAX AVATAR */
    /* ============================= */

    const avatar = document.querySelector(".avatar-container");

    document.addEventListener("mousemove", (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 40;
        const y = (window.innerHeight / 2 - e.clientY) / 40;

        avatar.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });


    /* ============================= */
    /* PARTICLES (LIGHTWEIGHT CANVAS) */
    /* ============================= */

    const particlesContainer = document.getElementById("particles");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    particlesContainer.appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedY = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.y += this.speedY;
            if (this.y > canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.fillStyle = "rgba(0,240,255,0.5)";
            ctx.fillRect(this.x, this.y, this.size, this.size * 4);
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < 80; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

});
/* contato */
document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contact-form");

    /* ============================= */
    /* SYSTEM MESSAGE ELEMENT */
    /* ============================= */

    const systemMessage = document.createElement("div");
    systemMessage.classList.add("system-message");
    form.appendChild(systemMessage);

    function showSystemMessage(type, message) {
        systemMessage.textContent = message;
        systemMessage.className = "system-message " + type;
        systemMessage.style.opacity = "1";

        setTimeout(() => {
            systemMessage.style.opacity = "0";
        }, 4000);
    }

    /* ============================= */
    /* VALIDATION */
    /* ============================= */

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const tipoProjeto = document.getElementById("tipo-projeto").value;
        const mensagem = document.getElementById("mensagem").value.trim();
        const button = form.querySelector(".btn-submit");

        if (!nome) {
            showSystemMessage("error", "ERROR: Nome obrigatório.");
            return;
        }

        if (!email || !isValidEmail(email)) {
            showSystemMessage("error", "ERROR: Email inválido.");
            return;
        }

        if (!tipoProjeto) {
            showSystemMessage("error", "ERROR: Selecione o tipo de projeto.");
            return;
        }

        if (!mensagem) {
            showSystemMessage("error", "ERROR: Mensagem não pode estar vazia.");
            return;
        }

        /* ============================= */
        /* PROCESSING SIMULATION */
        /* ============================= */

        button.disabled = true;
        button.textContent = "PROCESSING...";

        showSystemMessage("processing", "TRANSMISSION INITIATED...");

        setTimeout(() => {

            // Aqui entraria integração real com backend ou EmailJS

            showSystemMessage("success", "SUCCESS: Mensagem enviada.");

            button.disabled = false;
            button.textContent = "ENVIAR TRANSMISSÃO";

            form.reset();

        }, 2000);

    });

});
