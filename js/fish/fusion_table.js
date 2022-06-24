
FUSION_TABLE = [
    { terms: [PoissonRouge, PoissonRouge], result: PoissonClown },
    { terms: [PoissonClown, PoissonClown], result: PoissonSquelette }
]

/**
 * Fusion 2 fish to make a new one
 * @param {Fish} fish1 first term of the fusion recipe
 * @param {Fish} fish2 second term of the fusion recipe
 * @returns the new fish formed by the fusion of the 2 above or null if the recipe dont exist
 */
function fusion(fish1, fish2) {
    currentFusion = FUSION_TABLE.find(f => f.terms.find(t => fish1 instanceof t) !== undefined 
                                        && f.terms.find(t => fish2 instanceof t) !== undefined)
    if (currentFusion !== undefined) {
        return new currentFusion.result();
    } 
    return null;
}