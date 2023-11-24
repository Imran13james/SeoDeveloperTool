const mongoose = require('mongoose');

const buysell = new mongoose.Schema({
    customerId: {
        type: Number,
        required: true,
    },
    EarniningPlatfroms: {
        type: String,
        enum: ['Gaming', 'TechI', 'themes&plugin', 'otheraccouts', 'Google&Blog'],
        required: true,
    },
    SerialNo: {
        title: {
            type: String,
            required: true,
        },
        AccName: {
            type: String,
            required: true,
        },
        AccountDesccrption: {
            type: String,
        },
        AccountUrl: {
            type: String,
            required: true,
        },
        Account_Age: {
            type: String,
        }
    },
});

const BuyANDSELL = mongoose.model('Buy_Sell', buysell);

module.exports = BuyANDSELL;
