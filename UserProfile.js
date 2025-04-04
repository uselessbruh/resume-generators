import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "./UserProfile.css";

const UserProfile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        address: "",
        linkedin: "",
        website: "",
        jobTitle: "",
        profileCompleted: false
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!user || !user.uid) return;
            
            try {
                setLoading(true);
                const userRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userRef);
                
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setFormData({
                        fullName: userData.fullName || "",
                        phone: userData.phone || "",
                        address: userData.address || "",
                        linkedin: userData.linkedin || "",
                        website: userData.website || "",
                        jobTitle: userData.jobTitle || "",
                        profileCompleted: userData.profileCompleted || false
                    });
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUserProfile();
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user || !user.uid) return;
        
        try {
            setSaving(true);
            const userRef = doc(db, "users", user.uid);
            
            // Add email from auth to the data being saved
            const dataToSave = {
                ...formData,
                email: user.email,
                profileCompleted: true,
                updatedAt: new Date()
            };
            
            await setDoc(userRef, dataToSave, { merge: true });
            
            // Check if they were redirected from resume generator
            const referrer = sessionStorage.getItem("referrer");
            
            if (referrer === "generate-resume") {
                sessionStorage.removeItem("referrer");
                navigate("/generate-resume");
            } else {
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Error saving profile:", error);
            alert("Failed to save profile. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        navigate("/dashboard");
    };

    if (loading) {
        return (
            <div className="user-profile-container">
                <div className="loading-indicator">
                    <p>Loading your profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="user-profile-container">
            <div className="profile-header">
                <h1>Your Profile</h1>
                <p>Complete your profile to use in your resumes</p>
            </div>
            
            <form className="profile-form" onSubmit={handleSubmit}>
                <div className="form-section">
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name*</label>
                        <input 
                            type="text" 
                            id="fullName" 
                            name="fullName"
                            value={formData.fullName} 
                            onChange={handleChange}
                            placeholder="e.g. John Smith"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="jobTitle">Job Title</label>
                        <input 
                            type="text" 
                            id="jobTitle" 
                            name="jobTitle"
                            value={formData.jobTitle} 
                            onChange={handleChange}
                            placeholder="e.g. Software Engineer"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number*</label>
                        <input 
                            type="tel" 
                            id="phone" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="e.g. (123) 456-7890"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input 
                            type="text" 
                            id="address" 
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="e.g. New York, NY"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="linkedin">LinkedIn Profile (Optional)</label>
                        <input 
                            type="url" 
                            id="linkedin" 
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleChange}
                            placeholder="e.g. linkedin.com/in/johnsmith"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="website">Personal Website (Optional)</label>
                        <input 
                            type="url" 
                            id="website" 
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            placeholder="e.g. johnsmith.com"
                        />
                    </div>
                </div>
                
                <div className="form-actions">
                    <button 
                        type="button" 
                        className="cancel-button" 
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="save-button"
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "Save Profile"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserProfile;