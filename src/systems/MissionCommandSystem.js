export class MissionCommandSystem {
  constructor({missionSystem,discoverySystem,interfaceManager}){
    this.missionSystem=missionSystem;this.discoverySystem=discoverySystem;this.interface=interfaceManager;
    this.missionElapsed=0;this.activeMissionId=null;this.completedCount=missionSystem.state.completedMissionIds.length;
    this.artifactCountAtMissionStart=discoverySystem.discoveredArtifacts.size;this.debriefTimer=null;
    this.interface.setMissionCommandVisible(false);
  }
  start(){this.interface.setMissionCommandVisible(true);this.synchronizeMission(true)}
  update(delta){
    this.missionElapsed+=delta;const mission=this.missionSystem.getActiveMission();
    if(mission?.id!==this.activeMissionId)this.synchronizeMission(false);
    const count=this.missionSystem.state.completedMissionIds.length;
    if(count>this.completedCount)this.handleMissionCompletion(count);
    this.completedCount=count;this.updateActiveMission(mission);
  }
  synchronizeMission(initial){
    const mission=this.missionSystem.getActiveMission();this.activeMissionId=mission?.id||null;this.missionElapsed=0;
    this.artifactCountAtMissionStart=this.discoverySystem.discoveredArtifacts.size;
    if(!mission){this.interface.setMissionCommandComplete(this.missionSystem.state);return}
    this.interface.initializeMissionCommand(mission,this.getOptionalObjective(mission),initial);
  }
  getOptionalObjective(mission){
    return {text:mission.completionType==="discover"?"Recover one hidden artifact before completing this discovery mission.":"Complete one scanner discovery before touchdown.",complete:this.discoverySystem.discoveredArtifacts.size>this.artifactCountAtMissionStart};
  }
  getMissionGrade(){if(this.missionElapsed<=45)return"S";if(this.missionElapsed<=90)return"A";if(this.missionElapsed<=150)return"B";return"C"}
  getMissionPhase(mission){
    if(!mission)return"CAMPAIGN COMPLETE";
    const discovered=this.missionSystem.hasDiscovered(mission.targetZoneId),landed=this.missionSystem.hasLanded(mission.targetZoneId);
    if(mission.completionType==="land"){if(landed)return"COMPLETE";if(discovered)return"FINAL APPROACH";return"NAVIGATE"}
    if(discovered)return"COMPLETE";
    return this.discoverySystem.nearestScannable?"SIGNAL ACQUISITION":this.discoverySystem.scannerMode==="navigation"?"SEARCH":"SCANNER ALIGNMENT";
  }
  getRouteProgress(mission){
    if(!mission)return 100;if(this.missionSystem.missionConditionMet(mission))return 100;
    if(this.missionSystem.hasDiscovered(mission.targetZoneId))return mission.completionType==="land"?72:100;
    const nearest=this.discoverySystem.nearestScannable;
    if(nearest?.zoneId===mission.targetZoneId){const d=this.discoverySystem.nearestScannableDistance;return Math.max(14,Math.min(68,68-d/8))}
    return 12;
  }
  updateActiveMission(mission){
    if(!mission)return;this.interface.updateMissionCommand({mission,phase:this.getMissionPhase(mission),elapsed:this.missionElapsed,grade:this.getMissionGrade(),progress:this.getRouteProgress(mission),optional:this.getOptionalObjective(mission)});
  }
  handleMissionCompletion(count){
    const id=this.missionSystem.state.completedMissionIds[count-1],mission=this.missionSystem.missions.find(x=>x.id===id);
    if(!mission)return;const nextMission=this.missionSystem.getActiveMission(),optional=this.getOptionalObjective(mission);
    this.interface.showMissionDebrief({mission,grade:this.getMissionGrade(),optionalComplete:optional.complete,nextMission});
    clearTimeout(this.debriefTimer);this.debriefTimer=setTimeout(()=>this.interface.hideMissionDebrief(),6200);
  }
  reset(){this.missionElapsed=0;this.completedCount=0;this.activeMissionId=null;this.artifactCountAtMissionStart=0;this.interface.hideMissionDebrief()}
}
