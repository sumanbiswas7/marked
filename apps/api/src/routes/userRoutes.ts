import { PrismaClient } from "@prisma/client";
import { Router, Request, Response, NextFunction } from "express";
import { HttpResponse } from "../models/response";
import { HTTP_STATUS } from "@marked/utils";
import { generateJwtToken } from "../lib/jwt";
import { handleError } from "../utils/error-handler";
const route = Router();

route.get("/", async (req: Request, res: Response) => {
   // authentication

   await new Promise((resolve) => setTimeout(resolve, 2000));

   res.json({
      user: {
         id: "1",
         name: "Suman Biswas",
         email: "sumanbiswas99889988@gmail.com",
         createdAt: "Fri Sep 15 2023 21:49:46 GMT+0530",
         updatedAt: "Fri Sep 15 2023 21:49:46 GMT+0530",
         age: null,
         image: null,
         social: {
            instagram: "https://www.youtube.com/",
            github: "https://www.youtube.com/",
            facebook: "https://www.youtube.com/",
            portfolio: "https://www.youtube.com/",
         },
         views: 35,
      },
      categories: [
         {
            id: "1",
            title: "Movies to Watch",
            description: "list of all movies I wanna watch over the week",
            isImportant: false,
            date: "13th Aug",
            image: "https://wallpapers.com/images/featured/movie-9pvmdtvz4cb0xl37.jpg",
            color: "#FFCEAA",
            links: [
               {
                  id: "1",
                  title: "The Godfather",
                  createdAt: "15 Sept",
                  link: "https://www.imdb.com/title/tt0071562/",
               },
               {
                  id: "1",
                  title: null,
                  createdAt: "15 Sept",
                  link: "https://www.imdb.com/title/tt0071562/",
               },
               {
                  id: "1",
                  title: "Barbie",
                  createdAt: "15 Sept",
                  link: "https://www.imdb.com/title/tt0071562/",
               },
            ],
         },
         {
            id: "2",
            title: "Books to Read",
            description:
               "A collection of books I plan to read in the near future.",
            isImportant: false,
            date: "20th Sept",
            image: null,
            color: "#A7F294",
            links: [],
         },
      ],
      notifications: [
         {
            id: "1",
            on: "Fri Sep 15 2023 21:49:46 GMT+0530",
            createdAt: "Fri Sep 15 2023 21:49:46 GMT+0530",
            for: {
               id: "3",
               type: "Category",
               title: "Movies to watch",
               note: "Gotta watch these movies",
            },
         },
      ],
   });
});

/** Login user route */
route.get("/login", async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { email, id } = req.body;
      if (!email || !id) {
         return handleError(
            null,
            null,
            `User Email and ID is required but got email:${email}, id:${id}`
         )(req, res, next);
      }

      const token = await generateJwtToken({ email, id }, req, res, next);
      if (!token) {
         return handleError(null, null, "No token generated")(req, res, next);
      } else {
         const response = new HttpResponse({
            status: HTTP_STATUS.OK,
            message: "Login successfull",
            data: { token },
         });
         res.status(HTTP_STATUS.OK).json(response);
      }
   } catch (error) {
      handleError(error)(req, res, next);
   }
});

route.get("/all", async (req: Request, res: Response) => {
   const prisma = new PrismaClient();

   try {
      const result = await prisma.user.findMany();
      res.json(result);
   } catch (error) {
      console.log("Error", error);
      res.json({ success: false });
   }
});

export default route;
