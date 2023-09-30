export function isValidImageUrl(url: string) {
   // Create a new Image object to check if the URL is valid
   const img = new Image();
   img.src = url;

   // Return true if the URL is a valid image, otherwise false
   return img.complete && img.naturalWidth !== 0;
}
