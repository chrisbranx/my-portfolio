// CV and Portfolio Data for Chris Brandon
// Supports both English (en) and French (fr)

const portfolioData = {
  en: {
    name: "Chris Brandon",
    title: "Software Engineering Student | Aspiring Full-Stack Developer",
    titles: ["build mobile apps", "write clean code", "design user experiences", "solve real problems"],
    availability: "Let's Collaborate!",
    location: "SAIBUIST",
    email: "chrisbranx21@gmail.com",
    phone: "+237 688 104 091",
    github: "github.com/chrisbranx",
    linkedin: "linkedin.com/in/brandon-funi",
    about: "I'm Chris Brandon, an aspiring Software Engineer currently studying at Saint Austin International Bilingual University of Science and Technology (SAIBUIST). With a strong passion for innovation and technology, I specialize in mobile app development, web development, and building digital solutions that address real-world challenges.\n\nBeyond academics, I serve as the Communication Delegate for the entire university, a role I've held since November 2024. I also contribute to my community as the Media Head at my church, managing live broadcast productions across platforms like Facebook and YouTube.",
    experience: [
      {
        role: "Intern & Group Leader — Full-Stack Developer",
        company: "MINPOSTEL (Ministry of Posts and Telecommunications, Cameroon)",
        period: "Feb 18 – Mar 8, 2025",
        startDate: "2025-02-18",
        endDate: "2025-03-08",
        logo: "minpostel",
        achievements: [
          "Served as Group Leader and Head of the entire school team during first internship in Year 1.",
          "Led the development of the MINPOSTEL Staff Management System to digitize and manage staff records.",
          "Sharpened leadership, project management, and full-stack development skills under real-world conditions."
        ]
      },
      {
        role: "Communication Delegate",
        company: "Saint Austin International Bilingual University of Science and Technology (SAIBUIST)",
        period: "2024-11-01 to Present",
        startDate: "2024-11-01",
        endDate: "Present",
        logo: "saibuist",
        achievements: [
          "Serve as the primary liaison between students and university administration.",
          "Facilitate clear and effective communication of university policies and announcements.",
          "Organize and manage communication channels for the entire university student body."
        ]
      },
      {
        role: "Media Head",
        company: "Local Church",
        period: "Present",
        startDate: "2023-01-01",
        endDate: "Present",
        logo: "church",
        achievements: [
          "Manage live broadcast productions across platforms like Facebook and YouTube.",
          "Oversee audio and video mixing using OBS Studio and VMix.",
          "Coordinate the media team to ensure smooth operation during services and events."
        ]
      }
    ],
    education: [
      {
        degree: "Software Engineering Student",
        institution: "Saint Austin International Bilingual University of Science and Technology (SAIBUIST)",
        period: "Present",
        achievements: [
          "Focus on creating user-friendly, impactful solutions.",
          "Exploring mobile & web development."
        ]
      }
    ],
    skills: {
      languages: [
        { name: "JavaScript", level: "Advanced", percent: 85 },
        { name: "Python", level: "Intermediate", percent: 75 },
        { name: "PHP", level: "Intermediate", percent: 70 },
        { name: "C", level: "Intermediate", percent: 65 },
        { name: "HTML5 / CSS3", level: "Advanced", percent: 90 }
      ],
      frameworks: [
        { name: "React Native", level: "Advanced", percent: 85 },
        { name: "Flutter", level: "Intermediate", percent: 75 },
        { name: "Node.js / Express.js", level: "Advanced", percent: 80 },
        { name: "Bootstrap", level: "Advanced", percent: 85 }
      ],
      infrastructure: [
        { name: "Supabase / PostgreSQL", level: "Advanced", percent: 80 },
        { name: "MongoDB", level: "Intermediate", percent: 75 },
        { name: "MySQL", level: "Advanced", percent: 85 },
        { name: "REST APIs", level: "Advanced", percent: 85 },
        { name: "Git / Docker", level: "Intermediate", percent: 70 }
      ],
      soft: [
        { name: "Agile Development", level: "Advanced", percent: 85 },
        { name: "API-first Design", level: "Advanced", percent: 80 },
        { name: "Microservices", level: "Intermediate", percent: 70 },
        { name: "Mobile-first", level: "Advanced", percent: 90 }
      ]
    },
    certifications: [
    ],
    projects: [
      {
        id: "linkup",
        title: "LinkUp",
        category: "mobile",
        badge: "Featured",
        desc: "A chat & social platform integrating mobile money for P2P transactions. Designed for youths and entrepreneurs to connect and transact seamlessly.",
        features: ["Integrated chat system", "P2P mobile money transactions", "Targeted at youths and entrepreneurs"],
        stack: ["React Native", "Node.js", "Mobile Money API"],
        github: "github.com/chrisbranx",
        demo: "#",
        stats: { stars: 10, forks: 2, commits: 45 }
      },
      {
        id: "qyra",
        title: "Qyra",
        category: "mobile",
        badge: "Featured",
        desc: "Futuristic social media app combining the best features of Instagram, Twitter, and Telegram into one unified platform.",
        features: ["Unified social feed", "Real-time messaging", "Advanced media sharing"],
        stack: ["Flutter", "Dart", "Supabase", "Real-time"],
        github: "github.com/chrisbranx",
        demo: "#",
        stats: { stars: 15, forks: 3, commits: 60 }
      },
      {
        id: "libuconnect",
        title: "LIBU Connect Application",
        category: "web",
        badge: "New",
        desc: "A comprehensive student portal built for schools, offering features such as course registration, grade tracking, timetable management, fee payment status, library access, assignment submissions, announcements, and seamless teacher-student communication.",
        features: ["Course & grade tracking", "Library access & assignment submissions", "Teacher-student communication"],
        stack: ["React Native", "Express.js", "PostgreSQL"],
        github: "github.com/chrisbranx",
        demo: "#",
        stats: { stars: 8, forks: 1, commits: 30 }
      },
      {
        id: "saintaustin",
        title: "Saint Austin's Verification App",
        category: "web",
        badge: "Featured",
        desc: "QR-based guidance and verification system for St. Austin's International University, enabling efficient verification processes and digital navigation.",
        features: ["QR code generation and attribution", "Efficient event ticket verification", "Digital navigation"],
        stack: ["React", "Node.js", "QR Technology"],
        github: "github.com/chrisbranx",
        demo: "#",
        stats: { stars: 12, forks: 2, commits: 50 }
      },
      {
        id: "univhub",
        title: "University Hub",
        category: "web",
        badge: "New",
        desc: "Academic portal for Year 1 students providing easy access to resources, digital library, and teacher-student interaction features.",
        features: ["Year 1 resource access", "Digital library integration", "Interaction features"],
        stack: ["React", "Node.js", "MongoDB"],
        github: "github.com/chrisbranx",
        demo: "#",
        stats: { stars: 5, forks: 0, commits: 20 }
      },
      {
        id: "carko237",
        title: "Carko237",
        category: "web",
        badge: "Featured",
        desc: "A premier online marketplace for Cameroon fashion, enabling buyers and sellers to connect. Shop and sell trendy fashion items with ease.",
        features: ["Fashion marketplace", "Buyer/seller connection", "Trend shopping"],
        stack: ["React", "Node.js", "E-commerce"],
        github: "github.com/chrisbranx",
        demo: "#",
        stats: { stars: 20, forks: 5, commits: 80 }
      }
    ],
    testimonials: [
    ]
  },
  fr: {
    name: "Chris Brandon",
    title: "Étudiant en Génie Logiciel | Futur Développeur Full-Stack",
    titles: ["crée des apps mobiles", "écris du code propre", "conçois des expériences", "résous des vrais problèmes"],
    availability: "Ouvert à la collaboration",
    location: "SAIBUIST",
    email: "chrisbranx21@gmail.com",
    phone: "+237 688 104 091",
    github: "github.com/chrisbranx",
    linkedin: "linkedin.com/in/brandon-funi",
    about: "Je suis Chris Brandon, un futur ingénieur logiciel étudiant actuellement à la Saint Austin International Bilingual University of Science and Technology (SAIBUIST). Passionné par l'innovation et la technologie, je me spécialise dans le développement d'applications mobiles, le développement web et la création de solutions numériques qui répondent à des défis réels.\n\nAu-delà de mes études, je sers de Délégué à la Communication pour l'ensemble de l'université depuis novembre 2024. Je contribue également à ma communauté en tant que Responsable Média de mon église, gérant les diffusions en direct sur des plateformes comme Facebook et YouTube.",
    experience: [
      {
        role: "Stagiaire & Chef de Groupe — Développeur Full-Stack",
        company: "MINPOSTEL (Ministère des Postes et Télécommunications, Cameroun)",
        period: "18 Fév – 8 Mar 2025",
        startDate: "2025-02-18",
        endDate: "2025-03-08",
        logo: "minpostel",
        achievements: [
          "Chef de groupe et responsable de toute l'équipe scolaire lors du premier stage en Year 1.",
          "Dirigé le développement du système de gestion du personnel du MINPOSTEL.",
          "Renforcé les compétences en leadership, gestion de projet et développement full-stack."
        ]
      },
      {
        role: "Délégué à la Communication",
        company: "Saint Austin International Bilingual University of Science and Technology (SAIBUIST)",
        period: "Nov 2024 - Présent",
        startDate: "2024-11-01",
        endDate: "Present",
        logo: "saibuist",
        achievements: [
          "Sert de liaison principale entre les étudiants et l'administration de l'université.",
          "Facilite la communication claire et efficace des politiques et annonces de l'université.",
          "Organise et gère les canaux de communication pour l'ensemble des étudiants."
        ]
      },
      {
        role: "Responsable Média",
        company: "Église Locale",
        period: "Présent",
        startDate: "2023-01-01",
        endDate: "Present",
        logo: "church",
        achievements: [
          "Gère les productions de diffusion en direct sur des plateformes comme Facebook et YouTube.",
          "Supervise le mixage audio et vidéo à l'aide de OBS Studio et VMix.",
          "Coordonne l'équipe média pour assurer le bon déroulement des services et événements."
        ]
      }
    ],
    education: [
      {
        degree: "Étudiant en Génie Logiciel",
        institution: "Saint Austin International Bilingual University of Science and Technology (SAIBUIST)",
        period: "Présent",
        achievements: [
          "Conception de solutions conviviales et percutantes.",
          "Exploration du développement mobile et web."
        ]
      }
    ],
    skills: {
      languages: [
        { name: "JavaScript", level: "Avancé", percent: 85 },
        { name: "Python", level: "Intermédiaire", percent: 75 },
        { name: "PHP", level: "Intermédiaire", percent: 70 },
        { name: "C", level: "Intermédiaire", percent: 65 },
        { name: "HTML5 / CSS3", level: "Avancé", percent: 90 }
      ],
      frameworks: [
        { name: "React Native", level: "Avancé", percent: 85 },
        { name: "Flutter", level: "Intermédiaire", percent: 75 },
        { name: "Node.js / Express.js", level: "Avancé", percent: 80 },
        { name: "Bootstrap", level: "Avancé", percent: 85 }
      ],
      infrastructure: [
        { name: "Supabase / PostgreSQL", level: "Avancé", percent: 80 },
        { name: "MongoDB", level: "Intermédiaire", percent: 75 },
        { name: "MySQL", level: "Avancé", percent: 85 },
        { name: "REST APIs", level: "Avancé", percent: 85 },
        { name: "Git / Docker", level: "Intermédiaire", percent: 70 }
      ],
      soft: [
        { name: "Développement Agile", level: "Avancé", percent: 85 },
        { name: "Conception API-first", level: "Avancé", percent: 80 },
        { name: "Microservices", level: "Intermédiaire", percent: 70 },
        { name: "Mobile-first", level: "Avancé", percent: 90 }
      ]
    },
    certifications: [
    ],
    projects: [
      {
        id: "linkup",
        title: "LinkUp",
        category: "mobile",
        badge: "Vedette",
        desc: "Une plateforme sociale et de chat intégrant l'argent mobile pour les transactions P2P. Conçu pour les jeunes et les entrepreneurs pour se connecter et effectuer des transactions de manière transparente.",
        features: ["Système de chat intégré", "Transactions P2P mobile money", "Ciblé sur les jeunes et entrepreneurs"],
        stack: ["React Native", "Node.js", "API Mobile Money"],
        github: "github.com/chrisbranx",
        demo: "#",
        stats: { stars: 10, forks: 2, commits: 45 }
      },
      {
        id: "qyra",
        title: "Qyra",
        category: "mobile",
        badge: "Vedette",
        desc: "Application de médias sociaux futuriste combinant les meilleures fonctionnalités d'Instagram, Twitter et Telegram en une seule plateforme unifiée.",
        features: ["Fil d'actualité unifié", "Messagerie en temps réel", "Partage média avancé"],
        stack: ["Flutter", "Dart", "Supabase", "Temps réel"],
        github: "github.com/chrisbranx",
        demo: "#",
        stats: { stars: 15, forks: 3, commits: 60 }
      },
      {
        id: "libuconnect",
        title: "Application LIBU Connect",
        category: "web",
        badge: "Nouveau",
        desc: "Un portail étudiant complet conçu pour les écoles, offrant des fonctionnalités telles que l'inscription aux cours, le suivi des notes, la gestion des horaires, l'accès à la bibliothèque, et une communication transparente.",
        features: ["Suivi des cours et notes", "Accès bibliothèque", "Communication professeur-étudiant"],
        stack: ["React Native", "Express.js", "PostgreSQL"],
        github: "github.com/chrisbranx",
        demo: "#",
        stats: { stars: 8, forks: 1, commits: 30 }
      },
      {
        id: "saintaustin",
        title: "App de Vérification Saint Austin",
        category: "web",
        badge: "Vedette",
        desc: "Système d'orientation et de vérification basé sur QR pour l'Université Internationale St. Austin, permettant des processus de vérification efficaces.",
        features: ["Génération de code QR", "Vérification efficace de billets", "Navigation numérique"],
        stack: ["React", "Node.js", "Technologie QR"],
        github: "github.com/chrisbranx",
        demo: "#",
        stats: { stars: 12, forks: 2, commits: 50 }
      },
      {
        id: "univhub",
        title: "University Hub",
        category: "web",
        badge: "Nouveau",
        desc: "Portail académique pour les étudiants de première année offrant un accès facile aux ressources, à la bibliothèque numérique et aux fonctionnalités d'interaction.",
        features: ["Accès aux ressources de 1ère année", "Intégration de la bibliothèque numérique", "Interaction professeur-étudiant"],
        stack: ["React", "Node.js", "MongoDB"],
        github: "github.com/chrisbranx",
        demo: "#",
        stats: { stars: 5, forks: 0, commits: 20 }
      },
      {
        id: "carko237",
        title: "Carko237",
        category: "web",
        badge: "Vedette",
        desc: "Une place de marché en ligne de premier plan pour la mode camerounaise, permettant aux acheteurs et vendeurs de se connecter.",
        features: ["Marketplace de mode", "Connexion acheteur/vendeur", "Achat tendance"],
        stack: ["React", "Node.js", "E-commerce"],
        github: "github.com/chrisbranx",
        demo: "#",
        stats: { stars: 20, forks: 5, commits: 80 }
      }
    ],
    testimonials: [
    ]
  }
};

// Also export the translation strings for structural layout items
const textTranslations = {
  en: {
    subtitle: "Software Engineering Student \u2022 Cameroon-based",
    navAbout: "About",
    navProjects: "Projects",
    navSkills: "Skills",
    navExperience: "Experience",
    navContact: "Contact",
    navAdmin: "Insights",
    availabilityText: "Let's Collaborate!",
    employedText: "Currently Employed",
    hireMe: "Say Hello",
    viewProjects: "View My Work",
    aboutTitle: "About Me",
    projectsTitle: "Things I've Built",
    skillsTitle: "Technical Skills",
    experienceTitle: "Where I've Been",
    contactTitle: "Let's Create Something",
    terminalBtn: "Terminal Mode",
    normalModeBtn: "Portfolio Mode",
    musicOn: "Ambient: ON",
    musicOff: "Ambient: OFF",
    all: "All",
    web: "Web Apps",
    infrastructure: "IT & Infrastructure",
    mobile: "Mobile Apps",
    ai: "AI & Tools",
    viewDemo: "Live Demo",
    githubRepo: "GitHub Repo",
    featuredBadge: "Featured",
    newBadge: "New",
    formName: "Your name",
    formEmail: "your.email@example.com",
    formMsg: "Your message...",
    formSend: "Send Message",
    formSuccess: "Thank you! Your message has been logged successfully.",
    chatbotTitle: "Chris's Virtual AI",
    chatbotOnline: "Online & Ready",
    chatbotPlaceholder: "Ask me about Chris's skills, experience...",
    chatbotSend: "Send",
    recruiterModeBtn: "Recruiter Summary",
    downloadCV: "Download CV",
    exportTranscript: "Export Chat Log",
    visitorStats: "Live Portfolio Insights",
    views: "Total Views",
    chats: "Conversations Started",
    clicks: "Clicks Logged",
    popularQuestions: "Top User Inquiries",
    heatmapTitle: "Click Coordinate Matrix (Heatmap Simulator)",
    easterEggPrompt: "Try typing 'sudo' on your keyboard for system admin credentials...",
    backToPortfolio: "Exit Terminal",
    snippets: "Code Snippets",
    activity: "Contribution Activity"
  },
  fr: {
    subtitle: "\u00C9tudiant en G\u00E9nie Logiciel \u2022 Bas\u00E9 au Cameroun",
    navAbout: "À Propos",
    navProjects: "Projets",
    navSkills: "Compétences",
    navExperience: "Parcours",
    navContact: "Contact",
    navAdmin: "Données",
    availabilityText: "Ouvert à la collaboration!",
    employedText: "Actuellement employé",
    hireMe: "Dire Bonjour",
    viewProjects: "Voir mon travail",
    aboutTitle: "À Propos de Moi",
    projectsTitle: "Mes Réalisations",
    skillsTitle: "Compétences Techniques",
    experienceTitle: "Mon Parcours",
    contactTitle: "Créons Quelque Chose",
    terminalBtn: "Mode Terminal",
    normalModeBtn: "Mode Portfolio",
    musicOn: "Ambiance: ACTIVE",
    musicOff: "Ambiance: INACTIVE",
    all: "Tous",
    web: "Applications Web",
    infrastructure: "Réseau & Infra",
    mobile: "Applications Mobiles",
    ai: "IA & Outils",
    viewDemo: "Démo Live",
    githubRepo: "Dépôt GitHub",
    featuredBadge: "Vedette",
    newBadge: "Nouveau",
    formName: "Votre nom",
    formEmail: "votre.email@exemple.com",
    formMsg: "Votre message...",
    formSend: "Envoyer le Message",
    formSuccess: "Merci! Votre message a été enregistré avec succès.",
    chatbotTitle: "IA Virtuelle de Chris",
    chatbotOnline: "En ligne & Prêt",
    chatbotPlaceholder: "Posez des questions sur les compétences de Chris...",
    chatbotSend: "Envoyer",
    recruiterModeBtn: "Résumé Recruteur",
    downloadCV: "Télécharger CV",
    exportTranscript: "Exporter la Conversation",
    visitorStats: "Métriques du Portfolio",
    views: "Vues Totales",
    chats: "Conversations Initialisées",
    clicks: "Clics Enregistrés",
    popularQuestions: "Questions Populaires",
    heatmapTitle: "Matrice de Coordonnées (Simulateur de Clics)",
    easterEggPrompt: "Essayez de taper 'sudo' sur votre clavier pour le mode admin...",
    backToPortfolio: "Quitter le Terminal",
    snippets: "Code Snippets",
    activity: "Activité de Contribution"
  }
};

// Tech stack icons for marquee & floating display
const techIcons = [
  { name: "React", color: "#61DAFB", initials: "R" },
  { name: "React Native", color: "#61DAFB", initials: "RN" },
  { name: "Node.js", color: "#339933", initials: "N" },
  { name: "Python", color: "#3776AB", initials: "Py" },
  { name: "JavaScript", color: "#F7DF1E", initials: "JS" },
  { name: "TypeScript", color: "#3178C6", initials: "TS" },
  { name: "Flutter", color: "#02569B", initials: "Fl" },
  { name: "Dart", color: "#0175C2", initials: "D" },
  { name: "MongoDB", color: "#47A248", initials: "M" },
  { name: "PostgreSQL", color: "#4169E1", initials: "PG" },
  { name: "MySQL", color: "#4479A1", initials: "SQL" },
  { name: "Docker", color: "#2496ED", initials: "D" },
  { name: "Git", color: "#F05032", initials: "G" },
  { name: "Supabase", color: "#3ECF8E", initials: "SB" },
  { name: "Express.js", color: "#666", initials: "Ex" },
  { name: "Bootstrap", color: "#7952B3", initials: "B" },
  { name: "PHP", color: "#777BB4", initials: "P" },
  { name: "C", color: "#A8B9CC", initials: "C" },
  { name: "OBS Studio", color: "#302E31", initials: "OBS" },
  { name: "CSS3", color: "#1572B6", initials: "CSS" }
];

// Code snippets for showcase
const codeSnippets = [
  {
    filename: "api/auth.middleware.ts",
    language: "typescript",
    code: `const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('No token provided');

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};`
  },
  {
    filename: "components/ProjectCard.tsx",
    language: "tsx",
    code: `interface ProjectCardProps {
  title: string;
  description: string;
  stack: string[];
  github: string;
  stats: { stars: number; forks: number };
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title, description, stack, github, stats
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="project-card"
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <TechBadges items={stack} />
      <h3>{title}</h3>
      <p>{description}</p>
      <GitStats stars={stats.stars} forks={stats.forks} />
    </motion.div>
  );
};`
  },
  {
    filename: "utils/helpers.py",
    language: "python",
    code: `def calculate_duration(start_date: str, end_date: str) -> str:
    start = datetime.fromisoformat(start_date)
    end = datetime.now() if end_date == "Present" \
           else datetime.fromisoformat(end_date)

    months = (end.year - start.year) * 12 + \
             end.month - start.month
    years, months = divmod(months, 12)

    parts = []
    if years: parts.append(f"\u007byears}y")
    if months: parts.append(f"\u007bmonths}m")
    return " ".join(parts)`
  },
  {
    filename: "database/schema.sql",
    language: "sql",
    code: `CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  stack TEXT[],
  stars INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);`
  }
];

// Simulated GitHub contribution data (last 20 weeks)
const contributionData = Array.from({ length: 140 }, () =>
  Math.floor(Math.random() * 5)
);

