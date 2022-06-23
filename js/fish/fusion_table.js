
FUSION_TABLE = [
    { terms: [PoissonRouge, PoissonRouge], result: PoissonClown }
]

function fusion(fish1, fish2) {
    currentFusion = FUSION_TABLE.find(f => f.terms.find(t => fish1 instanceof t) !== undefined 
                                        && f.terms.find(t => fish2 instanceof t) !== undefined)
    if (currentFusion !== undefined) {
        return new currentFusion.result();
    } 
    return null;
}