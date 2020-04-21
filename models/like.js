const mongoose = require('mongoose');


const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // this defines object id of like object
    likeable:
    {
        type: mongoose.Schema.Types.ObjectId,
        require : true,
        refPath : 'onModel'
    },
    // this define the type of object it is refering
    onModel :
    {
        type: String,
        require : true,
        enum : ['Post',"Comment"]
    }
    
},{
    timestamps: true
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;