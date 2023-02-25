import Application from "./Application";
import * as THREE from 'three'
import { param } from "./param"
import gsap from 'gsap'

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
        if (!isTouchDevice()) {
            this.parallaxX = this.mouse.cursor.x * 10
            this.parallaxY = this.mouse.cursor.y * 10
            group.position.x += (this.parallaxX - group.position.x) * 0.1
            group.position.y += (this.parallaxY - group.position.y) * 0.1
            this.rotationX = this.mouse.cursor.x * 0.1
            this.rotationY = this.mouse.cursor.y * 0.1
            group.rotation.y = this.rotationX
        }
    }

    scroll() {
        this.instance.position.y = - this.mouse.scrollY / this.size.height * param.objectsDistance
    }
}

window.addEventListener('devicemotion', event => {
    if (isTouchDevice()) {
        let yTilt = Math.round(event.rotationRate.beta) * 0.3
        let xTilt = Math.round(event.rotationRate.gamma) * 0.3

        gsap.to(
            group.position,
            {
                y: -yTilt,
                duration: 0.6, ease: 'power2.inout'
            })

        gsap.to(
            group.position,
            {
                x: xTilt,
                duration: 0.6, ease: 'power2.inout'
            })
    }
}, true)

window.addEventListener('deviceorientation', event => {
    if (isTouchDevice()) {
        let yTilt = Math.round(event.beta) * 0.3
        let xTilt = Math.round(event.gamma) * 0.3

        gsap.to(
            group.position,
            {
                y: -yTilt,
                duration: 0.6, ease: 'power2.inout'
            })

        gsap.to(
            group.position,
            {
                x: xTilt,
                duration: 0.6, ease: 'power2.inout'
            })
    }
}, true)


function isTouchDevice() {
    return ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);
}
