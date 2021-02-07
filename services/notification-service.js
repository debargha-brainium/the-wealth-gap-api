var {user_provider}=require('../database/providers');
const {sendViaFCM,registerDeviceToTopic,unRegisterDeviceToTopic}=require('../system/fcm');
var {snakeToTitle}=require('../utility');

exports.notifyInTopicFCM=async (topic,title,text)=>{
    try{
        await sendViaFCM(false,{
            notification: {
                title: title,
                body: text
            }
        },topic);
        return true;
    }catch(e){
        console.log('FCM error',e);
        return false;
    }
}
var notifyViaFCM=exports.notifyViaFCM=async (user_id,title,text)=>{
    let user_data=await user_provider.getUserSelectedFields(user_id,'device_tokens')
    let device_token='';
    console.log(user_data.device_tokens)
    if(user_data.device_tokens && user_data.device_tokens.length){
        device_token=user_data.device_tokens;//[user_data.device_tokens.length-1]
    }else{
        return false;
    }
    try{
        await sendViaFCM(device_token,{
            //to: device_token, // required fill with device token or topics
            //collapse_key: 'your_collapse_key', 
            //data: {
            //    your_custom_data_key: 'your_custom_data_value'
            //},
            notification: {
                title: title,
                body: text
            }
        },false);
        return true;
    }catch(e){
        console.log('FCM error',e);
        return false;
    }
}
exports.login=async (device,role)=>{
    try{ await registerDeviceToTopic(device,role);}catch(e){console.log('Cannot subscribe to FCM topic')}
}
exports.logout=async (device,role)=>{
    try{ await unRegisterDeviceToTopic(device,role);}catch(e){console.log('Cannot unsubscribe to FCM topic')}
}

exports.notifyOnly=async (user_id,type,text,extra)=>{
    let notification=await user_provider.createNotification(user_id,type,"Notification",text,extra);
    return sendToClient(user_id, 'notification', notification)
}
exports.notify=async (user_id,type,text,extra,title)=>{
    let notification=await user_provider.createNotification(user_id,type,title || "Notification",text,extra);
    let isPresent=sendToClient(user_id, 'notification', notification)
    //if(!isPresent){
        await notifyViaFCM(user_id,title || snakeToTitle(type),text);
        /*let user_data=await user_provider.getUserSelectedFields(user_id,'device_tokens role')
        let device_token='';
        console.log(user_data.device_tokens)
        if(user_data.device_tokens && user_data.device_tokens.length){
            device_token=user_data.device_tokens;//[user_data.device_tokens.length-1]
        }else{
            return false;
        }
        //send via fcm
        try{
            await sendViaFCM(device_token,{
                //to: device_token, // required fill with device token or topics
                //collapse_key: 'your_collapse_key', 
                //data: {
                //    your_custom_data_key: 'your_custom_data_value'
                //},
                notification: {
                    title: ,
                    body: text
                }
            });
        }catch(e){
            console.log('FCM error',e);
        }*/
    //}
}
exports.createNotificationInput=(user_id,type,text,extra)=>{
    let data = {
        user: user_id,
        notification_type: type,
        title: 'Notification',
        content: text,
    };
    if(extra) data.extra=extra;
    return data;
}
exports.notifyMany=async (arr)=>{
    let notifications=await user_provider.createNotifications(arr);
    for(let i=0;i<notifications.length;i++){
        if(!sendToClient(notifications[i].user.toString(), 'notification', notifications[i])){
            //send via fcm
        }
    }
}