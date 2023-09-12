export function sliceText(
   str: string | undefined | null,
   maxLen: number,
   threeDots?: boolean
): string | null {
   if (!str) return null;

   if (str.length <= maxLen) return str;

   if (threeDots && maxLen >= 3) {
      return str.slice(0, maxLen - 3) + "...";
   }

   return str.slice(0, maxLen);
}
