const mongoose = require('mongoose');

const socilapanelearning = new mongoose.Schema({
    serialNo: {
        type: Number,
        required: true,
    },
    earningPlatforms: {
        type: String,
        enum:['Youtube', 'Facebook', 'Insatagram', 'Twitter', 'TikTok', 'Website', "Snapchat", "OtherAccounts", "Telegram", "LINKEDIN"],
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

const SocialSell = mongoose.model('Socia_Sell_Buy', socilapanelearning);

module.exports = SocialSell;