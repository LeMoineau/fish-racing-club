
ON_PLAT_FISH_ID_COMPTEUR = 0;

class OnPlatFish {
    constructor(fish=null) {
        this.id = ON_PLAT_FISH_ID_COMPTEUR;
        this.fish = fish;
        this.plat = new PlatFish();
    
        ON_PLAT_FISH_ID_COMPTEUR += 1;
        this.init();
    }

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

    getDiv() {

    }
}