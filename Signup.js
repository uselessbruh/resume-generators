import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
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
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const userCredential = await signup(formData.email, formData.password, true);
      // Store auth state immediately after successful signup
      localStorage.setItem('authState', JSON.stringify({
        user: userCredential.user,
        rememberMe: true
      }));
      navigate("/dashboard");
    } catch (error) {
      setErrors({ form: error.message || "Signup failed" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-header">
          <h1>Create Account</h1>
          <p>Join thousands of professionals building standout resumes</p>
        </div>
        
        <form onSubmit={handleSignup} className="signup-form">
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
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "input-error" : ""}
              />
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-container">
              <i className="icon password-icon"></i>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "input-error" : ""}
              />
            </div>
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>
          
          <button 
            type="submit" 
            className={`signup-button ${isLoading ? "loading" : ""}`} 
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
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
        
        <div className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
      
      <div className="signup-benefits">
        <h2>Build Your Professional Resume</h2>
        <ul>
          <li>✓ ATS-friendly templates</li>
          <li>✓ Expert-approved designs</li>
          <li>✓ Download in multiple formats</li>
          <li>✓ Free updates and storage</li>
        </ul>
        <div className="testimonial">
          <p>"This tool helped me land my dream job within 2 weeks!"</p>
          <div className="testimonial-author">— Michael K.</div>
        </div>
      </div>
    </div>
  );
};

export default Signup;