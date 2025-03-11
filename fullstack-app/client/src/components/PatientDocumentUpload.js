import React, { useState } from "react";
import axios from "axios";
import "./styles/PatientDocumentupload.css";

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
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        setIpfsHash(response.data.ipfsHash);
        setError("");
      } else {
        setError("Upload failed. Try again.");
      }
    } catch (err) {
      setError("Upload failed. Try again.");
    }
  };

  return (
    <div className="patient-upload-container">
      <div className="patient-upload-card">
        <h2 className="patient-upload-title">Upload Patient Document</h2>
        <input
          type="file"
          className="upload-input"
          onChange={handleFileChange}
          accept="image/*,.pdf,.doc,.docx"
        />
        <button className="upload-btn" onClick={handleUpload}>
          Upload
        </button>

        {ipfsHash && (
          <div className="ipfs-info">
            <h3>Document Stored on IPFS</h3>
            <p className="ipfs-hash">IPFS Hash: {ipfsHash}</p>
            <a
              href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
              className="ipfs-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Document
            </a>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default PatientDocumentUpload;
