import * as multer from 'multer';

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'photos')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

export let upload = multer({ storage: storage });