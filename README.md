<h2>Clonage de twitter avec Next JS</h2>

**Clonage du repository**

Avec une requête http : 

```git clone https://github.com/RemiLisciandra/twitter-clone.git```

En SSH : 

```git clone git@github.com:RemiLisciandra/twitter-clone.git```

**Installation des dépendances**

```npm i```

**Configuration de l'environnement**

Créez un fichier .env à la racine du projet et définissez-y les variables d'environnement suivantes :

```DATABASE_URL="url-de-votre-base-de-données"```

Remplacez "url-de-votre-base-de-données" par l'URL de votre base de données. Vous pouvez également définir d'autres variables d'environnement dans ce fichier si nécessaire.

**Déploiement de la base de données**

Pour créer la base de données, exécutez la commande suivante dans votre terminal :
```npx prisma db push```

**Déploiement de l'application :**

Pour déployer l'application, vous pouvez utiliser une plateforme de déploiement comme Vercel, qui prend en charge les projets Next.js. Consultez la documentation de Vercel pour plus d'informations sur le déploiement de votre application Next.js.

**Démarrage de l'application**

Pour démarrer l'application, exécutez la commande suivante dans votre terminal :
```npm run dev```

Cette commande démarre le serveur de développement Next.js et ouvre l'application dans votre navigateur par défaut.