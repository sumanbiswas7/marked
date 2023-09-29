"use client";

import { useAuthUser } from "../../hooks/use-auth-user";
import BioPage from "../[bio]/page";
import styles from "./profile.module.scss";

export default function ProfilePage() {
   const { error, loading, user } = useAuthUser();

   if (error) return <p>{error.message}</p>;
   if (loading) return <p>Loading...</p>;

   return <BioPage isEdit />;
}
