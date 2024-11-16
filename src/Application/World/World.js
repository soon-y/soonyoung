import * as THREE from "three";
import { param } from "../param.js";
import Application from "../Application";
import Environment from "./Environment";
import Logo from "./Logo";
import Particle from "./Particle";
import Snake from "./Snake";
import Skills from "./Skills.js";
import gsap from "gsap";
import TypoLog from "./TypoLog";
import Dewy from "./Dewy";
import "hammerjs";

const checkbox = document.getElementById("checkbox");
const btnRyt = document.querySelector(".fa-arrow-right");
const btnLeft = document.querySelector(".fa-arrow-left");
const btnDown = document.querySelector(".fa-arrow-down");
const btnUp = document.querySelector(".fa-arrow-up");
const footer = document.querySelector(".footer");
const log = document.getElementById("log");
const link = document.getElementById("link");
const camBtn = document.getElementById("camBtn");
const iframes = document.getElementsByTagName("iframe");
let ready = false;
let currentTarget = 0;
let currentIndex = 2;
let camRotated = false;
let isFocus = true;
const step = Math.PI / 2;

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
      this.skills = new Skills();
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
      this.order = [
        this.snake,
        this.logo,
        this.dewy,
        this.log,
      ];
       this.scene.add(this.group);
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
      if(!camRotated){
        this.moveArrow(currentTarget + step, -1);
      }
    });

    this.hammer.on("swiperight", () =>{
      if(!camRotated){
        this.moveArrow(currentTarget - step, 1);
      }
    });

    btnRyt.addEventListener("click", () => {
      if(!camRotated){
        this.moveArrow(currentTarget + step, -1);
      }
    });

    btnLeft.addEventListener("click", () => {
      if(!camRotated){
        this.moveArrow(currentTarget - step, 1);
      }
    });

    btnDown.addEventListener("click", () => {
      gsap.to(this.camera.rotation, {
        x: 0,
        duration: 2,
        ease: "power2.inout",
      });

      btnDown.style.opacity = "0";
      camBtn.style.display = "block";

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

    btnUp.addEventListener("click", () => {
      gsap.to(this.camera.rotation, {
        x: 0,
        duration: 2,
        ease: "power2.inout",
      });
      for (let i = 0; i < iframes.length; i++) {
        iframes[i].style.display = "block";
      }
      btnUp.style.opacity = "0";
      camBtn.style.display = "block";
      camRotated = false
      document.querySelector(".switch-logo").style.display = "block";

      window.setTimeout(() => {
        btnUp.style.display = "none";
        btnLeft.style.display = "block";
        btnRyt.style.display = "block";
        footer.style.display = "block";
        document.querySelector(".switch-logo").style.opacity = "100%";
      }, 1000);
    });

    camBtn.addEventListener("click", () => {
      if(currentIndex == 0) this.displayIframe(log)
      if(currentIndex == 2) this.displaySkills();
    })

    window.addEventListener("blur", this.pause);
    window.addEventListener("focus", this.play);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) { this.pause } 
      else { this.play }
    });
  }

  pause() { 
    console.log("hidden")
    isFocus = false }
  
  play() { isFocus = true
    console.log("focus")
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
    camBtn.style.display = "none";
    iframe.style.rotate = "x 0deg";
    document.getElementById("permission").style.opacity = "0";
  }

  displaySkills(){
    gsap.to(this.camera.rotation, {
      x: -Math.PI/2,
      duration: 2,
      ease: "power2.inout",
    });

    for (let i = 0; i < iframes.length; i++) {
      iframes[i].style.display = "none";
    }
    btnUp.style.display = "block";
    footer.style.display = "none";
    btnLeft.style.display = "none";
    btnRyt.style.display = "none";
    camBtn.style.display = "none";
    document.querySelector(".switch-logo").style.opacity = "0";
    window.setTimeout(() => {
      btnUp.style.opacity = "1";
      document.querySelector(".switch-logo").style.display = "none";
    }, 1000);
    camRotated = true
  }

  intersect() {
    if (ready) {
      const objects = [
        this.logo.logo,
        this.logo.instance
      ];
      let intersects = this.raycaster.instance.intersectObjects(objects);
      if (intersects.length) {
        this.currentIntersect = intersects[0];
        document.body.style.cursor = "pointer";
      } else {
        this.currentIntersect = null;
        document.body.style.cursor = "default";
      }
    }
  }

  click() {
    if (this.currentIntersect) {
      if (this.currentIntersect.object.parent.parent.parent == this.logo.logo
        ||this.currentIntersect.object.parent.parent == this.logo.instance          
      ) {
        this.displaySkills()
      } 
    }
  }

  update() {
    if (this.logo) this.logo.update();
    if (this.particle) this.particle.update();
    if (this.snake) this.snake.update();
    if (this.dewy) this.dewy.update();
    if (this.log) this.log.update();
    if (this.skills) this.skills.update(camRotated, isFocus);
  }

  placeObject() {
    this.aspect = this.size.width / this.size.height;
    this.val = 1 - this.aspect;
    let radius;

    if (this.aspect < 1) {
      radius = param.diameter * 10 + param.objectsDistance * this.val;
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
    if(target == 0){ //log
      link.style.display="none"
      camBtn.style.display="block"
    }else if(target == 1){
      link.style.display="block"
      camBtn.style.display="none"
      link.href = "https://soonake-game.vercel.app";
    }else if(target ==2) {
      link.style.display="none"
      camBtn.style.display="block"
    }else { //my room
      link.style.display="block"
      camBtn.style.display="none"
      //link.href = "https://a-billiard-simulation.vercel.app";
    }
  }

  displayCheckbox(target) {
    target = Math.abs((target / (Math.PI * 2)).toFixed(1));
    if (Number.isInteger(target)) {
      document.querySelector(".switch-logo").style.display = "block";
      window.setTimeout(() => {
        document.querySelector(".switch-logo").style.opacity = "100%";
      }, 1000);
    } else {
      document.querySelector(".switch-logo").style.opacity = "0";
      window.setTimeout(() => {
        document.querySelector(".switch-logo").style.display = "none";
      }, 1000);
    }
  }

  resize() {
    this.skills.resize()
  }
}
