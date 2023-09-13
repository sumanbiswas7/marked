export const COLORS: MyTheme = {
   colorScheme: "light",
   borderSwatch: "#DBDBDB",
   textSwatch: "#2E2E2E",
   textLightSwatch: "#909090",
   textLight2Swatch: "#EEEEEE",
   green: "#89DC7C",
   red: "#F36C6C",
   background: "#fff",
};

// Not in use
export const DARK_THEME: MyTheme = {
   colorScheme: "dark",
   borderSwatch: "#3B3B3B",
   textSwatch: "#C5C5C5",
   textLightSwatch: "#BCBCBC",
   textLight2Swatch: "#787878",
   green: "#89DC7C",
   red: "#F36C6C",
   background: "#232323",
};

interface MyTheme {
   colorScheme: "light" | "dark";
   borderSwatch: string;
   textSwatch: string;
   textLightSwatch: string;
   textLight2Swatch: string;
   green: string;
   red: string;
   background: string;
}
