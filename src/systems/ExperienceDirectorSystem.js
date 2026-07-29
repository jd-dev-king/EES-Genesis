export class ExperienceDirectorSystem {
  constructor({
    adaptiveInterfaceSystem,
    interfaceManager
  }) {
    this.adaptiveInterface =
      adaptiveInterfaceSystem;

    this.interface =
      interfaceManager;

    this.storageKey =
      "ees-experience-director-v1";

    this.profile =
      "guided";

    this.motionLevel =
      "balanced";

    this.guidanceLevel =
      "standard";

    this.started = false;

    this.profiles = {
      guided: {
        label: "GUIDED JOURNEY",
        description:
          "Balanced guidance, mission support, discovery intelligence, and destination context.",
        visiblePanels: [
          "flight-status",
          "mission-command",
          "discovery-protocol",
          "aura-operations",
          "facility-operations",
          "destination-command"
        ],
        collapsedPanels: [],
        motion: "balanced",
        guidance: "standard"
      },

      recruiter: {
        label: "RECRUITER REVIEW",
        description:
          "Prioritizes professional identity, project evidence, career journey, and destination context.",
        visiblePanels: [
          "flight-status",
          "aura-operations",
          "destination-command",
          "facility-operations"
        ],
        collapsedPanels: [
          "flight-status"
        ],
        motion: "balanced",
        guidance: "minimal"
      },

      explorer: {
        label: "ENGINEERING EXPLORER",
        description:
          "Enables complete telemetry, missions, scanner intelligence, discoveries, and operational guidance.",
        visiblePanels: [
          "flight-status",
          "mission-command",
          "discovery-protocol",
          "aura-operations",
          "facility-operations",
          "destination-command"
        ],
        collapsedPanels: [],
        motion: "full",
        guidance: "high"
      },

      focus: {
        label: "FOCUS MODE",
        description:
          "Reduces interface density for uninterrupted flight and direct destination exploration.",
        visiblePanels: [
          "flight-status"
        ],
        collapsedPanels: [
          "flight-status"
        ],
        motion: "reduced",
        guidance: "minimal"
      }
    };
  }

  start() {
    if (this.started) return;

    this.started = true;

    this.restore();

    this.interface.initializeExperienceDirector({
      profile:
        this.profile,
      motionLevel:
        this.motionLevel,
      guidanceLevel:
        this.guidanceLevel,
      profiles:
        this.profiles
    });

    this.applyConfiguration(
      false
    );
  }

  setProfile(profileId) {
    const profile =
      this.profiles[profileId];

    if (!profile) return;

    this.profile =
      profileId;

    this.motionLevel =
      profile.motion;

    this.guidanceLevel =
      profile.guidance;

    this.applyConfiguration(
      true
    );

    this.save();
  }

  setMotionLevel(level) {
    if (
      ![
        "full",
        "balanced",
        "reduced"
      ].includes(level)
    ) {
      return;
    }

    this.motionLevel =
      level;

    this.applyMotionLevel();
    this.refreshInterface();
    this.save();
  }

  setGuidanceLevel(level) {
    if (
      ![
        "high",
        "standard",
        "minimal"
      ].includes(level)
    ) {
      return;
    }

    this.guidanceLevel =
      level;

    this.applyGuidanceLevel();
    this.refreshInterface();
    this.save();
  }

  applyConfiguration(
    announce
  ) {
    const profile =
      this.profiles[
        this.profile
      ];

    const visibleSet =
      new Set(
        profile.visiblePanels
      );

    this.adaptiveInterface.panels.forEach(
      (panel, id) => {
        this.adaptiveInterface.setPanelVisible(
          id,
          visibleSet.has(id)
        );

        const shouldCollapse =
          profile.collapsedPanels.includes(
            id
          );

        const isCollapsed =
          panel.element.classList.contains(
            "is-collapsed"
          );

        if (
          shouldCollapse !==
          isCollapsed
        ) {
          this.adaptiveInterface.toggleCollapse(
            id
          );
        }
      }
    );

    this.applyMotionLevel();
    this.applyGuidanceLevel();
    this.refreshInterface();

    if (announce) {
      this.interface.showGuide(
        "Experience Director",
        `${profile.label} is active. ${profile.description}`
      );
    }
  }

  applyMotionLevel() {
    const root =
      document.documentElement;

    root.dataset.motionLevel =
      this.motionLevel;

    root.classList.toggle(
      "ees-motion-reduced",
      this.motionLevel ===
        "reduced"
    );

    root.classList.toggle(
      "ees-motion-balanced",
      this.motionLevel ===
        "balanced"
    );
  }

  applyGuidanceLevel() {
    const root =
      document.documentElement;

    root.dataset.guidanceLevel =
      this.guidanceLevel;

    root.classList.toggle(
      "ees-guidance-minimal",
      this.guidanceLevel ===
        "minimal"
    );

    root.classList.toggle(
      "ees-guidance-high",
      this.guidanceLevel ===
        "high"
    );
  }

  refreshInterface() {
    const profile =
      this.profiles[
        this.profile
      ];

    const visibleCount =
      profile.visiblePanels.length;

    this.interface.updateExperienceDirector({
      profile:
        this.profile,
      profileLabel:
        profile.label,
      description:
        profile.description,
      motionLevel:
        this.motionLevel,
      guidanceLevel:
        this.guidanceLevel,
      visibleCount
    });
  }

  save() {
    try {
      window.localStorage.setItem(
        this.storageKey,
        JSON.stringify({
          profile:
            this.profile,
          motionLevel:
            this.motionLevel,
          guidanceLevel:
            this.guidanceLevel
        })
      );
    } catch {
      // Experience profiles remain functional without storage.
    }
  }

  restore() {
    let saved = null;

    try {
      saved =
        JSON.parse(
          window.localStorage.getItem(
            this.storageKey
          ) || "null"
        );
    } catch {
      saved = null;
    }

    if (
      saved?.profile &&
      this.profiles[
        saved.profile
      ]
    ) {
      this.profile =
        saved.profile;
    }

    if (
      [
        "full",
        "balanced",
        "reduced"
      ].includes(
        saved?.motionLevel
      )
    ) {
      this.motionLevel =
        saved.motionLevel;
    }

    if (
      [
        "high",
        "standard",
        "minimal"
      ].includes(
        saved?.guidanceLevel
      )
    ) {
      this.guidanceLevel =
        saved.guidanceLevel;
    }
  }
}
