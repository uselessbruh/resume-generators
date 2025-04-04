import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <div className="container header-container">
          <div className="logo">
            <h1>ResumeBuilder</h1>
          </div>
          <nav className="main-nav">
            <a href="#features">Features</a>
            <a href="#templates">Templates</a>
            <a href="#testimonials">Testimonials</a>
            <Link to="/login" className="login-link">Log In</Link>
            <Link to="/signup" className="signup-button">Get Started</Link>
          </nav>
        </div>
      </header>

      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <h2>Create Professional Resumes That Get You Hired</h2>
            <p>
              Build stunning, ATS-friendly resumes in minutes with our intuitive resume builder.
              Stand out from the crowd and land your dream job faster.
            </p>
            <div className="hero-buttons">
              <Link to="/signup" className="primary-button">Create My Resume</Link>
              <a href="#templates" className="secondary-button">View Templates</a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">2M+</span>
                <span className="stat-label">Resumes Created</span>
              </div>
              <div className="stat">
                <span className="stat-number">85%</span>
                <span className="stat-label">Interview Rate</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Templates</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="resume-preview">
              <div className="resume-header"></div>
              <div className="resume-content">
                <div className="resume-section"></div>
                <div className="resume-section"></div>
                <div className="resume-section"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Our Resume Builder?</h2>
          <p className="section-subtitle">
            We combine powerful tools with simple design to help you create winning resumes
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon user-friendly"></div>
              <h3>User-Friendly Interface</h3>
              <p>
                Our intuitive drag-and-drop editor makes creating and editing your resume simple and fast.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon ats-optimized"></div>
              <h3>ATS-Optimized Templates</h3>
              <p>
                Every template is tested with leading Applicant Tracking Systems to ensure your resume gets past the first screening.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon customizable"></div>
              <h3>Fully Customizable</h3>
              <p>
                Change colors, fonts, layouts, and sections to match your personal style and industry standards.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon multiple-formats"></div>
              <h3>Multiple Export Formats</h3>
              <p>
                Download your resume as PDF, DOCX, or TXT to meet any application requirement.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon content-suggestions"></div>
              <h3>Expert Content Suggestions</h3>
              <p>
                Get industry-specific phrases and bullet points to highlight your skills effectively.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon real-time"></div>
              <h3>Real-Time Preview</h3>
              <p>
                See changes instantly as you edit, ensuring your resume looks perfect before downloading.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="templates" className="templates-section">
        <div className="container">
          <h2 className="section-title">Professional Resume Templates</h2>
          <p className="section-subtitle">
            Choose from dozens of HR-approved templates designed for every industry and career stage
          </p>

          <div className="templates-carousel">
            <div className="template-card">
              <div className="template-preview template-1"></div>
              <h3>Executive</h3>
            </div>
            <div className="template-card">
              <div className="template-preview template-2"></div>
              <h3>Modern</h3>
            </div>
            <div className="template-card">
              <div className="template-preview template-3"></div>
              <h3>Creative</h3>
            </div>
            <div className="template-card">
              <div className="template-preview template-4"></div>
              <h3>Minimal</h3>
            </div>
          </div>

          <div className="templates-cta">
            <Link to="/signup" className="primary-button">Browse All Templates</Link>
          </div>
        </div>
      </section>

      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <h2 className="section-title">Success Stories</h2>
          <p className="section-subtitle">
            Join thousands of professionals who found success with our resume builder
          </p>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"I applied to 5 companies with my new resume and got 4 interview calls! The ATS-friendly templates really made a difference."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <h4>Jessica T.</h4>
                  <p>Marketing Manager</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"After struggling with my resume for weeks, I found this tool and created a professional resume in just 20 minutes. Worth every penny!"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <h4>Michael R.</h4>
                  <p>Software Engineer</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The content suggestions helped me highlight skills I didn't even know were valuable. Landed a job with a 30% salary increase!"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <h4>Sarah M.</h4>
                  <p>Financial Analyst</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Build Your Professional Resume?</h2>
          <p>Join thousands of job seekers who've successfully landed their dream jobs</p>
          <Link to="/signup" className="primary-button cta-button">Create My Resume Now</Link>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-container">
          <div className="footer-company">
            <h3>ResumeBuilder</h3>
            <p>Create professional resumes in minutes.</p>
            <div className="social-links">
              <a href="#" className="social-icon facebook"></a>
              <a href="#" className="social-icon twitter"></a>
              <a href="#" className="social-icon linkedin"></a>
              <a href="#" className="social-icon instagram"></a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <ul>
                <li><a href="#">Templates</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Examples</a></li>
                <li><a href="#">Features</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Resume Guide</a></li>
                <li><a href="#">Cover Letter Tips</a></li>
                <li><a href="#">Career Blog</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <p>&copy; 2025 ResumeBuilder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;