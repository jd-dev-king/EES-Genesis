import * as THREE from "three";

export class CollisionSystem {
  constructor(
    robot,
    skyWorld,
    spaceTraffic,
    interfaceManager,
    autonomousDroneSystem = null,
    spaceEventSystem = null
  ) {
    this.robot = robot;
    this.skyWorld = skyWorld;
    this.spaceTraffic = spaceTraffic;
    this.interface = interfaceManager;
    this.autonomousDroneSystem =
      autonomousDroneSystem;
    this.spaceEventSystem =
      spaceEventSystem;

    this.temp = new THREE.Vector3();
    this.closest = new THREE.Vector3();
    this.normal = new THREE.Vector3();

    this.dynamicSources = [
      {
        system: this.spaceTraffic,
        label: "space traffic"
      },
      {
        system: this.autonomousDroneSystem,
        label: "drone traffic"
      },
      {
        system: this.spaceEventSystem,
        label: "space event"
      }
    ];
  }

  update() {
    if (
      this.robot.flightMode === "LANDED" ||
      this.robot.flightMode === "LANDING"
    ) {
      this.interface.updateHull(
        this.robot.hullIntegrity
      );
      this.interface.setTrafficSafetyStatus(
        "DOCKED"
      );
      return;
    }

    if (this.robot.collisionCooldown > 0) {
      this.interface.updateHull(
        this.robot.hullIntegrity
      );
      return;
    }

    const dynamicImpact =
      this.checkDynamicColliders();

    if (dynamicImpact) {
      this.interface.updateHull(
        this.robot.hullIntegrity
      );
      return;
    }

    const staticImpact =
      this.checkStaticColliders();

    if (!staticImpact) {
      this.interface.setTrafficSafetyStatus(
        "CLEAR"
      );
    }

    this.interface.updateHull(
      this.robot.hullIntegrity
    );
  }

  checkDynamicColliders() {
    const robotPosition =
      this.robot.getPosition();

    const robotRadius =
      this.robot.collisionRadius;

    for (const source of this.dynamicSources) {
      if (
        !source.system ||
        typeof source.system.getColliders !==
          "function"
      ) {
        continue;
      }

      const colliders =
        source.system.getColliders();

      for (const object of colliders) {
        if (!object || !object.visible) {
          continue;
        }

        const objectRadius =
          object.userData.colliderRadius || 3;

        const combinedRadius =
          robotRadius + objectRadius;

        const distanceSq =
          robotPosition.distanceToSquared(
            object.position
          );

        if (
          distanceSq <= 0.0001 ||
          distanceSq >=
            combinedRadius * combinedRadius
        ) {
          continue;
        }

        const distance =
          Math.sqrt(distanceSq);

        this.normal
          .subVectors(
            robotPosition,
            object.position
          )
          .multiplyScalar(1 / distance);

        this.robot.resolveCollision(
          this.normal,
          combinedRadius - distance,
          object.userData
            .collisionSeverity || 1.4
        );

        this.interface.setAutopilotStatus(
          "OFF"
        );

        const label =
          object.userData.colliderType ||
          source.label;

        this.interface.setTrafficSafetyStatus(
          "IMPACT"
        );

        this.interface.showImpact(label);

        return true;
      }
    }

    return false;
  }

  checkStaticColliders() {
    const robotPosition =
      this.robot.getPosition();

    const robotRadius =
      this.robot.collisionRadius;

    for (
      const collider of
      this.skyWorld.getStaticColliders()
    ) {
      if (collider.type === "sphere") {
        const combinedRadius =
          robotRadius + collider.radius;

        const distanceSq =
          robotPosition.distanceToSquared(
            collider.center
          );

        if (
          distanceSq <= 0.0001 ||
          distanceSq >=
            combinedRadius * combinedRadius
        ) {
          continue;
        }

        const distance =
          Math.sqrt(distanceSq);

        this.normal
          .subVectors(
            robotPosition,
            collider.center
          )
          .multiplyScalar(1 / distance);

        this.robot.resolveCollision(
          this.normal,
          combinedRadius - distance,
          collider.destinationId
            ? 2.0
            : 1.6
        );

        this.interface.setAutopilotStatus(
          "OFF"
        );

        this.interface.setTrafficSafetyStatus(
          "IMPACT"
        );

        this.interface.showImpact(
          collider.label
        );

        return true;
      }

      if (collider.type === "box") {
        this.closest.set(
          THREE.MathUtils.clamp(
            robotPosition.x,
            collider.center.x -
              collider.halfSize.x,
            collider.center.x +
              collider.halfSize.x
          ),
          THREE.MathUtils.clamp(
            robotPosition.y,
            collider.center.y -
              collider.halfSize.y,
            collider.center.y +
              collider.halfSize.y
          ),
          THREE.MathUtils.clamp(
            robotPosition.z,
            collider.center.z -
              collider.halfSize.z,
            collider.center.z +
              collider.halfSize.z
          )
        );

        this.temp.subVectors(
          robotPosition,
          this.closest
        );

        const distanceSq =
          this.temp.lengthSq();

        if (
          distanceSq >=
          robotRadius * robotRadius
        ) {
          continue;
        }

        if (distanceSq > 0.0001) {
          const distance =
            Math.sqrt(distanceSq);

          this.normal
            .copy(this.temp)
            .multiplyScalar(1 / distance);

          this.robot.resolveCollision(
            this.normal,
            robotRadius - distance,
            2.0
          );
        } else {
          this.normal.set(0, 1, 0);
          this.robot.resolveCollision(
            this.normal,
            1,
            2.0
          );
        }

        this.interface.setAutopilotStatus(
          "OFF"
        );

        this.interface.setTrafficSafetyStatus(
          "IMPACT"
        );

        this.interface.showImpact(
          collider.label
        );

        return true;
      }
    }

    return false;
  }
}
