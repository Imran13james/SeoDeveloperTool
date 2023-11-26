const mongoose = require('mongoose');
function validateDescriptionLength(description) {
    const wordCount = description.trim().split(/\s+/).length;
    return wordCount <= 20;
}
const socilapanelearning = new mongoose.Schema({
    serialNo: {
        type: Number,
        required: true,
    },
    earningPlatforms: {
        type: String,
        enum: ['Youtube', 'Facebook', 'Insatagram', 'Twitter', 'TikTok', 'Website', "Snapchat", "OtherAccounts", "Telegram", "LINKEDIN"],
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
            require: true,
        }
    },
});

const SocialSell = mongoose.model('Socia_Sell_Buy', socilapanelearning);

module.exports = SocialSell;