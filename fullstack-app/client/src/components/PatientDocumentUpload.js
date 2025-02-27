import React, { useState } from "react";
import axios from "axios";

const PatientDocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("document", file);

    try {
      const response = await axios.post("http://localhost:5000/api/patient/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setIpfsHash(response.data.ipfsHash);
      setError("");
    } catch (err) {
      setError("Upload failed. Try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Upload Patient Document</h2>
      <input type="file" onChange={handleFileChange} accept="image/*,.pdf,.doc,.docx" />
      <button onClick={handleUpload} style={{ marginLeft: "10px" }}>Upload</button>

      {ipfsHash && (
        <div>
          <h3>Document Stored on IPFS</h3>
          <p>IPFS Hash: {ipfsHash}</p>
          <a href={`https://ipfs.io/ipfs/${ipfsHash}`} target="_blank" rel="noopener noreferrer">
            View Document
          </a>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default PatientDocumentUpload;
