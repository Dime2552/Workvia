import { useEffect, useState } from 'react';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import type { User } from '../../../types/user';
import { toast } from 'react-toastify';
import UserRegisterModal from '../components/UserRegisterModal';
import UserUpdateModal from '../components/UserUpdateModal';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const [showRegister, setShowRegister] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const data = await UserService.getEmployees();
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users', error);
      toast.error('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRegister = async (data: any) => {
    try {
      await AuthService.register(data);
      toast.success('User registered successfully!');
      setShowRegister(false);
      loadUsers();
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const handleUpdate = async (data: User) => {
    try {
      const updateData = { id: data.id, name: data.name, email: data.email };
      await UserService.updateUser(data.id, updateData);
      toast.success('User updated successfully!');
      setShowUpdate(false);
      setSelectedUser(null);
      loadUsers();
    } catch (error) {
      console.error('Update failed', error);
    }
  };

  const handleDelete = async (user: User) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      try {
        await UserService.deleteEmployee(user.id);
        toast.success(`${user.name} deleted successfully!`);
        loadUsers();
      } catch (error) {
        console.error('Error deleting user', error);
      }
    }
  };

  const openUpdateModal = (user: User) => {
    setSelectedUser(user);
    setShowUpdate(true);
  };

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Employees</h2>
          <button className="btn btn-primary" onClick={() => setShowRegister(true)}>
            <i className="bi bi-person-plus-fill me-2"></i> Register new employee
          </button>
        </div>

        <div className="card shadow-sm">
          <div className="card-body p-0">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col" className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={3} className="text-center py-4">Loading employees...</td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-4">No employees found.</td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td className="text-end">
                        <button 
                          className="btn btn-sm btn-outline-primary me-2" 
                          title="Edit"
                          onClick={() => openUpdateModal(user)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger" 
                          onClick={() => handleDelete(user)} 
                          title="Delete"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <UserRegisterModal 
        show={showRegister}
        onClose={() => setShowRegister(false)}
        onSuccess={handleRegister}
      />

      <UserUpdateModal
        show={showUpdate}
        user={selectedUser}
        onClose={() => { setShowUpdate(false); setSelectedUser(null); }}
        onSuccess={handleUpdate}
      />
    </>
  );
}