const { Product, ProductImage } = require('../models/productAssociation');
const Category = require('../models/Category');

const getProducts = async (req, res) => {
    try {
        const { 
            limit = 12, 
            page = 1, 
            fields = 'id,name,price', 
            match, 
            category_ids, 
            'price-range': priceRange, 
            ...options 
        } = req.query;

        const parsedLimit = parseInt(limit, 10);
        const parsedPage = parseInt(page, 10);
        const fieldsArray = fields ? fields.split(',') : ['id', 'name', 'price'];

        if (isNaN(parsedLimit) || parsedLimit < -1) {
            return res.status(400).json({ message: 'Invalid limit parameter' });
        }

        if (parsedPage < 1) {
            return res.status(400).json({ message: 'Invalid page parameter' });
        }

        const queryOptions = {
            attributes: fieldsArray,
            limit: parsedLimit === -1 ? undefined : parsedLimit,
            offset: parsedLimit === -1 ? 0 : (parsedPage - 1) * parsedLimit,
            where: {},
            include: [
                {
                    model: ProductImage,
                    as: 'images', // Alias usado no relacionamento
                    attributes: ['id', 'path']
                }
            ]
        };

        if (match) {
            queryOptions.where[Op.or] = [
                { name: { [Op.like]: `%${match}%` } },
                { description: { [Op.like]: `%${match}%` } }
            ];
        }

        if (category_ids) {
            const categoryIdsArray = category_ids.split(',').map(id => parseInt(id.trim(), 10));
            queryOptions.where.category_id = { [Op.in]: categoryIdsArray };
        }

        if (priceRange) {
            const [minPrice, maxPrice] = priceRange.split('-').map(value => parseFloat(value));
            if (!isNaN(minPrice) && !isNaN(maxPrice)) {
                queryOptions.where.price = { [Op.between]: [minPrice, maxPrice] };
            }
        }

        Object.keys(options).forEach(key => {
            if (key.startsWith('option[') && key.endsWith(']')) {
                const optionId = key.slice(7, -1);
                const optionValues = options[key].split(',').map(value => value.trim());
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
            data: rows.map(product => ({
                ...product.toJSON(),
                images: product.images.map(image => ({
                    id: image.id,
                    content: image.path,
                })),
            })),
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

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        // Verifica se o ID é um número válido
        if (isNaN(parseInt(id, 10))) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        const product = await Product.findOne({
            where: { id },
            include: [
                {
                    model: ProductImage,
                    as: 'images',
                    attributes: ['id', 'path'] // Use 'path' se esse for o nome correto
                }
            ]
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Formatar resposta
        const response = {
            id: product.id,
            enabled: product.enabled,
            name: product.name,
            slug: product.slug,
            stock: product.stock,
            description: product.description,
            price: product.price,
            price_with_discount: product.price_with_discount,
            category_ids: [], // Ajuste conforme necessário se você tiver uma tabela de categorias associadas
            images: product.images.map(image => ({
                id: image.id,
                content: `https://store.com/media/${product.slug}/${image.path}`
            })),
            options: [] // Ajuste conforme necessário se você tiver uma tabela de opções associadas
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const createProduct = async (req, res) => {
    try {
        const { enabled, name, slug, stock, description, price, price_with_discount, category_ids } = req.body;

        // Validação básica dos campos obrigatórios
        if (!name || !slug || !price || !category_ids || !Array.isArray(category_ids) || category_ids.length === 0) {
            return res.status(400).json({ message: 'Dados inválidos. Verifique os campos obrigatórios.' });
        }

        // Criação do produto
        const newProduct = await Product.create({
            enabled,
            name,
            slug,
            stock,
            description,
            price,
            price_with_discount
        });

        // Associar categorias ao produto
        if (category_ids && category_ids.length > 0) {
            const categories = await Category.findAll({ where: { id: category_ids } });
            await newProduct.setCategories(categories);
        }

        return res.status(201).json({ message: 'Produto criado com sucesso', product: newProduct });
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { enabled, name, slug, stock, description, price, price_with_discount, category_ids } = req.body;

        // Validação básica dos campos obrigatórios
        if (!name || !slug || !price || !category_ids || !Array.isArray(category_ids) || category_ids.length === 0) {
            return res.status(400).json({ message: 'Dados inválidos. Verifique os campos obrigatórios.' });
        }

        // Encontrar o produto
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }

        // Atualizar o produto
        await Product.update(
            { enabled, name, slug, stock, description, price, price_with_discount },
            { where: { id } }
        );

        // Atualizar categorias associadas ao produto
        if (category_ids && category_ids.length > 0) {
            const categories = await Category.findAll({ where: { id: category_ids } });
            await product.setCategories(categories);
        }

        return res.status(204).send(); // Nenhum corpo deve ser retornado
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct
};
