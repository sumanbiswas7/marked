export async function setToken(token: string) {
   localStorage.setItem("access_token", JSON.stringify(token));
}

export async function setCache(key: string, data: string) {
   localStorage.setItem(key, JSON.stringify(data));
}

export function getAccessToken() {
   const token = localStorage.getItem("access_token");
   if (!token) return { error: true, token, message: "no token found" };
   const parsedToken = JSON.parse(token);
   return { error: false, token: parsedToken, message: null };
}
