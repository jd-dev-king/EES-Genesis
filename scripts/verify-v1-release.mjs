import fs from "node:fs";

const pkg = JSON.parse(
  fs.readFileSync("package.json", "utf8")
);

const html = fs.readFileSync(
  "index.html",
  "utf8"
);

const vercel = fs.readFileSync(
  "vercel.json",
  "utf8"
);

const catalog = fs.readFileSync(
  "src/config/projectCatalog.js",
  "utf8"
);

const required = [
  "EES v1.0.0 • PUBLIC RELEASE",
  "https://ees-jdl.com/",
  "EES Genesis | Engineering Experience System",
  "Launch 3D Simulator",
  "Launch 3D Data Experience",
  "Launch Interactive Lab",
  "Pharma Data Nexus",
  "3D Parking PLC Simulator",
  "GitSafe Practice Lab"
];

const sources =
  html +
  vercel +
  catalog;

const missing = required.filter(
  (value) => !sources.includes(value)
);

if (pkg.version !== "1.0.0") {
  console.error(
    `Expected package version 1.0.0, received ${pkg.version}`
  );
  process.exit(1);
}

if (missing.length) {
  console.error(
    "v1.0.0 release verification failed."
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
    "The release must contain one TAKE FLIGHT control."
  );
  process.exit(1);
}

console.log(
  "EES Genesis v1.0.0 release verification passed."
);
