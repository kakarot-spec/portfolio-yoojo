document.addEventListener("DOMContentLoaded", () => {
  // Detailed dynamic project directory mock database
  const projects = [
    {
      num: "01",
      tag: "LIVE SERIES",
      title: "Nightbus Sessions",
      desc: "Stripped-back live takes recorded on a moving bus, one city at a time. No overdubs, no click track — just wheels on asphalt and a condenser mic.",
      gradient1: "url('images/project1-left.jpg')",
      gradient2: "url('images/project1-right.jpg'))",
    },
    {
      num: "02",
      tag: "DEBUT EP • 2023",
      title: "Static & Somewhere",
      desc: "A five-track debut recorded in a converted garage, built around a single busted cassette deck. The title track was written the night the tape machine finally gave out.",
      gradient1: "url('images/project2-left.jpg')",
      gradient2: "url('images/project2-right.jpg')",
    },
    {
      num: "03",
      tag: "MUSIC VIDEO",
      title: "Paper Weather",
      desc: "An impressionistic visual essay constructed from projection mappings and macro-lens film capture of dissolving structures under simulated weather.",
      gradient1: "url('images/project3-left.jpg')",
      gradient2: "url('images/project3-right.jpg')",
    },
    {
      num: "04",
      tag: "TOUR VISUALS",
      title: "Afterglow Tour",
      desc: "A dynamic media library crafted for high-luminescence projections and active scene switching to sync with audio transient-shapers.",
      gradient1: "url('images/project4-left.jpg')",
      gradient2: "url('images/project4-right.jpg')",
    },
    {
      num: "05",
      tag: "B-SIDES • 2022",
      title: "Lost Tapes",
      desc: "Unfinished, unfiltered arrangements rescued from archival hard drives, showcasing unpolished melodies and rough-cut voice memos.",
      gradient1: "url('images/project5-left.jpg')",
      gradient2: "url('images/project5-right.jpg')",
    },
    {
      num: "06",
      tag: "SOLO DEMOS",
      title: "Midnight Notes",
      desc: "Late-night compositions stripped of grand production styles, celebrating minimalism with only a solo piano and soft tape hiss.",
      gradient1: "linear-gradient(to left, #0e0e0e, #1c1c1c)",
      gradient2: "linear-gradient(to top, #080808, #181818)",
    },
  ];

  let activeIndex = 1; // Start at index 1 (Project '02' active by default)

  // Select DOM nodes
  const mainImg1 = document.getElementById("main-img-1");
  const mainImg2 = document.getElementById("main-img-2");
  const projectTag = document.getElementById("project-tag");
  const projectTitle = document.getElementById("project-title");
  const projectDesc = document.getElementById("project-desc");

  const headerCounter = document.getElementById("header-counter");
  const sidebarCounter = document.getElementById("sidebar-counter");

  const thumbCards = document.querySelectorAll(".thumb-card");
  const progressLines = document.querySelectorAll(".prog-line");

  // Apply subtle transitions up-front
  if (projectTag) projectTag.style.transition = "opacity 0.25s ease-in-out";
  if (projectTitle) projectTitle.style.transition = "opacity 0.25s ease-in-out";
  if (projectDesc) projectDesc.style.transition = "opacity 0.25s ease-in-out";

  // Function to render the active project on the dashboard page
  const updateDashboard = (index) => {
    const project = projects[index];
    if (!project) return;

    // 1. Update text fields with fade transition simulation
    if (projectTag) projectTag.style.opacity = 0;
    if (projectTitle) projectTitle.style.opacity = 0;
    if (projectDesc) projectDesc.style.opacity = 0;

    setTimeout(() => {
      if (projectTag) {
        projectTag.textContent = project.tag;
        projectTag.style.opacity = 1;
      }
      if (projectTitle) {
        projectTitle.textContent = project.title;
        projectTitle.style.opacity = 1;
      }
      if (projectDesc) {
        projectDesc.textContent = project.desc;
        projectDesc.style.opacity = 1;
      }
    }, 150);

    // 2. Change dynamic placeholder visual gradients
    if (mainImg1) mainImg1.style.backgroundImage = project.gradient1;
    if (mainImg2) mainImg2.style.backgroundImage = project.gradient2;

    // 3. Update top-right and sidebar navigation counters
    const formattedNum = `${project.num} / 06`;
    if (headerCounter) headerCounter.textContent = formattedNum;
    if (sidebarCounter) {
      sidebarCounter.innerHTML = `${project.num} <span>/ 06</span>`;
    }

    // 4. Highlight current active card in bottom thumbnail deck
    thumbCards.forEach((card) => card.classList.remove("active"));
    if (thumbCards[index]) thumbCards[index].classList.add("active");

    // 5. Update bottom slider tracking active layout line
    progressLines.forEach((line) => line.classList.remove("active"));
    if (progressLines[index]) progressLines[index].classList.add("active");
  };

  // Navigation trigger functions
  const nextProject = () => {
    activeIndex = (activeIndex + 1) % projects.length;
    updateDashboard(activeIndex);
  };

  const prevProject = () => {
    activeIndex = (activeIndex - 1 + projects.length) % projects.length;
    updateDashboard(activeIndex);
  };

  // --- BUTTON EVENT LISTENERS ---

  // Main Section right circular buttons
  const carouselNext = document.getElementById("carousel-next");
  const carouselPrev = document.getElementById("carousel-prev");

  if (carouselNext) carouselNext.addEventListener("click", nextProject);
  if (carouselPrev) carouselPrev.addEventListener("click", prevProject);

  // Sidebar small control buttons
  const nextProjectBtn = document.getElementById("next-project-btn");
  const prevProjectBtn = document.getElementById("prev-project-btn");

  if (nextProjectBtn) nextProjectBtn.addEventListener("click", nextProject);
  if (prevProjectBtn) prevProjectBtn.addEventListener("click", prevProject);

  // Dynamic direct thumbnail-click bindings
  thumbCards.forEach((card) => {
    card.addEventListener("click", () => {
      const index = parseInt(card.getAttribute("data-index"));
      if (!isNaN(index)) {
        activeIndex = index;
        updateDashboard(activeIndex);
      }
    });
  });

  // Run initialization
  updateDashboard(activeIndex);
});
