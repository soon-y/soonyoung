import * as THREE from 'three'
import Application from "../Application"
import { typo } from './mesh/typo.js'
import { param } from '../param.js'

export default class TypoContact {
    constructor() {
        this.application = new Application()
        this.scene = this.application.scene
        this.camera = this.application.camera
        this.time = this.application.time
        this.contact = typo('contact me')
        this.contact.mesh.geometry.translate(0, -this.contact.mesh.geometry.boundingBox.max.y * 0.5, 0)
        this.instance = new THREE.Group()
        this.instance.add(this.contact.mesh)
        this.instance.position.y = - param.objectsDistance * 2
        this.scene.add(this.instance)

        this.setPosition()
    }

    setPosition() {
        this.speed = new THREE.Vector3((Math.random() * 2 - 1), (Math.random() * 2 - 1), 0);
        this.rotation = (Math.random() * 2 - 1) * this.time.delta * 0.05
        this.contact.mesh.position.set(0, 0, 0)
        this.contact.mesh.rotation.set(Math.random(), Math.random(), Math.random())
    }

    update() {
        if (this.camera.instance.position.y < -param.objectsDistance * 2 + param.objectsDistance / 2) {
            this.posInCam = this.contact.mesh.position.clone()
            this.posInCam.applyMatrix4(this.camera.instance.matrixWorldInverse)
            const zc = Math.abs(this.posInCam.z)
            const xc = this.posInCam.x
            const yc = this.posInCam.y

            // size of frustum
            const hc = 2 * zc * Math.tan(Math.PI / 180 * this.camera.instance.fov / 2);
            const wc = this.camera.instance.aspect * hc;

            if (xc >= wc / 2 - this.contact.width / 2) {
                this.speed.x = -Math.abs(this.speed.x)
            }
            if (xc <= -wc / 2 + this.contact.width / 2) {
                this.speed.x = Math.abs(this.speed.x)
            }
            if (yc >= hc * 2 + hc / 2 - this.contact.width / 2) {
                this.speed.y = -Math.abs(this.speed.y)
            }
            if (yc <= hc * 2 - hc / 2 + this.contact.width / 2) {
                this.speed.y = Math.abs(this.speed.y)
            }

            this.contact.mesh.position.add(this.speed.clone().multiplyScalar(this.time.delta))
            this.contact.mesh.rotation.x += this.rotation
            this.contact.mesh.rotation.y += this.rotation
            this.contact.mesh.rotation.z += this.rotation
        }
    }
}