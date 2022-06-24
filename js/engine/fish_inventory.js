
INITIAL_INVENTORY_SIZE = 5;

/**
 * The fish inventory containing all fish of the player and used to synchronise fishs 
 * among the game
 */
class FishInventory {
    constructor(game) {
        this.game = game;
        this.shop = game.shop;
        this.fishs = [];
        this.size = INITIAL_INVENTORY_SIZE;
    }

    /** 
     * Return if the current inventory can add new fish
     */
    get canAddFish() {
        return this.fishs.length < this.size;
    }

    /**
     * Return the number of fish currentlty in the inventory
     */
    get nbFishs() {
        return this.fishs.length;
    }

    /**
     * Add a fish to the inventory
     * @param {Fish} fish fish to add to the inventory 
     */
    addFish(fish) {
        if (this.canAddFish) {
            this.fishs.push(fish);
        }
    }

    /**
     * Check if the inventory has already a fish in itself
     * @param {Fish} fish 
     * @returns if [fish] is already in the inventory
     */
    hasFish(fish) {
        return this.fishs.find(f => f.id === fish.id) !== undefined;
    }

    /**
     * Remove a fish to the inventory
     * @param {Fish} fish fish to remove from the inventory
     */
    removeFish(fish) {
        let index = this.fishs.findIndex(f => f.id === fish.id);
        if (index !== -1) {
            this.fishs.splice(index, 1);
        }
    }
}