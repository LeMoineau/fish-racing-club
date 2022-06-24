
/**
 * The fish shop contains all the possibles actions to do instead of watching the fishs roll
 */
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

    /**
     * Initialize the current shop by opening the aquarium panel
     */
    init() {
        this.openShop();
        this.openPanel(this.aquarium);
    }

    /**
     * Return if the shop is currently open or not
     * @returns boolean describing if the shop is currently open or not
     */
    isOpen() {
        return this.shopContainer.getAttribute("state") === "open";
    }

    /**
     * Open the shop on the last opened panel
     */
    openShop() {
        this.shopContainer.setAttribute('state', 'open');
    }

    /**
     * Close the shop
     */
    closeShop() {
        this.shopContainer.setAttribute('state', 'close');
        this.openedPanel = null;
    }

    /**
     * Open a panel on the shop
     * @param {ShopPanel} panel panel to open 
     */
    openPanel(panel) {
        this.openShop();
        for (let p of this.panels) {
            p.closePanel();
        }
        panel.openPanel();
        this.openedPanel = panel;
    }

    /**
     * Update the rendering of the current component
     */
    render() {
        if (this.openedPanel !== null) {
            this.openedPanel.render();
        }
    }

}