
CARD_SHOP_ID_COMPTEUR = 0;

class FishCardShop {

    constructor(shop, fishType) {
        this.id = CARD_SHOP_ID_COMPTEUR;
        this.fishType = fishType;
        this.fish = new fishType();
        this.shop = shop;

        this.init();
        CARD_SHOP_ID_COMPTEUR += 1;
    }

    init() {
        this.div = document.createElement("div");
        this.div.id = `card-${this.id}`;
        this.div.addEventListener('click', () => {
            this.shop.buy(this.fishType);
        });
        this.div.classList.add("shop-card");
        
        let cardImg = document.createElement("img");
        cardImg.setAttribute("src", this.fish.img);
        this.div.appendChild(cardImg);
        
        // let cardInfos = document.createElement("div");
        // cardInfos.classList.add("shop-card-infos");
        // cardInfos.innerHTML = `<h3> ${this.fish.name} </h3> <p> ${this.fish.moneyToBuy}$ </p>`;
        // this.div.appendChild(cardInfos);
    }

    getDiv() {
        return this.div;
    }

    render(currentMoney) {
        if (currentMoney >= this.fish.moneyToBuy) {
            this.div.setAttribute("buyable", "true");
        } else {
            this.div.setAttribute("buyable", "false");
        }
    }

}