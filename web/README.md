# Show temperature and humidity values on HTML web page

### Table of content
1. [Setup](#setup)
2. [Start](#start)
3. [Build](#build)
4. [Deploy](#deploy)

### Setup
You’ll need to have Node 20.10.0 on your local development machine. You can use nvm (macOS/Linux) or nvm-windows to switch Node versions between different projects. Move on `/web` folder and run the following command:
```bash
nvm use
```

After that, run the following command to install all dependencies:
```bash
npm install
```

You'll need to creates the dotenv file to the web app project root (`/web`):
```
REACT_APP_FIREBASE_API_KEY=<FIREBASE_API_KEY>
REACT_APP_FIREBASE_AUTH_DOMAIN=<FIREBASE_AUTH_DOMAIN>
REACT_APP_FIREBASE_DATABASE_URL=<FIREBASE_DATABASE_URL>
REACT_APP_FIREBASE_PROJECT_ID=<FIREBASE_PROJECT_ID>
REACT_APP_FIREBASE_STORAGE_BUCKET=<FIREBASE_STORAGE_BUCKET>
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<FIREBASE_MESSAGING_SENDER_ID>
REACT_APP_FIREBASE_APP_ID=<FIREBASE_APP_ID>
```
The file must be named `.env`.

These values can you download from `Firebase console > Project settings > General`, scroll down and click on `Add app` and select web app. You need to follows the instructions to create and register a Firebase app.

### Start
To run the project on your local development machine, move to `/web` folder where the package.json file stored, run the following command:
```bash
npm run start
```

Open the browser and paste the following url to see the web app `http://localhost:3000/`.

### Build
To build the project, run the following command:
```bash
npm run build
```

### Deploy
Run the following command:
```bash
npm run deploy
```
You'll need to Firebase login from terminal to deploy your web app.