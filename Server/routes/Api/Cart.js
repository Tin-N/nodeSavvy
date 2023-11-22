const express = require('express');
const router = express.Router();
const cartModel = require('../../Component/Cart/CartModel');

router.post('/add', async (req, res) => {
    try {
        const { userID, products, quantity } = req.body;

        // Kiểm tra sản phẩm có sẵn trong giỏ hàng hay không
        const cart = await cartModel.findOne({ userID });

        if (!cart) {
            // Nếu không tìm thấy giỏ hàng, tạo giỏ hàng mới với mảng products
            const newCartModel = new cartModel({ userID, products: [products] });
            await newCartModel.save();
        } else {
            // Kiểm tra sản phẩm có sẵn trong giỏ hàng hay không
            const existingProduct = cart.products.find(product => product.productID.equals(products.productID));

            if (existingProduct) {
                // Nếu sản phẩm đã tồn tại, tăng số lượng lên 1
                existingProduct.quantity += quantity;
            } else {
                // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
                cart.products.push(products);
            }


            // Lưu lại giỏ hàng sau khi đã thêm sản phẩm
            await cart.save();
        }

        res.status(201).json({ message: "Thêm vào thành công." });
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
        res.status(200).json(cart[0].products);
    } catch (error) {
        // Xử lý lỗi
        console.error(error);
        res.status(500).json({ error: "Đã xảy ra lỗi khi lấy thông tin giỏ hàng." });
    }
});

router.put('/update/:userID/:productId', async (req, res) => {
    try {
        const userID = req.params.userID;
        const productID = req.params.productId;
        const { isSelected, quantity, options, itemTotalCost } = req.body;

        const cart = await cartModel.findOne({ userID: userID });
        if (!cart) {
            return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
        }

        const product = cart.products.find((p) => p.productID.toString() === productID);
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
        if (itemTotalCost !== undefined) {
            product.itemTotalCost = itemTotalCost;
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

router.delete('/deleteProduct/:userID/:productID', async (req, res) => {
    try {
        const { userID, productID } = req.params;

        // Tìm giỏ hàng theo userID
        const cart = await cartModel.findOne({ userID });

        if (!cart) {
            return res.status(404).json({ message: 'Không tìm thấy giỏ hàng cho userID đã cho.' });
        }

        // Tìm sản phẩm trong giỏ hàng có productID giống với tham số
        const productIndex = cart.products.findIndex(product => product.productID.equals(productID));

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm trong giỏ hàng.' });
        }

        // Xoá sản phẩm khỏi mảng products
        cart.products.splice(productIndex, 1);

        // Lưu lại giỏ hàng sau khi xoá sản phẩm
        await cart.save();

        res.status(200).json({ message: 'Xoá sản phẩm thành công.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xoá sản phẩm.' });
    }
});

router.delete('/deleteProductsSelected/:userID', async (req, res) => {
    try {
        const { userID } = req.params;

        // Find the user's cart
        const cart = await cartModel.findOne({ userID });

        if (!cart) {
            return res.status(404).json({ message: 'Không tìm thấy giỏ hàng cho userID đã cho.' });
        }

        // Filter out products with isSelected === true
        const updatedProducts = cart.products.filter((product) => !product.isSelected);

        // Update the cart with the filtered products
        await cartModel.findOneAndUpdate({ userID }, { products: updatedProducts });

        res.status(200).json({ message: 'Xoá sản phẩm thành công.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xoá sản phẩm.' });
    }
});

module.exports = router;