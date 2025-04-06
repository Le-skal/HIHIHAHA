// ==UserScript==
// @name         Krunker Ammo Bar (Fixed)
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Displays an ammo bar in Krunker.io with proper handling for reload state
// @author       c0r3 (Fixed by another dev)
// @match        *://krunker.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Wait for the UI to be ready
    function waitForUI() {
        let uiBase = document.getElementById("uiBase");
        if (!uiBase) {
            setTimeout(waitForUI, 100);
            return;
        }

        // Create Ammo Bar UI inside uiBase
        let ammoBar = document.createElement("div");
        ammoBar.id = "ammoBar";
        ammoBar.style.position = "fixed";
        ammoBar.style.bottom = "10px";
        ammoBar.style.left = "50%";
        ammoBar.style.transform = "translateX(-50%)";
        ammoBar.style.width = "200px";
        ammoBar.style.height = "10px";
        ammoBar.style.backgroundColor = "#00000000";
        // ammoBar.style.backgroundColor = "#FF0000FF";
        ammoBar.style.borderRadius = "5px";
        ammoBar.style.overflow = "hidden";
        document.body.appendChild(ammoBar);

        let ammoFill = document.createElement("div");
        ammoFill.id = "ammoFill";
        ammoFill.style.height = "100%";
        ammoFill.style.width = "100%";
        ammoFill.style.backgroundColor = "#00000000";
        // ammoFill.style.backgroundColor = "#00FF00FF";
        ammoFill.style.transition = "width 0.1s ease-out";
        ammoBar.appendChild(ammoFill);

        // Append to UI Base to match CSS selector
        uiBase.appendChild(ammoBar);

        function cleanAmmoMax(value) {
            return parseInt(value.replace("|", "").trim()) || 1;
        }

        function updateAmmoBar() {
            const ammoElement = document.getElementById("ammoVal");
            const maxAmmoElement = document.getElementById("ammoMax");
            const ammoHolder = document.getElementById("ammoHolder");
        
            if (!ammoElement || !maxAmmoElement || !ammoHolder) return;
        
            const currentAmmoText = ammoElement.innerText.trim();
            const maxAmmo = cleanAmmoMax(maxAmmoElement.innerText);
            const currentAmmo = parseInt(currentAmmoText) || 0;
            const ammoPercentage = (currentAmmo / maxAmmo) * 100;
            const holderBGSize = getComputedStyle(ammoHolder).backgroundSize;
            const bgSizeX = parseFloat(holderBGSize.split(" ")[0]) || 0;
        
            if (bgSizeX > 0) {
                const reloadProgress = (100 - bgSizeX) / 100;
                const extraFill = (100 - ammoPercentage) * reloadProgress;
                const newFill = ammoPercentage + extraFill;
            
                ammoFill.style.transition = "width 0.1s linear";
                ammoFill.style.width = `${newFill}%`;
            } else {
                // Normal case, update with current ammo
                ammoFill.style.transition = "width 0.1s ease-out";
                ammoFill.style.width = `${ammoPercentage}%`;
            }
        }               

        // Update Ammo Bar Continuously
        setInterval(updateAmmoBar, 100);
    }

    waitForUI();
})();
