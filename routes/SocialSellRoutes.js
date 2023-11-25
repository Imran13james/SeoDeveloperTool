const express = require('express');
const { CreateSocialsell, GetSocialsell, UpdateSocialsell, DeleteSocialsell } = require('../src/users/helpers/SocialSellControllers');
const router = express.Router();
//this router has been checked 
router.post('/create-social-sells', CreateSocialsell);
router.get("/add/create-social-sells", CreateSocialsellData)
function CreateSocialsellData(req, res) {

  res.render('SocialSelladd');
}
router.get('/get-social-sells', GetSocialsell);
//for updating 
// checked working or not // filhal kaam nahi kr rha hai 
router.put('/update-social-sells/:customerId', UpdateSocialsell);
router.get('/update-social-sells', UpdateUpdateSocialsellData);
function UpdateUpdateSocialsellData(req, res) {

  res.render('SocialsellUpdate');
}
router.get('/welcomeSocial', welcomeSocial);
function welcomeSocial(req, res) {

  res.render('WelcomeSocial');
}
// thhis is for deleting the user 
router.delete('/delete-social-sells/:customerId', DeleteSocialsell);
router.get('/delete-social-sells', DeleteDeleteSocialsell);
function DeleteDeleteSocialsell(req, res) {

  res.render('SocialsellDelete');
}
module.exports = router;