export const missions = [
  {
    id: "genesis-command",
    number: 1,
    title: "Reach Engineering Command",
    objective: "Land at Identity Constellation",
    targetZoneId: "about",
    completionType: "land",
    xp: 500,
    achievement: {
      id: "first-contact",
      title: "First Contact",
      description: "Reached Engineering Command."
    }
  },
  {
    id: "project-signal",
    number: 2,
    title: "Locate the Project World",
    objective: "Discover Project Earth",
    targetZoneId: "projects",
    completionType: "discover",
    xp: 350,
    achievement: {
      id: "signal-decoder",
      title: "Signal Decoder",
      description: "Identified the first unknown destination."
    }
  },
  {
    id: "project-landing",
    number: 3,
    title: "Enter Project Earth",
    objective: "Land at Project Earth",
    targetZoneId: "projects",
    completionType: "land",
    xp: 600,
    achievement: {
      id: "project-explorer",
      title: "Project Explorer",
      description: "Entered the central engineering project world."
    }
  },
  {
    id: "capability-scan",
    number: 4,
    title: "Map the Capability Nexus",
    objective: "Discover Capability Nexus",
    targetZoneId: "capabilities",
    completionType: "discover",
    xp: 400,
    achievement: {
      id: "systems-mapper",
      title: "Systems Mapper",
      description: "Mapped the multidisciplinary capability network."
    }
  },
  {
    id: "journey-landing",
    number: 5,
    title: "Trace the Engineering Journey",
    objective: "Discover and land at Journey Moon",
    targetZoneId: "journey",
    completionType: "land",
    xp: 650,
    achievement: {
      id: "timeline-navigator",
      title: "Timeline Navigator",
      description: "Reached the education and journey archive."
    }
  },
  {
    id: "source-access",
    number: 6,
    title: "Access the Source Archive",
    objective: "Discover Source Code Satellite",
    targetZoneId: "github",
    completionType: "discover",
    xp: 450,
    achievement: {
      id: "source-linked",
      title: "Source Linked",
      description: "Unlocked the repository and release archive."
    }
  },
  {
    id: "ees-gateway",
    number: 7,
    title: "Reach the EES Gateway",
    objective: "Discover and land at the EES Gateway",
    targetZoneId: "ees",
    completionType: "land",
    xp: 1000,
    achievement: {
      id: "genesis-complete",
      title: "Genesis Complete",
      description: "Completed the first EES exploration campaign."
    }
  }
];
