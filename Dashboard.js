import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import './Dashboard.css';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [savedResumeData, setSavedResumeData] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    
    // Load any saved resume data and user profile when component mounts
    useEffect(() => {
        const fetchData = async () => {
            if (user && user.uid) {
                setLoading(true);
                try {
                    // Fetch resume data
                    const resumeDocRef = doc(db, "resumeData", user.uid);
                    const resumeDocSnap = await getDoc(resumeDocRef);
                    
                    if (resumeDocSnap.exists()) {
                        setSavedResumeData(resumeDocSnap.data());
                    }
                    
                    // Fetch user profile
                    const userDocRef = doc(db, "users", user.uid);
                    const userDocSnap = await getDoc(userDocRef);
                    
                    if (userDocSnap.exists()) {
                        setUserProfile(userDocSnap.data());
                    }
                    
                    setDataLoaded(true);
                } catch (error) {
                    console.error("Error fetching data:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        
        fetchData();
    }, [user]);
    
    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    
    const generateResume = () => {
        navigate("/generate-resume");
    };
    
    const viewUserProfile = () => {
        navigate("/user-profile");
    };
    
    const viewFinalResume = () => {
        navigate("/final-resume");
    };
    
    const clearSavedData = async () => {
        if (!user || !user.uid) return;
        
        if (window.confirm("Are you sure you want to clear your saved resume data? This cannot be undone.")) {
            setLoading(true);
            try {
                const docRef = doc(db, "resumeData", user.uid);
                await deleteDoc(docRef);
                setSavedResumeData(null);
            } catch (error) {
                console.error("Error clearing saved data:", error);
                alert("Failed to clear data. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    };
    
    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        if (typeof dateString === 'object' && dateString.toDate) {
            return dateString.toDate().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short',
                day: 'numeric'
            });
        }
        return new Date(dateString).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short',
            day: 'numeric' 
        });
    };
    
    // Calculate completion percentage
    const calculateCompletionPercentage = () => {
        if (!savedResumeData) return 0;
        
        let totalFields = 0;
        let completedFields = 0;
        
        // Personal info fields (6)
        const personalFields = ['fullName', 'email', 'phone', 'address', 'linkedin', 'website'];
        personalFields.forEach(field => {
            totalFields++;
            if (savedResumeData[field]) completedFields++;
        });
        
        // Summary (1)
        totalFields++;
        if (savedResumeData.summary) completedFields++;
        
        // Template (1)
        totalFields++;
        if (savedResumeData.selectedTemplate) completedFields++;
        
        // Work Experience (at least one complete entry)
        totalFields++;
        if (savedResumeData.workExperience && 
            savedResumeData.workExperience.some(job => 
                job.title && job.company && job.startDate && job.description)) {
            completedFields++;
        }
        
        // Education (at least one complete entry)
        totalFields++;
        if (savedResumeData.education && 
            savedResumeData.education.some(edu => 
                edu.degree && edu.institution && edu.graduationDate)) {
            completedFields++;
        }
        
        // Skills (at least one skill)
        totalFields++;
        if (savedResumeData.skills && 
            savedResumeData.skills.some(skill => skill.trim() !== "")) {
            completedFields++;
        }
        
        return Math.round((completedFields / totalFields) * 100);
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
                        <span>Resume Builder</span>
                    </li>
                    <li onClick={viewUserProfile}>
                        <div className="menu-icon user-icon"></div>
                        <span>My Profile</span>
                    </li>
                    {savedResumeData && savedResumeData.status === 'completed' && (
                        <li onClick={viewFinalResume}>
                            <div className="menu-icon view-icon"></div>
                            <span>View Resume</span>
                        </li>
                    )}
                    <li onClick={handleLogout}>
                        <div className="menu-icon logout-icon"></div>
                        <span>Logout</span>
                    </li>
                </ul>
                
                <div className="sidebar-footer">
                    <div className="user-info">
                        <div className="user-avatar">
                            {userProfile?.fullName ? userProfile.fullName.charAt(0).toUpperCase() : user?.email.charAt(0).toUpperCase()}
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
                        <h2>Hello, {userProfile?.fullName || user?.email.split('@')[0]}</h2>
                        <p>Welcome to your dashboard</p>
                    </div>
                    <div className="action-buttons">
                        <button className="primary-button" onClick={generateResume}>
                            {savedResumeData ? "Edit Resume" : "Create New Resume"}
                        </button>
                        {savedResumeData && savedResumeData.status === 'completed' && (
                            <button className="generate-resume-button" onClick={viewFinalResume}>
                                <span className="plus-icon">👁️</span> View Resume
                            </button>
                        )}
                    </div>
                </div>
                
                <div className="dashboard-body">
                    {loading && (
                        <div className="loading-indicator">
                            <p>Loading your data...</p>
                        </div>
                    )}
                    
                    {!userProfile?.profileCompleted && !loading && (
                        <div className="alert-card">
                            <div className="alert-content">
                                <h3>Complete Your Profile</h3>
                                <p>Please complete your profile information to get started with creating resumes.</p>
                            </div>
                            <button className="complete-profile-btn" onClick={viewUserProfile}>
                                Complete Profile
                            </button>
                        </div>
                    )}
                    
                    {!loading && dataLoaded && !savedResumeData && userProfile?.profileCompleted && (
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
                                <button className="generate-btn" onClick={generateResume}>Create Resume</button>
                            </div>
                        </div>
                    )}
                    
                    {!loading && savedResumeData && (
                        <div className="saved-resume-card">
                            <div className="saved-resume-header">
                                <h3>Your Resume</h3>
                                <div className="completion-indicator">
                                    <div className="completion-bar">
                                        <div 
                                            className="completion-progress" 
                                            style={{width: `${calculateCompletionPercentage()}%`}}
                                        ></div>
                                    </div>
                                    <span className="completion-percentage">{calculateCompletionPercentage()}% Complete</span>
                                </div>
                            </div>
                            
                            <div className="saved-resume-details">
                                <div className="resume-info-columns">
                                    <div className="resume-info-column">
                                        <h4>Personal Information</h4>
                                        <p><strong>Name:</strong> {savedResumeData.fullName || "Not provided"}</p>
                                        <p><strong>Email:</strong> {savedResumeData.email || "Not provided"}</p>
                                        <p><strong>Phone:</strong> {savedResumeData.phone || "Not provided"}</p>
                                        {savedResumeData.updatedAt && (
                                            <p><strong>Last Updated:</strong> {formatDate(savedResumeData.updatedAt)}</p>
                                        )}
                                    </div>
                                    
                                    <div className="resume-info-column">
                                        <h4>Resume Details</h4>
                                        <p><strong>Template:</strong> {savedResumeData.selectedTemplate ? savedResumeData.selectedTemplate.charAt(0).toUpperCase() + savedResumeData.selectedTemplate.slice(1) : "Not selected"}</p>
                                        <p><strong>Work Experiences:</strong> {savedResumeData.workExperience ? savedResumeData.workExperience.length : 0}</p>
                                        <p><strong>Education Entries:</strong> {savedResumeData.education ? savedResumeData.education.length : 0}</p>
                                        <p><strong>Status:</strong> <span className={`status ${savedResumeData.status === 'completed' ? 'complete' : 'draft'}`}>
                                            {savedResumeData.status === 'completed' ? 'Completed' : 'Draft'}
                                        </span></p>
                                    </div>
                                </div>
                                
                                {savedResumeData.skills && savedResumeData.skills.some(skill => skill.trim() !== "") && (
                                    <div className="skills-preview">
                                        <h4>Skills</h4>
                                        <div className="skills-tags">
                                            {savedResumeData.skills
                                                .filter(skill => skill.trim() !== "")
                                                .map((skill, index) => (
                                                    <span key={index} className="skill-tag">{skill}</span>
                                                ))
                                            }
                                        </div>
                                    </div>
                                )}
                                
                                <div className="resume-actions">
                                    <button className="edit-resume-button" onClick={generateResume}>
                                        Edit Resume
                                    </button>
                                    {savedResumeData.status === 'completed' && (
                                        <button className="view-resume-button" onClick={viewFinalResume}>
                                            View Final Resume
                                        </button>
                                    )}
                                    <button className="clear-data-button" onClick={clearSavedData}>
                                        Clear Data
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <div className="templates-section">
                        <h3>Popular Templates</h3>
                        <div className="templates-grid">
                            <div className={`template-card ${savedResumeData && savedResumeData.selectedTemplate === "professional" ? "selected" : ""}`}>
                                <div className="template-preview template-1"></div>
                                <h4>Professional</h4>
                            </div>
                            <div className={`template-card ${savedResumeData && savedResumeData.selectedTemplate === "modern" ? "selected" : ""}`}>
                                <div className="template-preview template-2"></div>
                                <h4>Modern</h4>
                            </div>
                            <div className={`template-card ${savedResumeData && savedResumeData.selectedTemplate === "creative" ? "selected" : ""}`}>
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