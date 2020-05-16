const Product = require('../models/product')


exports.postProduct = function(req, res, next){    
    Product.findOne({title: req.body.title}, (err, product) => {
        if (!product) {
            const product = new Product(req.body)
            if (typeof req.file !== 'undefined') {
                product.avatar = req.file.path;
            }

            if (typeof req.body.number !== 'undefined') {
                if (req.body.number == '0') {
                    product.status = 'Hết hàng';
                } else {
                    product.status = 'Còn hàng';
                }
            }

            product.save((err, result) => {
                if(err) {
                    return res.json( {err} )
                }
                res.json( {product: result} ) 
            })
                
        } else{
            res.json({err: 'Title has been used'})
        }
    })
}

exports.getAllProduct = function(req, res, next){    
    Product.find({}, (err, result) => {
        res.status(200).send(result);
    })
}

exports.getOneProduct = function(req, res, next){    
    Product.findOne({id : req.params.productID}).then((result) => {
        res.status(200).send(result);
    });
}


exports.update =  function (req, res, next) {
    Product.findOne({id : req.params.productID}, function (err, product) {
        if (err) return res.send(err)

        if (typeof req.body.title !== 'undefined') {
            product.title = req.body.title;
        }
        if (typeof req.body.summary !== 'undefined') {
            product.summary = req.body.summary;
        }
        if (typeof req.file !== 'undefined') {
            product.avatar = req.file.path;
        }
        if (typeof req.body.price !== 'undefined') {
            product.price = req.body.price;
        }
        if (typeof req.body.number !== 'undefined') {
            product.number = req.body.number;
        }
        if (typeof req.body.id !== 'undefined') {
            product.id = req.body.id;
        }
        if (typeof req.body.producer !== 'undefined') {
            product.producer = req.body.producer;
        }

        if (req.body.number == '0') {
            product.status = 'Hết hàng';
        } else {
            product.status = 'Còn hàng';
        }

        product.save(function (err) {
            if (err) return res.json(err);

            res.json({
                message: 'Update succes',
                data: product
            })
        })
    })
}

