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
        enum: ['Gaming', 'TechI', 'Themes&Plugins', 'OtherAccounts', 'Google&Blog'],
        required: true,
    },
    aboutThisAccount: {
        title: {
            type: String,
        },
        accPrice: {
            type: Number,
            required: true,
        },
        accName: {
            type: String,
        },
        accountDescription: {
            type: String,
            validate: [validateDescriptionLength, 'Account description should be 20 words or less'],
        },
        accountUrl: {
            type: String,
            required: true,
        },
        accountAge: {
            type: String,
            require:true,
        }
    },
});

const BuyAndSell = mongoose.model('BuyAndSell', buySellSchema);

module.exports = BuyAndSell;