const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    accountName: {
    type: String,
  },
  accountType: {
    type: String,
  },
  accountAge: {
    type: Number,
    min: 0, 
  },
  accountUrl: {
    type: String,
  },
  accountImage: {
    type: String,
  },
  accountDesc: {
    type: String,
  },
  monetizationEnabled: {
    type: String,
  },
  paymentMethod: { // i have change here paymentMethod instead of accountmethod  look good to pronounce
    type: String,
  },
  email: {
    type: String,
  },
  contactNumber: {
    type: Number,
  },
  telegramUsername: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const SellModel = mongoose.model("SellAccountDb", userSchema);

module.exports = SellModel;
