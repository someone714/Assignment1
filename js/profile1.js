document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // 1. IMAGE SLIDER MODULE
    // ==========================================
    const slider = document.querySelector('.slider');
    const images = document.querySelectorAll('.slider img');
    const prevBtn = document.querySelector('#prevBtn');
    const nextBtn = document.querySelector('#nextBtn');

    let counter = 0;
    const stepSize = 300; 

    // Advance to the next image in sequence
    nextBtn.addEventListener('click', () => {
        if (counter >= images.length - 1) {
            counter = 0;  // Loop back to origin
        } else {
            counter++;
        }
        updateSlider();
    });

    // Go back to the previous image in sequence
    prevBtn.addEventListener('click', () => {
        if (counter <= 0) {
            counter = images.length - 1; // Loop back to final 
        } else {
            counter--;
        }
        updateSlider();
    });

    function updateSlider() {
        slider.style.transform = `translateX(${-stepSize * counter}px)`;
    }


    // ==========================================
    // 2. SKILLS COLLAPSIBLE TOGGLE MODULE
    // ==========================================
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
        item.addEventListener('click', function (event) {
           
            const details = this.querySelector('.skill-details');

            if (details) {
                details.classList.toggle('show');
            }
        });
    });


    // ==========================================
    // 3. ACADEMIC DATA TABLE SORTING MODULE
    // ==========================================
    const sortBtn = document.getElementById('sortYear');
    const tableBody = document.getElementById('tableBody');
    let isAscending = true; 

    if (sortBtn && tableBody) {
        sortBtn.addEventListener('click', function () {
            // Instantiate an iterable array 
            const rowsArray = Array.from(tableBody.querySelectorAll('tr'));

            // Comprative sorting 
            rowsArray.sort((rowA, rowB) => {
                const cellAText = rowA.cells[0].textContent.trim();
                const cellBText = rowB.cells[0].textContent.trim();

                
                const yearA = parseInt(cellAText.split('-')[0]);
                const yearB = parseInt(cellBText.split('-')[0]);

                return isAscending ? (yearA - yearB) : (yearB - yearA);
            });

            
            tableBody.innerHTML = '';
            rowsArray.forEach(row => tableBody.appendChild(row));

            isAscending = !isAscending;
        });
    }


    // ==========================================
    // 4. HOBBIES CLAMPABLE
    // ==========================================
    const toggleButtons = document.querySelectorAll('.toggle-hobby-btn');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
           
            const targetText = this.previousElementSibling;

            if (targetText && targetText.classList.contains('hobby-text')) {
                targetText.classList.toggle('clamped');

                
                if (targetText.classList.contains('clamped')) {
                    this.textContent = 'Read More';
                } else {
                    this.textContent = 'Read Less';
                }
            }
        });
    });


    // ==========================================
    // 5. IMAGE  LIGHTBOX OVERLAY 
    // ==========================================
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox-overlay';

    
    lightbox.innerHTML = `
        <button class="lightbox-close">&times;</button>
        <img class="lightbox-img" src="" alt="Lightbox Preview">
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const triggers = document.querySelectorAll('.lightbox-trigger');

    
    triggers.forEach(img => {
        img.addEventListener('click', function () {
            const currentSrc = this.getAttribute('src');
            const currentAlt = this.getAttribute('alt');

            lightboxImg.setAttribute('src', currentSrc);
            lightboxImg.setAttribute('alt', currentAlt);
            lightbox.classList.add('active');
        });
    });

    closeBtn.addEventListener('click', closeLightbox);

    
    lightbox.addEventListener('click', function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
    }


    // ==========================================
    // 6. SCROLL TO TOP 
    // ==========================================
    const scrollTopBtn = document.getElementById('scrollToTopBtn');

    if (scrollTopBtn) {
        window.addEventListener('scroll', function () {
            
            const scrollPosition = window.scrollY || document.documentElement.scrollTop;

            
            if (scrollPosition > 200) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        
        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    // ==========================================
    // 7. DARK / LIGHT ACCENT THEME CONFIGURATOR
    // ==========================================
    const themeToggle = document.getElementById('themeToggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            document.body.classList.toggle('dark-mode');

            if (document.body.classList.contains('dark-mode')) {
                themeToggle.textContent = 'Light Mode';
            } else {
                themeToggle.textContent = 'Dark Mode';
            }
        });
    }

});