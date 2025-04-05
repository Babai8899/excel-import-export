import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    userName: {
        type: String,
    },
    mobile: {
        type: Number,
    }
}); 

export default model('User', UserSchema);