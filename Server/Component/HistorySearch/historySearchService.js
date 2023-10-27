const historySearchModel = require('./historySearchModel');
const searchCountModel=require("./searchCountModel")
const addHistorySearch = async (idUser,keyword) => {
    try {
        console.log(idUser,keyword);
        const newProduct = {
            userId:idUser,keyword:keyword
        };
        const newP = new historySearchModel(newProduct);
         const result=await newP.save();
        return result;
    } catch (err) {
        console.log("Lỗi không thêm được: " + err);
        return false;
    }
}

// const getHistorySearchForApp = async (idUser,limitData) => {
//     try {
//         console.log(idUser,searchTypes,limitData);
//        return await historySearchModel.find({userId:idUser,searchTypes:' '}).sort({_id:-1}).limit(limitData)
//     } catch (err) {
//         console.log("Lỗi không thêm được: " + err);
//         return false;
//     }
// }
const getHistorySearchByUser = async (idUser,limitData,searchTypes) => {
    try {
        console.log(idUser,limitData);
       return await historySearchModel.find({
        userId:idUser,
        isHidden:false
        }).sort({_id:-1}).limit(limitData)
    } catch (err) {
        console.log("Lỗi không thêm được: " + err);
        return false;
    }
}
const deleteHistorySearch = async (
    id) => {
    try {
       
        return await historySearchModel.findByIdAndUpdate(id,{isHidden:true});
    } catch (err) {
        console.log("Lỗi không thêm được: " + err);
        return false;
    }
}



const addNewSearchCount = async (keyword,searchType) => {
    try {
        console.log(keyword,searchType);
        const NewSearchCount = {
            userId:idUser,keyword:keyword
        };
        const newP = new searchCountModel(NewSearchCount);
         const result=await newP.save();
        return result;
    } catch (err) {
        console.log("Lỗi không thêm được: " + err);
        return false;
    }
}

const getSearchPopular = async (keyword,searchTypes,limitData) => {
    try {
        console.log(keyword,searchTypes,limitData);
       return await searchCountModel.find({keyword:keyword,searchTypes:searchTypes}).sort({_id:-1}).limit(limitData)
    } catch (err) {
        console.log("Lỗi không thêm được: " + err);
        return false;
    }
}


module.exports={deleteHistorySearch,addHistorySearch,getHistorySearchByUser,getSearchPopular,addNewSearchCount}