import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Landing from "./Landing";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import ResumeGenerator from "./ResumeGenerator";
import UserProfile from "./UserProfile";
import FinalResume from "./FinalResume";  // Import the new FinalResume component

// Create a wrapper component to handle auth state
const AppRoutes = () => {
    const { user } = useAuth();
    
    return (
        <Routes>
            {/* Redirect to dashboard if user is already authenticated */}
            <Route 
                path="/" 
                element={user ? <Navigate to="/dashboard" /> : <Landing />} 
            />
            <Route 
                path="/login" 
                element={user ? <Navigate to="/dashboard" /> : <Login />} 
            />
            <Route 
                path="/signup" 
                element={user ? <Navigate to="/dashboard" /> : <Signup />} 
            />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/user-profile"
                element={
                    <ProtectedRoute>
                        <UserProfile />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/generate-resume"
                element={
                    <ProtectedRoute>
                        <ResumeGenerator />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/final-resume"
                element={
                    <ProtectedRoute>
                        <FinalResume />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppRoutes />
            </Router>
        </AuthProvider>
    );
}

export default App;