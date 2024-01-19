import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: false,
    },
    mood: {
        type: String, 
        possibleValues: ['happy','meh','sad'],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    userRef:{
        type: String,
        required: true,
    },
    
}, {timestamps: true}

)

const Entry = mongoose.model('Entry', entrySchema);

export default Entry;