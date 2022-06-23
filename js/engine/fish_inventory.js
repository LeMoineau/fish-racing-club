
class FishInventory {
    constructor(game) {
        this.game = game;
        this.shop = game.shop;
        this.fishs = [];
    }

    addFish(fish) {
        this.fishs.push(fish);
    }

    removeFish(fish) {
        let index = this.fishs.findIndex(f => f.id === fish.id);
        if (index !== -1) {
            this.fishs.splice(index, 1);
        }
    }
}