const mongoose = require('mongoose')
const Schema = mongoose.Schema

var productSchema = new Schema({
    id:             {type: String, required: false},
    title:          {type: String, required: false},
    number:         {type: String, required: false},
    price:          {type: String, required: false},
    summary:        {type: String, required: false},
    status:         {type: String, enum: ["Còn hàng", "Hết hàng"]},
    avatar:         {type: String, required: false},
    producer:       {type: String, required: false}
});

exports.findById = (id) => {
    return Products.findById(id).then((result) => {
        result = result.toJSON();
        delete result._v;
        return result;
    });
};



module.exports = mongoose.model('Product', productSchema, 'Products')