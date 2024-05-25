import * as THREE from "three";
import Application from "../Application";
import { param } from "../param";
import gsap from "gsap";

export default class Multi {
  constructor() {
    this.application = new Application();
    this.time = this.application.time;
    this.scene = this.application.scene;
    this.resources = this.application.resources;
    this.multiculture = this.resources.items.multiculture;
    this.setModel();
    //this.instance.add(new THREE.AxesHelper(5));
    this.rotation = 0.001;
  }

  setModel() {
    this.instance = this.multiculture.scene;
    this.instance.scale.multiplyScalar(param.diameter);
    this.scene.add(this.instance);
  }

  update() {
    this.instance.rotation.x += this.rotation;
    this.instance.rotation.z += this.rotation;
    this.instance.rotation.y += this.rotation;
    this.instance.position.y = Math.sin(this.application.time.elapsed) * 2;
  }
}
