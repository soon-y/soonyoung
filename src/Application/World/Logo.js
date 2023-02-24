import * as THREE from 'three'
import Application from "../Application"
import TypoHello from './TypoHello'
import HalfArc from './mesh/HalfArc'
import Arc from './mesh/Arc'
import DiameterBox from './mesh/DiameterBox'
import RadiusBox from './mesh/RadiusBox'
import SmallBox from './mesh/SmallBox'
import { param } from '../param.js'
import gsap from 'gsap'

let done = 0

const posCenter = - param.outerRadius - param.space / 2
const posG = param.outerRadius * 2 + param.space
const posU = - param.outerRadius * 2 - param.space;
const posO1 = - param.outerRadius * 4 - param.space * 2;
const posY = - param.outerRadius * 6 - param.space * 3;
const posN = - param.outerRadius * 8 - param.space * 4;
const posO2 = - param.outerRadius * 10 - param.space * 5;
const posO3 = - param.outerRadius * 12 - param.space * 6;
const posS = - param.outerRadius * 14 - param.space * 7;

export default class Logo {
    constructor() {
        this.application = new Application()
        this.scene = this.application.scene
        this.typo = new TypoHello()

        this.instance = new THREE.Group()
        this.logoMove = new THREE.Group()
        this.logoKO = new THREE.Group()
        this.logoEN = new THREE.Group()
        this.instance.position.x = posCenter
        this.instance.position.y = param.innerRadius
        this.instance.add(this.logoMove, this.logoKO, this.logoEN)
        this.scene.add(this.instance)

        this.topArc = new HalfArc().mesh
        this.topArcMove = new HalfArc().mesh
        this.bottomArc = new HalfArc().mesh
        this.bottomArc.rotation.z = Math.PI
        this.bottomArc.position.y = - param.diameter
        this.bottomArc.rotation.y = Math.PI
        this.bottomArc.position.z = param.height

        this.topArcClone = this.topArc.clone()
        this.bottomArcClone = this.bottomArc.clone()
        this.logoMove.add(this.topArc, this.bottomArc, this.topArcClone, this.bottomArcClone)

        // logo KO
        // young
        this.O = new Arc().mesh
        this.O.position.x = param.outerRadius * 2 + param.space
        this.OI = new DiameterBox().mesh
        this.OI.rotation.z = - Math.PI / 2
        this.OI.position.x = param.outerRadius
        this.OI.position.y = param.outerRadius * 3 - param.space

        this.OtopArc = new HalfArc().mesh
        this.ObottomArc = new HalfArc().mesh
        this.young = new THREE.Object3D()
        this.ObottomArc.rotation.z = Math.PI

        this.young.add(this.ObottomArc, this.OtopArc, this.OI)
        this.young.position.y = -param.diameter
        this.young.position.x = param.outerRadius * 2 + param.space * 3

        this.eoTop = new SmallBox().mesh
        this.eoBottom = new SmallBox().mesh
        this.eoTop.position.y = param.innerRadius / 2
        this.eoBottom.position.y = - param.innerRadius / 2
        this.eo = new THREE.Object3D
        this.eo.add(this.eoTop, this.eoBottom)
        this.eo.position.x = param.outerRadius * 3 + param.space * 2

        // Soon
        this.I = new DiameterBox().mesh
        this.I.position.y = - param.innerRadius
        this.I.position.x = - param.outerRadius

        this.i = new RadiusBox().mesh
        this.i.rotation.z = - Math.PI / 2
        this.i.position.y = - param.innerRadius

        this.logoKO.add(this.O, this.young, this.eo, this.I, this.i)

        // logo EN
        // n
        this.N1 = new THREE.Object3D()
        this.N1arc = new HalfArc().mesh
        this.N1iLeft = new RadiusBox().mesh
        this.N1iLeft.rotation.z = - Math.PI / 2
        this.N1iRight = this.N1iLeft.clone()
        this.N1iLeft.position.x = -param.diameter / 2
        this.N1iRight.position.x = param.diameter / 2
        this.N1iLeft.scale.x = 0
        this.N1iRight.scale.x = 0
        this.N1.add(this.N1arc, this.N1iLeft, this.N1iRight)

        // U
        this.U = new THREE.Object3D()
        this.Uarc = new HalfArc().mesh
        this.UiLeft = new RadiusBox().mesh
        this.UiLeft.rotation.z = - Math.PI / 2
        this.UiRight = this.UiLeft.clone()
        this.UiLeft.position.x = param.diameter / 2
        this.UiRight.position.x = - param.diameter / 2
        this.UiLeft.scale.x = 0
        this.UiRight.scale.x = 0
        this.U.position.x = posU
        this.U.add(this.Uarc)
        this.Uarc.add(this.UiLeft, this.UiRight)

        // o1
        this.O1 = new THREE.Object3D()
        this.O1arcTop = new HalfArc().mesh
        this.O1arcBottom = new HalfArc().mesh
        this.O1.add(this.O1arcTop, this.O1arcBottom)
        this.O1.position.x = posO1

        // y
        this.Y = new THREE.Object3D()
        this.Yarc = new HalfArc().mesh
        this.YiLeft = new RadiusBox().mesh
        this.YiLeft.rotation.z = - Math.PI / 2
        this.YiRight = this.UiLeft.clone()
        this.YiLeft.position.x = param.diameter / 2
        this.YiRight.position.x = - param.diameter / 2
        this.YiLeft.scale.x = 0
        this.YiRight.scale.x = 0
        this.Yarc.add(this.YiLeft, this.YiRight)

        this.YarcTail = new HalfArc().mesh
        this.YarcTail.rotation.z = Math.PI
        this.YarcTail.position.y = - param.diameter
        this.Ystem = new DiameterBox().mesh
        this.Ystem.rotation.z = Math.PI / 2
        this.Ystem.position.x = param.outerRadius - param.space
        this.Ystem.position.y = - param.outerRadius - param.innerRadius
        this.Ystem.scale.x = 0

        this.Y.add(this.Yarc, this.YarcTail, this.Ystem)
        this.Y.position.x = posY

        // n2
        this.N2 = new THREE.Object3D()
        this.N2arc = new HalfArc().mesh
        this.N2iLeft = new RadiusBox().mesh
        this.N2iLeft.rotation.z = - Math.PI / 2
        this.N2iRight = this.N2iLeft.clone()
        this.N2iLeft.position.x = -param.diameter / 2
        this.N2iRight.position.x = param.diameter / 2
        this.N2iLeft.scale.x = 0
        this.N2iRight.scale.x = 0
        this.N2.add(this.N2arc, this.N2iLeft, this.N2iRight)
        this.N2.position.x = posN

        // o2
        this.O2 = new THREE.Object3D()
        this.O2arcTop = new HalfArc().mesh
        this.O2arcBottom = new HalfArc().mesh
        this.O2.add(this.O2arcTop, this.O2arcBottom)
        this.O2.position.x = posO2

        // o3
        this.O3 = new THREE.Object3D()
        this.O3arcTop = new HalfArc().mesh
        this.O3arcBottom = new HalfArc().mesh
        this.O3.add(this.O3arcTop, this.O3arcBottom)
        this.O3.position.x = posO3

        //this.logoEN.add(this.U, this.O1, this.O2, this.O3, this.N1, this.N2, this.Y)
        this.logoEN.add(this.N1)

    }

    /**
     * methods for transforming from KO to EN
     */

    toEN() {
        gsap.to(
            this.OI.scale,
            {
                x: 1.4, duration: 0.6, ease: 'power2.inout'
            }
        )
        gsap.to(
            this.young.position,
            {
                x: posG, duration: 0.6, ease: 'power2.inout'
            }
        )
        gsap.to(
            this.OtopArc.rotation,
            {
                z: Math.PI, duration: 0.6, ease: 'power2.inout'
            }
        )
        gsap.to(
            this.eo.scale,
            {
                x: 0, duration: 0.6, ease: 'power2.inout'
            }
        )
        gsap.to(
            this.I.scale,
            {
                x: 0, duration: 0.6, ease: 'power2.inout'
            }
        )
        gsap.to(
            this.i.scale,
            {
                x: 0, duration: 0.6, ease: 'power2.inout'
            }
        )
        gsap.to(
            this.N1iLeft.scale,
            {
                x: 1, duration: 0.6, ease: 'power2.inout'
            }
        )
        gsap.to(
            this.N1iRight.scale,
            {
                x: 1, duration: 0.6, ease: 'power2.inout'
            }
        )
    }

    toU() {
        gsap.to(
            this.Uarc.rotation,
            {
                z: Math.PI, duration: 0.4, ease: 'power2.inout'
            }
        )
        gsap.to(
            this.UiLeft.scale,
            {
                x: 1, duration: 1, ease: 'power2.inout'
            }
        )
        gsap.to(
            this.UiRight.scale,
            {
                x: 1, duration: 1, ease: 'power2.inout',
            }
        )
    }

    toO1() {
        gsap.to(
            this.O1arcBottom.rotation,
            {
                z: Math.PI, duration: 0.6, ease: 'power2.out'
            }
        )
    }

    toY() {
        gsap.to(
            this.Yarc.rotation,
            {
                z: Math.PI, duration: 0.4, ease: 'power2.inout'
            }
        )
        gsap.to(
            this.YiLeft.scale,
            {
                x: 1, duration: 1, ease: 'power2.inout'
            }
        )
        gsap.to(
            this.YiRight.scale,
            {
                x: 1, duration: 1, ease: 'power2.inout'
            }
        )
        gsap.to(
            this.Ystem.scale,
            {
                x: 1, duration: 0.8, ease: 'power2.inout'
            }
        )
    }

    toN() {
        gsap.to(
            this.N2iLeft.scale,
            {
                x: 1, duration: 0.6, ease: 'power2.inout'
            }
        )
        gsap.to(
            this.N2iRight.scale,
            {
                x: 1, duration: 0.6, ease: 'power2.inout'
            }
        )
    }

    toO2() {
        gsap.to(
            this.O2arcBottom.rotation,
            {
                z: Math.PI, duration: 0.6, ease: 'power2.inout'
            }
        )
    }

    toO3() {
        gsap.to(
            this.O3arcBottom.rotation,
            {
                z: Math.PI, duration: 0.6, ease: 'power2.inout'
            }
        )
        gsap.to(
            this.topArc.rotation,
            {
                z: Math.PI / 2, duration: 0.8, ease: 'power2.inout', delay: 0.3
            }
        )
        gsap.to(
            this.bottomArc.rotation,
            {
                z: Math.PI / 2, duration: 0.8, ease: 'power2.inout', delay: 0.3
            }
        )
    }

    /**
     * methods for transforming from EN to KO
     */
    toKO() {
        gsap.to(
            this.OI.scale,
            {
                x: 1, duration: 0.6, ease: 'power2.inout'
            }
        )
        gsap.to(
            this.young.position,
            {
                x: posG + param.space * 2, duration: 0.6, ease: 'power2.inout'
            }
        )
        gsap.to(
            this.OtopArc.rotation,
            {
                z: 0, duration: 0.6, ease: 'power2.inout'
            }
        )
        gsap.to(
            this.eo.scale,
            {
                x: 1, duration: 0.6, ease: 'power2.inout'
            }
        )
        gsap.to(
            this.I.scale,
            {
                x: 1, duration: 0.6, ease: 'power2.inout'
            }
        )
        gsap.to(
            this.i.scale,
            {
                x: 1, duration: 0.6, ease: 'power2.inout'
            }
        )
        gsap.to(
            this.N1iLeft.scale,
            {
                x: 0, duration: 0.6, ease: 'power2.inout'
            }
        )
        gsap.to(
            this.N1iRight.scale,
            {
                x: 0, duration: 0.6, ease: 'power2.inout'
            }
        )
    }

    fromU() {
        gsap.to(
            this.Uarc.rotation,
            {
                z: 0, duration: 1, ease: 'power2.inout'
            }
        )
        gsap.to(
            this.UiLeft.scale,
            {
                x: 0, duration: 0.4, ease: 'power2.inout'
            }
        )
        gsap.to(
            this.UiRight.scale,
            {
                x: 0, duration: 0.4, ease: 'power2.inout',
            }
        )
    }

    fromO1() {
        gsap.to(
            this.O1arcBottom.rotation,
            {
                z: 0, duration: 0.6, ease: 'power2.inout'
            }
        )
    }

    fromY() {
        gsap.to(
            this.Yarc.rotation,
            {
                z: 0, duration: 0.6, ease: 'power2.inout'
            }
        )
        gsap.to(
            this.YiLeft.scale,
            {
                x: 0, duration: 0.6, ease: 'power2.inout'
            }
        )
        gsap.to(
            this.YiRight.scale,
            {
                x: 0, duration: 0.6, ease: 'power2.inout'
            }
        )
        gsap.to(
            this.Ystem.scale,
            {
                x: 0, duration: 0.4, ease: 'power2.inout'
            }
        )
    }

    fromN() {
        gsap.to(
            this.N2iLeft.scale,
            {
                x: 0, duration: 0.8, ease: 'power2.inout'
            }
        )
        gsap.to(
            this.N2iRight.scale,
            {
                x: 0, duration: 0.8, ease: 'power2.inout'
            }
        )
    }

    fromO2() {
        gsap.to(
            this.O2arcBottom.rotation,
            {
                z: 0, duration: 0.8, ease: 'power2.inout'
            }
        )
    }

    update() {
        /**
         *  
         */

        this.typo.update()

        if (this.logoMove.position.x == 0) {
            done = 0
        }

        if (this.logoMove.position.x <= posU) {
            this.logoEN.add(this.U)
            this.toU()
            this.eo.visible = false
            this.i.visible = false
        } else {
            this.logoEN.remove(this.U)
            this.eo.visible = true
            this.i.visible = true
        }

        if (this.logoMove.position.x <= posO1) {
            this.logoEN.add(this.O1)
            this.toO1()
        } else {
            this.logoEN.remove(this.O1)
            this.fromU()
        }

        if (this.logoMove.position.x <= posY) {
            this.logoEN.add(this.Y)
            this.toY()
        } else {
            this.logoEN.remove(this.Y)
            this.fromO1()
        }

        if (this.logoMove.position.x <= posN) {
            this.logoEN.add(this.N2)
            this.toN()
        } else {
            this.logoEN.remove(this.N2)
            this.fromY()
        }

        if (this.logoMove.position.x <= posO2) {
            this.logoEN.add(this.O2)
            this.toO2()
        } else {
            this.logoEN.remove(this.O2)
            this.fromN()
        }

        if (this.logoMove.position.x <= posO3) {
            this.logoEN.add(this.O3)
            this.toO3()
        } else {
            this.fromO2()
            this.logoEN.remove(this.O3)
            gsap.to(
                this.topArc.rotation,
                {
                    z: 0, duration: 1, ease: 'power2.inout'
                }
            )
            gsap.to(
                this.bottomArc.rotation,
                {
                    z: Math.PI, duration: 1, ease: 'power2.inout'
                }
            )
        }

        if (this.logoMove.position.x == posS) {
            done = 1
        }

        if (done) {
            if (this.logoMove.position.x >= posU) {
                this.toKO()
            }
            if (this.logoMove.position.x > posS) {
                gsap.to(
                    this.O3arcBottom.rotation,
                    {
                        z: 0, duration: 1, ease: 'power2.inout'
                    }
                )
            }
        }
    }

    transfrom() {
        if (!done) {
            gsap.to
                (
                    this.logoMove.position,
                    {
                        x: posS, duration: 2.4, ease: 'sine.inout'
                    }
                )
            gsap.to
                (
                    this.instance.position,
                    {
                        x: - posY, duration: 2.4, ease: 'sine.inout'
                    }
                )
            this.toEN()
            this.typo.toEN()
        } else {
            gsap.to(
                this.logoMove.position,
                {
                    x: 0, duration: 2.4, ease: 'sine.in'
                }
            )
            gsap.to
                (
                    this.instance.position,
                    {
                        x: posCenter, duration: 2.4, ease: 'sine.in'
                    }
                )
            this.typo.toKO()
        }
    }
}