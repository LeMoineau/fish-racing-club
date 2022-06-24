
class Aquarium extends ShopPanel {
    constructor(shop) {
        super(shop, "aquarium-zipet", "aquarium-panel");
        this.selectedFish = null;
        this.plats = [];
        this.lastChangeRegisteredID = -1;

        this.initPlats();
    }

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
    }

    addNewPlat() {
        let plat = new GrabableOnPlatFish();
        this.panel.appendChild(plat.div);
        this.plats.push(plat);
    }

    getEmptyPlat() {
        return this.plats.find(p => p.fish === null);
    }

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
    }
} 