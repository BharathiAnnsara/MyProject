import React, { useState } from "react";
import axios from "axios";

const UploadMedicalRecord = () => {
  const [file, setFile] = useState(null);
  const [cid, setCid] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setSuccess("");
  };

  const uploadToIPFS = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer YOUR_PINATA_JWT`,  // Replace with your Pinata JWT token
        },
      });

      return response.data.IpfsHash; // CID from IPFS
    } catch (err) {
      throw new Error("Failed to upload to IPFS");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Step 1: Upload to IPFS
      const fileCID = await uploadToIPFS(file);
      setCid(fileCID);

      // Step 2: Store CID in MongoDB
      await axios.post("http://localhost:5000/api/records/upload", { cid: fileCID });

      setSuccess("File uploaded successfully!");
    } catch (err) {
      setError(err.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Upload Medical Record</h2>
      <input type="file" accept="image/*,.pdf" onChange={handleFileChange} className="mb-3 p-2 border rounded" />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
      {cid && (
        <p className="mt-3 text-green-600">
          File CID: <a href={`https://ipfs.io/ipfs/${cid}`} target="_blank" rel="noopener noreferrer" className="underline">
            {cid}
          </a>
        </p>
      )}
      {error && <p className="mt-3 text-red-500">{error}</p>}
      {success && <p className="mt-3 text-green-500">{success}</p>}
    </div>
  );
};

export default UploadMedicalRecord;
