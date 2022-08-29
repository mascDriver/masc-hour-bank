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
        icon: payload.data.icon || "/img.png",
        badge: payload.data.badge || "/badge_128.png",
        click_action: payload.data.click_action
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});

function handleClick (event) {
  event.notification.close();
  // Open the url you set on notification.data
  clients.openWindow(event.notification.data.url || event.notification.data.click_action)
}
self.addEventListener('notificationclick', handleClick);