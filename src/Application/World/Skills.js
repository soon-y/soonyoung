import * as THREE from 'three'
import Application from "../Application.js"
import { typo } from './mesh/typo.js'
import { param } from '../param.js'

export default class Skills {
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
        this.instance.add(this.threejs.mesh, this.design.mesh, this.java.mesh)
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
            let z = (Math.random() * 2 - 1) * Math.min.apply(Math, this.frustumArea)



            if (i > 0) {
                while (this.overlap(x, z)) {
                    x = (Math.random() * 2 - 1) * Math.min.apply(Math, this.frustumArea)
                    z = (Math.random() * 2 - 1) * Math.min.apply(Math, this.frustumArea)
                }
            }
            this.instance.children[i].position.set(x, 0, z)
            //this.instance.children[i].rotation.set(Math.random(), Math.random(), Math.random())
        }

        this.threejs.mesh.rotation.x = -Math.PI/2
        this.design.mesh.rotation.x = -Math.PI/2
        this.java.mesh.rotation.x = -Math.PI/2

    }

    overlap(x, z) {
        let radius = Math.max.apply(Math, this.width) / 2
        for (let i = 0; i < this.speed.length - 1; i++) {
            if (x + radius > this.instance.children[i].position.x - radius &&
                x - radius < this.instance.children[i].position.x + radius &&
                z + radius > this.instance.children[i].position.z - radius &&
                z - radius < this.instance.children[i].position.z + radius) {
                return true
            }
        }
        return false
    }

    update(bool,isFocus) {
        if (bool && isFocus) {
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
                if (yc >= hc + hc / 2 - param.outerRadius) this.speed[i].z = -Math.abs(this.speed[i].z)
                if (yc <= hc - hc / 2 + param.outerRadius) this.speed[i].z = Math.abs(this.speed[i].z)

                this.instance.children[i].position.add(this.speed[i].clone().multiplyScalar(this.time.delta))
                // this.instance.children[i].rotation.x += this.rotation[i]
                // this.instance.children[i].rotation.y += this.rotation[i]
                //
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
                        centerDist.z = this.instance.children[i].position.z - this.instance.children[j].position.z
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