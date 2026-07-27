import fs from "node:fs";

const pkg = JSON.parse(
  fs.readFileSync("package.json", "utf8")
);

const html = fs.readFileSync("index.html", "utf8");
const ui = fs.readFileSync(
  "src/ui/InterfaceManager.js",
  "utf8"
);

const css = fs.readFileSync(
  "src/style.css",
  "utf8"
);

const required = [
  "requestImmediateTakeoff",
  'data-cockpit-action="takeoff"',
  "detail-is-open",
  "MOBILE TAKEOFF + CONTACT CONSOLE FIX",
  ".contact-console-card",
  "portal-detail-overlay",
  '"pointerup"'
];

const all = html + ui + css;
const missing = required.filter(
  (value) => !all.includes(value)
);

if (pkg.version !== "1.2.4") {
  console.error(
    `Expected 1.2.4, received ${pkg.version}`
  );
  process.exit(1);
}

if (missing.length) {
  console.error(
    "Takeoff/contact verification failed."
  );
  missing.forEach(
    (value) => console.error(`- Missing ${value}`)
  );
  process.exit(1);
}

console.log(
  "EES Genesis v1.2.4 mobile takeoff/contact verification passed."
);
