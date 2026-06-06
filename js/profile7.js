document.addEventListener('DOMContentLoaded', () => {
    
    // 1. PARTICLE BACKGROUND ANIMATION
   
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 60;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.color = Math.random() > 0.5 ? '#d8e618' : '#4facfe';
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                    this.reset();
                }
            }
            draw() {
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        };
        animate();
    }

   
    // 2. TYPEWRITER EFFECT FOR SUBTITLE
    
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const text = "Web Developer & Computer Science Student";
        subtitle.textContent = '';
        let i = 0;
        const type = () => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        };
        setTimeout(type, 500);
    }

    
    // 3. SCROLL REVEAL ANIMATION
    
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    
    // 4. INTERACTIVE GLOW BUTTONS HOVER EFFECT
    
    const buttons = document.querySelectorAll('.glow-button');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            btn.style.setProperty('--x', `${x}px`);
            btn.style.setProperty('--y', `${y}px`);
        });
    });

    
    // 5. SKILLS EXPANDABLE DETAILS
    
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove existing detail if any
            let detail = this.nextElementSibling;
            if (detail && detail.classList.contains('skill-detail')) {
                detail.classList.toggle('show');
            } else {
                // Create and insert detail
                detail = document.createElement('div');
                detail.className = 'skill-detail';
                detail.textContent = this.getAttribute('data-details');
                this.parentNode.insertBefore(detail, this.nextSibling);
                setTimeout(() => detail.classList.add('show'), 10);
            }
        });
    });

    
    // 6. EDUCATION TABLE SORTING
    
    const sortBtn = document.getElementById('sort-table');
    const table = document.getElementById('education-table');
    let sortAscending = true;

    if (sortBtn && table) {
        sortBtn.addEventListener('click', () => {
            const rows = Array.from(table.querySelectorAll('tbody tr'));
            
            rows.sort((a, b) => {
                const durationA = a.cells[2].textContent.trim();
                const durationB = b.cells[2].textContent.trim();
                const yearA = durationA === 'To date' ? 9999 : parseInt(durationA.split('-')[0]);
                const yearB = durationB === 'To date' ? 9999 : parseInt(durationB.split('-')[0]);
                return sortAscending ? yearA - yearB : yearB - yearA;
            });

            const tbody = table.querySelector('tbody');
            rows.forEach(row => tbody.appendChild(row));
            
            sortAscending = !sortAscending;
            sortBtn.textContent = sortAscending ? 'Sort by Year ↕' : 'Sort by Year (Desc) ↕';
            sortBtn.style.animation = 'pulse 0.5s ease';
            setTimeout(() => sortBtn.style.animation = '', 500);
        });
    }


    // 7. HOBBIES READ MORE/LESS TOGGLE   

    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const description = this.parentElement.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            if (description && description.classList.contains('hobby-description')) {
                description.classList.toggle('show');
                this.textContent = isExpanded ? 'Read More' : 'Read Less';
                this.setAttribute('aria-expanded', !isExpanded);
            }
        });
    });

  
    // 8. IMAGE LIGHTBOX 

    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.querySelector('.lightbox-content');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');

    lightboxTriggers.forEach(img => {
        img.addEventListener('click', () => {
            lightboxContent.src = img.src;
            lightboxContent.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    
    // 9. SCROLL-TO-TOP BUTTON
   
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    
    // 10. DARK/LIGHT MODE TOGGLE
   
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark-mode';
    
    // Set initial theme
    document.body.classList.add(savedTheme);
    themeToggle.textContent = savedTheme === 'dark-mode' ? '🌙' : '☀️';

    themeToggle.addEventListener('click', () => {
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        if (isDarkMode) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
            themeToggle.textContent = '☀️';
        } else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            themeToggle.textContent = '🌙';
        }
    });
});
