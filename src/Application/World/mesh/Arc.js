import * as THREE from 'three'
import { param } from '../../param.js'

export default class Arc {
    constructor() {
        this.setShape()
        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setShape() {
        this.outerCircle = new THREE.Shape()
        this.outerCircle.moveTo(param.outerRadius, 0)
        this.innerCircle = new THREE.Shape(); // serves as hole in outerCircle
        this.innerCircle.moveTo(param.innerRadius, 0);

        this.deltaPhi = Math.PI * 2 / param.N
        for (let k = 1; k <= param.N; ++k) {
            this.outerCircle.lineTo(param.outerRadius * Math.cos(k * this.deltaPhi),
                param.outerRadius * Math.sin(k * this.deltaPhi));
            this.innerCircle.lineTo(param.innerRadius * Math.cos(k * this.deltaPhi),
                param.innerRadius * Math.sin(k * this.deltaPhi));
        }
        this.outerCircle.holes.push(this.innerCircle);
    }

    setGeometry() {
        this.extrudeSetting = {
            bevelEnabled: false,
            depth: param.height
        }
        this.geometry = new THREE.ExtrudeGeometry(this.outerCircle, this.extrudeSetting)
    }s

    setMaterial() {
        this.material = new THREE.MeshNormalMaterial()
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.receiveShadow = true
    }
}