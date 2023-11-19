var express = require('express');
var router = express.Router();
const notificationController = require('../../Component/Notification/NotificationController')

//thong bao tu choi or dong y duyet product
// http://localhost:3000/Api/notificationApi/notification
router.post('/notification', async (req, res, next) => {
    try {
        let { body } = req;
        const { userID, productID, notification } = body;
        await notificationController.rejectNotification(userID, productID, notification);
        return res.status(200).json("thong bao thanh cong");
    } catch (error) {
        console.log('New product error: ', error);
        return res.status(500).json("thong bao that bai");
    }
});


module.exports = router;