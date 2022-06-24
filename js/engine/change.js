
CHANGE_ID_COMPTEUR = 0;

CHANGE_TOPICS = {
    ADDING_FISH: 1,
    FUSION_FISH: 2,
}

class Change {
    constructor(topic, message="", data={}) {
        this.id = CHANGE_ID_COMPTEUR;
        this.topic = topic;
        this.message = message;
        this.data = data;

        CHANGE_ID_COMPTEUR += 1;
    }
}