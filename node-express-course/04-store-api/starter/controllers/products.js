const Product = require('../models/product.js');

const getAllProductsStatic = async (req, res) => {
	const products = await Product.find({price: {$gt:30} }).select('name price').sort('price');
	res.status(200).json({products, nbHits: products.length});
}

const getAllProducts = async (req, res) => {
	const {featured,company,name,sort,fields, numericFilters} = req.query
	const queryObject = {}

	if (featured) {
		queryObject.featured = featured === 'true' ? true : false
	}
	if (company) {
		queryObject.company = company;
	}
	if (name) {
		queryObject.name = { $regex: name, $options: 'i' };
	}
	if (numericFilters) {
		const operatorMap = {
			'>':'$gt',
			'<':'$lt',
			'>=':'$gte',
			'<=':'$lte',
			'=':'$eq',
		}

		const regex = /\b(<|>|>=|<=|=)\b/g
		let filters = numericFilters.replace(regex, (match)=>`-${operatorMap[match]}-`)
		
		const options = ['price', 'rating'];
		filters = filters.split(',').forEach((item)=>{
			const [field, operator, value] = item.split('-');
			if (options.includes(field)) {
				queryObject[field] = {[operator]: Number(value) }
			}
		})
	}

	let result = Product.find(queryObject);
	if (sort) {
		const sortList = sort.split(',').join(' ');
		result.sort(sortList);
	} else {
		result = result.sort('createdAt');
	}
	if (fields) {
		const fieldsList = fields.split(',').join(' ');
		result.select(fieldsList);
	} else {
		result = result.select({});
	}
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page-1)*limit;
	result = result.skip(skip).limit(limit);

	//23 products, limit should show 4 pages if limit is 7 
	//skip is number of pages * items per page which is number to skip to page forward

	const products = await result;
	res.status(200).json({products, nbHits: products.length});
}

module.exports = {getAllProductsStatic, getAllProducts};
