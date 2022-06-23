
class FishShop {

    _SHOP_CONTAINER_ID = "fish-shop";
    _SHOP_TOGGLER_ID = "fish-shop-toggler";

    constructor(game) {
        this.game = game;
        this.shopContainer = document.getElementById(this._SHOP_CONTAINER_ID);
        this.shopToggler = document.getElementById(this._SHOP_TOGGLER_ID);
        this.aquarium = new Aquarium(this);
        this.store = new Store(this);
        this.upgrade = new Upgrade(this);
        this.journal = new Journal(this);
        this.panels = [this.aquarium, this.store, this.upgrade, this.journal];
        this.openedPanel = null;

        this.init();
    }

    init() {
        this.openShop();
        this.openPanel(this.aquarium);
    }

    isOpen() {
        return this.shopContainer.getAttribute("state") === "open";
    }

    openShop() {
        this.shopContainer.setAttribute('state', 'open');
    }

    closeShop() {
        this.shopContainer.setAttribute('state', 'close');
        this.openedPanel = null;
    }

    openPanel(panel) {
        this.openShop();
        for (let p of this.panels) {
            p.closePanel();
        }
        panel.openPanel();
        this.openedPanel = panel;
    }

    removeFish(fish) {

    }

    addFish(fish) {

    }

    render() {
        if (this.openedPanel !== null) {
            this.openedPanel.render();
        }
    }

}