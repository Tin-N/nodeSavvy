const validationAddProduct = async (req, res, next) => {
    const { categoryID, price,
        detail, image, name, quantity } = req.body;
    if (!categoryID || !detail || !image || !name) {
        return res.status(400).json({
            result: false,
            message: 'Thiếu thông tin sản phẩm!!'
        });
    }else if(isNaN(price) || isNaN(quantity)){
        return res.status(400).json({
            result:false,
            message: "Giá và số lượng phải là con số!"
        })
    }else {
        next();
    }
}
const validationAddFeeback = async (req, res, next) => {
    const {feedback} = req.body;
    if(feedback.lenght <= 10) {
        return res.status(400).json({
            result: false,
            message: 'Bình luận quá ngắn'
        })
    }else {
        next();
    }
}
module.exports = {validationAddProduct, validationAddFeeback}