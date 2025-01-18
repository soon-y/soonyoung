import * as THREE from "three";
import Application from "../Application"
import { param } from "../param";
import { typo } from './mesh/typo.js'

export default class JS {
  constructor() {
    this.application = new Application()
    this.scene = this.application.scene
    this.resources = this.application.resources
    this.jsBG = this.resources.items.jsBg
    this.jsBG.scene.scale.multiplyScalar(param.outerRadius*2);
    this.js = typo("JS", "Neutra", 0x231f1f)
    this.js.mesh.geometry.translate(0, -this.js.mesh.geometry.boundingBox.max.y * 0.5, 0)
    this.js.mesh.rotation.x = -Math.PI/2
    this.js.mesh.position.z = 6
    this.js.mesh.position.x = 3
    this.instance = new THREE.Group()
    this.instance.add(this.jsBG.scene, this.js.mesh)
  }
}
