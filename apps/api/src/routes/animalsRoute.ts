import { Router, Request, Response } from "express";
const route = Router();

route.get("/", (req: Request, res: Response) => {
  res.json([
    {
      name: "Lion",
      class: "Mammal",
      diet: "Carnivore",
      habitat: "Savannas and grasslands",
    },
    {
      name: "Elephant",
      class: "Mammal",
      diet: "Herbivore",
      habitat: "Savannas, forests, and deserts",
    },
    {
      name: "Gorilla",
      class: "Mammal",
      diet: "Herbivore",
      habitat: "Forests",
    },
    {
      name: "Tiger",
      class: "Mammal",
      diet: "Carnivore",
      habitat: "Forests, grasslands, and swamps",
    },
    {
      name: "Kangaroo",
      class: "Mammal",
      diet: "Herbivore",
      habitat: "Savannas and grasslands",
    },
  ]);
});

export default route;
