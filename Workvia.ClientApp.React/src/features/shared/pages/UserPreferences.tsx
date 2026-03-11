import { useState } from 'react';
import { toast } from 'react-toastify';
import PasswordChangeModal from '../components/PasswordChangeModal';
import { UserService } from '../../../services/user.service';

export default function UserPreferences() {
  const[showModal, setShowModal] = useState(false);

  const handleChangePassword = async (data: any) => {
    try {
      await UserService.changePassword(data);
      toast.success('Password changed successfully');
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 text-primary"><i className="bi bi-shield-lock me-2"></i> Security</h5>
            </div>
            
            <div className="card-body p-0">
              <div className="settings-item p-3 border-bottom d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">Password</h6>
                  <small className="text-muted">Change your account password.</small>
                </div>
                <button className="btn btn-outline-secondary btn-sm" onClick={() => setShowModal(true)}>
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PasswordChangeModal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        onSuccess={handleChangePassword} 
      />
    </div>
  );
}