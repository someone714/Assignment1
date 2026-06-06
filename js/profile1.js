document.addEventListener('DOMContentLoaded', function () {
    // I M A G E    S L I D E R
    const slider = document.querySelector('.slider');
    const images = document.querySelectorAll('.slider img');
    const prevBtn = document.querySelector('#prevBtn');
    const nextBtn = document.querySelector('#nextBtn');

    let counter = 0;
    const stepSize = 300; // The width of one image

    nextBtn.addEventListener('click', () => {
        // Loop back to start if at the end
        if (counter >= images.length - 1) {
            counter = 0;
        } else {
            counter++;
        }
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        // Loop to end if at the start
        if (counter <= 0) {
            counter = images.length - 1;
        } else {
            counter--;
        }
        updateSlider();
    });

    function updateSlider() {
        slider.style.transform = `translateX(${-stepSize * counter}px)`;
    }

    //  S K I L L   S E C T I O N
    // Select all clickable skill list items
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
        item.addEventListener('click', function (event) {
            // Find the hidden details container inside this specific clicked item
            const details = this.querySelector('.skill-details');

            // Toggle the 'show' class
            if (details) {
                details.classList.toggle('show');
            }
        });
    });

    //  E D U C A T I O N   T A B L E

    const sortBtn = document.getElementById('sortYear');
    const tableBody = document.getElementById('tableBody');

    // Track the sorting state: true for Ascending, false for Descending
    let isAscending = true;

    sortBtn.addEventListener('click', function () {
        // 1. Convert HTML collection of rows into a real array so we can sort it
        const rowsArray = Array.from(tableBody.querySelectorAll('tr'));

        // 2. Perform the sort array function
        rowsArray.sort((rowA, rowB) => {
            // Get text from the first cell (index 0 is the Year column)
            const cellAText = rowA.cells[0].textContent.trim();
            const cellBText = rowB.cells[0].textContent.trim();

            // Extract the starting year integer (e.g., "2010" from "2010 - 2017")
            const yearA = parseInt(cellAText.split('-')[0]);
            const yearB = parseInt(cellBText.split('-')[0]);

            // Toggle logic between Ascending and Descending order
            if (isAscending) {
                return yearA - yearB;
            } else {
                return yearB - yearA;
            }
        });

        // 3. Clear the existing body entries and append sorted elements back
        tableBody.innerHTML = '';
        rowsArray.forEach(row => tableBody.appendChild(row));

        // 4. Flip the sorting state and update the button label interface
        if (isAscending) {
            isAscending = false;
        } else {
            isAscending = true;
        }
    });

    const toggleButtons = document.querySelectorAll('.toggle-hobby-btn');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Find the specific hobby text sibling right before this button
            const targetText = this.previousElementSibling;

            if (targetText && targetText.classList.contains('hobby-text')) {
                // Toggle the clamping class
                targetText.classList.toggle('clamped');

                // Switch the button label text interface safely
                if (targetText.classList.contains('clamped')) {
                    this.textContent = 'Read More';
                } else {
                    this.textContent = 'Read Less';
                }
            }
        });
    });

    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox-overlay';

    // Add inside HTML layout for close button and inner image container
    lightbox.innerHTML = `
        <button class="lightbox-close">&times;</button>
        <img class="lightbox-img" src="" alt="Lightbox Preview">
    `;

    // Append the created element to the bottom of the page body safely
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const triggers = document.querySelectorAll('.lightbox-trigger');

    // 2. Open Lightbox on trigger item click event
    triggers.forEach(img => {
        img.addEventListener('click', function () {
            const currentSrc = this.getAttribute('src');
            const currentAlt = this.getAttribute('alt');

            // Inject targeted img attributes into the lightbox preview node
            lightboxImg.setAttribute('src', currentSrc);
            lightboxImg.setAttribute('alt', currentAlt);

            // Trigger transition via classList
            lightbox.classList.add('active');
        });
    });

    // 3. Close Lightbox when clicking the close 'X' button
    closeBtn.addEventListener('click', closeLightbox);

    // 4. Close Lightbox when clicking anywhere on the dark background mask
    lightbox.addEventListener('click', function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    const scrollTopBtn = document.getElementById('scrollToTopBtn');

    // 1. Listen for scroll events on the window
    window.addEventListener('scroll', function () {
        // Get the current vertical scroll position
        // (accounts for different browser mechanisms via fallback)
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        // 2. Toggle the 'show' class based on the 200px benchmark
        if (scrollPosition > 200) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    // 3. Smooth scroll back to coordinates (0, 0) when clicked
    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' /* Dual protection for smooth motion navigation */
        });
    });

    const themeToggle = document.getElementById('themeToggle');

    // Check if the element exists on the current page to prevent console errors
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            // Toggle the dark-mode class on the <body> tag
            document.body.classList.toggle('dark-mode');

            // Check if dark mode is now active to update button label interface
            if (document.body.classList.contains('dark-mode')) {
                themeToggle.textContent = 'Light Mode';
            } else {
                themeToggle.textContent = 'Dark Mode';
            }
        });
    }
});