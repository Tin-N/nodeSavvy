const notificationService = require('./NotificationService');

const rejectNotification = async (userID, productID, notification) => {
    try {
        return await notificationService.rejectNotification(userID, productID, notification);
    } catch (error) {
        return false;
    }
}

module.exports = {rejectNotification};