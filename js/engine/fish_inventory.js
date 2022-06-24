
INITIAL_INVENTORY_SIZE = 5;

class FishInventory {
    constructor(game) {
        this.game = game;
        this.shop = game.shop;
        this.fishs = [];
        this.size = INITIAL_INVENTORY_SIZE;
    }

    get canAddFish() {
        return this.fishs.length < this.size;
    }

    addFish(fish) {
        if (this.canAddFish) {
            this.fishs.push(fish);
        }
    }

    removeFish(fish) {
        let index = this.fishs.findIndex(f => f.id === fish.id);
        if (index !== -1) {
            this.fishs.splice(index, 1);
        }
    }
}