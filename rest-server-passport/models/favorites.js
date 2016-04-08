var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dishIdSchema = new Schema({
    dishContent: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Dishes'
    }
});
var favoriteSchema = new Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes: [dishIdSchema]
}, {
    timeStamp: true
});

var Favorites = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorites;