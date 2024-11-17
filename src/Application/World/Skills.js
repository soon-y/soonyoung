import * as THREE from 'three'
import Application from "../Application.js"
import { typo } from './mesh/typo.js'
import { param } from '../param.js'
import { DragControls } from 'three/examples/jsm/controls/DragControls.js'

export default class Skills {
    constructor() {
        this.application = new Application()
        this.scene = this.application.scene
        this.time = this.application.time
        this.camera = this.application.camera
        this.resources = this.application.resources
        this.raycaster = this.application.raycaster
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
        this.objects = []
        this.objects.push(this.js.mesh,this.ts.mesh,this.vue.scene,this.three.scene,this.react.scene,this.blender.scene,this.css.scene,this.html.scene)
        this.dragControl = new DragControls( 
            [... this.objects], 
            this.camera.instance, 
            this.application.canvas 
        );
        this.js.mesh.rotation.x = -Math.PI/2
        this.ts.mesh.rotation.x = -Math.PI/2
        this.react.scene.rotation.y = Math.PI/3
        this.three.scene.rotation.y = -Math.PI/10

        this.vue.scene.scale.multiplyScalar(param.outerRadius);
        this.react.scene.scale.multiplyScalar(param.outerRadius);
        this.three.scene.scale.multiplyScalar(param.outerRadius);
        this.blender.scene.scale.multiplyScalar(param.outerRadius);
        this.css.scene.scale.multiplyScalar(param.outerRadius);
        this.html.scene.scale.multiplyScalar(param.outerRadius);

        this.distance = param.objectsDistance - (this.camera.instance.aspect * 50)

        // size of frustum
        this.hc = 2 * this.distance * Math.tan(Math.PI / 180 * this.camera.instance.fov / 2)
        this.wc = this.camera.instance.aspect * this.hc
        this.frustumArea = [
            this.wc * 0.5, 
            this.hc * 0.5
        ]

        this.setPosition()
        this.creatBB()
    }

    setPosition() {
        this.speed = []
        this.rotation = []

        for (let i = 0; i < this.instance.children.length; i++) {
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
        this.js.mesh.geometry.translate(0, -this.js.mesh.geometry.boundingBox.max.y * 0.5, 0)
        this.ts.mesh.geometry.translate(0, -this.ts.mesh.geometry.boundingBox.max.y * 0.5, 0)
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

    creatBB() {
        this.boundingBox = []

        this.jsBB = new THREE.Box3()
        this.js.mesh.geometry.computeBoundingBox()

        this.tsBB = new THREE.Box3()
        this.ts.mesh.geometry.computeBoundingBox()

        this.vueBB = new THREE.Box3()
        this.vue.scene.children[0].children[0].geometry.computeBoundingBox()

        this.htmlBB1 = new THREE.Box3()
        this.htmlBB = new THREE.Box3()
        this.html.scene.children[0].children[2].geometry.computeBoundingBox()
        this.html.scene.children[0].children[1].geometry.computeBoundingBox()
        this.htmlBB.union(this.htmlBB1)

        this.cssBB1 = new THREE.Box3()
        this.cssBB = new THREE.Box3()
        this.css.scene.children[0].children[0].geometry.computeBoundingBox()
        this.css.scene.children[0].children[2].geometry.computeBoundingBox()
        this.cssBB.union(this.cssBB1)

        this.reactBB = new THREE.Box3()
        this.react.scene.children[0].geometry.computeBoundingBox()

        this.blenderBB = new THREE.Box3()
        this.blender.scene.children[0].children[0].geometry.computeBoundingBox() 

        this.threeBB = new THREE.Box3()
        this.three.scene.children[0].geometry.computeBoundingBox()
        
        this.boundingBox.push(this.jsBB, this.tsBB, this.vueBB, this.threeBB, this.reactBB,this.blenderBB, this.cssBB, this.htmlBB)
    }

    updateBB() {
        this.jsBB.copy( this.js.mesh.geometry.boundingBox ).applyMatrix4( this.js.mesh.matrixWorld );
        this.tsBB.copy( this.ts.mesh.geometry.boundingBox ).applyMatrix4( this.ts.mesh.matrixWorld );
        this.vueBB.copy( this.vue.scene.children[0].children[0].geometry.boundingBox ).applyMatrix4( this.vue.scene.children[0].children[0].matrixWorld );
        this.htmlBB1.copy( this.html.scene.children[0].children[2].geometry.boundingBox ).applyMatrix4( this.html.scene.children[0].children[2].matrixWorld );
        this.htmlBB.copy( this.html.scene.children[0].children[1].geometry.boundingBox ).applyMatrix4( this.html.scene.children[0].children[1].matrixWorld );
        this.cssBB1.copy( this.css.scene.children[0].children[0].geometry.boundingBox ).applyMatrix4( this.css.scene.children[0].children[0].matrixWorld );
        this.cssBB.copy( this.css.scene.children[0].children[2].geometry.boundingBox ).applyMatrix4( this.css.scene.children[0].children[2].matrixWorld );
        this.reactBB.copy( this.react.scene.children[0].geometry.boundingBox ).applyMatrix4( this.react.scene.children[0].matrixWorld );
        this.blenderBB.copy( this.blender.scene.children[0].children[0].geometry.boundingBox ).applyMatrix4( this.blender.scene.children[0].children[0].matrixWorld );
        this.threeBB.copy( this.three.scene.children[0].geometry.boundingBox ).applyMatrix4( this.three.scene.children[0].matrixWorld );
    }

    addBBhelper(){
        const jsBBHelper = new THREE.BoxHelper( this.js.mesh, 0xffff00 );
        const tsBBHelper = new THREE.BoxHelper( this.ts.mesh, 0xffff00 );
        const vueBBHelper = new THREE.BoxHelper( this.vue.scene.children[0].children[0], 0xffff00 );
        const html1Helper = new THREE.BoxHelper( this.html.scene.children[0].children[1], 0xffff00 );
        const html2Helper = new THREE.BoxHelper( this.html.scene.children[0].children[2], 0xffff00 );
        const css1Helper = new THREE.BoxHelper( this.css.scene.children[0].children[2], 0xffff00 );
        const css2Helper = new THREE.BoxHelper( this.css.scene.children[0].children[0], 0xffff00 );
        const reactHelper = new THREE.BoxHelper( this.react.scene.children[0], 0xffff00 );
        const blenderHelper = new THREE.BoxHelper( this.blender.scene.children[0].children[0], 0xffff00 );
        const threeHelper = new THREE.BoxHelper( this.three.scene.children[0], 0xffff00 );
        this.scene.add(jsBBHelper, tsBBHelper, reactHelper, threeHelper,  blenderHelper ,        
            vueBBHelper, html1Helper, html2Helper, css1Helper,css2Helper);
    }

    colliding() {
        for (let i = 0; i < this.boundingBox.length - 1; i++) {
            for (let j = i + 1; j < this.boundingBox.length; j++) {
                if(this.boundingBox[i].intersectsBox(this.boundingBox[j])){
                    console.log("collision")
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

            // ***** update BB position ********
            this.updateBB()
            //this.addBBhelper()

            this.colliding()
        }
    }
    
    click(bool) {
        if (bool) {

        const draggableObjects = this.dragControl.objects();
        draggableObjects.length = 0;

        const intersections = this.raycaster.instance.intersectObjects( this.objects, true );

		if ( intersections.length > 1 ) {               
            
            draggableObjects.push(intersections)
            this.dragControl.transformGroup = true;
            } 
        }

        this.dragControl.transformGroup = false;
    }

    resize() {
        this.distance = param.objectsDistance - (this.camera.instance.aspect * 50)
        console.log(this.camera.instance.aspect)
        this.instance.children.forEach(el => {
            el.position.y = -this.distance
        });
    }
}