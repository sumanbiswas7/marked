export const socialThemes = {
   milk: {
      background: {
         texture: "/bio/texture-1.png",
         gradient: ["#1d1d1d", "#f5f5f5"],
      },
      text: "#1d1d1d",
      description: "#9F9F9F",
      icon: {
         fill: "#fff",
         backgdound: "#616161",
      },
      card: {
         background: "#fff",
         border: "#DBDBDB",
      },
      copyright: "#000",
   },
   ocean: {
      background: {
         texture: "/bio/texture-1.png",
         gradient: ["#4C94D4", "#9BC1E1"],
      },
      text: "#fff",
      description: "#CDE8FF",
      icon: {
         fill: "#1d1d1d",
         backgdound: "#fff",
      },
      card: {
         background: "#667380",
         border: "transparent",
      },
      copyright: "#fff",
   },
};

/**
 * ------------------
 *       Types
 * ------------------
 */
export interface SocialTheme {
   background: {
      texture: string;
      gradient: string[];
   };
   text: string;
   description: string;
   icon: {
      fill: string;
      backgdound: string;
   };
   card: {
      background: string;
      border: string;
   };
   copyright: string;
}
