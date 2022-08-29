// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');


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

class CustomPushEvent extends Event {
    constructor(data) {
        super('push');

        Object.assign(this, data);
        this.custom = true;
    }
}

self.addEventListener('push', (e) => {
    // Skip if event is our own custom event
    if (e.custom) return;

    // Kep old event data to override
    const oldData = e.data;

    // Create a new event to dispatch, pull values from notification key and put it in data key,
    // and then remove notification key
    const newEvent = new CustomPushEvent({
        data: {
            ehheh: oldData.json(),
            json() {
                const newData = oldData.json();
                newData.data = {
                    ...newData.data,
                    ...newData.notification,
                };
                delete newData.notification;
                return newData;
            },
        },
        waitUntil: e.waitUntil.bind(e),
    });

    // Stop event propagation
    e.stopImmediatePropagation();

    // Dispatch the new wrapped event
    dispatchEvent(newEvent);
});

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const {title, body, icon, ...restPayload} = payload.data;

    const notificationOptions = {
        body,
        icon: icon || '/img.png', // path to your "fallback" firebase notification logo
        data: restPayload,
    };

    return self.registration.showNotification(title, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
    // console.log('[firebase-messaging-sw.js] notificationclick ', event); // debug info

    // click_action described at https://github.com/BrunoS3D/firebase-messaging-sw.js#click-action
    if (event.notification.data && event.notification.data.click_action) {
        self.clients.openWindow(event.notification.data.click_action);
    } else {
        self.clients.openWindow(event.currentTarget.origin);
    }

    // close notification after click
    event.notification.close();
});