import { LoginRequestType, RegisterRequestType } from "../types/types/auth.types";


import { auth, db } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType } from "../types/types/user.types";
import i18n from "../i18n";
import { createUserWithEmailAndPassword } from 'firebase/auth';

export async function login(request: LoginRequestType): Promise<UserType> {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, request.email, request.password);
        const uid = userCredential.user.uid;
        const userDoc = await getDoc(doc(db, 'users', uid));
        const userData = userDoc.data();
        if (!userData) {
            throw new Error("auth/user-not-found");
        }
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        return userData as UserType;
    } catch (error: any) {
        if (error.message === "auth/user-not-found")
            throw new Error(i18n.t('userNotFound'));
        switch (error.code) {
            case 'auth/user-not-found':
                throw new Error(i18n.t('userNotFound'));
            case 'auth/wrong-password':
                throw new Error(i18n.t('wrongPassword'));
            case 'auth/invalid-email':
                throw new Error(i18n.t('invalidEmail'));
            case 'auth/too-many-requests':
                throw new Error(i18n.t('tooManyRequests'));
            case 'auth/network-request-failed':
                throw new Error(i18n.t('networkRequestFailed'));
            case 'auth/internal-error':
                throw new Error(i18n.t('internalServerError'));
            case 'auth/invalid-credential':
                throw new Error(i18n.t('invalidCredential'));
            default:
                throw new Error(i18n.t('failedToLogin'));
        }
    }
}

export async function register(request: RegisterRequestType): Promise<UserType> {
    if (request.password !== request.confirmPassword) {
        throw new Error(i18n.t('passwordsDoNotMatch'));
    }
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, request.email, request.password);
        const uid = userCredential.user.uid;
        const data = {
            id: uid,
            fullName: request.fullName,
            email: request.email,
            profilePicture: 'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account'
        };

        await setDoc(doc(db, 'users', uid), data);

        await AsyncStorage.setItem('user', JSON.stringify(data));
        return data as UserType;
    }
    catch (error: any) {
        switch (error.code) {
            case 'auth/email-already-in-use':
                throw new Error(i18n.t('emailAlreadyInUse'));
            case 'auth/invalid-email':
                throw new Error(i18n.t('invalidEmail'));
            case 'auth/weak-password':
                throw new Error(i18n.t('weakPassword'));
            case 'auth/network-request-failed':
                throw new Error(i18n.t('networkRequestFailed'));
            default:
                throw new Error(i18n.t('failedToRegister'));
        }
    }
}

export const getCurrentUser = async (): Promise<UserType | null> => {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

export const logout = async () => {
    await auth.signOut();
    await AsyncStorage.removeItem('user');

}



export async function fetchUserProfile(): Promise<UserType> {
    try {
        const user = await getCurrentUser();
        if (!user) {
            throw new Error(i18n.t('userNotFound'));
        }

        const userDoc = await getDoc(doc(db, 'users', user.id));
        if (!userDoc.exists()) {
            throw new Error(i18n.t('userNotFound'));
        }

        const userData = userDoc.data() as UserType;
        return userData;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
}


// Log in anonymously
export const loginAnonymously = async () => {
    try {
        const userCredential = await signInAnonymously(auth);
        console.log("Anonymous user signed in:", userCredential.user);
    } catch (error) {
        
        console.error("Error signing in anonymously:", error);
        throw error;
    }
}

export const isLoginAnonymously = async (): Promise<boolean> => {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User is logged in:", user);
                if (user.isAnonymous) {
                    console.log("User is anonymous.");
                    resolve(true);
                } else {
                    resolve(false);
                }
            } else {
                console.log("No user is signed in.");
                resolve(false);
            }
        });
    });
}