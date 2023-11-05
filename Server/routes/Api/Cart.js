const express = require('express');
const router = express.Router();
const cartModel = require('../../Component/Cart/CartModel');
const CartModel = require('../../Component/Cart/CartModel');

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

router.post('/add', async (req, res) => {
    try {
        const { userID, products } = req.body;
        let existingCart = await cartModel.findOne({ userID });

        if (existingCart) {
            // Nếu giỏ hàng đã tồn tại, thêm sản phẩm vào mảng products của giỏ hàng hiện tại
            existingCart.products.push(...products);
            await existingCart.save();
            res.status(200).json({ message: "Thêm vào thành công.", data: existingCart });
        } else {
            // Nếu giỏ hàng không tồn tại, tạo giỏ hàng mới
            const newCartModel = new cartModel({ userID, products });
            const savedCartModel = await newCartModel.save();
            res.status(201).json({ message: "Giỏ hàng mới đã được tạo.", data: savedCartModel });
        }
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
        res.status(200).json(cart);
    } catch (error) {
        // Xử lý lỗi
        console.error(error);
        res.status(500).json({ error: "Đã xảy ra lỗi khi lấy thông tin giỏ hàng." });
    }
});

router.put('/update/:userID/:productId', async (req, res) => {
    try {
        const userID = req.params.userID;
        const _idOfCartProduct = req.params.productId;
        const { isSelected, quantity, options, totalItemCost } = req.body;

        const cart = await CartModel.findOne({ userID: userID });
        if (!cart) {
            return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
        }

        const product = cart.products.find((p) => p._id.toString() === _idOfCartProduct);
        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại trong giỏ hàng' });
        }

        // Cập nhật thuộc tính isSelected (nếu có)
        if (isSelected !== undefined) {
            product.isSelected = isSelected;
        }

        // Cập nhật thuộc tính quantity (nếu có)
        if (quantity !== undefined) {
            product.quantity = quantity;
        }

        // Cập nhật thuộc tính quantity (nếu có)
        if (totalItemCost !== undefined) {
            product.totalItemCost = totalItemCost;
        }

        // Cập nhật thuộc tính options (nếu có)
        if (options !== undefined) {
            product.options = options;
        }

        await cart.save();
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi server' });
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