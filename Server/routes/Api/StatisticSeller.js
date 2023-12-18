var express = require('express');
var router = express.Router();

const statisticSeller=require("../../Component/Statistic/StatisticSeller")
//thong bao tu choi or dong y duyet product
// http://localhost:3000/Api/statisticSeller/get-statistic-revenue-by-week
router.get('/get-statistic-revenue-by-week', async (req, res, next) => {
    try {
        const {ownerID}=req.query
        const result =await statisticSeller.getStatisticRevenueByWeek(ownerID);
        console.log(result);

        if(result.length>0)
        return res.status(200).json({result:true,data:result});

        return res.status(200).json({result:false,data:result});

    } catch (error) {
        console.log('New product error: ', error);
        return res.status(500).json("thong bao that bai");
    }
});
// http://localhost:3000/Api/statisticSeller/get-statistic-revenue-by-month

router.get('/get-statistic-revenue-by-month', async (req, res, next) => {
    try {
        const {ownerID}=req.query

        const result =await statisticSeller.getStatisticRevenueByMonth(ownerID);
        console.log(result,"àdsaff");
        if(result.length>0)
        return res.status(200).json({result:true,data:result});

        return res.status(200).json({result:false,data:result});

    } catch (error) {
        console.log('New product error: ', error);
        return res.status(500).json("thong bao that bai");
    }
});
// http://localhost:3000/Api/statisticSeller/get-statistic-revenue-by-year

router.get('/get-statistic-revenue-by-year', async (req, res, next) => {
    try {
        const {ownerID}=req.query

        const result =await statisticSeller.getStatisticRevenueByYear(ownerID);
        console.log(result);
        if(result.length>0)
        return res.status(200).json({result:true,data:result});

        return res.status(200).json({result:false,data:result});

    } catch (error) {
        console.log('New product error: ', error);
        return res.status(500).json("thong bao that bai");
    }
});
// http://localhost:3000/Api/statisticSeller/get-top-rated-products-week
router.get('/get-top-rated-products-by-week', async (req, res, next) => {
    try {
        const {ownerID}=req.query

        const result =await statisticSeller.getTopRatedByProductByWeek(ownerID);
        if(result.length>0)
        return res.status(200).json({result:true,data:result});

        return res.status(200).json({result:false,data:result});

    } catch (error) {
        console.log('New product error: ', error);
        return res.status(500).json("thong bao that bai");
    }
});// http://localhost:3000/Api/statisticSeller/get-top-rated-products-month
router.get('/get-top-rated-products-by-month', async (req, res, next) => {
    try {
        const {ownerID}=req.query

        const result =await statisticSeller.getTopRatedByProductByMonth(ownerID);
        if(result.length>0)
        return res.status(200).json({result:true,data:result});

        return res.status(200).json({result:false,data:result});

    } catch (error) {
        console.log('New product error: ', error);
        return res.status(500).json("thong bao that bai");
    }
});// http://localhost:3000/Api/statisticSeller/get-top-rated-products-week
router.get('/get-top-rated-products-by-year', async (req, res, next) => {
    try {
        const {ownerID}=req.query

        const result =await statisticSeller.getTopRatedByProductByYear(ownerID);
        if(result.length>0)
        return res.status(200).json({result:true,data:result});

        return res.status(200).json({result:false,data:result});

    } catch (error) {
        console.log('New product error: ', error);
        return res.status(500).json("thong bao that bai");
    }
});
// http://localhost:3000/Api/statisticSeller/get-total-revenue-by-week
router.get('/get-total-revenue-by-week', async (req, res, next) => {
    try {
        const {ownerID}=req.query
        const result =await statisticSeller.getTotalRevenueByWeek(ownerID);

        if(result.length>0)
        return res.status(200).json({result:true,data:result});

        return res.status(200).json({result:false,data:result});

    } catch (error) {
        console.log('New product error: ', error);
        return res.status(500).json("thong bao that bai");
    }
});
// http://localhost:3000/Api/statisticSeller/get-total-revenue-by-month

router.get('/get-total-revenue-by-month', async (req, res, next) => {
    try {
        const {ownerID}=req.query

        const result =await statisticSeller.getTotalRevenueByMonth(ownerID);
        console.log(result,"àdsaff");
        if(result.length>0)
        return res.status(200).json({result:true,data:result});

        return res.status(200).json({result:false,data:result});

    } catch (error) {
        console.log('New product error: ', error);
        return res.status(500).json("thong bao that bai");
    }
});// http://localhost:3000/Api/statisticSeller/get-total-revenue-by-year

router.get('/get-total-revenue-by-year', async (req, res, next) => {
    try {
        const {ownerID}=req.query

        const result =await statisticSeller.getTotalRevenueByYear(ownerID);
        console.log(result);
        if(result.length>0)
        return res.status(200).json({result:true,data:result});

        return res.status(200).json({result:false,data:result});

    } catch (error) {
        console.log('New product error: ', error);
        return res.status(500).json("thong bao that bai");
    }
});
module.exports = router;