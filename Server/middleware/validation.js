const validationAddProduct = async (req, res, next) => {
    const { categoryID, price,
        detail, image, name, quantity } = req.body;
    if (!categoryID || !detail || !name) {
        return res.status(400).json({
            result: false,
            message: 'Thiếu thông tin sản phẩm!!'
        });
    } else if (isNaN(price) || isNaN(quantity)) {
        return res.status(400).json({
            result: false,
            message: "Giá và số lượng phải là con số!"
        })
    } else {
        next();
    }
}
const validationAddFeeback = async (req, res, next) => {
    const { feedback } = req.body;
    if (feedback.lenght <= 10) {
        return res.status(400).json({
            result: false,
            message: 'Bình luận quá ngắn'
        })
    } else {
        next();
    }
}
const validationUpdateQuantity = async (req, res, next) => {
    const { quantity } = req.body;
    if (isNaN(quantity)) {
        return res.status(400).json({
            result: false,
            message: 'Số lượng sản phẩm không đúng định dạng'
        })
    } else {
        next()
    }
}
const validationAddSale = async (req, res, next) => {
    const { startDay, endDay } = req.body;
    if (startDay > endDay) {
        return res.status(400).json({
            result: false,
            message: 'Số ngày sai cmnr thêm lại cho đúng'
        })
    } else {
        next()
    }
}
module.exports =
{
    validationAddProduct,
    validationAddFeeback,
    validationUpdateQuantity,
    validationAddSale
}