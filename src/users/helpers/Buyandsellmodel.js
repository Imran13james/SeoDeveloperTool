const mongoose = require('mongoose');

function validateDescriptionLength(description) {
    const wordCount = description.trim().split(/\s+/).length;
    return wordCount <= 20;
}
/// length should less done 20 words
const buySellSchema = new mongoose.Schema({
    serialNo: {
        type: Number,
        required: true,
    },
    earningPlatforms: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
    aboutThisAccount: {
        accPrice: {
            type: String,
            required: true,
        },
        accName: {
            type: String,
        },
        accountUrl: {
            type: String,
            required: true,
        },
        accountAge: {
            type: Number,
            require:true,
        },
    },
});

const BuyAndSell = mongoose.model('BuyAccountDb', buySellSchema);

module.exports = BuyAndSell;