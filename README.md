# EES Genesis

## Unified Engineering Portfolio Experience

**EES Genesis** is the public gateway into Jeremiah Lupton's Engineering Experience System. It transforms a professional portfolio into an interactive Three.js universe where visitors explore projects, capabilities, education, leadership, engineering operations, digital twins, contextual intelligence, and future EES systems.

This repository contains the complete unified application deployed to:

```text
https://ees-jdl.com
```

## Experience flow

```text
Identity Core Launch Pad
        ↓
Genesis Pre-Flight Boot
        ↓
Orbital Hangar
        ↓
Explorer Deployment
        ↓
EES Portfolio Universe
```

The Launch Pad and full Portfolio Experience now share one Vite application, one Three.js renderer, one deployment pipeline, and one production domain.

## Current release

```text
Version: v1.5.0
Release: Unified Genesis Experience
Status: Active Development
Production Domain: ees-jdl.com
```

## Core features

- Real-time Three.js Identity Core
- Animated electrical orb and energy field
- Procedural lightning arcs
- Rotating orbital and platform rings
- Moving particles, robotic arms, drones, and traffic
- Launch Pad system initialization
- Genesis pre-flight boot sequence
- Fully closing 100% diagnostic gauge
- Orbital hangar and explorer deployment
- Three-arm robotic flight craft
- Third-person camera tracking
- Waypoints, warp, autopilot, landing, and takeoff
- World and destination collision systems
- Expandable EES Verse perimeter
- Multi-mode scanner and hidden discoveries
- Mission campaign, XP, and achievements
- Living Universe autonomous entities
- Engineering Operations console
- Digital Twin Labs
- AURA contextual intelligence
- Robotic portfolio portals
- Scrollable project and repository catalogs
- Internal capability, journey, contact, and roadmap views
- Embedded professional résumé download
- Persistent progress through browser local storage

## Portfolio destinations

| Destination | Portfolio function |
|---|---|
| Identity Constellation | Professional identity and experience core |
| Project Earth | Engineering and software project portfolio |
| Capability Nexus | Skills, platforms, methods, and expertise |
| Journey Moon | Reverse-chronological professional and academic timeline |
| Communications Station | Contact and collaboration information |
| Source Code Satellite | GitHub repositories and live project experiences |
| EES Gateway | Engineering Experience System architecture and roadmap |

## Technology stack

- JavaScript ES modules
- Three.js
- Vite
- HTML5
- CSS3
- WebGL
- Browser local storage
- Git and GitHub
- Vercel
- Custom production domain

## Local development

Requirements:

- Node.js 20 or newer
- npm

Install and start:

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:5174
```

## Production build

```bash
npm run build
npm run preview
```

The optimized output is generated in:

```text
dist/
```

## GitHub setup

From the project folder:

```bash
git init
git add .
git commit -m "Release EES Genesis v1.5.0 unified experience"
git branch -M main
git remote add origin https://github.com/jd-dev-king/EES-Portfolio-Experience.git
git push -u origin main
```

Use a different repository URL if the final public repository name changes.

## Vercel deployment

1. Push the project to GitHub.
2. In Vercel, select **Add New → Project**.
3. Import the EES repository.
4. Confirm the following settings:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

5. Deploy the project.
6. Open **Project Settings → Domains**.
7. Add:

```text
ees-jdl.com
www.ees-jdl.com
```

8. Use `ees-jdl.com` as the canonical production domain.
9. Redirect `www.ees-jdl.com` to `ees-jdl.com`.

The included `vercel.json` provides Vite build settings, route-safe refresh handling, and long-term caching for generated assets.

## Domain architecture

```text
jeremiahlupton.com
├── Traditional Portfolio
│   └── portfolio.jeremiahlupton.com
└── EES Genesis
    └── ees-jdl.com
```

The Wix page at `jeremiahlupton.com` serves as the professional branch point. The complete interactive system lives independently at `ees-jdl.com`.

## Résumé

The standalone résumé is stored at:

```text
assets/docs/Jeremiah_Lupton.pdf
```

It is available through Identity Constellation, Journey Moon, and Communications Station.

## Verification checklist

Before production deployment, confirm:

1. The Identity Core Launch Pad appears first.
2. Launch Pad systems transition from `STANDBY` to `ONLINE`.
3. **Launch Flight** opens the Genesis boot console without navigating away.
4. Boot logs type sequentially.
5. The diagnostic gauge closes fully at `100%`.
6. **Take Flight** transitions into the Orbital Hangar.
7. The explorer deploys into the existing EES universe.
8. Missions, scanning, collisions, portals, AURA, Operations, and Digital Twins remain functional.
9. Résumé downloads use `assets/docs/Jeremiah_Lupton.pdf`.
10. Traditional Portfolio controls use `https://jeremiahlupton.com`.
11. A production build succeeds with `npm run build`.
12. Direct route refreshes return the Vite application through Vercel.

## Roadmap

### Genesis foundation

- [x] Identity Core
- [x] Launch Pad
- [x] Pre-flight diagnostics
- [x] Orbital hangar
- [x] Portfolio universe
- [x] Missions and discoveries
- [x] Living Universe
- [x] Engineering Operations
- [x] Digital Twin Labs
- [x] AURA intelligence
- [x] Unified Vercel deployment

### Next development stages

- [ ] Blueprint Forge progression and upgrade economy
- [ ] Improved GLTF robotic explorer model
- [ ] Enhanced hangar camera transition
- [ ] Audio and accessibility controls
- [ ] Mobile flight-control interface
- [ ] Expanded destination environments
- [ ] Public EES repository release
- [ ] JDL Design Language transition

## Creator

**Jeremiah Lupton**

Engineering Experience System  
EES Genesis  
JDL Design Language — future platform identity


## v1.5.1 Launch Transition Fix

- Fixed the Launch Flight button so it directly opens Genesis Boot.
- Added pointer and stacking protection for the Launch Flight control.
- Removed duplicate Jeremiah Lupton typography from the Launch Pad.
- The older Three.js identity label is hidden during Launch Pad and restored during Genesis Boot.
- Preserved all v1.5.0 flight, mission, portal, AURA, Digital Twin, résumé, and Vercel features.


## v1.6.0 Genesis Activation Cinematic

The EES opening now behaves as a short system-activation film rather than displaying the complete dashboard immediately.

### Cinematic sequence

1. System blackout
2. First energy signal
3. Identity Core formation
4. Orbital-ring stabilization
5. Identity verification
6. Robotic-arm calibration
7. Maintenance-drone activation
8. Interface assembly
9. Launch-system readiness
10. Genesis Boot and Hangar transition

The sequence includes a discreet **Skip cinematic** control and respects the browser's reduced-motion preference.

The Launch Pad, Genesis Boot, Hangar, flight universe, missions, portals, AURA, Digital Twins, résumé downloads, and Vercel configuration remain in one application.


## v1.6.1 Identity Alignment and Contrast Fix

- Anchored the Launch Pad identity to the true viewport center.
- Removed the dim Three.js identity sprite from Genesis Boot.
- Added a solid high-contrast identity plate with opaque white lettering.
- Preserved `ENGINEERING PORTFOLIO` and `EES GENESIS ONLINE`.
- Preserved the Genesis cinematic, boot sequence, hangar, missions,
  portals, AURA, Digital Twins, résumé, and Vercel configuration.

## v1.7.0 Production Release Candidate

This release prepares EES Genesis for public deployment at `https://ees-jdl.com`.

Production additions include:

- Corrected Engineering Experience System branding
- Canonical-domain and social-sharing metadata
- Branded favicon and installable web manifest
- Search indexing controls and sitemap
- Production deployment checklist
- JDL Design Language repository handoff guidance
- Disabled production source maps
- Release verification scripts

The release candidate preserves the Genesis cinematic, Identity Core, Genesis Boot, hangar, Engineering Verse, missions, AURA, Digital Twin Labs, Operations, portals, and résumé downloads.


## v1.8.0 Continuous Genesis Flow

This release removes the repeated launch decisions from the opening experience.

### Final interaction flow

```text
Immersive selection at jeremiahlupton.com
        ↓
Arrival Corridor — automatic
        ↓
Approaching the EESiverse — automatic
        ↓
Security Gate and blast doors — automatic
        ↓
Engineering Command / Genesis initialization — automatic
        ↓
TAKE FLIGHT — the only click inside EES
        ↓
Flight Operations startup — automatic
        ↓
Hangar doors open and explorer control transfers automatically
```

The former Launch Flight dashboard and Explorer Unit Ready / Deploy Explorer
decision page are no longer part of the visitor flow.

### Public repository strategy

The executable EES application should remain in its own public GitHub repository
and connect directly to Vercel and `ees-jdl.com`.

The private `JDL-Design-Language` repository remains the design authority. A Git
submodule can be introduced later when EES is formally incorporated into the
larger JDL platform.

### Production bundle strategy

Vite now separates:

- Three.js rendering engine
- EES systems
- Interface layer
- World and entity code
- Portfolio configuration and content

This prevents the application from being emitted as one oversized JavaScript
bundle and creates a cleaner caching boundary for Vercel deployments.


## v1.9.0 Single-Action Genesis

The old launch pages and event handlers have been deleted from the source.

The opening now contains exactly one user action:

```text
TAKE FLIGHT
```

Everything before and after that action runs automatically until explorer
control is transferred.


## v1.9.1 Clean Runtime Verification

The previous screen recording displayed the v1.4.1 build watermark, proving an
older Vite server or older project folder was still running.

Use:

```bash
npm run clean:start
```

The command verifies the source, terminates the previous server on port 5174,
clears Vite's cache, and launches this exact project. The visible watermark must
read:

```text
BUILD v1.9.1-CLEAN-RUNTIME-VERIFICATION • PORT 5174
```


## v2.0.0 Genesis II — Living Engineering Command

Engineering Command now has live Facility AI announcements, operational status cycles, floating holographic data, and an enhanced Flight Operations startup sequence.


## v2.1.0 Genesis III — Flight Operations

Flight Operations now presents a complete cinematic startup and launch sequence.

Robotic service arms calibrate the explorer, docking clamps release, the scanner
sweeps the vehicle, thrust reaches full power, and the hangar performs a
three-second launch countdown before automatically transferring control.


## v2.2.0 Genesis IV — Engineering Verse

Explorer launch now flows into a hyperspace arrival sequence. The Navigation
Matrix discovers and synchronizes every portfolio destination while AURA
briefs the visitor. The Engineering Verse then reveals itself and transfers
control automatically without adding another click.


## v2.3.0 Genesis V — Living Engineering Verse

The Engineering Verse now continues operating while visitors fly or remain idle. Destinations pulse, repository data moves through space, cargo vessels and comets cross sectors, relay pulses activate, AURA issues operational reports, and explorer telemetry updates continuously.


## v2.4.0 Genesis VI — Destination Facilities

Each destination now operates as a distinct facility rather than a floating
navigation marker. Project Earth has an engineering city and cargo traffic;
Journey Moon has archive beacons; Capability Nexus has a connected knowledge
network; Communications Station emits relay sweeps; Source Code Satellite
streams repository nodes; Identity Constellation powers an experience core;
and EES Gateway remains visibly under active construction.

The explorer HUD now reports facility, approach, and docking-link status.


## v2.5.0 Genesis VII — Facility Operations

Landing now triggers an operational facility connection rather than simply
opening destination content. Active landing pads guide the explorer through
final approach, and touchdown begins an automatic security, docking, power,
data-core, and portal-authorization sequence. A compact Facility Operations
console remains visible alongside the destination world and disengages during
takeoff.


## v2.6.0 Genesis VIII — Destination Command Modules

Every destination now loads a specialized command module after docking. The
module presents a local objective, facility-specific engineering systems, live
metrics, operational status, and an AURA briefing. Identity, projects,
capabilities, journey, communications, source control, and EES development now
behave as distinct departments inside the Engineering Verse.


## v2.7.0 Genesis IX — Discovery Protocol

The existing scanner now powers persistent signal intelligence, recovery metrics, Discovery XP, and achievement milestones without changing flight, missions, landing, or portals.


## v2.8.0 Genesis X — Mission Command

The seven-mission campaign now includes live phases, route progress, elapsed time, projected grades, optional objectives, and automatic completion debriefs while preserving existing mission rules.


## v2.9.0 Genesis XI — AURA Operations Intelligence

AURA now continuously evaluates mission, scanner, waypoint, facility, craft,
energy, autopilot, and idle-state context. It presents a ranked next action,
confidence score, concise rationale, and recent observation log while leaving
all navigation and decisions under visitor control.


## v3.0.0 Genesis XII — Adaptive Command Interface

Every major operational console is now draggable, collapsible, hideable, and persistent. Command Deck restores individual panels and provides Show All, Hide All, and Reset Layout controls.


## v3.0.1 Genesis XII — Interaction Fix

Adaptive panels now use a dedicated six-dot drag grip rather than treating the
entire header as a drag surface. Pointer events are restored for operational
panels, collapse and hide buttons receive input reliably, and browser text
selection is disabled only while a drag is active.


## v3.1.0 Genesis XIII — Experience Director

Visitors can now select Guided Journey, Recruiter Review, Engineering Explorer,
or Focus Mode. Each profile configures panel visibility, collapse state, motion
intensity, and guidance density while preserving the same Engineering Verse,
missions, scanning, destinations, and portfolio content.


## v3.2.0 Genesis XIV — Flight Computer & System Console

The crowded header is replaced by a centered holographic Flight Computer and one scalable SYSTEM console. Context-aware panel profiles automatically prioritize flight, scanning, approach, or docked operations while manual panel control remains available.


## v3.2.1 Genesis XIV — Command Center Flow

The SYSTEM control now receives pointer input reliably. Traditional Portfolio
has been removed from the Flight Computer. Returning to Command Center first
opens a confirmation warning that the active simulation will end. After
confirmation, a dedicated mechanical-arm Command Center provides Retake Flight,
Return Home, and Traditional Portfolio Experience routes.


## v3.2.2 Genesis XIV — Command Center Runtime Fix

The End Simulation action previously stopped on an undefined
`closeAllPanels()` call. The transition now performs a valid interface shutdown
and moves Command Center to the document body before the EESiverse container is
hidden. End Simulation therefore exits the active universe and displays the
three-route Command Center.


## v3.3.0 Genesis XV — AURA Holographic Presence

AURA now has an active holographic presence inside the Engineering Verse. It
surfaces concise mission guidance, signal alerts, destination welcomes, final
approach instructions, and safety advisories while the existing AURA Operations
panel retains detailed intelligence. The hologram remains advisory and can be
disabled through System Accessibility.


## v3.4.0 Genesis XVI — Cinematic Camera Director

The Engineering Verse now uses restrained contextual camera behavior. Free
flight receives subtle orbital drift, nearby scanner signals receive focused
framing, destination approaches frame the explorer and facility together, and
docking shifts attention to local operations. Cinematic Camera can be disabled
through System Accessibility and is automatically bypassed in Reduced Motion.


## v3.5.0 Genesis XVII — Adaptive Soundscape

The Engineering Verse now includes a procedural adaptive soundscape requiring no
external audio assets. Flight, scanning, approach, docking, AURA guidance, and
Command Center states each receive a distinct audio profile. Visitors can mute
the system or adjust master volume through System Accessibility.


## v3.5.1 Genesis XVII — Launch Audio Sequence

The launch sequence now includes a rising Take Flight activation sweep,
procedural engine ignition and turbine spool-up, an audible spoken 3–2–1
countdown, synchronized launch-control tones, and a final thrust burst. All
launch sounds use the existing Adaptive Soundscape mute and master-volume
controls.


## v3.5.2 Genesis XVII — Cinematic Audio Runtime Fix

The launch effects previously fired before the Adaptive Soundscape had created
its Web Audio context. Audio now initializes and resumes inside the original
Take Flight click gesture, satisfying browser user-activation requirements.
The activation sweep, engine startup, spoken countdown, control tones, and
thrust burst can therefore play before entry into the Engineering Verse.


## v3.5.3 Genesis XVII — Preflight Audio Sequence

The first cinematic screen now includes a rising loading and power-routing sound with synchronized progress ticks. The second screen audibly confirms each displayed preflight system as “okay,” then announces that all systems are operational and Take Flight is authorized.


## v3.5.4 Genesis XVII — Live Project Releases

Project Earth and the project catalogs now identify three completed releases:

- **Pharma-Data-Nexus** replaces Pharmaceutical cGMP Database and opens its
  public 3D GitHub Pages experience.
- **GitSafe Practice Lab** opens its live interactive demonstration and notes
  that the complete hosted user experience is planned for Railway.
- **3D Parking PLC Simulator v2.0.0** replaces Car Parking Lot Barrier
  Controller and presents the upgraded Three.js PLC/HMI simulation.


## v3.5.5 Genesis XVII — Doppler Opening & Title Cleanup

Visible project titles now use **Pharma Data Nexus** without dashes while repository and deployment URLs retain the required `Pharma-Data-Nexus` slug.

Because browsers prohibit sound before a page-level user gesture, the first cinematic now begins with a compact **Activate Immersive Audio** control. Activation restarts the opening sequence and synchronizes it with an approaching Doppler sweep, rapid pass-by pitch shift, stereo crossing, energy burst, and fading departure resonance.


## v3.5.6 Genesis XVII — Launch Label Consistency

Project Earth now uses project-specific **Launch** terminology for every live
experience. The renderer reads each project's `liveLabel` and suppresses a
duplicate generic resource link when the same URL is already used by the live
action.

Examples include **Launch 3D Simulator**, **Launch 3D Data Experience**,
**Launch Interactive Lab**, **Launch SQL Studio**, and **Launch AI Experience**.


## v1.0.0 Public Release

EES Genesis is prepared for its first production release at
**https://ees-jdl.com**. Version 1.0.0 consolidates the cinematic launch
sequence, interactive Engineering Verse, AURA intelligence, adaptive sound and
camera systems, Project Earth, Command Center, accessibility controls, live
project alignment, and standardized Launch terminology into one public
experience.

The primary entry point remains **jeremiahlupton.com**, offering visitors a
choice between the recruiter-friendly traditional portfolio and the immersive
EES Genesis experience.


## v1.0.0 RC2 — Waypoint and Warp Corrections

- The destination waypoint panel now constrains and wraps every action,
  preventing the Land button from escaping the panel at narrower widths.
- Warp now safely closes docked facility interfaces, restores flight input,
  disables autopilot, clears landing and takeoff state, resets movement, and
  relocates the explorer in ordinary flight mode.


## v1.0.0 RC3 — Draggable and Collapsible Waypoint

The waypoint destination panel can now be dragged from its destination header
and collapsed to a compact strip. Its selected destination and distance remain
visible while collapsed, and all navigation and landing actions return when it
is expanded. Dragging is constrained to the current viewport.


## v1.0.0 Production Release

EES Genesis v1.0.0 is the first public production release of the Engineering
Experience System.

The final release includes the verified waypoint and navigation corrections:

- Responsive waypoint controls remain inside their panel.
- The waypoint panel is draggable and viewport-constrained.
- The waypoint panel can collapse to a compact destination strip.
- Warping from a docked state safely restores flight controls.
- Landing, takeoff, autopilot, and movement states are normalized before warp.

Production domain: **https://ees-jdl.com**


## EES Genesis v1.0.0 — Final Launch Edition

The Final Launch Edition integrates the complete production branding package,
GitHub social preview, Open Graph metadata, PWA icons, themed 404 experience,
structured data, refined visual feedback, warp-arrival audio confirmation,
reduced-motion safeguards, and public repository governance files.

Repository: **https://github.com/jd-dev-king/EES-Genesis**

Production domain: **https://ees-jdl.com**
