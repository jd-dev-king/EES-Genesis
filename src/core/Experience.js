import * as THREE from "three";
import { Time } from "./Time.js";
import { InputManager } from "./InputManager.js";
import { FlyingRobot } from "../entities/FlyingRobot.js";
import { Lighting } from "../environment/Lighting.js";
import { SkyWorld } from "../environment/SkyWorld.js";
import { StarField } from "../environment/StarField.js";
import { SpaceTraffic } from "../environment/SpaceTraffic.js";
import { CollisionSystem } from "../systems/CollisionSystem.js";
import { VerseBoundary } from "../systems/VerseBoundary.js";
import { DiscoverySystem } from "../systems/DiscoverySystem.js";
import { MissionSystem } from "../systems/MissionSystem.js";
import { ProgressStore } from "../systems/ProgressStore.js";
import { HiddenObjectsSystem } from "../systems/HiddenObjectsSystem.js";
import { AutonomousDroneSystem } from "../systems/AutonomousDroneSystem.js";
import { SpaceEventSystem } from "../systems/SpaceEventSystem.js";
import { ScannerModeSystem } from "../systems/ScannerModeSystem.js";
import { EngineeringOperationsSystem } from "../systems/EngineeringOperationsSystem.js";
import { DigitalTwinSystem } from "../systems/DigitalTwinSystem.js";
import { AuraIntelligenceSystem } from "../systems/AuraIntelligenceSystem.js";
import { IdentityCoreSystem } from "../systems/IdentityCoreSystem.js";
import { LivingVerseSystem } from "../systems/LivingVerseSystem.js";
import { DestinationFacilitiesSystem } from "../systems/DestinationFacilitiesSystem.js";
import { FacilityOperationsSystem } from "../systems/FacilityOperationsSystem.js";
import { DestinationCommandSystem } from "../systems/DestinationCommandSystem.js";
import { DiscoveryProtocolSystem } from "../systems/DiscoveryProtocolSystem.js";
import { MissionCommandSystem } from "../systems/MissionCommandSystem.js";
import { AuraOperationsSystem } from "../systems/AuraOperationsSystem.js";
import { AdaptiveInterfaceSystem } from "../systems/AdaptiveInterfaceSystem.js";
import { ExperienceDirectorSystem } from "../systems/ExperienceDirectorSystem.js";
import { FlightComputerSystem } from "../systems/FlightComputerSystem.js";
import { AuraPresenceSystem } from "../systems/AuraPresenceSystem.js";
import { CameraDirectorSystem } from "../systems/CameraDirectorSystem.js";
import { AdaptiveSoundscapeSystem } from "../systems/AdaptiveSoundscapeSystem.js";
import { ZoneManager } from "../navigation/ZoneManager.js";
import { InterfaceManager } from "../ui/InterfaceManager.js";
import { portfolioZones } from "../config/portfolioZones.js";

export class Experience {
  constructor(canvas) {
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error("A valid canvas element is required to start EES.");
    }

    this.canvas = canvas;
    this.time = new Time();
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      58,
      window.innerWidth / window.innerHeight,
      0.1,
      2200
    );
    this.camera.position.set(0, 30, 58);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: "high-performance"
    });

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;

    this.identityCoreSystem =
      new IdentityCoreSystem(
        this.scene,
        this.camera
      );

    // Launch Pad typography is DOM-based. The 3D label appears in Genesis Boot.
    this.identityCoreSystem.setIdentityLabelVisible(false);
    this.identityCoreSystem.beginActivationCinematic();

    this.inputManager = new InputManager();
    this.interfaceManager = new InterfaceManager(this.inputManager, portfolioZones);
    this.lighting = new Lighting(this.scene);
    this.starField = new StarField(this.scene);
    this.spaceTraffic = new SpaceTraffic(this.scene);
    this.skyWorld = new SkyWorld(this.scene, portfolioZones);
    this.robot = new FlyingRobot(this.scene, this.inputManager);
    this.collisionSystem = new CollisionSystem(
      this.robot,
      this.skyWorld,
      this.spaceTraffic,
      this.interfaceManager,
      this.autonomousDroneSystem,
      this.spaceEventSystem
    );

    this.verseBoundary = new VerseBoundary(
      this.scene,
      this.robot,
      this.interfaceManager
    );

    this.zoneManager = new ZoneManager(
      portfolioZones,
      this.robot,
      this.interfaceManager
    );

    this.progressStore = new ProgressStore();

    this.hiddenObjectsSystem =
      new HiddenObjectsSystem(this.scene);

    this.autonomousDroneSystem =
      new AutonomousDroneSystem(
        this.scene,
        portfolioZones
      );

    this.spaceEventSystem =
      new SpaceEventSystem(
        this.scene,
        this.interfaceManager
      );

    this.scannerModeSystem = null;

    const savedProgress = this.progressStore.load();

    this.discoverySystem = new DiscoverySystem(
      portfolioZones,
      this.robot,
      this.interfaceManager,
      savedProgress.discoveredZoneIds,
      this.hiddenObjectsSystem,
      savedProgress.discoveredArtifactIds || []
    );

    this.missionSystem = new MissionSystem(
      this.interfaceManager,
      this.progressStore
    );

    this.zoneManager.setDiscoverySystem(this.discoverySystem);

    this.scannerModeSystem =
      new ScannerModeSystem(
        this.interfaceManager,
        (mode) => {
          this.discoverySystem.setScannerMode(mode);
        }
      );

    this.engineeringOperationsSystem =
      new EngineeringOperationsSystem(
        this.robot,
        this.zoneManager,
        this.interfaceManager,
        this.spaceEventSystem,
        this.autonomousDroneSystem
      );

    this.digitalTwinSystem =
      new DigitalTwinSystem(
        this.robot,
        this.zoneManager,
        this.interfaceManager,
        this.progressStore
      );

    this.adaptiveInterfaceSystem =
      new AdaptiveInterfaceSystem({
        interfaceManager: this.interfaceManager,
        panelDefinitions: [
          { id: "flight-status", label: "Flight Status" },
          { id: "mission-command", label: "Mission Command" },
          { id: "discovery-protocol", label: "Discovery Protocol" },
          { id: "aura-operations", label: "AURA Operations" },
          { id: "facility-operations", label: "Facility Operations" },
          { id: "destination-command", label: "Destination Command" }
        ]
      });

    this.adaptiveSoundscapeSystem =
      new AdaptiveSoundscapeSystem({
        robot: this.robot,
        zoneManager: this.zoneManager,
        discoverySystem:
          this.discoverySystem,
        interfaceManager:
          this.interfaceManager
      });

    this.cameraDirectorSystem =
      new CameraDirectorSystem({
        camera: this.camera,
        robot: this.robot,
        zoneManager: this.zoneManager,
        discoverySystem:
          this.discoverySystem,
        interfaceManager:
          this.interfaceManager
      });

    this.auraPresenceSystem =
      new AuraPresenceSystem({
        robot: this.robot,
        zoneManager: this.zoneManager,
        missionSystem: this.missionSystem,
        discoverySystem:
          this.discoverySystem,
        scannerModeSystem:
          this.scannerModeSystem,
        interfaceManager:
          this.interfaceManager
      });

    this.flightComputerSystem =
      new FlightComputerSystem({
        robot: this.robot,
        zoneManager: this.zoneManager,
        discoverySystem: this.discoverySystem,
        interfaceManager: this.interfaceManager,
        adaptiveInterfaceSystem: this.adaptiveInterfaceSystem
      });

    this.experienceDirectorSystem =
      new ExperienceDirectorSystem({
        adaptiveInterfaceSystem:
          this.adaptiveInterfaceSystem,
        interfaceManager:
          this.interfaceManager
      });

    this.auraOperationsSystem =
      new AuraOperationsSystem({
        robot: this.robot,
        zoneManager: this.zoneManager,
        missionSystem: this.missionSystem,
        discoverySystem:
          this.discoverySystem,
        scannerModeSystem:
          this.scannerModeSystem,
        interfaceManager:
          this.interfaceManager
      });

    this.missionCommandSystem =
      new MissionCommandSystem({
        missionSystem: this.missionSystem,
        discoverySystem: this.discoverySystem,
        interfaceManager: this.interfaceManager
      });

    this.discoveryProtocolSystem =
      new DiscoveryProtocolSystem({
        discoverySystem: this.discoverySystem,
        hiddenObjectsSystem: this.hiddenObjectsSystem,
        interfaceManager: this.interfaceManager,
        progressStore: this.progressStore
      });

    this.destinationCommandSystem =
      new DestinationCommandSystem({
        robot: this.robot,
        interfaceManager:
          this.interfaceManager,
        zones: portfolioZones
      });

    this.facilityOperationsSystem =
      new FacilityOperationsSystem({
        scene: this.scene,
        robot: this.robot,
        interfaceManager:
          this.interfaceManager,
        zones: portfolioZones
      });

    this.destinationFacilitiesSystem =
      new DestinationFacilitiesSystem({
        scene: this.scene,
        robot: this.robot,
        skyWorld: this.skyWorld,
        interfaceManager:
          this.interfaceManager,
        zones: portfolioZones
      });

    this.livingVerseSystem =
      new LivingVerseSystem({
        scene: this.scene,
        robot: this.robot,
        skyWorld: this.skyWorld,
        interfaceManager: this.interfaceManager,
        zones: portfolioZones
      });

    this.auraIntelligenceSystem =
      new AuraIntelligenceSystem({
        robot: this.robot,
        zoneManager: this.zoneManager,
        missionSystem: this.missionSystem,
        discoverySystem: this.discoverySystem,
        scannerModeSystem: this.scannerModeSystem,
        spaceEventSystem: this.spaceEventSystem,
        digitalTwinSystem: this.digitalTwinSystem,
        engineeringOperationsSystem:
          this.engineeringOperationsSystem,
        interfaceManager:
          this.interfaceManager
      });

    this.discoverySystem.onDiscoveryCompleted = (zone) => {
      this.missionSystem.handleDiscovery(zone);
    };

    this.discoverySystem.onDiscoveryStateChanged = (discoveredSet) => {
      this.missionSystem.synchronizeDiscoveries(discoveredSet);
    };

    this.discoverySystem.onArtifactDiscovered = (artifact) => {
      const state = this.progressStore.load();
      state.xp = (Number(state.xp) || 0) + artifact.xp;
      this.progressStore.save(state);
      this.missionSystem.state.xp = state.xp;
      this.missionSystem.refreshInterface();
      this.discoveryProtocolSystem.handleArtifactRecovered(artifact);
    };

    this.discoverySystem.onArtifactStateChanged = (artifactSet) => {
      const state = this.progressStore.load();
      state.discoveredArtifactIds = [...artifactSet];
      this.progressStore.save(state);
    };

    this.zoneManager.onZoneLanded = (zone) => {
      this.missionSystem.handleLanding(zone);
    };

    this.interfaceManager.onExperienceStarted = () => {
      this.livingVerseSystem.start();
      this.discoveryProtocolSystem.start();
      this.missionCommandSystem.start();
      this.auraOperationsSystem.start();
      this.adaptiveInterfaceSystem.start();
      this.experienceDirectorSystem.start();
      this.flightComputerSystem.start();
      this.auraPresenceSystem.start();
      this.cameraDirectorSystem.start();
      this.adaptiveSoundscapeSystem.start();
    };

    this.interfaceManager.onSystemContextPanelsRequested =
      (enabled) => this.flightComputerSystem.setContextAware(enabled);

    this.interfaceManager.onAuraPresenceRequested =
      (enabled) => {
        this.auraPresenceSystem.setEnabled(
          enabled
        );
      };

    this.interfaceManager.onAuraPresenceCue =
      (priority) => {
        this.adaptiveSoundscapeSystem.playAuraCue(
          priority
        );
      };

    this.interfaceManager.onCinematicCameraRequested =
      (enabled) => {
        this.cameraDirectorSystem.setEnabled(
          enabled
        );
      };

    this.interfaceManager.onAdaptiveAudioRequested =
      (enabled) => {
        this.adaptiveSoundscapeSystem.setEnabled(
          enabled
        );
      };

    const recoverMobileAudio = async () => {
      this.adaptiveSoundscapeSystem.start();
      await this.adaptiveSoundscapeSystem.resume();
    };

    window.addEventListener(
      "pointerdown",
      recoverMobileAudio,
      { passive: true }
    );

    window.addEventListener(
      "touchend",
      recoverMobileAudio,
      { passive: true }
    );

    window.addEventListener(
      "pageshow",
      recoverMobileAudio
    );

    document.addEventListener(
      "visibilitychange",
      () => {
        if (!document.hidden) {
          recoverMobileAudio();
        }
      }
    );

    this.interfaceManager.onOpeningAudioActivated =
      () => {
        const unlockPromise =
          this.adaptiveSoundscapeSystem.unlockMobileAudio();

        this.adaptiveSoundscapeSystem
          .queueMobileLaunchSpeech(
            "activation"
          );

        /*
         * Schedule the cinematic sound immediately while the
         * activation tap is still valid on iOS/WebKit.
         */
        this.adaptiveSoundscapeSystem.playOpeningDopplerSequence();

        return unlockPromise;
      };

    this.interfaceManager.onGenesisLoadingAudioRequested =
      async () => {
        this.adaptiveSoundscapeSystem.start();
        await this.adaptiveSoundscapeSystem.resume();
        this.adaptiveSoundscapeSystem.playGenesisLoadingSequence();
      };

    this.interfaceManager.onBootSystemCheckAudioRequested =
      async (systemName, index) => {
        this.adaptiveSoundscapeSystem.start();
        await this.adaptiveSoundscapeSystem.resume();
        this.adaptiveSoundscapeSystem.playBootSystemCheck(
          systemName,
          index
        );
      };

    this.interfaceManager.onPreflightAuthorizationAudioRequested =
      async () => {
        this.adaptiveSoundscapeSystem.start();
        await this.adaptiveSoundscapeSystem.resume();
        this.adaptiveSoundscapeSystem.playPreflightAuthorization();
      };

    this.interfaceManager.onTakeFlightAudioRequested =
      async () => {
        this.adaptiveSoundscapeSystem.start();

        this.adaptiveSoundscapeSystem
          .queueMobileLaunchSpeech(
            "takeoff"
          );

        await this.adaptiveSoundscapeSystem.resume();
        this.adaptiveSoundscapeSystem.playTakeFlightCue();
      };

    this.interfaceManager.onEngineStartupAudioRequested =
      () => {
        this.adaptiveSoundscapeSystem.start();
        this.adaptiveSoundscapeSystem.resume();
        this.adaptiveSoundscapeSystem.playEngineStartup();
      };

    this.interfaceManager.onLaunchCountdownAudioRequested =
      async (value) => {
        this.adaptiveSoundscapeSystem.start();
        await this.adaptiveSoundscapeSystem.resume();

        /*
         * The visual hangar countdown is the single source of
         * 3-2-1-LAUNCH narration. Earlier mobile speech no longer
         * includes countdown numbers.
         */
        this.adaptiveSoundscapeSystem.playCountdownCue(
          value
        );
      };

    this.interfaceManager.onWarpArrivalAudioRequested =
      () => {
        this.adaptiveSoundscapeSystem.playConfirmationCue(
          "arrival"
        );
      };

    this.interfaceManager.onAudioVolumeRequested =
      (volume) => {
        this.adaptiveSoundscapeSystem.setVolume(
          volume
        );
      };

    this.interfaceManager.onCommandCenterOpened =
      () => {
        this.robot.setAutopilot?.(
          false
        );
        this.auraPresenceSystem.setEnabled(
          false
        );
        this.cameraDirectorSystem.setEnabled(
          false
        );
        this.adaptiveSoundscapeSystem.transitionContext(
          "command"
        );
      };

    this.interfaceManager.onCommandCenterRetakeFlight =
      () => {
        this.robot.setAutopilot?.(
          false
        );
        this.auraPresenceSystem.reset();
        this.auraPresenceSystem.setEnabled(
          true
        );
        this.cameraDirectorSystem.reset();
        this.cameraDirectorSystem.setEnabled(
          true
        );
        this.adaptiveSoundscapeSystem.reset();
        this.adaptiveSoundscapeSystem.resume();
      };

    this.interfaceManager.onExperienceProfileRequested =
      (profileId) => {
        this.experienceDirectorSystem.setProfile(
          profileId
        );
      };

    this.interfaceManager.onExperienceMotionRequested =
      (level) => {
        this.experienceDirectorSystem.setMotionLevel(
          level
        );
      };

    this.interfaceManager.onExperienceGuidanceRequested =
      (level) => {
        this.experienceDirectorSystem.setGuidanceLevel(
          level
        );
      };

    this.interfaceManager.onCommandDeckVisibilityRequested =
      (panelId, visible) => {
        this.adaptiveInterfaceSystem.setPanelVisible(panelId, visible);
      };

    this.interfaceManager.onCommandDeckCollapseRequested =
      (panelId) => {
        this.adaptiveInterfaceSystem.toggleCollapse(panelId);
      };

    this.interfaceManager.onCommandDeckShowAllRequested =
      () => {
        this.adaptiveInterfaceSystem.setAllVisible(true);
      };

    this.interfaceManager.onCommandDeckHideAllRequested =
      () => {
        this.adaptiveInterfaceSystem.setAllVisible(false);
      };

    this.interfaceManager.onCommandDeckResetRequested =
      () => {
        this.adaptiveInterfaceSystem.resetLayout();
      };

    this.interfaceManager.onResetProgressRequested = () => {
      this.missionSystem.reset();
      this.discoveryProtocolSystem.reset();
      this.missionCommandSystem.reset();
      this.auraOperationsSystem.reset();
    };

    this.interfaceManager.onOverlayClosed = () => {
      this.zoneManager.clearActiveZone();
    };

    this.interfaceManager.onTakeoffRequested = () => {
      this.zoneManager.takeOff();
    };

    this.interfaceManager.onWaypointRequested = (zone) => {
      this.zoneManager.setWaypoint(zone);
    };

    this.interfaceManager.onWarpRequested = (zone) => {
      this.zoneManager.warpTo(zone);
    };

    this.interfaceManager.onLandingRequested = (zone) => {
      this.zoneManager.requestLanding(zone);
    };

    this.interfaceManager.onClearWaypointRequested = () => {
      this.zoneManager.clearWaypoint();
    };

    this.interfaceManager.onAutopilotRequested = () => {
      this.zoneManager.toggleAutopilot();
    };

    this.interfaceManager.onScanRequested = () => {
      this.discoverySystem.requestScan();
    };

    this.interfaceManager.onScannerModeRequested = () => {
      this.scannerModeSystem.cycleMode();
    };

    this.cameraTarget = new THREE.Vector3();
    this.desiredCameraPosition = new THREE.Vector3();
    this.cameraOffset = new THREE.Vector3(0, 12, 25);
    this.lookOffset = new THREE.Vector3(0, 2, -18);

    this.handleResize = this.handleResize.bind(this);
    this.animate = this.animate.bind(this);

    window.addEventListener("resize", this.handleResize);

    this.interfaceManager.onGenesisCinematicStage =
      (stage) => {
        this.identityCoreSystem.setActivationStage(
          stage
        );
      };

    this.interfaceManager.onGenesisBootOpened =
      () => {
        // Keep the Three.js text sprite hidden and use the
        // high-contrast DOM identity layer during Genesis Boot.
        this.identityCoreSystem.setIdentityLabelVisible(
          false
        );
      };

    this.interfaceManager.onBootProgress =
      (progress) => {
        this.identityCoreSystem.setProgress(
          progress
        );
      };

    this.interfaceManager.onBootComplete =
      () => {
        this.identityCoreSystem.completeIdentityBoot();
      };

    this.interfaceManager.onBootContinue =
      () => {
        this.identityCoreSystem.beginShutdown(
          () => {
            this.interfaceManager.openFlightOperations();
          }
        );
      };

    this.interfaceManager.initializeGenesisCinematic();
    window.setTimeout(() => {
      this.interfaceManager.showGuide(
        "AURA online",
        "I will guide discovery, navigation, and mission progression throughout the EES Verse."
      );
    }, 14500);
    this.auraReportTimer = window.setInterval(() => {
      const report =
        this.autonomousDroneSystem.getStatusReport();

      const messages = [
        `${report.SCOUT || 0} scout drones are mapping nearby sectors.`,
        `${report.CARGO || 0} cargo units are maintaining station routes.`,
        `${report.MAINTENANCE || 0} maintenance drones are servicing local infrastructure.`,
        `${report.RESEARCH || 0} research drones are analyzing anomalies.`,
        "The Living Universe simulation remains active."
      ];

      const message =
        messages[
          Math.floor(Math.random() * messages.length)
        ];

      this.interfaceManager.showGuide(
        "AURA sector report",
        message
      );
    }, 28000);

    this.animate();
  }

  updateCamera(delta) {
    const robotPosition = this.robot.getPosition();
    const robotQuaternion = this.robot.getQuaternion();

    this.desiredCameraPosition
      .copy(this.cameraOffset)
      .applyQuaternion(robotQuaternion)
      .add(robotPosition);

    this.camera.position.lerp(
      this.desiredCameraPosition,
      1 - Math.exp(-4.4 * delta)
    );

    this.cameraTarget
      .copy(this.lookOffset)
      .applyQuaternion(robotQuaternion)
      .add(robotPosition);

    this.camera.lookAt(this.cameraTarget);
  }

  handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.time.update();

    const { delta, elapsed } = this.time;

    if (this.interfaceManager.started) {
      this.robot.update(delta, elapsed);
      this.zoneManager.update(this.inputManager);
      this.collisionSystem.update();
      this.verseBoundary.update(delta, elapsed);
      this.discoverySystem.update(delta, this.inputManager);
      this.scannerModeSystem.update(this.inputManager);
      this.engineeringOperationsSystem.update(delta, this.inputManager);
      this.digitalTwinSystem.update(delta, this.inputManager);
      this.auraIntelligenceSystem.update(this.inputManager);
      this.livingVerseSystem.update(delta, elapsed);
      this.destinationFacilitiesSystem.update(
        delta,
        elapsed
      );

      this.facilityOperationsSystem.update(
        delta,
        elapsed
      );

      this.destinationCommandSystem.update(
        delta
      );
      this.discoveryProtocolSystem.update(delta);
      this.missionCommandSystem.update(delta);
      this.auraOperationsSystem.update(delta);
      this.flightComputerSystem.update(delta);
      this.auraPresenceSystem.update(delta);
      this.cameraDirectorSystem.update(delta);
      this.adaptiveSoundscapeSystem.update(delta);
      this.interfaceManager.updateFlightData(
        this.robot.currentSpeed,
        this.robot.getPosition().y
      );

      if (this.zoneManager.waypointZone) {
        const point = this.zoneManager.waypointZone.position
          .clone()
          .add(this.zoneManager.waypointZone.landingOffset);

        const distance = this.robot.getPosition().distanceTo(point);

        this.missionSystem.updateNavigation(
          this.zoneManager.waypointZone,
          distance
        );
      } else {
        this.missionSystem.updateNavigation(null, Infinity);
      }
    }

    this.updateCamera(delta);
    this.identityCoreSystem.update(delta, elapsed);
    this.starField.update(delta);
    this.spaceTraffic.update(delta, elapsed);
    this.hiddenObjectsSystem.update(delta, elapsed);
    this.autonomousDroneSystem.update(delta, elapsed);
    this.spaceEventSystem.update(delta, elapsed);
    this.skyWorld.update(delta, elapsed);
    this.renderer.render(this.scene, this.camera);
  }
}
