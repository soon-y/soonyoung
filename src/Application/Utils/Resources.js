import * as THREE from "three";
import { TTFLoader } from "three/examples/jsm/loaders/TTFLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import EventEmitter from "./EventEmitter";

const loading = document.querySelector(".overlay");

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();

    //Options
    this.sources = sources;

    //Setup
    this.loadingManager = new THREE.LoadingManager(
      //Loaded
      () => {
        window.setTimeout(() => {
          loading.style.opacity = "0";
        }, 1000);
        window.setTimeout(() => {
          loading.style.display = "none";
        }, 3000);
      }
    );
    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.textureLoader = new THREE.TextureLoader(this.loadingManager);
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader(
      this.loadingManager
    );
    this.loaders.ttfLoader = new TTFLoader(this.loadingManager);
    this.loaders.gltfLoader = new GLTFLoader(this.loadingManager);
    this.dracoLoader = new DRACOLoader(this.loadingManager);
    this.dracoLoader.setDecoderPath("/draco/");
    this.loaders.gltfLoader.setDRACOLoader(this.dracoLoader);
    this.loaders.objLoader = new OBJLoader(this.loadingManager);
  }

  startLoading() {
    for (const source of this.sources) {
      if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "ttf") {
        this.loaders.ttfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "objModel") {
        this.loaders.objLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "cubeTexture") {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;
    this.loaded++;
    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }
}
