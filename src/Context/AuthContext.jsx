import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase/config';
import { toast } from 'react-toastify';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const userData = userDoc.exists() ? userDoc.data() : null;
        
        setUser(firebaseUser);
        setUserData(userData);
        
        // Store in localStorage for persistence
        localStorage.setItem('propx_user', JSON.stringify({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          ...userData
        }));
      } else {
        setUser(null);
        setUserData(null);
        localStorage.removeItem('propx_user');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email, password, fullName, nin) => {
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with display name
      await updateProfile(userCredential.user, {
        displayName: fullName
      });

      // Store additional user data in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        fullName,
        nin,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      toast.success('Account created successfully!');
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.message);
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully!');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message);
      return false;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      
      if (!userDoc.exists()) {
        // Create user in Firestore if new
        await setDoc(doc(db, 'users', result.user.uid), {
          email: result.user.email,
          fullName: result.user.displayName,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isGoogleUser: true
        });
      }
      
      toast.success('Logged in with Google successfully!');
      return true;
    } catch (error) {
      console.error('Google login error:', error);
      toast.error(error.message);
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.info('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(error.message);
    }
  };

  const updateUserProfile = async (updates) => {
    try {
      if (auth.currentUser) {
        // Update in Firebase Auth if displayName
        if (updates.fullName) {
          await updateProfile(auth.currentUser, {
            displayName: updates.fullName
          });
        }

        // Update in Firestore
        await setDoc(doc(db, 'users', auth.currentUser.uid), {
          ...updates,
          updatedAt: new Date().toISOString()
        }, { merge: true });

        toast.success('Profile updated successfully!');
        return true;
      }
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error(error.message);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      userData,
      loading,
      signup,
      login,
      loginWithGoogle,
      logout,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};