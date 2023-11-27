const mongoose = require('mongoose');
const { Schema } = mongoose;

const detailsSchema = new Schema({
    accountFullname: {
    type: String,
    required: [true],
  },
    DescFull:{
        type: String,
        required: [true],
    },
    siteAge:{
        type: String,
        required: [true],
    },
    monthlyProfit:{
        type: String,
        required: [true],
    },
    profitMargin:{
        type: String,
        required: [true],
    },
    pageViews:{
        type: String,
        required: [true],
    },
    profitMultiple:{
        type: String,
        required: [true],
    },
    revenueMultiple:{
        type: String,
        required: [true],
    },
    performanceOverviewimg:{
        type: String,
    },
    performanceOverviewDetails:{
        type: String,
    },
    moreDetailsimg:{
        type: String,
    },
    moreDetailsDetails:{
        type: String,
    },
    monthlyrevenueimg:{
        type: String,
    },
    monthlyrevenueDetails:{
        type: String,
    },
    accountAnalyticsimg:{
        type: String,
    },
    accountAnalyticsDetails:{
        type: String,
    },
    googleAnalyticsimg:{
        type: String,
    },
    googleAnalyticsDetails:{
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
const viewDetailsSchema = mongoose.model("accountViewdetails", detailsSchema);

module.exports = viewDetailsSchema;
