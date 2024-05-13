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
    this.instance.rotation.y = Math.PI * 0.85;
    //this.instance.add(new THREE.AxesHelper(25));
    this.rotation = 0.001;
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
    this.instance.rotation.y += this.rotation;
  }

  hover() {
    gsap.to(this.instance.rotation, {
      duration: 2,
      z: -Math.PI * 8,
      ease: "power2.inout",
    });

    gsap.to(this.instance.rotation, {
      duration: 1,
      y: Math.PI * 0.85,
      ease: "power2.inout",
    });

    gsap.to(this.instance.rotation, {
      duration: 1,
      x: 0,
      ease: "power2.inout",
    });

    this.instance.rotation.z = 0;
  }
}
