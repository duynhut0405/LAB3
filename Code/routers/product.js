const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
router.use(bodyParser())
router.use(bodyParser.urlencoded({extended:false }))
router.use(bodyParser.json())


const { postProduct, getOneProduct, getAllProduct, update} = require('../controllers/product')

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});


const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get('/', getAllProduct)

router.post('/add', upload.single('avatar'), postProduct)

router.route('/:productID')
      .get(getOneProduct)
      .patch(update)
      .put(update)
      .delete(getOneProduct)

module.exports = router;


