// Scripts for firebase and firebase messaging
import {getMessaging} from "firebase/messaging";
import {onBackgroundMessage} from "firebase/messaging/sw";
import {initializeApp} from "firebase/app";

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseApp = initializeApp({
    apiKey: "AIzaSyA-HGW2GVU474Q92cjoMyq9g6lD4bKK3vU",
    authDomain: "masc-hour-banc.firebaseapp.com",
    projectId: "masc-hour-banc",
    storageBucket: "masc-hour-banc.appspot.com",
    messagingSenderId: "956264474936",
    appId: "1:956264474936:web:a3300733f2c287e11e79cd",
    measurementId: "G-JWHG9HJRBH"
});

// Retrieve firebase messaging
const messaging = getMessaging(firebaseApp);
onBackgroundMessage(messaging, (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/img.png",
        badge: "/badge_128.png"
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});