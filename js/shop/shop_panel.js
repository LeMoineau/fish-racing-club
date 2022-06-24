
/**
 * Class for panel used as page in the shop
 */
class ShopPanel {
    constructor(shop, zipetID, panelID) {
        this.shop = shop;
        this.zipetID = zipetID;
        this.panelID = panelID;
        this.zipet = document.getElementById(this.zipetID);
        this.panel = document.getElementById(this.panelID);
    
        this.init();
    }

    /**
     * Initialize a shop panel by adding click listener on its zipet
     */
    init() {
        this.zipet.addEventListener('click', () => {
            this.shop.openShop();
            this.togglePanel();
        })
    }

    /**
     * Open only the current panel
     */
    openPanel() {
        this.zipet.setAttribute("state", "selected");
        this.panel.setAttribute("state", "open");
    }

    /**
     * Close only the current panel
     */
    closePanel() {
        this.zipet.setAttribute("state", "notselected");
        this.panel.setAttribute("state", "close");
    }

    /**
     * Open the current panel or close the shop
     */
    togglePanel() {
        if (this.panel.getAttribute("state") === "open") {
            this.closePanel();
            this.shop.closeShop();
        } else {
            this.shop.openPanel(this);
        }
    }
}