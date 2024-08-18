const Category = require('../models/Category');

const getCategories = async (req, res) => {
    try {
        const { limit = 12, page = 1, fields = 'id,name,slug', use_in_menu } = req.query;

        // Parsing e validação dos parâmetros
        const parsedLimit = parseInt(limit, 10);
        const parsedPage = parseInt(page, 10);
        const fieldsArray = fields ? fields.split(',') : ['id', 'name', 'slug', 'use_in_menu'];

        // Validação dos parâmetros
        if (isNaN(parsedLimit) || parsedLimit < -1) {
            return res.status(400).json({ message: 'Invalid limit parameter' });
        }

        if (parsedPage < 1) {
            return res.status(400).json({ message: 'Invalid page parameter' });
        }

        // Construir a consulta
        const queryOptions = {
            attributes: fieldsArray,
            limit: parsedLimit === -1 ? undefined : parsedLimit,
            offset: parsedLimit === -1 ? 0 : (parsedPage - 1) * parsedLimit,
        };

        if (use_in_menu === 'true') {
            queryOptions.where = { use_in_menu: true };
        }

        const { count, rows } = await Category.findAndCountAll(queryOptions);

        const response = {
            data: rows,
            total: count,
            limit: parsedLimit,
            page: parsedPage
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getCategoryById = async (req, res) => {
    try {
      const attributes = ['id', 'name', 'slug', 'use_in_menu'];
      const category = await Category.findByPk(req.params.id, {
        attributes
      });
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      return res.status(200).json(category);
    } catch (error) {
      console.error('Error fetching category:', error);
      return res.status(500).json({ error: 'An error occurred', details: error.message });
    }
};

const createCategory = async (req, res) => {
    try {
      const { name, slug, use_in_menu } = req.body;
  
      // Check if the required fields are present
      if (!name || !slug || use_in_menu === undefined) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      // Create a new category
      const newCategory = await Category.create({
        name,
        slug,
        use_in_menu,
      });
  
      return res.status(201).json(newCategory);
    } catch (error) {
      console.error('Error creating category:', error);
      return res.status(500).json({ error: 'An error occurred', details: error.message });
    }
  };

module.exports = {
    getCategories, 
    getCategoryById, 
    createCategory
};
