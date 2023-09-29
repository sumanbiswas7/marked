export interface User {
   id: string;
   createdAt: string;
   updatedAt: string;
   name: string;
   email: string;
   age: number | null;
   image: string | null;
   views: number;
   social: Social | null;
   about: string | null;
   username: string | null;
}

export interface Notification {
   id: string;
   createdAt: string;
   updatedAt: string;
   on: string; // future date
   forId: string; // eg: id of the link
   forType: string; // eg: Link
   forTitle: string; // eg: Books to read
   forNote: string; // eg: gotta read the book
   userId: string;
}

export interface Social {
   id: string;
   createdAt: string;
   updatedAt: string;
   instagram: string | null;
   github: string | null;
   facebook: string | null;
   tiktok: string | null;
   twitter: string | null;
   snapchat: string | null;
   leetcode: string | null;
   youtube: string | null;
   portfolio: string | null;
   linkedin: string | null;
   userId: string;
   other: OtherLink[];
}

export interface OtherLink {
   id: string;
   createdAt: string;
   name: string;
   link: string;
   socialId: string | null;
}
