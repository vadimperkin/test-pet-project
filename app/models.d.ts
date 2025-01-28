type DefaultAdmin = {
  defaultAdmin: {
    username: string;
    password: string;
  };
};

type DefaultIngredients = {
  testOptions: {
    ingredients: {
      size: "large" | "medium" | "small";
      flavour: "Cheese" | "Pepperoni" | "Supreme" | "Veggie Delight";
      sauce: "Marinara" | "Buffalo" | "Barbeque";
      topping: "Onions" | "Green Olive" | "Tomatoes";
      quantity: number;
    }[];
  };
};

type Ingredients = {
  size: "large" | "medium" | "small";
  flavour: "Cheese" | "Pepperoni" | "Supreme" | "Veggie Delight";
  sauce: "Marinara" | "Buffalo" | "Barbeque";
  topping: "Onions" | "Green Olive" | "Tomatoes";
  quantity: number;
};

declare global {
  interface ConfigTypes extends DefaultAdmin, DefaultIngredients, Ingredients {}
} // Use in playwright.config.ts as a common type

export {};
