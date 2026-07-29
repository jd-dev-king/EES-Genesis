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

const sound = fs.readFileSync(
  "src/systems/AdaptiveSoundscapeSystem.js",
  "utf8"
);

const zone = fs.readFileSync(
  "src/navigation/ZoneManager.js",
  "utf8"
);

const requiredFiles = [
  "public/favicon.ico",
  "public/favicon-16x16.png",
  "public/favicon-32x32.png",
  "public/apple-touch-icon.png",
  "public/icon-192.png",
  "public/icon-512.png",
  "public/site.webmanifest",
  "public/GitHub-Social-Preview-Card.png",
  "public/og-image.png",
  "public/robots.txt",
  "public/sitemap.xml",
  "404.html",
  "LICENSE",
  "CONTRIBUTING.md",
  "CODE_OF_CONDUCT.md",
  "SECURITY.md"
];

const missingFiles =
  requiredFiles.filter(
    (file) => !fs.existsSync(file)
  );

const requiredContent = [
  'href="/favicon.ico"',
  'property="og:image"',
  '"@type": "WebSite"',
  "FINAL LAUNCH POLISH",
  "auraLaunchPulse",
  "discoveryBeacon",
  "playConfirmationCue",
  "onWarpArrivalAudioRequested"
];

const content =
  html + css + sound + zone;

const missingContent =
  requiredContent.filter(
    (value) => !content.includes(value)
  );

if (pkg.version !== "1.0.0") {
  console.error(
    `Expected 1.0.0, received ${pkg.version}`
  );
  process.exit(1);
}

if (
  missingFiles.length ||
  missingContent.length
) {
  console.error(
    "Final launch verification failed."
  );

  missingFiles.forEach(
    (file) =>
      console.error(`- Missing file ${file}`)
  );

  missingContent.forEach(
    (value) =>
      console.error(`- Missing content ${value}`)
  );

  process.exit(1);
}

console.log(
  "EES Genesis v1.0.0 Final Launch Edition verification passed."
);
