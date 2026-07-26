export class FlightComputerSystem {
  constructor({robot,zoneManager,discoverySystem,interfaceManager,adaptiveInterfaceSystem}) {
    this.robot=robot;this.zoneManager=zoneManager;this.discoverySystem=discoverySystem;
    this.interface=interfaceManager;this.adaptiveInterface=adaptiveInterfaceSystem;
    this.started=false;this.contextAware=true;this.currentContext="flight";
  }
  start() {
    if(this.started)return;
    this.started=true;
    this.interface.initializeSystemConsole();
    this.interface.setFlightComputerVisible(true);
    this.interface.setSystemConsoleVisible(true);
    this.applyContext("flight",true);
  }
  update() {
    if(!this.started)return;
    const context=this.determineContext();
    if(context!==this.currentContext)this.applyContext(context,false);
    this.interface.updateSystemDiagnostics({context:this.currentContext,activePanels:this.countVisiblePanels()});
  }
  determineContext() {
    if(this.robot.isLanded())return"docked";
    const zone=this.zoneManager.activeZone||this.zoneManager.nearestZone||null;
    if(zone){
      const point=zone.position.clone().add(zone.landingOffset);
      if(this.robot.getPosition().distanceTo(point)<Math.max(zone.approachRadius||150,150))return"approach";
    }
    if(this.discoverySystem.nearestScannable&&Number.isFinite(this.discoverySystem.nearestScannableDistance)&&this.discoverySystem.nearestScannableDistance<180)return"scanning";
    return"flight";
  }
  applyContext(context,initial) {
    this.currentContext=context;
    this.interface.updateFlightComputerContext(context);
    if(this.contextAware)this.applyContextPanels(context);
    if(!initial)this.interface.showGuide("Flight Computer",this.getContextMessage(context));
  }
  applyContextPanels(context) {
    const profiles={
      flight:{visible:["flight-status","mission-command","aura-operations"],collapsed:["mission-command"]},
      scanning:{visible:["flight-status","discovery-protocol","aura-operations"],collapsed:[]},
      approach:{visible:["flight-status","facility-operations","aura-operations"],collapsed:["aura-operations"]},
      docked:{visible:["facility-operations","destination-command","aura-operations"],collapsed:["aura-operations"]}
    };
    const profile=profiles[context]||profiles.flight;
    const visible=new Set(profile.visible);
    this.adaptiveInterface.panels.forEach((panel,id)=>{
      this.adaptiveInterface.setPanelVisible(id,visible.has(id));
      const shouldCollapse=profile.collapsed.includes(id);
      const collapsed=panel.element.classList.contains("is-collapsed");
      if(shouldCollapse!==collapsed)this.adaptiveInterface.toggleCollapse(id);
    });
  }
  setContextAware(enabled) {
    this.contextAware=Boolean(enabled);
    if(this.contextAware)this.applyContextPanels(this.currentContext);
  }
  countVisiblePanels() {
    let count=0;
    this.adaptiveInterface.panels.forEach(panel=>{
      if(!panel.element.classList.contains("adaptive-user-hidden"))count+=1;
    });
    return count;
  }
  getContextMessage(context) {
    return {
      flight:"Flight Computer online. Navigation, mission, and AURA systems are prioritized.",
      scanning:"Scanner Computer online. Discovery and signal intelligence are prioritized.",
      approach:"Landing Computer online. Facility approach and docking systems are prioritized.",
      docked:"Facility Operations online. Destination command systems are prioritized."
    }[context];
  }
}
