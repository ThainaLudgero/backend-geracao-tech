const Product = require('../models/Product');

const getProducts = async (req, res) => {
    try {
        const { 
            limit = 12, 
            page = 1, 
            fields = 'id,name,images,price', 
            match, 
            category_ids, 
            'price-range': priceRange, 
            ...options 
        } = req.query;

        // Parsing e validação dos parâmetros
        const parsedLimit = parseInt(limit, 10);
        const parsedPage = parseInt(page, 10);
        const fieldsArray = fields ? fields.split(',') : ['id', 'name', 'images', 'price'];
        
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
            where: {}
        };

        // Filtro por nome ou descrição (match)
        if (match) {
            queryOptions.where[Op.or] = [
                { name: { [Op.like]: `%${match}%` } },
                { description: { [Op.like]: `%${match}%` } }
            ];
        }

        // Filtro por categorias
        if (category_ids) {
            const categoryIdsArray = category_ids.split(',').map(id => parseInt(id.trim(), 10));
            queryOptions.where.category_id = { [Op.in]: categoryIdsArray };
        }

        // Filtro por faixa de preço
        if (priceRange) {
            const [minPrice, maxPrice] = priceRange.split('-').map(value => parseFloat(value));
            if (!isNaN(minPrice) && !isNaN(maxPrice)) {
                queryOptions.where.price = { [Op.between]: [minPrice, maxPrice] };
            }
        }

        // Filtro por opções
        Object.keys(options).forEach(key => {
            if (key.startsWith('option[') && key.endsWith(']')) {
                const optionId = key.slice(7, -1);
                const optionValues = options[key].split(',').map(value => value.trim());
                queryOptions.include = queryOptions.include || [];
                queryOptions.include.push({
                    model: ProductOption, 
                    where: {
                        id: optionId,
                        value: { [Op.in]: optionValues }
                    }
                });
            }
        });

        const { count, rows } = await Product.findAndCountAll(queryOptions);

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


module.exports = {
    getProducts
};
