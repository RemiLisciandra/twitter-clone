import { PrismaClient } from "@prisma/client";

// Dans le contexte des déclarations de variables globales, l'utilisation de "var" est acceptable et nécessaire.
declare global {
    var prisma: PrismaClient | undefined;
}