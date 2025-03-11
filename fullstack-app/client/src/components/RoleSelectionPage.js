import { useNavigate } from "react-router-dom";
import "./styles/RoleSelection.css";
const RoleSelectionPage = () => {
  const navigate = useNavigate();

  return (
    <div className="role-selection-container">
      <h1 className="role-selection-title">Select Your Role</h1>
      <button className="role-selection-btn" onClick={() => navigate("/signup/patient")}>Patient</button>
      <button className="role-selection-btn" onClick={() => navigate("/signup/doctor")}>Doctor</button>
      <button className="role-selection-btn" onClick={() => navigate("/signup/admin")}>Admin</button> {/* ✅ Added Admin Button */}
    </div>
  );
};

export default RoleSelectionPage;
