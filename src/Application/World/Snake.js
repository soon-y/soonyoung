import * as THREE from "three";
import Application from "../Application";
import { param } from "../param";
import gsap from "gsap";

export default class Snake {
  constructor() {
    this.application = new Application();
    this.time = this.application.time;
    this.scene = this.application.scene;
    this.resources = this.application.resources;
    this.head = this.resources.items.snake;
    this.mouth = this.resources.items.mouth;
    this.tongue = this.resources.items.tongue;
    this.eyelid = this.resources.items.eyelid;
    this.instance = new THREE.Group();
    this.angle = -Math.PI/4;
    this.instance.rotation.y = this.angle;

    this.setModel();
    this.flick();
    this.blink();
  }

  setModel() {
    this.snakehead = this.head.scene;
    this.snakemouth = this.mouth.scene;
    this.snaketongue = this.tongue.scene;
    this.eyeR = this.eyelid.scene;

    this.snakemouth.position.y = 0.015;
    this.snakemouth.position.z = 0.13;

    this.eyeR.position.y = 0.15;
    this.eyeR.position.z = 0.08;
    this.eyeL = this.eyeR.clone();
    this.eyePosX = 0.285;
    this.eyeR.position.x = this.eyePosX;
    this.eyeL.position.x = -this.eyePosX;
    this.eyelidR = this.eyeR.clone();
    this.eyelidL = this.eyeL.clone();
    this.eyelidR.rotation.x = Math.PI - Math.PI / 4;
    this.eyelidL.rotation.x = Math.PI - Math.PI / 4;
    this.eyeR.rotation.x = Math.PI / 4;
    this.eyeL.rotation.x = Math.PI / 4;

    this.instance.add(
      this.snakehead,
      this.snakemouth,
      this.snaketongue,
      this.eyeR,
      this.eyeL,
      this.eyelidR,
      this.eyelidL
    );

    this.scene.add(this.instance);
    this.instance.scale.multiplyScalar(param.diameter * 3);
  }

  hover() {
    let duration = 0.4;
    gsap.to(this.snakemouth.rotation, {
      x: -Math.PI / 4,
      duration: duration,
    });

    gsap.to(this.snakemouth.rotation, {
      x: 0,
      duration: duration,
      delay: duration,
    });

    gsap.to(this.instance.rotation, {
      duration: 1,
      y: Math.PI * 2 + this.angle,
      ease: "power2.inout",
    });

    this.instance.rotation.y = this.angle;
  }

  flick() {
    let flick = gsap.timeline({ repeat: -1, repeatDelay: 3 });
    let duration = 0.2;
    flick.to(this.snaketongue.position, {
      z: 0.7,
      duration: duration,
    });
    flick.to(this.snaketongue.position, {
      z: 0,
      duration: duration,
    });
  }

  blink() {
    let duration = 0.2;
    let eyeR = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    let eyeL = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    let eyelidR = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    let eyelidL = gsap.timeline({ repeat: -1, repeatDelay: 2 });

    eyeR.to(this.eyeR.rotation, {
      x: 0,
      duration: duration,
    });

    eyeL.to(this.eyeL.rotation, {
      x: 0,
      duration: duration,
    });

    eyelidR.to(this.eyelidR.rotation, {
      x: Math.PI,
      duration: duration,
    });

    eyelidL.to(this.eyelidL.rotation, {
      x: Math.PI,
      duration: duration,
    });

    eyeR.to(this.eyeR.rotation, {
      x: Math.PI / 4,
      duration: duration,
    });

    eyeL.to(this.eyeL.rotation, {
      x: Math.PI / 4,
      duration: duration,
    });

    eyelidR.to(this.eyelidR.rotation, {
      x: Math.PI - Math.PI / 4,
      duration: duration,
    });

    eyelidL.to(this.eyelidL.rotation, {
      x: Math.PI - Math.PI / 4,
      duration: duration,
    });
  }
}
