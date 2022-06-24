
/**
 * Platform used to sell fishs. If a fish is received, it will try to sell it if possible
 */
class TrashPlat extends GrabableOnFishPlat {
    constructor() {
        super(null);
    }

    /**
     * Initialize the rendering of the trash plat by adding class
     */
    initRender() {
        super.initRender();
        this.div.classList.add("trash");
    }

    /**
     * Return if a fish can be sell depending on the current money of the player
     */
    get canSell() {
        return GAME.money >= GAME.shop.store.getPriceOf(PoissonRouge) || GAME.inv.nbFishs > 1;
    }

    /**
     * Function called by receive a fish on itself. Will try to sell the received fish
     */
    receiveFish() {
        if (CURRENTLY_GRABBED_FISH != null) {
            if (this.canSell) {
                GAME.shop.store.sell(CURRENTLY_GRABBED_FISH.fish);
                CURRENTLY_GRABBED_FISH.removeFishFromPlat();
            }
        }
    }

    /**
     * Render the trash by updating its opacity depending of the selling capacity of the player
     */
    render() {
        if (this.canSell) {
            this.div.setAttribute("trash-open", "true");
        } else {
            this.div.setAttribute("trash-open", "false");
        }
    }
}