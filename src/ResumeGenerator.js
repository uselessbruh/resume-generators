import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ResumeGenerator.css";

const ResumeGenerator = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  
  // Form state to store all user inputs
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    website: "",
    
    // Professional Summary
    summary: "",
    
    // Work Experience
    workExperience: [
      { 
        id: 1,
        title: "", 
        company: "", 
        location: "", 
        startDate: "", 
        endDate: "", 
        isCurrentJob: false,
        description: "" 
      }
    ],
    
    // Education
    education: [
      { 
        id: 1,
        degree: "", 
        institution: "", 
        location: "", 
        graduationDate: "", 
        description: "" 
      }
    ],
    
    // Skills
    skills: ["", "", ""]
  });
  
  // Update form data
  const handleInputChange = (section, field, value, index = null) => {
    if (index !== null) {
      // Update array items (like work experience or education)
      const updatedItems = [...formData[section]];
      updatedItems[index] = { ...updatedItems[index], [field]: value };
      
      setFormData({
        ...formData,
        [section]: updatedItems
      });
    } else {
      // Update simple fields
      setFormData({
        ...formData,
        [section]: { ...formData[section], [field]: value }
      });
    }
  };
  
  // Update skill at specific index
  const updateSkill = (index, value) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = value;
    setFormData({
      ...formData,
      skills: updatedSkills
    });
  };
  
  // Add new work experience or education entry
  const addItem = (section) => {
    const newId = formData[section].length + 1;
    let newItem;
    
    if (section === "workExperience") {
      newItem = { 
        id: newId,
        title: "", 
        company: "", 
        location: "", 
        startDate: "", 
        endDate: "", 
        isCurrentJob: false,
        description: "" 
      };
    } else if (section === "education") {
      newItem = { 
        id: newId,
        degree: "", 
        institution: "", 
        location: "", 
        graduationDate: "", 
        description: "" 
      };
    } else if (section === "skills") {
      setFormData({
        ...formData,
        skills: [...formData.skills, ""]
      });
      return;
    }
    
    setFormData({
      ...formData,
      [section]: [...formData[section], newItem]
    });
  };
  
  // Remove work experience or education entry
  const removeItem = (section, id) => {
    if (section === "skills") {
      const updatedSkills = [...formData.skills];
      updatedSkills.splice(id, 1);
      setFormData({
        ...formData,
        skills: updatedSkills
      });
      return;
    }
    
    setFormData({
      ...formData,
      [section]: formData[section].filter(item => item.id !== id)
    });
  };
  
  // Navigate to next step
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };
  
  // Navigate to previous step
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };
  
  // Handle final submission
  const generateResume = () => {
    console.log("Resume Data:", formData);
    alert("Resume generated successfully!");
    navigate("/dashboard");
  };
  
  return (
    <div className="resume-generator-container">
      <div className="progress-bar">
        <div className="progress-steps">
          <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
            <div className="step-number">1</div>
            <div className="step-label">Template</div>
          </div>
          <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
            <div className="step-number">2</div>
            <div className="step-label">Personal</div>
          </div>
          <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
            <div className="step-number">3</div>
            <div className="step-label">Experience</div>
          </div>
          <div className={`step ${currentStep >= 4 ? "active" : ""}`}>
            <div className="step-number">4</div>
            <div className="step-label">Education</div>
          </div>
          <div className={`step ${currentStep >= 5 ? "active" : ""}`}>
            <div className="step-number">5</div>
            <div className="step-label">Skills</div>
          </div>
          <div className={`step ${currentStep >= 6 ? "active" : ""}`}>
            <div className="step-number">6</div>
            <div className="step-label">Review</div>
          </div>
        </div>
        <div className="progress-indicator" style={{ width: `${(currentStep / 6) * 100}%` }}></div>
      </div>
      
      <div className="resume-generator-content">
        <div className="generator-header">
          <h1>
            {currentStep === 1 && "Choose a Resume Template"}
            {currentStep === 2 && "Personal Information"}
            {currentStep === 3 && "Work Experience"}
            {currentStep === 4 && "Education"}
            {currentStep === 5 && "Skills"}
            {currentStep === 6 && "Review Your Resume"}
          </h1>
          <p className="step-description">
            {currentStep === 1 && "Select a template that matches your professional style and industry standards."}
            {currentStep === 2 && "Add your contact details so employers can reach you."}
            {currentStep === 3 && "List your relevant work history, starting with your most recent position."}
            {currentStep === 4 && "Add your educational background and qualifications."}
            {currentStep === 5 && "Highlight your most relevant skills and proficiencies."}
            {currentStep === 6 && "Review all information before generating your resume."}
          </p>
        </div>
        
        {/* Step 1: Template Selection */}
        {currentStep === 1 && (
          <div className="generator-form template-selection">
            <div className="templates-grid">
              <div 
                className={`template-card ${selectedTemplate === "professional" ? "selected" : ""}`}
                onClick={() => setSelectedTemplate("professional")}
              >
                <div className="template-preview template-1"></div>
                <h3>Professional</h3>
                <p>Traditional layout ideal for corporate roles</p>
              </div>
              
              <div 
                className={`template-card ${selectedTemplate === "modern" ? "selected" : ""}`}
                onClick={() => setSelectedTemplate("modern")}
              >
                <div className="template-preview template-2"></div>
                <h3>Modern</h3>
                <p>Contemporary design with creative elements</p>
              </div>
              
              <div 
                className={`template-card ${selectedTemplate === "creative" ? "selected" : ""}`}
                onClick={() => setSelectedTemplate("creative")}
              >
                <div className="template-preview template-3"></div>
                <h3>Creative</h3>
                <p>Bold design for standing out in creative fields</p>
              </div>
              
              <div 
                className={`template-card ${selectedTemplate === "minimal" ? "selected" : ""}`}
                onClick={() => setSelectedTemplate("minimal")}
              >
                <div className="template-preview template-4"></div>
                <h3>Minimal</h3>
                <p>Clean and simple with focus on content</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 2: Personal Information */}
        {currentStep === 2 && (
          <div className="generator-form">
            <div className="form-section">
              <div className="form-group">
                <label htmlFor="fullName">Full Name*</label>
                <input 
                  type="text" 
                  id="fullName" 
                  value={formData.fullName} 
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                  placeholder="e.g. John Smith"
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email*</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="e.g. john.smith@example.com"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number*</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    placeholder="e.g. (123) 456-7890"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input 
                  type="text" 
                  id="address" 
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                  placeholder="e.g. New York, NY"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="linkedin">LinkedIn (Optional)</label>
                  <input 
                    type="url" 
                    id="linkedin" 
                    value={formData.linkedin}
                    onChange={e => setFormData({...formData, linkedin: e.target.value})}
                    placeholder="e.g. linkedin.com/in/johnsmith"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="website">Website (Optional)</label>
                  <input 
                    type="url" 
                    id="website" 
                    value={formData.website}
                    onChange={e => setFormData({...formData, website: e.target.value})}
                    placeholder="e.g. johnsmith.com"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="summary">Professional Summary*</label>
                <textarea 
                  id="summary" 
                  value={formData.summary}
                  onChange={e => setFormData({...formData, summary: e.target.value})}
                  placeholder="Brief overview of your professional background, key strengths, and career goals (2-4 sentences recommended)"
                  rows="4"
                  required
                />
                <div className="field-tip">💡 Highlight your most relevant skills and accomplishments. Keep it concise and impactful.</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 3: Work Experience */}
        {currentStep === 3 && (
          <div className="generator-form">
            {formData.workExperience.map((job, index) => (
              <div className="form-card" key={job.id}>
                <div className="form-card-header">
                  <h3>Position {index + 1}</h3>
                  {formData.workExperience.length > 1 && (
                    <button 
                      type="button" 
                      className="remove-btn"
                      onClick={() => removeItem("workExperience", job.id)}
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor={`title-${job.id}`}>Job Title*</label>
                  <input 
                    type="text" 
                    id={`title-${job.id}`} 
                    value={job.title}
                    onChange={e => handleInputChange("workExperience", "title", e.target.value, index)}
                    placeholder="e.g. Marketing Manager"
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor={`company-${job.id}`}>Company*</label>
                    <input 
                      type="text" 
                      id={`company-${job.id}`} 
                      value={job.company}
                      onChange={e => handleInputChange("workExperience", "company", e.target.value, index)}
                      placeholder="e.g. Acme Corporation"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor={`location-${job.id}`}>Location</label>
                    <input 
                      type="text" 
                      id={`location-${job.id}`} 
                      value={job.location}
                      onChange={e => handleInputChange("workExperience", "location", e.target.value, index)}
                      placeholder="e.g. New York, NY"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor={`startDate-${job.id}`}>Start Date*</label>
                    <input 
                      type="month" 
                      id={`startDate-${job.id}`} 
                      value={job.startDate}
                      onChange={e => handleInputChange("workExperience", "startDate", e.target.value, index)}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor={`endDate-${job.id}`}>End Date</label>
                    <input 
                      type="month" 
                      id={`endDate-${job.id}`} 
                      value={job.endDate}
                      onChange={e => handleInputChange("workExperience", "endDate", e.target.value, index)}
                      disabled={job.isCurrentJob}
                    />
                    <div className="checkbox-group">
                      <input 
                        type="checkbox" 
                        id={`isCurrentJob-${job.id}`} 
                        checked={job.isCurrentJob}
                        onChange={e => handleInputChange("workExperience", "isCurrentJob", e.target.checked, index)}
                      />
                      <label htmlFor={`isCurrentJob-${job.id}`}>I currently work here</label>
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor={`description-${job.id}`}>Job Description*</label>
                  <textarea 
                    id={`description-${job.id}`} 
                    value={job.description}
                    onChange={e => handleInputChange("workExperience", "description", e.target.value, index)}
                    placeholder="Describe your responsibilities, achievements, and skills used in this role"
                    rows="4"
                    required
                  />
                  <div className="field-tip">💡 Use bullet points and action verbs. Quantify achievements when possible (e.g., "Increased sales by 25%").</div>
                </div>
              </div>
            ))}
            
            <button 
              type="button" 
              className="add-btn"
              onClick={() => addItem("workExperience")}
            >
              + Add Another Position
            </button>
          </div>
        )}
        
        {/* Step 4: Education */}
        {currentStep === 4 && (
          <div className="generator-form">
            {formData.education.map((edu, index) => (
              <div className="form-card" key={edu.id}>
                <div className="form-card-header">
                  <h3>Education {index + 1}</h3>
                  {formData.education.length > 1 && (
                    <button 
                      type="button" 
                      className="remove-btn"
                      onClick={() => removeItem("education", edu.id)}
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor={`degree-${edu.id}`}>Degree / Program*</label>
                  <input 
                    type="text" 
                    id={`degree-${edu.id}`} 
                    value={edu.degree}
                    onChange={e => handleInputChange("education", "degree", e.target.value, index)}
                    placeholder="e.g. Bachelor of Science in Computer Science"
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor={`institution-${edu.id}`}>Institution*</label>
                    <input 
                      type="text" 
                      id={`institution-${edu.id}`} 
                      value={edu.institution}
                      onChange={e => handleInputChange("education", "institution", e.target.value, index)}
                      placeholder="e.g. University of California"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor={`edu-location-${edu.id}`}>Location</label>
                    <input 
                      type="text" 
                      id={`edu-location-${edu.id}`} 
                      value={edu.location}
                      onChange={e => handleInputChange("education", "location", e.target.value, index)}
                      placeholder="e.g. Berkeley, CA"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor={`graduationDate-${edu.id}`}>Graduation Date*</label>
                  <input 
                    type="month" 
                    id={`graduationDate-${edu.id}`} 
                    value={edu.graduationDate}
                    onChange={e => handleInputChange("education", "graduationDate", e.target.value, index)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor={`edu-description-${edu.id}`}>Description (Optional)</label>
                  <textarea 
                    id={`edu-description-${edu.id}`} 
                    value={edu.description}
                    onChange={e => handleInputChange("education", "description", e.target.value, index)}
                    placeholder="Relevant coursework, honors, activities, or achievements"
                    rows="3"
                  />
                </div>
              </div>
            ))}
            
            <button 
              type="button" 
              className="add-btn"
              onClick={() => addItem("education")}
            >
              + Add Another Education
            </button>
          </div>
        )}
        
        {/* Step 5: Skills */}
        {currentStep === 5 && (
          <div className="generator-form">
            <div className="form-card">
              <div className="form-card-header">
                <h3>Skills</h3>
              </div>
              
              <div className="skills-container">
                {formData.skills.map((skill, index) => (
                  <div className="skill-input" key={index}>
                    <input 
                      type="text" 
                      value={skill}
                      onChange={e => updateSkill(index, e.target.value)}
                      placeholder={`Skill ${index + 1}`}
                    />
                    {formData.skills.length > 3 && (
                      <button 
                        type="button" 
                        className="remove-skill"
                        onClick={() => removeItem("skills", index)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              <button 
                type="button" 
                className="add-btn"
                onClick={() => addItem("skills")}
              >
                + Add Another Skill
              </button>
              
              <div className="field-tip">
                💡 Include a mix of technical skills, soft skills, and industry-specific qualifications relevant to your target position.
              </div>
            </div>
          </div>
        )}
        
        {/* Step 6: Review */}
        {currentStep === 6 && (
          <div className="generator-form">
            <div className="resume-preview">
              <div className="preview-section">
                <h3>Template Selected</h3>
                <p>{selectedTemplate || "No template selected"}</p>
              </div>
              
              <div className="preview-section">
                <h3>Personal Information</h3>
                <p><strong>Name:</strong> {formData.fullName || "Not provided"}</p>
                <p><strong>Email:</strong> {formData.email || "Not provided"}</p>
                <p><strong>Phone:</strong> {formData.phone || "Not provided"}</p>
                {formData.address && <p><strong>Address:</strong> {formData.address}</p>}
                {formData.linkedin && <p><strong>LinkedIn:</strong> {formData.linkedin}</p>}
                {formData.website && <p><strong>Website:</strong> {formData.website}</p>}
              </div>
              
              <div className="preview-section">
                <h3>Professional Summary</h3>
                <p>{formData.summary || "Not provided"}</p>
              </div>
              
              <div className="preview-section">
                <h3>Work Experience</h3>
                {formData.workExperience.length > 0 ? (
                  formData.workExperience.map((job, index) => (
                    <div className="preview-item" key={index}>
                      <h4>{job.title || "Job Title"} at {job.company || "Company"}</h4>
                      <p>
                        {job.startDate ? new Date(job.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : "Start Date"} - 
                        {job.isCurrentJob ? " Present" : job.endDate ? new Date(job.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : " End Date"}
                      </p>
                      <p>{job.description || "No description provided"}</p>
                    </div>
                  ))
                ) : (
                  <p>No work experience added</p>
                )}
              </div>
              
              <div className="preview-section">
                <h3>Education</h3>
                {formData.education.length > 0 ? (
                  formData.education.map((edu, index) => (
                    <div className="preview-item" key={index}>
                      <h4>{edu.degree || "Degree"}</h4>
                      <p>{edu.institution || "Institution"}{edu.location ? `, ${edu.location}` : ""}</p>
                      <p>
                        {edu.graduationDate ? new Date(edu.graduationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : "Graduation Date"}
                      </p>
                      {edu.description && <p>{edu.description}</p>}
                    </div>
                  ))
                ) : (
                  <p>No education added</p>
                )}
              </div>
              
              <div className="preview-section">
                <h3>Skills</h3>
                <div className="skills-preview">
                  {formData.skills.filter(skill => skill.trim() !== "").length > 0 ? (
                    formData.skills
                      .filter(skill => skill.trim() !== "")
                      .map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))
                  ) : (
                    <p>No skills added</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="form-actions">
          {currentStep > 1 && (
            <button 
              type="button" 
              className="back-btn"
              onClick={prevStep}
            >
              Back
            </button>
          )}
          
          {currentStep < 6 ? (
            <button 
              type="button" 
              className="next-btn"
              onClick={nextStep}
              disabled={currentStep === 1 && !selectedTemplate}
            >
              Continue
            </button>
          ) : (
            <button 
              type="button" 
              className="generate-btn"
              onClick={generateResume}
            >
              Generate Resume
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeGenerator;
