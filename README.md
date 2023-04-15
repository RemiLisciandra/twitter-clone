<h2 style="color: orange">Clonage de twitter avec Next JS</h2>

**Cloning the Repository**

Using an HTTP request :

```git clone https://github.com/RemiLisciandra/twitter-clone.git```

Using SSH :

```git clone git@github.com:RemiLisciandra/twitter-clone.git```

**Installing Dependencies**

```npm i```

**Configuration de l'environnement**

Create a .env file at the root of the project and set the following environment variables :

```DATABASE_URL="url"```

Replace "your-database-url" with the URL of your database. You can also define other environment variables in this file if needed.

**Déploiement de la base de données**

This project requires the use of MongoDB as the database.

To create the database, run the following command in your terminal :

```npx prisma db push```

**Application Deployment**

To deploy the application, you can use a deployment platform like Vercel, which supports Next.js projects. 

Check Vercel's documentation for more information on deploying your Next.js application.

**Starting the Application**

To start the application, run the following command in your terminal:

```npm run dev```

This command starts the Next.js development server and opens the application in your default browser.
