import FCM from "fcm-node";
const serverKey = 'AAAASkp9QyE:APA91bGyROYtC6ki4jnefh5xN9I_7pNOxfQYYEbyr9KTqLSaiaQWlMUU71Q-LxA8i6dmABq39q_dOTjkLctGauFo-0_ZVwiCn2eXKom578213Sq5E5QFpdILdoHcqFHycXNl6MbUtpTQ';
const fcm = new FCM(serverKey);
// var UsereModel = require('../models/user.model');
// NOTIFICATION FUNCTION 
const pushNotification = async (notificationTitle, notificationMsg, deviceToken, count = 0) => {
    //   let action_user = await UsereModel.findOne({_id: action_id});
    var message = {
        to: deviceToken,
        collapse_key: 'AAAANUMQE8c:APA91bFBZXcoBtA5GMrpj3zxkP-UEtqY50RBW2Fa8XOAJJjeUOS4g1LWj2JuK5qiwy7Nkd81wstEl934KoUoZiLEOrGFv_dvtmvrOa-Um2Dd9OrNuJunFaoyuVoGkEd3g9efx8ytdCjt',
        notification: {
            title: notificationTitle,
            body: notificationMsg
        },
        data: {
            count: count,
        }
    };
    fcm.send(message, function (err, response) {
        if (err) {
            console.log(err);
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
};
export default { pushNotification }