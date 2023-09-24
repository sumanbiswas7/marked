import React, { createContext, useState } from "react";
import { Social, Notification } from "@marked/types";

export const AuthUserContext = createContext<AuthUserContextType | null>(null);

export function AuthUserContextProvider({ children }: Props) {
   const [user, setUser] = useState<UserMe | null>(null);

   return <AuthUserContext.Provider value={{ user, setUser }}>{children}</AuthUserContext.Provider>;
}

/**
 * ------------------
 *      Types
 * ------------------
 */
export type AuthUserContextType = {
   user: UserMe | null;
   setUser: React.Dispatch<React.SetStateAction<UserMe | null>>;
};

interface Props {
   children: React.ReactNode;
}

export interface UserMe {
   id: string;
   createdAt: string;
   updatedAt: string;
   name: string;
   email: string;
   age: number | null;
   image: string | null;
   views: number;
   social: Social | null;
   notifications: Notification;
}
