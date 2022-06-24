
FISH_DISCOVERED = ["PoissonRouge"]

FISH_PRICES = {
    "PoissonRouge": 5,
    "PoissonClown": 10,
    "PoissonSquelette": 40,
}

class Store extends ShopPanel {
    constructor(shop) {
        super(shop, "store-zipet", "store-panel");
        this.items = [];

        this.initItems();
    }

    initItems() {
        for (let f of enum_fish) {
            let item = new StoreItem(new f(), this);
            this.items.push(item);
            this.panel.appendChild(item.div); 
        }
    }

    getPriceOf(fishType) {
        return FISH_PRICES[fishType.name];
    }

    buy(fishType) {
        if (FISH_DISCOVERED.includes(fishType.name)) {
            if (GAME.inv.canAddFish) {
                let fish = new fishType();
                if (GAME.money >= this.getPriceOf(fishType)) {
                    GAME.addFish(fish);
                    GAME.removeMoney(this.getPriceOf(fish.type));
                }
            }
        }
    }

    newDiscovery(fish) {
        FISH_DISCOVERED.push(fish.type.name);
    }

    render() {
        for (let i of this.items) {
            if (FISH_DISCOVERED.includes(i.fish.type.name)) {
                if (GAME.money >= this.getPriceOf(i.fish.type) && GAME.inv.canAddFish) {
                    i.setState("visible");
                } else {
                    i.setState("transparent");
                }
                i.render();
            } else {
                i.setState("hide");
            }
        }
    }
}