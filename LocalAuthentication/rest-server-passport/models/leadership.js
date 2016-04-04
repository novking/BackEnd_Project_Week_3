var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var leadershipSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        require: true
    },
    designation:{
        type: String,
        required: true
    },
    abbr:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

var Leadership = mongoose.model('Leadership', leadershipSchema);

module.exports = Leadership;
