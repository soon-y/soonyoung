import './style.css'
import Application from './Application/Application.js'

const application = new Application(document.querySelector('canvas.webgl'))

// Get the modal
const autoModeModal = document.getElementById("autoModeModal")
const autoMode = document.getElementById("autoMode")
const scheduleCleaningModal = document.getElementById("scheduleCleaningModal")
const scheduleCleaning = document.getElementById("scheduleCleaning")
const villageModal = document.getElementById("villageModal")
const village = document.getElementById("village")
const multicultureModal = document.getElementById("multicultureModal")
const multiculture = document.getElementById("multiculture")

autoMode.onclick = function () {
    autoModeModal.style.display = "block"
}
scheduleCleaning.onclick = function () {
    scheduleCleaningModal.style.display = "block"
}
village.onclick = function () {
    villageModal.style.display = "block"
}
multiculture.onclick = function () {
    multicultureModal.style.display = "block"
}

const closeAutoMode = document.getElementsByClassName("close")[0]
closeAutoMode.onclick = function () {
    autoModeModal.style.display = "none"
}

const cloaseSchedule = document.getElementsByClassName("close")[1]
cloaseSchedule.onclick = function () {
    scheduleCleaningModal.style.display = "none"
}

const closeVillage = document.getElementsByClassName("close")[2]
closeVillage.onclick = function () {
    villageModal.style.display = "none"
}

const closeMulticulture = document.getElementsByClassName("close")[3]
closeMulticulture.onclick = function () {
    multicultureModal.style.display = "none"
}

window.onclick = function (event) {
    if (event.target == autoModeModal ||
        event.target == scheduleCleaningModal ||
        event.target == villageModal ||
        event.target == multicultureModal) {
        autoModeModal.style.display = "none"
        scheduleCleaningModal.style.display = "none"
        villageModal.style.display = "none"
        multicultureModal.style.display = "none"
    }
}
