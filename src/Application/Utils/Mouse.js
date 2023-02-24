import Application from "../Application";
import EventEmitter from "./EventEmitter"
import * as THREE from 'three'

export default class Mouse extends EventEmitter {
    constructor() {
        super()

        this.application = new Application()
        this.size = this.application.sizes
        this.cursor = new THREE.Vector2()
        this.scrollY = window.scrollY

        window.addEventListener('mousemove', (event) => {
            this.cursor.x = event.clientX / this.size.width * 2 - 1
            this.cursor.y = - (event.clientY / this.size.height) * 2 + 1

            this.trigger('mousemove')
        })

        window.addEventListener('scroll', () => {
            this.scrollY = window.scrollY
            this.trigger('scroll')
        })

        window.addEventListener('click', () => {
            this.trigger('click')
        })
    }
}