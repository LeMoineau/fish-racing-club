
/**
 * The fish platform, little oval under the fish in aquarium for example
 */
class FishPlat {
    constructor() {
        this.init();
    }

    /**
     * Initialize the fish plat
     */
    init() {
        this.div = document.createElement("div");
        this.div.classList.add("fish-plat");
    }
}