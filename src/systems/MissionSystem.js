import { missions } from "../config/missions.js";

export class MissionSystem {
  constructor(interfaceManager, progressStore) {
    this.interface = interfaceManager;
    this.progressStore = progressStore;
    this.missions = missions;
    this.state = this.normalizeState(
      this.progressStore.load()
    );

    this.interface.buildMissionLog(
      this.missions,
      this.state
    );

    this.evaluateProgress();
    this.refreshInterface();
  }

  normalizeState(state) {
    const normalized = {
      currentMissionIndex: 0,
      completedMissionIds: [],
      discoveredZoneIds: ["about"],
      landedZoneIds: [],
      achievements: [],
      xp: 0,
      ...state
    };

    normalized.completedMissionIds = [
      ...new Set(normalized.completedMissionIds)
    ];

    normalized.discoveredZoneIds = [
      ...new Set([
        "about",
        ...normalized.discoveredZoneIds
      ])
    ];

    normalized.landedZoneIds = [
      ...new Set(normalized.landedZoneIds || [])
    ];

    normalized.achievements = [
      ...new Set(normalized.achievements || [])
    ];

    normalized.xp = Number(normalized.xp) || 0;

    this.rebuildMissionIndex(normalized);
    this.progressStore.save(normalized);

    return normalized;
  }

  rebuildMissionIndex(state = this.state) {
    let index = 0;

    while (
      index < this.missions.length &&
      state.completedMissionIds.includes(
        this.missions[index].id
      )
    ) {
      index += 1;
    }

    state.currentMissionIndex = index;
  }

  getActiveMission() {
    return (
      this.missions[
        this.state.currentMissionIndex
      ] || null
    );
  }

  isMissionComplete(missionId) {
    return this.state.completedMissionIds.includes(
      missionId
    );
  }

  hasDiscovered(zoneId) {
    return this.state.discoveredZoneIds.includes(
      zoneId
    );
  }

  hasLanded(zoneId) {
    return this.state.landedZoneIds.includes(
      zoneId
    );
  }

  handleDiscovery(zone) {
    if (!this.hasDiscovered(zone.id)) {
      this.state.discoveredZoneIds.push(zone.id);
      this.saveState();
    }

    this.evaluateProgress();
  }

  handleLanding(zone) {
    // Landing always implies discovery.
    if (!this.hasDiscovered(zone.id)) {
      this.state.discoveredZoneIds.push(zone.id);
    }

    if (!this.hasLanded(zone.id)) {
      this.state.landedZoneIds.push(zone.id);
    }

    this.saveState();
    this.evaluateProgress();
  }

  synchronizeDiscoveries(discoveredSet) {
    this.state.discoveredZoneIds = [
      ...new Set([
        "about",
        ...discoveredSet
      ])
    ];

    this.saveState();
    this.evaluateProgress();
  }

  missionConditionMet(mission) {
    if (mission.completionType === "discover") {
      return this.hasDiscovered(
        mission.targetZoneId
      );
    }

    if (mission.completionType === "land") {
      return this.hasLanded(
        mission.targetZoneId
      );
    }

    return false;
  }

  evaluateProgress() {
    const completedNow = [];
    let safety = 0;

    this.rebuildMissionIndex();

    while (safety < this.missions.length) {
      safety += 1;

      const mission = this.getActiveMission();

      if (
        !mission ||
        !this.missionConditionMet(mission)
      ) {
        break;
      }

      const result = this.completeMission(mission);

      if (!result) {
        break;
      }

      completedNow.push(result);
      this.rebuildMissionIndex();
    }

    this.saveState();
    this.refreshInterface();

    if (completedNow.length > 0) {
      const summary = completedNow
        .map((mission) => mission.title)
        .join(" • ");

      this.interface.showMessage(
        `Mission complete: ${summary}`
      );

      const activeMission =
        this.getActiveMission();

      window.setTimeout(() => {
        if (activeMission) {
          this.interface.showGuide(
            `New mission: ${activeMission.title}`,
            activeMission.objective
          );
        } else {
          this.interface.showGuide(
            "Genesis campaign complete",
            "All seven exploration missions have been completed."
          );
        }
      }, 900);
    }
  }

  completeMission(mission) {
    if (
      !mission ||
      this.isMissionComplete(mission.id)
    ) {
      return null;
    }

    this.state.completedMissionIds.push(
      mission.id
    );

    this.state.xp += mission.xp;

    if (
      mission.achievement &&
      !this.state.achievements.includes(
        mission.achievement.id
      )
    ) {
      this.state.achievements.push(
        mission.achievement.id
      );

      this.interface.showAchievement(
        mission.achievement
      );
    }

    this.interface.markMissionComplete(
      mission,
      this.state
    );

    return mission;
  }

  updateNavigation(zone, distance) {
    // This makes progression self-healing even if an
    // event callback was missed in an earlier frame.
    this.evaluateProgressSilently();

    const mission = this.getActiveMission();

    if (!mission) {
      this.interface.setMissionCampaignComplete(
        this.state
      );
      return;
    }

    this.interface.updateMissionDetails(
      mission,
      zone,
      distance,
      this.state
    );
  }

  evaluateProgressSilently() {
    let changed = false;
    let safety = 0;

    this.rebuildMissionIndex();

    while (safety < this.missions.length) {
      safety += 1;

      const mission = this.getActiveMission();

      if (
        !mission ||
        !this.missionConditionMet(mission)
      ) {
        break;
      }

      const completed =
        this.completeMission(mission);

      if (!completed) {
        break;
      }

      changed = true;
      this.rebuildMissionIndex();
    }

    if (changed) {
      this.saveState();
      this.refreshInterface();
    }
  }

  refreshInterface() {
    this.rebuildMissionIndex();

    this.interface.updateMissionLogState(
      this.state
    );

    const mission = this.getActiveMission();

    if (mission) {
      this.interface.setActiveMission(
        mission,
        this.state
      );
    } else {
      this.interface.setMissionCampaignComplete(
        this.state
      );
    }
  }

  saveState() {
    this.state.discoveredZoneIds = [
      ...new Set(this.state.discoveredZoneIds)
    ];

    this.state.landedZoneIds = [
      ...new Set(this.state.landedZoneIds)
    ];

    this.state.completedMissionIds = [
      ...new Set(this.state.completedMissionIds)
    ];

    this.rebuildMissionIndex();
    this.progressStore.save(this.state);
  }

  reset() {
    this.progressStore.reset();
    window.location.reload();
  }
}
