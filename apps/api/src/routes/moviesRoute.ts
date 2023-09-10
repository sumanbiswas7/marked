import { Router, Request, Response } from "express";
const route = Router();

route.get("/", (req: Request, res: Response) => {
   res.json([
      {
         title: "The Shawshank Redemption",
         year: 1994,
         genres: ["Drama"],
         rating: 9.2,
      },
      {
         title: "The Godfather",
         year: 1972,
         genres: ["Crime", "Drama"],
         rating: 9.2,
      },
      {
         title: "The Dark Knight",
         year: 2008,
         genres: ["Action", "Crime", "Drama"],
         rating: 9.0,
      },
      {
         title: "The Godfather: Part II",
         year: 1974,
         genres: ["Crime", "Drama"],
         rating: 9.0,
      },
      {
         title: "The Lord of the Rings: The Return of the King",
         year: 2003,
         genres: ["Action", "Adventure", "Fantasy"],
         rating: 9.0,
      },
   ]);
});

export default route;
