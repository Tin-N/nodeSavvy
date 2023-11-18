const express = require('express');
const router = express.Router();
const orderDetailModel = require('../../Component/order/orderDetailsModel');


router.post('/add', async (req, res) => {
  try {

    const { orderDetailID, products, totalCost } = req.body;

    const newOrderDetail = new orderDetailModel({
      orderDetailID,
      products,
      totalCost,
    });

    await newOrderDetail.save();

    res.status(201).json({ error: false, message: "Thành Công", data: newOrderDetail });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm chi tiết đơn hàng đơn hàng.' });
  }
});

// Cập nhật trạng thái giao hàng cho 1 sản phẩm của người bán sản phẩm
router.put('/update/updateProductDeliveryStatus/:orderDetailID/:ownerID/:productID', async (req, res) => {
  try {
    const ownerID = req.params.ownerID;
    const orderDetailID = req.params.orderDetailID;
    const deliveryStatus = req.body.deliveryStatus;
    const productID = req.params.productID;

    const result = await orderDetailModel.updateMany(
      {
        orderDetailID: orderDetailID,
        'products.ownerID': ownerID,
        'products.productID': productID,
      },
      {
        $set: { 'products.$.deliveryStatus': deliveryStatus },
      }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng hoặc không có sản phẩm phù hợp' });
    }

    res.status(201).json({ message: 'Cập nhật trạng thái giao hàng thành công' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi trong quá trình xử lý yêu cầu' });
  }
});

// Cập nhật trạng thái giao hàng cho tất cả sản phẩm của người bán sản phẩm
router.put('/update/updateAllProductDeliveryStatus/:orderDetailID/:ownerID', async (req, res) => {
  try {
    const ownerID = req.params.ownerID;
    const orderDetailID = req.params.orderDetailID;
    const deliveryStatus = req.body.deliveryStatus;

    const result = await orderDetailModel.updateMany(
      {
        orderDetailID: orderDetailID,
        'products.ownerID': ownerID,
      },
      {
        $set: { 'products.$[].deliveryStatus': deliveryStatus },
      }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng hoặc không có sản phẩm phù hợp' });
    }

    res.status(201).json({ message: 'Cập nhật trạng thái giao hàng thành công' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi trong quá trình xử lý yêu cầu' });
  }
});

router.get('/getOrderDetailByOwnerAndOrderDetailID/:orderDetailID/:ownerID', async (req, res) => {
  try {
    const ownerID = req.params.ownerID;
    const orderDetailID = req.params.orderDetailID;
    // Tìm các order details có products chứa sản phẩm của ownerID và có deliveryStatus là 'Pending'
    const orderDetails = await orderDetailModel.find({
      'orderDetailID': orderDetailID,
      'products.ownerID': ownerID,
      'products.deliveryStatus': 'Pending'
    });

    // Kiểm tra nếu không tìm thấy order details
    if (!orderDetails || orderDetails.length === 0) {
      return res.status(404).json({ error: 'No order details found for the specified ownerID' });
    }

    // Lấy danh sách sản phẩm thuộc ownerID
    const products = orderDetails.map(orderDetail => orderDetail.products.filter(product => product.ownerID.toString() === ownerID && product.deliveryStatus === 'Pending'));

    // Lấy orderDetailID và trả về dữ liệu
    const responseData = orderDetails.map(orderDetail => ({
      orderDetailID: orderDetail.orderDetailID,
      products: orderDetail.products.filter(product => product.ownerID.toString() === ownerID && product.deliveryStatus === 'Pending'),
    }));

    // Trả về dữ liệu
    res.json({ responseData, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/getOrderDetailByOwner/:ownerID', async (req, res) => {
  try {
    // Lấy ownerID từ request
    const ownerID = req.params.ownerID;

    // Kiểm tra ownerID có tồn tại không
    if (!ownerID) {
      return res.status(400).json({ error: 'Missing ownerID in the request' });
    }

    // Tìm các order details có products chứa sản phẩm của ownerID và có deliveryStatus là 'Pending'
    const orderDetails = await orderDetailModel.find({
      'products.ownerID': ownerID,
      'products.deliveryStatus': 'Pending'
    });

    // Kiểm tra nếu không tìm thấy order details
    if (!orderDetails || orderDetails.length === 0) {
      return res.status(404).json({ error: 'No order details found for the specified ownerID' });
    }

    // Lấy danh sách sản phẩm thuộc ownerID
    const products = orderDetails.map(orderDetail => orderDetail.products.filter(product => product.ownerID.toString() === ownerID && product.deliveryStatus === 'Pending'));

    // Lấy orderDetailID và trả về dữ liệu
    const responseData = orderDetails.map(orderDetail => ({
      orderDetailID: orderDetail.orderDetailID,
      products: orderDetail.products.filter(product => product.ownerID.toString() === ownerID && product.deliveryStatus === 'Pending'),
    }));

    // Trả về dữ liệu
    res.json({ responseData, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/getOrderDetailByShiper/:ownerID', async (req, res) => {
  try {
    const ownerID = req.params.ownerID;

    const orderDetails = await orderDetailModel.find({
      'products.ownerID': ownerID,
      'products.deliveryStatus': 'Delivering'
    });

    // Kiểm tra nếu không tìm thấy order details
    if (!orderDetails || orderDetails.length === 0) {
      return res.status(404).json({ error: 'No order details found for the specified ownerID' });
    }

    // Lấy danh sách sản phẩm thuộc ownerID
    const products = orderDetails.map(orderDetail => orderDetail.products.filter(product => product.ownerID.toString() === ownerID && product.deliveryStatus === 'Delivering'));

    // Flatten array nếu cần thiết
    const flattenedProducts = [].concat(...products);

    // Lấy orderDetailID và trả về dữ liệu
    const responseData = orderDetails.map(orderDetail => ({
      orderDetailID: orderDetail.orderDetailID,
      products: orderDetail.products.filter(product => product.ownerID.toString() === ownerID && product.deliveryStatus === 'Delivering'),
    }));

    // Trả về dữ liệu
    res.json({ responseData, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Lấy thông tin đơn hàng cho khách hàng
router.get('/getOrderHistoryForSeller/:orderDetailID', async (req, res) => {
  try {
    const orderDetailID = req.params.orderDetailID;

    const orders = await orderModel.find({ orderDetailID })

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

router.put('/update/:orderDetailID', async (req, res) => {
  try {
    const { orderDetailID } = req.params; // Lấy orderDetailID từ URL

    // Tìm và cập nhật bản ghi trong bảng OrderDetail bằng orderDetailID
    const updatedOrderDetail = await orderDetailModel.findOneAndUpdate(
      { orderDetailID },
      req.body, // Sử dụng nội dung từ yêu cầu PUT để cập nhật bản ghi
      { new: true } // Tùy chọn để trả về bản ghi đã cập nhật
    );

    if (!updatedOrderDetail) {
      return res.status(404).json({ error: 'Không tìm thấy bản ghi để cập nhật.' });
    }

    // Trả về phản hồi với bản ghi đã cập nhật
    res.status(200).json(updatedOrderDetail);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật bản ghi.' });
  }
});

router.put('/removeSelectedProducts/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;

    // Tìm giỏ hàng của người dùng dựa trên userID
    const cart = await CartModel.findOne({ userID });

    if (!cart) {
      return res.status(404).json({ message: 'Giỏ hàng không tồn tại.' });
    }

    // Lọc và xoá sản phẩm có isSelected là true từ mảng products
    cart.products = cart.products.filter(product => !product.isSelected);

    // Lưu giỏ hàng đã được cập nhật
    const updatedCart = await cart.save();

    res.status(200).json({ message: 'Những sản phẩm có isSelected là true đã được xoá.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

router.delete('/delete/:orderDetailID', async (req, res) => {
  try {
    const { orderDetailID } = req.params; // Lấy orderDetailID từ URL

    // Tìm và xoá bản ghi trong bảng OrderDetail bằng orderDetailID
    const deletedOrderDetail = await orderDetailModel.findOneAndRemove({ orderDetailID });

    if (!deletedOrderDetail) {
      return res.status(404).json({ error: 'Không tìm thấy bản ghi để xoá.' });
    }

    // Trả về phản hồi với thông báo xoá thành công
    res.status(200).json({ message: 'Bản ghi đã được xoá thành công.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi xoá bản ghi.' });
  }
});

module.exports = router;