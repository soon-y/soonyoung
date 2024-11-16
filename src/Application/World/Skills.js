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
        this.resources = this.application.resources
        this.centerDist = new THREE.Vector3(0, 0, 0)
        this.js = typo("JS", "Neutra")
        this.ts = typo("TS", "Neutra")
        this.vue = this.resources.items.vue
        this.react = this.resources.items.react
        this.three = this.resources.items.three
        this.blender = this.resources.items.blender
        this.css = this.resources.items.css
        this.html = this.resources.items.html
        this.instance = new THREE.Group()
        this.instance.add(this.js.mesh,this.ts.mesh,this.vue.scene,this.three.scene,this.react.scene,this.blender.scene,this.css.scene,this.html.scene)
        this.scene.add(this.instance)

        this.js.mesh.rotation.x = -Math.PI/2
        this.ts.mesh.rotation.x = -Math.PI/2
        this.react.scene.rotation.y = Math.PI/3

        this.vue.scene.scale.multiplyScalar(param.outerRadius);
        this.react.scene.scale.multiplyScalar(param.outerRadius);
        this.three.scene.scale.multiplyScalar(param.outerRadius);
        this.blender.scene.scale.multiplyScalar(param.outerRadius);
        this.css.scene.scale.multiplyScalar(param.outerRadius);
        this.html.scene.scale.multiplyScalar(param.outerRadius);

        this.distance = param.objectsDistance - (this.camera.instance.aspect * 50)

        console.log(param.objectsDistance - (this.camera.instance.aspect * 50))
        console.log(param.objectsDistance - (this.camera.instance.aspect * 10))

        // size of frustum
        this.hc = 2 * this.distance * Math.tan(Math.PI / 180 * this.camera.instance.fov / 2)
        this.wc = this.camera.instance.aspect * this.hc
        this.frustumArea = [
            this.wc * 0.5, 
            this.hc * 0.5
        ]

        this.setPosition()
        console.log(this.wc)
        console.log(this.hc)
        console.log(this.frustumArea)
    }

    setPosition() {
        this.speed = []
        this.rotation = []

        for (let i = 0; i < this.instance.children.length; i++) {
            //this.instance.children[i].geometry.translate(0, -this.instance.children[i].geometry.boundingBox.max.y * 0.5, 0)
            let speed = new THREE.Vector3((Math.random() * 2 - 1), 0, (Math.random() * 2 - 1))
            let rotation = (Math.random() * 2 - 1) * this.time.delta * 0.05
            this.speed.push(speed);
            this.rotation.push(rotation)

            // position
            let x = (Math.random() * 2 - 1) * this.frustumArea[0]
            let z = (Math.random() * 2 - 1) * this.frustumArea[1]

            if (i > 0) {
                while (this.overlap(x, z)) {
                    x = (Math.random() * 2 - 1) * Math.min.apply(Math, this.frustumArea) 
                    z = (Math.random() * 2 - 1) * Math.min.apply(Math, this.frustumArea)
                }
            }
            this.instance.children[i].position.set(x, -this.distance, z)
        }
    }

    overlap(x, z) {
        let radius = 10
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
            // calculate position in camera space
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
                if (yc >= hc / 2 - param.diameter) this.speed[i].z = Math.abs(this.speed[i].z)
                if (yc <= -hc / 2 + param.diameter) this.speed[i].z = -Math.abs(this.speed[i].z)
             
                this.instance.children[i].position.add(this.speed[i].clone().multiplyScalar(this.time.delta))
                this.instance.children[i].rotation.x += this.rotation[i]
                this.instance.children[i].rotation.y += this.rotation[i]
                this.instance.children[i].rotation.z += this.rotation[i]
            }

            // collision
            // for (let i = 0; i < this.instance.children.length - 1; i++) {
            //     for (let j = i + 1; j < this.instance.children.length; j++) {
            //         let box1 = new THREE.Box3()
            //         let box2 = new THREE.Box3()
            //         box1.copy(this.instance.children[i].geometry.boundingBox).applyMatrix4(this.instance.children[i].matrixWorld)
            //         box2.copy(this.instance.children[j].geometry.boundingBox).applyMatrix4(this.instance.children[j].matrixWorld)
            //         if (box1.intersectsBox(box2)) {
            //             console.log("collision")
            //             let centerDist = new THREE.Vector3(0, 0, 0)
            //             centerDist.x = this.instance.children[i].position.x - this.instance.children[j].position.x
            //             centerDist.z = this.instance.children[i].position.z - this.instance.children[j].position.z
            //             let speedDiff = this.speed[i].clone().sub(this.speed[j].clone())
            //             let scalar = centerDist.dot(speedDiff) / centerDist.lengthSq()
            //             let comp = centerDist.multiplyScalar(scalar);
            //             this.speed[i].sub(comp)
            //             this.speed[j].add(comp)
            //         }
            //     }
            // }
        }
    }

    resize() {
        this.distance = param.objectsDistance - (this.camera.instance.aspect * 50)
        console.log(this.camera.instance.aspect)
        this.instance.children.forEach(el => {
            el.position.y = -this.distance
            console.log(el.position)
        });
    }

}