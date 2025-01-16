import * as THREE from "three";
import Application from "../Application";
import { param } from "../param";
import gsap from "gsap";

export default class Billiards {
  constructor() {
    this.application = new Application();
    this.time = this.application.time;
    this.resources = this.application.resources;
    this.scene = this.application.scene;
    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();

    this.scene.add(this.instance);
    //this.instance.add(new THREE.AxesHelper(25));
    this.rotation = this.application.time.delta * 0.01;
  }

  setGeometry() {
    this.geometry = new THREE.SphereGeometry(param.innerRadius * 3, 32, 32);
  }

  setTextures() {
    this.textures = {};
    this.textures.color = this.resources.items.billiards;
    this.textures.color.encoding = THREE.sRGBEncoding;
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      color: "#ffffff",
      roughness: 0.3,
      metalness: 0.1,
      map: this.textures.color,
    });
  }

  setMesh() {
    this.instance = new THREE.Mesh(this.geometry, this.material);
    this.box = new THREE.BoxHelper(this.instance, 0xffff00);
  }

  update() {
    this.instance.rotation.x += this.rotation;
    this.instance.rotation.z -= this.rotation;
    // this.instance.rotation.y += this.rotation;
    this.instance.position.y = Math.sin(this.application.time.elapsed) * 2;
  }
}
