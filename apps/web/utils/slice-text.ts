export function sliceText(
   str: string | undefined | null,
   maxLen: number,
   threeDots?: boolean
): string | null {
   // BUG: If there's a space at the end it's getting counted with maxLen
   if (!str) return null;
   if (str.length <= maxLen) return str;
   if (threeDots) return str.slice(0, maxLen + -3) + "...";
   else return str.slice(0, maxLen);
}
