import Application from "./Application";
import * as THREE from 'three'
import { param } from "./param"

let group = new THREE.Group()

export default class Camera {
    constructor() {
        this.application = new Application()
        this.size = this.application.sizes
        this.time = this.application.time
        this.scene = this.application.scene
        this.canvas = this.application.canvas
        this.mouse = this.application.mouse

        this.setInstance()
    }

    setInstance() {
        this.aspect = this.size.width / this.size.height
        this.instance = new THREE.PerspectiveCamera(
            60,
            this.aspect,
            0.1,
            5000
        )

        this.val = 1 - this.aspect
        if (this.aspect < 1) {
            this.instance.position.z = param.diameter * 10 + 210 * this.val
        } else {
            this.instance.position.z = param.diameter * 10
        }

        group.add(this.instance)
        this.scene.add(group)
    }

    resize() {
        this.instance.aspect = this.size.width / this.size.height
        this.instance.updateProjectionMatrix()
    }

    update() {
        this.parallaxX = this.mouse.cursor.x * 10
        this.parallaxY = this.mouse.cursor.y * 10
        group.position.x += (this.parallaxX - group.position.x) * 0.1
        group.position.y += (this.parallaxY - group.position.y) * 0.1
        this.rotationX = this.mouse.cursor.x * 0.1
        this.rotationY = this.mouse.cursor.y * 0.1
        group.rotation.y = this.rotationX
    }

    scroll() {
        this.instance.position.y = - this.mouse.scrollY / this.size.height * param.objectsDistance
    }
}

window.addEventListener('deviceorientation', event => {
    event.alpha // rotation along the z axis
    let beta = event.beta // rotation along the x axis
    let gamma = event.gamma // rotation along the y axis


    console.log("beta : " + beta)
    console.log("gamma:" + gamma)

    group.position.x = gamma 
    group.position.y = -beta
}, true);
