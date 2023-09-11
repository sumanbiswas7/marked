export function lightenHexColor(hexColor: string, percent: number) {
   // Remove the '#' character if it's present
   hexColor = hexColor.replace(/^#/, "");

   // Parse the hex color into its RGB components
   const red = parseInt(hexColor.slice(0, 2), 16);
   const green = parseInt(hexColor.slice(2, 4), 16);
   const blue = parseInt(hexColor.slice(4, 6), 16);

   // Calculate the new RGB values for the lighter shade
   const newRed = Math.min(255, red + (255 - red) * (percent / 100));
   const newGreen = Math.min(255, green + (255 - green) * (percent / 100));
   const newBlue = Math.min(255, blue + (255 - blue) * (percent / 100));

   // Convert the new RGB values back to a hex color
   const newHexColor = `#${Math.round(newRed)
      .toString(16)
      .padStart(2, "0")}${Math.round(newGreen)
      .toString(16)
      .padStart(2, "0")}${Math.round(newBlue).toString(16).padStart(2, "0")}`;

   return newHexColor;
}
