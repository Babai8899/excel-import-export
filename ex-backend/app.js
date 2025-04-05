import { connect } from 'mongoose';
import cors from 'cors';

connect('mongodb://127.0.0.1:27017/MyDB');

import express from 'express';
const app = express();
app.use(express.json());
app.use(cors());

import userRoutes from './routes/userRoutes.js';
app.use('/',userRoutes);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});