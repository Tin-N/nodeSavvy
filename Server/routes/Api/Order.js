const express = require('express');
const router = express.Router();
const orderModel = require('../../Component/order/orderModel');

router.post('/add', async (req, res) => {
  try {
    const { orderDetailID, userID, orderDate, deliveryStatus, paymentStatus, paymentMethods, ownerID } = req.body;

    const newOrderModel = new orderModel({
      orderDetailID,
      userID,
      orderDate,
      deliveryStatus,
      paymentStatus,
      paymentMethods,
      ownerID
    });

    const savedOrderModel = await newOrderModel.save();

    res.status(201).json(savedOrderModel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm đơn hàng.' });
  }
});

// Lấy thông tin đơn hàng cho người mua
router.get('/getOrderHistoryForCustomer/:userID', async (req, res) => {
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
router.get('/getOrderHistoryForSeller/:ownerID/', async (req, res) => {
  try {
    const ownerID = req.params.ownerID;

    const orders = await orderModel.find({ ownerID: { $in: ownerID } });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server' });
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