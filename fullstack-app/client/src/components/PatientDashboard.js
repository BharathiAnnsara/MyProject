import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import './styles/PatientDashboard.css';

const PatientDashboard = () => {
  const { patientEmail } = useParams();
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");

  const handleFileUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/api/upload-to-ipfs", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setIpfsHash(res.data.IpfsHash);

      await axios.post("http://localhost:5000/api/store-record", {
        patientEmail,
        ipfsHash: res.data.IpfsHash
      });

      alert("Record added successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="patient-dashboard-container">
      <div className="patient-dashboard-card">
        <h2 className="patient-dashboard-title">Patient Dashboard - {patientEmail}</h2>

        <input type="file" className="file-input" onChange={(e) => setFile(e.target.files[0])} />
        <button className="upload-btn" onClick={handleFileUpload}>Upload to IPFS</button>

        {ipfsHash && (
          <p className="ipfs-link">
            File stored on IPFS:{" "}
            <a href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`} target="_blank" rel="noopener noreferrer">
              {ipfsHash}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
