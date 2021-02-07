const {register_callback,set_reminder,remove_reminder} = require('../system/reminder');
/////////////////////////////////////
//     reminders
/////////////////////////////////////
var {booking_provider,user_provider}=require('../database/providers');
var {notify}=require('./notification-service');
const reminderTypes={
    PERIOD_ALERT: 'PERIOD_ALERT',
    INCOMPLETE_BOOKING: 'INCOMPLETE_BOOKING',
};
exports.createPeriodAlert=(user_id, timestamp)=>{
    set_reminder(reminderTypes.PERIOD_ALERT,user_id,timestamp);
}
exports.removePeriodAlert=(user_id)=>{
    remove_reminder(reminderTypes.PERIOD_ALERT,user_id);
}
register_callback(reminderTypes.PERIOD_ALERT,async (user_id)=>{
    try{
        /*let booking=await booking_provider.updateBookingStatus(booking_id,booking_provider.bookingStatuses.COMPLETED);
        if(booking){
            await notification_service.notify(booking.user,user_provider.notificationTypes.booking_completed,'Your booking has been completed',booking_id)
        }*/
        // let booking=await booking_provider.getBooking(booking_id,false,false);
        // if(booking){
            // await notification_service.notify(booking.vendor,user_provider.notificationTypes.booking_completed,'Booking time of #'+booking.booking_number+' has been passed',booking_id)
        // }
        await notify(user_id, 'alert', 'Period starting soon', 'Periods');
        console.log('reminder notification sent to', user_id);
    }catch(e){
        console.log(e);
    }
});
// exports.create_booking_for_delete=(booking_id,timestamp)=>{
//     set_reminder(reminderTypes.INCOMPLETE_BOOKING,booking_id,timestamp);
// }
// exports.cancel_booking_for_delete=(booking_id)=>{
//     remove_reminder(reminderTypes.INCOMPLETE_BOOKING,booking_id);
// }
register_callback(reminderTypes.INCOMPLETE_BOOKING,async (booking_id)=>{
    try{
        let booking=await booking_provider.getBooking(booking_id,false,false);
        if(booking && !booking.paid){
            sendToClient(booking.user,'timeout',{booking_id});
            await booking_provider.deleteBooking(booking_id);
        }
    }catch(e){
        console.log(e);
    }
})
//exports.reminderTypes=reminderTypes;
