import Application from "./Application";
import * as THREE from 'three'
import { param } from "./param"

export default class Camera {
    constructor() {
        this.application = new Application()
        this.size = this.application.sizes
        this.time = this.application.time
        this.scene = this.application.scene
        this.canvas = this.application.canvas
        this.mouse = this.application.mouse
        this.group = new THREE.Group()

        this.setInstance()
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            60,
            this.size.width / this.size.height,
            0.1,
            5000
        )
        this.instance.position.z = param.diameter * 10
        this.group.add(this.instance)
        this.scene.add(this.group)
    }

    resize() {
        this.instance.aspect = this.size.width / this.size.height
        this.instance.updateProjectionMatrix()
    }

    update() {
        this.parallaxX = this.mouse.cursor.x * 10
        this.parallaxY = this.mouse.cursor.y * 10
        this.group.position.x += (this.parallaxX - this.group.position.x) * 0.1
        this.group.position.y += (this.parallaxY - this.group.position.y) * 0.1
        this.rotationX = this.mouse.cursor.x * 0.1
        this.rotationY = this.mouse.cursor.y * 0.1
        this.group.rotation.y = this.rotationX
    }

    scroll() {
        this.instance.position.y = - this.mouse.scrollY / this.size.height * param.objectsDistance
    } ß
}