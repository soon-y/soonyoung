import * as THREE from "three";
import { param } from "../param.js";
import Application from "../Application";
import Environment from "./Environment";
import Logo from "./Logo";
import Particle from "./Particle";
import Snake from "./Snake";
import gsap from "gsap";
import Billiards from "./Billiards";
import TypoLog from "./TypoLog";
import Dewy from "./Dewy";
import Multi from "./Multi";
import "hammerjs";

const checkbox = document.getElementById("checkbox");
const btnRyt = document.querySelector(".fa-arrow-right");
const btnLeft = document.querySelector(".fa-arrow-left");
const btnDown = document.querySelector(".fa-arrow-down");
const footer = document.querySelector(".footer");
const multiculture = document.getElementById("multiculture");
const log = document.getElementById("log");
const link = document.getElementById("link");
const iframeBtn = document.getElementById("iframeBtn");
const iframes = document.getElementsByTagName("iframe");
let ready = false;
let currentTarget = 0;
let currentIndex = 2;
let currentPos;
const step = Math.PI / 3;

export default class World {
  constructor(canvas) {
    this.application = new Application();
    this.size = this.application.sizes;
    this.scene = this.application.scene;
    this.resources = this.application.resources;
    this.raycaster = this.application.raycaster;
    this.camera = this.application.camera.instance;
    this.hammer = new Hammer(canvas)
    this.hammer.get("swipe").set({ direction: Hammer.DIRECTION_HORIZONTAL});
    this.currentIntersect = null;

    // Wait for resources
    this.resources.on("ready", () => {
      this.environment = new Environment();
      this.logo = new Logo();
      this.particle = new Particle();
      this.snake = new Snake();
      this.ball = new Billiards();
      this.log = new TypoLog();
      this.dewy = new Dewy();
      this.multi = new Multi();
      this.group = new THREE.Group();
      this.group.add(
        this.logo.instance,
        this.snake.instance,
        this.ball.instance,
        this.dewy.instance,
        this.log.instance,
        this.multi.instance,
        this.logo.logo
      );
      this.scene.add(this.group);
      currentPos = this.logo;
      this.placeObject();
      ready = true;
    });

    checkbox.addEventListener("click", () => {
      if (checkbox.checked) {
        this.logo.transfrom();
      } else {
        this.logo.transfrom();
      }
      if (this.logo.done) {
        checkbox.checked = false;
      } else {
        checkbox.checked = true;
      }
    });

    this.hammer.on("swipeleft", () =>{
      this.moveArrow(currentTarget + step, -1);
    });

    this.hammer.on("swiperight", () =>{
      this.moveArrow(currentTarget - step, 1);
    });

    btnRyt.addEventListener("click", () => {
      this.moveArrow(currentTarget + step, -1);
    });

    btnLeft.addEventListener("click", () => {
      this.moveArrow(currentTarget - step, 1);
    });

    btnDown.addEventListener("click", () => {
      gsap.to(this.camera.rotation, {
        x: 0,
        duration: 2,
        ease: "power2.inout",
      });

      btnDown.style.opacity = "0";

      window.setTimeout(() => {
        btnDown.style.display = "none";
        btnLeft.style.display = "block";
        btnRyt.style.display = "block";
        footer.style.display = "block";
        document.getElementById("permission").style.opacity = "1";
      }, 1000);

      for (let i = 0; i < iframes.length; i++) {
        iframes[i].style.rotate = "x 90deg";
      }
    });
  }

  displayIframe(iframe){
    gsap.to(this.camera.rotation, {
      x: Math.PI/2,
      duration: 2,
      ease: "power2.inout",
    });
    btnDown.style.opacity = "1";
    btnDown.style.display = "block";
    footer.style.display = "none";
    btnLeft.style.display = "none";
    btnRyt.style.display = "none";
    iframe.style.rotate = "x 0deg";
    document.getElementById("permission").style.opacity = "0";
  }

  update() {
    if (this.logo) this.logo.update();
    if (this.particle) this.particle.update();
    if (this.snake) this.snake.update();
    if (this.ball) this.ball.update();
    if (this.dewy) this.dewy.update();
    if (this.multi) this.multi.update();
    if (this.log) this.log.update();
  }

  intersect() {
    if (ready) {
      const objects = [
        this.logo.logo,
        this.logo.instance,
        this.snake.instance,
        this.ball.instance,
        this.log.instance,
        this.dewy.instance,
        this.multi.instance,
      ];
      let intersects = this.raycaster.instance.intersectObjects(objects);

      if (intersects.length) {
        this.currentIntersect = intersects[0];
        document.body.style.cursor = "pointer";
        if (this.currentIntersect.object.parent.parent == this.logo.logo) {
          this.logo.transfrom();
          if (this.logo.done) {
            checkbox.checked = false;
          } else {
            checkbox.checked = true;
          }
          if (currentPos == this.last) {
            this.moveArrow(currentTarget + step, -1);
          } else if (currentPos == this.snake) {
            this.moveArrow(currentTarget - step, 1);
          }
        } else if (
          this.currentIntersect.object.parent.parent.parent ==
          this.snake.instance
        ) {
          if (currentPos == this.logo) {
            this.moveArrow(currentTarget + step, -1);
          } else if (currentPos == this.ball) {
            this.moveArrow(currentTarget - step, 1);
          }
        } else if (this.currentIntersect.object == this.ball.instance) {
          if (currentPos == this.snake) {
            this.moveArrow(currentTarget + step, -1);
          }
          if (currentPos == this.multi) {
            this.moveArrow(currentTarget - step, 1);
          }
        } else if (this.currentIntersect.object.parent == this.multi.instance) {
          if (currentPos == this.ball) {
            this.moveArrow(currentTarget + step, -1);
          }
          if (currentPos == this.log) {
            this.moveArrow(currentTarget - step, 1);
          }
        } else if (this.currentIntersect.object.parent == this.log.instance) {
          if (currentPos == this.multi) {
            this.moveArrow(currentTarget + step, -1);
          } else if (currentPos == this.dewy) {
            this.moveArrow(currentTarget - step, 1);
          }
        } else if (this.currentIntersect.object == this.dewy.instance) {
          if (currentPos == this.log) {
            this.moveArrow(currentTarget + step, -1);
          }
        }
      } else {
        this.currentIntersect = null;
        document.body.style.cursor = "default";
      }
    }
  }

  click() {
    // if (this.currentIntersect) {
    //   if (this.currentIntersect.object.parent.parent.parent == this.logo.logo) {
    //   } else if (
    //     this.currentIntersect.object.parent.parent == this.logo.instance
    //   ) {
    //   } else if (this.currentIntersect.object.parent == this.multi.instance) {
    //     this.displayIframe(multiculture);
    //   } else if (this.currentIntersect.object.parent == this.log.instance) {
    //     this.displayIframe(log);
    //   } else if (this.currentIntersect.object == this.dewy.instance) {
    //   }
    // }
  }

  placeObject() {
    this.aspect = this.size.width / this.size.height;
    this.val = 1 - this.aspect;

    this.order = [
      this.ball,
      this.snake,
      this.logo,
      this.dewy,
      this.multi,
      this.log,
    ];

    let radius;
    if (this.aspect < 1) {
      radius = param.diameter * 10 + 210 * this.val;
    } else {
      radius = param.diameter * 10;
    }

    //console.log(this.aspect + ": " + radius);

    let x = step;
    for (let i = 0; i < this.order.length; i++) {
      this.order[i].instance.position.set(
        Math.sin(x) * radius,
        0,
        Math.cos(x) * radius
      );
      x += step;
    }

    this.logo.instance.position.z = this.logo.instance.position.z - 20;
    this.logo.logo.position.z = -radius - 20;
  }

  moveArrow(target, i) {
    currentIndex = currentIndex + i;
    if (currentIndex >= this.order.length) {
      currentIndex = currentIndex - this.order.length;
    } else if (currentIndex < 0) {
      currentIndex = currentIndex + this.order.length;
    }
    currentPos = this.order[currentIndex];
    currentTarget = target;
    gsap.to(this.group.rotation, {
      duration: 1.5,
      y: currentTarget,
      ease: "power2.inout",
    });
    this.displayCheckbox(currentTarget);
    this.updatelink(currentIndex);
  }

  updatelink(target){
    console.log(target)
    link.style.display="none"
    iframeBtn.style.display="none"
    if(target == 1){
      link.style.display="block"
      link.href = "https://soonake-game.vercel.app";
    }else if(target == 0){
      link.style.display="block"
      link.href = "https://a-billiard-simulation.vercel.app";
    }else if(target ==5) {
      iframeBtn.style.display="block"
      iframeBtn.addEventListener("click", () => {
        this.displayIframe(log);
      });
    }
  }

  displayCheckbox(target) {
    target = Math.abs((target / (Math.PI * 2)).toFixed(1));
    if (Number.isInteger(target)) {
      document.querySelector(".switch-logo").style.opacity = "100%";
      document.querySelector(".switch-logo").style.transitionDuration = "1s";
    } else {
      document.querySelector(".switch-logo").style.opacity = "0";
      document.querySelector(".switch-logo").style.transitionDuration = "1s";
    }
  }
}
