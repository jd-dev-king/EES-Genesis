export class AdaptiveInterfaceSystem {
  constructor({ interfaceManager, panelDefinitions }) {
    this.interface = interfaceManager;
    this.panelDefinitions = panelDefinitions;
    this.storageKey = "ees-adaptive-command-layout-v1";
    this.panels = new Map();
    this.dragState = null;
    this.started = false;
    this.onPointerMove = this.handlePointerMove.bind(this);
    this.onPointerUp = this.handlePointerUp.bind(this);
    this.onResize = this.clampAllPanels.bind(this);
  }

  start() {
    if (this.started) return;
    this.started = true;
    this.registerPanels();
    this.interface.initializeCommandDeck(this.panelDefinitions);
    this.restoreLayout();
    window.addEventListener("pointermove", this.onPointerMove);
    window.addEventListener("pointerup", this.onPointerUp);
    window.addEventListener("resize", this.onResize);
  }

  registerPanels() {
    this.panelDefinitions.forEach((definition) => {
      const element = document.querySelector(`[data-adaptive-panel="${definition.id}"]`);
      if (!element) return;
      const header = this.findPanelHeader(element);
      const panel = { ...definition, element, header };
      this.panels.set(definition.id, panel);
      this.decoratePanel(panel);
    });
  }

  findPanelHeader(element) {
    return element.querySelector([
      ".aura-operations-head",
      ".mission-command-head",
      ".discovery-protocol-head",
      ".destination-command-head",
      ".facility-operations-head",
      ".mission-panel-header",
      ".hud-heading",
      "header"
    ].join(",")) || element.firstElementChild || element;
  }

  decoratePanel(panel) {
    panel.element.classList.add(
      "adaptive-command-panel"
    );

    panel.header.classList.add(
      "adaptive-command-handle"
    );

    panel.header.dataset.panelId =
      panel.id;

    const tools =
      document.createElement("div");

    tools.className =
      "adaptive-panel-tools";

    const grip =
      document.createElement("button");

    grip.type = "button";
    grip.className =
      "adaptive-panel-grip";
    grip.setAttribute(
      "aria-label",
      `Move ${panel.label}`
    );
    grip.title =
      `Drag to move ${panel.label}`;
    grip.innerHTML =
      "<span></span><span></span><span></span><span></span><span></span><span></span>";

    const controls =
      document.createElement("div");

    controls.className =
      "adaptive-panel-controls";

    controls.innerHTML =
      `<button type="button" data-panel-action="collapse" aria-label="Collapse ${panel.label}" title="Collapse panel">−</button>
       <button type="button" data-panel-action="hide" aria-label="Hide ${panel.label}" title="Hide panel">×</button>`;

    tools.append(
      grip,
      controls
    );

    panel.header.append(tools);

    grip.addEventListener(
      "pointerdown",
      (event) =>
        this.beginDrag(
          event,
          panel,
          grip
        )
    );

    controls.addEventListener(
      "pointerdown",
      (event) => {
        event.preventDefault();
        event.stopPropagation();
      }
    );

    controls.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        const action =
          event.target.closest(
            "[data-panel-action]"
          )?.dataset.panelAction;

        if (action === "collapse") {
          this.toggleCollapse(panel.id);
        }

        if (action === "hide") {
          this.setPanelVisible(
            panel.id,
            false
          );
        }
      }
    );
  }

  beginDrag(event, panel, grip) {
    if (
      event.button !== 0 &&
      event.pointerType !== "touch"
    ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const rect =
      panel.element.getBoundingClientRect();

    document.documentElement.classList.add(
      "adaptive-drag-active"
    );

    panel.element.classList.add(
      "is-dragging"
    );

    panel.element.style.position =
      "fixed";

    panel.element.style.left =
      `${rect.left}px`;

    panel.element.style.top =
      `${rect.top}px`;

    panel.element.style.right =
      "auto";

    panel.element.style.bottom =
      "auto";

    this.dragState = {
      panel,
      grip,
      pointerId: event.pointerId,
      offsetX:
        event.clientX - rect.left,
      offsetY:
        event.clientY - rect.top
    };

    grip.setPointerCapture?.(
      event.pointerId
    );
  }

  handlePointerMove(event) {
    if (!this.dragState) return;

    if (
      event.pointerId !==
      this.dragState.pointerId
    ) {
      return;
    }

    event.preventDefault();

    const {
      panel,
      offsetX,
      offsetY
    } = this.dragState;

    const rect =
      panel.element.getBoundingClientRect();

    const left =
      Math.max(
        6,
        Math.min(
          window.innerWidth -
            rect.width -
            6,
          event.clientX - offsetX
        )
      );

    const top =
      Math.max(
        6,
        Math.min(
          window.innerHeight -
            rect.height -
            6,
          event.clientY - offsetY
        )
      );

    panel.element.style.left =
      `${left}px`;

    panel.element.style.top =
      `${top}px`;
  }

  handlePointerUp(event) {
    if (!this.dragState) return;

    if (
      event?.pointerId !== undefined &&
      event.pointerId !==
        this.dragState.pointerId
    ) {
      return;
    }

    const {
      panel,
      grip,
      pointerId
    } = this.dragState;

    panel.element.classList.remove(
      "is-dragging"
    );

    document.documentElement.classList.remove(
      "adaptive-drag-active"
    );

    if (
      grip?.hasPointerCapture?.(
        pointerId
      )
    ) {
      grip.releasePointerCapture(
        pointerId
      );
    }

    this.dragState = null;
    this.saveLayout();
  }

  toggleCollapse(id) {
    const panel = this.panels.get(id);
    if (!panel) return;
    panel.element.classList.toggle("is-collapsed");
    this.interface.updateCommandDeckPanelState(id, this.getPanelState(panel));
    this.saveLayout();
  }

  setPanelVisible(id, visible) {
    const panel = this.panels.get(id);
    if (!panel) return;
    panel.element.classList.toggle("adaptive-user-hidden", !visible);
    this.interface.updateCommandDeckPanelState(id, this.getPanelState(panel));
    this.saveLayout();
  }

  setAllVisible(visible) {
    this.panels.forEach((panel) => {
      panel.element.classList.toggle("adaptive-user-hidden", !visible);
      this.interface.updateCommandDeckPanelState(panel.id, this.getPanelState(panel));
    });
    this.saveLayout();
  }

  resetLayout() {
    this.handlePointerUp();
    localStorage.removeItem(this.storageKey);
    this.panels.forEach((panel) => {
      panel.element.classList.remove("adaptive-user-hidden", "is-collapsed", "is-dragging");
      ["position","left","top","right","bottom"].forEach((name) => panel.element.style.removeProperty(name));
      this.interface.updateCommandDeckPanelState(panel.id, this.getPanelState(panel));
    });
  }

  getPanelState(panel) {
    return {
      visible: !panel.element.classList.contains("adaptive-user-hidden"),
      collapsed: panel.element.classList.contains("is-collapsed")
    };
  }

  saveLayout() {
    const layout = {};
    this.panels.forEach((panel, id) => {
      const rect = panel.element.getBoundingClientRect();
      layout[id] = {
        ...this.getPanelState(panel),
        customPosition: panel.element.style.position === "fixed",
        left: rect.left,
        top: rect.top
      };
    });
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(layout));
    } catch {}
  }

  restoreLayout() {
    let layout = null;
    try {
      layout = JSON.parse(localStorage.getItem(this.storageKey) || "null");
    } catch {}

    if (!layout) {
      this.panels.forEach((panel) => {
        this.interface.updateCommandDeckPanelState(panel.id, this.getPanelState(panel));
      });
      return;
    }

    this.panels.forEach((panel, id) => {
      const state = layout[id];
      if (!state) return;
      panel.element.classList.toggle("adaptive-user-hidden", state.visible === false);
      panel.element.classList.toggle("is-collapsed", Boolean(state.collapsed));
      if (state.customPosition) {
        panel.element.style.position = "fixed";
        panel.element.style.left = `${state.left}px`;
        panel.element.style.top = `${state.top}px`;
        panel.element.style.right = "auto";
        panel.element.style.bottom = "auto";
      }
      this.interface.updateCommandDeckPanelState(id, this.getPanelState(panel));
    });
    this.clampAllPanels();
  }

  clampAllPanels() {
    this.panels.forEach((panel) => {
      if (panel.element.style.position !== "fixed") return;
      const rect = panel.element.getBoundingClientRect();
      panel.element.style.left = `${Math.max(6, Math.min(window.innerWidth - rect.width - 6, rect.left))}px`;
      panel.element.style.top = `${Math.max(6, Math.min(window.innerHeight - rect.height - 6, rect.top))}px`;
    });
  }
}
