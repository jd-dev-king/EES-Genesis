export class DiscoveryProtocolSystem {
  constructor({ discoverySystem, hiddenObjectsSystem, interfaceManager, progressStore }) {
    this.discoverySystem=discoverySystem; this.hiddenObjectsSystem=hiddenObjectsSystem;
    this.interface=interfaceManager; this.progressStore=progressStore; this.elapsed=0;
    this.lastArtifactCount=discoverySystem.discoveredArtifacts.size;
    this.achievements=[
      {id:"first-signal",title:"First Signal",description:"Recover the first hidden engineering artifact.",threshold:1},
      {id:"field-researcher",title:"Field Researcher",description:"Recover three hidden engineering artifacts.",threshold:3},
      {id:"archive-specialist",title:"Archive Specialist",description:"Recover five hidden engineering artifacts.",threshold:5},
      {id:"genesis-archivist",title:"Genesis Archivist",description:"Recover every hidden engineering artifact.",threshold:hiddenObjectsSystem.getScannables().length}
    ];
    this.unlocked=new Set(this.load());
    this.interface.initializeDiscoveryProtocol(this.achievements,this.unlocked);
  }
  load(){try{const v=JSON.parse(localStorage.getItem("ees-discovery-achievements")||"[]");return Array.isArray(v)?v:[]}catch{return[]}}
  save(){try{localStorage.setItem("ees-discovery-achievements",JSON.stringify([...this.unlocked]))}catch{}}
  start(){this.interface.setDiscoveryProtocolVisible(true);this.refresh()}
  update(delta){
    this.elapsed+=delta;
    const target=this.discoverySystem.nearestScannable;
    const distance=this.discoverySystem.nearestScannableDistance;
    const range=this.discoverySystem.getTargetScanRange(target);
    this.interface.updateDiscoverySignal({target,distance,range,scannerMode:this.discoverySystem.scannerMode,elapsed:this.elapsed});
    const count=this.discoverySystem.discoveredArtifacts.size;
    if(count!==this.lastArtifactCount){this.lastArtifactCount=count;this.refresh();this.evaluate(count)}
  }
  refresh(){
    const recovered=this.discoverySystem.discoveredArtifacts.size;
    const total=this.hiddenObjectsSystem.getScannables().length;
    const state=this.progressStore.load();
    this.interface.updateDiscoveryProtocolProgress({recovered,total,xp:Number(state.xp)||0});
  }
  evaluate(count){
    this.achievements.forEach(a=>{
      if(count<a.threshold||this.unlocked.has(a.id))return;
      this.unlocked.add(a.id);this.save();this.interface.unlockDiscoveryAchievement(a);
    });
  }
  handleArtifactRecovered(artifact){
    this.interface.updateDiscoveryActivity(`Recovered ${artifact.title}`);
    this.refresh();this.evaluate(this.discoverySystem.discoveredArtifacts.size);
  }
  reset(){
    this.unlocked.clear();this.save();this.lastArtifactCount=0;
    this.interface.initializeDiscoveryProtocol(this.achievements,this.unlocked);this.refresh();
  }
}
