import { auth, db, collection } from '../firebase/config';
import { doc, setDoc, getDocs, getDoc, deleteDoc, query, where } from 'firebase/firestore';
import i18n from "../i18n";
import { ProductType } from '../types/types/product.types';
import { requestCameraPermission, requestPhotoLibraryPermission } from '../components/Permissions';
import { launchImageLibrary } from 'react-native-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';
import database from '@react-native-firebase/database'; // For Realtime Database
import { UserType } from '../types/types/user.types';
import { getCurrentUser } from './auth';
import { Alert } from 'react-native';

export async function uploadImage(): Promise<string> {
    try {
        const hasPermission = await requestPhotoLibraryPermission();


        const result = await launchImageLibrary({
            mediaType: 'photo',
            quality: 1,
        });

        if (!result.assets || result.assets.length === 0) {
            throw new Error(i18n.t('noImageSelected'));
        }

        const imageUri = result.assets[0].uri;
        if (!imageUri) {
            throw new Error(i18n.t('noImageUri'));
        }
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const filename = `images/${Date.now()}-${Math.random().toString(36).substring(7)}`;
        const storageRef = ref(storage, filename);
        const snapshot = await uploadBytes(storageRef, blob);
        const downloadUrl = await getDownloadURL(snapshot.ref);
        return downloadUrl;
    } catch (error) {
        console.log('Upload error:', error);
        throw new Error(i18n.t('failedToUploadImage'));
    }
}


const generateUid = () => {
    return (
      'uid-' +
      Math.random().toString(36).substr(2, 9) + 
      '-' +
      Date.now().toString(36)
    );
  };
export async function uploadProduct(request: ProductType): Promise<ProductType> {
    try {
        const user = auth.currentUser;
        if (!user)
            throw new Error(i18n.t('userNotFound'));
        const newUid = generateUid();
        if (!newUid) {
            throw new Error('Failed to generate product ID');
        }
        const productRef = doc(db, 'products', newUid);
        await setDoc(productRef,
            {
                ...request,
                id: newUid,
                userId: user.uid,
                createdAt: new Date(),
            }
        );

     
        return request;
    } catch (error: any) {
        console.log('error', error);
        throw new Error(i18n.t('failedToUploadProduct'));
    }
}


export async function fetchProducts(): Promise<ProductType[]> {
    try {
        const productsRef = collection(db, 'products');
        const querySnapshot = await getDocs(productsRef);
        const products: ProductType[] = [];

        querySnapshot.forEach((doc) => {
            products.push({
                id: doc.id,
                ...doc.data()
            } as ProductType);
        });

        return products;
    } catch (error) {
        console.log('Fetch products error:', error);
        throw new Error(i18n.t('failedToFetchProducts'));
    }
}


export const getProduct = async (id: string): Promise<ProductType> => {
    try {
        const productRef = doc(db, 'products', id);
        const productDoc = await getDoc(productRef);
        if (!productDoc.exists()) {
            throw new Error(i18n.t('productNotFound'));
        }
        return productDoc.data() as ProductType;
    } catch (error) {
        console.log('Get product error:', error);
        throw new Error(i18n.t('failedToGetProduct'));
    }
}

export const getUserById = async (id: string): Promise<UserType> => {
    try {
        const userRef = doc(db, 'users', id);
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
            throw new Error(i18n.t('userNotFound'));
        }
        console.log('userDoc.data()', userDoc.data());
        return userDoc.data() as UserType;
    } catch (error) {
        console.log('Get user error:', error);
        throw new Error(i18n.t('failedToGetUser'));
    }
}


export const deleteProduct = async (id: string): Promise<void> => {
    try {
        const productRef = doc(db, 'products', id);
        await deleteDoc(productRef);
    } catch (error) {
        console.log('Delete product error:', error);
        throw new Error(i18n.t('failedToDeleteProduct'));
    }
}


export async function fetchUserProducts(): Promise<ProductType[]> {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            throw new Error('User not found');
        }

        const productsRef = collection(db, 'products');
        const q = query(
            productsRef,
            where('userId', '==', currentUser.id)
        );

        const querySnapshot = await getDocs(q);
        const products: ProductType[] = [];

        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() } as ProductType);
        });

        return products;
    } catch (error) {
        console.error('Error fetching user products:', error);
        throw error;
    }
}