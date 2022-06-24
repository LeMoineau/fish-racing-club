
FISH_ID_COMPTEUR = 0; // id creator for fishs

/**
 * Structure class of a fish in the game containing all informations of a fish and its deplacement
 * in the game wheel
 */
class Fish {
    constructor(name, rotSpe, moneyByRot, img) {
        this.id = FISH_ID_COMPTEUR;
        this.name = name;
        this.rotSpe = rotSpe;
        this.moneyByRot = moneyByRot;
        this.img = img;
        this.currentRot = 0;
        this.nbTour = 0;

        FISH_ID_COMPTEUR += 1;
        this.init();
    }

    /**
     * Initialize the fish including its texture (img) and its events
     */
    init() {
        this.div = document.createElement("div");

        this.div.id = `fish-${this.id}`;
        this.div.classList.add('fish');
        this.div.classList.add(`fish-${this.name}`);
        this.div.addEventListener('click', () => {
            this.onClick();
        });
        this.div.style['z-index'] = enum_fish.findIndex(f => f === this.type);

        let fishImg = document.createElement("img");
        fishImg.setAttribute("src", this.img);
        this.div.appendChild(fishImg);
    }

    /**
     * Function triggered by clicking on the fish
     */
    onClick() {
        console.log(`cliqué sur ${this.name} !`);
    }

    /**
     * Return the current type of the fish
     */
    get type() {
        return this.constructor;
    }

    /**
     * Return a display name for the current fish
     */
    get toString() {
        return `${this.name}#${this.id}`;
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
        this.div.style["transform"] = `rotateZ(${this.currentRot}deg)`;
        // if (this.currentRot % 360 >= 0 && this.currentRot % 360 <= 180) {
        //     this.div.style['transform'] += ` rotateX(180deg)`;
        // } else {
        //     this.div.style['transform'] += ` rotateX(0deg)`;
        // }
    }

}