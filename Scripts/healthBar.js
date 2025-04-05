// ==UserScript==
// @name         Krunker Health Bar
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Displays a health bar in Krunker.io based on the health text
// @author       Adapted by ChatGPT
// @match        *://krunker.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function waitForUI() {
        let uiBase = document.getElementById("uiBase");
        if (!uiBase) {
            setTimeout(waitForUI, 100);
            return;
        }

        // Create Health Bar UI
        let healthBar = document.createElement("div");
        healthBar.id = "healthBar";
        healthBar.style.position = "fixed";
        healthBar.style.bottom = "30px";
        healthBar.style.left = "50%";
        healthBar.style.transform = "translateX(-50%)";
        healthBar.style.width = "200px";
        healthBar.style.height = "10px";
        healthBar.style.backgroundColor = "#222";
        healthBar.style.borderRadius = "5px";
        healthBar.style.overflow = "hidden";
        healthBar.style.zIndex = "9999";

        let healthFill = document.createElement("div");
        healthFill.id = "healthFill";
        healthFill.style.height = "100%";
        healthFill.style.width = "100%";
        healthFill.style.backgroundColor = "#00FF00";
        healthFill.style.transition = "width 0.3s ease-out";

        healthBar.appendChild(healthFill);
        uiBase.appendChild(healthBar);

        function updateHealthBar() {
            let healthElement = document.getElementById("bottomLeftHealth");
            if (!healthElement) return;

            let currentHealth = parseInt(healthElement.innerText.trim());
            if (isNaN(currentHealth)) return;

            let maxHealth = 100; // Default max HP
            let healthPercentage = Math.max(0, Math.min(100, (currentHealth / maxHealth) * 100));
            healthFill.style.width = healthPercentage + "%";

            // Optional color change
            if (healthPercentage > 60) {
                healthFill.style.backgroundColor = "#00FF00";
            } else if (healthPercentage > 30) {
                healthFill.style.backgroundColor = "#FFA500";
            } else {
                healthFill.style.backgroundColor = "#FF0000";
            }
        }

        setInterval(updateHealthBar, 50);
    }

    waitForUI();
})();
