
class ShopPanel {
    constructor(shop, zipetID, panelID) {
        this.shop = shop;
        this.zipetID = zipetID;
        this.panelID = panelID;
        this.zipet = document.getElementById(this.zipetID);
        this.panel = document.getElementById(this.panelID);
    
        this.init();
    }

    init() {
        this.zipet.addEventListener('click', () => {
            this.shop.openShop();
            this.togglePanel();
        })
    }

    openPanel() {
        this.zipet.setAttribute("state", "selected");
        this.panel.setAttribute("state", "open");
    }

    closePanel() {
        this.zipet.setAttribute("state", "notselected");
        this.panel.setAttribute("state", "close");
    }

    togglePanel() {
        if (this.panel.getAttribute("state") === "open") {
            this.closePanel();
            this.shop.closeShop();
        } else {
            this.shop.openPanel(this);
        }
    }
}