var express = require("express");
const QuickChart = require("quickchart-js");
var router = express.Router();
const productController = require("../../Component/Product/productController");
const categoryController = require("../../Component/Category/CategoryController");
const userController = require("../../Component/User/Controller/UserController");
const notificationController = require("../../Component/Notification/NotificationController")
const staticticsAdmin= require("../../Component/Statistic/StatisticAdmin")

// const uploadFile = require("../../Middleware/UploadFile");
// localhost:3000/cpanel/product

// router.get("/", async (req, res, next) => {
//   const products = await productController(1, 10);
//   res.render("product/list", { products });
// });

router.post("/:id/delete", async function (req, res, next) {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await productController.deleteProductById(id);
    res.json({ result });
  } catch (error) {
    res.json({ result: false });
  }
});

// http://localhost:3000/chart

router.get("/profile", function (req, res, next) {
  // Hien thi trang profile
  // http://localhost:3000/cpanel/product/profile
  res.render("product/profile");
});

// http://localhost:3000/cpanel/product/chart

router.get("/chart", function (req, res, next) {
  // Hien thi trang login
  res.render("product/chart");
});
// http://localhost:3000/cpanel/product/form

router.get("/form", async (req, res, next) => {
  try {
    const categories = await categoryController.getCategories();
    // Hien thi trang form
    return res.render("product/form", { categories });
  } catch (error) {
    next(error);
  }
});
// http://localhost:3000/cpanel/product/:id/edit

router.get("/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productController.getProductById(id);
    let categories = await categoryController.getCategories();
    categories = categories.map((item) => {
      item.selected = false;
      console.log(product.category.toString() + "   " + item._id.toString());

      if (item._id.toString() == product.category.toString()) {
        item.selected = true;
      }
      return item;
    });
    return res.render("product/edit", { product, categories });
  } catch (error) {}
});
// update post
router.post("/:id/edit", [], async (req, res, next) => {
  // Xu ly trang form
  try {
    let { body, file } = req;
    let { id } = req.params;
    if (file) {
      file = `http://172.16.71.2:3000/images/${file.filename}`;
      body = { ...body, image: file };
    }
    const { name, price, quantity, image, category } = body;
    const result = await productController.updateProductById(
      id,
      name,
      price,
      quantity,
      image,
      category
    );
    console.log(result);
    if (result) {
      return res.redirect("/cpanel/product");
    } else {
      return res.redirect("/cpanel/product/" + id + "/edit");
    }
  } catch (error) {
    next(error);
  }
});
router.post("/form", [], async (req, res, next) => {
  // Xu ly trang form
  try {
    let { body, file } = req;
    if (file) {
      file = `http://172.16.71.2:3000/images/${file.filename}`;
      body = { ...body, image: file };
    }
    const { name, price, quantity, image, category } = body;
    const result = await productController.addNewProduct(
      name,
      price,
      quantity,
      image,
      category
    );
    console.log(result);
    console.log(name, price, quantity, image, category);
    if (result) {
      return res.redirect("/cpanel/product");
    } else {
      return res.redirect("/cpanel/product/form");
    }
  } catch (error) {
    next(error);
  }
});




//http://localhost:3000/cpanel/product/getCensorshipProduct
router.get("/getCensorshipProduct", async (req, res, next) => {
  const product = await productController.getProductNotCensorship();
  res.render('manager/CensorshipProduct', { product });
});
router.get('/dcm', async (req, res, next) => {
  const product = await productController.getProductNotCensorship();
  res.render('manager/CensorshipProduct', { product });
});
//http://localhost:3000/cpanel/product/getDetailCensorshipProduct/id
router.get('/getDetailCensorshipProduct/:id', async (req, res, next) => {
  try {
  const { id } = req.params;
  const product = await productController.getProductByID(id);
  const categories = await categoryController.getAPICategoryById(product.categoryID);
  
  const user = await userController.getById(product.userID);
  res.render('manager/CensorshipDetailProduct', { product, categories, user });
} catch (error) {
  next(error)
}
});

function separateArrays(arr,number) {
  let labels=[];
  if(typeof number!=="undefined"&&number==3)
   labels = arr.map(item => {return "Tháng " + item.label});
  else
   labels = arr.map(item => item.label);
  const values = arr.map(item => item.value);
  console.log(labels,arr);
  return { labels, values };
}

//http://localhost:3000/cpanel/product/check-product-by-id/id
// dong y duyet san pham isApproved = 2
router.post("/check-product-by-id/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productController.checkProductByid(id, 2);
    console.log(">>>>>>>>Đồng ý: ", result);
    if (result) {
      return res.status(200).json({result:result})
      } else {
        return res.status(400).json({result:result})
       
    }
  } catch (error) {
    next(error)
  }
});

//http://localhost:3000/cpanel/product/rejectProduct-by-id/id
// tu choi duyet san pham isApproved = 3
router.post("/rejectProduct-by-id/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await productController.checkProductByid(id, 3);
    const product = await productController.getProductByID(id);
    
    const notification = await notificationController.rejectNotification(product.userID, product._id, "Từ chối duyệt sản phẩm");
    console.log(">>>>>>>>notification: ", notification);
    return res.redirect('/cpanel/product/getCensorshipProduct');
  } catch (error) {
    next(error)
  }
});

function formatCurrency(number) {
  const parsedNumber = typeof number === 'string' ? parseFloat(number) : number;

  const roundedNumber = Math.round(parsedNumber);
  console.log(number);
  const formattedNumber = roundedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return formattedNumber;
}

//http://localhost:3000/cpanel/product/Revenue/:typeOfRevenue
router.get("/Revenue/:typeOfRevenue", async (req, res, next) =>{
  // Hien thi trang login

 
  const {typeOfRevenue}=req.params;
  const myChart = new QuickChart();
  if(typeof typeOfRevenue!=='undefined'){

    switch(typeOfRevenue){
      case "1":{
        const staticticsRevenueByWeek=await staticticsAdmin.getStatisticRevenueByWeek();
        const data=separateArrays(staticticsRevenueByWeek.week);
        myChart.setConfig({
          type: "bar",
          data: {
            labels: data.labels?data.labels:['January', 'February', 'March', 'April', 'May'] ,
            datasets: [
              {
                label:"Doanh thu",
                categoryPercentage: 0.5,
                data: data.values?data.values:[50, 60, 70, 180, 190],
              },
            ],
          },
          options: {
            scales: {
              xAxes: [
                {
                  ticks: {
                    fontSize:9
        
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    fontSize: 9,
                    callback: function (value) {
                      const parsedNumber = typeof number === 'string' ? parseFloat(value) : value;

                      const roundedNumber = Math.round(parsedNumber);
                    
                      const formattedNumber = roundedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    
                      return formattedNumber;
                    },
                    
                  },
                },
              ],
            },
          },
        });
        myChart.setWidth(300).setHeight(200).setBackgroundColor("#ffffff");
        res.render("manager/RevenueStatistics", { image: myChart.getUrl(),title:"Tuần",total:formatCurrency(staticticsRevenueByWeek.total[0].value)});
        console.log(typeOfRevenue+"Adsdfaafsdfaf");

        break;
      }
      case "2":{
        const staticticsRevenueByMonth=await staticticsAdmin.getStatisticRevenueByMonth();
        const data=separateArrays(staticticsRevenueByMonth.month);
        console.log(data.labels);
        myChart.setConfig({
          type: "line",
          data: {
            labels:data?data.labels:["22/11", "25/12", "30/12", "31/12", "1/1","3/23","22/11", "25/12", "30/12", "31/12", "1/1","3/23","22/11", "25/12", "30/12", "31/12", "1/1","3/23","22/11", "25/12", "30/12", "31/12", "1/1","3/23","22/11", "25/12", "30/12", "31/12", "1/1","3/23","22/11", "25/12", "30/12", "31/12", "1/1","3/23","22/11", "25/12", "30/12", "31/12", "1/1","3/23",],
            datasets: [
              {label:"Doanh thu",
                categoryPercentage: 0.5,
                data:data?data.values:[50, 60, 70, 180, 190,292,50, 60, 70, 180, 190,292,50, 60, 70, 180, 190,292,50, 60, 70, 180, 190,292,50, 60, 70, 180, 190,292,50, 60, 70, 180, 190,292,50, 60, 70, 180, 190,292,],
              },
            ],
          },
          options: {
            scales: {
              xAxes: [
                {
                  ticks: {
                    fontSize:9
        
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    fontSize: 9,
                    callback: function (value) {
                      const parsedNumber = typeof number === 'string' ? parseFloat(value) : value;

                      const roundedNumber = Math.round(parsedNumber);
                    
                      const formattedNumber = roundedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    
                      return formattedNumber;
                    },
                    
                  },
                },
              ],
            },
          },
        });
        myChart.setWidth(data.values.length*150).setHeight(200).setBackgroundColor("#ffffff");
        res.render("manager/RevenueStatistics", { image: myChart.getUrl(),title:"Tháng",total:formatCurrency(staticticsRevenueByMonth.total[0].value) });
        break;
      }
      case "3":{
        const staticticsRevenueByYear=await staticticsAdmin.getStatisticRevenueByYear();
        const data=separateArrays(staticticsRevenueByYear.year,3);
        myChart.setConfig({
          type: "bar",
          data: {
            labels:data?data.labels: ["22/11", "25/12", "30/12", "31/12", "1/1","3/23","22/11", "25/12", "30/12", "31/12", "1/1","3/23"],
            datasets: [
              {label:"Doanh thu",
                categoryPercentage: 0.5,
                data:data?data.values: [50, 60, 70, 180, 190,292,50, 60, 70, 180, 190,292],
              },
            ],
          },
          options: {
            scales: {
              xAxes: [
                {
                  ticks: {
                    fontSize:9
        
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    fontSize: 9,
                    callback: function (value) {
                      const parsedNumber = typeof number === 'string' ? parseFloat(value) : value;

                      const roundedNumber = Math.round(parsedNumber);
                    
                      const formattedNumber = roundedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    
                      return formattedNumber;
                    },
                    
                  },
                },
              ],
            },
            legend: {
              display: true,
              position: 'top',
              align: 'start'
            }
          },
        });
        myChart.setWidth(data.values.length*150).setHeight(200).setBackgroundColor("#ffffff");
        res.render("manager/RevenueStatistics", { image: myChart.getUrl(),title:"Năm",total:formatCurrency(staticticsRevenueByYear.total[0].value) });
        break;
      }
      default:{
        break;
      }
    }
    
  
    // console.log(myChart.getUrl());

  }else{
    res.render("index");

  }

});

//http://localhost:3000/cpanel/product/User
router.get("/User/:typeOfRevenue", async (req, res, next) =>{
  // Hien thi trang login

  const {typeOfRevenue}=req.params;
  const myChart = new QuickChart();
  if(typeof typeOfRevenue!=='undefined'){
    const totalUser=await staticticsAdmin.getTotalUser();

    switch(typeOfRevenue){
      case "1":{
        const staticticsUserByWeek=await staticticsAdmin.getStatisticUserByWeek();
        const totalUserByWeek=await staticticsAdmin.getTotalUserByWeek();
        console.log(totalUserByWeek);
        const data=separateArrays(staticticsUserByWeek);
        myChart.setConfig({
          type: "bar",
          data: {
            labels: data.labels?data.labels:['January', 'February', 'March', 'April', 'May'] ,
            datasets: [
              {
                label:"Người dùng đăng ký",
                categoryPercentage: 0.5,
                data: data.values?data.values:[50, 60, 70, 180, 190],
              },
            ],
          },
          options: {
            scales: {
              xAxes: [
                {
                  ticks: {
                    fontSize:9
        
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    fontSize: 9,
                    callback: function (value) {
                      const parsedNumber = typeof number === 'string' ? parseFloat(value) : value;

                      const roundedNumber = Math.round(parsedNumber);
                    
                      const formattedNumber = roundedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    
                      return formattedNumber;
                    },
                    
                  },
                },
              ],
            },
          },
        });
        myChart.setWidth(300).setHeight(200).setBackgroundColor("#ffffff");
        res.render("manager/UserStatistics", { image: myChart.getUrl(),title:"Tuần",totalBy:formatCurrency(totalUserByWeek[0].numberOfUsers),total:formatCurrency(totalUser)});
        console.log(typeOfRevenue+"Adsdfaafsdfaf");

        break;
      }
      case "2":{
        const staticticsUserByMonth=await staticticsAdmin.getStatisticUserByMonth();
        const totalUserByMonth=await staticticsAdmin.getTotalUserByMonth();
        const data=separateArrays(staticticsUserByMonth);
        console.log(data.labels);
        myChart.setConfig({
          type: "line",
          data: {
            labels:data?data.labels:["22/11", "25/12", "30/12", "31/12", "1/1","3/23","22/11", "25/12", "30/12", "31/12", "1/1","3/23","22/11", "25/12", "30/12", "31/12", "1/1","3/23","22/11", "25/12", "30/12", "31/12", "1/1","3/23","22/11", "25/12", "30/12", "31/12", "1/1","3/23","22/11", "25/12", "30/12", "31/12", "1/1","3/23","22/11", "25/12", "30/12", "31/12", "1/1","3/23",],
            datasets: [
              {label:"Người dùng đăng ký",
                categoryPercentage: 0.5,
                data:data?data.values:[50, 60, 70, 180, 190,292,50, 60, 70, 180, 190,292,50, 60, 70, 180, 190,292,50, 60, 70, 180, 190,292,50, 60, 70, 180, 190,292,50, 60, 70, 180, 190,292,50, 60, 70, 180, 190,292,],
              },
            ],
          },
          options: {
            scales: {
              xAxes: [
                {
                  ticks: {
                    fontSize:9
        
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    fontSize: 9,
                    callback: function (value) {
                      const parsedNumber = typeof number === 'string' ? parseFloat(value) : value;

                      const roundedNumber = Math.round(parsedNumber);
                    
                      const formattedNumber = roundedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    
                      return formattedNumber;
                    },
                    
                  },
                },
              ],
            },
          },
        });
        myChart.setWidth(data.values.length*100).setHeight(200).setBackgroundColor("#ffffff");
        res.render("manager/UserStatistics", { image: myChart.getUrl(),title:"Tháng",totalBy:formatCurrency(totalUserByMonth[0].numberOfUsers),total:formatCurrency(totalUser)});
        break;
      }
      case "3":{
        const staticticsUserByYear=await staticticsAdmin.getStatisticUserByYear();
        const totalUserByYear=await staticticsAdmin.getTotalUserByYear();

        const data=separateArrays(staticticsUserByYear,3);
        myChart.setConfig({
          type: "bar",
          data: {
            labels:data?data.labels: ["22/11", "25/12", "30/12", "31/12", "1/1","3/23","22/11", "25/12", "30/12", "31/12", "1/1","3/23"],
            datasets: [
              {label:"Người dùng đăng ký",
                categoryPercentage: 0.5,
                data:data?data.values: [50, 60, 70, 180, 190,292,50, 60, 70, 180, 190,292],
              },
            ],
          },
          options: {
            scales: {
              xAxes: [
                {
                  ticks: {
                    fontSize:9
        
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    fontSize: 9,
                    callback: function (value) {
                      const parsedNumber = typeof number === 'string' ? parseFloat(value) : value;

                      const roundedNumber = Math.round(parsedNumber);
                    
                      const formattedNumber = roundedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    
                      return formattedNumber;
                    },
                    
                  },
                },
              ],
            },
            legend: {
              display: true,
              position: 'top',
              align: 'start'
            }
          },
        });
        myChart.setWidth(data.values.length*100).setHeight(200).setBackgroundColor("#ffffff");
        res.render("manager/UserStatistics", { image: myChart.getUrl(),title:"Năm",totalBy:formatCurrency(totalUserByYear[0].numberOfUsers),total:formatCurrency(totalUser)});
        break;
      }
      default:{
        break;
      }
    }
    
  
    // console.log(myChart.getUrl());

  }else{
    res.render("index");

  }
  // res.render("manager/UserStatistics");
});


module.exports = router;
