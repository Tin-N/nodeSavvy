const express = require('express');
const router = express.Router();
const orderDetailModel = require('../../Component/order/OrderDetails/orderDetailsModel');

router.post('/add', async (req, res) => {
  try {

    const { orderDetailRequestData } = req.body;
    const { products } = orderDetailRequestData.products;
    const { totalCost } = orderDetailRequestData.totalCost;
    const newOrderDetail = new orderDetailModel({
      products,
      totalCost
    });

    await newOrderDetail.save();

    res.status(201).json("Thành Công");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm chi tiết đơn hàng đơn hàng.' });
  }
})

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
