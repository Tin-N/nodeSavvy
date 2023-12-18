const categoryModel = require('./CategoryModel');

//lay category chua xoa
const getAPICategoryNotDelete = async (isDelete) => {
  try {
    // return data;
    return await categoryModel.find({ isDelete: false });
  } catch (error) {
    console.log('Get all categories aerror: ', error);
    throw error;
  }
}

//lay category da chua xoa
const getAPICategoryDelete = async (isDelete) => {
  try {
    // return data;
    return await categoryModel.find({ isDelete: true });
  } catch (error) {
    console.log('Get all categories aerror: ', error);
    throw error;
  }
}

//getAll category
const getAPICategory = async () => {
  try {
    // return data;
    return await categoryModel.find();
  } catch (error) {
    console.log('Get all categories aerror: ', error);
    throw error;
  }
}

const getAPICategoryById = async (id) => {
  try {
    // return data;
    return await categoryModel.findById(id);
  } catch (error) {
    console.log('Get all categories aerror: ', error);
    throw error;
  }
}

const deleteCategoryById = async (id, isDelete) => {
  try {
    const category = await categoryModel.findById(id);
    if (category) {
      category.isDelete = isDelete ? isDelete : category.isDelete;
      await category.save();
      return true;
    }
    return false;
  } catch (error) {
    console.log('Deletee category by id error: ', error);
    return false;
  }
}


const addCategory = async (name, color, images, isDelete) => {
  try {
    const newCategory = { name, color, images, isDelete };
    const c = new categoryModel(newCategory);
    await c.save();
    return true;

  } catch (error) {
    console.log('Add new category error: ', error);
    return false;
  }
}


const updateCategoryByid = async (id, name, images, color) => {
  try {
    console.log(name);
    const category = await categoryModel.findById(id);
    if (category) {
      category.name = name ? name : category.name;
      category.images = images ? images : category.images;
      category.color = color ? color : category.color;
      await category.save();
      return true;
    }
    return false;
  } catch (error) {
    console.log('Update category by id error: ', error);
    return false;
  }
}

// const searchCategoryName = async (name) =>{
//   try {
//     return await categoryModel.find({ name: { $regex: name, $options: "i" } })
//   } catch (error) {
//     console.log('searchByName error: ' + error);
//   }
// }

module.exports = { getAPICategoryNotDelete, deleteCategoryById, addCategory, updateCategoryByid, getAPICategoryDelete, getAPICategory, getAPICategoryById};