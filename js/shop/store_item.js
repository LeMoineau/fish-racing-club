
/**
 * Item contains in the store to buy discovered fishs
 */
class StoreItem {
    constructor(fish, store) {
        this.fish = fish;
        this.store = store;
    
        this.init();
    }

    /**
     * Initialize a store item on html, adding event and make it hided
     */
    init() {
        this.div = document.createElement("div");
        this.div.classList.add("store-item");

        let imgContainer = document.createElement("div");
        imgContainer.classList.add("store-item-img-container");

        let img = document.createElement("img");
        img.setAttribute("src", this.fish.img);
        img.classList.add("store-item-img");
        imgContainer.appendChild(img);

        let infos = document.createElement("div");
        infos.classList.add("store-item-infos-container");
        
        let title = document.createElement("h4");
        title.textContent = this.fish.name;
        title.classList.add("store-item-infos-title");
        infos.appendChild(title);
    
        let description = document.createElement("pre");
        description.textContent = `${this.fish.moneyByRot}$ par tour\n${this.fish.rotSpe * 10}° par seconde`;
        description.classList.add("store-item-infos-p");
        infos.appendChild(description);

        this.buyButton = document.createElement("div");
        this.buyButton.classList.add("store-item-buy-button");
        this.buyButton.textContent = `${this.store.getPriceOf(this.fish.type)}$`
        this.buyButton.addEventListener('click', () => {
            this.buy();
        })

        this.div.appendChild(imgContainer);
        this.div.appendChild(infos);
        this.div.appendChild(this.buyButton);

        // to not spoil next fishs on loading
        this.setState("hide");
    }

    /**
     * Call the store to buy a fish
     */
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

    /**
     * Render the current store item by updating its price
     */
    render() {
        this.buyButton.textContent = `${this.store.getPriceOf(this.fish.type)}$`;
    }
}