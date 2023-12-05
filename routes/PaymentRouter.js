const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
const conn = mongoose.connection;
let gfs;
const upload = require('../Storage');
const { uploadImage, readFiles, RenderALlDetails } = require('../src/users/PaymentControoler');

router.post('/upload-image', upload.single('image'), uploadImage);
router.get('/All_Payment_accounts_deatils',readFiles)
router.delete('/Delete_Payment_accounts_deatils',readFiles)
router.get("/Create_Payment_accounts_deatils",renderCreateForpament)
router.get("/Get_All_Payment_accounts_deatils",renderGetAllDeatils)
router.get('/accounts',RenderALlDetails)
function renderCreateForpament(req, res) {
    res.render('PaymentAdd');
  }
  function renderGetAllDeatils(req, res) {
    res.render('GetAllPagment');
  }

  conn.once('open', () => {
    gfs = new GridFSBucket(conn.db, {
      bucketName: 'uploads' // Your bucket name where images are stored
    });
  });
  router.get('/image/:filename', (req, res) => {
    gfs.find({ filename: req.params.filename }).toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({ message: 'File not found' });
      }
  
      const readstream = gfs.openDownloadStreamByName(req.params.filename);
      readstream.pipe(res);
    });
  });
module.exports = router;
