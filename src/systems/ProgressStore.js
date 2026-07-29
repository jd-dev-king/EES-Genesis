export class ProgressStore {
  constructor(storageKey = "ees-genesis-progress-v1") {
    this.storageKey = storageKey;
  }

  load() {
    try {
      const stored = window.localStorage.getItem(this.storageKey);

      if (!stored) {
        return this.defaultState();
      }

      return {
        ...this.defaultState(),
        ...JSON.parse(stored)
      };
    } catch (error) {
      console.warn("Unable to load EES progress:", error);
      return this.defaultState();
    }
  }

  save(state) {
    try {
      window.localStorage.setItem(
        this.storageKey,
        JSON.stringify(state)
      );
    } catch (error) {
      console.warn("Unable to save EES progress:", error);
    }
  }

  reset() {
    window.localStorage.removeItem(this.storageKey);
  }

  defaultState() {
    return {
      currentMissionIndex: 0,
      completedMissionIds: [],
      discoveredZoneIds: ["about"],
      discoveredArtifactIds: [],
      landedZoneIds: [],
      achievements: [],
      digitalTwinRuns: {},
      xp: 0
    };
  }
}
