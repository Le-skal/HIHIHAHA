// ==UserScript==
// @name         Krunker Ammo Bar (Improved)
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Displays an ammo bar in Krunker.io with proper handling for reload state
// @author       c0r3
// @match        *://krunker.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Create Ammo Bar UI
    let ammoBar = document.createElement("div");
    ammoBar.id = "ammoBar";
    ammoBar.style.position = "fixed";
    ammoBar.style.bottom = "10px";
    ammoBar.style.left = "50%";
    ammoBar.style.transform = "translateX(-50%)";
    ammoBar.style.width = "200px";
    ammoBar.style.height = "10px";
    ammoBar.style.backgroundColor = "#00000000";
    ammoBar.style.borderRadius = "5px";
    ammoBar.style.overflow = "hidden";
    document.body.appendChild(ammoBar);

    let ammoFill = document.createElement("div");
    ammoFill.id = "ammoFill";
    ammoFill.style.height = "100%";
    ammoFill.style.width = "100%";
    ammoFill.style.backgroundColor = "#00000000";
    ammoFill.style.transition = "width 0.1s ease-out";
    ammoBar.appendChild(ammoFill);

    function cleanAmmoMax(value) {
        return parseInt(value.replace("|", "").trim()) || 1;
    }

    function updateAmmoBar() {
        let ammoElement = document.getElementById("ammoVal");
        let maxAmmoElement = document.getElementById("ammoMax");

        if (!ammoElement || !maxAmmoElement) return;

        let currentAmmoText = ammoElement.innerText.trim();
        let maxAmmo = cleanAmmoMax(maxAmmoElement.innerText);

        let ammoPercentage, barColor;

        if (currentAmmoText === "-") {
            // Reloading state
            ammoPercentage = 100;
        } else {
            let currentAmmo = parseInt(currentAmmoText) || 0;
            ammoPercentage = (currentAmmo / maxAmmo) * 100;
        }

        ammoFill.style.width = ammoPercentage + "%";
    }

    setInterval(updateAmmoBar, 10);
})();
