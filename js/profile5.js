// 1. Skills section - click on a skill to see more details
document.querySelectorAll('.skill-item').forEach(function(item) {
    item.addEventListener('click', function() {
        var details = this.querySelector('.skills-details');
        if (details) {
            details.classList.toggle('hidden');
        }
    });
});

// 2. Sort table - sorts my education table by year
var ascending = true;
var table = document.querySelector('table');
var sortBtn = document.createElement('button');
sortBtn.textContent = 'Sort by Year ▲';

if (table) {
    table.parentElement.insertBefore(sortBtn, table);

    sortBtn.addEventListener('click', function() {
        var rows = Array.from(table.querySelectorAll('tr')).slice(2);

        rows.sort(function(a, b) {
            var yearA = parseInt(a.cells[2].textContent.trim()) || 0;
            var yearB = parseInt(b.cells[2].textContent.trim())|| 0;

            if (ascending) {
                return yearA - yearB;
            } else {
                return yearB - yearA;
            }
        });

        rows.forEach(function(row) {
            table.appendChild(row);
        });

        ascending = !ascending;

        if (ascending) {
            sortBtn.textContent = 'Sort by Year ▲';
        } else {
            sortBtn.textContent = 'Sort by Year ▼';
        }
    });
}

// 3. Lightbox - when i click an image it opens big on the screen
var overlay = document.createElement('div');
overlay.id = 'lightbox-overlay';
var lightboxImg = document.createElement('img');
lightboxImg.id = 'lightbox-img';
var closeBtn = document.createElement('button');
closeBtn.id = 'lightbox-close';
closeBtn.textContent = 'X Close';

// close the overlay when x button is clicked
closeBtn.addEventListener('click', function() {
    overlay.style.display = 'none';
});
// close the overlay when clicking outside the image
overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
        overlay.style.display = 'none';
    }
});
overlay.appendChild(lightboxImg);
overlay.appendChild(closeBtn);
document.body.appendChild(overlay);

// open the lightbox when any image is clicked
document.querySelectorAll('img').forEach(function(img) {
    img.addEventListener('click', function() {
        lightboxImg.src = this.src;
        overlay.style.display = 'flex';
    });
});

// 4. Scroll to top button - shows up when i scroll down
var scrollBtn = document.createElement('button');
scrollBtn.id = 'scroll-top-btn';
scrollBtn.textContent = '↑ Navigate to Top';

// scroll back to the top when button is clicked
scrollBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// show the button only after scrolling down 200px
window.addEventListener('scroll', function() {
    if (window.scrollY > 200) {
        scrollBtn.style.display = 'block';
    } else {
        scrollBtn.style.display = 'none';
    }
});

document.body.appendChild(scrollBtn);

// 5. Change theme button - switches between dark and light background
var darkBtn = document.createElement('button');
darkBtn.id = 'dark-mode-btn';
darkBtn.textContent = '🌙 Change Theme';

darkBtn.addEventListener('click', function() {
    if (document.body.style.background == 'rgb(34, 34, 34)') {
        // switch back to light mode
        document.body.style.background = 'linear-gradient(145deg, #d6e8f7 0%, #cce8e0 50%, #e8e5c3 100%)';
        document.body.style.color = '';
        // change headings back to normal color
        document.querySelectorAll('h1, h2, h3, h4, span').forEach(function(h) {
            h.style.color = '';
        });
    } else {
        // switch to dark mode
        document.body.style.background = '#222';
        document.body.style.color = '#fff';
        // make headings white so they are visible
        document.querySelectorAll('h1, h2, h3, h4, span').forEach(function(h) {
            h.style.color = '#fff';
        });
    }
});

document.body.appendChild(darkBtn);

// 6. Read more and read less buttons for my hobbies section
var hobbycards = document.querySelectorAll('.hobby-card');

for (var i = 0; i < hobbycards.length; i++) {
    var p = hobbycards[i].querySelector('p');
    p.setAttribute('data-full', p.textContent);
    p.textContent = p.textContent.substring(0, 60) + '...';

    var btn = document.createElement('button');
    btn.textContent = 'Read More';
    btn.className = 'read-btn';

    hobbycards[i].appendChild(btn);

    // show full text or short text when button is clicked
    btn.addEventListener('click', function() {
        var card = this.parentElement;
        var para = card.querySelector('p');
        var fulltext = para.getAttribute('data-full');
        var shorttext = fulltext.substring(0, 60) + '...';

        if (this.textContent == 'Read More') {
            para.textContent = fulltext;
            this.textContent = 'Read Less';
        } else {
            para.textContent = shorttext;
            this.textContent = 'Read More';
        }
    });
}
// WELCOME POPUP MESSAGE
var blurLayer = document.createElement('div');
blurLayer.id = 'blur-layer';

var popup = document.createElement('div');
popup.id = 'welcome-popup';
popup.innerHTML = `
    <h2>Welcome to my Portfolio! 🍀 </h2>
    <p>Hellow!, I am Jackline. Dive into my projects!</p>
    <button class="glow-btn">Lets Go!</button>
    `;
document.body.appendChild(blurLayer);
document.body.appendChild(popup);
function closePopup() {
    blurLayer.remove();
    popup.remove();
}
popup.querySelector('button').addEventListener('click', closePopup);
blurLayer.addEventListener('click', closePopup);
setTimeout(closePopup, 8000);
