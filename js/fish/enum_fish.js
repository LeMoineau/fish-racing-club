
// constructor(name, rotSpe, moneyByRot, moneyToBuy, img);

class PoissonRouge extends Fish {
    constructor() {
        super("Poisson-rouge", 5, 1, "ressources/img/multicolor.png");
    }
}

class PoissonClown extends Fish {
    constructor() {
        super("Poisson-Clown", 6, 2, "ressources/img/fish2.jfif");
    }
}

class PoissonSquelette extends Fish {
    constructor() {
        super("Arete-de-poisson", 7, 4, "ressources/img/poissonSkeleton.webp");
    }
}

enum_fish = [PoissonRouge, PoissonClown, PoissonSquelette]