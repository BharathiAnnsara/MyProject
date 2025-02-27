import { useNavigate } from 'react-router-dom';

const RoleSelectionPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Select Your Role</h1>
      <button onClick={() => navigate('/signup/patient')}>Patient</button>
      <button onClick={() => navigate('/signup/doctor')}>Doctor</button>
    </div>
  );
};

export default RoleSelectionPage;
