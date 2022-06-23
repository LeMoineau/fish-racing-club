
MIN_AQUARIUM_PLAT = 3;

class Aquarium extends ShopPanel {
    constructor(shop) {
        super(shop, "aquarium-zipet", "aquarium-panel");
        this.fishs = [];
        this.selectedFish = null;

        this.initPlats();
        this.initController();
    }

    initPlats() {
        for (let i = 0; i<MIN_AQUARIUM_PLAT; i++) {
            let plat = new GrabableOnPlatFish();
            this.panel.appendChild(plat.div);
            this.fishs.push(plat);
        }
        let test = new PoissonRouge();
        this.panel.appendChild(new GrabableOnPlatFish(test).div)
    }

    initController() {
        
    }

    
}