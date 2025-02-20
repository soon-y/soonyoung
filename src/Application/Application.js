import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Resources from "./Utils/Resources";
import Mouse from "./Utils/Mouse";
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./World/World.js";
import sources from "./sources.js";
import Raycaster from "./Raycaster";

let instance = null;

export default class Application {
  constructor(canvas) {
    //Singleton
    if (instance) {
      return instance;
    }

    instance = this;

    //Options
    this.canvas = canvas;

    //Setup
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.mouse = new Mouse();
    this.camera = new Camera();
    this.resources = new Resources(sources, this.camera);
    this.raycaster = new Raycaster();
    this.renderder = new Renderer();
    this.world = new World(canvas);

    this.sizes.on("resize", () => {
      this.resize();
    });

    this.time.on("tick", () => {
      this.update();
    });

    this.mouse.on("mousemove", () => {
      this.raycaster.update();
      this.world.intersect();
    });
    
    this.mouse.on("click", () => {
      this.world.click();
    });
  }

  resize() {
    this.camera.resize();
    this.renderder.resize();
    this.world.placeObject();
    this.world.resize();
  }

  update() {
    this.camera.update();
    this.renderder.update();
    this.world.update();
  }
}
