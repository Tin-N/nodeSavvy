const express = require('express');
const router = express.Router();
const orderModel = require('../../Component/Order/orderModel');

router.post('/add', async (req, res) => {
  try {
    const { orderDetailID, userID, orderDate, deliveryStatus, paymentStatus, paymentMethods, ownerID, address, isConfirmed } = req.body;

    const newOrderModel = new orderModel({
      orderDetailID,
      userID,
      orderDate,
      deliveryStatus,
      paymentStatus,
      paymentMethods,
      ownerID,
      address,
      isConfirmed
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
    const { ownerID } = req.params;

    const orders = await orderModel.find({ ownerID: { $in: [ownerID] }, isConfirmed: false });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

router.get('/getOrderByOrderDetailID/:orderDetailID', async (req, res) => {
  try {
    const orderDetailID = req.params.orderDetailID;

    // Find the order based on the provided orderDetailID
    const order = await orderModel.findOne({ orderDetailID });

    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
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

router.put('/updateisConfirmedisTrue/:orderID', async (req, res) => {
  try {
    const { orderID } = req.params;

    // Find and update the order by setting isConfirmed to true
    const updatedOrder = await orderModel.findOneAndUpdate(
      { orderID },
      { $set: { isConfirmed: true } },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Không tìm thấy bản ghi để cập nhật.' });
    }

    res.status(200).json({ message: 'Bản ghi đã được cập nhật thành công.', updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật bản ghi.' });
  }
});

module.exports = router;