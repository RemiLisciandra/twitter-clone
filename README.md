<h1>Clone Twitter with Next JS </h1>

<h3>Cloning the Repository</h3>

<em>Using an HTTP request :</em>

```git clone https://github.com/RemiLisciandra/twitter-clone.git```

<em>Using SSH :</em>

```git clone git@github.com:RemiLisciandra/twitter-clone.git```

<h3>Installing Dependencies</h3>

```npm i```

<h3>Environment Configuration</h3>

<em>Create a .env file at the root of the project and set the following environment variables : </em>

```DATABASE_URL="url"```

<em>Replace "your-database-url" with the URL of your database. You can also define other environment variables in this file if needed.</em>

<h3>Database deployment</h3>

<em>This project requires the use of MongoDB as the database.</em>

<em>To create the database, run the following command in your terminal :</em>

```npx prisma db push```

<h3>Application Deployment</h3>

<em>To deploy the application, you can use a deployment platform like Vercel, which supports Next.js projects.</em>

<em>Check Vercel's documentation for more information on deploying your Next.js application.</em>

<h3>Starting the Application</h3>

<em>To start the application, run the following command in your terminal :</em>

```npm run dev```

<em>This command starts the Next.js development server and opens the application in your default browser.</em>
