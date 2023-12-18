var express = require('express');
var router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

// const notificationController = require('../../Component/Notification/NotificationController')
const statisticAdmin=require("../../Component/Statistic/StatisticAdmin")
//thong bao tu choi or dong y duyet product
// http://localhost:3000/Api/statisticAdmin/create-ObjectID

router.get('/create-ObjectID', async (req, res, next) => {
    try {
       const result= ObjectId.createFromTime(1702238051);
        return res.status(200).json({result:true,data:result,message:"thong bao thanh cong"});
    } catch (error) {
        console.log('New product error: ', error);
        return res.status(500).json("thong bao that bai");
    }
});
// http://localhost:3000/Api/statisticAdmin/get-statistic-by-week
router.get('/get-statistic-by-week', async (req, res, next) => {
    try {
       const result= await statisticAdmin.getStatisticRevenueByWeek();
        return res.status(200).json({result:true,data:result,message:"thong bao thanh cong"});
    } catch (error) {
        console.log('New product error: ', error);
        return res.status(500).json("thong bao that bai");
    }
});
// http://localhost:3000/Api/statisticAdmin/get-statistic-by-week
router.get('/get-statistic-by-month', async (req, res, next) => {
    try {
       const result= await statisticAdmin.getStatisticRevenueByMonth();
        return res.status(200).json({result:true,data:result,message:"thong bao thanh cong"});
    } catch (error) {
        console.log('New product error: ', error);
        return res.status(500).json("thong bao that bai");
    }
});
// http://localhost:3000/Api/statisticAdmin/get-statistic-by-week
router.get('/get-statistic-by-year', async (req, res, next) => {
    try {
       const result= await statisticAdmin.getStatisticRevenueByYear();
        return res.status(200).json({result:true,data:result,message:"thong bao thanh cong"});
    } catch (error) {
        console.log('New product error: ', error);
        return res.status(500).json("thong bao that bai");
    }
});
// http://localhost:3000/Api/statisticAdmin/get-statistic-user-by-year
router.get('/get-statistic-user-by-year', async (req, res, next) => {
    try {
       const result= await statisticAdmin.getStatisticUserByYear();
        return res.status(200).json({result:true,data:result,message:"thong bao thanh cong"});
    } catch (error) {
        console.log('New product error: ', error);
        return res.status(500).json("thong bao that bai");
    }
});
// http://localhost:3000/Api/statisticAdmin/get-statistic-user-by-month

router.get('/get-statistic-user-by-month', async (req, res, next) => {
    try {
       const result= await statisticAdmin.getStatisticUserByMonth();
        return res.status(200).json({result:true,data:result,message:"thong bao thanh cong"});
    } catch (error) {
        console.log('New product error: ', error);
        return res.status(500).json("thong bao that bai");
    }
});
// http://localhost:3000/Api/statisticAdmin/get-statistic-user-by-week

router.get('/get-statistic-user-by-week', async (req, res, next) => {
    try {
       const result= await statisticAdmin.getStatisticUserByWeek();
        return res.status(200).json({result:true,data:result,message:"thong bao thanh cong"});
    } catch (error) {
        console.log('New product error: ', error);
        return res.status(500).json("thong bao that bai");
    }
});



// http://localhost:3000/Api/statisticAdmin/get-total-user

router.get('/get-total-user', async (req, res, next) => {
    try {
       const result= await statisticAdmin.getTotalUser();
        return res.status(200).json({result:true,data:result,message:"thong bao thanh cong"});
    } catch (error) {
        console.log('New product error: ', error);
        return res.status(500).json("thong bao that bai");
    }
});
router.get('/get-total-user-by-year', async (req, res, next) => {
    try {
       const result= await statisticAdmin.getTotalUserByYear();
        return res.status(200).json({result:true,data:result,message:"thong bao thanh cong"});
    } catch (error) {
        console.log('New product error: ', error);
        return res.status(500).json("thong bao that bai");
    }
});
router.get('/get-total-user-by-month', async (req, res, next) => {
    try {
       const result= await statisticAdmin.getTotalUserByMonth();
        return res.status(200).json({result:true,data:result,message:"thong bao thanh cong"});
    } catch (error) {
        console.log('New product error: ', error);
        return res.status(500).json("thong bao that bai");
    }
});
router.get('/get-total-user-by-week', async (req, res, next) => {
    try {
       const result= await statisticAdmin.getTotalUserByWeek();
        return res.status(200).json({result:true,data:result,message:"thong bao thanh cong"});
    } catch (error) {
        console.log('New product error: ', error);
        return res.status(500).json("thong bao that bai");
    }
});
module.exports = router;