const historySearchService = require('./historySearchService');


//  
const addNewHistorySearch = async (idUser,keyword) => {
    try {
        console.log(idUser,keyword);
        return await historySearchService.addHistorySearch(idUser,keyword)
    } catch (err) {
        throw err;
    }
}
const getHistorySearch = async (idUser,limitData) => {
    try {
        return await historySearchService.getHistorySearchByUser(idUser,limitData)
    } catch (err) {
        throw err;
    }
}
const deleteHistorySearch = async (id) => {
    try {
        return await historySearchService.deleteHistorySearch(id);
    } catch (err) {
        throw err;
    }
}

const addNewSearchCount = async (keyword,searchTypes) => {
    try {
        console.log(idUser,keyword);
        return await historySearchService.addNewSearchCount(idUser,keyword,searchTypes)
    } catch (err) {
        throw err;
    }
}
const getSearchPopular = async (keyword,searchTypes,limitData) => {
    try {
        return await historySearchService.getSearchPopular(keyword,searchTypes,limitData)
    } catch (err) {
        throw err;
    }
}


module.exports = { addNewHistorySearch,deleteHistorySearch,getHistorySearch,addNewSearchCount,getSearchPopular }