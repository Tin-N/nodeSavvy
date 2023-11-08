const express = require('express');
const router = express.Router();
const cartModel = require('../../Component/Cart/CartModel');

router.post('/add', async (req, res) => {
    try {
        const { userID, products } = req.body;
        // Tìm giỏ hàng của userID, nếu không tìm thấy, tạo giỏ hàng mới
        let cart = await cartModel.findOne({ userID });

        if (!cart) {
            // Nếu không tìm thấy giỏ hàng, tạo giỏ hàng mới với mảng products
            const newCartModel = new cartModel({ userID, products: [products] });
            cart = await newCartModel.save();
        } else {
            // Sử dụng let thay cho const
            let productsArray = products;

            // Đảm bảo productsArray là một mảng
            if (!Array.isArray(productsArray)) {
                productsArray = [productsArray];
            }

            // Thêm sản phẩm vào giỏ hàng
            cart.products.push(...productsArray);

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
      const userID = req.params.userID;
      const productID = req.params.productID;
  
      // Tìm người dùng có userID
      const user = await cartModel.findOne({ userID });
  
      if (!user) {
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
      }
  
      // Lọc các sản phẩm có productID trùng và loại bỏ chúng khỏi mảng products
      user.products = user.products.filter(product => product.productID !== productID);
  
      // Lưu lại thông tin người dùng với sản phẩm đã xóa
      await user.save();
  
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi server' });
    }
  });

module.exports = router;