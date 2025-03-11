import ipfs from '../config/ipfs.js';
import MedicalRecord from '../models/MedicalRecord.js';

// Upload File to IPFS
export const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Upload file buffer to IPFS
        const addedFile = await ipfs.add(req.file.buffer);
        const fileCID = addedFile.path;  // Get the CID of uploaded file

        // Save CID in MongoDB
        const newRecord = new MedicalRecord({
            patientName: req.body.patientName,
            doctorName: req.body.doctorName,
            fileCID: fileCID
        });

        await newRecord.save();
        res.json({ message: "File uploaded successfully", fileCID });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "File upload failed" });
    }
};

// Retrieve Files from MongoDB
export const getFiles = async (req, res) => {
    try {
        const records = await MedicalRecord.find();
        res.json(records);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching records" });
    }
};
