const categorySevice = require('./CategoryService');

const getAPICategoryNotDelete = async(isDelete) =>{
    try{
        return await categorySevice.getAPICategoryNotDelete(isDelete);
    }catch(error){
        throw error;
    }
}

const getAPICategoryDelete = async(isDelete) =>{
    try{
        return await categorySevice.getAPICategoryDelete(isDelete);
    }catch(error){
        throw error;
    }
}

const getAPICategory = async() =>{
    try{
        return await categorySevice.getAPICategory();
    }catch(error){
        throw error;
    }
}

const getAPICategoryById = async(id) =>{
    try{
        return await categorySevice.getAPICategoryById(id);
    }catch(error){
        throw error;
    }
}

const deleteCategoryById = async (id, isDelete) =>{
    try {
        return await categorySevice.deleteCategoryById(id, isDelete);
    } catch (error) {
        return false;
    }
}

const addCategory = async (name, color, images, isDelete) => {
    try {
        return await categorySevice.addCategory(name, color, images, isDelete);
    } catch (error) {
        return false;
    }
}

const updateCategoryByid = async (id, name, images, color ) =>{
    try {
        return await categorySevice.updateCategoryByid(id, name, images, color);
    } catch (error) {
        return false;
    }
}

const searchCategoryName = async (name) => {
    try {

        return await categorySevice.searchCategoryName(name);
    } catch (error) {
        console.log('searchByName error(contr): ' + error);
        return false;
    }
}
module.exports = {getAPICategory, deleteCategoryById, addCategory, updateCategoryByid, getAPICategoryNotDelete, getAPICategoryDelete, getAPICategoryById};