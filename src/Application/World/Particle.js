import * as THREE from 'three'
import Application from "../Application"
import { param } from '../param'

export default class Particle {
    constructor() {
        this.application = new Application()
        this.scene = this.application.scene
        this.time = this.application.time
        this.resources = this.application.resources

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry() {
        this.geometry = new THREE.BufferGeometry()
        const count = 5000
        const positions = new Float32Array(count * 3)
        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * param.diameter * 60
        }
        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    }

    setTextures() {
        this.textures = {}
        this.textures.map = this.resources.items.particleTexture
        this.textures.map.encoding = THREE.sRGBEncoding
    }

    setMaterial() {
        this.material = new THREE.PointsMaterial(
            {
                size: param.innerRadius,
                sizeAttenuation: true,
                transparent: true,
                alphaMap: this.textures.map,
                depthWrite: false,
                blending: THREE.AdditiveBlending
            })
    }

    setMesh() {
        this.mesh = new THREE.Points(this.geometry, this.material)
        this.mesh.position.y = - param.objectsDistance
        this.scene.add(this.mesh)
    }

    update() {
        this.mesh.rotation.y += this.time.delta * 0.01
    }
}

