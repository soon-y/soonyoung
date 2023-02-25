import Application from "./Application";
import * as THREE from 'three'
import { param } from "./param"
import gsap from 'gsap'

const permission = document.getElementById('permission')

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

        if (this.isTouchDevice) {
            if (typeof DeviceMotionEvent.requestPermission === 'function') {
                permission.style.display = 'block'
                permission.addEventListener("click", () => {
                    permission.style.display = 'none'
                    this.requestOrientationPermission()
                })
            } else {
                window.addEventListener('deviceorientation', event => {
                    this.parallax(event)
                }, true)
            }
        }
    }

    requestOrientationPermission() {
        DeviceOrientationEvent.requestPermission()
            .then(response => {
                if (response == 'granted') {
                    window.addEventListener('deviceorientation', (event) => {
                        this.parallax(event)
                    })
                }
            })
            .catch(console.error)
    }

    parallax(event) {
        let yTilt = Math.round(event.beta) * 0.1
        let xTilt = Math.round(event.gamma) * 0.3

        gsap.to(
            this.group.position,
            {
                y: -yTilt,
                duration: 0.6, ease: 'power2.inout'
            })

        gsap.to(
            this.group.position,
            {
                x: xTilt,
                duration: 0.6, ease: 'power2.inout'
            })
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

        this.group.add(this.instance)
        this.scene.add(this.group)
    }

    resize() {
        this.instance.aspect = this.size.width / this.size.height
        this.instance.updateProjectionMatrix()
    }

    update() {
        if (!this.isTouchDevice()) {
            this.parallaxX = this.mouse.cursor.x * 10
            this.parallaxY = this.mouse.cursor.y * 10
            this.group.position.x += (this.parallaxX - this.group.position.x) * 0.1
            this.group.position.y += (this.parallaxY - this.group.position.y) * 0.1
            this.rotationX = this.mouse.cursor.x * 0.1
            this.rotationY = this.mouse.cursor.y * 0.1
            this.group.rotation.y = this.rotationX
        }
    }

    scroll() {
        this.instance.position.y = - this.mouse.scrollY / this.size.height * param.objectsDistance
    }

    isTouchDevice() {
        return ('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0);
    }
}
