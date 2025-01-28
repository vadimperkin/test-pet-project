export function createPositiveIngredients({
    size,
    flavour,
    sauce,
    topping,
    quantity,
}: Ingredients): Ingredients {
    if (quantity <= 1) {
        throw new Error("Quantity must be greater than 1");
    }
    return {
        size,
        flavour,
        sauce,
        topping,
        quantity,
    };
}