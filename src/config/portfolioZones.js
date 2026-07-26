import * as THREE from "three";

export const portfolioZones = [
  {
    id: "about",
    discoveryOrder: 0,
    initiallyDiscovered: true,
    signalName: "Engineering Command",
    title: "Identity Constellation",
    category: "ABOUT JEREMIAH",
    sectionLabel: "About",
    description:
      "Explore the connected disciplines, values, leadership experience, and engineering mindset behind Jeremiah Lupton's work.",
    position: new THREE.Vector3(-180, 90, -260),
    discoveryRadius: 145,
    approachRadius: 82,
    interactionRadius: 38,
    displayRadius: 22,
    landingRadius: 58,
    landingOffset: new THREE.Vector3(0, 8, 42),
    visualType: "constellation",
    color: 0xa855f7,
    accentColor: 0xe879f9,
    portal: "local",
    records: [
      "Engineering identity profile",
      "Leadership and service record",
      "Professional mission statement"
    ],
    components: [
      { title: "Professional Identity", description: "Engineering, technology leadership, automation, data, and systems thinking.", tag: "IDENTITY" },
      { title: "Leadership Profile", description: "Project management, engineering management, operational coordination, and service.", tag: "LEADERSHIP" },
      { title: "Mission and Values", description: "Build useful systems, solve real problems, and connect technology with responsible action.", tag: "MISSION" },
      { title: "Red Cross Service", description: "Disaster-response dispatch and coordination experience as a New Jersey Duty Officer.", tag: "SERVICE" }
    ],
    projects: [
      { title: "Engineering Leadership", description: "Technology, operations, systems thinking, and continuous improvement." },
      { title: "Multidisciplinary Technology", description: "Automation, data, software, cybersecurity, and engineering management." },
      { title: "American Red Cross", description: "New Jersey Duty Officer supporting disaster-response dispatch and coordination." }
    ]
  },
  {
    id: "projects",
    discoveryOrder: 1,
    initiallyDiscovered: false,
    signalName: "Unknown Signal",
    title: "Project Earth",
    category: "ENGINEERING PROJECTS",
    sectionLabel: "Projects",
    description:
      "The central project world for applied engineering, manufacturing intelligence, automation, AI, simulation, and data systems.",
    position: new THREE.Vector3(0, 38, -220),
    discoveryRadius: 155,
    approachRadius: 88,
    interactionRadius: 42,
    displayRadius: 28,
    landingRadius: 58,
    landingOffset: new THREE.Vector3(0, 8, 42),
    visualType: "planet",
    color: 0x2563eb,
    accentColor: 0x38bdf8,
    portal: "local",
    records: [
      "Manufacturing systems archive",
      "Automation lab projects",
      "AI and data engineering projects"
    ],
    components: [
      { title: "Manufacturing Systems", description: "Operational intelligence, automated reporting, OEE, process improvement, and cGMP data.", tag: "MANUFACTURING" },
      { title: "Automation Lab", description: "PLC logic, parking barrier controls, HMI concepts, and industrial simulations.", tag: "AUTOMATION" },
      { title: "AI Systems", description: "Smart assistants, summarization, local AI concepts, and intelligent interfaces.", tag: "AI" },
      { title: "Data Engineering", description: "ETL pipelines, PostgreSQL systems, SQL analysis, and browser-based analytics.", tag: "DATA" },
      { title: "Engineering Simulation", description: "MATLAB models, RC circuits, asset health, and process analytics.", tag: "SIMULATION" },
      { title: "Software Applications", description: "Python, Java, Flask, R, web applications, and GitHub Pages deployments.", tag: "SOFTWARE" }
    ],
    projects: [
      { title: "Manufacturing Intelligence", description: "Operational analytics, automated reporting, process improvement, and KPI systems." },
      { title: "Automation and Controls", description: "PLC logic, robotic concepts, control interfaces, and industrial simulations." },
      { title: "AI and Data Systems", description: "Intelligent assistants, databases, ETL workflows, visual analytics, and browser tools." }
    ]
  },
  {
    id: "capabilities",
    discoveryOrder: 2,
    initiallyDiscovered: false,
    signalName: "Unknown Signal",
    title: "Capability Nexus",
    category: "TECHNICAL CAPABILITIES",
    sectionLabel: "Capabilities",
    description:
      "A rotating engineering nexus representing the technical and leadership capabilities that power the EES ecosystem.",
    position: new THREE.Vector3(195, 105, -335),
    discoveryRadius: 150,
    approachRadius: 82,
    interactionRadius: 38,
    displayRadius: 26,
    landingRadius: 58,
    landingOffset: new THREE.Vector3(0, 8, 42),
    visualType: "nexus",
    color: 0xf59e0b,
    accentColor: 0xfde68a,
    portal: "local",
    records: [
      "Engineering capability matrix",
      "Software and analytics stack",
      "Quality and compliance capabilities"
    ],
    components: [
      { title: "Engineering Management", description: "Systems planning, risk evaluation, process design, and lifecycle coordination.", tag: "ENGINEERING" },
      { title: "Automation and Controls", description: "PLC logic, control sequencing, HMI design, and manufacturing workflows.", tag: "CONTROLS" },
      { title: "Data and Analytics", description: "SQL, R, Python, visualization, KPI analysis, and operational intelligence.", tag: "ANALYTICS" },
      { title: "Software Development", description: "Frontend, backend, desktop, database, and deployment experience.", tag: "SOFTWARE" },
      { title: "Quality and Compliance", description: "cGMP, ALCOA+, traceability, documentation, and structured quality data.", tag: "QUALITY" },
      { title: "Project Leadership", description: "Roadmaps, phased delivery, technical communication, and cross-functional execution.", tag: "LEADERSHIP" }
    ],
    projects: [
      { title: "Engineering Systems", description: "Simulation, process improvement, system architecture, and lifecycle thinking." },
      { title: "Software and Data", description: "Python, Java, R, MATLAB, SQL, frontend systems, databases, and analytics." },
      { title: "Automation and Operations", description: "PLC controls, manufacturing workflows, cGMP data, and operational leadership." }
    ]
  },
  {
    id: "journey",
    discoveryOrder: 3,
    initiallyDiscovered: false,
    signalName: "Unknown Signal",
    title: "Journey Moon",
    category: "EDUCATION AND JOURNEY",
    sectionLabel: "Journey",
    description:
      "Follow the academic, professional, volunteer, and project milestones that form Jeremiah's engineering journey.",
    position: new THREE.Vector3(-225, 155, -470),
    discoveryRadius: 150,
    approachRadius: 82,
    interactionRadius: 38,
    displayRadius: 27,
    landingRadius: 58,
    landingOffset: new THREE.Vector3(0, 8, 42),
    visualType: "moon",
    color: 0x94a3b8,
    accentColor: 0xf8fafc,
    portal: "local",
    records: [
      "Education timeline",
      "Professional development milestones",
      "EES formation history"
    ],
    components: [
      { title: "Ph.D. Program", description: "Technology Management with an Engineering Management specialization, started in 2024.", tag: "2024+" },
      { title: "Master's Degree", description: "M.S. Information Technology with Project Management, completed September 2023.", tag: "2023" },
      { title: "Bachelor's Degree", description: "B.S. Information Technology with Security and Assurance, completed July 2021.", tag: "2021" },
      { title: "Associate Degree", description: "A.A. Business Administration with Criminal Justice, completed September 2011.", tag: "2011" },
      { title: "Portfolio Evolution", description: "A growing body of engineering, automation, analytics, and software projects.", tag: "BUILD" },
      { title: "EES Pivot", description: "The transition from portfolio presentation to an interactive engineering ecosystem.", tag: "EES" }
    ],
    projects: [
      { title: "Ph.D. Technology Management", description: "Engineering Management specialization at National University, started in 2024." },
      { title: "M.S. Information Technology", description: "Project Management specialization completed in September 2023." },
      { title: "Technology Foundation", description: "B.S. Information Technology and A.A. Business Administration." }
    ]
  },
  {
    id: "contact",
    discoveryOrder: 4,
    initiallyDiscovered: false,
    signalName: "Unknown Signal",
    title: "Communications Station",
    category: "CONTACT AND COLLABORATION",
    sectionLabel: "Contact",
    description:
      "Dock with the communications station to access professional links, collaboration channels, and contact information.",
    position: new THREE.Vector3(95, 180, -565),
    discoveryRadius: 155,
    approachRadius: 86,
    interactionRadius: 40,
    displayRadius: 29,
    landingRadius: 58,
    landingOffset: new THREE.Vector3(0, 8, 42),
    visualType: "station",
    color: 0x0f766e,
    accentColor: 0x2dd4bf,
    portal: "local",
    records: [
      "Professional contact channel",
      "Collaboration request console",
      "Resume and profile access"
    ],
    components: [
      { title: "Professional Contact", description: "Connect regarding engineering, automation, data, systems, and project opportunities.", tag: "CONTACT" },
      { title: "Collaboration", description: "Discuss research, prototypes, EES development, and multidisciplinary technical work.", tag: "COLLAB" },
      { title: "Resume Access", description: "Open the standard portfolio for current resume and professional details.", tag: "RESUME" },
      { title: "Portfolio Bridge", description: "Move between the immersive EES environment and the traditional portfolio.", tag: "BRIDGE" }
    ],
    projects: [
      { title: "Professional Contact", description: "Connect regarding engineering, automation, analytics, and technology leadership." },
      { title: "Collaboration", description: "Discuss project work, research concepts, EES development, or technical partnerships." },
      { title: "Portfolio Access", description: "Return to the standard portfolio for direct navigation and project details." }
    ]
  },
  {
    id: "github",
    discoveryOrder: 5,
    initiallyDiscovered: false,
    signalName: "Unknown Signal",
    title: "Source Code Satellite",
    category: "GITHUB AND REPOSITORIES",
    sectionLabel: "GitHub",
    description:
      "Review source code, documentation, releases, GitHub Pages applications, and the continuing evolution of Jeremiah's technical projects.",
    position: new THREE.Vector3(285, 225, -655),
    discoveryRadius: 145,
    approachRadius: 78,
    interactionRadius: 36,
    displayRadius: 23,
    landingRadius: 58,
    landingOffset: new THREE.Vector3(0, 8, 42),
    visualType: "satellite",
    color: 0x334155,
    accentColor: 0xcbd5e1,
    portal: "local",
    records: [
      "Featured repository catalog",
      "Release history",
      "Live deployment index"
    ],
    components: [
      { title: "Repository Hub", description: "Browse engineering, automation, data, AI, simulation, and software repositories.", tag: "REPOS" },
      { title: "Release Archive", description: "Review versioned releases, documentation, screenshots, and deployment milestones.", tag: "RELEASES" },
      { title: "Live Applications", description: "Open GitHub Pages deployments and working browser-based projects.", tag: "LIVE" },
      { title: "Development History", description: "Track the progression of EES and related technical systems over time.", tag: "HISTORY" }
    ],
    projects: [
      { title: "Featured Repositories", description: "Production-style portfolio projects across engineering, data, automation, and software." },
      { title: "Releases and Documentation", description: "Versioned builds, README documentation, screenshots, demos, and deployment workflows." },
      { title: "Open Development", description: "Track how EES and related engineering projects evolve over time." }
    ]
  },
  {
    id: "ees",
    discoveryOrder: 6,
    initiallyDiscovered: false,
    signalName: "Unknown Signal",
    title: "EES Gateway",
    category: "ENGINEERING EXPLORATION SYSTEM",
    sectionLabel: "EES",
    description:
      "The developing gateway to EES: a future ecosystem for intelligence, simulation, automation, digital twins, robotics, and engineered action.",
    position: new THREE.Vector3(0, 290, -880),
    discoveryRadius: 205,
    approachRadius: 115,
    interactionRadius: 50,
    displayRadius: 35,
    landingRadius: 58,
    landingOffset: new THREE.Vector3(0, 8, 42),
    visualType: "gateway",
    color: 0x7c3aed,
    accentColor: 0x67e8f9,
    portal: "local",
    records: [
      "Observe architecture",
      "Analyze architecture",
      "Act architecture",
      "Digital twin and mission engine roadmap"
    ],
    components: [
      { title: "Observe", description: "Sensors, telemetry, perception, diagnostics, and structured data collection.", tag: "01" },
      { title: "Analyze", description: "AI, simulation, analytics, prediction, optimization, and decision support.", tag: "02" },
      { title: "Act", description: "Automation, robotics, control systems, workflows, and intelligent execution.", tag: "03" },
      { title: "Digital Twins", description: "Interactive models of engineering systems, operations, and real-world environments.", tag: "TWIN" },
      { title: "Mission Engine", description: "Objectives, waypoints, decision logic, state tracking, and autonomous behaviors.", tag: "MISSION" },
      { title: "Command Layer", description: "A future interface for orchestrating EES modules, agents, data, and actions.", tag: "COMMAND" }
    ],
    projects: [
      { title: "Observe", description: "Sensors, telemetry, diagnostics, perception, and structured data collection." },
      { title: "Analyze", description: "AI, simulation, analytics, prediction, optimization, and decision support." },
      { title: "Act", description: "Automation, robotics, control systems, workflows, and intelligent execution." }
    ]
  }
];
