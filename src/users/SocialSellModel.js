const mongoose = require('mongoose');

const socilapanelearning = new mongoose.Schema({
    customerId: {
        type: Number,
        required: true,
    },
    EarniningPlatfroms: {
        type: String,
        enum: ['Youtube', 'Facebook', 'Insatagram', 'Twitter', 'Tick&Tok', 'Website', "Snapchat", "OtherAccounts", "Telegram", "Snapchat"],
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

const SocialSell = mongoose.model('Socia_Sell_Buy', socilapanelearning);

module.exports = SocialSell;
