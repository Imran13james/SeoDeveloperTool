const express = require('express');
const { createBuySell, getAllBuySell, updateBuySell, deleteBuySell } = require('../src/users/helpers/BuyAndSellcontrllers');
const router = express.Router();
//this router has been checked 
router.post('/create-buy-sells', createBuySell);
router.get("/add/create-buy-sells", createBuySellData)
function createBuySellData(req, res) {
  res.render('SellandBuyAdd');
}
router.get("/weltosocialpage", welcomepage)
function welcomepage(req, res) {
  res.render('WecomelBuyandsell');
}
// for front Use Only in next js Ahmed works
//also work on it and make sure for working in the backend
router.get('/get-buy-sells', getAllBuySell);
//for updating 
// checked working or not // filhal kaam nahi kr rha hai 
router.put('/update-buy-sells/:serialNo', updateBuySell);
router.get('/update-buy-sells', UpdateBuySellData);
function UpdateBuySellData(req, res) {

  res.render('UpdatingSeallandBuy');
}

router.delete('/delete-buy-sells/:serialNo', deleteBuySell);
router.get('/delete-buy-sells', DeleteBuySellData);
function DeleteBuySellData(req, res) {

  res.render('DeletesellandBuy');
}
module.exports = router;
