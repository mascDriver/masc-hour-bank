// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');


// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyA-HGW2GVU474Q92cjoMyq9g6lD4bKK3vU",
    authDomain: "masc-hour-banc.firebaseapp.com",
    databaseURL: 'https://masc-hour-banc.firebaseio.com',
    projectId: "masc-hour-banc",
    storageBucket: "masc-hour-banc.appspot.com",
    messagingSenderId: "956264474936",
    appId: "1:956264474936:web:a3300733f2c287e11e79cd",
    measurementId: "G-JWHG9HJRBH"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: "/img.png",
        badge: "/badge_128.png"
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});