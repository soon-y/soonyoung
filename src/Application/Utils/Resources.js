import * as THREE from 'three'
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader'
import EventEmitter from "./EventEmitter"

const loading = document.querySelector('.overlay')

export default class Resources extends EventEmitter {
    constructor(sources) {
        super()

        //Options
        this.sources = sources

        //Setup
        this.loadingManager = new THREE.LoadingManager(
            //Loaded
            () => {
                window.setTimeout(() => {
                    loading.style.opacity = '0'
                }, 1000)
                window.setTimeout(() => {
                    loading.style.display = 'none'
                }, 3000)
            }
        )
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }

    setLoaders() {
        this.loaders = {}
        this.loaders.textureLoader = new THREE.TextureLoader(this.loadingManager)
        this.loaders.ttfLoader = new TTFLoader(this.loadingManager)
    }

    startLoading() {
        for (const source of this.sources) {
            if (source.type === 'texture') {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if (source.type === 'ttf') {
                this.loaders.ttfLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    sourceLoaded(source, file) {
        this.items[source.name] = file
        this.loaded++
        if (this.loaded === this.toLoad) {
            this.trigger('ready')
        }
    }
}