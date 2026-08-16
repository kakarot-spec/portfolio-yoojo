document.addEventListener("DOMContentLoaded", () => {
  // --- 1. SECTIONS & SIDEBAR SCROLL TRACKING ---
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-item");
  const pageIndicatorNum = document.querySelector(".page-indicator");

  // Map section IDs to their corresponding 1-indexed string representation
  const sectionIndexMap = {
    home: "01",
    about: "02",
    gallery: "03", // This will capture #gallery
    contact: "04", // Set up to catch your contact footer/section if configured
  };

  // Update active nav state and sidebar number on scroll
  const handleScroll = () => {
    let currentSectionId = "home";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      // Checks if user has scrolled past halfway of the current section
      if (window.scrollY >= sectionTop - sectionHeight / 2.5) {
        const id = section.getAttribute("id");
        if (id) currentSectionId = id;
      }
    });

    // Update nav items active class
    navItems.forEach((item) => {
      item.classList.remove("active");
      // Check if href matches hash link (e.g. "gallery.html" vs "#gallery")
      const itemHref = item.getAttribute("href");
      if (
        itemHref === `${currentSectionId}.html` ||
        itemHref === `#${currentSectionId}`
      ) {
        item.classList.add("active");
      }
    });

    // Update sidebar progress number (e.g. "01 / 04")
    if (pageIndicatorNum && sectionIndexMap[currentSectionId]) {
      pageIndicatorNum.innerHTML = `${sectionIndexMap[currentSectionId]} <span>/ 04</span>`;
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Run once on startup to set active state

  // --- 2. SIDEBAR ARROW NAVIGATION ---
  const upBtn = document.querySelector(".arrow-btn:first-of-type");
  const downBtn = document.querySelector(".arrow-btn:last-of-type");

  const getOrderedSections = () => Array.from(sections);

  const scrollToAdjacentSection = (direction) => {
    const ordered = getOrderedSections();
    const currentScroll = window.scrollY;
    let targetSection = null;

    if (direction === "down") {
      // Find the first section that starts below current scroll point
      targetSection = ordered.find((sec) => sec.offsetTop > currentScroll + 50);
    } else if (direction === "up") {
      // Find the closest section above current scroll point
      const reversed = [...ordered].reverse();
      targetSection = reversed.find(
        (sec) => sec.offsetTop < currentScroll - 50,
      );
    }

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (upBtn && downBtn) {
    upBtn.addEventListener("click", () => scrollToAdjacentSection("up"));
    downBtn.addEventListener("click", () => scrollToAdjacentSection("down"));
  }

  // --- 3. UNIFIED SLIDESHOW / PROJECT CAROUSEL ---
  const projectPrevBtn = document.querySelector(
    ".slider-arrows-row .circ-arrow:first-child",
  );
  const projectNextBtn = document.querySelector(
    ".slider-arrows-row .circ-arrow:last-child",
  );
  const projectDots = document.querySelectorAll(".slider-dots .dot");
  const projectMedia = document.querySelector(
    ".project-video-container .rect-img",
  );
  const titleEl = document.querySelector(".project-info .serif-title");
  const descEl = document.querySelector(".project-info .body-text");

  let activeIndex = 0;
  const totalSlides = projectDots.length;

  // Project data (Images + Copy)
  const slidesData = [
    {
      title: "Nightbus<br />Sessions",
      desc: "Stripped-back live takes recorded on a moving bus, one city at a time. No overdubs, no click track — just wheels on asphalt and a condenser mic.",
      image: "images/project1.jpg", // Change to your actual file path/URLs
    },
    {
      title: "Starlight<br />Confessions",
      desc: "An ambient exploration of acoustic space. Soft synthesizers meeting raw tape recordings captured in abandoned chapels across Europe.",
      image: "images/project2.jpg",
    },
    {
      title: "Static &<br />Restless Noise",
      desc: "The upcoming full-length album's title sessions. Overdriven guitar loops melting into high-fidelity chamber orchestration.",
      image: "images/project3.jpg",
    },
  ];

  // Apply visual opacity transition rules to text once
  if (titleEl && descEl) {
    titleEl.style.transition = "opacity 0.25s ease-in-out";
    descEl.style.transition = "opacity 0.25s ease-in-out";
  }

  // Primary function to handle slide translation
  const updateProjectSlider = (index) => {
    activeIndex = index;

    // 1. Swap text content with a smooth transition fade
    if (titleEl && descEl && slidesData[activeIndex]) {
      titleEl.style.opacity = "0";
      descEl.style.opacity = "0";

      setTimeout(() => {
        titleEl.innerHTML = slidesData[activeIndex].title;
        descEl.textContent = slidesData[activeIndex].desc;
        titleEl.style.opacity = "1";
        descEl.style.opacity = "1";
      }, 150);
    }

    // 2. Update horizontal slide progress dots
    projectDots.forEach((dot, idx) => {
      if (idx === activeIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });

    // 3. Update image preview background
    if (projectMedia && slidesData[activeIndex]) {
      projectMedia.style.backgroundImage = `url('${slidesData[activeIndex].image}')`;
      projectMedia.style.backgroundSize = "cover";
      projectMedia.style.backgroundPosition = "center";
    }
  };

  // Bind Arrow Controls
  if (projectNextBtn) {
    projectNextBtn.addEventListener("click", () => {
      let nextIndex = (activeIndex + 1) % totalSlides;
      updateProjectSlider(nextIndex);
    });
  }

  if (projectPrevBtn) {
    projectPrevBtn.addEventListener("click", () => {
      let prevIndex = (activeIndex - 1 + totalSlides) % totalSlides;
      updateProjectSlider(prevIndex);
    });
  }

  // Bind dot indicator clicks
  projectDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      updateProjectSlider(index);
    });
  });
});
