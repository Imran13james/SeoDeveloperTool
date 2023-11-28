const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create a function to ensure the uploads directory exists
const createUploadsFolder = () => {
  const uploadPath = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
  }
};

// Call the function to ensure the uploads directory exists
createUploadsFolder();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = path.basename(file.originalname).replace(ext, '');
    const uniqueFilename = filename + '-' + Date.now() + ext;
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
