exports.getChatHistory=async (req)=>{
    let {size,last}=req.query;
    let {search}=req.body;
    let data=await user_provider.getChatHistory(req.user._id,search,size,last);
    for(let i=0;i<data.length;i++){
        let history=data[i];
        if(history.direction.startsWith(req.user._id.toString()+'-')){
            history.unread=0;
        }
        history.user=(history.user1._id==req.user._id.toString())?history.user2:history.user1;
        history.user.photo_url=getProfilePhotoURL(history.user,'photo')//.profile.photo?('uploads/profile_photo/'+history.user.profile.photo):'');
        delete history.user1;
        delete history.user2;
        data[i]=history;
    }
    return {
        data,
        extra:{
            last: data.length?data[data.length-1]._id:last
        }
    }
}
exports.getMessages=async (req)=>{
    let {size,last}=req.query;
    let list=await user_provider.getMessageForUser(req.user._id,req.params.user_id,false,size,last);
    for(let i=0;i<list.length;i++){
        let data=list[i];
        if(data.to_user==req.user._id.toString()){//if(data.to_user._id==req.user._id.toString()){
            data.for_me=true;
            data.read=data.read || false;
        }else{
            data.for_me=false;
            data.read=true;
        }
        //data.from_user.id=data.from_user._id;
        //data.from_user.profile.photo_url=getProfilePhotoURL(data.from_user)// (data.from_user.profile.photo?('uploads/profile_photo/'+data.from_user.profile.photo):'assets/img/user.png');
        //data.to_user.id=data.to_user._id;
        //data.to_user.profile.photo_url=getProfilePhotoURL(data.to_user)// (data.to_user.profile.photo?('uploads/profile_photo/'+data.to_user.profile.photo):'assets/img/user.png');
        list[i]=data;
    }
    let user_info=await user_provider.getUserSelectedFields(req.params.user_id,'name nickname email age_group');
    
    return {
        data: list,
        extra:{
            last: list.length?list[list.length-1]._id:last,
            user_info
        }
    }
}
exports.updateMessageStatus=async (req)=>{
    await user_provider.updateMessageRead(req.user._id.toString(),req.params.user_id);
    return {
        message: 'Message read'
    };
}
exports.sendMessage=async (req)=>{
    let {content}=req.body;
    let toUser=await user_provider.getUser(req.params.user_id,true)
    let messageData=await user_provider.createMessage(req.user._id,req.params.user_id,content,null);
    await user_provider.createMessageHistory(req.user,toUser,content,messageData.created_at)
    if(!sendToClient(req.params.user_id, 'message', {
        id: messageData.id,
        from_user: {
            ...user_provider.selectUserData(req.user),
            id: req.user._id
        },
        to_user: toUser,
        content,
        for_me: true,
        created_at: messageData.created_at
    })){//user is offline
        //send the same data through fcm
    }
    let data={
        content: messageData.content,
        created_at: messageData.created_at,
        from_user: user_provider.selectUserData(req.user),
        to_user: toUser,
        for_me: false
    };
    return {
        data,
        message: 'Message Sent'
    };
}
