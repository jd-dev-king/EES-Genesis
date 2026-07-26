export class AdaptiveSoundscapeSystem {
  constructor({
    robot,
    zoneManager,
    discoverySystem,
    interfaceManager
  }) {
    this.robot = robot;
    this.zoneManager = zoneManager;
    this.discoverySystem = discoverySystem;
    this.interface = interfaceManager;

    this.enabled = true;
    this.volume = 0.38;
    this.started = false;
    this.context = "flight";
    this.previousContext = "";
    this.elapsed = 0;
    this.pulseElapsed = 0;

    this.audioContext = null;
    this.masterGain = null;
    this.ambientGain = null;
    this.ambientOscillator = null;
    this.secondaryOscillator = null;
    this.filter = null;
  }

  start() {
    if (this.started) {
      this.resume();
      return;
    }

    this.started = true;

    this.initializeAudio();
    this.resume();

    /*
     * Some browsers complete AudioContext resume asynchronously.
     * Calling resume again on the next microtask keeps the launch
     * cue inside the original user-activation window.
     */
    Promise.resolve().then(
      () => this.resume()
    );

    this.interface.updateSoundscapeState(
      this.context,
      this.enabled,
      this.volume
    );
  }

  initializeAudio() {
    const AudioContextClass =
      window.AudioContext ||
      window.webkitAudioContext;

    if (!AudioContextClass) {
      this.enabled = false;
      this.interface.updateSoundscapeState(
        "unsupported",
        false,
        this.volume
      );
      return;
    }

    this.audioContext =
      new AudioContextClass();

    this.masterGain =
      this.audioContext.createGain();

    this.ambientGain =
      this.audioContext.createGain();

    this.filter =
      this.audioContext.createBiquadFilter();

    this.ambientOscillator =
      this.audioContext.createOscillator();

    this.secondaryOscillator =
      this.audioContext.createOscillator();

    this.masterGain.gain.value =
      this.enabled
        ? this.volume
        : 0;

    this.ambientGain.gain.value =
      0.055;

    this.filter.type =
      "lowpass";

    this.filter.frequency.value =
      520;

    this.filter.Q.value =
      0.8;

    this.ambientOscillator.type =
      "sine";

    this.secondaryOscillator.type =
      "triangle";

    this.ambientOscillator.frequency.value =
      54;

    this.secondaryOscillator.frequency.value =
      81;

    const secondaryGain =
      this.audioContext.createGain();

    secondaryGain.gain.value =
      0.018;

    this.ambientOscillator.connect(
      this.ambientGain
    );

    this.secondaryOscillator.connect(
      secondaryGain
    );

    this.ambientGain.connect(
      this.filter
    );

    secondaryGain.connect(
      this.filter
    );

    this.filter.connect(
      this.masterGain
    );

    this.masterGain.connect(
      this.audioContext.destination
    );

    this.ambientOscillator.start();
    this.secondaryOscillator.start();
  }

  resume() {
    if (
      this.audioContext?.state ===
      "suspended"
    ) {
      return this.audioContext.resume();
    }

    return Promise.resolve();
  }

  update(delta) {
    if (
      !this.started ||
      !this.audioContext
    ) {
      return;
    }

    this.elapsed += delta;
    this.pulseElapsed += delta;

    const nextContext =
      this.determineContext();

    if (nextContext !== this.context) {
      this.previousContext =
        this.context;

      this.context =
        nextContext;

      this.transitionContext(
        nextContext
      );
    }

    if (
      this.enabled &&
      this.context === "scanning" &&
      this.pulseElapsed >= 2.2
    ) {
      this.pulseElapsed = 0;
      this.playScannerPulse();
    }
  }

  determineContext() {
    if (
      document.documentElement.classList.contains(
        "command-center-active"
      )
    ) {
      return "command";
    }

    if (this.robot.isLanded()) {
      return "docked";
    }

    const zone =
      this.zoneManager.activeZone ||
      this.zoneManager.nearestZone ||
      null;

    if (zone) {
      const landingPoint =
        zone.position
          .clone()
          .add(zone.landingOffset);

      const distance =
        this.robot
          .getPosition()
          .distanceTo(landingPoint);

      if (
        distance <
        Math.max(
          zone.approachRadius || 150,
          150
        )
      ) {
        return "approach";
      }
    }

    if (
      this.discoverySystem.nearestScannable &&
      Number.isFinite(
        this.discoverySystem
          .nearestScannableDistance
      ) &&
      this.discoverySystem
        .nearestScannableDistance < 180
    ) {
      return "scanning";
    }

    return "flight";
  }

  transitionContext(context) {
    if (
      !this.audioContext ||
      !this.ambientOscillator ||
      !this.secondaryOscillator
    ) {
      return;
    }

    const now =
      this.audioContext.currentTime;

    const profiles = {
      flight: {
        primary: 54,
        secondary: 81,
        filter: 520,
        gain: 0.055
      },
      scanning: {
        primary: 62,
        secondary: 124,
        filter: 900,
        gain: 0.062
      },
      approach: {
        primary: 48,
        secondary: 96,
        filter: 720,
        gain: 0.072
      },
      docked: {
        primary: 43,
        secondary: 64.5,
        filter: 430,
        gain: 0.05
      },
      command: {
        primary: 38,
        secondary: 57,
        filter: 360,
        gain: 0.042
      }
    };

    const profile =
      profiles[context] ||
      profiles.flight;

    this.ambientOscillator.frequency
      .cancelScheduledValues(now);

    this.secondaryOscillator.frequency
      .cancelScheduledValues(now);

    this.filter.frequency
      .cancelScheduledValues(now);

    this.ambientGain.gain
      .cancelScheduledValues(now);

    this.ambientOscillator.frequency
      .linearRampToValueAtTime(
        profile.primary,
        now + 1.4
      );

    this.secondaryOscillator.frequency
      .linearRampToValueAtTime(
        profile.secondary,
        now + 1.4
      );

    this.filter.frequency
      .linearRampToValueAtTime(
        profile.filter,
        now + 1.2
      );

    this.ambientGain.gain
      .linearRampToValueAtTime(
        profile.gain,
        now + 1.1
      );

    this.playTransitionTone(
      context
    );

    this.interface.updateSoundscapeState(
      context,
      this.enabled,
      this.volume
    );
  }

  playTransitionTone(context) {
    if (
      !this.enabled ||
      !this.audioContext
    ) {
      return;
    }

    const notes = {
      flight: [330, 440],
      scanning: [520, 780],
      approach: [220, 330],
      docked: [196, 294],
      command: [146, 220]
    };

    const frequencies =
      notes[context] ||
      notes.flight;

    frequencies.forEach(
      (frequency, index) => {
        const oscillator =
          this.audioContext
            .createOscillator();

        const gain =
          this.audioContext
            .createGain();

        const now =
          this.audioContext.currentTime +
          index * 0.12;

        oscillator.type =
          "sine";

        oscillator.frequency.value =
          frequency;

        gain.gain.setValueAtTime(
          0,
          now
        );

        gain.gain.linearRampToValueAtTime(
          0.035,
          now + 0.04
        );

        gain.gain.exponentialRampToValueAtTime(
          0.0001,
          now + 0.72
        );

        oscillator.connect(gain);
        gain.connect(this.masterGain);

        oscillator.start(now);
        oscillator.stop(now + 0.8);
      }
    );
  }

  playScannerPulse() {
    const oscillator =
      this.audioContext
        .createOscillator();

    const gain =
      this.audioContext
        .createGain();

    const now =
      this.audioContext.currentTime;

    oscillator.type =
      "sine";

    oscillator.frequency.setValueAtTime(
      620,
      now
    );

    oscillator.frequency
      .exponentialRampToValueAtTime(
        960,
        now + 0.18
      );

    gain.gain.setValueAtTime(
      0.0001,
      now
    );

    gain.gain
      .linearRampToValueAtTime(
        0.028,
        now + 0.025
      );

    gain.gain
      .exponentialRampToValueAtTime(
        0.0001,
        now + 0.35
      );

    oscillator.connect(gain);
    gain.connect(this.masterGain);

    oscillator.start(now);
    oscillator.stop(now + 0.4);
  }

  playOpeningDopplerSequence() {
    if (!this.enabled || !this.audioContext) {
      return;
    }

    this.resume();

    const now =
      this.audioContext.currentTime;

    const source =
      this.audioContext.createOscillator();

    const harmonic =
      this.audioContext.createOscillator();

    const sourceGain =
      this.audioContext.createGain();

    const harmonicGain =
      this.audioContext.createGain();

    const filter =
      this.audioContext.createBiquadFilter();

    const panner =
      this.audioContext.createStereoPanner
        ? this.audioContext.createStereoPanner()
        : null;

    source.type = "sawtooth";
    harmonic.type = "sine";
    filter.type = "lowpass";
    filter.Q.value = 1.8;

    /*
     * Approaching object: frequency and volume rise.
     * Pass-by: rapid pitch drop and stereo crossing.
     * Departure: filtered tail falls into the loading ambience.
     */
    source.frequency.setValueAtTime(
      145,
      now
    );
    source.frequency.exponentialRampToValueAtTime(
      920,
      now + 2.65
    );
    source.frequency.exponentialRampToValueAtTime(
      94,
      now + 3.55
    );
    source.frequency.exponentialRampToValueAtTime(
      48,
      now + 6.4
    );

    harmonic.frequency.setValueAtTime(
      290,
      now
    );
    harmonic.frequency.exponentialRampToValueAtTime(
      1840,
      now + 2.65
    );
    harmonic.frequency.exponentialRampToValueAtTime(
      188,
      now + 3.55
    );
    harmonic.frequency.exponentialRampToValueAtTime(
      76,
      now + 6.2
    );

    filter.frequency.setValueAtTime(
      280,
      now
    );
    filter.frequency.exponentialRampToValueAtTime(
      4200,
      now + 2.7
    );
    filter.frequency.exponentialRampToValueAtTime(
      520,
      now + 5.8
    );

    sourceGain.gain.setValueAtTime(
      0.0001,
      now
    );
    sourceGain.gain.exponentialRampToValueAtTime(
      0.115,
      now + 2.5
    );
    sourceGain.gain.linearRampToValueAtTime(
      0.15,
      now + 2.78
    );
    sourceGain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + 6.6
    );

    harmonicGain.gain.setValueAtTime(
      0.0001,
      now
    );
    harmonicGain.gain.exponentialRampToValueAtTime(
      0.038,
      now + 2.45
    );
    harmonicGain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + 5.5
    );

    source.connect(filter);
    harmonic.connect(harmonicGain);

    if (panner) {
      panner.pan.setValueAtTime(-1, now);
      panner.pan.linearRampToValueAtTime(
        -0.25,
        now + 2.3
      );
      panner.pan.linearRampToValueAtTime(
        1,
        now + 3.25
      );
      filter.connect(sourceGain);
      sourceGain.connect(panner);
      harmonicGain.connect(panner);
      panner.connect(this.masterGain);
    } else {
      filter.connect(sourceGain);
      sourceGain.connect(this.masterGain);
      harmonicGain.connect(this.masterGain);
    }

    source.start(now);
    harmonic.start(now);
    source.stop(now + 6.7);
    harmonic.stop(now + 6.3);

    this.playDopplerPassBurst(
      now + 2.62
    );
  }

  playDopplerPassBurst(startTime) {
    const duration = 1.35;
    const sampleRate =
      this.audioContext.sampleRate;
    const buffer =
      this.audioContext.createBuffer(
        1,
        Math.floor(sampleRate * duration),
        sampleRate
      );
    const data = buffer.getChannelData(0);

    let previous = 0;
    for (let index = 0; index < data.length; index += 1) {
      const white = Math.random() * 2 - 1;
      previous =
        previous * 0.94 +
        white * 0.06;
      data[index] = previous;
    }

    const source =
      this.audioContext.createBufferSource();
    const filter =
      this.audioContext.createBiquadFilter();
    const gain =
      this.audioContext.createGain();

    source.buffer = buffer;
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(
      2400,
      startTime
    );
    filter.frequency.exponentialRampToValueAtTime(
      170,
      startTime + duration
    );
    filter.Q.value = 0.65;

    gain.gain.setValueAtTime(
      0.0001,
      startTime
    );
    gain.gain.linearRampToValueAtTime(
      0.09,
      startTime + 0.06
    );
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      startTime + duration
    );

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    source.start(startTime);
    source.stop(startTime + duration);
  }

  playGenesisLoadingSequence() {
    if (!this.enabled || !this.audioContext) return;
    this.resume();
    const now=this.audioContext.currentTime;
    const carrier=this.audioContext.createOscillator();
    const shimmer=this.audioContext.createOscillator();
    const carrierGain=this.audioContext.createGain();
    const shimmerGain=this.audioContext.createGain();
    const filter=this.audioContext.createBiquadFilter();

    carrier.type="sine"; shimmer.type="triangle";
    carrier.frequency.setValueAtTime(58,now);
    carrier.frequency.linearRampToValueAtTime(108,now+8.2);
    shimmer.frequency.setValueAtTime(220,now);
    shimmer.frequency.exponentialRampToValueAtTime(920,now+8.1);
    filter.type="lowpass";
    filter.frequency.setValueAtTime(240,now);
    filter.frequency.linearRampToValueAtTime(1500,now+7.9);

    carrierGain.gain.setValueAtTime(.0001,now);
    carrierGain.gain.linearRampToValueAtTime(.05,now+.45);
    carrierGain.gain.linearRampToValueAtTime(.032,now+7.5);
    carrierGain.gain.exponentialRampToValueAtTime(.0001,now+8.7);
    shimmerGain.gain.setValueAtTime(.0001,now);
    shimmerGain.gain.linearRampToValueAtTime(.017,now+.8);
    shimmerGain.gain.exponentialRampToValueAtTime(.0001,now+8.5);

    carrier.connect(filter); filter.connect(carrierGain); carrierGain.connect(this.masterGain);
    shimmer.connect(shimmerGain); shimmerGain.connect(this.masterGain);
    carrier.start(now); shimmer.start(now); carrier.stop(now+8.8); shimmer.stop(now+8.7);

    for(let i=0;i<7;i+=1){
      const o=this.audioContext.createOscillator(),g=this.audioContext.createGain(),t=now+.45+i*1.05;
      o.type="sine";o.frequency.value=390+i*48;
      g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.014,t+.018);g.gain.exponentialRampToValueAtTime(.0001,t+.17);
      o.connect(g);g.connect(this.masterGain);o.start(t);o.stop(t+.2);
    }
  }

  playBootSystemCheck(systemName, index=0) {
    if (!this.enabled || !this.audioContext) return;
    this.resume();
    const now=this.audioContext.currentTime;
    const o=this.audioContext.createOscillator(),g=this.audioContext.createGain();
    o.type="sine";o.frequency.setValueAtTime(570+index*35,now);o.frequency.linearRampToValueAtTime(790+index*35,now+.16);
    g.gain.setValueAtTime(.0001,now);g.gain.linearRampToValueAtTime(.027,now+.02);g.gain.exponentialRampToValueAtTime(.0001,now+.36);
    o.connect(g);g.connect(this.masterGain);o.start(now);o.stop(now+.4);
    this.speakPreflightStatus(`${systemName}: okay`);
  }

  playPreflightAuthorization() {
    if (!this.enabled || !this.audioContext) return;
    const now=this.audioContext.currentTime;
    [660,880,1100].forEach((f,i)=>{
      const o=this.audioContext.createOscillator(),g=this.audioContext.createGain(),t=now+i*.1;
      o.type="sine";o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.03,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+.34);
      o.connect(g);g.connect(this.masterGain);o.start(t);o.stop(t+.38);
    });
    window.setTimeout(()=>this.speakPreflightStatus("All systems okay. Take Flight is authorized."),420);
  }

  speakPreflightStatus(message) {
    if (!("speechSynthesis" in window)) return;
    const u=new SpeechSynthesisUtterance(message);
    u.rate=.82;u.pitch=.84;u.volume=Math.max(0,Math.min(1,this.volume*1.35));
    window.speechSynthesis.speak(u);
  }

  playTakeFlightCue() {
    if (
      !this.enabled ||
      !this.audioContext
    ) {
      return;
    }

    this.resume();

    const now =
      this.audioContext.currentTime;

    const oscillator =
      this.audioContext.createOscillator();

    const harmonic =
      this.audioContext.createOscillator();

    const gain =
      this.audioContext.createGain();

    const harmonicGain =
      this.audioContext.createGain();

    oscillator.type =
      "sine";

    harmonic.type =
      "triangle";

    oscillator.frequency.setValueAtTime(
      180,
      now
    );

    oscillator.frequency.exponentialRampToValueAtTime(
      760,
      now + 0.92
    );

    harmonic.frequency.setValueAtTime(
      270,
      now
    );

    harmonic.frequency.exponentialRampToValueAtTime(
      1140,
      now + 0.92
    );

    gain.gain.setValueAtTime(
      0.0001,
      now
    );

    gain.gain.linearRampToValueAtTime(
      0.075,
      now + 0.12
    );

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + 1.25
    );

    harmonicGain.gain.setValueAtTime(
      0.0001,
      now
    );

    harmonicGain.gain.linearRampToValueAtTime(
      0.028,
      now + 0.18
    );

    harmonicGain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + 1.1
    );

    oscillator.connect(gain);
    harmonic.connect(harmonicGain);
    gain.connect(this.masterGain);
    harmonicGain.connect(this.masterGain);

    oscillator.start(now);
    harmonic.start(now);

    oscillator.stop(now + 1.35);
    harmonic.stop(now + 1.25);

    this.playLaunchControlChime(
      now + 0.95
    );
  }

  playLaunchControlChime(startTime) {
    const frequencies = [
      660,
      880,
      1100
    ];

    frequencies.forEach(
      (frequency, index) => {
        const oscillator =
          this.audioContext.createOscillator();

        const gain =
          this.audioContext.createGain();

        const noteTime =
          startTime + index * 0.08;

        oscillator.type =
          "sine";

        oscillator.frequency.value =
          frequency;

        gain.gain.setValueAtTime(
          0.0001,
          noteTime
        );

        gain.gain.linearRampToValueAtTime(
          0.026,
          noteTime + 0.02
        );

        gain.gain.exponentialRampToValueAtTime(
          0.0001,
          noteTime + 0.34
        );

        oscillator.connect(gain);
        gain.connect(this.masterGain);

        oscillator.start(noteTime);
        oscillator.stop(noteTime + 0.38);
      }
    );
  }

  playEngineStartup() {
    if (
      !this.enabled ||
      !this.audioContext
    ) {
      return;
    }

    this.resume();

    const now =
      this.audioContext.currentTime;

    const engineGain =
      this.audioContext.createGain();

    const engineFilter =
      this.audioContext.createBiquadFilter();

    const lowEngine =
      this.audioContext.createOscillator();

    const turbine =
      this.audioContext.createOscillator();

    const turbineGain =
      this.audioContext.createGain();

    engineFilter.type =
      "lowpass";

    engineFilter.frequency.setValueAtTime(
      180,
      now
    );

    engineFilter.frequency.linearRampToValueAtTime(
      980,
      now + 3.5
    );

    engineFilter.Q.value =
      1.3;

    lowEngine.type =
      "sawtooth";

    lowEngine.frequency.setValueAtTime(
      28,
      now
    );

    lowEngine.frequency.exponentialRampToValueAtTime(
      74,
      now + 3.6
    );

    turbine.type =
      "triangle";

    turbine.frequency.setValueAtTime(
      90,
      now
    );

    turbine.frequency.exponentialRampToValueAtTime(
      420,
      now + 3.5
    );

    engineGain.gain.setValueAtTime(
      0.0001,
      now
    );

    engineGain.gain.linearRampToValueAtTime(
      0.105,
      now + 1.1
    );

    engineGain.gain.linearRampToValueAtTime(
      0.06,
      now + 3.8
    );

    engineGain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + 5.2
    );

    turbineGain.gain.setValueAtTime(
      0.0001,
      now
    );

    turbineGain.gain.linearRampToValueAtTime(
      0.038,
      now + 1.6
    );

    turbineGain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + 4.8
    );

    lowEngine.connect(engineFilter);
    engineFilter.connect(engineGain);
    engineGain.connect(this.masterGain);

    turbine.connect(turbineGain);
    turbineGain.connect(this.masterGain);

    lowEngine.start(now);
    turbine.start(now);

    lowEngine.stop(now + 5.3);
    turbine.stop(now + 5);

    this.playEngineNoise(
      now,
      4.8
    );
  }

  playEngineNoise(startTime, duration) {
    const sampleRate =
      this.audioContext.sampleRate;

    const frameCount =
      Math.floor(
        sampleRate * duration
      );

    const buffer =
      this.audioContext.createBuffer(
        1,
        frameCount,
        sampleRate
      );

    const data =
      buffer.getChannelData(0);

    let previous = 0;

    for (
      let index = 0;
      index < frameCount;
      index += 1
    ) {
      const white =
        Math.random() * 2 - 1;

      previous =
        previous * 0.985 +
        white * 0.015;

      data[index] =
        previous;
    }

    const source =
      this.audioContext.createBufferSource();

    const filter =
      this.audioContext.createBiquadFilter();

    const gain =
      this.audioContext.createGain();

    source.buffer =
      buffer;

    filter.type =
      "bandpass";

    filter.frequency.setValueAtTime(
      110,
      startTime
    );

    filter.frequency.linearRampToValueAtTime(
      640,
      startTime + duration
    );

    filter.Q.value =
      0.7;

    gain.gain.setValueAtTime(
      0.0001,
      startTime
    );

    gain.gain.linearRampToValueAtTime(
      0.045,
      startTime + 1.4
    );

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      startTime + duration
    );

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    source.start(startTime);
    source.stop(
      startTime + duration
    );
  }

  playCountdownCue(value) {
    if (
      !this.enabled ||
      !this.audioContext
    ) {
      return;
    }

    this.resume();

    const now =
      this.audioContext.currentTime;

    const launch =
      value === "LAUNCH";

    const frequencyMap = {
      "3": 440,
      "2": 520,
      "1": 620,
      "LAUNCH": 980
    };

    const oscillator =
      this.audioContext.createOscillator();

    const gain =
      this.audioContext.createGain();

    oscillator.type =
      launch
        ? "sawtooth"
        : "sine";

    oscillator.frequency.setValueAtTime(
      frequencyMap[value] || 440,
      now
    );

    if (launch) {
      oscillator.frequency.exponentialRampToValueAtTime(
        180,
        now + 0.72
      );
    }

    gain.gain.setValueAtTime(
      0.0001,
      now
    );

    gain.gain.linearRampToValueAtTime(
      launch
        ? 0.095
        : 0.052,
      now + 0.025
    );

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + (
        launch
          ? 0.82
          : 0.38
      )
    );

    oscillator.connect(gain);
    gain.connect(this.masterGain);

    oscillator.start(now);
    oscillator.stop(
      now + (
        launch
          ? 0.9
          : 0.45
      )
    );

    this.speakCountdown(value);

    if (launch) {
      this.playThrustBurst(
        now + 0.12
      );
    }
  }

  speakCountdown(value) {
    if (
      !("speechSynthesis" in window)
    ) {
      return;
    }

    const spokenValue =
      value === "LAUNCH"
        ? "Launch"
        : value;

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(
        spokenValue
      );

    utterance.rate =
      value === "LAUNCH"
        ? 0.78
        : 0.7;

    utterance.pitch =
      value === "LAUNCH"
        ? 0.72
        : 0.86;

    utterance.volume =
      Math.max(
        0,
        Math.min(
          1,
          this.volume * 1.4
        )
      );

    window.speechSynthesis.speak(
      utterance
    );
  }

  playThrustBurst(startTime) {
    const oscillator =
      this.audioContext.createOscillator();

    const gain =
      this.audioContext.createGain();

    oscillator.type =
      "sawtooth";

    oscillator.frequency.setValueAtTime(
      95,
      startTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
      36,
      startTime + 1.15
    );

    gain.gain.setValueAtTime(
      0.0001,
      startTime
    );

    gain.gain.linearRampToValueAtTime(
      0.13,
      startTime + 0.08
    );

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      startTime + 1.35
    );

    oscillator.connect(gain);
    gain.connect(this.masterGain);

    oscillator.start(startTime);
    oscillator.stop(startTime + 1.4);

    this.playEngineNoise(
      startTime,
      1.25
    );
  }

  playConfirmationCue(type = "arrival") {
    if (
      !this.enabled ||
      !this.audioContext
    ) {
      return;
    }

    this.resume();

    const profiles = {
      arrival: [392, 587, 784],
      landing: [330, 440, 660],
      scanner: [520, 780, 1040],
      mission: [440, 660, 880, 1100]
    };

    const notes =
      profiles[type] ||
      profiles.arrival;

    const now =
      this.audioContext.currentTime;

    notes.forEach(
      (frequency, index) => {
        const oscillator =
          this.audioContext.createOscillator();

        const gain =
          this.audioContext.createGain();

        const start =
          now + index * 0.085;

        oscillator.type =
          index === notes.length - 1
            ? "triangle"
            : "sine";

        oscillator.frequency.value =
          frequency;

        gain.gain.setValueAtTime(
          0.0001,
          start
        );

        gain.gain.linearRampToValueAtTime(
          0.026,
          start + 0.025
        );

        gain.gain.exponentialRampToValueAtTime(
          0.0001,
          start + 0.48
        );

        oscillator.connect(gain);
        gain.connect(this.masterGain);

        oscillator.start(start);
        oscillator.stop(start + 0.52);
      }
    );
  }

  playAuraCue(priority = "normal") {
    if (
      !this.enabled ||
      !this.audioContext
    ) {
      return;
    }

    const frequencies =
      priority === "high"
        ? [440, 330, 220]
        : [660, 880];

    frequencies.forEach(
      (frequency, index) => {
        const oscillator =
          this.audioContext
            .createOscillator();

        const gain =
          this.audioContext
            .createGain();

        const now =
          this.audioContext.currentTime +
          index * 0.1;

        oscillator.type =
          priority === "high"
            ? "triangle"
            : "sine";

        oscillator.frequency.value =
          frequency;

        gain.gain.setValueAtTime(
          0.0001,
          now
        );

        gain.gain.linearRampToValueAtTime(
          0.032,
          now + 0.025
        );

        gain.gain.exponentialRampToValueAtTime(
          0.0001,
          now + 0.42
        );

        oscillator.connect(gain);
        gain.connect(this.masterGain);

        oscillator.start(now);
        oscillator.stop(now + 0.5);
      }
    );
  }

  setEnabled(enabled) {
    this.enabled =
      Boolean(enabled);

    if (this.masterGain) {
      const now =
        this.audioContext.currentTime;

      this.masterGain.gain
        .cancelScheduledValues(now);

      this.masterGain.gain
        .linearRampToValueAtTime(
          this.enabled
            ? this.volume
            : 0,
          now + 0.18
        );
    }

    if (this.enabled) {
      this.resume();
    }

    this.interface.updateSoundscapeState(
      this.context,
      this.enabled,
      this.volume
    );
  }

  setVolume(value) {
    this.volume =
      Math.max(
        0,
        Math.min(
          1,
          Number(value) || 0
        )
      );

    if (
      this.masterGain &&
      this.enabled
    ) {
      const now =
        this.audioContext.currentTime;

      this.masterGain.gain
        .cancelScheduledValues(now);

      this.masterGain.gain
        .linearRampToValueAtTime(
          this.volume,
          now + 0.12
        );
    }

    this.interface.updateSoundscapeState(
      this.context,
      this.enabled,
      this.volume
    );
  }

  reset() {
    this.elapsed = 0;
    this.pulseElapsed = 0;
    this.context = "flight";
    this.previousContext = "";
  }
}
