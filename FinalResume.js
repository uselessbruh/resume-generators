import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "./FinalResume.css";

const FinalResume = () => {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [resumeData, setResumeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const resumeRef = useRef(null);

    useEffect(() => {
        const fetchResumeData = async () => {
            try {
                // If the resume data is passed via location state, use it
                if (location.state && location.state.resumeData) {
                    setResumeData(location.state.resumeData);
                    setLoading(false);
                    return;
                }
                
                // Otherwise, try to fetch it from Firestore
                if (user && user.uid) {
                    const resumeDocRef = doc(db, "resumeData", user.uid);
                    const resumeDoc = await getDoc(resumeDocRef);
                    
                    if (resumeDoc.exists()) {
                        setResumeData(resumeDoc.data());
                    } else {
                        // No resume data found, redirect to resume generator
                        navigate("/generate-resume", { 
                            state: { error: "No resume data found. Please create a resume first." } 
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching resume data:", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchResumeData();
    }, [user, location, navigate]);

    const downloadPDF = async () => {
        if (!resumeRef.current) return;
        
        try {
            const canvas = await html2canvas(resumeRef.current, {
                scale: 2,
                logging: false,
                useCORS: true
            });
            
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });
            
            const imgWidth = 210; // A4 width in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;
            
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save(`${resumeData.fullName || 'resume'}.pdf`);
            
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("There was an error generating your PDF. Please try again.");
        }
    };

    const handleBack = () => {
        navigate("/dashboard");
    };
    
    const handleEdit = () => {
        navigate("/generate-resume");
    };

    if (loading) {
        return (
            <div className="final-resume-container">
                <div className="loading">
                    <div className="loading-spinner"></div>
                    <p>Loading your resume...</p>
                </div>
            </div>
        );
    }

    if (!resumeData) {
        return (
            <div className="final-resume-container">
                <div className="error-message">
                    <h2>Resume Not Found</h2>
                    <p>We couldn't find your resume data. Please create a new resume.</p>
                    <button onClick={() => navigate("/generate-resume")} className="primary-button">
                        Create Resume
                    </button>
                </div>
            </div>
        );
    }

    // Determine which template to use based on the selectedTemplate property
    const templateType = resumeData.selectedTemplate || "professional";

    return (
        <div className="final-resume-container">
            <div className="resume-actions">
                <h1>Your Final Resume</h1>
                <p>Here's your completed resume. Download it as a PDF or return to edit it.</p>
                
                <div className="action-buttons">
                    <button onClick={handleBack} className="back-button">
                        <span className="icon">←</span> Back to Dashboard
                    </button>
                    <button onClick={handleEdit} className="edit-button">
                        <span className="icon">✎</span> Edit Resume
                    </button>
                    <button onClick={downloadPDF} className="download-button">
                        <span className="icon">↓</span> Download PDF
                    </button>
                </div>
            </div>
            
            <div className="resume-preview-wrapper">
                <div 
                    ref={resumeRef} 
                    className={`resume-document ${templateType}-template`}
                >
                    {templateType === "professional" && (
                        <ProfessionalTemplate data={resumeData} />
                    )}
                    {templateType === "modern" && (
                        <ModernTemplate data={resumeData} />
                    )}
                    {templateType === "creative" && (
                        <CreativeTemplate data={resumeData} />
                    )}
                    {templateType === "minimal" && (
                        <MinimalTemplate data={resumeData} />
                    )}
                </div>
            </div>
        </div>
    );
};

// Professional Template
const ProfessionalTemplate = ({ data }) => {
    return (
        <div className="professional-resume">
            <div className="resume-header">
                <h1>{data.fullName}</h1>
                <div className="contact-info">
                    <div className="contact-item">
                        <span className="contact-icon">✉</span>
                        <span>{data.email}</span>
                    </div>
                    <div className="contact-item">
                        <span className="contact-icon">☎</span>
                        <span>{data.phone}</span>
                    </div>
                    {data.address && (
                        <div className="contact-item">
                            <span className="contact-icon">⌂</span>
                            <span>{data.address}</span>
                        </div>
                    )}
                    {data.linkedin && (
                        <div className="contact-item">
                            <span className="contact-icon">in</span>
                            <span>{data.linkedin}</span>
                        </div>
                    )}
                    {data.website && (
                        <div className="contact-item">
                            <span className="contact-icon">🌐</span>
                            <span>{data.website}</span>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="resume-body">
                {data.summary && (
                    <div className="resume-section">
                        <h2>Professional Summary</h2>
                        <p>{data.summary}</p>
                    </div>
                )}
                
                {data.workExperience && data.workExperience.length > 0 && (
                    <div className="resume-section">
                        <h2>Work Experience</h2>
                        {data.workExperience.map((job, index) => (
                            <div className="experience-item" key={index}>
                                <div className="job-header">
                                    <h3>{job.title}</h3>
                                    <div className="job-details">
                                        <span className="company">{job.company}</span>
                                        <span className="duration">
                                            {job.startDate} - {job.isCurrentJob ? "Present" : job.endDate}
                                        </span>
                                    </div>
                                </div>
                                <p>{job.description}</p>
                            </div>
                        ))}
                    </div>
                )}
                
                {data.education && data.education.length > 0 && (
                    <div className="resume-section">
                        <h2>Education</h2>
                        {data.education.map((edu, index) => (
                            <div className="education-item" key={index}>
                                <h3>{edu.degree}</h3>
                                <div className="education-details">
                                    <span className="institution">{edu.institution}</span>
                                    <span className="graduation-date">{edu.graduationDate}</span>
                                </div>
                                {edu.description && <p>{edu.description}</p>}
                            </div>
                        ))}
                    </div>
                )}
                
                {data.skills && data.skills.some(skill => skill.trim() !== "") && (
                    <div className="resume-section">
                        <h2>Skills</h2>
                        <div className="skills-list">
                            {data.skills
                                .filter(skill => skill.trim() !== "")
                                .map((skill, index) => (
                                    <span className="skill-tag" key={index}>{skill}</span>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Modern Template
const ModernTemplate = ({ data }) => {
    return (
        <div className="modern-resume">
            <div className="header-section">
                <h1>{data.fullName}</h1>
                <div className="contact-row">
                    {data.email && <span>{data.email}</span>}
                    {data.phone && <span>{data.phone}</span>}
                    {data.address && <span>{data.address}</span>}
                </div>
                <div className="social-row">
                    {data.linkedin && <span>{data.linkedin}</span>}
                    {data.website && <span>{data.website}</span>}
                </div>
            </div>
            
            {data.summary && (
                <div className="resume-section">
                    <h2>Profile</h2>
                    <p>{data.summary}</p>
                </div>
            )}
            
            <div className="two-column-layout">
                <div className="left-column">
                    {data.workExperience && data.workExperience.length > 0 && (
                        <div className="resume-section">
                            <h2>Experience</h2>
                            {data.workExperience.map((job, index) => (
                                <div className="work-item" key={index}>
                                    <div className="work-header">
                                        <h3>{job.title}</h3>
                                        <span className="company-name">{job.company}</span>
                                        <span className="work-date">
                                            {job.startDate} - {job.isCurrentJob ? "Present" : job.endDate}
                                        </span>
                                    </div>
                                    <p>{job.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                <div className="right-column">
                    {data.education && data.education.length > 0 && (
                        <div className="resume-section">
                            <h2>Education</h2>
                            {data.education.map((edu, index) => (
                                <div className="education-item" key={index}>
                                    <h3>{edu.degree}</h3>
                                    <span className="school-name">{edu.institution}</span>
                                    <span className="education-date">{edu.graduationDate}</span>
                                    {edu.description && <p>{edu.description}</p>}
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {data.skills && data.skills.some(skill => skill.trim() !== "") && (
                        <div className="resume-section">
                            <h2>Skills</h2>
                            <div className="skills-grid">
                                {data.skills
                                    .filter(skill => skill.trim() !== "")
                                    .map((skill, index) => (
                                        <div className="skill-item" key={index}>
                                            <span>{skill}</span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Creative Template
const CreativeTemplate = ({ data }) => {
    return (
        <div className="creative-resume">
            <div className="sidebar">
                <div className="profile-section">
                    <div className="profile-image">
                        <div className="initials">
                            {data.fullName ? data.fullName.charAt(0) : "R"}
                        </div>
                    </div>
                    <h1>{data.fullName}</h1>
                </div>
                
                <div className="contact-section">
                    <h2>Contact</h2>
                    <ul className="contact-list">
                        {data.email && (
                            <li>
                                <span className="contact-icon">✉</span>
                                <span>{data.email}</span>
                            </li>
                        )}
                        {data.phone && (
                            <li>
                                <span className="contact-icon">☎</span>
                                <span>{data.phone}</span>
                            </li>
                        )}
                        {data.address && (
                            <li>
                                <span className="contact-icon">⌂</span>
                                <span>{data.address}</span>
                            </li>
                        )}
                        {data.linkedin && (
                            <li>
                                <span className="contact-icon">in</span>
                                <span>{data.linkedin}</span>
                            </li>
                        )}
                        {data.website && (
                            <li>
                                <span className="contact-icon">🌐</span>
                                <span>{data.website}</span>
                            </li>
                        )}
                    </ul>
                </div>
                
                {data.skills && data.skills.some(skill => skill.trim() !== "") && (
                    <div className="skills-section">
                        <h2>Skills</h2>
                        <div className="skills-list">
                            {data.skills
                                .filter(skill => skill.trim() !== "")
                                .map((skill, index) => (
                                    <span className="skill-bubble" key={index}>{skill}</span>
                                ))}
                        </div>
                    </div>
                )}
            </div>
            
            <div className="main-content">
                {data.summary && (
                    <div className="resume-section">
                        <h2>About Me</h2>
                        <p>{data.summary}</p>
                    </div>
                )}
                
                {data.workExperience && data.workExperience.length > 0 && (
                    <div className="resume-section">
                        <h2>Experience</h2>
                        <div className="timeline">
                            {data.workExperience.map((job, index) => (
                                <div className="timeline-item" key={index}>
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-content">
                                        <h3>{job.title}</h3>
                                        <div className="timeline-details">
                                            <span>{job.company}</span>
                                            <span>{job.startDate} - {job.isCurrentJob ? "Present" : job.endDate}</span>
                                        </div>
                                        <p>{job.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {data.education && data.education.length > 0 && (
                    <div className="resume-section">
                        <h2>Education</h2>
                        <div className="timeline">
                            {data.education.map((edu, index) => (
                                <div className="timeline-item" key={index}>
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-content">
                                        <h3>{edu.degree}</h3>
                                        <div className="timeline-details">
                                            <span>{edu.institution}</span>
                                            <span>{edu.graduationDate}</span>
                                        </div>
                                        {edu.description && <p>{edu.description}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Minimal Template
const MinimalTemplate = ({ data }) => {
    return (
        <div className="minimal-resume">
            <div className="resume-header">
                <h1>{data.fullName}</h1>
                <div className="contact-info">
                    <span>{data.email}</span>
                    <span>{data.phone}</span>
                    {data.address && <span>{data.address}</span>}
                    {data.linkedin && <span>{data.linkedin}</span>}
                    {data.website && <span>{data.website}</span>}
                </div>
            </div>
            
            {data.summary && (
                <div className="resume-section">
                    <h2>Summary</h2>
                    <p>{data.summary}</p>
                </div>
            )}
            
            {data.workExperience && data.workExperience.length > 0 && (
                <div className="resume-section">
                    <h2>Experience</h2>
                    {data.workExperience.map((job, index) => (
                        <div className="experience-item" key={index}>
                            <div className="item-header">
                                <div className="title-company">
                                    <h3>{job.title}</h3>
                                    <span className="company">{job.company}</span>
                                </div>
                                <span className="date">
                                    {job.startDate} - {job.isCurrentJob ? "Present" : job.endDate}
                                </span>
                            </div>
                            <p>{job.description}</p>
                        </div>
                    ))}
                </div>
            )}
            
            {data.education && data.education.length > 0 && (
                <div className="resume-section">
                    <h2>Education</h2>
                    {data.education.map((edu, index) => (
                        <div className="education-item" key={index}>
                            <div className="item-header">
                                <div className="degree-institution">
                                    <h3>{edu.degree}</h3>
                                    <span className="institution">{edu.institution}</span>
                                </div>
                                <span className="date">{edu.graduationDate}</span>
                            </div>
                            {edu.description && <p>{edu.description}</p>}
                        </div>
                    ))}
                </div>
            )}
            
            {data.skills && data.skills.some(skill => skill.trim() !== "") && (
                <div className="resume-section">
                    <h2>Skills</h2>
                    <div className="skills-row">
                        {data.skills
                            .filter(skill => skill.trim() !== "")
                            .map((skill, index) => (
                                <span className="skill" key={index}>{skill}</span>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FinalResume;