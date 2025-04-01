import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import './Dashboard.css';  // Import the CSS file

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    
    const generateResume = () => {
        // This would navigate to a page where the user can generate their resume
        navigate("/generate-resume");
    };
    
    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <div className="logo">
                    <h2>ResumeBuilder</h2>
                </div>
                <ul className="sidebar-menu">
                    <li className="active" onClick={generateResume}>
                        <div className="menu-icon resume-icon"></div>
                        <span>Generate Resume</span>
                    </li>
                    <li onClick={() => {}}>
                        <div className="menu-icon template-icon"></div>
                        <span>Templates</span>
                    </li>
                    <li onClick={() => {}}>
                        <div className="menu-icon settings-icon"></div>
                        <span>Settings</span>
                    </li>
                    <li onClick={handleLogout}>
                        <div className="menu-icon logout-icon"></div>
                        <span>Logout</span>
                    </li>
                </ul>
                
                <div className="sidebar-footer">
                    <div className="user-info">
                        <div className="user-avatar">
                            {user?.email.charAt(0).toUpperCase()}
                        </div>
                        <div className="user-details">
                            <span className="user-email">{user?.email}</span>
                            <span className="user-plan">Free Plan</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="main-content">
                <div className="header">
                    <div className="welcome-message">
                        <h2>Hello, {user?.email.split('@')[0]}</h2>
                        <p>Welcome to your dashboard</p>
                    </div>
                    <div className="action-buttons">
                        <button className="primary-button" onClick={generateResume}>
                            <span className="plus-icon">+</span> Create New Resume
                        </button>
                    </div>
                </div>
                
                <div className="dashboard-body">
                    <div className="welcome-card">
                        <div className="welcome-text">
                            <h3>Ready to build your professional resume?</h3>
                            <p>Our step-by-step resume builder helps you create a tailored resume that will get you noticed by recruiters.</p>
                            <ul className="feature-list">
                                <li>
                                    <div className="feature-icon check-icon"></div>
                                    <span>Professional templates designed by experts</span>
                                </li>
                                <li>
                                    <div className="feature-icon check-icon"></div>
                                    <span>Easy to customize sections and content</span>
                                </li>
                                <li>
                                    <div className="feature-icon check-icon"></div>
                                    <span>Download as PDF, ready to share</span>
                                </li>
                            </ul>
                        </div>
                        <div className="resume-action">
                            <button className="generate-btn" onClick={generateResume}>Generate Resume</button>
                        </div>
                    </div>
                    
                    <div className="templates-section">
                        <h3>Popular Templates</h3>
                        <div className="templates-grid">
                            <div className="template-card">
                                <div className="template-preview template-1"></div>
                                <h4>Professional</h4>
                            </div>
                            <div className="template-card">
                                <div className="template-preview template-2"></div>
                                <h4>Modern</h4>
                            </div>
                            <div className="template-card">
                                <div className="template-preview template-3"></div>
                                <h4>Creative</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;