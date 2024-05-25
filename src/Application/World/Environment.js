import * as THREE from "three";
import Application from "../Application";

export default class Environment {
  constructor(debug) {
    this.application = new Application();
    this.scene = this.application.scene;
    this.resources = this.application.resources;
    this.setLight();
    this.setEnvironmentMap();
  }

  setLight() {
    this.lightA = new THREE.AmbientLight(0x737373);
    this.light = new THREE.DirectionalLight("#A4A4A4");
    this.light.castShadow = true;
    this.light.shadow.intensity = 0;
    this.light.position.set(0, 0, 10);
    this.helper = new THREE.DirectionalLightHelper(this.light, 5);
    this.helper.visible = false;
    this.scene.add(this.light, this.lightA, this.helper);
  }

  setEnvironmentMap() {
    this.environmentMap = {};
    this.environmentMap.intensity = 10;
    this.environmentMap.texture = this.resources.items.environmentMapTexture;
    this.environmentMap.texture.encoding = THREE.sRGBEncoding;

    this.scene.environment = this.environmentMap.texture;

    this.environmentMap.updateMaterials = () => {
      this.scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = this.environmentMap.texture;
          child.material.envMapIntensity = this.environmentMap.intensity;
          child.material.needsUpdate = true;
        }
      });
    };
    this.environmentMap.updateMaterials();
  }
}
