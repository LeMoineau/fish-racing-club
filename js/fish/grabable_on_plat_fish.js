
class GrabableOnPlatFish extends OnPlatFish {
    constructor(fish) {
        super(fish);
        this.grabbed = false;
    
        this.initController();
    }

    initController() {
        if (this.fish !== null) {
            this.fishDiv.addEventListener('mousedown', (event) => {
                console.log("coucou");
                event.preventDefault();
                document.body.addEventListener('mousemove', mouseMoveEvent, this);
                document.body.addEventListener('mouseup', deselectFish);
                document.body.addEventListener('mouseleave', deselectFish);
                return false;
            })
        }
        this.div.addEventListener('mouseup', () => {
            console.log("salut");
        })
    }
}

function mouseMoveEvent(event, fish) {
    console.log("fish: ", fish);
    console.log("event", event);
}

function deselectFish() {
    console.log("je mange des galettes")
    document.body.removeEventListener('mousemove', mouseMoveEvent)
    document.body.removeEventListener('mouseup', deselectFish)
    document.body.removeEventListener('mouseleave', deselectFish)
}