
/**
 * Game class containing loop and all possible events of the game
 */
class Game {

    _GAME_CONTAINER_ID = "main-container";
    _FISH_WHEEL_ID = "fish-wheel";
    _MONEY_INDICATOR_ID = "money-indicator";

    constructor() {
        this.money = 10;
        this.inv = new FishInventory(this);
        this.gameName = "Fish Ranch";
        this.gameContainer = document.getElementById(this._GAME_CONTAINER_ID);
        this.fishWheelContainer = document.getElementById(this._FISH_WHEEL_ID);
        this.moneyIndicator = document.getElementById(this._MONEY_INDICATOR_ID);
        this.shop = new FishShop(this);
        this.lastChange = {};
        
        this.init();
    }

    /**
     * Initialize the Game, other than attributes init
     */
    init() {
        this.updateMoneyIndicator();
    }
 
    /**
     * Declare a new changement for the rest of the components (including shop panels)
     * @param {string} topic topic of the changement
     * @param {string} message message describing the changement
     * @param {dict} data data needed with the changement
     */
    newChangement(topic, message="", data={}) {
        this.lastChange = new Change(topic, message, data);
    }

    /** 
     * Add a fish to the current fish wheel
     * @param {Fish} fish
     */
    addFish(fish) {
        if (this.inv.canAddFish) {
            this.inv.addFish(fish);
            this.fishWheelContainer.appendChild(fish.div);
            this.newChangement("adding fish", `${fish.toString} has been added to inventory`);
        }
    }

    /**
     * Remove a fish properly through the game
     * @param {Fish} fish fish to remove from the game
     */
    removeFish(fish) {
        this.inv.removeFish(fish);
        this.fishWheelContainer.removeChild(fish.div);
        this.newChangement("removing fish", `${fish.toString} has been removed from inventory`);
    }

    /**
     * Remove money from the current player
     * @param {number} moneyToRemove 
     */
    removeMoney(moneyToRemove) {
        this.money -= moneyToRemove;
        this.updateMoneyIndicator();
    }

    /**
     * Add money to the current player
     * @param {number} moneyToAdd 
     */
    addMoney(moneyToAdd) {
        this.money += moneyToAdd;
        this.updateMoneyIndicator();
    }

    /**
     * Update money indicator display depending on it value
     */
    updateMoneyIndicator() {
        if (this.money < 1000) {
            this.moneyIndicator.textContent = `Money: ${this.money}$`;
        } else {
            let c = 1000000;
            let units = ["k", "B", "T", "Qa"]
            while (this.money >= c) {
                c *= 1000;
            }
            let indexUnits = Math.log(c)/Math.log(1000);
            if (indexUnits >= units.length) {
                indexUnits = units.length - 1;
            }
            this.moneyIndicator.textContent = `Money: ${(this.money/(c/1000)).toFixed(1)}${units[indexUnits]}$`;
        }
    }

    /**
     * Main loop containing interval and rendering/updating call
     */
    mainLoop() {
        setInterval(() => {
            this.update();
            this.render();
        }, 100)
    }

    /**
     * Update all entities of the game including fish
     */
    update() {
        for (let f of this.inv.fishs) {
            let newTour = f.update();
            if (newTour) {
                this.addMoney(f.moneyByRot);
            }
        }
    }

    /**
     * Render all entities of the game including fish and shop
     */
    render() {
        for (let f of this.inv.fishs) {
            f.render();
        }
        this.shop.render();
    }

    /**
     * Return the code describing the current game
     * @returns {string} code describing the current game
     */
    getCode() {
        let ENCOUNTER = [
            { "class": Game, "remplace": "Game.constructor" },
            { "class": FishShop, "remplace": "FishShop.constructor" },
            { "class": Store, "remplace": "Store.constructor" }
        ]
        let res = JSON.stringify(this, (k, v) => {
            let target = ENCOUNTER.find(e => v instanceof e["class"]);
            if (target !== undefined && target["encounter"] === true) {
                return target["remplace"];
            } else if (target !== undefined) {
                target["encounter"] = true;
            }
            return v;
        })
        return myCipher(res);
    }

    /**
     * Generate a Game object describing previous game
     * @param {string} code code of the previous game
     * @returns object of the previous game
     */
    generateFromCode(code) {
        return JSON.parse(myDecipher(code));
    }

}