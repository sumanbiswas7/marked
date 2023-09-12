import { sliceText } from "./slice-text";

export function truncateEmail(email: string, maxLength: number) {
   if (email.length <= maxLength) return email;

   const atIndex = email.indexOf("@");

   // If there's no '@' in the email, just truncate it to maxLength without adding '...'
   if (atIndex === -1) return sliceText(email, maxLength, false);

   const username = email.slice(0, atIndex);
   const allowedUsernameLength = maxLength - (email.length - atIndex);
   const strAfterAt = email.slice(atIndex + 1); // @gmail.com

   return `${sliceText(username, allowedUsernameLength, true)}@${strAfterAt}`;
}
