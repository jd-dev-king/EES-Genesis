import "./style.css";
import { Experience } from "./core/Experience.js";

const canvas = document.querySelector("#experience-canvas");

try {
  new Experience(canvas);
} catch (error) {
  console.error("Unable to start EES:", error);

  document.body.innerHTML = `
    <main class="fatal-error">
      <p class="eyebrow">EES GENESIS ERROR</p>
      <h1>The flight experience could not start.</h1>
      <p>The EES engine encountered a startup error.</p>
      <pre class="startup-error-details">${error?.message || "Unknown startup error"}</pre>
      <p>Open the browser console for the full stack trace.</p>
      <a href="https://jeremiahlupton.com">Open Traditional Portfolio</a>
    </main>
  `;
}
