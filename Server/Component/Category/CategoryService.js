const categoryModel = require('./CategoryModel');

const getAPICategory = async (page, size) => {
    try {
        // return data;
        return await categoryModel.find();
    } catch (error) {
        console.log('Get all categories aerror: ', error);
        throw error;
    }
}

const deleteCategoryById = async (id) => {
    try {
        await categoryModel.findByIdAndDelete(id);
        return true;
    } catch (error) {
        console.log('Deletee category by id error: ', error);
        return false;
    }
}

const addCategory = async (name) => {
    try {
        const newCategory = { name };
        const c = new categoryModel(newCategory);
        await c.save();
        return true;
    
      } catch (error) {
        console.log('Addd new category error: ', error);
        return false;
      }
}
const updateCategoryByid = async (id, name) => {
    try {
      const category = await categoryModel.findById(id);
      if (category) {
        category.name = name ? name : category.name;
        await category.save();
        return true;
      }
      return false;
    } catch (error) {
      console.log('Update category by id error: ', error);
      return false;
    }
  }
module.exports = { getAPICategory, deleteCategoryById, addCategory, updateCategoryByid};