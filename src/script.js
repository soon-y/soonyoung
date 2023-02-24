import './style.css'
import Application from './Application/Application.js'

const application = new Application(document.querySelector('canvas.webgl'))

// Get the modal
const robotAppModal = document.getElementById("robotAppModal")
const robotApp = document.getElementById("robotApp")
const villageModal = document.getElementById("villageModal")
const village = document.getElementById("village")
const multicultureModal = document.getElementById("multicultureModal")
const multiculture = document.getElementById("multiculture")

robotApp.onclick = function () {
    robotAppModal.style.display = "block"
}
village.onclick = function () {
    villageModal.style.display = "block"
}
multiculture.onclick = function () {
    multicultureModal.style.display = "block"
}

const closeRobot = document.getElementsByClassName("close")[0]
closeRobot.onclick = function () {
    robotAppModal.style.display = "none"
}

const closeVillage = document.getElementsByClassName("close")[1]
closeVillage.onclick = function () {
    villageModal.style.display = "none"
}

const closeMulticulture = document.getElementsByClassName("close")[2]
closeMulticulture.onclick = function () {
    multicultureModal.style.display = "none"
}

window.onclick = function (event) {
    if (event.target == robotAppModal ||
        event.target == villageModal ||
        event.target == multicultureModal) {
        robotAppModal.style.display = "none"
        villageModal.style.display = "none"
        multicultureModal.style.display = "none"
    }
}
