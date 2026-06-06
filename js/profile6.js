
//  script-nancy.js  —  Nancy Solanus Nyimbi  |  Profile Portiforlio
// FEATURE 1 — SKILLS TOGGLE
// What it does: clicking a skill item shows or hides its details.

var skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(function(item) {
    item.addEventListener('click', function() {
        var details = this.querySelector('.skill-details');
        details.classList.toggle('hidden');
    });
});

// FEATURE 2 — EDUCATION TABLE SORT
// What it does: sorts the education table rows by the Year column.
// Each click toggles between ascending (old to new) and descending.
// Keep track of sort direction, start with ascending (oldest first)
var sortAscending = true;
var sortBtn = document.getElementById('sortBtn');
sortBtn.addEventListener('click', function() {
    var tbody = document.getElementById('eduBody');
    var rows = Array.from(tbody.querySelectorAll('tr'));
    rows.sort(function(rowA, rowB) {

        var yearA = parseInt(rowA.cells[2].textContent);
        var yearB = parseInt(rowB.cells[2].textContent);
        if (sortAscending) {
            return yearA - yearB;   // negative = A first
        } else {
            return yearB - yearA;   // negative = B first (reversed)
        }
    });

    // Put the sorted rows back into the <tbody>
    rows.forEach(function(row) {
        tbody.appendChild(row);  // appendChild moves the row, doesn't copy
    });

    sortAscending = !sortAscending;
    sortBtn.textContent = sortAscending ? 'Sort by Year ↕' : 'Sort by Year ↑';
});

// FEATURE 3 — HOBBIES READ MORE / READ LESS
// What it does: hobby descriptions are cut to 2 lines by CSS.
//               Clicking "Read More" expands them; clicking again
//               collapses them back.

var readMoreBtns = document.querySelectorAll('.read-more-btn');

readMoreBtns.forEach(function(btn) {

    btn.addEventListener('click', function() {

        var para = this.previousElementSibling;

        if (para.classList.contains('clamped')) {
            para.classList.remove('clamped');
            this.textContent = 'Read Less';   // update button label

        } else {

            para.classList.add('clamped');
            this.textContent = 'Read More';   // update button label
        }
    });
});

// FEATURE 4 — IMAGE LIGHTBOX
// What it does: clicking any image with class "lightbox-trigger"
//               opens it full-size in a dark overlay.
//               Clicking the ✕ button or the dark backdrop closes it.

var lightbox      = document.getElementById('lightbox');
var lightboxImg   = document.getElementById('lightboxImg');
var lightboxClose = document.getElementById('lightboxClose');
var triggers = document.querySelectorAll('.lightbox-trigger');

// Open lightbox when any trigger image is clicked
triggers.forEach(function(img) {

    img.addEventListener('click', function() {

        var src = this.getAttribute('data-full');
        lightboxImg.src = src;
        lightbox.style.display = 'flex';
    });
});

// Close lightbox when the ✕ button is clicked
lightboxClose.addEventListener('click', function() {
    lightbox.style.display = 'none';
    lightboxImg.src = '';   // clear the src to stop the image loading
});

// Also close lightbox when the user clicks the dark backdrop (not the image)
lightbox.addEventListener('click', function(event) {

    if (event.target === lightbox) {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
    }
});

// FEATURE 5 — SCROLL TO TOP BUTTON
// What it does: a ↑ button appears after the user scrolls 200px down.
//               Clicking it smoothly scrolls back to the very top.

// Get the scroll-to-top button element
var scrollTopBtn = document.getElementById('scrollTopBtn');

// This function runs every time the user scrolls
window.onscroll = function() {

    // window.scrollY is how many pixels the user has scrolled down
    if (window.scrollY > 200) {

        // Show the button — change display from 'none' to 'block'
        scrollTopBtn.style.display = 'block';

    } else {

        // Hide the button when user is near the top
        scrollTopBtn.style.display = 'none';
    }
};

// Smoothly scroll to the very top when the button is clicked
scrollTopBtn.addEventListener('click', function() {

    window.scrollTo({
        top: 0,            // go to pixel 0 (the very top)
        behavior: 'smooth' // animate the scroll instead of jumping
    });
});


// FEATURE 6 — DARK / LIGHT MODE TOGGLE
// What it does: clicking the button adds or removes the class
//               "dark-mode" on the <body> element.
//               Our CSS file already has all the dark-mode colours
//               defined under body.dark-mode

// Get the theme toggle button
var themeToggle = document.getElementById('themeToggle');

// Toggle dark mode on button click
themeToggle.addEventListener('click', function() {

    // Toggle the 'dark-mode' class on <body>
    document.body.classList.toggle('dark-mode');

    // Check if dark mode is now ON or OFF and update button label
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️ Light Mode';
    } else {
        themeToggle.textContent = '🌙 Dark Mode';
    }
});
