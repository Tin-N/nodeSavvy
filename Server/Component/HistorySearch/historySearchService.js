const historySearchModel = require('./historySearchModel');

const addHistorySearch = async (idUser,keyword,searchType) => {
    try {
        console.log(idUser,keyword,searchType);
        const newProduct = {
            userId:idUser,keyword:keyword,searchTypes:searchType
        };
        const newP = new historySearchModel(newProduct);
         const result=await newP.save();
        return result;
    } catch (err) {
        console.log("Lỗi không thêm được: " + err);
        return false;
    }
}

const getHistorySearch = async (idUser,searchTypes,limitData) => {
    try {
        console.log(idUser,searchTypes,limitData);
       return await historySearchModel.find({userId:idUser,searchTypes:searchTypes}).sort({_id:-1}).limit(limitData)
    } catch (err) {
        console.log("Lỗi không thêm được: " + err);
        return false;
    }
}
const deleteHistorySearch = async (
    id) => {
    try {
       
        return await historySearchModel.findByIdAndDelete(id);
    } catch (err) {
        console.log("Lỗi không thêm được: " + err);
        return false;
    }
}
module.exports={deleteHistorySearch,addHistorySearch,getHistorySearch}