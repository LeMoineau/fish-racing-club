
let CURRENTLY_GRABBED_FISH = null;
let SHIFT_GRABBED = null;

/**
 * Fish on plat grabbable. The fish place on the plat can be transport to others 
 * and fusion with other fish
 */
class GrabableOnPlatFish extends OnPlatFish {

    /**
     * Constructor
     * @param {Fish} fish 
     */
    constructor(fish) {
        super(fish);
        this.grabbed = false;
    
        this.initRender();
        this.initController();
    }

    /**
     * Adding html attributes specific to [GrabableOnPlatFish]
     */
    initRender() {
        this.div.classList.add("grabable-on-plat-fish");
    }

    /**
     * Initialize controller of grabable fish including:
     * - begin grabbing with mousedown
     * - receive fish with mouseup
     */
    initController() {
        if (this.fish !== null) {
            this.fishDiv.addEventListener('mousedown', (event) => {
                this.beginGrab(event)
            })
        }
        this.div.addEventListener('mouseup', () => {
            this.receiveFish();
        })
    }

    receiveFish() {
        if (CURRENTLY_GRABBED_FISH != null) {
            if (CURRENTLY_GRABBED_FISH.id !== this.id) {
                if (this.fish === null) {
                    // make deplacement between 2 plats
                    this.addFishOnPlat(CURRENTLY_GRABBED_FISH.fish);
                    CURRENTLY_GRABBED_FISH.removeFishFromPlat();
                } else {
                    // make fusion
                    let newFish = fusion(this.fish, CURRENTLY_GRABBED_FISH.fish);
                    if (newFish !== null) {
                        // remove and adding new Fish to plats
                        this.removeFishFromPlat();
                        CURRENTLY_GRABBED_FISH.removeFishFromPlat();
                        this.addFishOnPlat(newFish);
                        // new discovery
                        if (!FISH_DISCOVERED.includes(newFish.type.name)) {
                            GAME.shop.store.newDiscovery(newFish);
                        }
                    } else {
                        console.log("la fusion a échouée..")
                    }
                }
            }
        }
    }

    /**
     * Initialize grabbing of fish by adding mouse event and modify attributes in HTML elements
     * @param {MouseDownEvent} event 
     */
    beginGrab(event) {
        this.fishDiv.style.left = `${event.clientX - event.offsetX}px`;
        this.fishDiv.style.top = `${event.clientY - event.offsetY}px`;
        this.setGrabbed(true);
        document.body.addEventListener('mousemove', grab);
        document.body.addEventListener('mouseup', endGrab);
        document.body.addEventListener('mouseleave', endGrab);
        event.preventDefault();
    }

    /**
     * Set grabbing state of the current fish
     * @param {bool} grabbed 
     */
    setGrabbed(grabbed) {
        if (grabbed) {
            CURRENTLY_GRABBED_FISH = this;
            this.div.setAttribute("grabbed", "true");
        } else {
            CURRENTLY_GRABBED_FISH = null;
            SHIFT_GRABBED = null;
            this.div.setAttribute("grabbed", "false");
            if (this.fishDiv !== null) {
                this.fishDiv.style.left = "initial";
                this.fishDiv.style.top = "initial";
            }
        }
    }

    /**
     * Adding a fish on the current grabbable plat 
     * (adding mouse down event to begin grab more than [OnPlatFish.addFishOnPlat()])
     * @param {Fish} fish 
     */
    addFishOnPlat(fish) {
        super.addFishOnPlat(fish);
        this.fishDiv.addEventListener('mousedown', (event) => {
            this.beginGrab(event);
        })
    }
}

/**
 * Move the fishDiv according to the mouse position to simulate grabbing
 * @param {MouseMoveEvent} event 
 */
function grab(event) {
    if (SHIFT_GRABBED === null) {
        SHIFT_GRABBED = [event.offsetX, event.offsetY];
    }
    if (CURRENTLY_GRABBED_FISH !== null) {
        CURRENTLY_GRABBED_FISH.fishDiv.style.left = `${event.clientX - SHIFT_GRABBED[0]}px`;
        CURRENTLY_GRABBED_FISH.fishDiv.style.top = `${event.clientY - SHIFT_GRABBED[1]}px`;
    }
}

/**
 * End grabbing by removing all event listener and setting grabbing to false
 */
function endGrab() {
    document.body.removeEventListener('mousemove', grab);
    document.body.removeEventListener('mouseup', endGrab);
    document.body.removeEventListener('mouseleave', endGrab);
    CURRENTLY_GRABBED_FISH.setGrabbed(false);
}