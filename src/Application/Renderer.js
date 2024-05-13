import Application from "./Application";
import * as THREE from "three";
import { param } from "./param";
import gsap from "gsap";

export default class Renderer {
  constructor() {
    this.application = new Application();
    this.size = this.application.sizes;
    this.scene = this.application.scene;
    this.canvas = this.application.canvas;
    this.camera = this.application.camera;

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });
    this.instance.setClearAlpha(0.5);
    this.instance.setClearColor("#000000");
    this.instance.setSize(this.size.width, this.size.height);
    this.instance.setPixelRatio(this.size.pixelRatio);
  }

  resize() {
    this.instance.setSize(this.size.width, this.size.height);
    this.instance.setPixelRatio(this.size.pixelRatio);

    // this.aspect = this.size.width / this.size.height;
    // this.val = 1 - this.aspect;
    // if (this.aspect < 1) {
    //   gsap.to(this.camera.instance.position, {
    //     z: param.diameter * 10 + 210 * this.val,
    //     duration: 0.6,
    //     ease: "power2.inout",
    //   });
    // } else {
    //   gsap.to(this.camera.instance.position, {
    //     z: param.diameter * 10,
    //     duration: 0.6,
    //     ease: "power2.inout",
    //   });
    // }
  }

  update() {
    this.instance.render(this.scene, this.camera.instance);
  }
}
