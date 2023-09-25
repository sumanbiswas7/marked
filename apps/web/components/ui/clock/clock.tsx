"use client";

import moment from "moment";
import React, { useState, useEffect } from "react";
import styles from "./clock.module.scss";
import { IconSunHigh, IconMoon } from "@tabler/icons-react";
import { useTheme } from "../../../hooks/use-theme";

export function Clock(): JSX.Element {
   const { theme } = useTheme();
   const [time, setTime] = useState(moment());

   useEffect(() => {
      // Update the time every second
      const intervalId = setInterval(() => {
         setTime(moment());
      }, 1000);

      // Cleanup the interval when the component unmounts
      return () => clearInterval(intervalId);
   }, []);

   const formattedTime = time.format("hh.mm A");

   // Get the current hour in 24-hour format
   const currentHour = time.hour();
   // Determine whether it's daytime (between 6 AM and 6 PM)
   const isDaytime = currentHour >= 6 && currentHour < 18;

   return (
      <div className={styles.container}>
         <h1>{formattedTime}</h1>
         <div className={`${styles.icon_box} ${isDaytime ? styles.icon_sun : styles.icon_moon}`}>
            {isDaytime ? (
               <IconSunHigh size={18} color={theme.text.shade1} />
            ) : (
               <IconMoon size={18} color={theme.text.shade3} />
            )}
         </div>
      </div>
   );
}
