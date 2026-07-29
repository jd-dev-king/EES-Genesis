import fs from "node:fs";

const pkg = JSON.parse(
  fs.readFileSync("package.json", "utf8")
);

const html = fs.readFileSync(
  "index.html",
  "utf8"
);

const css = fs.readFileSync(
  "src/style.css",
  "utf8"
);

const interfaceManager = fs.readFileSync(
  "src/ui/InterfaceManager.js",
  "utf8"
);

const zoneManager = fs.readFileSync(
  "src/navigation/ZoneManager.js",
  "utf8"
);

const robot = fs.readFileSync(
  "src/entities/FlyingRobot.js",
  "utf8"
);

const catalog = fs.readFileSync(
  "src/config/projectCatalog.js",
  "utf8"
);

const required = [
  "EES v1.0.0 • PUBLIC RELEASE",
  "https://ees-jdl.com/",
  "destination-marker-drag-handle",
  "destination-marker-collapse",
  "toggleDestinationMarkerCollapse",
  "keepDestinationMarkerInViewport",
  "WAYPOINT CONTROL CONTAINMENT",
  "prepareForWarp()",
  "restoreFlightAfterTakeoff()",
  "Launch 3D Simulator",
  "Launch 3D Data Experience",
  "Launch Interactive Lab",
  "Pharma Data Nexus",
  "3D Parking PLC Simulator",
  "GitSafe Practice Lab"
];

const sources =
  html +
  css +
  interfaceManager +
  zoneManager +
  robot +
  catalog;

const missing = required.filter(
  (value) => !sources.includes(value)
);

if (pkg.version !== "1.0.0") {
  console.error(
    `Expected version 1.0.0, received ${pkg.version}`
  );
  process.exit(1);
}

if (missing.length) {
  console.error(
    "Production verification failed."
  );

  missing.forEach(
    (value) =>
      console.error(`- Missing ${value}`)
  );

  process.exit(1);
}

if (
  (html.match(/TAKE FLIGHT/g) || [])
    .length !== 1
) {
  console.error(
    "Production release must contain exactly one TAKE FLIGHT control."
  );
  process.exit(1);
}

console.log(
  "EES Genesis v1.0.0 production verification passed."
);
