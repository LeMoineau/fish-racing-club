
FISH_ID_COMPTEUR = 0; // id creator for fishs

class Fish {

    constructor(name, rotSpe, moneyByRot, moneyToBuy, img) {
        this.id = FISH_ID_COMPTEUR;
        this.name = name;
        this.rotSpe = rotSpe;
        this.moneyByRot = moneyByRot;
        this.moneyToBuy = moneyToBuy;
        this.img = img;
        this.currentRot = 0;
        this.nbTour = 0;

        FISH_ID_COMPTEUR += 1;
    }

    /**
     * Return a div discribing the current fish
     * @returns {HTMLElement} a div describing the current fish
     */
    getDiv() {
        let fishDiv = document.createElement("div");

        fishDiv.id = `fish-${this.id}`;
        fishDiv.classList.add('fish');
        fishDiv.classList.add(`fish-${this.name}`);
        fishDiv.addEventListener('click', () => {
            this.onClick();
        });
        fishDiv.style['z-index'] = enum_fish.findIndex(f => new f().name === this.name);

        let fishImg = document.createElement("img");
        fishImg.setAttribute("src", this.img);
        fishDiv.appendChild(fishImg);

        return fishDiv;
    }

    /**
     * Function triggered by clicking on the fish
     */
    onClick() {
        console.log(`cliqué sur ${this.name} !`);
    }

    /**
     * Update the current state of the fish including moving
     * @returns {bool} has made a new turn or not
     */
    update() {
        this.currentRot += this.rotSpe;
        if (this.currentRot >= 360 * (this.nbTour + 1)) {
            this.nbTour += 1;
            return true;
        }
        return false;
    }

    /**
     * Render the current fish depending of its position
     */
    render() {
        document.getElementById(`fish-${this.id}`).style["transform"] = `rotateZ(${this.currentRot}deg)`;
        if (this.currentRot % 360 >= 0 && this.currentRot % 360 <= 180) {
            document.querySelector(`#fish-${this.id} img`).style['transform'] = `rotateZ(90deg) rotateX(180deg)`;
        } else {
            document.querySelector(`#fish-${this.id} img`).style['transform'] = `rotateZ(90deg) rotateX(0deg)`;
        }
    }

}