/* ==========================================================================
   PORTFOLIO VISITOR ANALYTICS SYSTEM (js/analytics.js)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize mock data store if empty
  const defaultAnalytics = {
    views: 142,
    chats: 38,
    clicks: 654,
    queries: {
      "projects": 18,
      "skills": 15,
      "python": 11,
      "experience": 9,
      "concordia": 7,
      "recruiter": 6,
      "cisco": 4
    },
    clickMatrix: Array(144).fill(0).map(() => Math.floor(Math.random() * 8)),
    contactLogs: []
  };

  // Load stats from storage
  let stats = JSON.parse(localStorage.getItem("portfolio-analytics"));
  if (!stats) {
    stats = defaultAnalytics;
    localStorage.setItem("portfolio-analytics", JSON.stringify(stats));
  }

  // --- Increment View Count ---
  // Run once per page session
  if (!sessionStorage.getItem("portfolio-visited")) {
    stats.views++;
    sessionStorage.setItem("portfolio-visited", "true");
    saveStats();
  }

  function saveStats() {
    localStorage.setItem("portfolio-analytics", JSON.stringify(stats));
    updateDashboardUI();
  }

  // --- Click Coordinator Matrix Heatmap ---
  // Track client clicks anywhere on body and map to a 12x12 matrix
  document.body.addEventListener("click", (e) => {
    // Exclude clicks inside overlays (terminal / chatbot)
    if (e.target.closest("#terminal-overlay") || e.target.closest("#chatbot-window")) return;

    stats.clicks++;
    
    // Normalize coordinates to 12 columns/rows
    const xRatio = e.clientX / window.innerWidth;
    const yRatio = e.clientY / document.documentElement.scrollHeight;
    
    const col = Math.floor(xRatio * 12);
    const row = Math.floor(yRatio * 12);
    const index = Math.max(0, Math.min(143, row * 12 + col));
    
    stats.clickMatrix[index]++;
    saveStats();
  });

  // --- Global Analytics Hooks ---
  window.triggerClickLog = (x, y) => {
    stats.clicks++;
    saveStats();
  };

  window.triggerChatStart = () => {
    stats.chats++;
    saveStats();
  };

  window.triggerChatQuery = (query) => {
    const cleanQuery = query.toLowerCase().trim();
    if (!cleanQuery) return;

    if (stats.queries[cleanQuery]) {
      stats.queries[cleanQuery]++;
    } else {
      stats.queries[cleanQuery] = 1;
    }
    saveStats();
  };

  window.triggerContactSubmit = (name, email, msg) => {
    stats.contactLogs.push({
      date: new Date().toLocaleString(),
      name,
      email,
      message: msg
    });
    saveStats();
  };

  window.triggerAdminUnlocked = () => {
    // Log the event inside queries or custom stats
    stats.queries["[admin unlock]"] = (stats.queries["[admin unlock]"] || 0) + 1;
    saveStats();
  };

  // --- Dashboard Renderer ---
  function updateDashboardUI() {
    const viewsEl = document.getElementById("stat-views");
    const chatsEl = document.getElementById("stat-chats");
    const clicksEl = document.getElementById("stat-clicks");
    const heatmapGrid = document.getElementById("heatmap-grid");
    const queriesList = document.getElementById("popular-queries-list");

    if (!viewsEl || !chatsEl || !clicksEl) return;

    // Render basic stats
    viewsEl.textContent = stats.views;
    chatsEl.textContent = stats.chats;
    clicksEl.textContent = stats.clicks;

    // Render Heatmap Matrix Grid (12x12 cells)
    if (heatmapGrid) {
      heatmapGrid.innerHTML = "";
      const maxClicks = Math.max(...stats.clickMatrix, 1);
      
      stats.clickMatrix.forEach((clickCount, index) => {
        const cell = document.createElement("div");
        cell.className = "heatmap-cell";
        cell.setAttribute("data-count", `${clickCount} Clicks`);
        
        // Calculate opacity based on highest counts
        const ratio = clickCount / maxClicks;
        cell.style.backgroundColor = `rgba(var(--accent-rgb), ${Math.min(0.9, ratio * 1.2)})`;
        
        heatmapGrid.appendChild(cell);
      });
    }

    // Render Popular inquiries
    if (queriesList) {
      queriesList.innerHTML = "";
      
      // Sort queries by counts
      const sortedQueries = Object.entries(stats.queries)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5); // top 5 queries

      sortedQueries.forEach(([q, count]) => {
        const li = document.createElement("li");
        li.className = "query-item";
        li.innerHTML = `
          <span>${q}</span>
          <span class="query-count">${count}</span>
        `;
        queriesList.appendChild(li);
      });
    }
  }

  // Initial dashboard sync
  updateDashboardUI();
});
