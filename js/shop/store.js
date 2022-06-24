
FISH_DISCOVERED = ["PoissonRouge"]

FISH_PRICES = {
    "PoissonRouge": {
        "buy": 5,
        "sell": 2
    },
    "PoissonClown": {
        "buy": 10,
        "sell": 5
    },
    "PoissonSquelette": {
        "buy": 40,
        "sell": 15
    },
}

/**
 * Store panel managing buying, selling and discovering of the fishs
 */
class Store extends ShopPanel {
    constructor(shop) {
        super(shop, "store-zipet", "store-panel");
        this.items = [];

        this.initRender();
    }

    /**
     * Initialize store by adding all the possible fish to buy in it and hide them
     */
    initRender() {
        for (let f of enum_fish) {
            let item = new StoreItem(new f(), this);
            this.items.push(item);
            this.panel.appendChild(item.div); 
        }
    }

    /**
     * Return the price to get a fish of a specific type
     * @param {Fish.constructor} fishType type of fish to buy
     * @returns the price to get a fish of type [fishType]
     */
    getPriceOf(fishType) {
        return FISH_PRICES[fishType.name].buy;
    }

    /**
     * Return the amount of money earn by selling a fish of specific type
     * @param {Fish.constructor} fishType type of fish to sell
     * @returns the money will earn if sell a fish of type [fishType]
     */
    getSellOf(fishType) {
        return FISH_PRICES[fishType.name].sell;
    }

    /**
     * Buy a fish of a specific type
     * @param {Fish.constructor} fishType type of fish to buy
     */
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

    /**
     * Sell a fish contain in player inventory
     * @param {Fish} fish fish to sell
     */
    sell(fish) {
        if (FISH_DISCOVERED.includes(fish.type.name)) {
            if (GAME.inv.hasFish(fish)) {
                GAME.addMoney(this.getSellOf(fish.type));
                GAME.removeFish(fish);
            }
        }
    }

    /**
     * Make a new discovery on a fish
     * @param {Fish} fish new fish discovered
     */
    newDiscovery(fish) {
        FISH_DISCOVERED.push(fish.type.name);
    }

    /**
     * Render the current panel and update the rendering of contains items depending of 
     * the player money
     */
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