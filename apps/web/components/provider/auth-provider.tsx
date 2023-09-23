"use client";

import React, { createContext, useState } from "react";
import { User } from "@marked/types";

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({ children }: Props) {
   const [user, setUser] = useState<User | null>(null);

   return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}

/**
 * ------------------
 *      Types
 * ------------------
 */
export type AuthContextType = {
   user: User | null;
   setUser: React.Dispatch<React.SetStateAction<User | null>>;
};
interface Props {
   children: React.ReactNode;
}
