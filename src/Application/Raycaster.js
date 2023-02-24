import Application from "./Application";
import * as THREE from 'three'

export default class Raycaster {
    constructor() {
        this.application = new Application()
        this.mouse = this.application.mouse
        this.camera = this.application.camera

        this.setInstance()
    }

    setInstance() {
        this.instance = new THREE.Raycaster()
    }

    update() {
        this.instance.setFromCamera(this.mouse.cursor, this.camera.instance)
    }
}