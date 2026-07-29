export class ZoneManager {
  constructor(zones, robot, interfaceManager) {
    this.zones = zones;
    this.robot = robot;
    this.interface = interfaceManager;
    this.nearestZone = null;
    this.activeZone = null;
    this.waypointZone = null;
    this.previousSpacePressed = false;
    this.previousLandingPressed = false;
    this.previousTakeoffPressed = false;
    this.previousAutopilotPressed = false;
    this.worldOpenedForLanding = false;
    this.discoverySystem = null;
    this.onZoneLanded = null;
  }

  update(inputManager) {
    const robotPosition = this.robot.getPosition();
    let nearestZone = null;
    let nearestDistance = Number.POSITIVE_INFINITY;

    this.zones.forEach((zone) => {
      const landingPoint = zone.position.clone().add(zone.landingOffset);
      const distance = robotPosition.distanceTo(landingPoint);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestZone = zone;
      }
    });

    this.nearestZone = nearestZone;
    if (!nearestZone) return;

    const targetZone = this.waypointZone || nearestZone;
    const targetLandingPoint = targetZone.position.clone().add(targetZone.landingOffset);
    const targetDistance = robotPosition.distanceTo(targetLandingPoint);

    this.interface.updateDestination(targetZone, targetDistance);
    this.interface.updateWaypointNavigation(this.waypointZone, targetDistance);

    if (this.waypointZone || targetDistance <= targetZone.discoveryRadius) {
      this.interface.showDestinationMarker();
    } else {
      this.interface.hideDestinationMarker();
    }

    if (
      this.robot.autopilotEnabled &&
      this.waypointZone &&
      targetDistance <= this.robot.autopilotArrivalDistance
    ) {
      this.robot.disableAutopilot();
      this.interface.setAutopilotStatus("ARRIVED");
      this.interface.showMessage("Autopilot arrival complete. Landing is available.");
    }

    if (this.robot.isLanded()) {
      this.interface.setFlightStatus("LANDED");
      this.interface.setLandingStatus("Docked");
    } else if (this.robot.isLanding()) {
      this.interface.setFlightStatus("LANDING");
      this.interface.setLandingStatus("Autopilot active");
    } else if (this.robot.isTakingOff()) {
      this.interface.setFlightStatus("TAKING OFF");
      this.interface.setLandingStatus("Departure active");
    } else if (nearestDistance <= nearestZone.landingRadius) {
      this.interface.setFlightStatus("LANDING AVAILABLE");
      this.interface.setLandingStatus("Press L or click Land");
    } else if (nearestDistance <= nearestZone.approachRadius) {
      this.interface.setFlightStatus("SIGNAL ACQUIRED");
      this.interface.setLandingStatus("Approach closer");
    } else {
      this.interface.setFlightStatus("EXPLORING");
      this.interface.setLandingStatus("Unavailable");
    }

    const spacePressed = inputManager.isPressed("Space");
    const landingPressed = inputManager.isPressed("KeyL");
    const takeoffPressed = inputManager.isPressed("KeyT");
    const autopilotPressed = inputManager.isPressed("KeyP");

    if (
      nearestDistance <= nearestZone.interactionRadius &&
      spacePressed &&
      !this.previousSpacePressed &&
      !this.activeZone &&
      !this.robot.isLanding() &&
      !this.robot.isTakingOff()
    ) {
      this.activeZone = nearestZone;
      this.interface.openPortfolioOverlay(nearestZone);
    }

    if (
      nearestDistance <= nearestZone.landingRadius &&
      landingPressed &&
      !this.previousLandingPressed &&
      this.robot.flightMode === "FLYING"
    ) {
      this.requestLanding(nearestZone);
    }

    if (
      autopilotPressed &&
      !this.previousAutopilotPressed &&
      this.robot.flightMode === "FLYING"
    ) {
      this.toggleAutopilot();
    }

    if (takeoffPressed && !this.previousTakeoffPressed && this.robot.isLanded()) {
      this.takeOff();
    }

    if (
      this.robot.isLanded() &&
      !this.worldOpenedForLanding &&
      this.activeZone
    ) {
      this.worldOpenedForLanding = true;

      // Record mission state before opening the destination UI.
      if (typeof this.onZoneLanded === "function") {
        this.onZoneLanded(this.activeZone);
      }

      this.interface.openDigitalWorld(
        this.activeZone
      );
    }

    this.previousSpacePressed = spacePressed;
    this.previousLandingPressed = landingPressed;
    this.previousTakeoffPressed = takeoffPressed;
    this.previousAutopilotPressed = autopilotPressed;
  }

  setDiscoverySystem(discoverySystem) {
    this.discoverySystem = discoverySystem;
  }

  canUseZone(zone) {
    return !this.discoverySystem || this.discoverySystem.isDiscovered(zone);
  }

  setWaypoint(zone) {
    if (!this.canUseZone(zone)) {
      this.interface.showGuide(
        "Destination locked",
        "Scan this signal before setting a waypoint."
      );
      return;
    }
    if (this.waypointZone && this.waypointZone.id === zone.id) {
      this.clearWaypoint();
      return;
    }

    this.waypointZone = zone;

    const landingPoint = zone.position.clone().add(zone.landingOffset);
    const distance = this.robot.getPosition().distanceTo(landingPoint);

    this.interface.updateWaypointNavigation(zone, distance);
    this.interface.showDestinationMarker();
    this.interface.showMessage(`Waypoint locked: ${zone.title}`);
  }

  clearWaypoint() {
    this.waypointZone = null;
    this.robot.disableAutopilot();
    this.interface.setAutopilotStatus("OFF");
    this.interface.updateWaypointNavigation(null, 0);
    this.interface.hideDestinationMarker();
    this.interface.showMessage("Waypoint cleared.");
  }

  toggleAutopilot() {
    if (this.robot.autopilotEnabled) {
      this.robot.disableAutopilot();
      this.interface.setAutopilotStatus("OFF");
      this.interface.showMessage("Autopilot disengaged.");
      return;
    }

    if (!this.waypointZone) {
      this.interface.showMessage("Set a waypoint before engaging autopilot.");
      return;
    }

    this.robot.setAutopilotTarget(this.waypointZone);
    this.interface.setAutopilotStatus("ACTIVE");
    this.interface.showMessage(`Autopilot engaged: ${this.waypointZone.title}`);
  }

  warpTo(zone) {
    if (!this.canUseZone(zone)) {
      this.interface.showGuide(
        "Warp denied",
        "Unknown signals must be discovered before warp access."
      );
      return;
    }

    /*
     * Docking and facility views disable flight input. End those
     * states before relocation so the explorer cannot remain locked.
     */
    this.interface.closePortal(false);
    this.interface.closeDigitalWorld(false);
    this.interface.restoreFlightAfterTakeoff();

    this.waypointZone = zone;
    this.activeZone = zone;
    this.worldOpenedForLanding = false;

    this.robot.disableAutopilot();
    this.robot.prepareForWarp();

    this.interface.setAutopilotStatus("OFF");
    this.interface.setLandingStatus("Warp transit");
    this.interface.setFlightStatus("WARPING");

    this.robot.warpToZone(zone);

    this.interface.closeNavigationPanel();

    const landingPoint =
      zone.position.clone().add(zone.landingOffset);

    const distance =
      this.robot.getPosition().distanceTo(landingPoint);

    this.interface.updateWaypointNavigation(
      zone,
      distance
    );

    this.interface.setLandingStatus(
      "Landing available"
    );

    this.interface.setFlightStatus(
      "LANDING AVAILABLE"
    );

    this.interface.showMessage(
      `Warp complete: ${zone.title}`
    );

    this.interface.onWarpArrivalAudioRequested?.();
  }

  requestLanding(zone = this.nearestZone) {
    if (!zone || this.robot.flightMode !== "FLYING") return false;

    const landingPoint = zone.position.clone().add(zone.landingOffset);
    const distance = this.robot.getPosition().distanceTo(landingPoint);

    if (distance > zone.landingRadius) {
      this.interface.showMessage("Landing denied: move closer or use Warp.");
      return false;
    }

    this.activeZone = zone;
    this.worldOpenedForLanding = false;

    if (this.robot.beginLanding(zone)) {
      this.interface.lockFlightForLanding();
      this.interface.showMessage(`Landing sequence started: ${zone.title}`);
      return true;
    }

    return false;
  }

  takeOff() {
    if (
      !this.robot.isLanded() &&
      !this.robot.isLanding() &&
      !this.robot.isTakingOff()
    ) {
      this.interface.showMessage("Takeoff unavailable: craft is not landed.");
      return;
    }

    if (this.robot.isLanding()) {
      this.interface.showMessage("Landing sequence must complete before takeoff.");
      return;
    }

    if (this.robot.isTakingOff()) {
      return;
    }

    this.interface.closePortal(false);
    this.interface.closeDigitalWorld(false);

    if (this.robot.beginTakeoff()) {
      this.interface.lockFlightForLanding();
      this.interface.setLandingStatus("Taking off");
      this.interface.setFlightStatus("TAKING OFF");
      this.interface.showMessage("Takeoff sequence initiated.");

      window.setTimeout(() => {
        this.interface.restoreFlightAfterTakeoff();
        this.interface.setLandingStatus("Unavailable");
        this.interface.setFlightStatus("EXPLORING");
        this.interface.showMessage("Flight controls restored.");
      }, 2000);
    }

    this.worldOpenedForLanding = false;
    this.activeZone = null;
  }

  clearActiveZone() {
    if (!this.robot.isLanded()) this.activeZone = null;
  }
}
