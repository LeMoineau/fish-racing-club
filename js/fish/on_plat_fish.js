
ON_PLAT_FISH_ID_COMPTEUR = 0;

/**
 * A fish on a platform not including managing of events on it but just render and attributes
 */
class OnFishPlat {
    constructor(fish=null) {
        this.id = ON_PLAT_FISH_ID_COMPTEUR;
        this.fish = fish;
        this.plat = new FishPlat();
    
        ON_PLAT_FISH_ID_COMPTEUR += 1;
        this.init();
    }

    /**
     * Initialize the rendering of the current fish on a platform
     */
    init() {
        this.div = document.createElement("div");
        this.div.classList.add("on-plat-fish");

        if (this.fish !== null) {
            this.fishDiv = document.createElement("img");
            this.fishDiv.classList.add("fish");
            this.fishDiv.setAttribute("src", this.fish.img);
            this.div.appendChild(this.fishDiv);
        }

        this.div.appendChild(this.plat.div);
    }

    /**
     * Return if the current platform is empty or not
     */
    get isEmpty() {
        return this.fish === null;
    }

    /**
     * Remove the fish currently on the plat
     */
    removeFishFromPlat() {
        this.fish = null;
        this.div.removeChild(this.fishDiv);
        this.fishDiv = null;
    }

    /**
     * Add a fish on the platform
     * @param {Fish} fish the fish to be added on the platform
     */
    addFishOnPlat(fish) {
        this.fish = fish;
        this.fishDiv = document.createElement("img");
        this.fishDiv.classList.add("fish");
        this.fishDiv.setAttribute("src", this.fish.img);
        this.div.appendChild(this.fishDiv);
    }
}