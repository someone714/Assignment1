/* Page initialize script */
document.addEventListener("DOMContentLoaded", () => {
    initThemeToggle();
    initLightbox();
    initScrollToTop();
    initSkillsAccordion();
    initTableSorter();
    initReadMoreEngine();
});

/* Light and dark mode button script */
function initThemeToggle() {
    const themeBtn = document.getElementById("themeToggle");
    if (!themeBtn) return;

    themeBtn.addEventListener("click", () => {
        const isDarkMode = document.body.classList.toggle("darkMode");
        if (isDarkMode == true) {
            themeBtn.textContent = "Light Mode";
        } else {
            themeBtn.textContent = "Dark Mode";
        }
    });
}

/* Image zoom pop up system */
function initLightbox() {
    const images = document.querySelectorAll(".lightboxTrigger, .hobbiesPics img");

    images.forEach(image => {
        image.addEventListener("click", () => {
            const overlay = document.createElement("div");
            overlay.classList.add("lightboxOverlay");

            const closeBtn = document.createElement("span");
            closeBtn.classList.add("lightboxClose");
            closeBtn.innerHTML = "&times;";

            const enlargedImg = document.createElement("img");
            enlargenedImg.classList.add("lightboxContent");
            enlargenedImg.src = image.src;
            enlargenedImg.alt = image.alt;

            overlay.appendChild(closeBtn);
            overlay.appendChild(enlargenedImg);
            document.body.appendChild(overlay);

            closeBtn.addEventListener("click", () => {
                overlay.remove();
            });
            
            overlay.addEventListener("click", (e) => {
                if (e.target == overlay) {
                    overlay.remove();
                }
            });
        });
    });
}

/* Back to top scroll button logic */
function initScrollToTop() {
    const topButton = document.getElementById("scrollTopBtn");
    if (!topButton) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 250) {
            topButton.style.display = "block";
        } else {
            topButton.style.display = "none";
        }
    });

    topButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* Collapsible list menu accordion */
function initSkillsAccordion() {
    const skillItems = document.querySelectorAll(".skillItem");

    skillItems.forEach(item => {
        item.addEventListener("click", () => {
            const detailView = item.querySelector(".skillDetails");
            if (detailView) {
                detailView.classList.toggle("show");
            }
        });
    });
}

/* Education row list chronological filter sorting */
function initTableSorter() {
    const sortBtn = document.getElementById("sortBtn");
    const table = document.getElementById("educationTable");
    if (!sortBtn || !table) return;

    let orderAscending = true;

    sortBtn.addEventListener("click", () => {
        const tbody = table.querySelector("tbody");
        const rowsArray = Array.from(tbody.querySelectorAll("tr"));

        rowsArray.sort((rowA, rowB) => {
            const valueA = parseInt(rowA.cells[2].textContent.trim(), 10);
            const valueB = parseInt(rowB.cells[2].textContent.trim(), 10);

            if (orderAscending == true) {
                return valueA - valueB;
            } else {
                return valueB - valueA;
            }
        });

        rowsArray.forEach(row => tbody.appendChild(row));
        orderAscending = !orderAscending;
        
        if (orderAscending == true) {
            sortBtn.textContent = "Sort by Year (Ascending)";
        } else {
            sortBtn.textContent = "Sort by Year (Descending)";
        }
    });
}

/* Paragraph text truncation expand feature */
function initReadMoreEngine() {
    const actionButtons = document.querySelectorAll(".btnReadMore");

    actionButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetText = button.previousElementSibling;

            if (targetText && targetText.classList.contains("hobbyText")) {
                const isClamped = targetText.classList.toggle("lineClamp");
                
                if (isClamped == true) {
                    button.textContent = "Read More";
                } else {
                    button.textContent = "Read Less";
                }
            }
        });
    });
}