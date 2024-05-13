import * as THREE from "three";
import { param } from "../param.js";
import Application from "../Application";
import Environment from "./Environment";
import Logo from "./Logo";
import Particle from "./Particle";
import Snake from "./Snake";
import gsap from "gsap";
import Billiards from "./Billiards";
import TypoCode from "./TypoCode";
import Dewy from "./Dewy";
import Multi from "./Multi";

const checkbox = document.getElementById("checkbox");
const btnRyt = document.getElementById("arrow-right");
const btnLeft = document.getElementById("arrow-left");
let ready = false;
let currentTarget = 0;
let currentIndex = 2;
let currentPos;
const step = Math.PI / 3;

export default class World {
  constructor() {
    this.application = new Application();
    this.size = this.application.sizes;
    this.scene = this.application.scene;
    this.resources = this.application.resources;
    this.raycaster = this.application.raycaster;
    //this.mouse = this.application.mouse.cursor;
    //this.camera = this.application.camera;
    this.currentIntersect = null;

    // Wait for resources
    this.resources.on("ready", () => {
      this.environment = new Environment();
      this.logo = new Logo();
      this.particle = new Particle();
      this.snake = new Snake();
      this.ball = new Billiards();
      this.code = new TypoCode();
      this.dewy = new Dewy();
      this.multi = new Multi();
      this.group = new THREE.Group();
      this.group.add(
        this.logo.instance,
        this.snake.instance,
        this.ball.instance,
        this.dewy.instance,
        this.code.instance,
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

    btnRyt.addEventListener("click", () => {
      this.moveArrow(currentTarget + step, -1);
    });
    btnLeft.addEventListener("click", () => {
      this.moveArrow(currentTarget - step, 1);
    });
  }

  update() {
    if (this.logo) this.logo.update();
    if (this.particle) this.particle.update();
    if (this.ball) this.ball.update();
    if (this.dewy) this.dewy.update();
    if (this.multi) this.multi.update();
  }

  intersect() {
    if (ready) {
      const objects = [
        this.logo.logo,
        this.logo.instance,
        this.snake.instance,
        this.ball.instance,
        this.code.instance,
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
          this.snake.hover();
          if (currentPos == this.logo) {
            this.moveArrow(currentTarget + step, -1);
          } else if (currentPos == this.ball) {
            this.moveArrow(currentTarget - step, 1);
          }
        } else if (this.currentIntersect.object == this.ball.instance) {
          this.ball.hover();
          if (currentPos == this.snake) {
            this.moveArrow(currentTarget + step, -1);
          }
          if (currentPos == this.multi) {
            this.moveArrow(currentTarget - step, 1);
          }
        } else if (this.currentIntersect.object.parent == this.multi.instance) {
          this.multi.hover();
          if (currentPos == this.ball) {
            this.moveArrow(currentTarget + step, -1);
          }
          if (currentPos == this.code) {
            this.moveArrow(currentTarget - step, 1);
          }
        } else if (this.currentIntersect.object.parent == this.code.instance) {
          this.code.hover();
          if (currentPos == this.multi) {
            this.moveArrow(currentTarget + step, -1);
          } else if (currentPos == this.dewy) {
            this.moveArrow(currentTarget - step, 1);
          }
        } else if (this.currentIntersect.object == this.dewy.instance) {
          if (currentPos == this.code) {
            this.moveArrow(currentTarget + step, -1);
          }
        }
      } else {
        this.currentIntersect = null;
        document.body.style.cursor = "default";
      }
    }
  }

  touch() {
    let objects = [this.logo.instance];
    let intersects = this.raycaster.instance.intersectObjects(objects);

    if (intersects.length) {
      this.currentIntersect = intersects[0];
      this.click();
    } else if (
      this.currentIntersect.object == this.snake.instance
    ) {
      console.log("snake click")
      document.getElementById("snakeGame").click();
    } else if (this.currentIntersect.object == this.ball.instance) {
      document.getElementById("billiards").click();
    } else if (this.currentIntersect.object.parent == this.code.instance) {
    } else if (this.currentIntersect.object == this.dewy.instance) {
    } else if (this.currentIntersect.object == this.dewy.instance) {
    } else if (this.currentIntersect.object == this.game.instance) {
    } else if (this.currentIntersect.object == this.multi.instance) {
    } else if (this.currentIntersect.object == this.last.instance) {
    }
  }

  click() {
    if (this.currentIntersect) {
      if (this.currentIntersect.object.parent.parent.parent == this.logo.logo) {
        document.getElementById("about").click();
      } else if (
        this.currentIntersect.object.parent.parent == this.logo.instance
      ) {
        document.getElementById("about").click();
      } else if (this.currentIntersect.object.parent.parent.parent == this.snake.instance) {
        document.getElementById("snakeGame").click();
      } else if (this.currentIntersect.object == this.ball.instance) {
        document.getElementById("billiards").click();
      } else if (this.currentIntersect.object.parent == this.multi.instance) {
        document.getElementById("multiculture").click();
      } else if (this.currentIntersect.object.parent == this.code.instance) {
        document.getElementById("code").click();
      } else if (this.currentIntersect.object == this.dewy.instance) {
      } else if (this.currentIntersect.object == this.dewy.instance) {
      }
    }
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
      this.code,
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

    this.logo.instance.position.z = this.logo.instance.position.z - 10;
    this.logo.logo.position.z = -radius - 10;
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
      duration: 1,
      y: currentTarget,
      ease: "power2.inout",
    });
    this.displayCheckbox(currentTarget);
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
