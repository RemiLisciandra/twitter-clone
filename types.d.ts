import { PrismaClient } from "@prisma/client";

// Dans le contexte des déclarations de variables globales, l'utilisation de "var" est acceptable et nécessaire.
declare global {
    var prisma: PrismaClient | undefined;
}

export type User = {
    id: string;
    lastname?: string;
    firstname?: string;
    username?: string;
    bio?: string;
    email: string;
    emailVerified?: Date;
    image?: string;
    coverImage?: string;
    profileImage?: string;
    hashedPassword?: string;
    createdAt: Date;
    updateAt: Date;
    followingIds: string[];
    hasNotification?: boolean;
}

export type Post = {
    id: string;
    body: string;
    createdAt?: Date;
    updateAt?: Date;
    userId: string;
    likedIds: string[];
    user: User;
    comments: Comment[];
}

export type Comment = {
    id: string;
    body: string;
    createdAt: Date;
    updateAt: Date;
    userId: string;
    postId: string;
    user: User;
    post: Post;
}

export type Notification = {
    id: string;
    body: string;
    userId: string;
    createdAt: Date;
    user: User;
}