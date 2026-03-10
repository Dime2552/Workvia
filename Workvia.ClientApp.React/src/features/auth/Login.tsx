import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/auth.service';
import type { LoginRequest } from '../../types/auth';

export default function Login() {
  const { 
    register,           
    handleSubmit,       
    formState: { errors, isSubmitting } 
  } = useForm<LoginRequest>(); 

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    try {
      const response = await AuthService.login(data);
      
      localStorage.setItem("authData", JSON.stringify(response));

      if (AuthService.isAdmin()) {
        navigate('/admin');
      } else {
        navigate('/employee');
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="text-center mb-4">Login</h3>

              <form onSubmit={handleSubmit(onSubmit)}>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    {...register('email', { required: 'Email can’t be blank' })}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input 
                    type="password" 
                    id="password" 
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    {...register('password', { required: 'Password can’t be blank' })}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password.message}
                    </div>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="btn btn-success w-100" 
                  disabled={isSubmitting} 
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}