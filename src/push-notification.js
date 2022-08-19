// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getMessaging, getToken, onMessage} from "firebase/messaging";
import {getAnalytics} from "firebase/analytics";
import {saveTokenFCM} from "./hooks/PostDataApi";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
const analytics = getAnalytics(app);

export const fetchToken = () => {
    return getToken(messaging, {vapidKey: 'BL3pWSm96zELSrqYPmoOSueafufpuNFy1RKX5Fq1DgWJTIPi5UZSV_Zq90vl1rzWxmLu_4oXmYq_njPwJ2o2iRE'}).then((currentToken) => {
        if (currentToken) {
            if (localStorage.getItem('tokenPushNotification') !== currentToken && localStorage.getItem('authTokenAcess')) {
                localStorage.setItem('tokenPushNotification', currentToken)
                saveTokenFCM(currentToken)
            }
            // Track the token -> client mapping, by sending to backend server
            // show on the UI that permission is secured
        } else {
            console.log('No registration token available. Request permission to generate one.');
            localStorage.removeItem('tokenPushNotification')
            // shows on the UI that permission is required
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
    });
}
export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });