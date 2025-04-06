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
        healthBar.style.backgroundColor = "#00000000";
        // healthBar.style.backgroundColor = "#FF0000FF";
        healthBar.style.borderRadius = "5px";
        healthBar.style.overflow = "hidden";
        healthBar.style.zIndex = "9999";

        let healthFill = document.createElement("div");
        healthFill.id = "healthFill";
        healthFill.style.height = "100%";
        healthFill.style.width = "100%";
        healthFill.style.backgroundColor = "#00000000";
        // healthFill.style.backgroundColor = "#00FF00FF";
        healthFill.style.transition = "width 0.3s ease-out";

        healthBar.appendChild(healthFill);
        uiBase.appendChild(healthBar);

        const classHealth = {
            "Triggerman": 100,
            "Hunter": 60,
            "Run N Gun": 100,
            "Spray N Pray": 180,
            "Vince": 90,
            "Detective": 100,
            "Marksman": 90,
            "Rocketeer": 130,
            "Agent": 110,
            "Runner": 120,
            "Deagler": 60,
            "Bowman": 100,
            "Commando": 100,
            "Trooper": 100,
            "Survivor": 150,
            "Infiltrator": 90,
        };

        function updateHealthBar() {
            let healthElement = document.getElementById("bottomLeftHealth");
            if (!healthElement) return;

            let currentHealth = parseInt(healthElement.innerText.trim());
            if (isNaN(currentHealth)) return;

            let classElement = document.getElementById("menuClassName");
            let playerClass = classElement ? classElement.innerText.trim() : "";
            let maxHealth = classHealth[playerClass] || 100; 

            let healthPercentage = Math.max(0, Math.min(100, (currentHealth / maxHealth) * 100)); 
            healthFill.style.width = healthPercentage + "%"; 
        }

        setInterval(updateHealthBar, 0.1);
    }

    waitForUI(); 
})();
