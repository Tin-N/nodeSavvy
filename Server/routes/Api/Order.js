const express = require('express');
const router = express.Router();
const orderModel = require('../../Component/order/Orders/orderModel');

router.post('/add', async (req, res) => {
  try {
    const { orderRequestData } = req.body;
    const orderDetailID = orderRequestData.orderDetailID;
    const userID = orderRequestData.userID;
    const orderDate = orderRequestData.orderDate;

    const newOrderModel = new orderModel({
      orderDetailID,
      userID,
      orderDate
    });

    await newOrderModel.save();

    res.status(201).json(newOrderModel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm đơn hàng đơn hàng.' });
  }
})

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