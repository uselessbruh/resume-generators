import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await login(formData.email, formData.password, formData.rememberMe);
      navigate("/dashboard");
    } catch (error) {
      setErrors({ form: error.message || "Login failed" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Log in to access your professional resume builder</p>
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
          {errors.form && <div className="error-message">{errors.form}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-container">
              <i className="icon email-icon"></i>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : ""}
              />
            </div>
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <i className="icon password-icon"></i>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "input-error" : ""}
              />
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          
          <div className="form-options">
            <label className="remember-me">
              <input 
                type="checkbox" 
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              /> Remember me
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>
          
          <button 
            type="submit" 
            className={`login-button ${isLoading ? "loading" : ""}`} 
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
          
          <div className="divider">
            <span>or continue with</span>
          </div>
          
          <div className="social-buttons">
            <button type="button" className="google-button">
              <i className="google-icon"></i>
              Google
            </button>
            <button type="button" className="github-button">
              <i className="github-icon"></i>
              GitHub
            </button>
          </div>
        </form>
        
        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
      
      <div className="login-benefits">
        <h2>Your Professional Journey Starts Here</h2>
        <ul>
          <li>✓ Access your saved templates</li>
          <li>✓ Download in multiple formats</li>
          <li>✓ Get expert resume tips</li>
          <li>✓ Track application progress</li>
        </ul>
        <div className="testimonial">
          <p>"This resume builder helped me showcase my skills perfectly!"</p>
          <div className="testimonial-author">— Sarah T.</div>
        </div>
      </div>
    </div>
  );
};

export default Login;