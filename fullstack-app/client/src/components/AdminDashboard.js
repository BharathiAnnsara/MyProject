// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const AdminDashboard = () => {
//   const [file, setFile] = useState(null);
//   const [ipfsHash, setIpfsHash] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState("");

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const uploadToIPFS = async () => {
//     if (!file) {
//       setError("Please select a file to upload.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     setUploading(true);
//     setError("");

//     try {
//       const res = await axios.post("http://localhost:5000/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setIpfsHash(res.data.IpfsHash);
//     } catch (err) {
//       setError("Upload failed. Try again.");
//       console.error(err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
//       <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
//       <p className="text-lg text-gray-700 mb-6">Manage hospital records and users efficiently.</p>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <Link to="/manage-records" className="p-4 bg-blue-500 text-white text-center rounded-lg shadow-md hover:bg-blue-600">
//           Manage Hospital Records
//         </Link>
//         <Link to="/manage-users" className="p-4 bg-green-500 text-white text-center rounded-lg shadow-md hover:bg-green-600">
//           Manage Users
//         </Link>
//       </div>

//       {/* IPFS File Upload Section */}
//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-xl font-bold mb-4">Upload File to IPFS</h2>
//         <input type="file" onChange={handleFileChange} className="mb-2 w-full border p-2 rounded" />
//         <button
//           onClick={uploadToIPFS}
//           className="w-full p-2 bg-purple-500 text-white rounded hover:bg-purple-600"
//           disabled={uploading}
//         >
//           {uploading ? "Uploading..." : "Upload to IPFS"}
//         </button>

//         {error && <p className="text-red-500 mt-2">{error}</p>}

//         {ipfsHash && (
//           <div className="mt-4">
//             <p className="text-green-600 font-semibold">File uploaded successfully!</p>
//             <a
//               href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 underline"
//             >
//               View File on IPFS
//             </a>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



// import { useState } from "react";
// import axios from "axios";
// import PatientDashboard from "./PatientDashboard";
// import "./styles/AdminDashboard.css"; // Import the CSS file

// const AdminDashboard = () => {
//   const [adminEmail, setAdminEmail] = useState("");
//   const [patientEmail, setPatientEmail] = useState("");
//   const [accessGranted, setAccessGranted] = useState(false);
//   const [error, setError] = useState("");

//   const handleAccess = async () => {
//     setError(""); // Reset error before making a request

//     try {
//       const response = await axios.post("http://localhost:5000/api/validate-access", {
//         adminEmail,
//         patientEmail,
//       });

//       if (response.data.success) {
//         setAccessGranted(true);
//       } else {
//         setError("Access Denied! Invalid email or no permission.");
//       }
//     } catch (error) {
//       console.error("Error validating access:", error);
//       setError("An error occurred while validating access. Please try again.");
//     }
//   };

//   return (
//     <div className="admin-dashboard-container">
//       <div className="admin-dashboard-card">
//         <h2 className="admin-dashboard-title">Admin Dashboard</h2>
//         {!accessGranted ? (
//           <div className="admin-form">
//             <input
//               type="email"
//               placeholder="Admin Email"
//               value={adminEmail}
//               onChange={(e) => setAdminEmail(e.target.value)}
//               className="admin-input"
//             />
//             <input
//               type="email"
//               placeholder="Patient Email"
//               value={patientEmail}
//               onChange={(e) => setPatientEmail(e.target.value)}
//               className="admin-input"
//             />
//             {error && <p className="admin-error">{error}</p>}
//             <button onClick={handleAccess} className="admin-btn">
//               Access Patient Dashboard
//             </button>
//           </div>
//         ) : (
//           <PatientDashboard adminEmail={adminEmail} patientEmail={patientEmail} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles/AdminDashboard.css"; // Import the CSS file

const AdminDashboard = () => {
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadToIPFS = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const pinataMetadata = JSON.stringify({
      name: file.name,
    });

    formData.append("pinataMetadata", pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 1,
    });

    formData.append("pinataOptions", pinataOptions);

    setUploading(true);
    setError("");
    
    try {
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "pinata_api_key": "69707d94799d241cb822",
          "pinata_secret_api_key": "b5113bdcfe7ebaf784c253d242b9f54c7f86fad632120412f6edfd3d0587bbb3",
        },
      });

      setIpfsHash(res.data.IpfsHash);
    } catch (err) {
      setError("Upload failed. Please check API keys.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <p className="dashboard-description">Manage hospital records and users efficiently.</p>

      <div className="dashboard-links">
        <Link to="/manage-records" className="dashboard-link records-link">
          Manage Hospital Records
        </Link>
        <Link to="/manage-users" className="dashboard-link users-link">
          Manage Users
        </Link>
      </div>

      {/* IPFS File Upload Section */}
      <div className="upload-container">
        <h2 className="upload-title">Upload File to IPFS</h2>
        <input type="file" onChange={handleFileChange} className="upload-input" />
        <button onClick={uploadToIPFS} className="upload-button" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload to IPFS"}
        </button>

        {error && <p className="error-message">{error}</p>}

        {ipfsHash && (
          <div className="upload-success">
            <p className="success-message">File uploaded successfully!</p>
            <a
              href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="upload-link"
            >
              View Uploaded File
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
