import { portfolioContent } from "../config/portfolioContent.js";
import { projectCatalog } from "../config/projectCatalog.js";
import { portalOverrides } from "../config/portalOverrides.js";
import { portalDetails } from "../config/portalDetails.js";

export class InterfaceManager {
  constructor(inputManager, zones) {
    this.inputManager = inputManager;
    this.zones = zones;

    const $ = (selector) => document.querySelector(selector);

    this.genesisLaunchPad = $("#genesis-launch-pad");
    this.openingAudioActivation = $("#opening-audio-activation");
    this.activateOpeningAudioButton = $("#activate-opening-audio");
    this.onOpeningAudioActivated = null;
    this.genesisCinematic = $("#genesis-cinematic");
    this.cinematicPulse = $("#cinematic-pulse");
    this.cinematicKicker = $("#cinematic-kicker");
    this.cinematicTitle = $("#cinematic-title");
    this.cinematicMessage = $("#cinematic-message");
    this.cinematicProgressBar = $("#cinematic-progress-bar");
    this.cinematicCoreLink = $("#cinematic-core-link");
    this.cinematicSequence = $("#cinematic-sequence");
    this.skipGenesisCinematicButton = $("#skip-genesis-cinematic");
    this.bootScreen = $("#boot-screen");
    this.bootLog = $("#boot-log");
    this.bootProgressBar = $("#boot-progress-bar");
    this.bootContinueButton = $("#boot-continue");
    this.facilityAiMessage = $("#facility-ai-message");
    this.ambientPortalStatus = $("#ambient-portal-status");
    this.ambientTwinStatus = $("#ambient-twin-status");
    this.ambientAuraStatus = $("#ambient-aura-status");
    this.ambientMissionStatus = $("#ambient-mission-status");
    this.flightOpsUnitState = $("#flight-ops-unit-state");
    this.launchCountdownValue = $("#launch-countdown-value");
    this.flightDockingStatus = $("#flight-docking-status");
    this.flightThrustStatus = $("#flight-thrust-status");
    this.flightScannerStatus = $("#flight-scanner-status");
    this.flightControlStatus = $("#flight-control-status");
    this.bootSystemItems = [...document.querySelectorAll("[data-system-index]")];
    this.bootProgressValue = $("#boot-progress-value");
    this.bootProgressLabel = $("#boot-progress-label");
    this.bootDiagnosticValue = $("#boot-diagnostic-value");
    this.bootDiagnosticRing = $("#boot-diagnostic-ring");
    this.bootCoreState = $("#boot-core-state");
    this.bootCoreMessage = $("#boot-core-message");
    this.bootThermal = $("#boot-thermal");
    this.bootMemory = $("#boot-memory");
    this.bootNetwork = $("#boot-network");
    this.bootAi = $("#boot-ai");
    this.bootOverviewStatus = $("#boot-overview-status");
    this.bootFooterStatus = $("#boot-footer-status");
    this.hangarScreen = $("#hangar-screen");
    this.flightOpsPhase = $("#flight-ops-phase");
    this.flightOpsPercent = $("#flight-ops-percent");
    this.flightOpsProgressBar = $("#flight-ops-progress-bar");
    this.flightOpsStatus = $("#flight-ops-status");
    this.flightOpsLog = $("#flight-ops-log");
    this.flightOpsSystemItems = [
      ...document.querySelectorAll("[data-flight-system]")
    ];
    this.verseArrivalScreen = $("#verse-arrival-screen");
    this.verseArrivalTitle = $("#verse-arrival-title");
    this.verseArrivalMessage = $("#verse-arrival-message");
    this.verseArrivalStatus = $("#verse-arrival-status");
    this.verseArrivalPercent = $("#verse-arrival-percent");
    this.verseArrivalBar = $("#verse-arrival-bar");
    this.verseAuraMessage = $("#verse-aura-message");
    this.verseDestinationItems = [
      ...document.querySelectorAll("[data-verse-destination]")
    ];
    this.missionPanel = $("#mission-panel");
    this.missionTitle = $("#mission-title");
    this.missionObjective = $("#mission-objective");
    this.missionProgressBar = $("#mission-progress-bar");
    this.missionHud = $("#mission-hud");
    this.crosshair = $("#crosshair");
    this.speedValue = $("#speed-value");
    this.livingSector = $("#living-sector");
    this.livingUptime = $("#living-uptime");
    this.livingPower = $("#living-power");
    this.livingNavigation = $("#living-navigation");
    this.livingPortal = $("#living-portal");
    this.livingActivity = $("#living-activity");
    this.verseActivityTicker = $("#verse-activity-ticker");
    this.verseActivityMessage = $("#verse-activity-message");
    this.destinationFacility = $("#destination-facility");
    this.destinationApproach = $("#destination-approach");
    this.destinationDocking = $("#destination-docking");
    this.facilityArrivalBanner = $("#facility-arrival-banner");
    this.facilityArrivalTitle = $("#facility-arrival-title");
    this.facilityArrivalMessage = $("#facility-arrival-message");
    this.facilityOperationsConsole = $("#facility-operations-console");
    this.facilityOperationsTitle = $("#facility-operations-title");
    this.facilityOperationsState = $("#facility-operations-state");
    this.facilityOperationsSteps = [
      ...document.querySelectorAll("[data-facility-step]")
    ];
    this.facilityOperationsMessage = $("#facility-operations-message");
    this.facilityOperationsPercent = $("#facility-operations-percent");
    this.facilityOperationsBar = $("#facility-operations-bar");
    this.facilityLocalPower = $("#facility-local-power");
    this.facilityDataLink = $("#facility-data-link");
    this.facilityPortalLink = $("#facility-portal-link");
    this.destinationCommandModule = $("#destination-command-module");
    this.destinationCommandTitle = $("#destination-command-title");
    this.destinationCommandStatus = $("#destination-command-status");
    this.destinationCommandObjective = $("#destination-command-objective");
    this.destinationCommandSystems = $("#destination-command-systems");
    this.destinationMetricOneLabel = $("#destination-metric-one-label");
    this.destinationMetricOneValue = $("#destination-metric-one-value");
    this.destinationMetricTwoLabel = $("#destination-metric-two-label");
    this.destinationMetricTwoValue = $("#destination-metric-two-value");
    this.destinationMetricThreeLabel = $("#destination-metric-three-label");
    this.destinationMetricThreeValue = $("#destination-metric-three-value");
    this.destinationCommandAura = $("#destination-command-aura");
    this.discoveryProtocolConsole = $("#discovery-protocol-console");
    this.discoveryProtocolState = $("#discovery-protocol-state");
    this.discoveryNearestSignal = $("#discovery-nearest-signal");
    this.discoverySignalDetail = $("#discovery-signal-detail");
    this.discoverySignalDot = $("#discovery-signal-dot");
    this.discoveryArtifactProgress = $("#discovery-artifact-progress");
    this.discoveryRecoveryPercent = $("#discovery-recovery-percent");
    this.discoveryXp = $("#discovery-xp");
    this.discoveryAchievementList = $("#discovery-achievement-list");
    this.discoveryAchievementToast = $("#discovery-achievement-toast");
    this.discoveryAchievementTitle = $("#discovery-achievement-title");
    this.discoveryAchievementMessage = $("#discovery-achievement-message");
    this.discoveryAchievementTimer = null;
    this.missionCommandConsole = $("#mission-command-console");
    this.missionCommandTitle = $("#mission-command-title");
    this.missionCommandState = $("#mission-command-state");
    this.missionCommandDirective = $("#mission-command-directive");
    this.missionCommandGuidance = $("#mission-command-guidance");
    this.missionCommandPhase = $("#mission-command-phase");
    this.missionCommandTarget = $("#mission-command-target");
    this.missionCommandElapsed = $("#mission-command-elapsed");
    this.missionCommandGrade = $("#mission-command-grade");
    this.missionCommandRouteBar = $("#mission-command-route-bar");
    this.missionCommandRouteStatus = $("#mission-command-route-status");
    this.missionCommandRoutePercent = $("#mission-command-route-percent");
    this.missionCommandOptional = $("#mission-command-optional");
    this.missionCommandOptionalState = $("#mission-command-optional-state");
    this.missionCommandOptionalIndicator = $("#mission-command-optional-indicator");
    this.missionDebrief = $("#mission-debrief");
    this.missionDebriefTitle = $("#mission-debrief-title");
    this.missionDebriefGrade = $("#mission-debrief-grade");
    this.missionDebriefXp = $("#mission-debrief-xp");
    this.missionDebriefMessage = $("#mission-debrief-message");
    this.missionDebriefNext = $("#mission-debrief-next");
    this.auraOperationsConsole = $("#aura-operations-console");
    this.auraOperationsFocus = $("#aura-operations-focus");
    this.auraOperationsState = $("#aura-operations-state");
    this.auraRecommendationTitle = $("#aura-recommendation-title");
    this.auraRecommendationReason = $("#aura-recommendation-reason");
    this.auraConfidenceValue = $("#aura-confidence-value");
    this.auraConfidenceBar = $("#aura-confidence-bar");
    this.auraContextMission = $("#aura-context-mission");
    this.auraContextScanner = $("#aura-context-scanner");
    this.auraContextCraft = $("#aura-context-craft");
    this.auraContextMobility = $("#aura-context-mobility");
    this.auraObservationItems = $("#aura-observation-items");
    this.auraPresence = $("#aura-holographic-presence");
    this.auraPresenceCore = $("#aura-presence-core");
    this.auraPresenceCallout = $("#aura-presence-callout");
    this.auraPresenceStatus = $("#aura-presence-status");
    this.auraPresenceTitle = $("#aura-presence-title");
    this.auraPresenceMessage = $("#aura-presence-message");
    this.auraPresenceConfidence = $("#aura-presence-confidence");
    this.commandDeckToggle = $("#command-deck-toggle");
    this.commandDeck = $("#command-deck");
    this.commandDeckClose = $("#command-deck-close");
    this.commandDeckPanelList = $("#command-deck-panel-list");
    this.commandDeckShowAll = $("#command-deck-show-all");
    this.commandDeckHideAll = $("#command-deck-hide-all");
    this.commandDeckResetLayout = $("#command-deck-reset-layout");
    this.experienceDirectorToggle = $("#experience-director-toggle");
    this.experienceDirector = $("#experience-director");
    this.experienceDirectorClose = $("#experience-director-close");
    this.experienceDirectorCurrent = $("#experience-director-current");
    this.experienceDirectorDescription = $("#experience-director-description");
    this.experienceDirectorStatus = $("#experience-director-status");
    this.experienceMotionLevel = $("#experience-motion-level");
    this.experienceGuidanceLevel = $("#experience-guidance-level");
    this.experienceProfileButtons = [
      ...document.querySelectorAll("[data-experience-profile]")
    ];
    this.systemConsoleToggle = $("#system-console-toggle");
    this.systemConsole = $("#system-console");
    this.systemConsoleClose = $("#system-console-close");
    this.systemTabButtons = [...document.querySelectorAll("[data-system-tab]")];
    this.systemPanels = [...document.querySelectorAll("[data-system-panel]")];
    this.systemProfileButtons = [...document.querySelectorAll("[data-system-profile]")];
    this.systemPanelList = $("#system-panel-list");
    this.systemShowAll = $("#system-show-all");
    this.systemHideAll = $("#system-hide-all");
    this.systemResetLayout = $("#system-reset-layout");
    this.systemMotionLevel = $("#system-motion-level");
    this.systemGuidanceLevel = $("#system-guidance-level");
    this.systemContextPanels = $("#system-context-panels");
    this.systemAuraPresence = $("#system-aura-presence");
    this.systemCinematicCamera = $("#system-cinematic-camera");
    this.systemAdaptiveAudio = $("#system-adaptive-audio");
    this.systemAudioVolume = $("#system-audio-volume");
    this.systemAudioVolumeValue = $("#system-audio-volume-value");
    this.systemAudioState = $("#system-audio-state");
    this.onAdaptiveAudioRequested = null;
    this.onAudioVolumeRequested = null;
    this.onAuraPresenceCue = null;
    this.systemCameraState = $("#system-camera-state");
    this.onCinematicCameraRequested = null;
    this.onAuraPresenceRequested = null;
    this.systemReturnCommand = $("#system-return-command");
    this.commandCenterConfirmation = $("#command-center-confirmation");
    this.cancelCommandCenterReturn = $("#cancel-command-center-return");
    this.confirmCommandCenterReturn = $("#confirm-command-center-return");
    this.commandCenterScreen = $("#command-center-screen");
    this.commandCenterRetakeFlight = $("#command-center-retake-flight");
    this.onCommandCenterOpened = null;
    this.onCommandCenterRetakeFlight = null;
    this.systemInterfaceState = $("#system-interface-state");
    this.systemContextState = $("#system-context-state");
    this.systemPanelCount = $("#system-panel-count");
    this.flightComputerShell = $("#flight-computer-shell");
    this.flightComputerMode = $("#flight-computer-mode");
    this.flightComputerContext = $("#flight-computer-context");
    this.onSystemContextPanelsRequested = null;
    this.onSystemReturnCommandRequested = null;
    this.onExperienceProfileRequested = null;
    this.onExperienceMotionRequested = null;
    this.onExperienceGuidanceRequested = null;
    this.commandDeckPanelControls = new Map();
    this.onCommandDeckVisibilityRequested = null;
    this.onCommandDeckCollapseRequested = null;
    this.onCommandDeckShowAllRequested = null;
    this.onCommandDeckHideAllRequested = null;
    this.onCommandDeckResetRequested = null;
    this.altitudeValue = $("#altitude-value");
    this.flightStatus = $("#flight-status");
    this.nearestZone = $("#nearest-zone");
    this.landingStatus = $("#landing-status");
    this.destinationMarker = $("#destination-marker");
    this.markerTitle = $("#marker-title");
    this.markerDistance = $("#marker-distance");
    this.markerWaypointButton = $("#marker-waypoint");
    this.markerAutopilotButton = $("#marker-autopilot");
    this.markerScanButton = $("#marker-scan");
    this.markerLandButton = $("#marker-land");
    this.destinationMarkerDragHandle = $("#destination-marker-drag-handle");
    this.destinationMarkerActions = $("#destination-marker-actions");
    this.destinationMarkerCollapse = $("#destination-marker-collapse");
    this.destinationMarkerDragging = false;
    this.destinationMarkerCollapsed = false;
    this.destinationMarkerDragOffset = { x: 0, y: 0 };
    this.portfolioOverlay = $("#portfolio-overlay");
    this.overlayCategory = $("#overlay-category");
    this.overlayTitle = $("#overlay-title");
    this.overlayDescription = $("#overlay-description");
    this.overlayProjects = $("#overlay-projects");
    this.openPortalButton = $("#open-portal");
    this.closeOverlayButton = $("#close-overlay");
    this.continueFlightButton = $("#continue-flight");
    this.helpButton = $("#help-button");
    this.controlsPanel = $("#controls-panel");
    this.closeControlsButton = $("#close-controls");
    this.controlsDragHandle = $("#controls-drag-handle");
    this.controlsPanelBody = $("#controls-panel-body");
    this.pinControlsButton = $("#pin-controls");
    this.minimizeControlsButton = $("#minimize-controls");
    this.resetControlsPositionButton = $("#reset-controls-position");
    this.controlsWindowState = $("#controls-window-state");
    this.missionLogButton = $("#mission-log-button");
    this.missionLogPanel = $("#mission-log-panel");
    this.closeMissionLogButton = $("#close-mission-log");
    this.missionList = $("#mission-list");
    this.logActiveMission = $("#log-active-mission");
    this.logTotalXp = $("#log-total-xp");
    this.logCompleteCount = $("#log-complete-count");
    this.logDiscoveryCount = $("#log-discovery-count");
    this.resetProgressButton = $("#reset-progress");
    this.missionNumber = $("#mission-number");
    this.missionXp = $("#mission-xp");
    this.achievementToast = $("#achievement-toast");
    this.achievementTitle = $("#achievement-title");
    this.achievementDescription = $("#achievement-description");
    this.navigationButton = $("#navigation-button");
    this.navigationPanel = $("#navigation-panel");
    this.closeNavigationButton = $("#close-navigation");
    this.navigationList = $("#navigation-list");
    this.digitalWorld = $("#digital-world");
    this.worldCategory = $("#world-category");
    this.worldTitle = $("#world-title");
    this.worldDescription = $("#world-description");
    this.worldComponents = $("#world-components");
    this.worldCoordinate = $("#world-coordinate");
    this.enterPortalButton = $("#enter-portal");
    this.closeWorldButton = $("#close-world");
    this.takeoffButton = $("#takeoff-button");
    this.returnFlightButton = $("#return-flight-button");
    this.waypointStatus = $("#waypoint-status");
    this.autopilotStatus = $("#autopilot-status");
    this.hullStatus = $("#hull-status");
    this.boundaryStatus = $("#boundary-status");
    this.boundaryWarning = $("#boundary-warning");
    this.scannerStatus = $("#scanner-status");
    this.scannerModeStatus = $("#scanner-mode-status");
    this.scannerModeButton = $("#scanner-mode-button");
    this.eventStatus = $("#event-status");
    this.trafficSafetyStatus = $("#traffic-safety-status");
    this.spaceEventBanner = $("#space-event-banner");
    this.eventType = $("#event-type");
    this.eventTitle = $("#event-title");
    this.eventDescription = $("#event-description");
    this.scannerDistance = $("#scanner-distance");
    this.discoveryCount = $("#discovery-count");
    this.artifactCount = $("#artifact-count");
    this.artifactTotal = $("#artifact-total");
    this.auraCommandButton = $("#aura-command-button");
    this.auraCommandPanel = $("#aura-command-panel");
    this.closeAuraCommandButton = $("#close-aura-command");
    this.auraCommandForm = $("#aura-command-form");
    this.auraCommandInput = $("#aura-command-input");
    this.auraMessageList = $("#aura-message-list");
    this.auraLocation = $("#aura-location");
    this.auraMission = $("#aura-mission");
    this.auraHull = $("#aura-hull");
    this.auraEnergy = $("#aura-energy");
    this.auraStatus = $("#aura-status");
    this.auraQuickButtons = [...document.querySelectorAll("[data-aura-command]")];
    this.digitalTwinButton = $("#digital-twin-button");
    this.digitalTwinPanel = $("#digital-twin-panel");
    this.closeDigitalTwinButton = $("#close-digital-twin");
    this.twinPanelTitle = $("#twin-panel-title");
    this.twinModelId = $("#twin-model-id");
    this.twinModelState = $("#twin-model-state");
    this.twinRunCount = $("#twin-run-count");
    this.twinEfficiencyScore = $("#twin-efficiency-score");
    this.twinCoreValue = $("#twin-core-value");
    this.twinTelemetry = $("#twin-telemetry");
    this.twinOutput = $("#twin-output");
    this.twinStatus = $("#twin-status");
    this.twinScenarioButtons = [...document.querySelectorAll(".twin-scenario")];
    this.runTwinSimulationButton = $("#run-twin-simulation");
    this.resetTwinSimulationButton = $("#reset-twin-simulation");
    this.operationsButton = $("#operations-button");
    this.operationsPanel = $("#operations-panel");
    this.closeOperationsButton = $("#close-operations");
    this.operationsHull = $("#operations-hull");
    this.operationsEnergy = $("#operations-energy");
    this.operationsDocking = $("#operations-docking");
    this.operationsService = $("#operations-service");
    this.energyStatus = $("#energy-status");
    this.operationsStatus = $("#operations-status");
    this.repairCraftButton = $("#repair-craft");
    this.rechargeCraftButton = $("#recharge-craft");
    this.runDiagnosticsButton = $("#run-diagnostics");
    this.respondEventButton = $("#respond-event");
    this.diagnosticOutput = $("#diagnostic-output");
    this.discoveriesButton = $("#discoveries-button");
    this.discoveriesPanel = $("#discoveries-panel");
    this.closeDiscoveriesButton = $("#close-discoveries");
    this.archiveWorldCount = $("#archive-world-count");
    this.archiveArtifactCount = $("#archive-artifact-count");
    this.archiveArtifactTotal = $("#archive-artifact-total");
    this.artifactList = $("#artifact-list");
    this.guide = $("#ees-guide");
    this.guideTitle = $("#guide-title");
    this.guideMessage = $("#guide-message");
    this.guideDismiss = $("#guide-dismiss");
    this.scanInterface = $("#scan-interface");
    this.scanTarget = $("#scan-target");
    this.scanProgressLabel = $("#scan-progress-label");
    this.waypointDistance = $("#waypoint-distance");
    this.guidancePanel = $("#waypoint-guidance");
    this.guidanceTitle = $("#guidance-title");
    this.guidanceDistance = $("#guidance-distance");
    this.clearWaypointButton = $("#clear-waypoint");
    this.mapNodes = $("#map-nodes");
    this.portalDetailOverlay = $("#portal-detail-overlay");
    this.portalDetailShell = $("#portal-detail-shell");
    this.portalDetailCode = $("#portal-detail-code");
    this.portalDetailEyebrow = $("#portal-detail-eyebrow");
    this.portalDetailTitle = $("#portal-detail-title");
    this.portalDetailSubtitle = $("#portal-detail-subtitle");
    this.portalDetailContent = $("#portal-detail-content");
    this.closePortalDetailButton = $("#close-portal-detail");
    this.backPortalDetailButton = $("#back-portal-detail");
    this.footerBackPortalDetailButton = $("#footer-back-portal-detail");
    this.portalInterface = $("#portal-interface");
    this.portalShell = $("#portal-shell");
    this.portalCode = $("#portal-code");
    this.portalCategory = $("#portal-category");
    this.portalTitle = $("#portal-title");
    this.portalDescription = $("#portal-description");
    this.portalContent = $("#portal-content");
    this.closePortalButton = $("#close-portal");
    this.portalReturnButton = $("#portal-return");
    this.portalTakeoffButton = $("#portal-takeoff");
    this.portalTabs = [...document.querySelectorAll(".portal-tab")];
    this.systemMessage = $("#system-message");
    this.currentZone = null;
    this.onWaypointRequested = null;
    this.onWarpRequested = null;
    this.onLandingRequested = null;
    this.onClearWaypointRequested = null;
    this.onAutopilotRequested = null;
    this.onScanRequested = null;
    this.onScannerModeRequested = null;
    this.onResetProgressRequested = null;
    this.onRepairRequested = null;
    this.onRechargeRequested = null;
    this.onDiagnosticsRequested = null;
    this.onEventResponseRequested = null;
    this.onTwinScenarioSelected = null;
    this.onTwinRunRequested = null;
    this.onTwinResetRequested = null;
    this.onAuraCommand = null;
    this.onAuraQuickCommand = null;
    this.mapNodeByZone = new Map();
    this.navItemByZone = new Map();
    this.onTakeoffRequested = null;

    this.started = false;
    this.bootCompleted = false;
    this.missionCompleted = false;
    this.onOverlayClosed = null;
    this.onGenesisBootOpened = null;
    this.onGenesisCinematicStage = null;
    this.cinematicTimers = [];
    this.cinematicCompleted = false;
    this.commandActivityTimer = null;
    this.facilityAnnouncementTimer = null;
    this.onBootProgress = null;
    this.onBootComplete = null;
    this.onExperienceStarted = null;
    this.verseActivityTimer = null;
    this.facilityArrivalTimer = null;
    this.onBootContinue = null;
    this.onGenesisLoadingAudioRequested = null;
    this.onBootSystemCheckAudioRequested = null;
    this.onPreflightAuthorizationAudioRequested = null;
    this.onTakeFlightAudioRequested = null;
    this.onEngineStartupAudioRequested = null;
    this.onLaunchCountdownAudioRequested = null;
    this.onWarpArrivalAudioRequested = null;
    this.controlsPinned = false;
    this.controlsMinimized = false;
    this.controlsDragging = false;
    this.controlsDragOffset = { x: 0, y: 0 };

    this.buildNavigation();
    this.bindEvents();
    this.bindCommandDeck();
    this.bindExperienceDirector();
    this.bindSystemConsole();
    this.bindAuraPresence();
    this.bindOpeningAudioActivation();
    this.initializeFloatingControls();
    this.initializeDestinationMarkerControls();
  }

  initializeDestinationMarkerControls() {
    this.destinationMarkerCollapse.addEventListener(
      "pointerdown",
      (event) => {
        event.preventDefault();
        event.stopPropagation();
      }
    );

    this.destinationMarkerCollapse.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.toggleDestinationMarkerCollapse();
      }
    );

    this.destinationMarkerActions.addEventListener(
      "pointerdown",
      (event) => {
        event.stopPropagation();
      }
    );

    this.destinationMarkerDragHandle.addEventListener(
      "pointerdown",
      (event) =>
        this.startDestinationMarkerDrag(event)
    );

    window.addEventListener(
      "pointermove",
      (event) =>
        this.moveDestinationMarkerDrag(event)
    );

    window.addEventListener(
      "pointerup",
      () =>
        this.endDestinationMarkerDrag()
    );

    window.addEventListener(
      "pointercancel",
      () =>
        this.endDestinationMarkerDrag()
    );

    window.addEventListener(
      "resize",
      () =>
        this.keepDestinationMarkerInViewport()
    );
  }

  toggleDestinationMarkerCollapse(forceCollapsed = null) {
    this.destinationMarkerCollapsed =
      typeof forceCollapsed === "boolean"
        ? forceCollapsed
        : !this.destinationMarkerCollapsed;

    this.destinationMarker.classList.toggle(
      "is-collapsed",
      this.destinationMarkerCollapsed
    );

    this.destinationMarkerCollapse.textContent =
      this.destinationMarkerCollapsed
        ? "+"
        : "−";

    this.destinationMarkerCollapse.setAttribute(
      "aria-expanded",
      String(!this.destinationMarkerCollapsed)
    );

    this.destinationMarkerCollapse.setAttribute(
      "aria-label",
      this.destinationMarkerCollapsed
        ? "Expand waypoint panel"
        : "Collapse waypoint panel"
    );

    this.destinationMarkerCollapse.title =
      this.destinationMarkerCollapsed
        ? "Expand waypoint panel"
        : "Collapse waypoint panel";

    this.keepDestinationMarkerInViewport();
  }

  startDestinationMarkerDrag(event) {
    if (
      event.button !== undefined &&
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const rect =
      this.destinationMarker.getBoundingClientRect();

    this.destinationMarkerDragging = true;
    this.destinationMarker.classList.add(
      "is-dragging"
    );

    this.destinationMarkerDragOffset = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };

    this.destinationMarker.style.left =
      `${rect.left}px`;

    this.destinationMarker.style.top =
      `${rect.top}px`;

    this.destinationMarker.style.right =
      "auto";

    this.destinationMarker.style.bottom =
      "auto";

    this.destinationMarker.style.transform =
      "none";

    this.destinationMarkerDragHandle.setPointerCapture?.(
      event.pointerId
    );
  }

  moveDestinationMarkerDrag(event) {
    if (!this.destinationMarkerDragging) {
      return;
    }

    event.preventDefault();

    const rect =
      this.destinationMarker.getBoundingClientRect();

    const margin = 8;

    const maxLeft =
      Math.max(
        margin,
        window.innerWidth -
          rect.width -
          margin
      );

    const maxTop =
      Math.max(
        margin,
        window.innerHeight -
          rect.height -
          margin
      );

    const left =
      Math.min(
        maxLeft,
        Math.max(
          margin,
          event.clientX -
            this.destinationMarkerDragOffset.x
        )
      );

    const top =
      Math.min(
        maxTop,
        Math.max(
          margin,
          event.clientY -
            this.destinationMarkerDragOffset.y
        )
      );

    this.destinationMarker.style.left =
      `${left}px`;

    this.destinationMarker.style.top =
      `${top}px`;
  }

  endDestinationMarkerDrag() {
    if (!this.destinationMarkerDragging) {
      return;
    }

    this.destinationMarkerDragging = false;

    this.destinationMarker.classList.remove(
      "is-dragging"
    );

    this.keepDestinationMarkerInViewport();
  }

  keepDestinationMarkerInViewport() {
    if (
      this.destinationMarker.classList.contains(
        "is-hidden"
      )
    ) {
      return;
    }

    const rect =
      this.destinationMarker.getBoundingClientRect();

    if (
      !this.destinationMarker.style.left ||
      !this.destinationMarker.style.top
    ) {
      return;
    }

    const margin = 8;

    const left =
      Math.min(
        Math.max(
          margin,
          rect.left
        ),
        Math.max(
          margin,
          window.innerWidth -
            rect.width -
            margin
        )
      );

    const top =
      Math.min(
        Math.max(
          margin,
          rect.top
        ),
        Math.max(
          margin,
          window.innerHeight -
            rect.height -
            margin
        )
      );

    this.destinationMarker.style.left =
      `${left}px`;

    this.destinationMarker.style.top =
      `${top}px`;
  }

  buildNavigation() {
    this.navigationList.innerHTML = "";
    this.mapNodes.innerHTML = "";

    this.zones.forEach((zone, index) => {
      const item = document.createElement("article");
      item.className = "navigation-item";
      item.dataset.zoneId = zone.id;
      item.innerHTML = `
        <span class="navigation-number">${String(index + 1).padStart(2, "0")}</span>
        <div class="navigation-copy">
          <strong>${zone.initiallyDiscovered ? zone.title : "Unknown Signal"}</strong>
          <small>${zone.initiallyDiscovered ? zone.sectionLabel : "Scan required"}</small>
        </div>
        <div class="navigation-actions">
          <button class="mini-button waypoint-action" type="button">Set Waypoint</button>
          <button class="mini-button primary-mini warp-action" type="button">Warp</button>
        </div>
      `;

      item.querySelector(".waypoint-action").addEventListener("click", () => {
        if (typeof this.onWaypointRequested === "function") {
          this.onWaypointRequested(zone);
        }
      });

      item.querySelector(".warp-action").addEventListener("click", () => {
        if (typeof this.onWarpRequested === "function") {
          this.onWarpRequested(zone);
        }
      });

      this.navigationList.append(item);
      this.navItemByZone.set(zone.id, item);

      const node = document.createElement("button");
      node.className = "map-node";
      node.type = "button";
      node.style.left = `${14 + ((index * 31) % 72)}%`;
      node.style.top = `${18 + ((index * 23) % 66)}%`;
      node.dataset.zoneId = zone.id;
      node.innerHTML = `<span>${index + 1}</span><small>${zone.initiallyDiscovered ? zone.sectionLabel : "???"}</small>`;
      node.addEventListener("click", () => {
        if (typeof this.onWaypointRequested === "function") {
          this.onWaypointRequested(zone);
        }
      });

      this.mapNodes.append(node);
      this.mapNodeByZone.set(zone.id, node);
    });
  }

  bindEvents() {
    this.skipGenesisCinematicButton.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        this.completeGenesisCinematic(true);
      }
    );

    this.bootContinueButton.addEventListener(
      "click",
      (event) => {
        event.preventDefault();

        if (!this.bootCompleted) {
          return;
        }

        this.onTakeFlightAudioRequested?.();

        if (
          typeof this.onBootContinue ===
          "function"
        ) {
          this.onBootContinue();
        } else {
          this.openFlightOperations();
        }
      }
    );
    this.closeOverlayButton.addEventListener("click", () => this.closePortfolioOverlay());
    this.continueFlightButton.addEventListener("click", () => this.closePortfolioOverlay());
    this.helpButton.addEventListener(
      "click",
      () => this.toggleFloatingControls()
    );

    this.closeControlsButton.addEventListener(
      "click",
      () => this.hideFloatingControls()
    );

    this.pinControlsButton.addEventListener(
      "click",
      () => this.toggleControlsPin()
    );

    this.minimizeControlsButton.addEventListener(
      "click",
      () => this.toggleControlsMinimize()
    );

    this.resetControlsPositionButton.addEventListener(
      "click",
      () => this.resetControlsPosition()
    );
    this.auraCommandButton.addEventListener(
      "click",
      () => this.openAuraPanel()
    );

    this.closeAuraCommandButton.addEventListener(
      "click",
      () => this.closePanel(this.auraCommandPanel)
    );

    this.auraCommandForm.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();

        const command =
          this.auraCommandInput.value.trim();

        if (!command) return;

        this.auraCommandInput.value = "";

        if (
          typeof this.onAuraCommand === "function"
        ) {
          this.onAuraCommand(command);
        }
      }
    );

    this.auraQuickButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (
          typeof this.onAuraQuickCommand === "function"
        ) {
          this.onAuraQuickCommand(
            button.dataset.auraCommand
          );
        }
      });
    });

    this.digitalTwinButton.addEventListener(
      "click",
      () => this.openDigitalTwinPanel(this.currentZone)
    );

    this.closeDigitalTwinButton.addEventListener(
      "click",
      () => this.closePanel(this.digitalTwinPanel)
    );

    this.twinScenarioButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.twinScenarioButtons.forEach((item) =>
          item.classList.remove("is-active")
        );

        button.classList.add("is-active");

        if (
          typeof this.onTwinScenarioSelected === "function"
        ) {
          this.onTwinScenarioSelected(
            button.dataset.scenario
          );
        }
      });
    });

    this.runTwinSimulationButton.addEventListener(
      "click",
      () => {
        if (
          typeof this.onTwinRunRequested === "function"
        ) {
          this.onTwinRunRequested();
        }
      }
    );

    this.resetTwinSimulationButton.addEventListener(
      "click",
      () => {
        if (
          typeof this.onTwinResetRequested === "function"
        ) {
          this.onTwinResetRequested();
        }
      }
    );

    this.operationsButton.addEventListener(
      "click",
      () => this.openOperationsPanel()
    );

    this.closeOperationsButton.addEventListener(
      "click",
      () => this.closePanel(this.operationsPanel)
    );

    this.repairCraftButton.addEventListener(
      "click",
      () => {
        if (typeof this.onRepairRequested === "function") {
          this.onRepairRequested();
        }
      }
    );

    this.rechargeCraftButton.addEventListener(
      "click",
      () => {
        if (typeof this.onRechargeRequested === "function") {
          this.onRechargeRequested();
        }
      }
    );

    this.runDiagnosticsButton.addEventListener(
      "click",
      () => {
        if (typeof this.onDiagnosticsRequested === "function") {
          this.onDiagnosticsRequested();
        }
      }
    );

    this.respondEventButton.addEventListener(
      "click",
      () => {
        if (typeof this.onEventResponseRequested === "function") {
          this.onEventResponseRequested();
        }
      }
    );

    this.discoveriesButton.addEventListener("click", () => this.openPanel(this.discoveriesPanel));
    this.closeDiscoveriesButton.addEventListener("click", () => this.closePanel(this.discoveriesPanel));
    this.missionLogButton.addEventListener("click", () => this.openPanel(this.missionLogPanel));
    this.closeMissionLogButton.addEventListener("click", () => this.closePanel(this.missionLogPanel));
    this.resetProgressButton.addEventListener("click", () => {
      if (window.confirm("Reset all locally saved EES mission and discovery progress?")) {
        if (typeof this.onResetProgressRequested === "function") this.onResetProgressRequested();
      }
    });
    this.navigationButton.addEventListener("click", () => this.openPanel(this.navigationPanel));
    this.closeNavigationButton.addEventListener("click", () => this.closePanel(this.navigationPanel));
    this.markerAutopilotButton.addEventListener("click", () => {
      if (typeof this.onAutopilotRequested === "function") this.onAutopilotRequested();
    });
    this.markerWaypointButton.addEventListener("click", () => {
      if (typeof this.onWaypointRequested === "function" && this.currentZone) this.onWaypointRequested(this.currentZone);
    });
    this.clearWaypointButton.addEventListener("click", () => {
      if (typeof this.onClearWaypointRequested === "function") this.onClearWaypointRequested();
    });
    this.scannerModeButton.addEventListener("click", () => {
      if (typeof this.onScannerModeRequested === "function") {
        this.onScannerModeRequested();
      }
    });
    this.markerScanButton.addEventListener("click", () => {
      if (typeof this.onScanRequested === "function") {
        this.onScanRequested();
      }
    });
    this.markerLandButton.addEventListener("click", () => {
      if (typeof this.onLandingRequested === "function" && this.currentZone) this.onLandingRequested(this.currentZone);
    });
    this.openPortalButton.addEventListener("click", () => this.openPortal(this.currentZone));
    this.enterPortalButton.addEventListener("click", () => this.openPortal(this.currentZone));
    this.closePortalDetailButton.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.closePortalDetail();
      }
    );

    this.backPortalDetailButton.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.closePortalDetail();
      }
    );

    this.footerBackPortalDetailButton.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.closePortalDetail();
      }
    );

    this.portalDetailOverlay.addEventListener(
      "click",
      (event) => {
        if (event.target === this.portalDetailOverlay) {
          this.closePortalDetail();
        }
      }
    );

    this.closePortalButton.addEventListener("click", () => this.closePortal());
    this.portalReturnButton.addEventListener("click", () => this.closePortal());
    this.guideDismiss.addEventListener("click", () => this.guide.classList.add("is-hidden"));
    this.portalContent.addEventListener(
      "click",
      (event) => {
        const button =
          event.target.closest(
            "[data-portal-detail]"
          );

        if (!button) return;

        this.openPortalDetail(
          button.dataset.portalDetail
        );
      }
    );

    this.portalTabs.forEach((tab) => tab.addEventListener("click", () => {
      this.portalTabs.forEach((item) => item.classList.remove("is-active"));
      tab.classList.add("is-active");
      this.renderPortalTab(tab.dataset.tab);
    }));
    this.closeWorldButton.addEventListener("click", () => this.closeDigitalWorld(false));
    this.takeoffButton.addEventListener("click", () => {
      if (typeof this.onTakeoffRequested === "function") this.onTakeoffRequested();
    });

    this.returnFlightButton.addEventListener("click", () => {
      this.closeDigitalWorld(false);
      this.showMessage("Returned to landing pad. Select Take Off when ready.");
    });

    this.portalTakeoffButton.addEventListener("click", () => {
      this.closePortal(false);
      if (typeof this.onTakeoffRequested === "function") this.onTakeoffRequested();
    });

    window.addEventListener("keydown", (event) => {
      if (event.code === "KeyT" && typeof this.onTakeoffRequested === "function") {
        this.onTakeoffRequested();
      }
      if (event.code !== "Escape") return;

      if (this.portalDetailOverlay.classList.contains("is-open")) {
        this.closePortalDetail();
      } else if (this.portalInterface.classList.contains("is-open")) {
        this.closePortal();
      } else if (this.digitalWorld.classList.contains("is-open")) {
        this.closeDigitalWorld(false);
        this.showMessage("Returned to landing pad.");
      } else if (this.portfolioOverlay.classList.contains("is-open")) {
        this.closePortfolioOverlay();
      } else if (!this.controlsPanel.classList.contains("is-hidden")) {
        this.closePanel(this.controlsPanel);
      } else if (!this.navigationPanel.classList.contains("is-hidden")) {
        this.closePanel(this.navigationPanel);
      } else if (!this.missionLogPanel.classList.contains("is-hidden")) {
        this.closePanel(this.missionLogPanel);
      } else if (!this.discoveriesPanel.classList.contains("is-hidden")) {
        this.closePanel(this.discoveriesPanel);
      } else if (!this.operationsPanel.classList.contains("is-hidden")) {
        this.closePanel(this.operationsPanel);
      } else if (!this.digitalTwinPanel.classList.contains("is-hidden")) {
        this.closePanel(this.digitalTwinPanel);
      } else if (!this.auraCommandPanel.classList.contains("is-hidden")) {
        this.closePanel(this.auraCommandPanel);
      }
    });
  }

  bindOpeningAudioActivation() {
    this.activateOpeningAudioButton.addEventListener(
      "click",
      async () => {
        this.activateOpeningAudioButton.disabled =
          true;

        this.activateOpeningAudioButton.textContent =
          "INITIALIZING AUDIO...";

        await this.onOpeningAudioActivated?.();

        this.openingAudioActivation.classList.add(
          "is-hidden"
        );

        this.activateOpeningAudioButton.disabled =
          false;

        this.activateOpeningAudioButton.textContent =
          "ACTIVATE AUDIO & BEGIN";

        /*
         * Restart from stage zero so the Doppler pass and visible
         * arrival sequence begin together after audio is unlocked.
         */
        this.initializeGenesisCinematic(
          true
        );
      }
    );
  }

  initializeGenesisCinematic(audioUnlocked = false) {
    if (audioUnlocked) {
      this.onGenesisLoadingAudioRequested?.();
    }
    this.clearCinematicTimers();
    this.cinematicCompleted = false;
    this.commandActivityTimer = null;
    this.facilityAnnouncementTimer = null;
    this.genesisLaunchPad.classList.add("cinematic-pending");
    this.genesisLaunchPad.classList.remove("cinematic-complete");
    this.genesisCinematic.classList.remove("is-complete");
    this.skipGenesisCinematicButton.classList.remove("is-hidden");

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (
      typeof this.onGenesisCinematicStage ===
      "function"
    ) {
      this.onGenesisCinematicStage(0);
    }

    if (reducedMotion) {
      this.completeGenesisCinematic(true);
      return;
    }

    const stages = [
      {
        at: 450,
        stage: 1,
        kicker: "GENESIS ACTIVATION",
        title: "ARRIVAL SIGNAL",
        message: "Guest transport acquired. Corridor guidance systems are online.",
        progress: 12,
        link: "PULSE DETECTED"
      },
      {
        at: 1450,
        stage: 2,
        kicker: "CORE FORMATION",
        title: "APPROACHING THE EESIVERSE",
        message: "Holographic escort is guiding the visitor toward Engineering Command.",
        progress: 28,
        link: "FORMING"
      },
      {
        at: 2750,
        stage: 3,
        kicker: "FIELD STABILIZATION",
        title: "SECURITY GATE",
        message: "Visitor identity is being synchronized with facility access protocols.",
        progress: 44,
        link: "STABILIZING"
      },
      {
        at: 4000,
        stage: 4,
        kicker: "IDENTITY PROTOCOL",
        title: "ACCESS GRANTED",
        message: "Engineering Command blast doors have been released.",
        progress: 61,
        link: "VERIFIED"
      },
      {
        at: 5250,
        stage: 5,
        kicker: "ROBOTIC SYSTEMS",
        title: "COMMAND CENTER APPROACH",
        message: "Power is routing to the Genesis Chamber and Identity Core.",
        progress: 75,
        link: "CALIBRATING"
      },
      {
        at: 6400,
        stage: 6,
        kicker: "AMBIENT OPERATIONS",
        title: "DOORS OPENING",
        message: "Engineering Command is visible beyond the security threshold.",
        progress: 88,
        link: "CONNECTED"
      },
      {
        at: 7500,
        stage: 7,
        kicker: "ENGINEERING COMMAND",
        title: "EES GENESIS",
        message: "Arrival complete. Genesis initialization is beginning automatically.",
        progress: 100,
        link: "ONLINE"
      }
    ];

    stages.forEach((stageData, index) => {
      this.queueCinematicTimer(() => {
        this.applyGenesisCinematicStage(
          stageData,
          index + 1,
          stages.length
        );
      }, stageData.at);
    });

    this.queueCinematicTimer(() => {
      this.completeGenesisCinematic(false);
    }, 8500);
  }

  applyGenesisCinematicStage(
    data,
    sequence,
    total
  ) {
    if (this.cinematicCompleted) return;

    this.cinematicKicker.textContent =
      data.kicker;
    this.cinematicTitle.textContent =
      data.title;
    this.cinematicMessage.textContent =
      data.message;
    this.cinematicProgressBar.style.width =
      `${data.progress}%`;
    this.cinematicCoreLink.textContent =
      data.link;
    this.cinematicSequence.textContent =
      `${String(sequence).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

    this.genesisCinematic.dataset.stage =
      String(data.stage);

    this.cinematicPulse.classList.remove(
      "pulse-active"
    );

    void this.cinematicPulse.offsetWidth;

    this.cinematicPulse.classList.add(
      "pulse-active"
    );

    if (
      typeof this.onGenesisCinematicStage ===
      "function"
    ) {
      this.onGenesisCinematicStage(
        data.stage
      );
    }
  }

  completeGenesisCinematic(skipped = false) {
    if (this.cinematicCompleted) return;

    this.cinematicCompleted = true;
    this.clearCinematicTimers();

    if (
      typeof this.onGenesisCinematicStage ===
      "function"
    ) {
      this.onGenesisCinematicStage(7);
    }

    this.cinematicProgressBar.style.width = "100%";
    this.cinematicCoreLink.textContent = "ONLINE";
    this.cinematicSequence.textContent = "07 / 07";

    this.genesisLaunchPad.classList.remove(
      "cinematic-pending"
    );
    this.genesisLaunchPad.classList.add(
      "cinematic-complete",
      "doors-opening"
    );
    this.genesisCinematic.classList.add("is-complete");
    this.skipGenesisCinematicButton.classList.add("is-hidden");

    window.setTimeout(() => {
      this.genesisCinematic.classList.add("is-hidden");
      this.openGenesisBoot();
    }, skipped ? 100 : 1250);
  }

  queueCinematicTimer(callback, delay) {
    const timer = window.setTimeout(
      callback,
      delay
    );

    this.cinematicTimers.push(timer);
  }

  clearCinematicTimers() {
    this.cinematicTimers.forEach(
      (timer) => window.clearTimeout(timer)
    );

    this.cinematicTimers = [];
  }

  openGenesisBoot() {
    if (this.bootScreen.dataset.started === "true") {
      return;
    }

    this.bootScreen.dataset.started = "true";
    this.genesisLaunchPad.classList.add("is-hidden");
    this.genesisLaunchPad.setAttribute("aria-hidden", "true");

    this.bootScreen.classList.remove("is-hidden");
    this.bootScreen.setAttribute("aria-hidden", "false");

    if (
      typeof this.onGenesisBootOpened ===
      "function"
    ) {
      this.onGenesisBootOpened();
    }

    this.startLivingCommandCenter();

    window.requestAnimationFrame(() => {
      this.beginBootSequence();
    });
  }

  startLivingCommandCenter() {
    this.stopLivingCommandCenter();

    const announcements = [
      "Visitor detected. Engineering Command is preparing.",
      "Identity synchronization in progress.",
      "Portal Network handshake established.",
      "Digital Twin Grid standing by.",
      "AURA contextual link initialized.",
      "Mission Engine is loading Genesis objectives.",
      "Robotic calibration systems are active.",
      "Engineering Command is operational."
    ];

    const states = [
      ["SYNCHRONIZING", "STANDBY", "INITIALIZING", "LOADING"],
      ["CONNECTED", "CALIBRATING", "LINKED", "INDEXING"],
      ["STABLE", "ONLINE", "ACTIVE", "READY"]
    ];

    let messageIndex = 0;
    let stateIndex = 0;

    const updateMessage = () => {
      if (!this.facilityAiMessage) return;
      this.facilityAiMessage.textContent =
        announcements[messageIndex % announcements.length];
      messageIndex += 1;
    };

    const updateState = () => {
      const state = states[stateIndex % states.length];
      this.ambientPortalStatus.textContent = state[0];
      this.ambientTwinStatus.textContent = state[1];
      this.ambientAuraStatus.textContent = state[2];
      this.ambientMissionStatus.textContent = state[3];
      stateIndex += 1;
    };

    updateMessage();
    updateState();
    this.facilityAnnouncementTimer = setInterval(updateMessage, 2350);
    this.commandActivityTimer = setInterval(updateState, 3100);
  }

  stopLivingCommandCenter() {
    clearInterval(this.facilityAnnouncementTimer);
    clearInterval(this.commandActivityTimer);
    this.facilityAnnouncementTimer = null;
    this.commandActivityTimer = null;
  }

  beginBootSequence() {
    const steps = [
      {
        system: "POWER GRID",
        log: "Loading Flight Computer...",
        diagnostic: ["CALIBRATING", "SYNCING", "CONNECTING", "INITIALIZING"]
      },
      {
        system: "NAVIGATION MATRIX",
        log: "Loading Navigation Matrix...",
        diagnostic: ["STABILIZING", "SYNCING", "CONNECTING", "INITIALIZING"]
      },
      {
        system: "ROBOTIC CONTROL",
        log: "Activating Robotic Systems...",
        diagnostic: ["OPTIMAL", "SYNCING", "CONNECTING", "INITIALIZING"]
      },
      {
        system: "MISSION ENGINE",
        log: "Loading Mission Engine...",
        diagnostic: ["OPTIMAL", "STABLE", "CONNECTING", "INITIALIZING"]
      },
      {
        system: "PORTAL NETWORK",
        log: "Establishing Portal Link...",
        diagnostic: ["OPTIMAL", "STABLE", "SECURING", "INITIALIZING"]
      },
      {
        system: "DATA CORE",
        log: "Syncing Data Core...",
        diagnostic: ["OPTIMAL", "STABLE", "SECURE", "ACTIVATING"]
      },
      {
        system: "IDENTITY CORE",
        log: "Energizing Identity Core...",
        diagnostic: ["OPTIMAL", "STABLE", "SECURE", "ACTIVE"]
      },
      {
        system: null,
        log: "Systems Check Complete...",
        diagnostic: ["OPTIMAL", "STABLE", "SECURE", "ACTIVE"]
      },
      {
        system: null,
        log: "EES Genesis online.",
        diagnostic: ["OPTIMAL", "STABLE", "SECURE", "ACTIVE"]
      }
    ];

    this.bootLog.innerHTML = "";
    this.bootProgressBar.style.width = "0%";
    this.bootProgressValue.textContent = "0%";
    this.bootDiagnosticValue.textContent = "0%";
    this.bootDiagnosticRing.style.strokeDashoffset = "301.593";
    this.bootContinueButton.classList.add("is-hidden");

    this.bootSystemItems.forEach((item) => {
      item.classList.remove("is-online");
      item.querySelector("strong").textContent = "STANDBY";
    });

    const runStep = (index) => {
      if (index >= steps.length) {
        this.bootCompleted = true;
        this.bootCoreState.textContent = "ONLINE";
        this.bootCoreMessage.textContent =
          "Identity Core synchronized — EES Genesis ready";
        this.bootProgressLabel.textContent =
          "EES GENESIS ONLINE";
        this.bootFooterStatus.textContent =
          "ALL SYSTEMS OPERATIONAL";
        this.bootOverviewStatus.textContent =
          "EXPLORER UNIT READY";
        this.bootContinueButton.classList.remove("is-hidden");
        this.onPreflightAuthorizationAudioRequested?.();

        if (typeof this.onBootComplete === "function") {
          this.onBootComplete();
        }

        return;
      }

      const step = steps[index];

      if (step.system) {
        this.onBootSystemCheckAudioRequested?.(
          step.system,
          index
        );
      }

      const progress =
        Math.round(((index + 1) / steps.length) * 100);

      const line = document.createElement("div");
      line.className = "boot-log-line";
      line.innerHTML = `<span>[OK]</span><strong></strong>`;
      this.bootLog.append(line);
      this.bootLog.scrollTop = this.bootLog.scrollHeight;

      const target = step.log;
      let characterIndex = 0;

      const typeCharacter = () => {
        characterIndex += 1;
        line.querySelector("strong").textContent =
          target.slice(0, characterIndex);

        if (characterIndex < target.length) {
          window.setTimeout(typeCharacter, 19);
          return;
        }

        this.bootProgressBar.style.width = `${progress}%`;
        this.bootProgressValue.textContent = `${progress}%`;
        this.bootDiagnosticValue.textContent = `${progress}%`;
        this.bootDiagnosticRing.style.strokeDashoffset =
          progress >= 100
            ? "0"
            : `${301.593 - 301.593 * (progress / 100)}`;

        if (step.system) {
          const systemItem =
            this.bootSystemItems.find(
              (item) =>
                item.querySelector("span").textContent ===
                step.system
            );

          if (systemItem) {
            systemItem.classList.add("is-online");
            systemItem.querySelector("strong").textContent =
              "ONLINE";
          }
        }

        [
          this.bootThermal,
          this.bootMemory,
          this.bootNetwork,
          this.bootAi
        ].forEach((element, diagnosticIndex) => {
          element.textContent =
            step.diagnostic[diagnosticIndex];
        });

        this.bootCoreState.textContent =
          progress < 78
            ? "INITIALIZING"
            : progress < 100
              ? "ENERGIZING"
              : "ONLINE";

        this.bootOverviewStatus.textContent =
          progress < 40
            ? "CALIBRATING EXPLORER"
            : progress < 78
              ? "ROBOTIC SYSTEMS LINKED"
              : "ALL SYSTEMS OPERATIONAL";

        if (typeof this.onBootProgress === "function") {
          this.onBootProgress(progress / 100);
        }

        window.setTimeout(
          () => runStep(index + 1),
          230
        );
      };

      typeCharacter();
    };

    window.setTimeout(() => runStep(0), 420);
  }

  openFlightOperations() {
    if (!this.bootCompleted) return;
    this.stopLivingCommandCenter();

    this.bootScreen.classList.add("is-hidden");
    this.hangarScreen.classList.remove("is-hidden");
    this.hangarScreen.classList.remove(
      "hangar-open",
      "flight-ready"
    );

    this.onEngineStartupAudioRequested?.();

    this.runFlightOperationsSequence();
  }

  runFlightOperationsSequence() {
    const steps = [
      ["POWER CORE", "Explorer power core stabilized."],
      ["THRUSTERS", "Primary and vector thrusters charged."],
      ["NAVIGATION", "Navigation Matrix synchronized."],
      ["SCANNER ARRAY", "Scanner array calibrated."],
      ["MISSION ENGINE", "Genesis mission uploaded."],
      ["FLIGHT HUD", "Pilot interface online."]
    ];

    this.flightOpsLog.innerHTML = "";
    this.flightOpsProgressBar.style.width = "0%";
    this.flightOpsPercent.textContent = "0%";
    this.flightOpsPhase.textContent =
      "PREPARING EXPLORER UNIT";
    if (this.flightOpsUnitState) {
      this.flightOpsUnitState.textContent = "DORMANT";
    }

    if (this.launchCountdownValue) {
      this.launchCountdownValue.textContent = "STANDBY";
    }

    if (this.flightDockingStatus) {
      this.flightDockingStatus.textContent = "ENGAGED";
    }

    if (this.flightThrustStatus) {
      this.flightThrustStatus.textContent = "0%";
    }

    if (this.flightScannerStatus) {
      this.flightScannerStatus.textContent = "STANDBY";
    }

    if (this.flightControlStatus) {
      this.flightControlStatus.textContent = "LOCKED";
    }
    this.flightOpsStatus.textContent =
      "CONNECTING FLIGHT SYSTEMS...";

    this.flightOpsSystemItems.forEach((item) => {
      item.classList.remove("is-online");
      item.querySelector("strong").textContent =
        "STANDBY";
    });

    const activateStep = (index) => {
      if (index >= steps.length) {
        this.flightOpsPercent.textContent = "100%";
        this.flightOpsProgressBar.style.width = "100%";
        this.flightOpsPhase.textContent =
          "FLIGHT OPERATIONS READY";
        this.flightOpsStatus.textContent =
          "FINAL LAUNCH CHECKS IN PROGRESS";

        if (this.flightDockingStatus) {
          this.flightDockingStatus.textContent = "RELEASING";
        }

        if (this.flightThrustStatus) {
          this.flightThrustStatus.textContent = "100%";
        }

        if (this.flightScannerStatus) {
          this.flightScannerStatus.textContent = "ACTIVE";
        }

        this.hangarScreen.classList.add(
          "flight-ready",
          "service-arms-active",
          "scanner-active"
        );

        this.runFlightCountdown();
        return;
      }

      const [systemName, message] = steps[index];
      const item = this.flightOpsSystemItems[index];
      const progress = Math.round(
        ((index + 1) / steps.length) * 100
      );

      item.classList.add("is-online");
      item.querySelector("strong").textContent =
        "ONLINE";

      if (this.flightOpsUnitState) {
        const unitStates = [
          "POWERING",
          "THRUSTERS CHARGING",
          "NAVIGATION LINKED",
          "SCANNER CALIBRATED",
          "MISSION UPLOADED",
          "READY"
        ];
        this.flightOpsUnitState.textContent =
          unitStates[index] || "READY";
      }

      const logLine = document.createElement("div");
      logLine.innerHTML =
        `<span>[OK]</span><strong>${message}</strong>`;
      this.flightOpsLog.append(logLine);
      this.flightOpsLog.scrollTop =
        this.flightOpsLog.scrollHeight;

      this.flightOpsPercent.textContent =
        `${progress}%`;
      this.flightOpsProgressBar.style.width =
        `${progress}%`;
      this.flightOpsStatus.textContent =
        message.toUpperCase();

      if (this.flightThrustStatus) {
        const thrustLevels = [
          "10%",
          "35%",
          "55%",
          "70%",
          "85%",
          "100%"
        ];
        this.flightThrustStatus.textContent =
          thrustLevels[index] || "100%";
      }

      if (
        this.flightScannerStatus &&
        index >= 3
      ) {
        this.flightScannerStatus.textContent =
          index >= 5 ? "ACTIVE" : "CALIBRATING";
      }

      window.setTimeout(
        () => activateStep(index + 1),
        520
      );
    };

    window.setTimeout(
      () => activateStep(0),
      450
    );
  }

  runFlightCountdown() {
    const sequence = ["3", "2", "1", "LAUNCH"];
    let index = 0;

    const advance = () => {
      const value = sequence[index];

      this.onLaunchCountdownAudioRequested?.(
        value
      );

      if (this.launchCountdownValue) {
        this.launchCountdownValue.textContent =
          value;
      }

      this.hangarScreen.classList.remove(
        "countdown-pulse"
      );

      void this.hangarScreen.offsetWidth;

      this.hangarScreen.classList.add(
        "countdown-pulse"
      );

      if (value === "2") {
        this.hangarScreen.classList.add(
          "clamps-released"
        );

        if (this.flightDockingStatus) {
          this.flightDockingStatus.textContent =
            "RELEASED";
        }
      }

      if (value === "1") {
        this.hangarScreen.classList.add(
          "hangar-open"
        );

        if (this.flightControlStatus) {
          this.flightControlStatus.textContent =
            "TRANSFER";
        }
      }

      if (value === "LAUNCH") {
        this.hangarScreen.classList.add(
          "vehicle-launching"
        );

        this.flightOpsStatus.textContent =
          "EXPLORER DEPLOYMENT — CONTROL TRANSFER ACTIVE";

        if (this.flightControlStatus) {
          this.flightControlStatus.textContent =
            "ONLINE";
        }

        window.setTimeout(() => {
          this.deployFromHangar();
        }, 1450);

        return;
      }

      index += 1;
      window.setTimeout(advance, 850);
    };

    window.setTimeout(advance, 600);
  }

  deployFromHangar() {
    this.hangarScreen.classList.add("is-hidden");
    this.runEngineeringVerseArrival();
  }

  runEngineeringVerseArrival() {
    const destinations = [
      "IDENTITY CONSTELLATION",
      "PROJECT EARTH",
      "CAPABILITY NEXUS",
      "JOURNEY MOON",
      "COMMUNICATIONS STATION",
      "SOURCE CODE SATELLITE",
      "EES GATEWAY"
    ];

    const auraMessages = [
      "Navigation Matrix synchronized.",
      "The Engineering Verse perimeter is stable.",
      "Portfolio destinations are responding.",
      "Your first waypoint is ready.",
      "Explorer control transfer is imminent."
    ];

    this.verseArrivalScreen.classList.remove("is-hidden");
    this.verseArrivalScreen.classList.remove(
      "verse-ready",
      "verse-reveal"
    );

    this.verseArrivalPercent.textContent = "0%";
    this.verseArrivalBar.style.width = "0%";
    this.verseArrivalStatus.textContent =
      "SYNCHRONIZING DESTINATION NETWORK";
    this.verseArrivalTitle.textContent =
      "ENTERING THE EESIVERSE";
    this.verseArrivalMessage.textContent =
      "Navigation Matrix is aligning the explorer with the portfolio destination network.";

    this.verseDestinationItems.forEach((item) => {
      item.classList.remove("is-online");
      item.querySelector("strong").textContent =
        "LOCATING";
    });

    let destinationIndex = 0;

    const activateDestination = () => {
      if (
        destinationIndex >=
        this.verseDestinationItems.length
      ) {
        this.verseArrivalPercent.textContent =
          "100%";
        this.verseArrivalBar.style.width = "100%";
        this.verseArrivalStatus.textContent =
          "ENGINEERING VERSE ONLINE";
        this.verseArrivalTitle.textContent =
          "WELCOME TO THE ENGINEERING VERSE";
        this.verseArrivalMessage.textContent =
          "All portfolio destinations are available for exploration.";
        this.verseAuraMessage.textContent =
          "Explorer systems are ready. I will guide you when needed.";

        this.verseArrivalScreen.classList.add(
          "verse-ready"
        );

        window.setTimeout(() => {
          this.verseArrivalScreen.classList.add(
            "verse-reveal"
          );
        }, 650);

        window.setTimeout(() => {
          this.completeEngineeringVerseArrival();
        }, 1750);

        return;
      }

      const item =
        this.verseDestinationItems[
          destinationIndex
        ];

      item.classList.add("is-online");
      item.querySelector("strong").textContent =
        "ONLINE";

      const progress = Math.round(
        ((destinationIndex + 1) /
          this.verseDestinationItems.length) *
          100
      );

      this.verseArrivalPercent.textContent =
        `${progress}%`;

      this.verseArrivalBar.style.width =
        `${progress}%`;

      this.verseArrivalStatus.textContent =
        `LINKING ${destinations[destinationIndex]}`;

      this.verseAuraMessage.textContent =
        auraMessages[
          Math.min(
            destinationIndex,
            auraMessages.length - 1
          )
        ];

      destinationIndex += 1;

      window.setTimeout(
        activateDestination,
        390
      );
    };

    window.setTimeout(
      activateDestination,
      500
    );
  }

  completeEngineeringVerseArrival() {
    this.verseArrivalScreen.classList.add("is-hidden");
    this.startExperience();
    this.missionPanel.classList.remove("is-hidden");

    this.showMessage(
      "Engineering Verse online. Explorer control transferred."
    );
  }

  updateMission(zone, distance) {
    if (this.missionCompleted) return;

    const targetId = "about";

    if (!zone || zone.id !== targetId) {
      this.missionObjective.textContent = "Set waypoint: Identity Constellation";
      this.missionProgressBar.style.width = "12%";
      return;
    }

    const progress = Math.max(12, Math.min(100, 100 - (distance / 250) * 88));
    this.missionProgressBar.style.width = `${progress}%`;
    this.missionObjective.textContent = `${Math.round(distance)} units to Engineering Command`;

    if (distance <= zone.landingRadius) {
      this.missionObjective.textContent = "Landing zone reached. Complete landing.";
      this.missionProgressBar.style.width = "92%";
    }
  }

  completeMission() {
    if (this.missionCompleted) return;

    this.missionCompleted = true;
    this.missionTitle.textContent = "Mission Complete";
    this.missionObjective.textContent = "Engineering Command reached";
    this.missionProgressBar.style.width = "100%";
    this.showMessage("Genesis mission complete.");

    window.setTimeout(() => {
      this.missionPanel.classList.add("is-hidden");
    }, 4000);
  }

  startExperience() {
    this.started = true;
    this.bootScreen.classList.add("is-hidden");
    this.hangarScreen.classList.add("is-hidden");
    this.missionHud.classList.remove("is-hidden");
    this.crosshair.classList.remove("is-hidden");
    this.inputManager.setEnabled(true);
    this.setFlightStatus("ONLINE");
    this.showMessage("EES flight controller online.");

    if (typeof this.onExperienceStarted === "function") {
      this.onExperienceStarted();
    }
  }

  updateFlightData(speed, altitude) {
    this.speedValue.textContent = Math.round(speed);
    this.altitudeValue.textContent = Math.round(altitude);
  }

  updateLivingTelemetry({
    elapsed,
    power,
    navigation,
    portal,
    sector,
    activity
  }) {
    const totalSeconds = Math.max(0, Math.floor(elapsed));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    this.livingUptime.textContent =
      `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    this.livingPower.textContent = Math.round(power);
    this.livingNavigation.textContent = Math.round(navigation);
    this.livingPortal.textContent = Math.round(portal);
    this.livingSector.textContent = sector;
    this.livingActivity.textContent = activity;
  }

  setVerseActivityVisible(visible) {
    this.verseActivityTicker.classList.toggle("is-hidden", !visible);
  }

  updateVerseActivity(message) {
    this.verseActivityMessage.textContent = message;
    this.verseActivityTicker.classList.remove("activity-pulse");
    void this.verseActivityTicker.offsetWidth;
    this.verseActivityTicker.classList.add("activity-pulse");
    window.clearTimeout(this.verseActivityTimer);
    this.verseActivityTimer = window.setTimeout(() => {
      this.verseActivityTicker.classList.remove("activity-pulse");
    }, 2200);
  }

  updateDestinationFacility({
    facility,
    approach,
    docking,
    zone
  }) {
    this.destinationFacility.textContent =
      facility;
    this.destinationApproach.textContent =
      approach;
    this.destinationDocking.textContent =
      docking;

    this.destinationFacility.classList.toggle(
      "facility-active",
      Boolean(zone)
    );
  }

  setFacilityArrivalVisible(visible) {
    this.facilityArrivalBanner.classList.toggle(
      "is-hidden",
      !visible
    );
  }

  showFacilityArrival({
    title,
    message
  }) {
    this.facilityArrivalTitle.textContent =
      title;
    this.facilityArrivalMessage.textContent =
      message;

    this.facilityArrivalBanner.classList.remove(
      "is-hidden",
      "facility-arrival-pulse"
    );

    void this.facilityArrivalBanner.offsetWidth;

    this.facilityArrivalBanner.classList.add(
      "facility-arrival-pulse"
    );

    window.clearTimeout(
      this.facilityArrivalTimer
    );

    this.facilityArrivalTimer =
      window.setTimeout(() => {
        this.facilityArrivalBanner.classList.add(
          "is-hidden"
        );
      }, 4200);
  }

  openFacilityOperations(zone) {
    this.facilityOperationsTitle.textContent =
      zone.title;

    this.facilityOperationsState.textContent =
      "DOCKING";

    this.facilityOperationsMessage.textContent =
      "Landing confirmed. Beginning facility connection.";

    this.facilityOperationsPercent.textContent =
      "0%";

    this.facilityOperationsBar.style.width =
      "0%";

    this.facilityLocalPower.textContent =
      "0%";

    this.facilityDataLink.textContent =
      "OFFLINE";

    this.facilityPortalLink.textContent =
      "LOCKED";

    this.facilityOperationsSteps.forEach(
      (item) => {
        item.classList.remove("is-complete");
        item.querySelector("strong").textContent =
          "WAITING";
      }
    );

    this.facilityOperationsConsole.classList.remove(
      "is-hidden"
    );
  }

  updateFacilityOperations({
    index,
    total,
    message,
    power,
    data,
    portal
  }) {
    const progress =
      Math.round(((index + 1) / total) * 100);

    const item =
      this.facilityOperationsSteps[index];

    if (item) {
      item.classList.add("is-complete");
      item.querySelector("strong").textContent =
        "ONLINE";
    }

    this.facilityOperationsState.textContent =
      progress >= 100
        ? "READY"
        : "CONNECTING";

    this.facilityOperationsMessage.textContent =
      message;

    this.facilityOperationsPercent.textContent =
      `${progress}%`;

    this.facilityOperationsBar.style.width =
      `${progress}%`;

    this.facilityLocalPower.textContent =
      `${power}%`;

    this.facilityDataLink.textContent =
      data;

    this.facilityPortalLink.textContent =
      portal;
  }

  completeFacilityOperations(zone) {
    this.facilityOperationsState.textContent =
      "OPERATIONAL";

    this.facilityOperationsMessage.textContent =
      `${zone.title} connected. Portal access is ready.`;

    this.facilityOperationsPercent.textContent =
      "100%";

    this.facilityOperationsBar.style.width =
      "100%";

    this.facilityLocalPower.textContent =
      "100%";

    this.facilityDataLink.textContent =
      "ONLINE";

    this.facilityPortalLink.textContent =
      "READY";

    this.showMessage(
      `${zone.title} facility operations online.`
    );
  }

  closeFacilityOperations() {
    this.facilityOperationsConsole.classList.add(
      "is-hidden"
    );
  }

  openDestinationCommand(
    zone,
    profile
  ) {
    this.destinationCommandTitle.textContent =
      profile.title;

    this.destinationCommandStatus.textContent =
      "ONLINE";

    this.destinationCommandObjective.textContent =
      profile.objective;

    this.destinationCommandSystems.innerHTML =
      "";

    profile.systems.forEach(
      (system, index) => {
        const item =
          document.createElement("div");

        item.innerHTML =
          `<i></i><span>${system}</span><strong>ONLINE</strong>`;

        item.style.setProperty(
          "--command-delay",
          `${index * 90}ms`
        );

        this.destinationCommandSystems.append(
          item
        );
      }
    );

    this.destinationMetricOneLabel.textContent =
      profile.labels[0];

    this.destinationMetricTwoLabel.textContent =
      profile.labels[1];

    this.destinationMetricThreeLabel.textContent =
      profile.labels[2];

    this.destinationCommandAura.textContent =
      profile.aura;

    this.destinationCommandModule.classList.remove(
      "is-hidden"
    );

    this.destinationCommandModule.classList.remove(
      "command-module-enter"
    );

    void this.destinationCommandModule.offsetWidth;

    this.destinationCommandModule.classList.add(
      "command-module-enter"
    );
  }

  updateDestinationCommandMetrics(values) {
    this.destinationMetricOneValue.textContent =
      values[0];

    this.destinationMetricTwoValue.textContent =
      values[1];

    this.destinationMetricThreeValue.textContent =
      values[2];
  }

  closeDestinationCommand() {
    this.destinationCommandModule.classList.add(
      "is-hidden"
    );
  }

  setDiscoveryProtocolVisible(visible) {
    this.discoveryProtocolConsole.classList.toggle("is-hidden",!visible);
  }
  initializeDiscoveryProtocol(achievements,unlocked) {
    this.discoveryAchievementList.innerHTML="";
    achievements.forEach(a=>{
      const item=document.createElement("div");item.dataset.achievementId=a.id;
      item.innerHTML=`<i></i><span><strong>${a.title}</strong><small>${a.description}</small></span><b>${unlocked.has(a.id)?"UNLOCKED":"LOCKED"}</b>`;
      item.classList.toggle("is-unlocked",unlocked.has(a.id));this.discoveryAchievementList.append(item);
    });
  }
  updateDiscoverySignal({target,distance,range,scannerMode,elapsed}) {
    if(!target){this.discoveryProtocolState.textContent="STANDBY";this.discoveryNearestSignal.textContent="NO SIGNAL";this.discoverySignalDetail.textContent=`Scanner mode ${scannerMode}. No compatible undiscovered target detected.`;this.discoverySignalDot.style.opacity="0";return}
    const inRange=distance<=range;this.discoveryProtocolState.textContent=inRange?"SIGNAL LOCK":"SEARCHING";
    this.discoveryNearestSignal.textContent=target.kind==="artifact"?"HIDDEN ARTIFACT":target.title;
    this.discoverySignalDetail.textContent=`${Math.round(distance)} units away • ${scannerMode} mode • ${inRange?"within scan range":`move within ${range} units`}`;
    const strength=Math.max(0,Math.min(1,1-distance/Math.max(range*2,1)));
    this.discoverySignalDot.style.opacity=String(.2+strength*.8);
    this.discoverySignalDot.style.transform=`translate(-50%,-50%) rotate(${elapsed*32}deg) translateX(${18+(1-strength)*28}px)`;
    this.discoveryProtocolConsole.classList.toggle("signal-locked",inRange);
  }
  updateDiscoveryProtocolProgress({recovered,total,xp}) {
    this.discoveryArtifactProgress.textContent=`${recovered} / ${total}`;
    this.discoveryRecoveryPercent.textContent=`${total?Math.round(recovered/total*100):0}%`;
    this.discoveryXp.textContent=String(xp);
  }
  updateDiscoveryActivity(message) {this.discoveryProtocolState.textContent="ARCHIVE UPDATED";this.discoverySignalDetail.textContent=message}
  unlockDiscoveryAchievement(a) {
    const item=this.discoveryAchievementList.querySelector(`[data-achievement-id="${a.id}"]`);
    if(item){item.classList.add("is-unlocked");item.querySelector("b").textContent="UNLOCKED"}
    this.discoveryAchievementTitle.textContent=a.title;this.discoveryAchievementMessage.textContent=a.description;
    this.discoveryAchievementToast.classList.remove("is-hidden","achievement-enter");void this.discoveryAchievementToast.offsetWidth;
    this.discoveryAchievementToast.classList.add("achievement-enter");clearTimeout(this.discoveryAchievementTimer);
    this.discoveryAchievementTimer=setTimeout(()=>this.discoveryAchievementToast.classList.add("is-hidden"),4800);
  }

  setMissionCommandVisible(visible){this.missionCommandConsole.classList.toggle("is-hidden",!visible)}
  initializeMissionCommand(mission,optional,initial){
    this.missionCommandTitle.textContent=`MISSION ${mission.number} / 7`;this.missionCommandState.textContent=initial?"SYNCHRONIZED":"NEW DIRECTIVE";
    this.missionCommandDirective.textContent=mission.title;this.missionCommandGuidance.textContent=mission.objective;
    this.missionCommandTarget.textContent=mission.targetZoneId.replaceAll("-"," ").toUpperCase();
    this.missionCommandOptional.textContent=optional.text;this.missionCommandOptionalState.textContent=optional.complete?"COMPLETE":"ACTIVE";
    this.missionCommandOptionalIndicator.classList.toggle("is-complete",optional.complete);
    this.missionCommandConsole.classList.remove("mission-command-enter");void this.missionCommandConsole.offsetWidth;this.missionCommandConsole.classList.add("mission-command-enter");
  }
  updateMissionCommand({phase,elapsed,grade,progress,optional}){
    const t=Math.max(0,Math.floor(elapsed)),m=Math.floor(t/60),s=t%60;
    this.missionCommandState.textContent=phase==="COMPLETE"?"COMPLETE":"ACTIVE";this.missionCommandPhase.textContent=phase;
    this.missionCommandElapsed.textContent=`${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;this.missionCommandGrade.textContent=grade;
    this.missionCommandRouteBar.style.width=`${Math.round(progress)}%`;this.missionCommandRoutePercent.textContent=`${Math.round(progress)}%`;
    this.missionCommandRouteStatus.textContent=progress>=100?"OBJECTIVE COMPLETE":progress>=70?"FINAL APPROACH":progress>=30?"ROUTE ACQUIRED":"SEARCHING";
    this.missionCommandOptionalState.textContent=optional.complete?"COMPLETE":"ACTIVE";this.missionCommandOptionalIndicator.classList.toggle("is-complete",optional.complete);
  }
  setMissionCommandComplete(state){
    this.missionCommandTitle.textContent="GENESIS CAMPAIGN";this.missionCommandState.textContent="COMPLETE";this.missionCommandDirective.textContent="All seven Genesis missions completed.";
    this.missionCommandGuidance.textContent=`Campaign archive secured with ${state.xp} XP.`;this.missionCommandPhase.textContent="CAMPAIGN COMPLETE";this.missionCommandTarget.textContent="ENGINEERING VERSE";
    this.missionCommandRouteBar.style.width="100%";this.missionCommandRoutePercent.textContent="100%";this.missionCommandRouteStatus.textContent="ARCHIVED";
  }
  showMissionDebrief({mission,grade,optionalComplete,nextMission}){
    this.missionDebriefTitle.textContent=mission.title;this.missionDebriefGrade.textContent=grade;this.missionDebriefXp.textContent=`+${mission.xp} XP`;
    this.missionDebriefMessage.textContent=optionalComplete?"Primary and optional objectives completed. Mission data archived.":"Primary objective completed. Optional objective remains incomplete.";
    this.missionDebriefNext.textContent=nextMission?`${nextMission.title} — ${nextMission.objective}`:"Genesis campaign complete. Free exploration authorized.";
    this.missionDebrief.classList.remove("is-hidden","mission-debrief-enter");void this.missionDebrief.offsetWidth;this.missionDebrief.classList.add("mission-debrief-enter");
  }
  hideMissionDebrief(){this.missionDebrief.classList.add("is-hidden")}

  setAuraOperationsVisible(visible) {
    this.auraOperationsConsole.classList.toggle(
      "is-hidden",
      !visible
    );
  }

  updateAuraOperations({
    recommendation,
    mission,
    scannerMode,
    hull,
    energy,
    landed,
    autopilot,
    idleElapsed
  }) {
    this.auraOperationsFocus.textContent =
      recommendation.focus;

    this.auraOperationsState.textContent =
      recommendation.priority === "high"
        ? "ATTENTION"
        : "MONITORING";

    this.auraRecommendationTitle.textContent =
      recommendation.title;

    this.auraRecommendationReason.textContent =
      recommendation.reason;

    this.auraConfidenceValue.textContent =
      `${recommendation.confidence}%`;

    this.auraConfidenceBar.style.width =
      `${recommendation.confidence}%`;

    this.auraContextMission.textContent =
      mission
        ? `M${mission.number} ACTIVE`
        : "COMPLETE";

    this.auraContextScanner.textContent =
      scannerMode.toUpperCase();

    this.auraContextCraft.textContent =
      hull < 35
        ? `CRITICAL ${hull}%`
        : energy < 18
          ? `LOW ENERGY ${energy}%`
          : "NOMINAL";

    this.auraContextMobility.textContent =
      landed
        ? "LANDED"
        : autopilot
          ? "AUTOPILOT"
          : idleElapsed > 18
            ? "IDLE"
            : "MANUAL";

    this.auraOperationsConsole.classList.toggle(
      "aura-attention",
      recommendation.priority === "high"
    );
  }

  updateAuraObservations(observations) {
    this.auraObservationItems.innerHTML = "";

    if (!observations.length) {
      const empty =
        document.createElement("div");

      empty.className =
        "aura-observation-empty";

      empty.textContent =
        "AURA is establishing an operational baseline.";

      this.auraObservationItems.append(
        empty
      );

      return;
    }

    observations.forEach(
      (observation) => {
        const item =
          document.createElement("div");

        const seconds =
          Math.max(
            0,
            Math.floor(observation.time)
          );

        item.innerHTML =
          `<i></i><span>${observation.message}</span><strong>T+${seconds}s</strong>`;

        this.auraObservationItems.append(
          item
        );
      }
    );
  }

  bindAuraPresence() {
    this.auraPresenceCore.addEventListener(
      "click",
      () => {
        this.auraOperationsConsole.classList.remove(
          "is-hidden",
          "adaptive-user-hidden",
          "is-collapsed"
        );

        this.setAuraPresenceExpanded(
          false
        );
      }
    );
  }

  setAuraPresenceVisible(visible) {
    this.auraPresence.classList.toggle(
      "is-hidden",
      !visible
    );
  }

  setAuraPresenceExpanded(expanded) {
    this.auraPresence.classList.toggle(
      "is-speaking",
      expanded
    );

    this.auraPresenceCallout.classList.toggle(
      "is-hidden",
      !expanded
    );
  }

  updateAuraPresence({
    status,
    title,
    message,
    confidence,
    priority
  }) {
    this.auraPresenceStatus.textContent =
      status;

    this.auraPresenceTitle.textContent =
      title;

    this.auraPresenceMessage.textContent =
      message;

    this.auraPresenceConfidence.textContent =
      `CONFIDENCE ${confidence}%`;

    this.auraPresence.classList.toggle(
      "aura-presence-alert",
      priority === "high"
    );

    this.onAuraPresenceCue?.(
      priority
    );
  }

  bindSystemConsole() {
    const toggleConsole = () => {
      const opening =
        this.systemConsole.classList.contains(
          "is-hidden"
        );

      this.systemConsole.classList.toggle(
        "is-hidden",
        !opening
      );

      this.systemConsoleToggle.setAttribute(
        "aria-expanded",
        String(opening)
      );
    };

    this.systemConsoleToggle.addEventListener(
      "pointerup",
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleConsole();
      }
    );

    this.systemConsoleToggle.addEventListener(
      "click",
      (event) => {
        if (event.detail !== 0) return;
        event.preventDefault();
        toggleConsole();
      }
    );

    this.systemConsoleClose.addEventListener(
      "click",
      () => {
        this.systemConsole.classList.add(
          "is-hidden"
        );

        this.systemConsoleToggle.setAttribute(
          "aria-expanded",
          "false"
        );
      }
    );

    this.systemTabButtons.forEach(
      (button) =>
        button.addEventListener(
          "click",
          () => {
            const tab =
              button.dataset.systemTab;

            this.systemTabButtons.forEach(
              (item) =>
                item.classList.toggle(
                  "is-active",
                  item === button
                )
            );

            this.systemPanels.forEach(
              (panel) =>
                panel.classList.toggle(
                  "is-active",
                  panel.dataset.systemPanel === tab
                )
            );
          }
        )
    );

    this.systemProfileButtons.forEach(
      (button) =>
        button.addEventListener(
          "click",
          () =>
            this.onExperienceProfileRequested?.(
              button.dataset.systemProfile
            )
        )
    );

    this.systemShowAll.addEventListener(
      "click",
      () =>
        this.onCommandDeckShowAllRequested?.()
    );

    this.systemHideAll.addEventListener(
      "click",
      () =>
        this.onCommandDeckHideAllRequested?.()
    );

    this.systemResetLayout.addEventListener(
      "click",
      () =>
        this.onCommandDeckResetRequested?.()
    );

    this.systemMotionLevel.addEventListener(
      "change",
      () =>
        this.onExperienceMotionRequested?.(
          this.systemMotionLevel.value
        )
    );

    this.systemGuidanceLevel.addEventListener(
      "change",
      () =>
        this.onExperienceGuidanceRequested?.(
          this.systemGuidanceLevel.value
        )
    );

    this.systemContextPanels.addEventListener(
      "change",
      () =>
        this.onSystemContextPanelsRequested?.(
          this.systemContextPanels.checked
        )
    );

    this.systemAuraPresence.addEventListener(
      "change",
      () =>
        this.onAuraPresenceRequested?.(
          this.systemAuraPresence.checked
        )
    );

    this.systemCinematicCamera.addEventListener(
      "change",
      () =>
        this.onCinematicCameraRequested?.(
          this.systemCinematicCamera.checked
        )
    );

    this.systemAdaptiveAudio.addEventListener(
      "change",
      () =>
        this.onAdaptiveAudioRequested?.(
          this.systemAdaptiveAudio.checked
        )
    );

    this.systemAudioVolume.addEventListener(
      "input",
      () => {
        const volume =
          Number(
            this.systemAudioVolume.value
          ) / 100;

        this.onAudioVolumeRequested?.(
          volume
        );

        this.systemAudioVolumeValue.textContent =
          `${this.systemAudioVolume.value}%`;
      }
    );

    this.systemReturnCommand.addEventListener(
      "click",
      () => {
        this.systemConsole.classList.add(
          "is-hidden"
        );

        this.systemConsoleToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        this.openCommandCenterConfirmation();
      }
    );

    this.cancelCommandCenterReturn.addEventListener(
      "click",
      () =>
        this.closeCommandCenterConfirmation()
    );

    this.commandCenterConfirmation.addEventListener(
      "click",
      (event) => {
        if (
          event.target ===
          this.commandCenterConfirmation
        ) {
          this.closeCommandCenterConfirmation();
        }
      }
    );

    this.confirmCommandCenterReturn.addEventListener(
      "click",
      () => {
        this.closeCommandCenterConfirmation();
        this.openCommandCenter();
      }
    );

    this.commandCenterRetakeFlight.addEventListener(
      "click",
      () =>
        this.retakeFlightFromCommandCenter()
    );
  }

  openCommandCenterConfirmation() {
    this.commandCenterConfirmation.classList.remove(
      "is-hidden"
    );

    document.documentElement.classList.add(
      "command-center-confirmation-open"
    );

    window.setTimeout(
      () =>
        this.cancelCommandCenterReturn.focus(),
      30
    );
  }

  closeCommandCenterConfirmation() {
    this.commandCenterConfirmation.classList.add(
      "is-hidden"
    );

    document.documentElement.classList.remove(
      "command-center-confirmation-open"
    );
  }

  openCommandCenter() {
    this.endActiveSimulationInterface();

    /*
     * The Command Center was originally nested inside #experience.
     * Since command-center-active hides #experience, the new screen
     * was hidden with the simulation. Move it to document.body first.
     */
    if (
      this.commandCenterScreen.parentElement !==
      document.body
    ) {
      document.body.append(
        this.commandCenterScreen
      );
    }

    this.systemConsole.classList.add(
      "is-hidden"
    );

    this.systemConsoleToggle.classList.add(
      "is-hidden"
    );

    this.flightComputerShell.classList.add(
      "is-hidden"
    );

    this.commandCenterScreen.classList.remove(
      "is-hidden"
    );

    this.commandCenterScreen.setAttribute(
      "aria-hidden",
      "false"
    );

    document.documentElement.classList.add(
      "command-center-active"
    );

    this.onCommandCenterOpened?.();

    window.setTimeout(
      () =>
        this.commandCenterRetakeFlight.focus(),
      450
    );
  }

  endActiveSimulationInterface() {
    document
      .querySelectorAll(
        [
          ".adaptive-command-panel",
          "#aura-guide",
          "#mission-debrief",
          "#discovery-achievement-toast",
          "#facility-arrival-banner",
          "#verse-event-banner",
          "#waypoint-controls",
          "#robot-controls"
        ].join(",")
      )
      .forEach(
        (element) => {
          element.classList.add(
            "is-hidden"
          );
        }
      );

    this.commandCenterConfirmation.classList.add(
      "is-hidden"
    );

    document.documentElement.classList.remove(
      "command-center-confirmation-open"
    );

    document.body.classList.add(
      "simulation-ended"
    );
  }

  retakeFlightFromCommandCenter() {
    this.commandCenterScreen.classList.add(
      "is-hidden"
    );

    this.commandCenterScreen.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "simulation-ended"
    );

    document.documentElement.classList.remove(
      "command-center-active"
    );

    this.systemConsoleToggle.classList.add(
      "is-hidden"
    );

    this.flightComputerShell.classList.add(
      "is-hidden"
    );

    this.clearCinematicTimers();

    this.bootScreen.dataset.started =
      "false";

    this.bootScreen.classList.add(
      "is-hidden"
    );

    this.bootScreen.setAttribute(
      "aria-hidden",
      "true"
    );

    this.hangarScreen.classList.add(
      "is-hidden"
    );

    this.hangarScreen.classList.remove(
      "clamps-released",
      "hangar-open",
      "vehicle-launching",
      "countdown-pulse"
    );

    this.genesisCinematic.classList.remove(
      "is-hidden",
      "is-complete"
    );

    this.genesisLaunchPad.classList.remove(
      "is-hidden",
      "cinematic-complete",
      "doors-opening"
    );

    this.genesisLaunchPad.setAttribute(
      "aria-hidden",
      "false"
    );

    this.cinematicCompleted =
      false;

    this.initializeGenesisCinematic();

    this.onCommandCenterRetakeFlight?.();
  }

  initializeSystemConsole() {
    this.systemConsoleToggle.classList.remove("is-hidden");
    this.systemPanelList.innerHTML="";
    this.commandDeckPanelControls.forEach((controls,panelId)=>{
      const row=document.createElement("div");
      row.dataset.systemPanelId=panelId;
      const label=controls.row.querySelector("span")?.textContent||panelId;
      row.innerHTML=`<span>${label}</span><button type="button" data-system-panel-visibility>VISIBLE</button><button type="button" data-system-panel-collapse>EXPANDED</button>`;
      this.systemPanelList.append(row);
      row.querySelector("[data-system-panel-visibility]").addEventListener("click",event=>{
        const visible=event.currentTarget.dataset.visible!=="false";
        this.onCommandDeckVisibilityRequested?.(panelId,!visible);
      });
      row.querySelector("[data-system-panel-collapse]").addEventListener("click",()=>this.onCommandDeckCollapseRequested?.(panelId));
    });
    document.querySelectorAll('[data-legacy-system-control="true"]').forEach(element=>element.classList.add("is-hidden"));
  }

  setFlightComputerVisible(visible){this.flightComputerShell.classList.toggle("is-hidden",!visible)}
  setSystemConsoleVisible(visible){this.systemConsoleToggle.classList.toggle("is-hidden",!visible)}
  updateFlightComputerContext(context) {
    const modes={flight:["FLIGHT COMPUTER","ENGINEERING VERSE"],scanning:["SCANNER COMPUTER","SIGNAL ACQUISITION"],approach:["LANDING COMPUTER","FINAL APPROACH"],docked:["FACILITY OPERATIONS","DESTINATION LINK"]};
    const [mode,detail]=modes[context]||modes.flight;
    this.flightComputerMode.textContent=mode;
    this.flightComputerContext.textContent=detail;
    document.documentElement.dataset.flightContext=context;
  }
  updateSoundscapeState(
    context,
    enabled,
    volume
  ) {
    const labels = {
      flight: "FLIGHT AMBIENCE",
      scanning: "SCANNER PULSE",
      approach: "APPROACH TENSION",
      docked: "DOCKING RESONANCE",
      command: "COMMAND AMBIENCE",
      unsupported: "UNSUPPORTED"
    };

    this.systemAudioState.textContent =
      enabled
        ? labels[context] || "FLIGHT AMBIENCE"
        : "MUTED";

    this.systemAdaptiveAudio.checked =
      enabled;

    this.systemAudioVolume.value =
      String(
        Math.round(
          volume * 100
        )
      );

    this.systemAudioVolumeValue.textContent =
      `${Math.round(volume * 100)}%`;
  }

  updateCameraDirectorState(
    context,
    enabled
  ) {
    const labels = {
      flight: "FLIGHT DRIFT",
      scanning: "SCANNER FOCUS",
      approach: "APPROACH FRAME",
      docked: "DOCKING FOCUS"
    };

    this.systemCameraState.textContent =
      enabled
        ? labels[context] || "FLIGHT DRIFT"
        : "MANUAL";

    this.systemCinematicCamera.checked =
      enabled;
  }

  updateSystemDiagnostics({context,activePanels}) {
    this.systemContextState.textContent=context.toUpperCase();
    this.systemPanelCount.textContent=`${activePanels} ACTIVE`;
    this.systemInterfaceState.textContent="ONLINE";
  }

  bindExperienceDirector() {
    this.experienceDirectorToggle.addEventListener(
      "click",
      () => {
        const opening =
          this.experienceDirector.classList.contains(
            "is-hidden"
          );

        this.experienceDirector.classList.toggle(
          "is-hidden",
          !opening
        );

        this.experienceDirectorToggle.setAttribute(
          "aria-expanded",
          String(opening)
        );
      }
    );

    this.experienceDirectorClose.addEventListener(
      "click",
      () => {
        this.experienceDirector.classList.add(
          "is-hidden"
        );

        this.experienceDirectorToggle.setAttribute(
          "aria-expanded",
          "false"
        );
      }
    );

    this.experienceProfileButtons.forEach(
      (button) => {
        button.addEventListener(
          "click",
          () => {
            this.onExperienceProfileRequested?.(
              button.dataset.experienceProfile
            );
          }
        );
      }
    );

    this.experienceMotionLevel.addEventListener(
      "change",
      () => {
        this.onExperienceMotionRequested?.(
          this.experienceMotionLevel.value
        );
      }
    );

    this.experienceGuidanceLevel.addEventListener(
      "change",
      () => {
        this.onExperienceGuidanceRequested?.(
          this.experienceGuidanceLevel.value
        );
      }
    );
  }

  initializeExperienceDirector({
    profile,
    motionLevel,
    guidanceLevel
  }) {
    this.experienceDirectorToggle.classList.remove(
      "is-hidden"
    );

    this.experienceMotionLevel.value =
      motionLevel;

    this.experienceGuidanceLevel.value =
      guidanceLevel;

    this.experienceProfileButtons.forEach(
      (button) => {
        button.classList.toggle(
          "is-active",
          button.dataset.experienceProfile ===
            profile
        );
      }
    );
  }

  updateExperienceDirector({
    profile,
    profileLabel,
    description,
    motionLevel,
    guidanceLevel,
    visibleCount
  }) {
    this.experienceDirectorCurrent.textContent =
      profileLabel;

    this.experienceDirectorDescription.textContent =
      description;

    this.experienceMotionLevel.value =
      motionLevel;

    this.experienceGuidanceLevel.value =
      guidanceLevel;

    this.experienceDirectorStatus.textContent =
      `${visibleCount} panels • ${motionLevel} motion • ${guidanceLevel} guidance`;

    this.experienceProfileButtons.forEach(
      (button) => {
        button.classList.toggle(
          "is-active",
          button.dataset.experienceProfile ===
            profile
        );
      }
    );
  }

  bindCommandDeck() {
    this.commandDeckToggle.addEventListener("click", () => {
      const opening = this.commandDeck.classList.contains("is-hidden");
      this.commandDeck.classList.toggle("is-hidden", !opening);
      this.commandDeckToggle.setAttribute("aria-expanded", String(opening));
    });

    this.commandDeckClose.addEventListener("click", () => {
      this.commandDeck.classList.add("is-hidden");
      this.commandDeckToggle.setAttribute("aria-expanded", "false");
    });
  }

  initializeCommandDeck(panelDefinitions) {
    this.commandDeckToggle.classList.remove("is-hidden");
    this.commandDeckPanelList.innerHTML = "";

    panelDefinitions.forEach((panel) => {
      const row = document.createElement("div");
      row.dataset.panelId = panel.id;
      row.innerHTML = `<span>${panel.label}</span><button type="button" data-panel-visibility="${panel.id}">VISIBLE</button><button type="button" data-panel-collapse="${panel.id}">EXPANDED</button>`;
      this.commandDeckPanelList.append(row);

      const visibilityButton = row.querySelector("[data-panel-visibility]");
      const collapseButton = row.querySelector("[data-panel-collapse]");
      this.commandDeckPanelControls.set(panel.id, { row, visibilityButton, collapseButton });

      visibilityButton.addEventListener("click", () => {
        const visible = visibilityButton.dataset.visible !== "false";
        this.onCommandDeckVisibilityRequested?.(panel.id, !visible);
      });

      collapseButton.addEventListener("click", () => {
        this.onCommandDeckCollapseRequested?.(panel.id);
      });
    });

    this.commandDeckShowAll.addEventListener("click", () => this.onCommandDeckShowAllRequested?.());
    this.commandDeckHideAll.addEventListener("click", () => this.onCommandDeckHideAllRequested?.());
    this.commandDeckResetLayout.addEventListener("click", () => this.onCommandDeckResetRequested?.());
  }

  updateCommandDeckPanelState(id, state) {
    const controls = this.commandDeckPanelControls.get(id);
    if (!controls) return;
    controls.visibilityButton.textContent = state.visible ? "VISIBLE" : "HIDDEN";
    controls.visibilityButton.dataset.visible = String(state.visible);
    controls.collapseButton.textContent = state.collapsed ? "COLLAPSED" : "EXPANDED";
    controls.row.classList.toggle("panel-hidden", !state.visible);
    controls.row.classList.toggle("panel-collapsed", state.collapsed);
  }

  updateDestination(zone, distance) {
    this.currentZone = zone;
    this.markerTitle.textContent = zone.title;
    this.markerDistance.textContent = Math.round(distance);
    this.nearestZone.textContent = zone.title;
  }

  showDestinationMarker() {
    this.destinationMarker.classList.remove("is-hidden");
  }

  hideDestinationMarker() {
    this.destinationMarker.classList.add("is-hidden");
  }

  setFlightStatus(status) {
    this.flightStatus.textContent = status;
  }

  openPortfolioOverlay(zone) {
    this.inputManager.setEnabled(false);
    this.overlayCategory.textContent = zone.category;
    this.overlayTitle.textContent = zone.title;
    this.overlayDescription.textContent = zone.description;
    this.overlayProjects.innerHTML = "";

    zone.projects.forEach((project) => {
      const projectElement = document.createElement("section");
      projectElement.className = "overlay-project";

      const heading = document.createElement("h3");
      heading.textContent = project.title;

      const description = document.createElement("p");
      description.textContent = project.description;

      projectElement.append(heading, description);
      this.overlayProjects.append(projectElement);
    });

    this.portfolioOverlay.classList.add("is-open");
    this.portfolioOverlay.setAttribute("aria-hidden", "false");
  }

  closePortfolioOverlay() {
    this.portfolioOverlay.classList.remove("is-open");
    this.portfolioOverlay.setAttribute("aria-hidden", "true");
    if (this.started) this.inputManager.setEnabled(true);
    if (typeof this.onOverlayClosed === "function") this.onOverlayClosed();
  }

  initializeFloatingControls() {
    const saved =
      this.readControlsWindowState();

    if (saved) {
      this.controlsPinned =
        Boolean(saved.pinned);

      this.controlsMinimized =
        Boolean(saved.minimized);

      this.controlsPanel.style.left =
        `${saved.left}px`;

      this.controlsPanel.style.top =
        `${saved.top}px`;

      this.controlsPanel.style.right =
        "auto";

      this.controlsPanel.style.bottom =
        "auto";

      this.controlsPanel.style.transform =
        "none";
    } else {
      this.resetControlsPosition(false);
    }

    this.applyControlsWindowState();

    this.controlsDragHandle.addEventListener(
      "pointerdown",
      (event) =>
        this.startControlsDrag(event)
    );

    window.addEventListener(
      "pointermove",
      (event) =>
        this.moveControlsDrag(event)
    );

    window.addEventListener(
      "pointerup",
      () =>
        this.endControlsDrag()
    );

    window.addEventListener(
      "resize",
      () =>
        this.keepControlsInViewport()
    );
  }

  toggleFloatingControls() {
    const hidden =
      this.controlsPanel.classList.contains(
        "is-hidden"
      );

    if (hidden) {
      this.showFloatingControls();
    } else {
      this.hideFloatingControls();
    }
  }

  showFloatingControls() {
    this.controlsPanel.classList.remove(
      "is-hidden"
    );

    this.keepControlsInViewport();

    // Flight input intentionally stays enabled.
    this.showMessage(
      "Floating flight controls opened."
    );
  }

  hideFloatingControls() {
    this.controlsPanel.classList.add(
      "is-hidden"
    );

    this.controlsDragging = false;
  }

  toggleControlsPin() {
    this.controlsPinned =
      !this.controlsPinned;

    this.applyControlsWindowState();
    this.saveControlsWindowState();
  }

  toggleControlsMinimize() {
    this.controlsMinimized =
      !this.controlsMinimized;

    this.applyControlsWindowState();
    this.saveControlsWindowState();
  }

  applyControlsWindowState() {
    this.controlsPanel.classList.toggle(
      "is-pinned",
      this.controlsPinned
    );

    this.controlsPanel.classList.toggle(
      "is-minimized",
      this.controlsMinimized
    );

    this.pinControlsButton.textContent =
      this.controlsPinned
        ? "UNPIN"
        : "PIN";

    this.minimizeControlsButton.textContent =
      this.controlsMinimized
        ? "+"
        : "—";

    this.controlsWindowState.textContent =
      this.controlsPinned
        ? "PINNED"
        : "FREE";
  }

  startControlsDrag(event) {
    if (
      this.controlsPinned ||
      event.target.closest("button")
    ) {
      return;
    }

    const rect =
      this.controlsPanel
        .getBoundingClientRect();

    this.controlsDragging = true;

    this.controlsDragOffset = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };

    this.controlsPanel.classList.add(
      "is-dragging"
    );

    this.controlsDragHandle.setPointerCapture?.(
      event.pointerId
    );

    event.preventDefault();
  }

  moveControlsDrag(event) {
    if (!this.controlsDragging) {
      return;
    }

    const width =
      this.controlsPanel.offsetWidth;

    const height =
      this.controlsPanel.offsetHeight;

    const margin = 10;

    const left = Math.min(
      window.innerWidth - width - margin,
      Math.max(
        margin,
        event.clientX -
          this.controlsDragOffset.x
      )
    );

    const top = Math.min(
      window.innerHeight - height - margin,
      Math.max(
        margin,
        event.clientY -
          this.controlsDragOffset.y
      )
    );

    this.controlsPanel.style.left =
      `${left}px`;

    this.controlsPanel.style.top =
      `${top}px`;

    this.controlsPanel.style.right =
      "auto";

    this.controlsPanel.style.bottom =
      "auto";

    this.controlsPanel.style.transform =
      "none";
  }

  endControlsDrag() {
    if (!this.controlsDragging) {
      return;
    }

    this.controlsDragging = false;

    this.controlsPanel.classList.remove(
      "is-dragging"
    );

    this.saveControlsWindowState();
  }

  resetControlsPosition(save = true) {
    const panelWidth =
      Math.min(520, window.innerWidth - 24);

    const left = Math.max(
      12,
      window.innerWidth -
        panelWidth -
        22
    );

    const top = Math.max(
      90,
      Math.min(
        128,
        window.innerHeight - 180
      )
    );

    this.controlsPanel.style.left =
      `${left}px`;

    this.controlsPanel.style.top =
      `${top}px`;

    this.controlsPanel.style.right =
      "auto";

    this.controlsPanel.style.bottom =
      "auto";

    this.controlsPanel.style.transform =
      "none";

    if (save) {
      this.saveControlsWindowState();
      this.showMessage(
        "Controls position reset."
      );
    }
  }

  keepControlsInViewport() {
    if (
      this.controlsPanel.classList.contains(
        "is-hidden"
      )
    ) {
      return;
    }

    const rect =
      this.controlsPanel
        .getBoundingClientRect();

    const margin = 10;

    const left = Math.min(
      window.innerWidth -
        rect.width -
        margin,
      Math.max(margin, rect.left)
    );

    const top = Math.min(
      window.innerHeight -
        rect.height -
        margin,
      Math.max(margin, rect.top)
    );

    this.controlsPanel.style.left =
      `${Math.max(margin, left)}px`;

    this.controlsPanel.style.top =
      `${Math.max(margin, top)}px`;

    this.controlsPanel.style.transform =
      "none";

    this.saveControlsWindowState();
  }

  saveControlsWindowState() {
    const rect =
      this.controlsPanel
        .getBoundingClientRect();

    const state = {
      left: Math.round(rect.left),
      top: Math.round(rect.top),
      pinned: this.controlsPinned,
      minimized: this.controlsMinimized
    };

    try {
      window.localStorage.setItem(
        "ees-floating-controls-v1",
        JSON.stringify(state)
      );
    } catch (error) {
      console.warn(
        "Unable to save controls position:",
        error
      );
    }
  }

  readControlsWindowState() {
    try {
      const raw =
        window.localStorage.getItem(
          "ees-floating-controls-v1"
        );

      return raw
        ? JSON.parse(raw)
        : null;
    } catch (error) {
      console.warn(
        "Unable to restore controls position:",
        error
      );

      return null;
    }
  }

  openPanel(panel) {
    this.inputManager.setEnabled(false);
    this.navigationPanel.classList.add("is-hidden");
    this.missionLogPanel.classList.add("is-hidden");
    this.discoveriesPanel.classList.add("is-hidden");
    this.operationsPanel.classList.add("is-hidden");
    this.digitalTwinPanel.classList.add("is-hidden");
    this.auraCommandPanel.classList.add("is-hidden");
    panel.classList.remove("is-hidden");
  }

  closePanel(panel) {
    panel.classList.add("is-hidden");

    const portalOpen = this.portalInterface.classList.contains("is-open");
    const worldOpen = this.digitalWorld.classList.contains("is-open");

    if (this.started && !portalOpen && !worldOpen) {
      this.inputManager.setEnabled(true);
    }
  }

  buildMissionLog(missions, state) {
    this.missionList.innerHTML = "";

    missions.forEach((mission) => {
      const item = document.createElement("article");
      item.className = "mission-log-item";
      item.dataset.missionId = mission.id;
      item.innerHTML = `
        <span class="mission-index">${String(mission.number).padStart(2, "0")}</span>
        <div>
          <strong>${mission.title}</strong>
          <small>${mission.objective}</small>
        </div>
        <span class="mission-reward" data-reward="+${mission.xp} XP">+${mission.xp} XP</span>
      `;
      this.missionList.append(item);
    });

    this.updateMissionLogState(state);
  }

  updateMissionLogState(state) {
    this.logTotalXp.textContent = state.xp;
    this.missionXp.textContent = state.xp;
    this.logCompleteCount.textContent = state.completedMissionIds.length;
    this.logDiscoveryCount.textContent = state.discoveredZoneIds.length;

    [...this.missionList.children].forEach((item) => {
      const missionId = item.dataset.missionId;
      const complete = state.completedMissionIds.includes(missionId);
      item.classList.toggle("is-complete", complete);

      item.classList.toggle(
        "is-active",
        !complete &&
          this.missionsCurrentId === missionId
      );
    });
  }

  setActiveMission(mission, state) {
    this.missionsCurrentId = mission.id;
    this.missionPanel.classList.remove("is-hidden");
    this.missionTitle.textContent = mission.title;
    this.missionObjective.textContent = mission.objective;
    this.missionNumber.textContent = mission.number;
    this.missionXp.textContent = state.xp;
    this.logActiveMission.textContent = mission.title;

    this.updateMissionLogState(state);

    [...this.missionList.children].forEach((item) => {
      const complete =
        state.completedMissionIds.includes(
          item.dataset.missionId
        );

      item.classList.toggle(
        "is-active",
        !complete &&
          item.dataset.missionId === mission.id
      );
    });
  }

  updateMissionDetails(mission, zone, distance, state) {
    this.setActiveMission(mission, state);

    if (!zone || zone.id !== mission.targetZoneId) {
      this.missionObjective.textContent = mission.objective;
      this.missionProgressBar.style.width = "12%";
      return;
    }

    const progress = Math.max(
      12,
      Math.min(94, 100 - (distance / 300) * 88)
    );

    this.missionProgressBar.style.width = `${progress}%`;

    if (mission.completionType === "discover") {
      this.missionObjective.textContent =
        `${Math.round(distance)} units to scan range`;
    } else {
      this.missionObjective.textContent =
        `${Math.round(distance)} units to mission destination`;
    }
  }

  markMissionComplete(mission, state) {
    this.missionProgressBar.style.width = "100%";
    this.missionObjective.textContent =
      `Mission complete • +${mission.xp} XP`;
    this.updateMissionLogState(state);
  }

  setMissionCampaignComplete(state) {
    this.missionsCurrentId = null;
    this.missionPanel.classList.remove("is-hidden");
    this.missionTitle.textContent = "Genesis Campaign Complete";
    this.missionObjective.textContent =
      "All exploration objectives completed";
    this.missionNumber.textContent = "7";
    this.missionXp.textContent = state.xp;
    this.logActiveMission.textContent = "Campaign complete";
    this.missionProgressBar.style.width = "100%";
  }

  showAchievement(achievement) {
    this.achievementTitle.textContent = achievement.title;
    this.achievementDescription.textContent =
      achievement.description;
    this.achievementToast.classList.remove("is-hidden");

    window.clearTimeout(this.achievementTimer);
    this.achievementTimer = window.setTimeout(() => {
      this.achievementToast.classList.add("is-hidden");
    }, 5000);
  }

  updateScannerAvailability(
    zone,
    distance,
    scanRange,
    scanning
  ) {
    if (scanning) {
      this.scannerDistance.textContent =
        Math.round(distance);
      this.markerScanButton.disabled = true;
      this.markerScanButton.textContent =
        "Scanning...";
      return;
    }

    if (!zone) {
      this.scannerDistance.textContent = "—";
      this.markerScanButton.disabled = true;
      this.markerScanButton.textContent =
        "Scanner Sweep Clear";
      return;
    }

    const inRange =
      distance <= scanRange;

    this.scannerDistance.textContent =
      Math.round(distance);

    this.markerScanButton.disabled =
      !inRange;

    this.markerScanButton.textContent =
      inRange
        ? "Scan Signal"
        : "Signal Out of Range";

    if (
      this.scannerStatus.textContent !==
        "SCANNING" &&
      this.scannerStatus.textContent !==
        "COMPLETE"
    ) {
      this.scannerStatus.textContent =
        inRange
          ? "SIGNAL READY"
          : "STANDBY";
    }
  }

  setScannerMode(mode) {
    this.scannerModeStatus.textContent = mode;
    this.scannerModeButton.textContent =
      `Scanner: ${mode.charAt(0)}${mode
        .slice(1)
        .toLowerCase()}`;
  }

  openAuraPanel() {
    this.openPanel(this.auraCommandPanel);

    window.setTimeout(() => {
      this.auraCommandInput.focus();
    }, 60);
  }

  updateAuraContext(context) {
    this.auraLocation.textContent =
      context.zone
        ? context.zone.title
        : "OPEN SPACE";

    this.auraMission.textContent =
      context.mission
        ? context.mission.title
        : "COMPLETE";

    this.auraHull.textContent =
      `${context.hull}%`;

    this.auraEnergy.textContent =
      `${context.energy}%`;

    this.auraStatus.textContent =
      context.event
        ? "MONITORING"
        : "ONLINE";
  }

  addAuraMessage(role, message) {
    const card =
      document.createElement("article");

    card.className =
      `aura-message ${role === "user" ? "user" : "system"}`;

    card.innerHTML = `
      <span>${role === "user" ? "VISITOR" : "AURA"}</span>
      <p>${message}</p>
    `;

    this.auraMessageList.append(card);
    this.auraMessageList.scrollTop =
      this.auraMessageList.scrollHeight;
  }

  openDigitalTwinPanel(
    zone = null,
    runState = {}
  ) {
    this.currentZone = zone || this.currentZone;

    if (!this.currentZone) {
      this.showGuide(
        "No digital twin selected",
        "Approach or land at a destination before opening its twin."
      );
      return;
    }

    this.openPanel(this.digitalTwinPanel);

    this.twinPanelTitle.textContent =
      `${this.currentZone.title} Twin`;

    this.twinModelId.textContent =
      `TWIN-${this.currentZone.id.toUpperCase()}`;

    const record =
      runState[this.currentZone.id] || {
        runs: 0,
        bestEfficiency: 0
      };

    this.twinRunCount.textContent =
      record.runs || 0;

    this.twinEfficiencyScore.textContent =
      record.bestEfficiency
        ? `${record.bestEfficiency}%`
        : "—";
  }

  updateTwinAccess(state) {
    const available =
      state.landed &&
      Boolean(state.zone);

    this.digitalTwinButton.disabled =
      !state.zone;

    this.runTwinSimulationButton.disabled =
      !available || state.running;

    this.twinModelState.textContent =
      state.running
        ? "RUNNING"
        : available
          ? "READY"
          : "OFFLINE";

    this.setTwinStatus(
      state.running
        ? "RUNNING"
        : available
          ? "READY"
          : "OFFLINE"
    );
  }

  updateTwinTelemetry(
    telemetry,
    progress
  ) {
    this.twinCoreValue.textContent =
      `${Math.round(progress * 100)}%`;

    const entries = [
      ["System Load", telemetry.load],
      ["Stability", telemetry.stability],
      ["Throughput", telemetry.throughput],
      ["Risk", telemetry.risk]
    ];

    this.twinTelemetry.innerHTML = "";

    entries.forEach(([label, value]) => {
      const row =
        document.createElement("div");

      row.className =
        "telemetry-row";

      row.innerHTML = `
        <div>
          <span>${label}</span>
          <strong>${value}%</strong>
        </div>
        <div class="telemetry-bar">
          <span style="width:${value}%"></span>
        </div>
      `;

      this.twinTelemetry.append(row);
    });
  }

  updateTwinRunSummary(record) {
    this.twinRunCount.textContent =
      record.runs;

    this.twinEfficiencyScore.textContent =
      `${record.bestEfficiency}%`;
  }

  setTwinStatus(status) {
    this.twinStatus.textContent = status;
    this.twinModelState.textContent = status;
  }

  setTwinOutput(title, message) {
    this.twinOutput.innerHTML = `
      <span>${title}</span>
      <p>${message}</p>
    `;
  }

  resetTwinInterface() {
    this.twinCoreValue.textContent = "0%";
    this.twinTelemetry.innerHTML = "";

    this.twinScenarioButtons.forEach(
      (button, index) => {
        button.classList.toggle(
          "is-active",
          index === 0
        );
      }
    );

    this.setTwinOutput(
      "DIGITAL TWIN READY",
      "Select and run an engineering scenario."
    );
  }

  openOperationsPanel() {
    this.openPanel(this.operationsPanel);
  }

  updateOperationsState(state) {
    this.operationsHull.textContent =
      Math.round(state.hull);
    this.operationsEnergy.textContent =
      Math.round(state.energy);
    this.energyStatus.textContent =
      Math.round(state.energy);

    this.operationsDocking.textContent =
      state.landed ? "LANDED" : "IN FLIGHT";

    this.operationsService.textContent =
      state.service
        ? state.service.toUpperCase()
        : "NONE";

    const serviceEnabled =
      state.landed && !state.service;

    this.repairCraftButton.disabled =
      !serviceEnabled;
    this.rechargeCraftButton.disabled =
      !serviceEnabled;
  }

  setOperationsStatus(status) {
    this.operationsStatus.textContent =
      status;
  }

  setDiagnosticOutput(title, message) {
    this.diagnosticOutput.innerHTML = `
      <span>${title}</span>
      <p>${message}</p>
    `;
  }

  setTrafficSafetyStatus(status) {
    this.trafficSafetyStatus.textContent =
      status;

    this.trafficSafetyStatus.classList.toggle(
      "is-warning",
      status === "IMPACT" ||
      status === "CAUTION"
    );
  }

  setEventStatus(status) {
    this.eventStatus.textContent = status;
    this.eventStatus.classList.toggle(
      "is-warning",
      status !== "NONE"
    );
  }

  showSpaceEvent(event) {
    this.eventType.textContent =
      "DYNAMIC SPACE EVENT";
    this.eventTitle.textContent =
      event.title;
    this.eventDescription.textContent =
      event.description;

    this.spaceEventBanner.classList.remove(
      "is-hidden"
    );

    window.clearTimeout(
      this.spaceEventBannerTimer
    );

    this.spaceEventBannerTimer =
      window.setTimeout(() => {
        this.spaceEventBanner.classList.add(
          "is-hidden"
        );
      }, 6200);
  }

  hideSpaceEvent() {
    this.spaceEventBanner.classList.add(
      "is-hidden"
    );
  }

  setScannerStatus(status) {
    this.scannerStatus.textContent = status;
  }

  updateDiscoveryCount(current, total) {
    this.discoveryCount.textContent = current;
    this.archiveWorldCount.textContent = current;
  }

  updateArtifactCount(current, total) {
    this.artifactCount.textContent = current;
    this.artifactTotal.textContent = total;
    this.archiveArtifactCount.textContent = current;
    this.archiveArtifactTotal.textContent = total;
  }

  updateArtifactArchive(
    artifacts,
    discoveredSet
  ) {
    this.artifactList.innerHTML = "";

    artifacts.forEach((artifact, index) => {
      const discovered =
        discoveredSet.has(artifact.id);

      const card =
        document.createElement("article");

      card.className =
        "artifact-record";

      card.classList.toggle(
        "is-undiscovered",
        !discovered
      );

      card.innerHTML = `
        <span class="artifact-index">${String(
          index + 1
        ).padStart(2, "0")}</span>
        <div>
          <small>${
            discovered
              ? artifact.category
              : "UNKNOWN ARTIFACT"
          }</small>
          <strong>${
            discovered
              ? artifact.title
              : "Encrypted Signal"
          }</strong>
          <p>${
            discovered
              ? artifact.description
              : "Use the multi-spectral scanner to identify this hidden object."
          }</p>
        </div>
        <span class="artifact-status">${
          discovered
            ? "RECOVERED"
            : "HIDDEN"
        }</span>
      `;

      this.artifactList.append(card);
    });
  }

  applyDiscoveryState(discoveredSet) {
    this.zones.forEach((zone) => {
      const discovered = discoveredSet.has(zone.id);
      const item = this.navItemByZone.get(zone.id);
      const node = this.mapNodeByZone.get(zone.id);

      if (item) {
        item.classList.toggle("is-locked", !discovered);

        const title = item.querySelector(".navigation-copy strong");
        const subtitle = item.querySelector(".navigation-copy small");
        const waypointButton = item.querySelector(".waypoint-action");
        const warpButton = item.querySelector(".warp-action");

        title.textContent = discovered ? zone.title : "Unknown Signal";
        subtitle.textContent = discovered ? zone.sectionLabel : "Scan required";
        waypointButton.disabled = !discovered;
        warpButton.disabled = !discovered;
      }

      if (node) {
        node.classList.toggle("is-locked", !discovered);
        const label = node.querySelector("small");
        label.textContent = discovered ? zone.sectionLabel : "???";
      }
    });
  }

  showGuide(title, message) {
    this.guideTitle.textContent = title;
    this.guideMessage.textContent = message;
    this.guide.classList.remove("is-hidden");

    window.clearTimeout(this.guideTimer);
    this.guideTimer = window.setTimeout(() => {
      this.guide.classList.add("is-hidden");
    }, 5200);
  }

  openScan(zone) {
    this.scanTarget.textContent = zone.title || zone.signalName || "UNKNOWN SIGNAL";
    this.scanProgressLabel.textContent = "SCANNING 0%";
    this.scanInterface.style.setProperty("--scan-progress", 0);
    this.scanInterface.classList.remove("is-hidden");
  }

  updateScanProgress(zone, progress) {
    this.scanTarget.textContent = zone.title || zone.signalName || "UNKNOWN SIGNAL";
    this.scanProgressLabel.textContent =
      `SCANNING ${Math.round(progress * 100)}%`;
    this.scanInterface.style.setProperty(
      "--scan-progress",
      progress
    );
  }

  closeScan() {
    this.scanInterface.classList.add("is-hidden");
  }

  showImpact(message) {
    document.body.classList.remove("impact-flash");
    void document.body.offsetWidth;
    document.body.classList.add("impact-flash");

    window.clearTimeout(this.impactTimer);
    this.impactTimer = window.setTimeout(() => {
      document.body.classList.remove("impact-flash");
    }, 260);

    this.showMessage(`Collision response: ${message}`);
  }

  updateBoundary(status, distance, intensity) {
    this.boundaryStatus.textContent = status;
    this.boundaryStatus.classList.toggle(
      "is-warning",
      status !== "CLEAR"
    );

    if (status === "CLEAR") {
      this.boundaryWarning.classList.add("is-hidden");
      return;
    }

    this.boundaryWarning.classList.remove("is-hidden");
    this.boundaryWarning.style.setProperty(
      "--boundary-intensity",
      intensity
    );

    const detail = this.boundaryWarning.querySelector("small");

    if (status === "LIMIT REACHED") {
      detail.textContent =
        "Current verse limit reached. The navigation field is returning the craft inward.";
    } else {
      detail.textContent =
        `${Math.max(0, Math.round(distance))} units remain before the current EES perimeter.`;
    }
  }

  updateHull(value) {
    this.hullStatus.textContent = Math.round(value);
    this.hullStatus.classList.toggle("is-critical", value <= 35);
  }

  setAutopilotStatus(status) {
    this.autopilotStatus.textContent = status;
    this.markerAutopilotButton.textContent =
      status === "ACTIVE" ? "Disengage" : "Autopilot";
  }

  setWaypointStatus(status) {
    this.waypointStatus.textContent = status;
  }

  updateWaypointNavigation(zone, distance) {
    if (!zone) {
      this.waypointStatus.textContent = "None";
      this.waypointDistance.textContent = "—";
      this.guidancePanel.classList.add("is-hidden");
      this.markerWaypointButton.textContent = "Set Waypoint";

      this.mapNodeByZone.forEach((node) => node.classList.remove("is-active"));
      this.navItemByZone.forEach((item) => {
        item.classList.remove("is-active");

        const button = item.querySelector(".waypoint-action");
        if (button) {
          button.textContent = "Set Waypoint";
        }
      });

      return;
    }

    this.waypointStatus.textContent = zone.title;
    this.waypointDistance.textContent = Math.round(distance);
    this.guidanceTitle.textContent = zone.title;
    this.guidanceDistance.textContent = Math.round(distance);
    this.guidancePanel.classList.remove("is-hidden");

    this.markerTitle.textContent = `WAYPOINT: ${zone.title}`;
    this.markerDistance.textContent = Math.round(distance);
    this.markerWaypointButton.textContent = "Clear Waypoint";

    this.mapNodeByZone.forEach((node, id) => {
      node.classList.toggle("is-active", id === zone.id);
    });

    this.navItemByZone.forEach((item, id) => {
      const isActive = id === zone.id;
      item.classList.toggle("is-active", isActive);

      const button = item.querySelector(".waypoint-action");
      if (button) {
        button.textContent = isActive ? "Clear Waypoint" : "Set Waypoint";
      }
    });
  }

  closeNavigationPanel() {
    this.closePanel(this.navigationPanel);
  }

  openPortal(zone) {
    if (!zone) return;

    this.currentZone = zone;
    this.portalCode.textContent = `NODE-${zone.id.toUpperCase()}`;
    this.portalShell.dataset.zone = zone.id;
    this.portalCategory.textContent = `${zone.category} // PORTAL`;
    this.portalTitle.textContent = zone.title;
    this.portalDescription.textContent = zone.description;

    this.portalTabs.forEach((tab, index) => {
      tab.classList.toggle("is-active", index === 0);
    });

    this.renderPortalTab("overview");
    this.portfolioOverlay.classList.remove("is-open");
    this.digitalWorld.classList.remove("is-open");
    this.portalInterface.classList.add("is-open");
    this.portalInterface.setAttribute("aria-hidden", "false");
    this.inputManager.setEnabled(false);
  }

  closePortal(returnToWorld = true) {
    this.portalInterface.classList.remove("is-open");
    this.portalInterface.setAttribute("aria-hidden", "true");

    if (
      returnToWorld &&
      this.currentZone &&
      this.digitalWorld &&
      document.body.contains(this.digitalWorld)
    ) {
      this.digitalWorld.classList.add("is-open");
      this.digitalWorld.setAttribute("aria-hidden", "false");
    }
  }

  renderPortalTab(tabName) {
    const zone = this.currentZone;
    if (!zone) return;

    this.portalContent.innerHTML = "";

    const content =
      portfolioContent[zone.id] || {};

    let entries =
      content[tabName] ||
      content.overview ||
      zone.components ||
      [];

    const override =
      portalOverrides[zone.id]?.[tabName];

    if (override) {
      entries = override;
    }

    if (
      tabName === "overview" &&
      (zone.id === "projects" ||
        zone.id === "github")
    ) {
      entries = projectCatalog;
    }

    const header =
      document.createElement("section");

    header.className =
      "portal-sector-header";

    header.innerHTML = `
      <div>
        <span>${zone.sectionLabel.toUpperCase()} SECTOR</span>
        <strong>${this.getPortalSectionTitle(tabName)}</strong>
      </div>
      <div class="portal-sector-metrics">
        <span>${String(entries.length).padStart(2, "0")} DATA NODES</span>
        <span>LINK: STABLE</span>
      </div>
    `;

    this.portalContent.append(header);

    const grid =
      document.createElement("div");

    grid.className =
      "portal-card-grid";

    entries.forEach((entry, index) => {
      const card =
        document.createElement("article");

      card.className =
        `portal-data-card portal-card-${entry.type || "data"}`;

      card.classList.toggle(
        "is-pending",
        Boolean(entry.pending || entry.comingSoon)
      );

      const stack = Array.isArray(entry.stack)
        ? `
          <div class="portal-stack">
            ${entry.stack
              .map(
                (item) =>
                  `<span>${item}</span>`
              )
              .join("")}
          </div>
        `
        : "";

      const meta = entry.meta
        ? `<small class="portal-card-meta">${entry.meta}</small>`
        : "";

      const action =
        this.renderPortalCardActions(entry);

      card.innerHTML = `
        <div class="portal-card-scanline"></div>
        <div class="portal-card-index">${String(
          index + 1
        ).padStart(2, "0")}</div>
        <div class="portal-card-heading">
          <span>${entry.tag || "DATA NODE"}</span>
          <i></i>
        </div>
        <h3>${entry.title}</h3>
        ${meta}
        <p>${entry.description}</p>
        ${stack}
        ${action}
      `;

      grid.append(card);
    });

    this.portalContent.append(grid);
  }

  renderPortalCardActions(entry) {
    const actions = [];

    if (entry.downloadUrl) {
      actions.push(`
        <a
          class="portal-card-action resume-download-action"
          href="${entry.downloadUrl}"
          download
        >
          ${entry.action || "Download Resume"}
          <span>⇩</span>
        </a>
      `);
    }

    if (entry.repositoryUrl) {
      actions.push(`
        <a
          class="portal-card-action repository-action"
          href="${entry.repositoryUrl}"
          target="_blank"
          rel="noreferrer"
        >
          GitHub Repository
          <span>↗</span>
        </a>
      `);
    }

    if (entry.liveUrl) {
      actions.push(`
        <a
          class="portal-card-action live-action"
          href="${entry.liveUrl}"
          target="_blank"
          rel="noreferrer"
        >
          ${entry.liveLabel || entry.action || "Launch Experience"}
          <span>↗</span>
        </a>
      `);
    }

    if (entry.detailId) {
      actions.push(`
        <button
          class="portal-card-action detail-action"
          type="button"
          data-portal-detail="${entry.detailId}"
        >
          ${entry.action || "Open Overview"}
          <span>→</span>
        </button>
      `);
    }

    if (
      entry.url &&
      entry.url !== entry.liveUrl &&
      entry.url !== entry.repositoryUrl &&
      !entry.url.includes(
        "jeremiahlupton.com"
      )
    ) {
      actions.push(`
        <a
          class="portal-card-action"
          href="${entry.url}"
          target="_blank"
          rel="noreferrer"
        >
          ${entry.action || "Open Resource"}
          <span>↗</span>
        </a>
      `);
    }

    if (entry.pending || entry.comingSoon) {
      actions.unshift(`
        <span class="portal-pending-badge">
          COMING SOON
        </span>
      `);
    }

    return actions.length
      ? `<div class="portal-card-actions">${actions.join("")}</div>`
      : "";
  }

  openPortalDetail(detailId) {
    const detail =
      portalDetails[detailId];

    if (!detail) {
      this.showMessage(
        "Internal portal detail unavailable."
      );
      return;
    }

    this.portalDetailCode.textContent =
      `VIEW-${detailId
        .replace(/[^a-z0-9]/gi, "-")
        .toUpperCase()}`;

    this.portalDetailEyebrow.textContent =
      detail.eyebrow;

    this.portalDetailTitle.textContent =
      detail.title;

    this.portalDetailSubtitle.textContent =
      detail.subtitle || "";

    this.portalDetailShell.dataset.detailType =
      detail.type || "data";

    this.portalDetailContent.innerHTML =
      this.renderPortalDetailContent(detail);

    this.portalDetailOverlay.classList.add(
      "is-open"
    );

    this.portalDetailOverlay.setAttribute(
      "aria-hidden",
      "false"
    );
  }

  closePortalDetail() {
    this.portalDetailOverlay.classList.remove(
      "is-open"
    );

    this.portalDetailOverlay.setAttribute(
      "aria-hidden",
      "true"
    );

    // Keep the destination portal open and interactive.
    if (
      this.portalInterface.classList.contains(
        "is-open"
      )
    ) {
      this.portalInterface.setAttribute(
        "aria-hidden",
        "false"
      );
    }

    window.setTimeout(() => {
      this.portalDetailContent.scrollTop = 0;
    }, 0);
  }

  renderPortalDetailContent(detail) {
    if (detail.type === "experience") {
      return `
        <div class="experience-core-layout">
          <div class="experience-orb">
            <span class="voltage-bolt bolt-a">ϟ</span>
            <span class="voltage-bolt bolt-b">ϟ</span>
            <span class="voltage-bolt bolt-c">ϟ</span>
            <span class="voltage-bolt bolt-d">ϟ</span>
            <strong>25+</strong>
            <small>YEARS OF EXPERIENCE</small>
          </div>
          <div class="experience-highlight-grid">
            ${(detail.highlights || [])
              .map(
                ([tag, value]) => `
                  <article>
                    <span>${tag}</span>
                    <strong>${value}</strong>
                  </article>
                `
              )
              .join("")}
          </div>
        </div>
      `;
    }

    if (detail.type === "timeline") {
      return `
        <div class="journey-detail-layout">
          <div class="timeline-experience-orb">
            <strong>25+</strong>
            <span>YEARS</span>
            <small>CONTINUOUS DEVELOPMENT</small>
          </div>
          <div class="continued-development-badge">
            <span>LIVE TIMESTAMP</span>
            <strong>EES // ACTIVE BUILD</strong>
            <small>${new Date()
              .toISOString()
              .slice(0, 10)}</small>
          </div>
          ${this.renderDetailMilestones(
            detail.milestones
          )}
        </div>
      `;
    }

    if (detail.type === "capabilities") {
      return `
        <div class="capability-detail-grid">
          ${detail.groups
            .map(
              (group) => `
                <article>
                  <span>CAPABILITY NODE</span>
                  <h3>${group.title}</h3>
                  <div class="capability-chip-grid">
                    ${group.items
                      .map(
                        (item) =>
                          `<span>${item}</span>`
                      )
                      .join("")}
                  </div>
                </article>
              `
            )
            .join("")}
        </div>
      `;
    }

    if (detail.type === "contact") {
      return `
        <div class="contact-console-card">
          ${detail.contacts
            .map(
              ([label, value]) => `
                <div>
                  <span>${label}</span>
                  <strong>${value}</strong>
                </div>
              `
            )
            .join("")}
          <p>${detail.note}</p>
        </div>
      `;
    }

    const items =
      detail.items || [];

    const milestones =
      detail.milestones || [];

    return `
      ${items.length
        ? `
          <div class="portal-detail-list">
            ${items
              .map(
                (item, index) => `
                  <article>
                    <span>${String(
                      index + 1
                    ).padStart(2, "0")}</span>
                    <strong>${item}</strong>
                  </article>
                `
              )
              .join("")}
          </div>
        `
        : ""}
      ${milestones.length
        ? this.renderDetailMilestones(
            milestones
          )
        : ""}
    `;
  }

  renderDetailMilestones(milestones) {
    return `
      <div class="detail-timeline">
        ${milestones
          .map(
            ([stamp, title, description]) => `
              <article>
                <div class="detail-timeline-stamp">
                  ${stamp}
                </div>
                <div>
                  <strong>${title}</strong>
                  <p>${description}</p>
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    `;
  }

  getPortalSectionTitle(tabName) {
    const titles = {
      overview: "PRIMARY PORTFOLIO DATA",
      systems: "CONNECTED SYSTEMS",
      records: "ARCHIVED RECORDS",
      links: "EXTERNAL ACCESS GATES"
    };

    return titles[tabName] || "PORTAL DATA";
  }

  setLandingStatus(status) {
    this.landingStatus.textContent = status;
  }

  lockFlightForLanding() {
    this.inputManager.setEnabled(false);
  }

  restoreFlightAfterTakeoff() {
    if (this.started) this.inputManager.setEnabled(true);
  }

  openDigitalWorld(zone) {
    this.inputManager.setEnabled(false);

    this.worldCategory.textContent = `${zone.category} // DIGITAL WORLD`;
    this.worldTitle.textContent = zone.title;
    this.worldDescription.textContent = zone.description;
    this.worldCoordinate.textContent =
      `X ${Math.round(zone.position.x)} • Y ${Math.round(zone.position.y)} • Z ${Math.round(zone.position.z)}`;

    this.worldComponents.innerHTML = "";

    (zone.components || zone.projects).forEach((component, index) => {
      const card = document.createElement("article");
      card.className = "world-component-card";

      const tag = document.createElement("span");
      tag.className = "component-tag";
      tag.textContent = component.tag || String(index + 1).padStart(2, "0");

      const title = document.createElement("h3");
      title.textContent = component.title;

      const description = document.createElement("p");
      description.textContent = component.description;

      card.append(tag, title, description);
      this.worldComponents.append(card);
    });

    this.digitalWorld.classList.add("is-open");
    this.digitalWorld.setAttribute("aria-hidden", "false");
    this.showMessage(`Digital world loaded: ${zone.title}`);
  }

  closeDigitalWorld(enableFlight = false) {
    this.digitalWorld.classList.remove("is-open");
    this.digitalWorld.setAttribute("aria-hidden", "true");

    if (enableFlight && this.started) {
      this.inputManager.setEnabled(true);
    }
  }

  showMessage(message) {
    this.systemMessage.textContent = message;
    this.systemMessage.classList.add("is-visible");
    window.clearTimeout(this.messageTimer);
    this.messageTimer = window.setTimeout(() => {
      this.systemMessage.classList.remove("is-visible");
    }, 2600);
  }
}
