export function sliceText(
   str: string | undefined | null,
   maxLen: number,
   threeDots?: boolean
): string | null {
   if (!str) return null;

   if (str.length <= maxLen) return str;

   if (threeDots && maxLen >= 3) {
      // Calculate the space available for the text and "..."
      const availableSpace = maxLen - 3;

      // Check if there's enough space to add "..."
      if (availableSpace <= 0) {
         return "...".slice(0, maxLen);
      }

      // Find the last space before availableSpace
      const lastSpaceIndex = str.lastIndexOf(" ", availableSpace);

      if (lastSpaceIndex !== -1) {
         // Add "..." after the last space
         return (
            str.slice(0, lastSpaceIndex) +
            "...".slice(0, maxLen - lastSpaceIndex)
         );
      } else {
         // If no space is found, pad with spaces and add "..."
         return (
            str.slice(0, availableSpace) +
            "...".slice(0, maxLen - availableSpace)
         );
      }
   }

   // If not using "..." or maxLen is too small for "..." to fit, just slice up to maxLen
   return str.slice(0, maxLen);
}
