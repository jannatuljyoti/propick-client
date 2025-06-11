import React, { createContext, useEffect, useState } from 'react';

import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../firebase/firebase.init';


export const AuthContext=createContext();
const auth=getAuth(app);


const AuthProvider = ({children}) => {

    const [loading,setLoading] = useState(true);
    const [user,setUser] =useState(null);

    const createUser = (email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email, password)
    }

    const signIn=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUser=(updatedData)=>{
        return updateProfile(auth.currentUser,updatedData);
    };

    const googleProvider=new GoogleAuthProvider();
    const googleLogin=()=>{
        return signInWithPopup(auth,googleProvider);
    }

    const logOut=()=>{
        setLoading(true);
        return signOut(auth)
    }

    

    useEffect(()=>{
        const unSubscribe= onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            setLoading(false);

        })
        return()=>{
            unSubscribe();
        }
    },[])

    const authData={
        createUser,
        user,
        setUser,
        loading,
        setLoading,
        signIn,
        logOut,
        updateUser,
        googleLogin

    }

    return <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
   
};

export default AuthProvider;