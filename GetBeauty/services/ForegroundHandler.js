import React, { useEffect } from "react"
import { Alert } from "react-native"
import messaging from '@react-native-firebase/messaging';
import PushNotification, { Importance } from 'react-native-push-notification';


const ForegroundHandler = () => {
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
            const { messageId, notification } = remoteMessage

            PushNotification.localNotification(
                {
                    channelId: "channel-id", // (required)
                    id: messageId,
                    title: notification.title,
                    body: notification.body,
                    soundName:"default",
                    playSound: true,
                    vibrate: true, 
                },

            );
        });

        return unsubscribe;
    }, []);
    return null
}

export default ForegroundHandler