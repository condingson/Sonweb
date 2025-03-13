var mongoose = require('mongoose');

var ChildrenToySchema = mongoose.Schema({
    id: Number, 
    name: String,
    Trademark: String,
    Price: Number,
    image: String,
    Describe:String,

    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brands'  
    },
});

var ChildrenToy = mongoose.model("ChildrenToy", ChildrenToySchema, "ChildrenToy");
module.exports = ChildrenToy;