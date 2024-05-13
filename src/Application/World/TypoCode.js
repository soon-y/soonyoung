import * as THREE from "three";
import Application from "../Application.js";
import { typo } from "./mesh/typo.js";
import gsap from "gsap";

export default class TypoCode {
  constructor() {
    this.application = new Application();
    this.scene = this.application.scene;
    this.camera = this.application.camera;
    this.time = this.application.time;
    this.code = typo("{/code}");
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

  hover() {
    gsap.to(this.instance.rotation, {
      duration: 1,
      y: Math.PI * 3,
      ease: "power2.inout",
    });

    this.instance.rotation.y = Math.PI;
  }
}
