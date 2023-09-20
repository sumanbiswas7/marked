export function getAccessToken() {
   const token = localStorage.getItem("access_token");
   if (!token) return { error: true, token, message: "no token found" };
   return { error: false, token, message: null };
}
