import fs from "node:fs";

const html = fs.readFileSync("index.html", "utf8");
const ui = fs.readFileSync(
  "src/ui/InterfaceManager.js",
  "utf8"
);

const expected = [
  "v1.0.0 EES GENESIS PUBLIC RELEASE",
  "EES v1.0.0",
  "APPROACHING THE EESIVERSE"
];

const forbidden = [
  'id="launch-screen"',
  'id="launch-button"',
  'id="genesis-launch-button"',
  'id="deploy-button"',
  "LAUNCH FLIGHT",
  "Explorer unit ready",
  "Explorer Unit Ready",
  "Deploy Explorer"
];

const errors = [];

for (const value of expected) {
  if (!html.includes(value)) {
    errors.push(`Missing expected runtime marker: ${value}`);
  }
}

for (const value of forbidden) {
  if (html.includes(value) || ui.includes(value)) {
    errors.push(`Legacy runtime reference remains: ${value}`);
  }
}

const takeFlightCount =
  (html.match(/TAKE FLIGHT/g) || []).length;

if (takeFlightCount !== 1) {
  errors.push(
    `Expected exactly one TAKE FLIGHT, found ${takeFlightCount}`
  );
}

if (errors.length) {
  console.error("\\nRuntime verification failed:\\n");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("Runtime source verification passed.");
console.log("Build: v1.0.0 EES GENESIS PUBLIC RELEASE");
console.log("Exactly one TAKE FLIGHT action is present.");
console.log("No legacy launch or explorer-ready pages exist.");
