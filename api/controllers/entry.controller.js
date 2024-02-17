import Entry from "../models/entry.model.js";
import { errorHandler } from "../utils/error.js";
import CryptoJS from 'crypto-js';


// export const createEntry = async (req, res, next) => {

//     try {
//         const entry = await Entry.create(req.body);
//         return res.status(201).json(entry);
//     } catch (error) {
//         next(error);
//     }
// }

export const createEntry = async (req, res, next) => {
    const {date, title, mood, description, userRef } = req.body
    const encryptDescription = CryptoJS.AES.encrypt(description, process.env.ENCRYPT_WORD).toString();
    try {
        const entry = await Entry.create({ date, title, mood, userRef, description: encryptDescription});
        return res.status(201).json(entry);
    } catch (error) {
        next(error);
    }
}


export const deleteEntry = async (req, res, next) => {
    const entry = await Entry.findById(req.params.id);

    if (!entry) {
        return next(errorHandler(404, "Entry not found!"))
    }

    if (req.user.id !== entry.userRef) {
        return next(errorHandler(401, "You can only delete your own Entries!"))
    }

    try {
        await Entry.findByIdAndDelete(req.params.id);
        res.status(200).json('Entry has been deleted!')
    } catch (error) {
        next(error);
    }
}


export const updateEntry = async (req, res, next) => {
    const entry = await Entry.findById(req.params.id);
    
    const encryptDescription = Object.assign(entry, {description: CryptoJS.AES.encrypt(entry.description, 'password').toString()});
    // const encryptEntry = await Entry.create({ date, title, mood, userRef, description: encryptDescription});
    console.log('encryptDescription', encryptDescription);
    if (!encryptDescription) {
        return next(errorHandler(404, "Entry not found!"))
    }
    if (req.user.id !== encryptDescription.userRef) {
        return next(errorHandler(401, 'You can only update your own entries!'))
    }

    try {
        const updatedEntry = await Entry.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedEntry)
    } catch(error) {
        next(error);
    }
    // if (!entry) {
    //     return next(errorHandler(404, "Entry not found!"))
    // }
    // if (req.user.id !== entry.userRef) {
    //     return next(errorHandler(401, 'You can only update your own entries!'))
    // }

    // try {
    //     const updatedEntry = await Entry.findByIdAndUpdate(
    //         req.params.id,
    //         req.body,
    //         { new: true }
    //     );
    //     res.status(200).json(updatedEntry)
    // } catch(error) {
    //     next(error);
    // }
};


export const getEntry = async (req, res, next) => {
    
    try {
        const entry = await Entry.findById(req.params.id);
        console.log('entry:', entry)
        const updated = Object.assign(entry, {description: CryptoJS.AES.decrypt(entry.description, process.env.ENCRYPT_WORD).toString(CryptoJS.enc.Utf8)
        })
        // const updated = {...entry, description: CryptoJS.AES.decrypt(entry.description, 'password').toString(CryptoJS.enc.Utf8) }
        if (!entry) {
            return next(errorHandler(404, "Entry not found!"));
        }
        // console.log('updated', updated);
        res.status(200).json(updated)
    } catch(error) {
        next(error);
    }
}