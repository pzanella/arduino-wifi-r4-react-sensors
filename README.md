# Arduino UNO Rev4 connect to Realtime Database Firebase

Table of content
1. [Setup](#setup)
    * [Firebase console](#firebase-console)
    * [Arduino script](#arduino-script)
    * [React project](#react-project)

### Setup
#### Firebase console

#### Arduino script
You need to create a file named `credentials.h` to the project root, and add the following content:
```
#define WIFI_SSID <YOUR-WIFI-SSID>
#define WIFI_PASSWORD <YOUR-WIFI-PASSWORD>
#define FIREBASE_AUTH <YOUR-FIREBASE-AUTHENTICATION-CODE>
```

You need to connect to Firebase Console and activates the Realtime Database.

#### React project