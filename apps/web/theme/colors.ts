export const THEME: MyTheme = {
   colorScheme: "light",
   accent: "#2E2E2E",
   background: "#fff",
   text: {
      shade1: "#2E2E2E",
      shade2: "#909090",
      shade3: "#EEEEEE",
   },
   border: {
      shade1: "#DBDBDB",
      shade2: "#EFEFEF",
   },
   card: {
      shade1: "#DBDBDB",
      shade2: "#EFEFEF",
   },
   green: "#89DC7C",
   red: "#F36C6C",
};

// Not in use
export const DARK_THEME = {
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
   accent: string;
   background: string;
   text: {
      shade1: string;
      shade2: string;
      shade3: string;
   };
   border: {
      shade1: string;
      shade2: string;
   };
   card: {
      shade1: string;
      shade2: string;
   };
   green: string;
   red: string;
}
