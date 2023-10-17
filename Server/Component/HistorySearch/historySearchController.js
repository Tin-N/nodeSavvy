const historySearchService = require('./historySearchService');


//  
const addNewHistorySearch = async (idUser,keyword,searchTypes) => {
    try {
        console.log(idUser,keyword,searchTypes);
        return await historySearchService.addHistorySearch(idUser,keyword,searchTypes)
    } catch (err) {
        throw err;
    }
}
const getHistorySearch = async (idUser,searchTypes,limitData) => {
    try {
        return await historySearchService.getHistorySearch(idUser,searchTypes,limitData)
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

module.exports = { addNewHistorySearch,deleteHistorySearch,getHistorySearch }