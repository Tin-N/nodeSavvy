var express = require('express');
var router = express.Router();
const feedbackController = require('../../Component/Feedback/feedbackController');
const {validationAddFeeback} = require('../../middleware/validation')
// http://localhost:3000/Api/feedbackAPI/addFeedback
router.post('/addFeedback', [validationAddFeeback],async (req, res, next) => {
    try {
        let { body } = req;
        const { productID, userID, rating, feedback, reply } = body;
        await feedbackController.addFeedback(productID, userID, rating, feedback, reply);
        return res.status(200).json({
            result: true
        })
    } catch (error) {
        console.log('Không thể thêm bình luận(Api): ' + error);
        return res.status(500).json({
            result: false,
            message: 'Không thêm được bình luận(Api catch)'
        })
    }
});
// http://localhost:3000/API/feedbackAPI/addReply
router.post('/addReply', async (req, res, next) => {
    try {
        let {body} = req;
        const {feedbackID, userID, reply} = body;
        await feedbackController.addReply(feedbackID, userID, reply);
        return res.status(200).json({
            result:true
        })
    } catch (error) {
        console.log('Không thể trả lời bình luận(Api): '+error);
        return res.status(500).json({
            result:false,
            message: 'Không trả lời bình luận(Api catch)'
        })
    }
})
router.get('/getFeedbackByProductID', async (req, res, next) => {
    try {
        const {id} = req.query;
        const feedbacks = await feedbackController.getFeedbackByProductID(id); 
        return res.status(200).json({
            result: true,
            feedbacks: feedbacks
        })
    } catch (error) {
        console.log('getFeedbackByProductID error(Api catch): '+console.error());
        return res.status(500).json({
            result:false,
            message: 'getFeedbackByProductID error(Api)'
        })
    }
})
module.exports = router;