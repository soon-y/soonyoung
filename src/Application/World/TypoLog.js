import * as THREE from "three";
import Application from "../Application.js";
import { typo } from "./mesh/typo.js";

export default class TypoLog {
  constructor() {
    this.application = new Application();
    this.scene = this.application.scene;
    this.camera = this.application.camera;
    this.time = this.application.time;
    this.code = typo("<log/>", "mono");
    this.code.mesh.geometry.translate(
      0,
      -this.code.mesh.geometry.boundingBox.max.y * 0.5,
      0
    );
    this.instance = new THREE.Group();
    this.instance.add(this.code.mesh);
    this.instance.rotation.y = Math.PI;
    this.scene.add(this.instance);
  }

  setPos(x, z) {
    this.instance.position.x = x;
    this.instance.position.z = z;
  }

  update() {
    this.instance.position.y = Math.sin(this.application.time.elapsed)*2;
  }
}
