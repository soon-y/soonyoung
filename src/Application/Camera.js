import Application from "./Application";
import * as THREE from "three";
import { param } from "./param";
import gsap from "gsap";

const permission = document.getElementById("permission");

export default class Camera {
  constructor() {
    this.application = new Application();
    this.size = this.application.sizes;
    this.time = this.application.time;
    this.scene = this.application.scene;
    this.canvas = this.application.canvas;
    this.mouse = this.application.mouse;
    this.group = new THREE.Group();

    this.setInstance();

    if (this.isTouchDevice) {
      if (typeof DeviceMotionEvent.requestPermission === "function") {
        permission.style.display = "block";
        permission.addEventListener("click", () => {
          permission.style.display = "none";
          this.requestOrientationPermission();
        });
      } else {
        window.addEventListener(
          "deviceorientation",
          (event) => {
            this.parallax(event);
          },
          true
        );
      }
    }
  }

  requestOrientationPermission() {
    DeviceOrientationEvent.requestPermission()
      .then((response) => {
        if (response == "granted") {
          window.addEventListener("deviceorientation", (event) => {
            this.parallax(event);
          });
        }
      })
      .catch(console.error);
  }

  parallax(event) {
    this.aspect = this.size.width / this.size.height;
    switch (screen.orientation.type) {
      case "portrait-primary":
        this.yTilt = Math.round(event.beta-90);  // x axis
        this.xTilt = Math.round(event.gamma); // y axis
        break;
      case "portrait-secondary":
        // this.yTilt = Math.round(event.beta-90);  // x axis
        // this.xTilt = Math.round(event.gamma); // y axis
      case "landscape-primary":
        this.xTilt = Math.round(event.beta);  // x axis
        // this.yTilt = -Math.round(event.gamma); // y axis
        break;
      case "landscape-secondary":
        break;
      default:
        permission.style.display = "none";
    }

    this.group.position.x = this.xTilt * 0.2;
    this.group.position.y = this.yTilt * 0.2;
    // this.group.rotation.y = this.xTilt * 0.001;
  }

  setInstance() {
    this.aspect = this.size.width / this.size.height;
    this.instance = new THREE.PerspectiveCamera(50, this.aspect, 0.1, 5000);
    this.group.add(this.instance);
    this.scene.add(this.group);

    this.instance.rotation.x = -Math.PI/2;
  }

  resize() {
    this.instance.aspect = this.size.width / this.size.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    if (!this.isTouchDevice()) {
      this.parallaxX = this.mouse.cursor.x * 10;
      this.parallaxY = this.mouse.cursor.y * 10;
      this.group.position.x += (this.parallaxX - this.group.position.x) * 0.1;
      this.group.position.y += (this.parallaxY - this.group.position.y) * 0.1;
      this.rotationX = this.mouse.cursor.x * 0.1;
      this.rotationY = this.mouse.cursor.y * 0.1;
      this.group.rotation.x = this.rotationY;
      this.group.rotation.y = this.rotationX;
    }
  }

  isTouchDevice() {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }
}
