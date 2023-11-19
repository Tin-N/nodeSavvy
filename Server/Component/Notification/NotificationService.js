const notificationModel = require('./NotificationModel');

//thong bao tu choi duyet
const rejectNotification = async (userID, productID, notification ) => {
    try {
      const newNotification = {userID, productID, notification };
      const c = new notificationModel(newNotification);
      await c.save();
      return true;
  
    } catch (error) {
      console.log('New notification error: ', error);
      return false;
    }
  }


module.exports = {rejectNotification};