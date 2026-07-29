export class DestinationCommandSystem {
  constructor({
    robot,
    interfaceManager,
    zones
  }) {
    this.robot = robot;
    this.interface = interfaceManager;
    this.zones = zones;
    this.activeZone = null;
    this.elapsed = 0;
    this.lastLanded = false;

    this.profiles = this.createProfiles();
  }

  createProfiles() {
    return {
      about: {
        title: "IDENTITY COMMAND",
        objective:
          "Review leadership, experience, education, and the engineering principles behind EES.",
        systems: [
          "Experience Core",
          "Leadership Archive",
          "Education Registry",
          "Professional Identity Matrix"
        ],
        labels: [
          "EXPERIENCE",
          "IDENTITY LINK",
          "PROFILE STATUS"
        ],
        aura:
          "This facility represents the professional identity and engineering journey behind the system."
      },

      projects: {
        title: "PROJECT OPERATIONS",
        objective:
          "Inspect the active engineering portfolio, application demonstrations, repositories, and deployed systems.",
        systems: [
          "Project Registry",
          "Deployment Network",
          "Repository Link",
          "Demonstration Archive"
        ],
        labels: [
          "PROJECTS",
          "DEPLOYMENTS",
          "SYSTEM HEALTH"
        ],
        aura:
          "Project Earth organizes software, automation, analytics, manufacturing, and engineering demonstrations."
      },

      capabilities: {
        title: "CAPABILITY COMMAND",
        objective:
          "Map technical, operational, leadership, quality, manufacturing, and software capabilities.",
        systems: [
          "Knowledge Graph",
          "Capability Matrix",
          "Engineering Domain Map",
          "Leadership Network"
        ],
        labels: [
          "CAPABILITIES",
          "DOMAIN LINKS",
          "KNOWLEDGE SYNC"
        ],
        aura:
          "Capability Nexus connects engineering knowledge across disciplines instead of presenting isolated skills."
      },

      journey: {
        title: "JOURNEY ARCHIVE",
        objective:
          "Explore the professional timeline from the most recent engineering work through earlier career foundations.",
        systems: [
          "Career Timeline",
          "Education Archive",
          "Volunteer Service Log",
          "Continuous Development"
        ],
        labels: [
          "TIMELINE",
          "MILESTONES",
          "ARCHIVE STATUS"
        ],
        aura:
          "Journey Moon preserves career, education, service, and continuing development in reverse chronological order."
      },

      contact: {
        title: "COMMUNICATIONS COMMAND",
        objective:
          "Establish professional communication links and access approved contact channels.",
        systems: [
          "Email Relay",
          "Professional Network",
          "Resume Transfer",
          "Contact Directory"
        ],
        labels: [
          "CHANNELS",
          "SIGNAL QUALITY",
          "RELAY STATUS"
        ],
        aura:
          "Communications Station provides direct professional contact, resume access, and external network links."
      },

      github: {
        title: "SOURCE CONTROL COMMAND",
        objective:
          "Inspect repositories, source code, release history, demonstrations, and public deployment links.",
        systems: [
          "Repository Index",
          "Commit Stream",
          "Release Archive",
          "Deployment Registry"
        ],
        labels: [
          "REPOSITORIES",
          "COMMITS",
          "SOURCE STATUS"
        ],
        aura:
          "Source Code Satellite continuously indexes the public engineering repository network."
      },

      ees: {
        title: "EES DEVELOPMENT COMMAND",
        objective:
          "Observe the active construction of the Engineering Experience System and its future platform modules.",
        systems: [
          "Genesis Program",
          "JDL Design Language",
          "Platform Architecture",
          "Future Module Registry"
        ],
        labels: [
          "GENESIS PHASE",
          "CONSTRUCTION",
          "GATEWAY STATUS"
        ],
        aura:
          "EES Gateway remains under active development and will eventually connect the portfolio to the larger engineering platform."
      }
    };
  }

  update(delta) {
    this.elapsed += delta;

    const landed = this.robot.isLanded();

    if (!landed) {
      if (this.lastLanded) {
        this.activeZone = null;
        this.interface.closeDestinationCommand();
      }

      this.lastLanded = false;
      return;
    }

    this.lastLanded = true;

    const position = this.robot.getPosition();
    let nearestZone = null;
    let nearestDistance = Infinity;

    this.zones.forEach((zone) => {
      const landingPoint =
        zone.position.clone().add(zone.landingOffset);

      const distance =
        position.distanceTo(landingPoint);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestZone = zone;
      }
    });

    if (!nearestZone) return;

    if (this.activeZone?.id !== nearestZone.id) {
      this.activeZone = nearestZone;
      this.interface.openDestinationCommand(
        nearestZone,
        this.getProfile(nearestZone)
      );
    }

    this.interface.updateDestinationCommandMetrics(
      this.getMetrics(nearestZone)
    );
  }

  getProfile(zone) {
    const keyMap = {
      identity: "about",
      constellation: "about",
      planet: "projects",
      nexus: "capabilities",
      moon: "journey",
      station: "contact",
      satellite: "github",
      gateway: "ees"
    };

    return (
      this.profiles[
        keyMap[zone.visualType] || zone.id
      ] ||
      this.profiles.projects
    );
  }

  getMetrics(zone) {
    const profile = this.getProfile(zone);
    const wave =
      Math.sin(this.elapsed * 0.72) * 2.5;

    const baseMetrics = {
      about: ["25+ YEARS", "VERIFIED", "ACTIVE"],
      projects: ["20+ ACTIVE", "PUBLIC", "NOMINAL"],
      capabilities: ["6 DOMAINS", "CONNECTED", "100%"],
      journey: ["1998–2026", "MAPPED", "CURRENT"],
      contact: ["4 LINKS", "99%", "ONLINE"],
      github: ["20+ REPOS", "LIVE", "SYNCED"],
      ees: ["GENESIS", "ACTIVE", "BUILDING"]
    };

    const key =
      Object.entries(this.profiles).find(
        ([, value]) => value === profile
      )?.[0] || "projects";

    const values =
      baseMetrics[key] ||
      baseMetrics.projects;

    if (key === "contact") {
      return [
        values[0],
        `${Math.round(97 + wave)}%`,
        values[2]
      ];
    }

    if (key === "capabilities") {
      return [
        values[0],
        values[1],
        `${Math.round(97 + wave)}%`
      ];
    }

    return values;
  }
}
