"use client";

import { Grid } from "@mantine/core";
import { CategoryCard } from "../../../components/ui/category-card/category-card";
import styles from "./links.module.scss";

export default function DashboardLinksPage(): JSX.Element {
   return (
      <div>
         <h1>Links</h1>

         {/* Small to mid - 2 cols, mid to lg - 3 cols, more than lg - 4 cols */}
         <Grid>
            <Grid.Col sm={6} md={4} lg={3}>
               <CategoryCard
                  title="Movies to Watch"
                  date="2nd Sept"
                  bgCol="#FFCEAA"
               />
            </Grid.Col>
            <Grid.Col sm={6} md={4} lg={3}>
               <CategoryCard
                  title="Movies to Watch"
                  date="2nd Sept"
                  bgCol="#A7F294"
               />
            </Grid.Col>
            <Grid.Col sm={6} md={4} lg={3}>
               <CategoryCard
                  impotant
                  title="Movies to Watch"
                  date="2nd Sept"
                  bgCol="#AAD6FF"
               />
            </Grid.Col>
            <Grid.Col sm={6} md={4} lg={3}>
               <CategoryCard
                  title="Movies to Watch"
                  date="2nd Sept"
                  description="list of all movies I wanna watch this sum"
                  impotant
                  bgCol="#FFAAAA"
               />
            </Grid.Col>
            <Grid.Col sm={6} md={4} lg={3}>
               <CategoryCard
                  title="Movies to Watch"
                  date="2nd Sept"
                  bgImg="https://wallpapers.com/images/featured/movie-9pvmdtvz4cb0xl37.jpg"
               />
            </Grid.Col>
         </Grid>
      </div>
   );
}
