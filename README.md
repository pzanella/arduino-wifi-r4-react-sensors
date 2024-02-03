# Arduino UNO Wifi Rev4 send data to Firebase

### Table of content
1. [Setup](#setup)
    * [Firebase console](#firebase-console)
    * [Arduino script](#arduino-script)
2. [Web app project](#react-project)

### Setup
#### Firebase console
You'll need to add a new project in Firebase console.
Open this url `https://console.firebase.google.com/`, you use your credentials to login.
Add the Realtime database and change the rules as follow:
```json
{
  "rules": {
    ".read": "true",
    ".write": "auth != null"
  }
}
```
Click on `Public` button to publish the new rules.

Add the Hosting service to deploy your web app.

#### Arduino script
You'll need to creates a file named `credentials.h` to the arduino script root (`/arduino-script`), and add the following content:
```
#define WIFI_SSID <YOUR-WIFI-SSID>
#define WIFI_PASSWORD <YOUR-WIFI-PASSWORD>
#define FIREBASE_AUTH <YOUR-FIREBASE-AUTHENTICATION-CODE>
```
where:
* `<YOUR-WIFI-SSID>`, it's the wifi SSID;
* `<YOUR-WIFI-PASSWORD>`, it's the wifi password;
* `<YOUR-FIREBASE-AUTHENTICATION-CODE>`, it's the Realtime Database authentication secret.
To creates the Realtime Database authentication secret you move to `Firebase console > Project settings > Service accounts > Database secret` and click on `Add secret`, you have to copy this secret code.

#### Show temperature and humidity values on HTML web page
You can read the specific documentation [here](/web/README.md).