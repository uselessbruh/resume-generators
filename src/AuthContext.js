import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if there's a stored auth state in localStorage
        const storedAuth = localStorage.getItem('authState');
        if (storedAuth) {
            const { user, rememberMe } = JSON.parse(storedAuth);
            if (rememberMe && user) {
                setUser(user);
            }
        }

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            
            // Update localStorage with current auth state
            if (currentUser) {
                const storedAuth = localStorage.getItem('authState');
                if (storedAuth) {
                    const { rememberMe } = JSON.parse(storedAuth);
                    if (rememberMe) {
                        localStorage.setItem('authState', JSON.stringify({
                            user: currentUser,
                            rememberMe: true
                        }));
                    }
                }
            }
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password, rememberMe) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (rememberMe) {
            localStorage.setItem('authState', JSON.stringify({
                user: userCredential.user,
                rememberMe: true
            }));
        }
        return userCredential;
    };

    const signup = async (email, password, rememberMe) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (rememberMe) {
            localStorage.setItem('authState', JSON.stringify({
                user: userCredential.user,
                rememberMe: true
            }));
        }
        return userCredential;
    };
    
    const logout = () => {
        localStorage.removeItem('authState');
        return signOut(auth);
    };

    if (loading) {
        return null; // or a loading spinner
    }

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
