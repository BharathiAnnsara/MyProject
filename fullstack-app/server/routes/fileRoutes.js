import express from 'express';
import multer from 'multer';
import { uploadFile, getFiles } from '../Controllers/fileController.js';

const router = express.Router();
const upload = multer();  // Handle file uploads

router.post('/upload', upload.single('file'), uploadFile);
router.get('/files', getFiles);

export default router;
