const mongoose = require('mongoose');

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