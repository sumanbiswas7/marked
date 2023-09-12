export function sliceText(
   str: string | undefined | null,
   maxLen: number,
   threeDot?: boolean
): string | null {
   if (!str) return null;

   let res: string | null = null;

   if (threeDot) {
      res = str.slice(0, 40) + "...";
   } else {
      if (str.length > maxLen) res = str.slice(0, 43);
   }

   return res;
}
