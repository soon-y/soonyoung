import * as THREE from "three";
import Application from "../Application"
import { param } from "../param";
import { typo } from './mesh/typo.js'

export default class CSS {
  constructor() {
    this.application = new Application()
    this.scene = this.application.scene
    this.resources = this.application.resources
    this.cssBG = this.resources.items.cssBg
    this.cssBG.scene.scale.multiplyScalar(param.outerRadius*2);
    this.css = typo("CSS", "Dinish", 0xFFFFFF)
    this.css.mesh.geometry.translate(0, -this.css.mesh.geometry.boundingBox.max.y * 0.5, 0)
    this.css.mesh.rotation.x = -Math.PI/2
    this.css.mesh.position.z = 5
    this.css.mesh.position.x = 0
    this.instance = new THREE.Group()
    this.instance.add(this.cssBG.scene, this.css.mesh)
  }
}
