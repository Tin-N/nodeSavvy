const categorySevice = require('./CategoryService');

const getAPICategory = async(page, size) =>{
    try{
        return await categorySevice.getAPICategory(page, size);
    }catch(error){
        throw error;
    }
}

const deleteCategoryById = async (id) =>{
    try{
        return await categorySevice.deleteCategoryById(id);
    }catch(error){
        return false;
    }
}

const addCategory = async (name) => {
    try {
        return await categorySevice.addCategory(name);
    } catch (error) {
        return false;
    }
}

const updateCategoryByid = async (id, name) =>{
    try {
        return await categorySevice.updateCategoryByid(id, name);
    } catch (error) {
        return false;
    }
}

module.exports = {getAPICategory, deleteCategoryById, addCategory, updateCategoryByid};