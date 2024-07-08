import * as THREE from "three";
import { param } from "../param.js";
import Application from "../Application";
import Environment from "./Environment";
import Logo from "./Logo";
import Particle from "./Particle";
import Snake from "./Snake";
import gsap from "gsap";
import TypoLog from "./TypoLog";
import Dewy from "./Dewy";
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
const step = Math.PI / 2;

export default class World {
  constructor(canvas) {
    this.application = new Application();
    this.size = this.application.sizes;
    this.scene = this.application.scene;
    this.resources = this.application.resources;
    this.camera = this.application.camera.instance;
    this.hammer = new Hammer(canvas)
    this.hammer.get("swipe").set({ direction: Hammer.DIRECTION_HORIZONTAL});

    // Wait for resources
    this.resources.on("ready", () => {
      this.environment = new Environment();
      this.logo = new Logo();
      this.particle = new Particle();
      this.snake = new Snake();
      this.log = new TypoLog();
      this.dewy = new Dewy();
      this.group = new THREE.Group();
      this.group.add(
        this.logo.instance,
        this.snake.instance,
        this.dewy.instance,
        this.log.instance,
        this.logo.logo
      );
      this.scene.add(this.group);
      this.order = [
        this.snake,
        this.logo,
        this.dewy,
        this.log,
      ];
  
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
      iframeBtn.style.display = "block";

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
    iframeBtn.style.display = "none";
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

    placeObject() {
    this.aspect = this.size.width / this.size.height;
    this.val = 1 - this.aspect;
    let radius;

    if (this.aspect < 1) {
      radius = param.diameter * 10 + 210 * this.val;
    } else {
      radius = param.diameter * 10;
    }

    let x = step;
    for (let i = 0; i < this.order.length; i++) {
      this.order[i].instance.position.set(
        Math.sin(x) * radius,
        0,
        Math.cos(x) * radius
      );
      x += step;
    }
    
    this.logo.logo.position.z = this.logo.instance.position.z - 20;
    this.logo.instance.position.z -=  20;
  }

  moveArrow(target, i) {
    currentIndex = currentIndex + i;
    if (currentIndex >= this.order.length) {
      currentIndex -= this.order.length;
    } else if (currentIndex < 0) {
      currentIndex += this.order.length;
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
    if(target == 0){
      link.style.display="none"
      iframeBtn.style.display="block"
      iframeBtn.addEventListener("click", () => {
        this.displayIframe(log);
      })
    }else if(target == 1){
      link.style.display="block"
      iframeBtn.style.display="none"
      link.href = "https://soonake-game.vercel.app";
    }else if(target ==2) {
    
    }else { //dewy
      link.style.display="block"
      iframeBtn.style.display="none"
      //link.href = "https://a-billiard-simulation.vercel.app";
    }
  }

  displayCheckbox(target) {
    target = Math.abs((target / (Math.PI * 2)).toFixed(1));
    if (Number.isInteger(target)) {
      document.querySelector(".switch-logo").style.opacity = "100%";
    } else {
      document.querySelector(".switch-logo").style.opacity = "0";
    }
  }
}
