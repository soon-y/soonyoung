import Application from "../Application"
import Logo from './Logo'
import Particle from './Particle'
import TypoContact from './TypoContact'
import TypoProject from './TypoProject'

export default class World {
    constructor() {
        this.application = new Application()
        this.scene = this.application.scene
        this.resources = this.application.resources
        this.raycaster = this.application.raycaster
        this.mouse = this.application.mouse.cursor
        this.currentIntersect = null

        // Wait for resources
        this.resources.on('ready', () => {
            // Setup
            this.logo = new Logo()
            this.particle = new Particle()
            this.project = new TypoProject()
            this.contact = new TypoContact()
        })
    }

    update() {
        if (this.logo) this.logo.update()
        if (this.particle) this.particle.update()
        if (this.project) this.project.update()
        if (this.contact) this.contact.update()

    }

    intersect() {
        if (this.logo && this.project) {
            let objects = [this.project.project.mesh, this.project.threejs.mesh, this.project.java.mesh, this.project.design.mesh, this.logo.instance]
            let intersects = this.raycaster.instance.intersectObjects(objects)

            if (intersects.length) {
                this.currentIntersect = intersects[0]
                document.body.style.cursor = "pointer"
                if (this.currentIntersect.object.parent.parent == this.logo.instance) {
                    this.logo.transfrom()
                }
            } else {
                this.currentIntersect = null
                document.body.style.cursor = "default"
            }
        }
    }

    mousedown(){
        if (this.logo && this.project) {
            let objects = [this.project.project.mesh, this.project.threejs.mesh, this.project.java.mesh, this.project.design.mesh, this.logo.instance]
            let intersects = this.raycaster.instance.intersectObjects(objects)

            if (intersects.length) {
                this.currentIntersect = intersects[0]
                this.click()                
            }
        }
    }

    click() {
        if (this.currentIntersect) {
            if (this.currentIntersect.object == this.project.project.mesh) {
                document.querySelector(".threejs").style.display = "block"
                document.querySelector(".java").style.display = "block"
                document.querySelector(".design").style.display = "block"
            }
            else if (this.currentIntersect.object == this.project.threejs.mesh) {
                document.querySelector(".threejs").style.display = "block"
                document.querySelector(".java").style.display = "none"
                document.querySelector(".design").style.display = "none"
            }
            else if (this.currentIntersect.object == this.project.java.mesh) {
                document.querySelector(".threejs").style.display = "none"
                document.querySelector(".java").style.display = "block"
                document.querySelector(".design").style.display = "none"
            }
            else if (this.currentIntersect.object == this.project.design.mesh) {
                document.querySelector(".threejs").style.display = "none"
                document.querySelector(".java").style.display = "none"
                document.querySelector(".design").style.display = "block"
            }
            else if (this.currentIntersect.object.parent.parent == this.logo.instance) {
                this.logo.transfrom()
            }
        }
    }
}
