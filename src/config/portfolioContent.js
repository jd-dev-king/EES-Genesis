export const portfolioContent = {
  about: {
    overview: [
      {
        type: "profile",
        tag: "IDENTITY CORE",
        title: "Jeremiah Lupton",
        description:
          "Engineering and technology professional connecting manufacturing operations, automation, software, data analytics, project leadership, and systems thinking.",
        meta: "Engineering • Technology • Operations",
        stack: ["Engineering Management", "Automation", "Data", "Software"]
      },
      {
        type: "service",
        tag: "SERVICE NODE",
        title: "American Red Cross Duty Officer",
        description:
          "Supports disaster-response coordination by receiving calls and dispatching Disaster Action Team resources across New Jersey.",
        meta: "New Jersey • Since March 2025",
        stack: ["Leadership", "Dispatch", "Incident Coordination"]
      },
      {
        type: "mission",
        tag: "MISSION CORE",
        title: "Build Useful Engineering Systems",
        description:
          "Create practical systems that make complex work understandable, measurable, safer, and easier to operate.",
        meta: "Observe → Analyze → Act",
        stack: ["Systems Thinking", "Continuous Improvement", "Responsible Action"]
      }
    ],
    systems: [
      {
        tag: "LEADERSHIP",
        title: "Engineering Leadership",
        description:
          "Roadmaps, risk awareness, phased delivery, technical communication, and cross-functional execution.",
        stack: ["Project Management", "Engineering Management", "Operations"]
      },
      {
        tag: "TECHNOLOGY",
        title: "Multidisciplinary Technology",
        description:
          "Software, databases, cybersecurity, analytics, simulation, controls, and web-based engineering environments.",
        stack: ["Python", "Java", "R", "MATLAB", "SQL"]
      },
      {
        tag: "IMPROVEMENT",
        title: "Operational Improvement",
        description:
          "Process analysis, KPI design, OEE concepts, root-cause thinking, workflow automation, and decision support.",
        stack: ["Lean", "DMAIC", "OEE", "Analytics"]
      }
    ],
    records: [
      {
        tag: "PROFILE",
        title: "Professional Direction",
        description:
          "Focused on engineering, manufacturing technology, automation, data systems, operational intelligence, and technical leadership."
      },
      {
        tag: "VALUES",
        title: "Working Principles",
        description:
          "Clarity, traceability, safety, useful documentation, measurable improvement, and respectful collaboration."
      },
      {
        tag: "EES",
        title: "Engineering Experience System",
        description:
          "An evolving interactive environment that transforms a portfolio into an explorable engineering ecosystem."
      }
    ],
    links: [
      
      {
        tag: "GITHUB",
        title: "GitHub Profile",
        description: "Browse the complete public repository collection.",
        url: "https://github.com/jd-dev-king",
        action: "Open GitHub"
      }
    ]
  },

  projects: {
    overview: [
      {
        type: "project",
        tag: "MANUFACTURING",
        title: "Manufacturing Operations Intelligence Automation",
        description:
          "R-based operational reporting pipeline with KPI generation, dashboards, automation logs, scheduled execution, and manufacturing improvement analysis.",
        meta: "R • Analytics • Automation",
        stack: ["R", "Shiny", "GitHub Actions", "DMAIC"],
        url: "https://github.com/jd-dev-king/Manufacturing-Operations-Intelligence-Automation",
        action: "View Repository"
      },
      {
        type: "project",
        tag: "PHARMA DATA NEXUS",
        title: "Pharma Data Nexus",
        description:
          "Immersive 3D pharmaceutical data environment presenting cGMP master data, batch records, quality control, equipment calibration, ALCOA+ concepts, and executable SQL workflows.",
        meta: "PostgreSQL • SQL • Three.js • cGMP",
        stack: ["PostgreSQL", "pgAdmin", "SQL", "Three.js", "ALCOA+"],
        repositoryUrl:
          "https://github.com/jd-dev-king/Pharma-Data-Nexus",
        liveUrl:
          "https://jd-dev-king.github.io/Pharma-Data-Nexus/",
        url:
          "https://jd-dev-king.github.io/Pharma-Data-Nexus/",
        action: "Launch 3D Data Experience"
      },
      {
        type: "project",
        tag: "ANALYTICS",
        title: "Manufacturing Asset Health Analytics",
        description:
          "Sensor and machine analytics environment using PostgreSQL and R to investigate cycle-time anomalies and equipment health.",
        meta: "PostgreSQL • R • Predictive Analytics",
        stack: ["SQL", "RStudio", "Anomaly Detection"]
      },
      {
        type: "project",
        tag: "SQL STUDIO",
        title: "Serverless SQL Studio",
        description:
          "Browser-based SQL IDE using DuckDB-Wasm, Monaco Editor, and ECharts for local CSV and Parquet analysis without a backend server.",
        meta: "DuckDB-Wasm • Monaco • ECharts",
        stack: ["JavaScript", "Vite", "SQL", "WebAssembly"],
        url: "https://github.com/jd-dev-king/Serverless-SQL-Studio",
        action: "View Repository"
      },
      {
        type: "project",
        tag: "AUTOMATION",
        title: "3D Parking PLC Simulator",
        description:
          "Browser-based 3D parking PLC simulator with a live scan cycle, animated barriers and vehicles, parking occupancy logic, HMI controls, interlocks, diagnostics, and interactive ladder/FBD views.",
        meta: "Three.js • PLC • HMI • v2.0.0",
        stack: ["Three.js", "JavaScript", "OpenPLC", "HMI"],
        repositoryUrl:
          "https://github.com/jd-dev-king/Car-Parking-Lot-Barrier-Controller",
        liveUrl:
          "https://jd-dev-king.github.io/Car-Parking-Lot-Barrier-Controller/",
        url:
          "https://jd-dev-king.github.io/Car-Parking-Lot-Barrier-Controller/",
        action: "Launch 3D Simulator"
      },
      {
        type: "project",
        tag: "AI",
        title: "Smart Assistant AI",
        description:
          "Desktop and browser assistant concepts combining conversational tools, persistent memory, voice, utilities, local AI modes, and PWA deployment.",
        meta: "Python • JavaScript • PWA",
        stack: ["Python", "Tkinter", "JavaScript", "AI"]
      },
      {
        type: "project",
        tag: "NLP",
        title: "NeuralBrief Text Summarizer",
        description:
          "Python and Flask text summarization application with a dedicated GitHub Pages interface and graph-based NLP processing.",
        meta: "Python • Flask • NLP",
        stack: ["Flask", "Gensim", "NetworkX"],
        url: "https://github.com/jd-dev-king/NeuralBrief-Text-Summarizer",
        action: "View Repository"
      },
      {
        type: "project",
        tag: "SIMULATION",
        title: "RC Circuit Transient Response Simulator",
        description:
          "MATLAB simulation and interactive application for capacitor charging, discharging, time constants, and transient-response visualization.",
        meta: "MATLAB • App Designer",
        stack: ["MATLAB", "Simulation", "Engineering Analysis"],
        url: "https://github.com/jd-dev-king/RC-Circuit-Transient-Response-Simulator",
        action: "View Repository"
      },
      {
        type: "project",
        tag: "JAVA",
        title: "Trivia Madness",
        description:
          "Java Swing trivia application with Open Trivia DB integration, SQLite persistence, difficulty selection, scoring, and leaderboards.",
        meta: "Java • Swing • SQLite",
        stack: ["Java", "Maven", "SQLite", "REST API"],
        url: "https://github.com/jd-dev-king/Trivia-Madness-Game",
        action: "View Repository"
      },
      {
        type: "project",
        tag: "GIT TRAINING",
        title: "GitSafe Practice Lab",
        description:
          "Live interactive Git training demo with simulated remotes, teammate updates, rejected pushes, merge conflicts, recovery workflows, and guided command-line practice. The complete hosted user experience is planned for Railway.",
        meta: "Git • Python • Flask • Live Demo",
        stack: ["Git", "Python", "Flask", "Developer Education"],
        repositoryUrl:
          "https://github.com/jd-dev-king/GitSafe-Practice-Lab",
        liveUrl:
          "https://jd-dev-king.github.io/GitSafe-Practice-Lab/",
        url:
          "https://jd-dev-king.github.io/GitSafe-Practice-Lab/",
        action: "Launch Interactive Lab"
      }
    ],
    systems: [
      {
        tag: "MANUFACTURING",
        title: "Operations Intelligence Cluster",
        description:
          "Automated reporting, KPI analytics, asset health, cGMP data, process improvement, and operational dashboards.",
        stack: ["OEE", "KPI", "ETL", "cGMP"]
      },
      {
        tag: "AUTOMATION",
        title: "Controls and HMI Cluster",
        description:
          "PLC sequencing, control logic, simulated machines, operator interfaces, and future robotic integration.",
        stack: ["PLC", "HMI", "Modbus", "Automation"]
      },
      {
        tag: "SOFTWARE",
        title: "Application Engineering Cluster",
        description:
          "Desktop, browser, API, database, analytics, and deployment projects across multiple languages and frameworks.",
        stack: ["Python", "Java", "JavaScript", "R", "SQL"]
      }
    ],
    records: [
      {
        tag: "DEPLOYMENT",
        title: "GitHub Pages Applications",
        description:
          "Multiple projects include live documentation sites and browser demonstrations deployed through GitHub Pages."
      },
      {
        tag: "RELEASES",
        title: "Versioned Project Releases",
        description:
          "Repositories use tagged releases, release descriptions, README documentation, screenshots, and iterative version planning."
      },
      
      {
        tag: "SOURCE",
        title: "GitHub Repository Network",
        description: "Browse all public engineering and software repositories.",
        url: "https://github.com/jd-dev-king",
        action: "Browse Repositories"
      }
    ]
  },

  capabilities: {
    overview: [
      {
        tag: "ENGINEERING",
        title: "Engineering Management",
        description:
          "Systems planning, lifecycle thinking, process design, risk evaluation, technical decision support, and project delivery.",
        stack: ["Systems", "Risk", "Lifecycle", "Planning"]
      },
      {
        tag: "AUTOMATION",
        title: "Automation and Controls",
        description:
          "PLC logic, sequencing, HMI concepts, industrial communication, manufacturing workflows, and control-system prototyping.",
        stack: ["OpenPLC", "ST", "HMI", "Modbus"]
      },
      {
        tag: "DATA",
        title: "Data and Analytics",
        description:
          "SQL databases, ETL workflows, statistical analysis, visualization, KPI systems, and operational intelligence.",
        stack: ["PostgreSQL", "R", "Python", "DuckDB", "ECharts"]
      },
      {
        tag: "SOFTWARE",
        title: "Software Development",
        description:
          "Frontend, backend, desktop, database, API, PWA, and deployment experience across engineering-focused applications.",
        stack: ["Python", "Java", "JavaScript", "Flask", "Vite"]
      },
      {
        tag: "QUALITY",
        title: "Quality and Compliance",
        description:
          "cGMP-oriented data structures, ALCOA+ principles, traceability, documentation, mock quality systems, and process analysis.",
        stack: ["cGMP", "ALCOA+", "Traceability", "SOP"]
      },
      {
        tag: "LEADERSHIP",
        title: "Project and Operational Leadership",
        description:
          "Cross-functional coordination, roadmap development, technical communication, incident support, and continuous improvement.",
        stack: ["PM", "Operations", "Communication", "Improvement"]
      }
    ],
    systems: [
      {
        tag: "LANGUAGES",
        title: "Programming Systems",
        description: "Python, Java, JavaScript, R, MATLAB, SQL, HTML, CSS, and PLC Structured Text.",
        stack: ["Python", "Java", "JavaScript", "R", "MATLAB", "SQL"]
      },
      {
        tag: "PLATFORMS",
        title: "Engineering Platforms",
        description: "PostgreSQL, pgAdmin, RStudio, MATLAB Online, OpenPLC, GitHub, Docker, Figma, and IDE workflows.",
        stack: ["PostgreSQL", "Docker", "GitHub", "MATLAB", "OpenPLC"]
      },
      {
        tag: "DELIVERY",
        title: "Deployment Systems",
        description: "Git workflows, GitHub Pages, GitHub Actions, static builds, release tags, and project documentation.",
        stack: ["Git", "GitHub Actions", "Pages", "Vite"]
      }
    ],
    records: [
      {
        tag: "METHOD",
        title: "Analysis Method",
        description: "Translate a problem into measurable inputs, system behavior, evidence, options, and actionable recommendations."
      },
      {
        tag: "DESIGN",
        title: "Interface Philosophy",
        description: "Build interfaces that make complex engineering systems easier to understand and operate."
      },
      {
        tag: "GROWTH",
        title: "Continuous Expansion",
        description: "New tools and disciplines are incorporated into EES as connected modules rather than isolated demonstrations."
      }
    ],
    links: [
      
    ]
  },

  journey: {
    overview: [
      {
        tag: "2024+",
        title: "Ph.D. Technology Management",
        description:
          "Engineering Management specialization at National University in San Diego, California. Program started in 2024 and is currently in progress.",
        meta: "National University • In Progress",
        stack: ["Technology Management", "Engineering Management"]
      },
      {
        tag: "2023",
        title: "M.S. Information Technology",
        description:
          "Project Management specialization completed through American InterContinental University in September 2023.",
        meta: "American InterContinental University",
        stack: ["Information Technology", "Project Management"]
      },
      {
        tag: "2021",
        title: "B.S. Information Technology",
        description:
          "Security and Assurance specialization completed through American InterContinental University in July 2021.",
        meta: "American InterContinental University",
        stack: ["Information Technology", "Security", "Assurance"]
      },
      {
        tag: "2011",
        title: "A.A. Business Administration",
        description:
          "Criminal Justice concentration completed through American InterContinental University in September 2011.",
        meta: "American InterContinental University",
        stack: ["Business Administration", "Criminal Justice"]
      }
    ],
    systems: [
      {
        tag: "SERVICE",
        title: "American Red Cross",
        description:
          "New Jersey Duty Officer supporting disaster-response dispatch and coordination since March 2025.",
        stack: ["Volunteer Leadership", "Disaster Response", "Coordination"]
      },
      {
        tag: "BUILD",
        title: "Portfolio Development",
        description:
          "An expanding collection of projects across software, analytics, manufacturing, automation, simulation, and engineering systems.",
        stack: ["Applied Learning", "Documentation", "Deployment"]
      },
      {
        tag: "EES",
        title: "EES Evolution",
        description:
          "The portfolio is transitioning into a living, explorable Engineering Experience System with missions, intelligence, simulations, and operations.",
        stack: ["Three.js", "Digital Twins", "AURA", "Game Systems"]
      }
    ],
    records: [
      {
        tag: "ACADEMIC",
        title: "Education Sequence",
        description: "Business foundation → Information Technology → Project Management → Engineering Management."
      },
      {
        tag: "TECHNICAL",
        title: "Project Sequence",
        description: "Desktop software → data systems → automation → simulations → operational intelligence → EES."
      },
      {
        tag: "FUTURE",
        title: "Continued Development",
        description: "The journey remains active through doctoral study, engineering projects, service, and EES research."
      }
    ],
    links: [
      
    ]
  },

  contact: {
    overview: [
      {
        tag: "COLLABORATION",
        title: "Engineering and Technology Opportunities",
        description:
          "Connect regarding engineering systems, manufacturing technology, automation, analytics, software, project leadership, and technical collaboration.",
        stack: ["Engineering", "Automation", "Analytics", "Technology"]
      },
      {
        tag: "RESEARCH",
        title: "Research and Prototype Collaboration",
        description:
          "Discuss EES development, digital twins, operational intelligence, simulation, AI interfaces, and multidisciplinary prototypes.",
        stack: ["EES", "Digital Twins", "AI", "Simulation"]
      },
      
      {
        tag: "GITHUB",
        title: "GitHub Profile",
        description: "Review active repositories before connecting.",
        url: "https://github.com/jd-dev-king",
        action: "Open GitHub"
      }
    ]
  },

  github: {
    overview: [
      {
        tag: "PROFILE",
        title: "jd-dev-king",
        description:
          "Public development profile containing engineering, analytics, automation, AI, simulation, database, and software projects.",
        stack: ["Repositories", "Releases", "Pages", "Documentation"],
        url: "https://github.com/jd-dev-king",
        action: "Open Profile"
      },
      {
        tag: "FEATURED",
        title: "Serverless SQL Studio",
        description: "Browser SQL IDE powered by DuckDB-Wasm, Monaco Editor, ECharts, and Vite.",
        stack: ["DuckDB", "Monaco", "ECharts"],
        url: "https://github.com/jd-dev-king/Serverless-SQL-Studio",
        action: "Open Repository"
      },
      {
        tag: "FEATURED",
        title: "3D Parking PLC Simulator",
        description: "Interactive 3D parking PLC simulation with animated plant behavior, HMI controls, diagnostics, and industrial control logic.",
        stack: ["Three.js", "PLC", "HMI", "Automation"],
        url: "https://github.com/jd-dev-king/Car-Parking-Lot-Barrier-Controller",
        action: "Open Repository"
      },
      {
        tag: "FEATURED",
        title: "NeuralBrief Text Summarizer",
        description: "Flask and NLP summarization project with a GitHub Pages frontend.",
        stack: ["Python", "Flask", "NLP"],
        url: "https://github.com/jd-dev-king/NeuralBrief-Text-Summarizer",
        action: "Open Repository"
      },
      {
        tag: "FEATURED",
        title: "RC Circuit Transient Response Simulator",
        description: "MATLAB transient-response simulation and interactive application.",
        stack: ["MATLAB", "Simulation", "App Designer"],
        url: "https://github.com/jd-dev-king/RC-Circuit-Transient-Response-Simulator",
        action: "Open Repository"
      },
      {
        tag: "FEATURED",
        title: "Manufacturing Operations Intelligence",
        description: "R analytics, automation, dashboards, and manufacturing reporting.",
        stack: ["R", "Shiny", "Actions"],
        url: "https://github.com/jd-dev-king/Manufacturing-Operations-Intelligence-Automation",
        action: "Open Repository"
      }
    ],
    systems: [
      {
        tag: "SOURCE",
        title: "Repository Architecture",
        description: "Source code, README documentation, assets, screenshots, docs sites, and release artifacts."
      },
      {
        tag: "DEPLOY",
        title: "GitHub Pages Network",
        description: "Static portfolio demonstrations and technical project landing pages deployed from repository documentation folders."
      },
      {
        tag: "VERSION",
        title: "Release Management",
        description: "Version tags and release descriptions document major project milestones and fixes."
      }
    ],
    records: [
      {
        tag: "HISTORY",
        title: "Development Timeline",
        description: "Commit histories show iterative problem solving, debugging, feature expansion, and deployment."
      },
      {
        tag: "DOCS",
        title: "Technical Documentation",
        description: "README files explain goals, technology stacks, setup steps, screenshots, and project outcomes."
      }
    ],
    links: [
      {
        tag: "GITHUB",
        title: "Complete Repository Profile",
        description: "Open all public repositories.",
        url: "https://github.com/jd-dev-king",
        action: "Open Profile"
      }
    ]
  },

  ees: {
    overview: [
      {
        tag: "OBSERVE",
        title: "Sensor and Discovery Layer",
        description:
          "Waypoints, multi-mode scanning, hidden objects, collision detection, live telemetry, discoveries, and environmental awareness.",
        stack: ["Scanner", "Telemetry", "Collision", "Discovery"]
      },
      {
        tag: "ANALYZE",
        title: "Intelligence and Simulation Layer",
        description:
          "AURA contextual intelligence, digital twins, mission evaluation, diagnostics, optimization, and engineering decision support.",
        stack: ["AURA", "Digital Twins", "Missions", "Analytics"]
      },
      {
        tag: "ACT",
        title: "Operations and Control Layer",
        description:
          "Autopilot, warp, landing, takeoff, maintenance, recharge, event response, portals, and future autonomous action.",
        stack: ["Autopilot", "Operations", "Robotics", "Control"]
      },
      {
        tag: "VERSE",
        title: "Living Universe Layer",
        description:
          "Autonomous drones, procedural events, routed traffic, collisions, expandable perimeters, and persistent world state.",
        stack: ["Three.js", "Entities", "Events", "Physics"]
      }
    ],
    systems: [
      {
        tag: "CORE",
        title: "EES Core Engine",
        description: "Scene lifecycle, rendering, input, flight, camera, navigation, environment, state, and interface management."
      },
      {
        tag: "MISSION",
        title: "Mission and Progression Engine",
        description: "Deterministic missions, XP, achievements, discovery persistence, and campaign progression."
      },
      {
        tag: "PORTAL",
        title: "Portfolio Portal Network",
        description: "Destination-specific content environments that translate the traditional portfolio into an explorable universe."
      },
      {
        tag: "TWIN",
        title: "Digital Twin Labs",
        description: "Baseline, load, fault, and optimization simulations with persistent run history."
      }
    ],
    records: [
      {
        tag: "GENESIS",
        title: "Genesis Epoch",
        description: "Established flight, navigation, landing, scanning, missions, hidden discoveries, and a living EES Verse."
      },
      {
        tag: "OPERATIONS",
        title: "Engineering Operations",
        description: "Added energy, repairs, recharge, diagnostics, event response, and station services."
      },
      {
        tag: "INTELLIGENCE",
        title: "AURA Intelligence",
        description: "Added local contextual assistance and safe state-aware commands."
      },
      {
        tag: "PORTAL FORGE",
        title: "Portfolio Integration",
        description: "Transforms real portfolio material into destination-specific robotic space terminals."
      }
    ],
    links: [
      
      {
        tag: "SOURCE",
        title: "EES Development Profile",
        description: "Follow EES and related project development on GitHub.",
        url: "https://github.com/jd-dev-king",
        action: "Open GitHub"
      }
    ]
  }
};
