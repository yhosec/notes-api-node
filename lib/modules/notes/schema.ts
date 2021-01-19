import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    title: String,
    note: String,
    created_date: Date,
    updated_date: Date,
    deleted_date: Date
});

export default mongoose.model('notes', schema);