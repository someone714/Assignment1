//linking all these with te additional shenanigans in my css!!
// Making each skill expand or collapse its details when clicked
document.querySelectorAll('.skill-item').forEach(function(item) {
    item.addEventListener('click', function() {
        var details = this.querySelector('.skill-details');
        details.classList.toggle('hidden');
    });
});

// Sorting the education table by Year column when button is clicked,SHENANIGANS.
var sortAscending = true;

document.getElementById('sort-btn').addEventListener('click', function() {
    var table = document.getElementById('edu-table');
    var rows = Array.from(table.querySelectorAll('tbody tr'));

    rows.sort(function(a, b) {
        var yearA = parseInt(a.cells[2].textContent.trim());
        var yearB = parseInt(b.cells[2].textContent.trim());
        return sortAscending ? yearA - yearB : yearB - yearA;
    });

    rows.forEach(function(row) {
        table.querySelector('tbody').appendChild(row);
    });

    sortAscending = !sortAscending;
    document.getElementById('sort-btn').textContent = sortAscending ? 'Sort by Year' : 'Sort by Year';
});

//hobbies!!!,,Toggle hobby descriptions ,collapsing and expanding..
document.querySelectorAll('.read-more-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var targetId = this.getAttribute('data-target');
       var hobbyText = document.getElementById(targetId);
        hobbyText.classList.toggle('expanded');
        this.textContent = hobbyText.classList.contains('expanded') ? 'Read Less' : 'Read More';
    });
});


//the image section....
// Opening lightbox when profile image is clicked
document.getElementById('profile-img').addEventListener('click', function() {
    document.getElementById('lightbox').classList.add('open');
});

// Closing lightbox when close button is clicked
document.getElementById('close-lightbox').addEventListener('click', function() {
    document.getElementById('lightbox').classList.remove('open');
});


//dark mode shenaniganssssss!!!,,,Switching between dark and light mode when button is clicked....

document.getElementById('dark-mode-btn').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    this.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
});


//scroll to top and all that,,,Showing scroll to top button after scrolling 200px🤷‍♀️🤷‍♀️

window.addEventListener('scroll', function() {
    var btn = document.getElementById('scroll-top-btn');
    if (window.scrollY > 200) {
        btn.style.display = 'block';
    } else {
        btn.style.display = 'none';
    }
});

// Smoothly scroll back to top when button is clicked
document.getElementById('scroll-top-btn').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


