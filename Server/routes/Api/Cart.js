const express = require('express');
const router = express.Router();
const cartModel = require('../../Component/Cart/CartModel')

router.post('/add', async (req, res) => {
    try {
        const { userID, products } = req.body;

        const newCartModel = new cartModel({ userID, products });

        console.log(userID)
        console.log(products)

        const savedCartModel = await newCartModel.save();

        res.status(201).json({ message: "Thêm vào thành công.", data: savedCartModel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Đã xảy ra lỗi thêm vào giỏ hàng" });
    }
});


router.get('/getCartByUserID/:userID', async (req, res) => {
    try {
        const userID = req.params.userID;
        const cart = await cartModel.find({ userID });
        if (!cart) {
            return res.status(404).json({ message: 'Không tìm thấy giỏ hàng cho userID đã cung cấp.' });
        }
        console.log(cart)
        res.status(200).json(cart);
    } catch (error) {
        // Xử lý lỗi
        console.error(error);
        res.status(500).json({ error: "Đã xảy ra lỗi khi lấy thông tin giỏ hàng." });
    }
});

router.delete('/deleteCartByUserID/:userID', async (req, res) => {
    try {
        const userID = req.params.userID;

        // Sử dụng Mongoose để xóa giỏ hàng có userID trùng khớp
        const result = await cartModel.deleteOne({ userID: userID });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Không tìm thấy giỏ hàng cho userID đã cung cấp.' });
        }

        res.status(200).json({ message: 'Đã xóa giỏ hàng thành công.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Đã xảy ra lỗi khi xóa giỏ hàng." });
    }
});



module.exports = router;