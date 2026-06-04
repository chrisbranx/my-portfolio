/* ==========================================================================
   DEVELOPER TERMINAL CONSOLE EMULATOR (js/terminal.js)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const terminalOverlay = document.getElementById("terminal-overlay");
  const terminalInput = document.getElementById("terminal-input-box");
  const terminalLog = document.getElementById("terminal-output-log");
  const terminalCloseBtn = document.getElementById("terminal-close-dot");
  const terminalToggleBtn = document.getElementById("terminal-toggle-btn");
  const logoLink = document.getElementById("logo-link");
  const adminNavLink = document.getElementById("nav-admin-text");

  // Commands history buffer
  let cmdHistory = [];
  let historyIndex = -1;

  // Translation of system messages
  const terminalTranslations = {
    en: {
      welcome: "Welcome to Brandon's interactive terminal console v1.2.0.\nType 'help' to view all available commands.\n\nType 'exit' to return to standard web view.\n",
      cmdError: "Command not found: '{0}'. Type 'help' to see list of valid commands.",
      exitMsg: "Exiting terminal session...",
      cleared: "Log cleared.",
      secretUnlocked: "[SYSTEM ALERT] Administrative elevation successful!\nAdmin privileges granted. Secret 'Insights' dashboard unlocked in navigation bar!\nCredentials: brandon_admin / temp_token_2026",
      secretPrompt: "[SYSTEM INFO] Administrative access requested. Enter password: "
    },
    fr: {
      welcome: "Bienvenue dans la console interactive de Brandon v1.2.0.\nTapez 'help' pour voir la liste des commandes.\n\nTapez 'exit' pour retourner au site.\n",
      cmdError: "Commande introuvable: '{0}'. Tapez 'help' pour la liste des commandes.",
      exitMsg: "Fermeture de la session terminal...",
      cleared: "Console effacée.",
      secretUnlocked: "[SYSTEME] Élévation des privilèges réussie!\nDroits administrateur accordés. Tableau de bord 'Insights' débloqué dans la navigation!\nIdentifiants: brandon_admin / temp_token_2026",
      secretPrompt: "[SYSTEME] Accès administrateur requis. Entrez le mot de passe: "
    }
  };

  const commandDetails = {
    en: {
      help: "List all available commands.",
      about: "Show Brandon's quick professional summary.",
      skills: "Show categorized technical expertise levels.",
      projects: "Show active project names and links.",
      experience: "Display professional journey and duration details.",
      theme: "Change color theme. Usage: 'theme <emerald|cyan|violet|gold>'",
      chat: "Directly chat with the Virtual AI. Usage: 'chat <your question>'",
      sudo: "Execute admin elevation commands.",
      clear: "Clear the console outputs.",
      exit: "Close the terminal overlay."
    },
    fr: {
      help: "Affiche toutes les commandes disponibles.",
      about: "Présente un résumé de Brandon.",
      skills: "Affiche la liste des compétences techniques.",
      projects: "Affiche les détails des projets et dépôts.",
      experience: "Affiche l'expérience professionnelle.",
      theme: "Change le thème de couleur. Usage: 'theme <emerald|cyan|violet|gold>'",
      chat: "Discutez avec l'IA. Usage: 'chat <votre question>'",
      sudo: "Exécute l'élévation d'accès administrateur.",
      clear: "Efface la console.",
      exit: "Quitte le mode terminal."
    }
  };

  // --- Visibility Controls ---
  function openTerminal() {
    terminalOverlay.classList.add("show");
    document.body.style.overflow = "hidden"; // Disable scroll
    
    // Sync terminal color style class with body theme accent
    syncTerminalAccent();
    
    // Clear and print initial logs
    terminalLog.innerHTML = "";
    writeLine(terminalTranslations[window.currentLang].welcome, "success");
    
    setTimeout(() => terminalInput.focus(), 100);
    triggerClickLog(0, 0); // Analytics click tracking
  }

  function closeTerminal() {
    writeLine(terminalTranslations[window.currentLang].exitMsg, "error");
    setTimeout(() => {
      terminalOverlay.classList.remove("show");
      document.body.style.overflow = ""; // Restore scroll
    }, 400);
  }

  terminalToggleBtn.addEventListener("click", openTerminal);
  terminalCloseBtn.addEventListener("click", closeTerminal);

  // Sync terminal accent wrapper
  function syncTerminalAccent() {
    // Clear classes
    terminalOverlay.className = "terminal-crt";
    const bodyAccent = document.body.className.match(/theme-\w+/);
    if (bodyAccent) {
      terminalOverlay.classList.add(`terminal-${bodyAccent[0]}`);
    }
  }

  // Easter Egg: Typing 'sudo' anywhere on the page
  let keysPressed = "";
  document.addEventListener("keydown", (e) => {
    // Exclude when typing inside input boxes
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
    
    keysPressed += e.key.toLowerCase();
    if (keysPressed.endsWith("sudo")) {
      keysPressed = "";
      openTerminal();
      executeCommand("sudo");
    }
    
    // Limit buffer length
    if (keysPressed.length > 20) keysPressed = keysPressed.slice(-10);
  });

  // Terminal navigation arrow history listeners
  terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        if (historyIndex === -1) historyIndex = cmdHistory.length - 1;
        else if (historyIndex > 0) historyIndex--;
        terminalInput.value = cmdHistory[historyIndex];
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        if (historyIndex !== -1 && historyIndex < cmdHistory.length - 1) {
          historyIndex++;
          terminalInput.value = cmdHistory[historyIndex];
        } else {
          historyIndex = -1;
          terminalInput.value = "";
        }
      }
    }
  });

  terminalFormSubmit = (e) => {
    if (e.key === "Enter") {
      const inputVal = terminalInput.value.trim();
      terminalInput.value = "";
      
      if (inputVal) {
        cmdHistory.push(inputVal);
        historyIndex = -1;
        executeCommand(inputVal);
      }
    }
  };
  terminalInput.addEventListener("keypress", terminalFormSubmit);

  // --- Output Writer Helper ---
  function writeLine(text, type = "") {
    const line = document.createElement("span");
    line.className = `terminal-line ${type}`;
    line.textContent = text;
    terminalLog.appendChild(line);
    
    // Scroll body content to bottom
    const bodyContent = document.getElementById("terminal-body-content");
    bodyContent.scrollTop = bodyContent.scrollHeight;
  }

  // --- Command Executor Router ---
  function executeCommand(inputString) {
    // Print input echo
    writeLine(`brandon@dev-terminal:~$ ${inputString}`, "cmd-echo");
    
    const parts = inputString.split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    const data = window.portfolioData[window.currentLang];
    const trans = terminalTranslations[window.currentLang];

    switch (cmd) {
      case "help":
        let helpText = "Available commands:\n";
        const commands = commandDetails[window.currentLang];
        for (const [c, desc] of Object.entries(commands)) {
          helpText += `  ${c.padEnd(12)} - ${desc}\n`;
        }
        writeLine(helpText);
        break;

      case "about":
        writeLine(data.about);
        break;

      case "skills":
        let skillsText = "Brandon's Tech Stack:\n\n";
        for (const [cat, list] of Object.entries(data.skills)) {
          skillsText += `[${cat.toUpperCase()}]\n`;
          list.forEach(s => {
            skillsText += `  * ${s.name.padEnd(25)} : ${s.level} (${s.percent}%)\n`;
          });
          skillsText += "\n";
        }
        writeLine(skillsText);
        break;

      case "projects":
        let projText = "Showcase Projects:\n\n";
        data.projects.forEach(p => {
          projText += `* ${p.title} (${p.category.toUpperCase()})\n`;
          projText += `  Desc: ${p.desc}\n`;
          projText += `  Stack: ${p.stack.join(", ")}\n`;
          projText += `  GitHub: https://${p.github}\n\n`;
        });
        writeLine(projText);
        break;

      case "experience":
        let expText = "Professional Journey:\n\n";
        data.experience.forEach(e => {
          expText += `[${e.period}] ${e.role} @ ${e.company}\n`;
          e.achievements.forEach(ach => {
            expText += `  - ${ach}\n`;
          });
          expText += "\n";
        });
        writeLine(expText);
        break;

      case "theme":
        if (args.length > 0) {
          const color = args[0].toLowerCase();
          if (["emerald", "cyan", "violet", "gold"].includes(color)) {
            // Update app accent
            document.body.className = "";
            document.body.classList.add(`theme-${color}`);
            localStorage.setItem("portfolio-accent", color);
            
            // Sync dot dropdown visual selector in main website header
            document.querySelectorAll(".accent-dot").forEach(d => {
              d.classList.toggle("active", d.getAttribute("data-color") === color);
            });
            
            syncTerminalAccent();
            writeLine(`Accent theme updated to: ${color.toUpperCase()}`, "success");
          } else {
            writeLine("Invalid color. Available colors: emerald, cyan, violet, gold", "error");
          }
        } else {
          writeLine("Usage: theme <emerald|cyan|violet|gold>", "error");
        }
        break;

      case "chat":
        if (args.length > 0) {
          const chatMsg = args.join(" ");
          writeLine("Processing query with Virtual AI assistant...", "success");
          
          // Simple delayed simulation matching chatbot core
          setTimeout(() => {
            const rules = botIntents[window.currentLang];
            let replyText = "";
            const cleanMsg = chatMsg.toLowerCase();
            
            // Re-use core dialogue replies
            let matched = false;
            for (const r of rules) {
              if (r.keys.some(k => cleanMsg.includes(k))) {
                replyText = r.reply;
                matched = true;
                break;
              }
            }
            
            if (!matched) {
              replyText = window.currentLang === "en"
                ? "I can only answer questions about Brandon, his projects, skills, and experience! For example, ask: 'projects'."
                : "Je peux seulement répondre aux questions concernant Brandon, ses projets, ses compétences et son parcours! Par exemple, demandez: 'projets'.";
            }
            
            // Remove markdown syntax for raw text output in CLI terminal
            let cleanOutput = replyText.replace(/\*\*/g, "").replace(/\[.*?\]/g, "");
            writeLine(`[AI Agent]: ${cleanOutput}`);
          }, 600);
        } else {
          writeLine("Usage: chat <your question>", "error");
        }
        break;

      case "sudo":
        writeLine(trans.secretUnlocked, "success");
        // Show Admin Navigation link globally on main interface
        adminNavLink.style.display = "block";
        
        // Show the admin section
        const adminSection = document.getElementById("admin");
        if (adminSection) {
          adminSection.style.display = "block";
          adminSection.classList.add("active");
          // Trigger scroll reveal
          if (window.renderPendingReviews) window.renderPendingReviews();
        }
        
        // Save access key in localStorage to persist Admin Dashboard across page reloads
        localStorage.setItem("portfolio-admin-unlocked", "true");
        
        // Log query in analytics
        triggerAdminUnlocked();
        break;

      case "clear":
        terminalLog.innerHTML = "";
        writeLine(trans.cleared, "success");
        break;

      case "exit":
        closeTerminal();
        break;

      default:
        const errPattern = trans.cmdError.replace("{0}", cmd);
        writeLine(errPattern, "error");
        break;
    }
  }

  // Check if admin dashboard was previously unlocked
  if (localStorage.getItem("portfolio-admin-unlocked") === "true") {
    adminNavLink.style.display = "block";
    const adminSection = document.getElementById("admin");
    if (adminSection) {
      adminSection.style.display = "block";
      adminSection.classList.add("active");
      if (window.renderPendingReviews) window.renderPendingReviews();
    }
  }
});
