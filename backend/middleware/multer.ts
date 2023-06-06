const multer = require("multer");
import { Request, Express } from 'express'
import { FileFilterCallback } from 'multer'

type DestinationCallback = (error: Error | null, destination: string | boolean) => void
type FileNameCallback = (error: Error | null, filename: string | boolean) => void

const storage = multer.diskStorage({
  // destination: './assets',
  destination:
    function (req: Request,
      file: Express.Multer.File,
      cb: DestinationCallback) {
      console.log({ body: req.body, file })
      if ('type' in req.body)
        cb(null, `./assets/${req.body.type}`);
      else
        cb(null, `./assets/uploads`);

    },
  filename:
    function (_req: Request,
      file: Express.Multer.File,
      cb: FileNameCallback) {
      cb(null, new Date().toISOString().replace(/:/g, "-") + "multerCustomImage" + file.originalname);
    }
});

const fileFilter = (_req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback) => {
  console.log({ file, body: _req.body })

  const whitelist = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp'
  ]
  const isWhiteList = whitelist.includes(file.mimetype)
  console.log({ isWhiteList })
  cb(null, isWhiteList);

};

const uploadMulter = multer({
  storage: storage,
  /* limits: {
    fileSize: 1024 * 1024,
  }, */
  fileFilter: fileFilter,
});

module.exports = uploadMulter;
