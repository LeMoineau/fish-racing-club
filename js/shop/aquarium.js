
/**
 * Aquarium panel containing all the fish of the player. 
 * Fusion are made in this page
 */
class Aquarium extends ShopPanel {
    constructor(shop) {
        super(shop, "aquarium-zipet", "aquarium-panel");
        this.selectedFish = null;
        this.plats = [];
        this.lastChangeRegisteredID = -1;
        this.trash = new TrashPlat();

        this.initPlats();
    }

    /**
     * Initialize platforms in the aquarium
     */
    initPlats() {
        for (let i = 0; i<this.shop.game.inv.size; i++) {
            this.addNewPlat();
        }
        for (let f in this.shop.game.inv.fishs) {
            let plat = this.getEmptyPlat();
            if (plat !== undefined) {
                plat.addFishOnPlat(f);
            }
        }
        this.panel.appendChild(this.trash.div);
    }

    /**
     * Add a new empty platform in the aquarium
     */
    addNewPlat() {
        let plat = new GrabableOnFishPlat();
        this.panel.appendChild(plat.div);
        this.plats.push(plat);
    }

    /**
     * Get an empty platform in the aquarium if one is empty
     */
    getEmptyPlat() {
        return this.plats.find(p => p.fish === null);
    }

    /**
     * Render the current aquarium page depending of game change by synchronise him to 
     * player inventory
     */
    render() {
        if (GAME.lastChange.id !== this.lastChangeRegisteredID) {
            // Remove previous fish (deleted from fusion or selling)
            for (let p of this.plats) {
                if (p.fish !== null && !GAME.inv.fishs.includes(p.fish)) {
                    p.removeFishFromPlat()
                }
            }
            // Adding new fish (from fusion or buying)
            for (let f of GAME.inv.fishs) {
                if (this.plats.find(p => p.fish === f) === undefined) {
                    let emptyPlat = this.getEmptyPlat();
                    if (emptyPlat !== undefined) {
                        emptyPlat.addFishOnPlat(f);
                    }
                }
            }
            // Update number of plats
            if (this.plats.length < GAME.inv.size) {
                for (let i = 0; i<GAME.inv.size - this.plats.length; i++) {
                    this.addNewPlat();
                }
            }
            this.lastChangeRegisteredID = GAME.lastChange.id;
        }
        this.trash.render();
    }
} 