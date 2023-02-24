import * as THREE from 'three'
import Application from "../Application"
import { typo } from './mesh/typo.js'
import { param } from '../param.js'

export default class TypoProject {
    constructor() {
        this.application = new Application()
        this.scene = this.application.scene
        this.time = this.application.time
        this.camera = this.application.camera

        this.project = typo('projects')
        this.threejs = typo('Three.js')
        this.java = typo('Java')
        this.design = typo('design')
        this.instance = new THREE.Group()
        this.instance.add(this.project.mesh, this.threejs.mesh, this.java.mesh, this.design.mesh)
        this.width = [this.project.width, this.threejs.width, this.java.width, this.design.width]

        this.instance.position.y = - param.objectsDistance
        this.scene.add(this.instance)

        // size of frustum
        this.hc = 2 * this.camera.instance.position.z * Math.tan(Math.PI / 180 * this.camera.instance.fov / 2)
        this.wc = this.camera.instance.aspect * this.hc
        this.frustumArea = [this.wc - Math.max.apply(Math, this.width) - param.outerRadius * 2, this.hc - Math.max.apply(Math, this.width) - param.outerRadius * 2]

        this.setPosition()
    }

    setPosition() {
        this.speed = []
        this.rotation = []

        for (let i = 0; i < this.instance.children.length; i++) {
            this.instance.children[i].geometry.translate(0, -this.instance.children[i].geometry.boundingBox.max.y * 0.5, 0)
            let speed = new THREE.Vector3((Math.random() * 2 - 1), (Math.random() * 2 - 1), 0)
            let rotation = (Math.random() * 2 - 1) * this.time.delta * 0.05
            this.speed.push(speed);
            this.rotation.push(rotation)

            // position
            let x = (Math.random() * 2 - 1) * Math.min.apply(Math, this.frustumArea)
            let y = (Math.random() * 2 - 1) * Math.min.apply(Math, this.frustumArea)

            if (i > 0) {
                while (this.overlap(x, y)) {
                    x = (Math.random() * 2 - 1) * Math.min.apply(Math, this.frustumArea)
                    y = (Math.random() * 2 - 1) * Math.min.apply(Math, this.frustumArea)
                }
            }
            this.instance.children[i].position.set(x, y, 0)
            this.instance.children[i].rotation.set(Math.random(), Math.random(), Math.random())
        }
    }

    overlap(x, y) {
        let radius = Math.max.apply(Math, this.width) / 2
        for (let i = 0; i < this.speed.length - 1; i++) {
            if (x + radius > this.instance.children[i].position.x - radius &&
                x - radius < this.instance.children[i].position.x + radius &&
                y + radius > this.instance.children[i].position.y - radius &&
                y - radius < this.instance.children[i].position.y + radius) {
                return true
            }
        }
        return false
    }

    update() {
        if (this.camera.instance.position.y > -param.objectsDistance * 2 + param.objectsDistance / 2 && this.camera.instance.position.y < -param.objectsDistance / 2) {
            for (let i = 0; i < this.instance.children.length; i++) {
                this.posInCam = this.instance.children[i].position.clone()
                this.posInCam.applyMatrix4(this.camera.instance.matrixWorldInverse)
                const zc = Math.abs(this.posInCam.z)
                const xc = this.posInCam.x
                const yc = this.posInCam.y

                // size of frustum at this zc-value
                const hc = 2 * zc * Math.tan(Math.PI / 180 * this.camera.instance.fov / 2);
                const wc = this.camera.instance.aspect * hc;

                if (xc >= wc / 2 - param.diameter) this.speed[i].x = -Math.abs(this.speed[i].x)
                if (xc <= -wc / 2 + param.diameter) this.speed[i].x = Math.abs(this.speed[i].x)
                if (yc >= hc + hc / 2 - param.outerRadius) this.speed[i].y = -Math.abs(this.speed[i].y)
                if (yc <= hc - hc / 2 + param.outerRadius) this.speed[i].y = Math.abs(this.speed[i].y)

                this.instance.children[i].position.add(this.speed[i].clone().multiplyScalar(this.time.delta))
                this.instance.children[i].rotation.x += this.rotation[i]
                this.instance.children[i].rotation.y += this.rotation[i]
                this.instance.children[i].rotation.z += this.rotation[i]
            }

            for (let i = 0; i < this.instance.children.length - 1; i++) {
                for (let j = i + 1; j < this.instance.children.length; j++) {
                    let box1 = new THREE.Box3()
                    let box2 = new THREE.Box3()
                    box1.copy(this.instance.children[i].geometry.boundingBox).applyMatrix4(this.instance.children[i].matrixWorld)
                    box2.copy(this.instance.children[j].geometry.boundingBox).applyMatrix4(this.instance.children[j].matrixWorld)
                    if (box1.intersectsBox(box2)) {
                        let centerDist = new THREE.Vector3(0, 0, 0)
                        centerDist.x = this.instance.children[i].position.x - this.instance.children[j].position.x
                        centerDist.y = this.instance.children[i].position.y - this.instance.children[j].position.y
                        let speedDiff = this.speed[i].clone().sub(this.speed[j].clone())
                        let scalar = centerDist.dot(speedDiff) / centerDist.lengthSq()
                        let comp = centerDist.multiplyScalar(scalar);
                        this.speed[i].sub(comp)
                        this.speed[j].add(comp)
                    }
                }
            }
        }
    }

}