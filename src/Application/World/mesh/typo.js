import * as THREE from 'three'
import Application from "../../Application"
import { Font } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { param } from '../../param.js'

function typo(typo) {

    const application = new Application()
    const resources = application.resources

    // setGeometry
    let font = new Font(resources.items.poppins)
    const geometry = new TextGeometry(
        typo,
        {
            font: font,
            size: param.innerRadius * 2,
            height: param.height,
            bevelEnabled: false
        }
    )
    geometry.computeBoundingBox()
    geometry.translate(- geometry.boundingBox.max.x * 0.5, 0, 0)
    let width = geometry.boundingBox.max.x - geometry.boundingBox.min.x

    // setMaterial
    const material = new THREE.MeshNormalMaterial()

    // setMesh
    const mesh = new THREE.Mesh(geometry, material)
    return { mesh, width }
}

export { typo }