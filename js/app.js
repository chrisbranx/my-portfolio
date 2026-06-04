/*
  * ==========================================================================
  PORTFOLIO CORE ENGINE(js / app.js)
    ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // --- Global State ---
  let currentLang = localStorage.getItem("portfolio-lang") || "en";
  let activeTheme = localStorage.getItem("portfolio-theme") || "dark";
  let isMusicPlaying = false;
  let synthInterval = null;
  let audioCtx = null;

  // --- Element Selectors ---
  const loader = document.getElementById("loading-screen");
  const loaderBar = document.getElementById("loader-progress");
  const cursor = document.getElementById("cursor");
  const cursorDot = document.getElementById("cursor-dot");
  const canvas = document.getElementById("particles-bg");
  const scrollBar = document.getElementById("scroll-bar");
  const langToggleBtn = document.getElementById("lang-toggle");
  const themeToggleBtn = document.getElementById("theme-toggle");
  const sunIcon = document.querySelector(".sun-icon");
  const moonIcon = document.querySelector(".moon-icon");
  const ambientToggleBtn = document.getElementById("ambient-toggle");
  const musicBtnText = document.getElementById("music-btn-text");

  // Modals
  const projectModal = document.getElementById("project-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");

  // --- 1. Loader Screen Simulation ---
  let progress = 0;
  const loadDuration = 800; // ms
  const intervalTime = 20;
  const increment = (100 / (loadDuration / intervalTime));

  const loadTimer = setInterval(() => {
    progress += increment;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadTimer);
      setTimeout(() => {
        loader.style.opacity = 0;
        loader.style.visibility = "hidden";
        initTypewriter();
      }, 200);
    }
    loaderBar.style.width = `${progress}%`;
  }, intervalTime);

  // --- 2. Custom Hover Cursor Tracker ---
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
    const spotlight = document.getElementById("spotlight");
    if (spotlight) {
      spotlight.style.setProperty("--x", `${mouseX}px`);
      spotlight.style.setProperty("--y", `${mouseY}px`);
    }
  });

  function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    cursorX += dx * 0.15;
    cursorY += dy * 0.15;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  function updateHoverTargets() {
    const hoverables = document.querySelectorAll("a, button, input, textarea, .hover-target, .tab-btn, .project-card, .chip-btn");
    hoverables.forEach(item => {
      item.addEventListener("mouseenter", () => cursor.classList.add("hover"));
      item.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
    });
  }
  updateHoverTargets();

  // --- 3. Interactive Particles Canvas Background ---
  const ctx = canvas.getContext("2d");
  let particlesArray = [];
  const isLight = activeTheme === "light";
  const baseCount = window.innerWidth < 768 ? 35 : 85;
  const particleCount = isLight ? Math.floor(baseCount * 0.4) : baseCount;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  const mouseInteraction = {
    x: null,
    y: null,
    radius: 120
  };

  window.addEventListener("mousemove", (e) => {
    mouseInteraction.x = e.clientX;
    mouseInteraction.y = e.clientY;
  });

  window.addEventListener("mouseleave", () => {
    mouseInteraction.x = null;
    mouseInteraction.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Wrap around bounds
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;

      // Mouse influence
      if (mouseInteraction.x !== null && mouseInteraction.y !== null) {
        let dx = this.x - mouseInteraction.x;
        let dy = this.y - mouseInteraction.y;
        let dist = Math.hypot(dx, dy);
        if (dist < mouseInteraction.radius) {
          const force = (mouseInteraction.radius - dist) / mouseInteraction.radius;
          this.x += (dx / dist) * force * 2;
          this.y += (dy / dist) * force * 2;
        }
      }
    }

    draw() {
      ctx.fillStyle = activeTheme === "dark"
        ? `rgba(var(--accent-rgb), ${this.size > 2 ? 0.35 : 0.15})`
        : `rgba(var(--accent-rgb), ${this.size > 2 ? 0.12 : 0.04})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    particlesArray = [];
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle());
    }
  }
  initParticles();

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Connect particles
    for (let a = 0; a < particlesArray.length; a++) {
      particlesArray[a].update();
      particlesArray[a].draw();
      for (let b = a; b < particlesArray.length; b++) {
        let dx = particlesArray[a].x - particlesArray[b].x;
        let dy = particlesArray[a].y - particlesArray[b].y;
        let dist = Math.hypot(dx, dy);
        if (dist < 100) {
          ctx.strokeStyle = activeTheme === "dark"
            ? `rgba(var(--accent-rgb), ${0.1 * (1 - dist / 100)})`
            : `rgba(var(--accent-rgb), ${0.06 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // --- 4. Light/Dark Mode Toggle ---
  function applyTheme() {
    document.body.setAttribute("data-theme", activeTheme);
    localStorage.setItem("portfolio-theme", activeTheme);
    if (activeTheme === "dark") {
      sunIcon.style.display = "none";
      moonIcon.style.display = "block";
    } else {
      sunIcon.style.display = "block";
      moonIcon.style.display = "none";
    }
  }

  themeToggleBtn.addEventListener("click", () => {
    activeTheme = activeTheme === "dark" ? "light" : "dark";
    applyTheme();
    triggerClickLog(0, 0); // For analytics
  });

  // Apply initial values
  applyTheme();

  // --- 5. Interactive Scroll reveal & Progress Tracker ---
  window.addEventListener("scroll", () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollBar.style.width = `${scrolled}%`;

    // Navigation active link highlights
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-link-item");
    let currentActive = "";

    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (winScroll >= top) {
        currentActive = sec.getAttribute("id");
      }
    });

    navItems.forEach(item => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${currentActive}`) {
        item.classList.add("active");
      }
    });
  });

  // Scroll into view animation loader
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");

        // Trigger skill bars animation if target is skills
        if (entry.target.id === "skills") {
          animateSkillBars();
        }

        // Trigger stat counter animation if target is stats-strip
        if (entry.target.id === "stats-strip") {
          animateCounters();
        }

        // Trigger code snippet reveal animation
        if (entry.target.id === "snippets") {
          animateSnippetCards();
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));

  function animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-bar");
    skillBars.forEach(bar => {
      const targetWidth = bar.getAttribute("data-width");
      bar.style.width = `${targetWidth}%`;
    });
  }

  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    const counters = document.querySelectorAll(".stat-counter-num");
    if (!counters.length) return;

    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute("data-target"), 10);
      if (isNaN(target) || target <= 0) return;

      counter.textContent = "0";
      let current = 0;
      const duration = 1800;
      const stepTime = 40;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, stepTime);
    });
  }

  function animateSnippetCards() {
    const cards = document.querySelectorAll(".snippet-card");
    cards.forEach((card, i) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      setTimeout(() => {
        card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, i * 120);
    });
  }

  // --- 6. Typewriter Effect (stable, no-disappear version) ---
  let typewriterIdx = 0;
  let wordIdx = 0;
  let isDeleting = false;
  let typewriterTimer = null;

  function initTypewriter() {
    const typewriterEl = document.getElementById("typewriter-roles");
    if (!typewriterEl) return;

    const words = portfolioData[currentLang].titles;
    const currentWord = words[wordIdx];

    if (isDeleting) {
      // Keep at least 1 character to avoid blank flash
      const newLen = Math.max(1, typewriterIdx - 1);
      typewriterEl.textContent = currentWord.substring(0, newLen);
      typewriterIdx = newLen;
    } else {
      typewriterEl.textContent = currentWord.substring(0, typewriterIdx + 1);
      typewriterIdx++;
    }

    let typeSpeed = isDeleting ? 45 : 85;

    if (!isDeleting && typewriterIdx === currentWord.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && typewriterIdx <= 1) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      // Set next word first char immediately before pause so it's never blank
      typewriterEl.textContent = words[wordIdx].substring(0, 1);
      typewriterIdx = 1;
      typeSpeed = 400;
    }

    typewriterTimer = setTimeout(initTypewriter, typeSpeed);
  }

  // --- 7. Synthesized Ambient Lo-fi Music (Web Audio API) ---
  // Create beautiful, non-obtrusive modular lo-fi backing track
  function playAmbientMusic() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    // Lofi progression chords: Cmaj7 - Am7 - Fmaj7 - G7
    const chords = [
      [130.81, 164.81, 196.00, 246.94], // Cmaj7 (C3, E3, G3, B3)
      [110.00, 130.81, 164.81, 196.00], // Am7 (A2, C3, E3, G3)
      [87.31, 130.81, 174.61, 220.00], // Fmaj7 (F2, C3, F3, A3)
      [98.00, 146.83, 196.00, 246.94]  // G7 (G2, D3, G3, B3)
    ];

    let chordIndex = 0;

    function playChord(frequencies, duration) {
      const now = audioCtx.currentTime;

      // Deep Sub Bass
      const bassOsc = audioCtx.createOscillator();
      const bassGain = audioCtx.createGain();
      bassOsc.type = "sine";
      bassOsc.frequency.setValueAtTime(frequencies[0] * 0.5, now); // Octave down
      bassGain.gain.setValueAtTime(0, now);
      bassGain.gain.linearRampToValueAtTime(0.08, now + 0.5);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + duration - 0.1);

      bassOsc.connect(bassGain);
      bassGain.connect(audioCtx.destination);
      bassOsc.start(now);
      bassOsc.stop(now + duration);

      // Sweet EP chords with soft triangle wave and low pass filter
      const filter = audioCtx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(450, now);
      filter.connect(audioCtx.destination);

      frequencies.forEach(freq => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now);

        // Soft volume envelope
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.03, now + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration - 0.2);

        osc.connect(gain);
        gain.connect(filter);
        osc.start(now);
        osc.stop(now + duration);
      });

      // Synthesize soft random vinyl crackle popping sound
      for (let i = 0; i < 5; i++) {
        const crackleTime = now + Math.random() * duration;
        const crackleOsc = audioCtx.createOscillator();
        const crackleGain = audioCtx.createGain();
        crackleOsc.type = "sawtooth";
        crackleOsc.frequency.setValueAtTime(12000, crackleTime);

        crackleGain.gain.setValueAtTime(0, crackleTime);
        crackleGain.gain.linearRampToValueAtTime(0.001, crackleTime + 0.001);
        crackleGain.gain.exponentialRampToValueAtTime(0.00001, crackleTime + 0.01);

        crackleOsc.connect(crackleGain);
        crackleGain.connect(audioCtx.destination);
        crackleOsc.start(crackleTime);
        crackleOsc.stop(crackleTime + 0.02);
      }
    }

    // Play initial chord
    playChord(chords[chordIndex], 4.8);

    // Cycle chord loop
    synthInterval = setInterval(() => {
      chordIndex = (chordIndex + 1) % chords.length;
      playChord(chords[chordIndex], 4.8);
    }, 5000);
  }

  function stopAmbientMusic() {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
  }

  ambientToggleBtn.addEventListener("click", () => {
    isMusicPlaying = !isMusicPlaying;
    if (isMusicPlaying) {
      playAmbientMusic();
      musicBtnText.textContent = textTranslations[currentLang].musicOn;
      ambientToggleBtn.classList.add("active");
    } else {
      stopAmbientMusic();
      musicBtnText.textContent = textTranslations[currentLang].musicOff;
      ambientToggleBtn.classList.remove("active");
    }
  });

  // --- 8. Multi-Language Translation Rendering ---
  function calculateDuration(startDateStr, endDateStr) {
    const start = new Date(startDateStr);
    const end = endDateStr === "Present" ? new Date() : new Date(endDateStr);

    const diffTime = Math.abs(end - start);
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.4));

    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;

    let res = "";
    if (currentLang === "en") {
      if (years > 0) res += `${years} year${years > 1 ? 's' : ''} `;
      if (months > 0) res += `${months} month${months > 1 ? 's' : ''}`;
    } else {
      if (years > 0) res += `${years} an${years > 1 ? 's' : ''} `;
      if (months > 0) res += `${months} mois`;
    }
    return res.trim();
  }

  function renderDynamicCV() {
    const data = portfolioData[currentLang];

    // 1. Availability badge & Bio
    document.getElementById("availability-status").textContent = data.availability;
    document.getElementById("hero-name-heading").innerHTML = `Hi, I'm <span>${data.name}</span>`;
    document.getElementById("hero-bio-desc").textContent = data.about;
    document.getElementById("about-bio-detail").textContent = data.about;

    // Reset typewriter text - start with first character of first word
    const typewriterEl = document.getElementById("typewriter-roles");
    if (typewriterEl) {
      const words = data.titles;
      typewriterEl.textContent = words[0] ? words[0].substring(0, 1) : "";
    }
    typewriterIdx = 1;
    wordIdx = 0;
    isDeleting = false;
    if (typewriterTimer) clearTimeout(typewriterTimer);
    initTypewriter();

    // 2. Projects Render
    renderProjects("all");

    // 3. Skills Render
    const skillsContainer = document.getElementById("skills-container");
    skillsContainer.innerHTML = "";

    for (const [groupName, skillList] of Object.entries(data.skills)) {
      const card = document.createElement("div");
      card.className = "glass-card skill-group-card";

      const title = document.createElement("h3");
      title.className = "skill-group-title";

      // Inline SVGs for group icons
      let svgIcon = `<svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"/></svg>`;
      if (groupName === "infrastructure") {
        svgIcon = `<svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M1 1.5A1.5 1.5 0 0 1 2.5 0h11A1.5 1.5 0 0 1 15 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 14.5zM2.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5z"/><path d="M4 10a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg>`;
      } else if (groupName === "soft") {
        svgIcon = `<svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/></svg>`;
      }

      const groupLangLabel = {
        languages: currentLang === "en" ? "Languages" : "Langages",
        frameworks: currentLang === "en" ? "Frameworks & Libs" : "Frameworks & Libs",
        infrastructure: currentLang === "en" ? "SysAdmin & DevOps" : "SysAdmin & DevOps",
        soft: currentLang === "en" ? "Methodology" : "Méthodologie"
      };

      title.innerHTML = `${svgIcon} ${groupLangLabel[groupName] || groupName}`;
      card.appendChild(title);

      const itemsWrapper = document.createElement("div");
      itemsWrapper.className = "skill-items";

      skillList.forEach(skill => {
        const item = document.createElement("div");
        item.className = "skill-item";
        item.innerHTML = `
          <div class="skill-info">
            <span>${skill.name}</span>
            <span class="skill-proficiency">${skill.level}</span>
          </div>
          <div class="skill-bar-container">
            <div class="skill-bar" data-width="${skill.percent}"></div>
          </div>
        `;
        itemsWrapper.appendChild(item);
      });

      card.appendChild(itemsWrapper);
      skillsContainer.appendChild(card);
    }

    // 4. Certifications Render
    const certsContainer = document.getElementById("certs-container");
    certsContainer.innerHTML = "";
    data.certifications.forEach(cert => {
      const card = document.createElement("div");
      card.className = "glass-card cert-card";
      card.innerHTML = `
        <div class="cert-icon-wrapper">
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5"/>
          </svg>
        </div>
        <div class="cert-info">
          <h4>${cert.name}</h4>
          <p>${cert.issuer} &bull; ${cert.date}</p>
        </div>
      `;
      certsContainer.appendChild(card);
    });

    // 5. Timeline / Experience Render
    const timelineContainer = document.getElementById("timeline-container");
    timelineContainer.innerHTML = "";
    data.experience.forEach(exp => {
      const durationFormatted = calculateDuration(exp.startDate, exp.endDate);
      const timelineItem = document.createElement("div");
      timelineItem.className = "timeline-item";

      const achievementsLi = exp.achievements.map(ach => `<li>${ach}</li>`).join("");

      timelineItem.innerHTML = `
        <div class="glass-card timeline-content-card hover-target">
          <div class="timeline-header">
            <div>
              <h3 class="role-title">${exp.role}</h3>
              <span class="company-name">${exp.company}</span>
            </div>
            <div class="duration-info">
              <span>${exp.period}</span>
              <span class="duration-calc">&bull; ${durationFormatted}</span>
            </div>
          </div>
          <ul class="achievement-list">
            ${achievementsLi}
          </ul>
        </div>
      `;
      timelineContainer.appendChild(timelineItem);
    });

    // 6. Testimonials Render — Book Carousel
    const allTestimonials = [...data.testimonials, ...getApprovedReviews()];
    window._testimonialsData = allTestimonials;
    renderTestimonialPage(0);

    // Run custom cursor bindings and reveal observers
    updateHoverTargets();
    initTilt();
  }

  function renderProjects(filter = "all") {
    const projectsContainer = document.getElementById("projects-container");
    projectsContainer.innerHTML = "";
    const data = portfolioData[currentLang];

    const filteredProjects = filter === "all"
      ? data.projects
      : data.projects.filter(p => p.category === filter);

    filteredProjects.forEach(proj => {
      const card = document.createElement("div");
      card.className = "glass-card project-card hover-target";
      card.setAttribute("data-id", proj.id);

      const badgeClass = proj.badge === "Featured" || proj.badge === "Vedette" ? "badge-featured" : "badge-new";
      const techBadgesHtml = proj.stack.map(s => `<span class="tech-badge">${s}</span>`).join("");

      card.innerHTML = `
        <div class="project-header">
          <span class="project-badge ${badgeClass}">${proj.badge}</span>
          <div class="project-git-stats">
            <div class="stat-item" title="GitHub Stars">
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
              </svg>
              <span>${proj.stats.stars}</span>
            </div>
            <div class="stat-item" title="Forks">
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zM1.5 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m0 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
              </svg>
              <span>${proj.stats.forks}</span>
            </div>
          </div>
        </div>
        
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-desc">${proj.desc}</p>
        
        <div class="tech-badges">
          ${techBadgesHtml}
        </div>

        <div class="project-links">
          <button class="chat-inline-btn project-modal-open-btn" style="border-color:var(--border-color); background:transparent; color:var(--text-secondary);" data-id="${proj.id}">
            Learn More
          </button>
          <a href="https://${proj.github}" target="_blank" rel="noopener" class="chat-inline-btn" style="border:none;">
            GitHub
          </a>
        </div>
      `;

      // Bind modal triggers
      card.querySelector(".project-modal-open-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        openProjectModal(proj.id);
      });
      card.addEventListener("click", () => {
        openProjectModal(proj.id);
      });

      projectsContainer.appendChild(card);
    });

    updateHoverTargets();
    initTilt();
  }

  function translateStaticLayout() {
    const trans = textTranslations[currentLang];

    // Menu
    document.getElementById("nav-about-text").textContent = trans.navAbout;
    document.getElementById("nav-projects-text").textContent = trans.navProjects;
    document.getElementById("nav-skills-text").textContent = trans.navSkills;
    document.getElementById("nav-experience-text").textContent = trans.navExperience;
    document.getElementById("nav-contact-text").textContent = trans.navContact;
    document.getElementById("nav-admin-text").textContent = trans.navAdmin;

    // Hero
    document.getElementById("hero-subtitle-tag").textContent = trans.subtitle;
    document.getElementById("hero-cta-hire").textContent = trans.hireMe;
    document.getElementById("hero-cta-projects").textContent = trans.viewProjects;

    // General Titles
    document.getElementById("about-section-heading").textContent = trans.aboutTitle;
    document.getElementById("projects-section-heading").textContent = trans.projectsTitle;
    document.getElementById("skills-section-heading").textContent = trans.skillsTitle;
    document.getElementById("certs-subheading").textContent = currentLang === "en" ? "Certifications & Credentials" : "Certifications & Diplômes";
    document.getElementById("experience-section-heading").textContent = trans.experienceTitle;
    const testimonialsHeading = document.getElementById("testimonials-section-heading");
    if (testimonialsHeading) testimonialsHeading.textContent = currentLang === "en" ? "Testimonials" : "Témoignages";
    document.getElementById("contact-section-heading").textContent = trans.contactTitle;

    // Project filters
    document.getElementById("tab-all-text").textContent = trans.all;
    document.getElementById("tab-web-text").textContent = trans.web;
    const mobileTab = document.getElementById("tab-mobile-text");
    if (mobileTab) mobileTab.textContent = trans.mobile;
    document.getElementById("tab-infra-text").textContent = trans.infrastructure;
    document.getElementById("tab-ai-text").textContent = trans.ai;

    // Contact Panel
    document.getElementById("status-title-text").textContent = trans.formName === "Your name" ? "Availability Status" : "Statut Professionnel";
    document.getElementById("status-toggle-val").textContent = trans.availabilityText;
    document.getElementById("label-name").textContent = trans.formName === "Your name" ? "Full Name" : "Nom Complet";
    document.getElementById("label-email").textContent = trans.formEmail === "your.email@example.com" ? "Email Address" : "Adresse Email";
    document.getElementById("label-message").textContent = trans.formMsg === "Your message..." ? "Your Message" : "Votre Message";
    document.getElementById("btn-submit-text").textContent = trans.formSend;
    document.getElementById("form-success-alert").textContent = trans.formSuccess;

    // Chatbot Panel
    document.getElementById("chatbot-heading").textContent = trans.chatbotTitle;
    document.getElementById("chatbot-status-text").textContent = trans.chatbotOnline;
    document.getElementById("chatbot-input-field").setAttribute("placeholder", trans.chatbotPlaceholder);

    // Terminal button label
    // Insights Panel
    document.getElementById("admin-section-heading").textContent = trans.visitorStats;
    document.getElementById("stat-views-label").textContent = trans.views;
    document.getElementById("stat-chats-label").textContent = trans.chats;
    document.getElementById("stat-clicks-label").textContent = trans.clicks;
    document.getElementById("insights-heatmap-title").textContent = trans.heatmapTitle;
    document.getElementById("insights-questions-title").textContent = trans.popularQuestions;

  }

  // Language switch triggers
  langToggleBtn.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "fr" : "en";
    localStorage.setItem("portfolio-lang", currentLang);
    langToggleBtn.textContent = currentLang.toUpperCase();

    // Translate chatbot initial state and dynamic CV items
    translateStaticLayout();
    renderDynamicCV();

    // Re-render new sections
    renderNewSections();
    translateNewSections();

    // Trigger callback on chatbot logic to refresh chat intro
    if (window.refreshChatbotIntro) {
      window.refreshChatbotIntro();
    }
  });

  // Initial layout translation & render
  langToggleBtn.textContent = currentLang.toUpperCase();
  translateStaticLayout();
  renderDynamicCV();

  // --- 9. Project Filtering ---
  document.querySelectorAll(".tab-btn").forEach(tab => {
    tab.addEventListener("click", (e) => {
      document.querySelectorAll(".tab-btn").forEach(t => t.classList.remove("active"));
      e.target.classList.add("active");

      const filterValue = e.target.getAttribute("data-filter");
      renderProjects(filterValue);
    });
  });

  // --- 10. Project Expansion Modal ---
  function openProjectModal(projectId) {
    const data = portfolioData[currentLang];
    const proj = data.projects.find(p => p.id === projectId);
    if (!proj) return;

    document.getElementById("modal-project-title").textContent = proj.title;
    document.getElementById("modal-project-category").textContent = proj.category.toUpperCase();
    document.getElementById("modal-project-desc").textContent = proj.desc;

    const mediaLabel = currentLang === "en" ? "Embedded Screencast / Interactive Demo" : "Screencast de Démo / Présentation Vidéo";
    document.getElementById("modal-media-desc").innerHTML = `<svg width="48" height="48" fill="currentColor" viewBox="0 0 16 16" style="margin-bottom:12px; opacity:0.6;"><path d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/></svg><p>${proj.title} - ${mediaLabel}</p>`;

    const featuresList = document.getElementById("modal-project-features");
    featuresList.innerHTML = "";
    proj.features.forEach(feat => {
      const li = document.createElement("li");
      li.textContent = feat;
      featuresList.appendChild(li);
    });

    document.getElementById("modal-git-stars").textContent = proj.stats.stars;
    document.getElementById("modal-git-forks").textContent = proj.stats.forks;
    document.getElementById("modal-git-commits").textContent = proj.stats.commits;

    const btnGit = document.getElementById("modal-btn-github");
    const btnDemo = document.getElementById("modal-btn-demo");
    btnGit.href = `https://${proj.github}`;
    btnDemo.href = proj.demo;

    projectModal.classList.add("show");
    document.body.style.overflow = "hidden"; // Stop page scroll

    updateHoverTargets();
  }

  function closeProjectModal() {
    projectModal.classList.remove("show");
    document.body.style.overflow = ""; // Restore scroll
  }

  modalCloseBtn.addEventListener("click", closeProjectModal);
  projectModal.addEventListener("click", (e) => {
    if (e.target === projectModal) closeProjectModal();
  });

  // --- 11. Pure JS 3D Card Tilt ---
  function initTilt() {
    const cards = document.querySelectorAll(".project-card");
    cards.forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // X position inside card
        const y = e.clientY - rect.top;  // Y position inside card

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Tilt coefficient
        const tiltX = (centerY - y) / 10;
        const tiltY = (x - centerX) / 10;

        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      });
    });
  }

  // --- 12. Contact Form Log Validation ---
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("form-name").value.trim();
    const email = document.getElementById("form-email").value.trim();
    const message = document.getElementById("form-message").value.trim();

    if (name && email && message) {
      // Log interaction in simulated local analytics database
      triggerContactSubmit(name, email, message);

      const successAlert = document.getElementById("form-success-alert");
      successAlert.style.display = "block";

      contactForm.reset();
      setTimeout(() => {
        successAlert.style.display = "none";
      }, 5000);
    }
  });

  // --- 13. VS Code Section Numbering ---
  function applySectionNumbers() {
    const sections = ["about", "snippets", "projects", "skills", "activity", "experience", "contact"];
    sections.forEach((id, i) => {
      const title = document.querySelector(`#${id} .section-title`);
      if (title) {
        title.setAttribute("data-number", String(i + 1).padStart(2, "0"));
      }
    });
  }

  // --- 14. Marquee Tech Stack Rendering ---
  function renderTechMarquee() {
    const track = document.getElementById("marquee-track");
    if (!track) return;
    const doubled = [...techIcons, ...techIcons];
    track.innerHTML = doubled.map(tech => `
      <div class="marquee-item">
        <span class="marquee-dot" style="background:${tech.color}"></span>
        ${tech.name}
      </div>
    `).join("");

    const items = track.querySelectorAll(".marquee-item");
    const totalWidth = Array.from(items).reduce((acc, item) => acc + item.offsetWidth + 32, 0);
    const duration = Math.max(30, totalWidth / 80);
    track.style.animationDuration = `${duration}s`;
  }

  // --- 15. Floating Tech Icons in Hero ---
  function renderFloatingIcons() {
    const container = document.getElementById("floating-icons");
    if (!container) return;
    const icons = techIcons.slice(0, 5);
    container.innerHTML = icons.map(tech => `
      <div class="floating-icon" style="background:${tech.color}">${tech.initials}</div>
    `).join("");
  }

  // --- 16. Code Snippets Rendering with Syntax Highlighting ---
  function highlightCode(code) {
    const escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    let highlighted = escaped;

    // Comments
    highlighted = highlighted.replace(/(\/\/.*)/g, '<span class="code-comment">$1</span>');
    highlighted = highlighted.replace(/(#.*)/g, '<span class="code-comment">$1</span>');

    // Strings (double, single, template literals)
    highlighted = highlighted.replace(/("(?:[^"\\]|\\.)*")/g, '<span class="code-string">$1</span>');
    highlighted = highlighted.replace(/('(?:[^'\\]|\\.)*')/g, '<span class="code-string">$1</span>');
    highlighted = highlighted.replace(/(`(?:[^`\\]|\\.)*`)/g, '<span class="code-string">$1</span>');

    // Keywords
    const kw = /\b(const|let|var|function|return|if|else|for|while|import|export|from|async|await|def|class|new|try|catch|throw|true|false|null|undefined|typeof|switch|case|break|continue|yield|this|super|static|extends|interface|type|enum|void)\b/g;
    highlighted = highlighted.replace(kw, '<span class="code-keyword">$1</span>');

    // Numbers
    highlighted = highlighted.replace(/\b(\d+\.?\d*)\b/g, '<span class="code-number">$1</span>');

    // Function calls
    highlighted = highlighted.replace(/\b([a-zA-Z_$][\w$]*)\s*\(/g, '<span class="code-function">$1</span>(');

    return highlighted;
  }

  function renderCodeSnippets() {
    const container = document.getElementById("snippets-container");
    if (!container) return;

    container.innerHTML = codeSnippets.map(snippet => `
      <div class="snippet-card hover-target">
        <div class="snippet-header">
          <div class="snippet-dots">
            <span class="snippet-dot"></span>
            <span class="snippet-dot"></span>
            <span class="snippet-dot"></span>
          </div>
          <span class="snippet-filename">${snippet.filename}</span>
          <span class="snippet-filename" style="opacity:0.4">${snippet.language}</span>
        </div>
        <div class="snippet-body">
          <code>${highlightCode(snippet.code)}</code>
        </div>
      </div>
    `).join("");
  }

  // --- 17. GitHub Contribution Graph ---
  function renderContributionGraph() {
    const grid = document.getElementById("activity-grid");
    if (!grid) return;

    grid.innerHTML = contributionData.map((level, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (139 - i));
      const dateStr = date.toLocaleDateString(currentLang === "en" ? "en-US" : "fr-FR", {
        month: "short", day: "numeric", year: "numeric"
      });
      return `<div class="activity-cell" data-level="${level}" data-count="${level}" title="${dateStr}: ${level} contributions"></div>`;
    }).join("");

    const total = contributionData.reduce((a, b) => a + b, 0);
    const label = document.getElementById("activity-label");
    if (label) {
      label.textContent = currentLang === "en"
        ? `${total} contributions in the last 20 weeks`
        : `${total} contributions dans les 20 dernières semaines`;
    }
  }

  // --- 18. Command Palette ---
  const commandPalette = document.getElementById("command-palette");
  const commandPaletteInput = document.getElementById("command-palette-input");
  const commandPaletteList = document.getElementById("command-palette-list");

  const paletteCommands = [
    { id: "about", label: "Go to About", icon: "<svg width='16' height='16' fill='currentColor' viewBox='0 0 16 16'><path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z'/></svg>", action: () => scrollToSection("about") },
    { id: "snippets", label: "View Code Snippets", icon: "<svg width='16' height='16' fill='currentColor' viewBox='0 0 16 16'><path d='M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z'/></svg>", action: () => scrollToSection("snippets") },
    { id: "projects", label: "Browse Projects", icon: "<svg width='16' height='16' fill='currentColor' viewBox='0 0 16 16'><path d='M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2zm0 5.5A.5.5 0 0 1 .5 7h15a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z'/></svg>", action: () => scrollToSection("projects") },
    { id: "skills", label: "View Skills", icon: "<svg width='16' height='16' fill='currentColor' viewBox='0 0 16 16'><path d='M9.465 10H12a2 2 0 1 1 0 4H9.465c.34-.588.535-1.271.535-2 0-.729-.195-1.412-.535-2zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 1a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm-3.5-1.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z'/></svg>", action: () => scrollToSection("skills") },
    { id: "experience", label: "View Experience", icon: "<svg width='16' height='16' fill='currentColor' viewBox='0 0 16 16'><path d='M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H4zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'/></svg>", action: () => scrollToSection("experience") },
    { id: "contact", label: "Get in Touch", icon: "<svg width='16' height='16' fill='currentColor' viewBox='0 0 16 16'><path d='M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2z'/></svg>", action: () => scrollToSection("contact") },
    { type: "separator" },
    { id: "theme", label: "Toggle Dark/Light Theme", icon: "<svg width='16' height='16' fill='currentColor' viewBox='0 0 16 16'><path d='M6 .278a.768.768 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.428c0 4.017 3.251 7.268 7.268 7.268 1.018 0 1.996-.21 2.896-.587.515-.202.684.839.172 1.2A8.1 8.1 0 0 1 8.3 16C3.716 16 0 12.284 0 7.7 0 3.91 2.535 0 6 .278z'/></svg>", action: () => { themeToggleBtn.click(); closePalette(); } },
    { id: "music", label: "Toggle Ambient Music", icon: "<svg width='16' height='16' fill='currentColor' viewBox='0 0 16 16'><path d='M11.536 14.01A8.47 8.47 0 0 0 14.02 11.53a.5.5 0 1 0-.82-.575 7.47 7.47 0 0 1-2.186 2.185.5.5 0 0 0 .522.871zM1.98 12.01A8.47 8.47 0 0 0 4.47 14.5a.5.5 0 0 0 .522-.871 7.47 7.47 0 0 1-2.186-2.185.5.5 0 1 0-.825.575z'/><path d='M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8z'/></svg>", action: () => { ambientToggleBtn.click(); closePalette(); } },
    { id: "cv", label: "Download CV", icon: "<svg width='16' height='16' fill='currentColor' viewBox='0 0 16 16'><path d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z'/><path d='M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z'/></svg>", action: () => { document.getElementById("floating-cv-btn")?.click(); closePalette(); } },
  ];

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    closePalette();
  }

  function openPalette() {
    commandPalette.classList.add("show");
    commandPaletteInput.value = "";
    commandPaletteInput.focus();
    renderPaletteResults("");
  }

  function closePalette() {
    commandPalette.classList.remove("show");
  }

  function renderPaletteResults(query) {
    const lower = query.toLowerCase().trim();
    const filtered = !lower
      ? paletteCommands
      : paletteCommands.filter(cmd => {
          if (cmd.type === "separator") return false;
          return cmd.label.toLowerCase().includes(lower) || cmd.id?.toLowerCase().includes(lower);
        });

    if (filtered.length === 0) {
      commandPaletteList.innerHTML = `<li class="command-palette-empty">No commands found</li>`;
      return;
    }

    commandPaletteList.innerHTML = filtered.map(cmd => {
      if (cmd.type === "separator") {
        return `<li class="command-palette-separator"></li>`;
      }
      const selected = cmd.id === filtered[0]?.id ? "selected" : "";
      return `<li class="command-palette-item ${selected}" data-id="${cmd.id}">
        ${cmd.icon}
        <span>${cmd.label}</span>
      </li>`;
    }).join("");

    commandPaletteList.querySelectorAll(".command-palette-item").forEach(item => {
      item.addEventListener("click", () => {
        const cmd = paletteCommands.find(c => c.id === item.dataset.id);
        if (cmd) cmd.action();
      });
    });
  }

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      openPalette();
    }
    if (e.key === "Escape") {
      closePalette();
    }
  });

  commandPaletteInput.addEventListener("input", (e) => {
    renderPaletteResults(e.target.value);
  });

  commandPaletteInput.addEventListener("keydown", (e) => {
    const items = commandPaletteList.querySelectorAll(".command-palette-item");
    const selected = commandPaletteList.querySelector(".command-palette-item.selected");
    let idx = -1;

    if (selected) {
      items.forEach((item, i) => { if (item === selected) idx = i; });
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIdx = Math.min(idx + 1, items.length - 1);
      items.forEach((item, i) => item.classList.toggle("selected", i === nextIdx));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIdx = Math.max(idx - 1, 0);
      items.forEach((item, i) => item.classList.toggle("selected", i === prevIdx));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selected) selected.click();
    }
  });

  commandPalette.addEventListener("click", (e) => {
    if (e.target === commandPalette) closePalette();
  });

  // --- 19a. Mobile Hamburger Menu ---
  const hamburger = document.getElementById("hamburger-btn");
  const navLinks = document.getElementById("menu-links");
  const navOverlay = document.getElementById("nav-overlay");
  function closeNav() {
    navLinks.classList.remove("open");
    hamburger.classList.remove("open");
    if (navOverlay) navOverlay.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  function openNav() {
    navLinks.classList.add("open");
    hamburger.classList.add("open");
    if (navOverlay) navOverlay.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      if (navLinks.classList.contains("open")) {
        closeNav();
      } else {
        openNav();
      }
    });
    if (navOverlay) {
      navOverlay.addEventListener("click", closeNav);
    }
    document.querySelectorAll("#menu-links a").forEach(link => {
      link.addEventListener("click", closeNav);
    });
  }

  // Show admin section on hash navigation
  window.addEventListener("hashchange", () => {
    if (location.hash === "#admin") {
      const adminSec = document.getElementById("admin");
      if (adminSec && adminSec.style.display !== "block") {
        adminSec.style.display = "block";
        adminSec.classList.add("active");
        if (window.renderPendingReviews) window.renderPendingReviews();
      }
    }
  });

  // --- 19b. Extend renderDynamicCV ---
  function renderNewSections() {
    applySectionNumbers();
    renderTechMarquee();
    renderFloatingIcons();
    renderCodeSnippets();
    renderContributionGraph();
  }

  // --- 20. Extend translateStaticLayout ---
  function translateNewSections() {
    const trans = textTranslations[currentLang];
    const snippetsTitle = document.getElementById("snippets-section-heading");
    if (snippetsTitle) snippetsTitle.textContent = trans.snippets || "Code Snippets";
    const activityTitle = document.getElementById("activity-section-heading");
    if (activityTitle) activityTitle.textContent = trans.activity || "Contribution Activity";
    const reviewsTitle = document.getElementById("insights-reviews-title");
    if (reviewsTitle) reviewsTitle.textContent = trans.pendingReviewsTitle || "Pending Reviews";
    const noPending = document.getElementById("no-pending-reviews");
    if (noPending) noPending.textContent = trans.noPendingReviews || "No pending reviews.";
  }

  // Render new sections on initial load
  renderNewSections();
  translateNewSections();

  // Animate counters on page load (not just on scroll)
  setTimeout(() => animateCounters(), 800);

  // --- PWA Service Worker Registration ---
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js")
        .then(reg => console.log("[PWA] Service Worker registered: ", reg.scope))
        .catch(err => console.log("[PWA] Service Worker registration failed: ", err));
    });
  }

  // --- Review System (localStorage-based) ---

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function getReviews() {
    try {
      return JSON.parse(localStorage.getItem("portfolio_reviews") || "[]");
    } catch { return []; }
  }

  function saveReviews(reviews) {
    localStorage.setItem("portfolio_reviews", JSON.stringify(reviews));
  }

  function getApprovedReviews() {
    return getReviews().filter(r => r.approved);
  }

  function getPendingReviews() {
    return getReviews().filter(r => !r.approved);
  }

  function submitReview(author, role, text) {
    const reviews = getReviews();
    reviews.push({ author, role, text, approved: false, date: Date.now(), id: Date.now() });
    saveReviews(reviews);
  }

  function approveReview(id) {
    const reviews = getReviews();
    const r = reviews.find(x => x.id === id);
    if (r) { r.approved = true; saveReviews(reviews); }
  }

  function deleteReview(id) {
    saveReviews(getReviews().filter(x => x.id !== id));
  }

  function renderPendingReviews() {
    const container = document.getElementById("pending-reviews-container");
    if (!container) return;
    const pending = getPendingReviews();
    if (pending.length === 0) {
      container.innerHTML = '<p class="admin-reviews-empty" id="no-pending-reviews">No pending reviews.</p>';
      return;
    }
    container.innerHTML = pending.map(r => `
      <div class="glass-card admin-review-card">
        <div class="admin-review-body">
          <h4>${escapeHtml(r.author)}</h4>
          <span class="admin-review-role">${escapeHtml(r.role || "Visitor")}</span>
          <p class="admin-review-text">${escapeHtml(r.text)}</p>
        </div>
        <div class="admin-review-actions">
          <button class="admin-review-btn approve" onclick="approveAndRefresh(${r.id})">Approve</button>
          <button class="admin-review-btn delete" onclick="deleteAndRefresh(${r.id})">Delete</button>
        </div>
      </div>
    `).join("");
  }

  window.approveAndRefresh = function(id) {
    approveReview(id);
    renderPendingReviews();
    renderNewSections();
  };

  window.deleteAndRefresh = function(id) {
    deleteReview(id);
    renderPendingReviews();
    renderNewSections();
  };

  // Review form handler
  const reviewForm = document.getElementById("review-form");
  if (reviewForm) {
    reviewForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const name = document.getElementById("review-name").value.trim();
      const role = document.getElementById("review-role").value.trim();
      const text = document.getElementById("review-text").value.trim();
      if (!name || !text) return;
      submitReview(name, role, text);
      reviewForm.reset();
      document.getElementById("review-success-alert").classList.add("show");
      setTimeout(() => {
        document.getElementById("review-success-alert").classList.remove("show");
      }, 3000);
    });
  }

  // --- Testimonial Book Carousel ---
  let testIndex = 0;
  let testTimer = null;

  function renderTestimonialPage(index) {
    const arr = window._testimonialsData || [];
    if (!arr.length) return;
    if (index < 0) index = arr.length - 1;
    if (index >= arr.length) index = 0;
    testIndex = index;

    const inner = document.getElementById("book-inner");
    const dots = document.getElementById("book-dots");
    if (!inner) return;

    const t = arr[testIndex];
    inner.innerHTML = `
      <div class="book-quote">&ldquo;</div>
      <p class="book-text">${escapeHtml(t.text)}</p>
      <div class="book-author">
        <h4>${escapeHtml(t.author)}</h4>
        <p>${escapeHtml(t.role)}</p>
      </div>
    `;

    if (dots) {
      dots.innerHTML = arr.map((_, i) =>
        `<button class="book-dot${i === testIndex ? ' active' : ''}" data-idx="${i}"></button>`
      ).join("");
      dots.querySelectorAll(".book-dot").forEach(d => {
        d.addEventListener("click", () => {
          clearInterval(testTimer);
          renderTestimonialPage(parseInt(d.dataset.idx));
          startTestTimer();
        });
      });
    }
  }

  function startTestTimer() {
    clearInterval(testTimer);
    testTimer = setInterval(() => {
      renderTestimonialPage(testIndex + 1);
    }, 5000);
  }

  document.getElementById("book-prev")?.addEventListener("click", () => {
    clearInterval(testTimer);
    renderTestimonialPage(testIndex - 1);
    startTestTimer();
  });

  document.getElementById("book-next")?.addEventListener("click", () => {
    clearInterval(testTimer);
    renderTestimonialPage(testIndex + 1);
    startTestTimer();
  });

  // Touch/swipe support for mobile
  let touchX = 0;
  const bookEl = document.getElementById("book-content");
  if (bookEl) {
    bookEl.addEventListener("touchstart", (e) => {
      touchX = e.changedTouches[0].screenX;
    }, { passive: true });
    bookEl.addEventListener("touchend", (e) => {
      const diff = touchX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 40) {
        clearInterval(testTimer);
        renderTestimonialPage(diff > 0 ? testIndex + 1 : testIndex - 1);
        startTestTimer();
      }
    }, { passive: true });
  }

  startTestTimer();

  // --- Admin Password Access ---
  const footerAdminBtn = document.getElementById("footer-admin-btn");
  if (footerAdminBtn) {
    footerAdminBtn.addEventListener("click", () => {
      const pwd = prompt("Enter admin password:");
      if (pwd === "brandon_admin") {
        localStorage.setItem("portfolio-admin-unlocked", "true");
        const adminSection = document.getElementById("admin");
        if (adminSection) {
          adminSection.style.display = "block";
          adminSection.classList.add("active");
        }
        const adminNavLink = document.getElementById("nav-admin-text");
        if (adminNavLink) adminNavLink.style.display = "block";
        if (window.renderPendingReviews) window.renderPendingReviews();
        alert("Admin access granted!");
        location.hash = "admin";
        location.href = "#admin";
      } else if (pwd !== null) {
        alert("Incorrect password.");
      }
    });
  }

  // Expose admin render for the Insights unlock
  window.renderPendingReviews = renderPendingReviews;

  // Share variables globally for chatbot and terminal interfaces
  window.currentLang = currentLang;
  window.portfolioData = portfolioData;
  window.textTranslations = textTranslations;
  window.updateHoverTargets = updateHoverTargets;
});
