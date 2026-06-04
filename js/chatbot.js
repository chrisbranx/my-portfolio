/* ==========================================================================
   AI CHATBOT SIMULATION ENGINE (js/chatbot.js)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const chatbotToggle = document.getElementById("chatbot-toggle");
  const chatbotWindow = document.getElementById("chatbot-window");
  const chatbotCloseBtn = document.getElementById("chatbot-close-btn");
  const chatbotMessages = document.getElementById("chatbot-messages");
  const chatbotChipsContainer = document.getElementById("chatbot-chips");
  const chatbotForm = document.getElementById("chatbot-input-form");
  const chatbotInputField = document.getElementById("chatbot-input-field");
  const chatbotIndicatorDot = document.getElementById("chatbot-indicator-dot");

  let conversationHistory = [];

  // Intent parsing rules (English & French)
  const botIntents = {
    en: [
      {
        keys: ["hello", "hi", "hey", "greetings", "yo"],
        reply: "Hello! I am Brandon Funi's virtual assistant. Ask me about his projects, skills, professional experience, or education. You can also trigger 'Recruiter Mode'!"
      },
      {
        keys: ["skills", "languages", "programming", "know", "code", "tech stack", "what can"],
        reply: "Brandon Funi is proficient in JavaScript, Python, PHP, C, and HTML/CSS. He builds with React Native, Flutter, Node.js/Express.js, and works with databases like Supabase, PostgreSQL, MongoDB, and MySQL. He also uses Docker and Git!"
      },
      {
        keys: ["python"],
        reply: "Brandon has solid Python skills, using it for scripting, backend logic, and automation tasks."
      },
      {
        keys: ["javascript", "react", "node", "express"],
        reply: "JavaScript is a core language for Brandon! He builds web apps with React and backend APIs with Node.js/Express.js."
      },
      {
        keys: ["react native", "flutter", "mobile", "app"],
        reply: "Mobile development is Brandon's passion! He builds cross-platform apps with React Native and Flutter — see LinkUp and Qyra in the Projects section."
      },
      {
        keys: ["experience", "jobs", "work", "worked", "role", "position"],
        reply: "Brandon serves as the Communication Delegate for SAIBUIST (since Nov 2024) and as Media Head at his church, managing live Facebook and YouTube broadcasts. Type 'recruiter' for a full professional pitch!"
      },
      {
        keys: ["education", "university", "college", "study", "school", "saibuist", "saint austin"],
        reply: "Brandon is studying Software Engineering at Saint Austin International Bilingual University of Science and Technology (SAIBUIST), focusing on mobile and web development."
      },
      {
        keys: ["project", "projects", "portfolio", "linkup", "qyra", "libu", "carko", "university hub"],
        reply: "Brandon has built several featured projects: 'LinkUp' (P2P chat + mobile money), 'Qyra' (futuristic social media), 'LIBU Connect' (student portal), 'Saint Austin\'s Verification App' (QR-based), 'University Hub', and 'Carko237' (Cameroon fashion marketplace). View them in the Projects section!",
        showProjects: true
      },
      {
        keys: ["contact", "email", "hire", "schedule", "reach", "linkedin", "github"],
        reply: "You can contact Brandon Funi via email at chrisbranx21@gmail.com, find him on GitHub at github.com/chrisbranx, or connect on LinkedIn at linkedin.com/in/brandon-funi!"
      },
      {
        keys: ["recruiter", "pitch", "hiring", "recruit", "summary", "brief"],
        reply: ' <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style="vertical-align:middle;margin-right:4px;"><path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1Zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/><path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.373 5.373 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2H2Z"/></svg> **Recruiter Mode Activated**\x0a\x0aBrandon Funi is an aspiring Software Engineer and student at SAIBUIST, specializing in Full-Stack and Mobile Development. Skilled in JS, Python, React Native, Flutter, Node.js, and multiple databases (Supabase, PostgreSQL, MongoDB). He has built 6+ real-world projects and serves as University Communication Delegate. Currently open to opportunities and collaborations!\x0a\x0aClick below to download his CV.',
        isRecruiter: true
      },
      {
        keys: ["cv", "resume", "download", "pdf"],
        reply: "Sure! You can download Brandon Funi's CV directly by clicking the button below.",
        showCVDownload: true
      }
    ],
    fr: [
      {
        keys: ["bonjour", "salut", "hello", "hi", "hey", "yo"],
        reply: "Bonjour! Je suis l'assistant virtuel de Brandon Funi. Posez-moi des questions sur ses projets, ses compétences, son expérience ou ses études. Vous pouvez aussi activer le 'Mode Recruteur'!"
      },
      {
        keys: ["competence", "competences", "langage", "langages", "programmation", "code", "techno", "stack"],
        reply: "Brandon Funi maîtrise JavaScript, Python, PHP, C et HTML/CSS. Il développe avec React Native, Flutter, Node.js/Express.js et travaille avec Supabase, PostgreSQL, MongoDB et MySQL. Il utilise aussi Docker et Git!"
      },
      {
        keys: ["python"],
        reply: "Brandon utilise Python pour le scripting, la logique backend et l'automatisation des tâches."
      },
      {
        keys: ["javascript", "react", "node", "express"],
        reply: "JavaScript est au cœur du travail de Brandon! Il crée des interfaces avec React et des APIs backend avec Node.js/Express.js."
      },
      {
        keys: ["react native", "flutter", "mobile", "application"],
        reply: "Le développement mobile est la passion de Brandon! Il crée des apps multiplateformes avec React Native et Flutter — voir LinkUp et Qyra dans la section Projets."
      },
      {
        keys: ["experience", "experiences", "emploi", "travail", "role", "poste"],
        reply: "Brandon est Délégué à la Communication de la SAIBUIST depuis nov 2024 et Responsable Média à son église, gérant des diffusions en direct sur Facebook et YouTube. Écrivez 'recruteur' pour un résumé complet!"
      },
      {
        keys: ["etude", "etudes", "universite", "bac", "saibuist", "saint austin"],
        reply: "Brandon étudie le Génie Logiciel à la Saint Austin International Bilingual University of Science and Technology (SAIBUIST), avec un accent sur le développement mobile et web."
      },
      {
        keys: ["projet", "projets", "realisation", "realisations", "linkup", "qyra", "libu", "carko"],
        reply: "Brandon a développé plusieurs projets phares: 'LinkUp' (chat P2P + mobile money), 'Qyra' (réseau social futuriste), 'LIBU Connect' (portail étudiant), 'App de Vérification St. Austin' (QR), 'University Hub', et 'Carko237' (mode camerounaise). Découvrez-les dans la section Projets!",
        showProjects: true
      },
      {
        keys: ["contact", "email", "recruter", "linkedin", "github", "message"],
        reply: "Vous pouvez contacter Brandon Funi à chrisbranx21@gmail.com, le retrouver sur GitHub à github.com/chrisbranx, ou sur LinkedIn à linkedin.com/in/brandon-funi!"
      },
      {
        keys: ["recruteur", "recrutement", "pitch", "embaucher", "synthese"],
        reply: ' <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style="vertical-align:middle;margin-right:4px;"><path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1Zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/><path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.373 5.373 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2H2Z"/></svg> **Mode Recruteur Activ\u00E9**\x0a\x0aBrandon Funi est un futur ing\u00E9nieur logiciel \u00E9tudiant \u00E0 la SAIBUIST, sp\u00E9cialis\u00E9 en d\u00E9veloppement Full-Stack et Mobile. Ma\u00EEtrise JS, Python, React Native, Flutter, Node.js et plusieurs bases de donn\u00E9es. Il a r\u00E9alis\u00E9 6+ projets concrets et est D\u00E9l\u00E9gu\u00E9 Communication de l\u2019universit\u00E9. Disponible pour des opportunit\u00E9s et collaborations!\x0a\x0aCliquez ci-dessous pour t\u00E9l\u00E9charger son CV.',
        isRecruiter: true
      },
      {
        keys: ["cv", "resume", "telecharger", "pdf"],
        reply: "Absolument! Vous pouvez télécharger le CV de Brandon Funi en cliquant sur le bouton ci-dessous.",
        showCVDownload: true
      }
    ]
  };

  const promptChipsData = {
    en: ["Skills & Stack", "Recent Projects", "Experience Summary", "I'm a recruiter", "Download CV"],
    fr: ["Compétences", "Projets Récents", "Résumé Parcours", "Mode Recruteur", "Télécharger le CV"]
  };

  // --- Toggle Window ---
  chatbotToggle.addEventListener("click", () => {
    const isShowing = chatbotWindow.classList.toggle("show");
    chatbotToggle.setAttribute("aria-expanded", isShowing);
    if (isShowing) {
      chatbotIndicatorDot.style.display = "none";
      setTimeout(() => chatbotInputField.focus(), 300);
      
      // Track analytics start chat
      if (conversationHistory.length === 0) {
        triggerChatStart();
      }
    }
  });

  chatbotCloseBtn.addEventListener("click", () => {
    chatbotWindow.classList.remove("show");
    chatbotToggle.setAttribute("aria-expanded", false);
  });

  // --- Append Messages ---
  function appendMessage(sender, text, extraData = null) {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble chat-bubble-${sender}`;
    
    // Convert markdownbold in message text
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    bubble.innerHTML = formattedText;

    if (extraData) {
      const btnGroup = document.createElement("div");
      btnGroup.className = "chat-btn-group";

      if (extraData.showCV) {
        const downloadBtn = document.createElement("a");
        downloadBtn.href = "assets/CV - Brandon Funi.pdf";
        downloadBtn.download = "CV - Brandon Funi.pdf";
        downloadBtn.className = "chat-inline-btn hover-target";
        downloadBtn.innerHTML = `
          <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/><path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/></svg>
          ${window.currentLang === "en" ? "Download CV" : "Télécharger CV"}
        `;
        btnGroup.appendChild(downloadBtn);
      }

      if (extraData.showCal) {
        const calBtn = document.createElement("a");
        calBtn.href = "https://cal.com/brandonlee-dev/chat";
        calBtn.target = "_blank";
        calBtn.className = "chat-inline-btn hover-target";
        calBtn.innerHTML = `
          <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16"><path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/></svg>
          ${window.currentLang === "en" ? "Schedule Call" : "Planifier Appel"}
        `;
        btnGroup.appendChild(calBtn);
      }

      if (extraData.showProjects) {
        const projBtn = document.createElement("a");
        projBtn.href = "#projects";
        projBtn.className = "chat-inline-btn hover-target";
        projBtn.textContent = window.currentLang === "en" ? "View Projects" : "Découvrir Projets";
        projBtn.addEventListener("click", () => chatbotWindow.classList.remove("show"));
        btnGroup.appendChild(projBtn);
      }

      // Add Transcript Export button to bottom of Recruiter mode or on CV request
      const exportBtn = document.createElement("button");
      exportBtn.className = "chat-inline-btn hover-target";
      exportBtn.textContent = window.currentLang === "en" ? "Export Chat" : "Exporter Chat";
      exportBtn.addEventListener("click", exportTranscript);
      btnGroup.appendChild(exportBtn);

      bubble.appendChild(btnGroup);
    }

    chatbotMessages.appendChild(bubble);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    // Save history
    conversationHistory.push({ sender, text });
    if (window.updateHoverTargets) window.updateHoverTargets();
  }

  // --- Typing Indicator ---
  function showTypingIndicator() {
    const indicator = document.createElement("div");
    indicator.className = "chat-bubble chat-bubble-bot typing-indicator";
    indicator.id = "chat-typing-indicator";
    indicator.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;
    chatbotMessages.appendChild(indicator);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById("chat-typing-indicator");
    if (indicator) indicator.remove();
  }

  // --- Intent Classifier Reply ---
  function getBotReply(userInput) {
    const lang = window.currentLang;
    const rules = botIntents[lang];
    const cleanInput = userInput.toLowerCase().trim();

    // Trigger local query log
    triggerChatQuery(cleanInput);

    // Scan intents
    for (const rule of rules) {
      const matched = rule.keys.some(k => cleanInput.includes(k));
      if (matched) {
        let extra = {};
        if (rule.showCVDownload) extra.showCV = true;
        if (rule.showProjects) extra.showProjects = true;
        if (rule.isRecruiter) {
          extra.showCV = true;
          extra.showCal = true;
        }
        return { text: rule.reply, extra };
      }
    }

    // Default fallbacks
    if (lang === "en") {
      return {
        text: "I can only answer questions about Brandon, his projects, skills, and experience! Try asking: 'What skills does he have?' or 'Tell me about his experience.'",
        extra: null
      };
    } else {
      return {
        text: "Je peux seulement répondre aux questions concernant Brandon, ses projets, ses compétences et son parcours! Essayez de demander: 'Quelles sont ses compétences?' ou 'Parle-moi de ses projets.'",
        extra: null
      };
    }
  }

  // Send message
  function handleSendMessage(text) {
    if (!text.trim()) return;
    
    appendMessage("user", text);
    showTypingIndicator();

    // Simulated API response delay
    const delay = Math.min(1200, 400 + text.length * 5);
    setTimeout(() => {
      removeTypingIndicator();
      const botResponse = getBotReply(text);
      appendMessage("bot", botResponse.text, botResponse.extra);
    }, delay);
  }

  chatbotForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = chatbotInputField.value;
    chatbotInputField.value = "";
    handleSendMessage(query);
  });

  // --- Suggestion Prompt Chips ---
  function renderChips() {
    chatbotChipsContainer.innerHTML = "";
    const chips = promptChipsData[window.currentLang];
    
    chips.forEach(chipText => {
      const chip = document.createElement("button");
      chip.className = "chip-btn hover-target";
      chip.textContent = chipText;
      
      chip.addEventListener("click", () => {
        // Strip emoji for query logic
        let query = chipText.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, "").trim();
        
        // Translate chip clicks to system keywords
        if (query.includes("Skills") || query.includes("Compétences")) query = "What are your core skills?";
        if (query.includes("Projects") || query.includes("Projets")) query = "Show me your projects";
        if (query.includes("Experience") || query.includes("Résumé")) query = "Tell me about your jobs";
        if (query.includes("Recruiter") || query.includes("recruteur")) query = "I am a recruiter";
        if (query.includes("CV")) query = "Can I download your CV?";
        
        handleSendMessage(query);
      });
      chatbotChipsContainer.appendChild(chip);
    });
    if (window.updateHoverTargets) window.updateHoverTargets();
  }

  // Initial welcome message
  function refreshChatbotIntro() {
    chatbotMessages.innerHTML = "";
    conversationHistory = [];
    const welcomeText = window.currentLang === "en" 
      ? "Hi! I'm Brandon Funi's Virtual Assistant. Ask me anything about his skills, experience, projects, or education. Select a prompt below to begin!"
      : "Bonjour! Je suis l'assistant virtuel de Brandon Funi. Posez-moi des questions sur ses compétences, ses projets ou son parcours. Choisissez un sujet ci-dessous pour commencer!";
    appendMessage("bot", welcomeText);
    renderChips();
  }

  // --- Export Chat Transcript ---
  function exportTranscript() {
    if (conversationHistory.length === 0) return;

    let transcript = `=== CHAT TRANSCRIPT WITH BRANDON FUNI'S VIRTUAL AI ===\n`;
    transcript += `Exported: ${new Date().toLocaleString()}\n`;
    transcript += `======================================================\n\n`;

    conversationHistory.forEach(msg => {
      const senderName = msg.sender === "user" ? "Visitor" : "AI Agent";
      transcript += `[${senderName}]: ${msg.text}\n\n`;
    });

    transcript += `======================================================\n`;
    transcript += `Contact Brandon Funi at chrisbranx21@gmail.com\n`;
    transcript += `GitHub: github.com/chrisbranx | LinkedIn: linkedin.com/in/brandon-funi\n`;

    // Download file script
    const blob = new Blob([transcript], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Brandon_Funi_Chat_Transcript.txt`;
    link.click();
  }

  // Share global hooks
  window.refreshChatbotIntro = refreshChatbotIntro;

  // Initialize intro
  refreshChatbotIntro();
});
