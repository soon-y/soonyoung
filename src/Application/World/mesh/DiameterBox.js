import * as THREE from 'three'
import { param } from '../../param.js'

export default class DiameterBox {
    constructor() {
        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry() {
        this.geometry = new THREE.BoxGeometry(param.outerRadius * 2, param.thickness, param.height)
        this.geometry.computeBoundingBox()
        this.geometry.translate(this.geometry.boundingBox.max.x, -this.geometry.boundingBox.max.y, this.geometry.boundingBox.max.z)
    }
    setMaterial() { this.material = new THREE.MeshNormalMaterial() }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.receiveShadow = true
    }
}