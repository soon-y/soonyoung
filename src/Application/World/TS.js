import * as THREE from "three";
import Application from "../Application"
import { param } from "../param";
import { typo } from './mesh/typo.js'

export default class TS {
  constructor() {
    this.application = new Application()
    this.scene = this.application.scene
    this.resources = this.application.resources
    this.tsBG = this.resources.items.tsBg
    this.tsBG.scene.scale.multiplyScalar(param.outerRadius*2);
    this.ts = typo("TS", "Neutra", 0xFFFFFF)
    this.ts.mesh.geometry.translate(0, -this.ts.mesh.geometry.boundingBox.max.y * 0.5, 0)
    this.ts.mesh.rotation.x = -Math.PI/2
    this.ts.mesh.position.z = 5
    this.ts.mesh.position.x = 2.5
    this.instance = new THREE.Group()
    this.instance.add(this.tsBG.scene, this.ts.mesh)
  }
}
