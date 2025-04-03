import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FinalResume.css";

const FinalResume = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [resumeData, setResumeData] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState("modern");

    useEffect(() => {
        // Get the resume data passed from the generate-resume page
        if (location.state && location.state.resumeData) {
            setResumeData(location.state.resumeData);
            setSelectedTemplate(location.state.selectedTemplate || "modern");
        } else {
            // Redirect to generate-resume if no data is available
            navigate("/generate-resume");
        }
    }, [location, navigate]);

    const handleDownloadPDF = () => {
        // In a real application, this would use a library like jsPDF or html2pdf
        // to generate a downloadable PDF version of the resume
        alert("PDF download functionality would be implemented here");
        // Example implementation would look like:
        // html2pdf().from(document.getElementById('resume-content')).save(`${resumeData.personalInfo.firstName}_resume.pdf`);
    };

    const handleEditResume = () => {
        navigate("/generate-resume", { state: { resumeData, selectedTemplate, isEditing: true } });
    };

    if (!resumeData) {
        return <div className="loading">Loading resume data...</div>;
    }

    return (
        <div className="final-resume-page">
            <div className="resume-actions">
                <h1>Your Generated Resume</h1>
                <div className="action-buttons">
                    <button className="edit-button" onClick={handleEditResume}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        Edit Resume
                    </button>
                    <button className="download-button" onClick={handleDownloadPDF}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Download PDF
                    </button>
                </div>
            </div>

            <div className={`resume-preview ${selectedTemplate}`} id="resume-content">
                {selectedTemplate === "modern" && (
                    <ModernTemplate resumeData={resumeData} />
                )}
                {selectedTemplate === "professional" && (
                    <ProfessionalTemplate resumeData={resumeData} />
                )}
                {selectedTemplate === "creative" && (
                    <CreativeTemplate resumeData={resumeData} />
                )}
            </div>
        </div>
    );
};

// Modern Template Component
const ModernTemplate = ({ resumeData }) => {
    const { personalInfo, professionalSummary, workExperience, education, skills } = resumeData;

    return (
        <div className="modern-template">
            <div className="resume-header">
                <h1>{personalInfo.firstName} {personalInfo.lastName}</h1>
                <p className="job-title">{personalInfo.jobTitle}</p>
                <div className="contact-info">
                    <span>{personalInfo.email}</span>
                    <span>{personalInfo.phone}</span>
                    <span>{personalInfo.location}</span>
                    {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
                </div>
            </div>

            <div className="resume-section">
                <h2>Professional Summary</h2>
                <p>{professionalSummary}</p>
            </div>

            <div className="resume-section">
                <h2>Work Experience</h2>
                {workExperience.map((work, index) => (
                    <div className="experience-item" key={index}>
                        <div className="experience-header">
                            <h3>{work.jobTitle}</h3>
                            <span className="company">{work.company}</span>
                            <span className="date">{work.startDate} - {work.endDate || "Present"}</span>
                        </div>
                        <p>{work.description}</p>
                    </div>
                ))}
            </div>

            <div className="resume-section">
                <h2>Education</h2>
                {education.map((edu, index) => (
                    <div className="education-item" key={index}>
                        <h3>{edu.degree}</h3>
                        <span className="school">{edu.school}</span>
                        <span className="date">{edu.startDate} - {edu.endDate || "Present"}</span>
                        {edu.description && <p>{edu.description}</p>}
                    </div>
                ))}
            </div>

            <div className="resume-section">
                <h2>Skills</h2>
                <div className="skills-list">
                    {skills.map((skill, index) => (
                        <span className="skill-tag" key={index}>{skill}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Professional Template Component
const ProfessionalTemplate = ({ resumeData }) => {
    const { personalInfo, professionalSummary, workExperience, education, skills } = resumeData;

    return (
        <div className="professional-template">
            <div className="resume-header">
                <div className="name-title">
                    <h1>{personalInfo.firstName} {personalInfo.lastName}</h1>
                    <p className="job-title">{personalInfo.jobTitle}</p>
                </div>
                <div className="contact-details">
                    <div className="contact-item">
                        <span className="contact-label">Email:</span>
                        <span>{personalInfo.email}</span>
                    </div>
                    <div className="contact-item">
                        <span className="contact-label">Phone:</span>
                        <span>{personalInfo.phone}</span>
                    </div>
                    <div className="contact-item">
                        <span className="contact-label">Location:</span>
                        <span>{personalInfo.location}</span>
                    </div>
                    {personalInfo.linkedin && (
                        <div className="contact-item">
                            <span className="contact-label">LinkedIn:</span>
                            <span>{personalInfo.linkedin}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="resume-body">
                <div className="resume-section">
                    <h2>Professional Summary</h2>
                    <div className="section-content">
                        <p>{professionalSummary}</p>
                    </div>
                </div>

                <div className="resume-section">
                    <h2>Work Experience</h2>
                    <div className="section-content">
                        {workExperience.map((work, index) => (
                            <div className="experience-item" key={index}>
                                <h3>{work.jobTitle}</h3>
                                <div className="company-date">
                                    <span className="company">{work.company}</span>
                                    <span className="date">{work.startDate} - {work.endDate || "Present"}</span>
                                </div>
                                <p>{work.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="resume-section">
                    <h2>Education</h2>
                    <div className="section-content">
                        {education.map((edu, index) => (
                            <div className="education-item" key={index}>
                                <h3>{edu.degree}</h3>
                                <div className="school-date">
                                    <span className="school">{edu.school}</span>
                                    <span className="date">{edu.startDate} - {edu.endDate || "Present"}</span>
                                </div>
                                {edu.description && <p>{edu.description}</p>}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="resume-section">
                    <h2>Skills</h2>
                    <div className="section-content">
                        <div className="skills-container">
                            {skills.map((skill, index) => (
                                <div className="skill-item" key={index}>{skill}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Creative Template Component
const CreativeTemplate = ({ resumeData }) => {
    const { personalInfo, professionalSummary, workExperience, education, skills } = resumeData;

    return (
        <div className="creative-template">
            <div className="sidebar">
                <div className="sidebar-header">
                    <div className="avatar-placeholder">
                        {personalInfo.firstName.charAt(0)}{personalInfo.lastName.charAt(0)}
                    </div>
                    <h1>{personalInfo.firstName}<br />{personalInfo.lastName}</h1>
                    <p className="job-title">{personalInfo.jobTitle}</p>
                </div>

                <div className="sidebar-section">
                    <h2>Contact</h2>
                    <div className="contact-item">
                        <span className="icon">✉️</span>
                        <span>{personalInfo.email}</span>
                    </div>
                    <div className="contact-item">
                        <span className="icon">📱</span>
                        <span>{personalInfo.phone}</span>
                    </div>
                    <div className="contact-item">
                        <span className="icon">📍</span>
                        <span>{personalInfo.location}</span>
                    </div>
                    {personalInfo.linkedin && (
                        <div className="contact-item">
                            <span className="icon">💼</span>
                            <span>{personalInfo.linkedin}</span>
                        </div>
                    )}
                </div>

                <div className="sidebar-section">
                    <h2>Skills</h2>
                    <div className="skills-container">
                        {skills.map((skill, index) => (
                            <div className="skill-bubble" key={index}>{skill}</div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="main-content">
                <div className="content-section">
                    <h2>About Me</h2>
                    <p>{professionalSummary}</p>
                </div>

                <div className="content-section">
                    <h2>Work Experience</h2>
                    {workExperience.map((work, index) => (
                        <div className="timeline-item" key={index}>
                            <div className="timeline-marker"></div>
                            <div className="timeline-content">
                                <h3>{work.jobTitle}</h3>
                                <div className="timeline-info">
                                    <span className="company">{work.company}</span>
                                    <span className="date">{work.startDate} - {work.endDate || "Present"}</span>
                                </div>
                                <p>{work.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="content-section">
                    <h2>Education</h2>
                    {education.map((edu, index) => (
                        <div className="timeline-item" key={index}>
                            <div className="timeline-marker"></div>
                            <div className="timeline-content">
                                <h3>{edu.degree}</h3>
                                <div className="timeline-info">
                                    <span className="school">{edu.school}</span>
                                    <span className="date">{edu.startDate} - {edu.endDate || "Present"}</span>
                                </div>
                                {edu.description && <p>{edu.description}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FinalResume;