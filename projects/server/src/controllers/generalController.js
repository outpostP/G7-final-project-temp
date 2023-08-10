const db = require('../../models')
const Category = db.Category;

async function getCategoryFree(req,res) {
    try {
        const category = await Category.findAll();
        res.status(200).json({data: category});
    } catch (error) {
        res.status(500).json({message: 'error fetching categories'})
}
}

module.exports = getCategoryFree