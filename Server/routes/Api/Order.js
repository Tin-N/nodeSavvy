const express = require('express');
const router = express.Router();
const orderModel = require('../../Component/order/orderModel');

router.post('/add', async (req, res) => {
  try {
    const { orderDetailID, userID, orderDate, deliveryStatus, paymentStatus, paymentMethods, ownerID, address } = req.body;

    const newOrderModel = new orderModel({
      orderDetailID,
      userID,
      orderDate,
      deliveryStatus,
      paymentStatus,
      paymentMethods,
      ownerID,
      address
    });

    const savedOrderModel = await newOrderModel.save();

    res.status(201).json(savedOrderModel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm đơn hàng.' });
  }
});

router.get('/getOrderByOrderID/:orderID/', async (req, res) => {
  try {
    const orderID = req.params.orderID;

    const orders = await orderModel.find({ orderID });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// Lấy thông tin đơn hàng cho người mua
router.get('/getOrderForCustomer/:userID', async (req, res) => {
  const { userID } = req.params;

  try {
    // Tìm tất cả các đơn hàng của người dùng dựa trên userID
    const orders = await orderModel.find({ userID });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// Lấy thông tin đơn hàng cho người bán
router.get('/getOrderForSeller/:ownerID/', async (req, res) => {
  try {
    const ownerID = req.params.ownerID;

    const orders = await orderModel.find({ ownerID: { $in: ownerID } });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

router.get('/getOrderByOrderDetailID/:orderDetailID', async (req, res) => {
  const orderDetailID = req.params.orderDetailID;

  try {
    // Use Mongoose to find orders with the given orderDetailID
    const orders = await orderModel.find({ orderDetailID });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ success: false, error: 'No orders found for the given orderDetailID' });
    }

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('Error fetching orders by orderDetailID:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

router.delete('/delete/:orderID', async (req, res) => {
  try {
    const { orderID } = req.params; // Lấy orderID từ URL

    // Tìm và xoá bản ghi trong bảng Order bằng orderID
    const deletedOrder = await orderModel.findOneAndRemove({ orderID });

    if (!deletedOrder) {
      return res.status(404).json({ error: 'Không tìm thấy bản ghi để xoá.' });
    }

    // Trả về phản hồi cho việc xoá thành công
    res.status(200).json({ message: 'Bản ghi đã được xoá thành công.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi xoá bản ghi.' });
  }
});



module.exports = router;