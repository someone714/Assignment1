
document.addEventListener("DOMContentLoaded", () => {
  
  // 1. SKILLS SECTION: Expandable Hidden Details
  
  // Fetch all headers inside the skills grid cards
  const skillHeaders = document.querySelectorAll("#skills .card-header");
  
  skillHeaders.forEach(header => {
    header.addEventListener("click", () => {
      // Traverse the DOM to find the direct sibling element holding skill descriptions
      const details = header.nextElementSibling;
      
      // If the sibling element exists and contains the details wrapper class, toggle visibility
      if (details && details.classList.contains("details")) {
        details.classList.toggle("show");
      }
    });
  });

  // 2. EDUCATION TABLE: Sort Rows Dynamically by Year
  
  const table = document.querySelector(".edu-table");
  
  if (table) {
    // Isolate rows by checking structural boundaries
    const headerRow = table.querySelector("tr:first-child");
    const yearHeader = headerRow ? headerRow.querySelector("th:last-child") : null;
    
    if (yearHeader) {
      // Modify layout indicators to inform the user the header is interactive
      yearHeader.style.cursor = "pointer";
      yearHeader.innerHTML = 'YEAR <button id="sortYearBtn" style="background:none; border:none; cursor:pointer; margin-left:5px;">↕</button>';
      
      const sortBtn = document.getElementById("sortYearBtn");
      let ascending = true; // State tracker for toggle direction

      // Array sorting mechanism
      const sortTable = (e) => {
        // Halt event bubbling propagation loops between button and header container
        if (e) e.stopPropagation();
        
        const tbody = table.querySelector("tbody") || table;
        const rows = Array.from(tbody.querySelectorAll("tr"));

        // Evaluate chronological strings into base numbers for mechanical comparison
        rows.sort((rowA, rowB) => {
          const yearA = parseInt(rowA.querySelector("td:last-child").textContent.trim()) || 0;
          const yearB = parseInt(rowB.querySelector("td:last-child").textContent.trim()) || 0;

          return ascending ? yearA - yearB : yearB - yearA;
        });

        // Update structural layout UI directional arrow indicator labels
        if (sortBtn) {
          sortBtn.textContent = ascending ? "↑" : "↓";
        }
        ascending = !ascending; // Reverse sorting state indicator

        // Re-append DOM fragments inside the live table layout container
        rows.forEach(row => tbody.appendChild(row));
      };

      // Register matching double click pathways for seamless execution
      yearHeader.addEventListener("click", sortTable);
      if (sortBtn) sortBtn.addEventListener("click", sortTable);
    }
  }

  // 3. HOBBIES SECTION: Read More / Less Toggle

  // Query lookups targeting all trigger tags in the Hobbies container section
  const moreBtns = document.querySelectorAll("#hobbies .more");
  
  moreBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();   // Suppress any default text layout selections
      e.stopPropagation();  // Stop bubbling events to peripheral elements
      
      // Look upward to find the closest overarching layout card wrapper
      const parentCard = btn.closest(".card");
      
      if (parentCard) {
        // Query lookups targeting the sibling paragraph structure
        const descriptionParagraph = parentCard.querySelector(".hobby-description");
        
        if (descriptionParagraph) {
          // Toggle the CSS expansion limit rule profile class
          descriptionParagraph.classList.toggle("expanded");
          
          // Dynamically swap display frame text labels based on active runtime values
          if (descriptionParagraph.classList.contains("expanded")) {
            btn.textContent = "Read Less";
          } else {
            btn.textContent = "Read More";
          }
        }
      }
    });
  });

  // 4. IMAGE SECTION: Lightbox Modal Overlay Viewports

  const profileImg = document.getElementById("profilePic");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImage");

  if (profileImg && lightbox && lightboxImg) {
    const parentAnchor = profileImg.closest("a");
    
    if (parentAnchor) {
      // Intercept profile picture interaction path
      parentAnchor.addEventListener("click", (e) => {
        e.preventDefault(); // Halt standard hypermedia email client execution redirections
        
        // Map asset source routes directly into the modal container layout
        lightboxImg.src = profileImg.src;
        lightboxImg.alt = profileImg.alt;
        lightbox.classList.add("show"); // Inject active visualization property
      });
    }
  }

  // Close lightbox modal overlay window triggers
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      // Deconstruct backdrop overlay clicks and clear out layout state
      if (e.target === lightbox || e.target.classList.contains("close")) {
        lightbox.classList.remove("show");
      }
    });
  }

  // 5. NAVIGATION: Dynamic Scroll-To-Top Control Elements

  const scrollTopBtn = document.getElementById("scrollTop");

  if (scrollTopBtn) {
    // Monitor screen viewport delta positioning offsets
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        scrollTopBtn.style.display = "block"; // Surface control button layout elements
      } else {
        scrollTopBtn.style.display = "none";  // Cache control element visibility properties
      }
    });

    // Handle viewport target tracking executions
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth" // Enable smooth linear transform transition rendering profiles
      });
    });
  }

  // 6. DARK/LIGHT THEME ARCHITECTURE STATE CONTROLS

  const toggleThemeBtn = document.getElementById("toggleTheme");
  
  if (toggleThemeBtn) {
    // Check Client Storage registries to pull layout states across sessions
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
    }

    // Toggle runtime configurations
    toggleThemeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      
      // Write application preference metrics into local storage registers
      if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  }
});