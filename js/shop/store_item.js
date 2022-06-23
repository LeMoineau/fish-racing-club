
class StoreItem {
    constructor(fish, store) {
        this.fish = fish;
        this.store = store;
    
        this.init();
    }

    init() {
        this.div = document.createElement("div");
        this.div.classList.add("store-item");

        let img = document.createElement("img");
        img.setAttribute("src", this.fish.img);
        img.classList.add("store-item-img");

        let infos = document.createElement("div");
        infos.classList.add("store-item-infos-container");
        
        let title = document.createElement("h4");
        title.textContent = this.fish.name;
        title.classList.add("store-item-infos-title");
        infos.appendChild(title);
    
        let description = document.createElement("p");
        description.textContent = `${this.fish.moneyByRot}$ par tour\n${this.fish.rotSpe * 10}° par seconde`;
        description.classList.add("store-item-infos-p");
        infos.appendChild(description);

        this.buyButton = document.createElement("div");
        this.buyButton.classList.add("store-item-buy-button");
        this.buyButton.textContent = `${this.store.getPriceOf(this.fish.type)}$`
        this.buyButton.addEventListener('click', () => {
            this.buy();
        })

        this.div.appendChild(img);
        this.div.appendChild(description);
        this.div.appendChild(this.buyButton);
    }

    buy() {
        this.store.buy(this.fish.type);
    }

    /**
     * set the current state of the Store item to hide/opacity 0.5 or visible it
     * @param {string} state must hide|transparent|visible 
     */
    setState(state) {
        this.div.setAttribute("state", state);
    }

    render() {
        this.buyButton.textContent = `${this.store.getPriceOf(this.fish.type)}$`;
    }
}