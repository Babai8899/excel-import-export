import express from 'express';
const user = express();
import { fileURLToPath } from 'url';
import path,  { dirname } from 'path';
import fs from 'fs';

import multer, { diskStorage } from 'multer';

import pkg from 'body-parser';
const { urlencoded } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

user.use(urlencoded({ extended: true }));
user.use(express.static(path.resolve(__dirname, 'public')));

const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

let upload = multer({ storage: storage });

import { importUser, exportUser } from '../controllers/userController.js';

user.post('/importUser', upload.any('file'), importUser);
user.get('/exportUser', exportUser);

export default user;