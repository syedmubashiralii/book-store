import { auth, collection, firestore, getDocs, query, updateDoc, where } from '../firebase/config'
import { doc } from "firebase/firestore";
import { ToastAndroid } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs'; // File System module
import { PermissionsAndroid, Alert, Platform } from 'react-native';




// import CameraRoll from '@react-native-community/cameraroll'
let user = auth.currentUser;
const COLORS = ["#ff0000", "#00ff00", "#0000ff", "#000000", "#ffffff", "#ff00ff", "#00ffff"];
const Languages = ['arabicBooks', 'englishBooks']
const Categories = ["schoolBooks",
    "childrenBooks",
    "religiousBooks",
    "scientificBooks",
    "literaryBooks",
    "socialBooks",
    "philosophicalBooks",
    "historicalBooks",
    "storiesAndNovels",
    "moneyAndEconomyBooks",
    "medicalBooks",
    "businessManagementBooks",
    "selfDevelopmentBooks",
    "artAndDesignBooks",]
const loadUser = async (userId: any, setUserProfile: any) => {
    const usersRef = collection(firestore, "Users");
    const q = query(usersRef, where("id", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        setUserProfile(doc.data());
    })
}
const loadAllCategories = async (setAllCategories: any) => {
    // schoolBooks: "School Books",
    // childrenBooks: "Children Books",
    // religiousBooks: "Religious Books",
    // scientificBooks: "Scientific Books",
    // literaryBooks: "Literary Books",
    // socialBooks: "Social Books",
    // philosophicalBooks: "Philosophical Books",
    // historicalBooks: "Historical Books",
    // storiesAndNovels: "Stories and Novels",
    // moneyAndEconomyBooks: "Money and Economy Books",
    // medicalBooks: "Medical Books",
    // businessManagementBooks: "Business Management Books",
    // selfDevelopmentBooks: "Self Development Books",
    // artAndDesignBooks: "Art and Design Books",

    setAllCategories([
        "schoolBooks",
        "childrenBooks",
        "religiousBooks",
        "scientificBooks",
        "literaryBooks",
        "socialBooks",
        "philosophicalBooks",
        "historicalBooks",
        "storiesAndNovels",
        "moneyAndEconomyBooks",
        "medicalBooks",
        "businessManagementBooks",
        "selfDevelopmentBooks",
        "artAndDesignBooks",
    ]);


}
const loadShop = async (shopId: any, setShopProfile: any) => {
    const shopsRef = collection(firestore, "Shops");
    const q = query(shopsRef, where("id", "==", shopId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        setShopProfile(doc.data());
    })
}
const loadAllShopProducts = async (shopId: any, setShopProducts: any) => {
    const productsRef = collection(firestore, "Products");
    const q = query(productsRef, where("userId", "==", shopId));
    const querySnapshot = await getDocs(q);
    const products: any = [];
    querySnapshot.forEach((doc) => {

        products.push(doc.data());
    })
    setShopProducts(products);
}
const loadAllProducts = async (setAllProducts: any) => {
    const productsRef = collection(firestore, "Products");
    const q = query(productsRef);
    const querySnapshot = await getDocs(q);
    const products: any = [];
    querySnapshot.forEach((doc) => {
        products.push(doc.data());
    })
    setAllProducts(products);
}


const loadLikedProducts = async (userId: any, setLikedProducts: any) => {
    const usersRef = collection(firestore, "Users");
    const q = query(usersRef, where("id", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const user = doc.data();
        setLikedProducts(user.liked);
    })
}
const loadDislikedProducts = async (userId: any, setDislikedProducts: any) => {
    const usersRef = collection(firestore, "Users");
    const q = query(usersRef, where("id", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const user = doc.data();
        setDislikedProducts(user.disliked);
    })
}
const loadAllShopsProfile = async (setAllShopsProfile: any) => {
    const shopsRef = collection(firestore, "Shops");
    const q = query(shopsRef);
    const querySnapshot = await getDocs(q);
    const shopsProfile: any = [];
    for (const doc of querySnapshot.docs) {
        const usersRef = collection(firestore, "Users");
        const q2 = query(usersRef, where("id", "==", doc.data().id));
        const querySnapshot2 = await getDocs(q2);
        // querySnapshot2.then((querySnapshot2) => {
        querySnapshot2.forEach((doc2) => {
            const user = doc2.data();
            user.followers = doc.data().followers;
            shopsProfile.push(user);
        })
        // })

    }
    setAllShopsProfile(shopsProfile);
}




const loadBestSales = async (setBestSales: any) => {
    const usersRef = collection(firestore, "StaticData");
    const q = query(usersRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const ProductsRef = collection(firestore, "Products");
        const q2 = query(ProductsRef, where("id", "in", doc.data().bestSales));
        const querySnapshot2 = getDocs(q2);
        querySnapshot2.then((querySnapshot2) => {
            const products: any = [];
            querySnapshot2.forEach((doc2) => {
                products.push(doc2.data());
            })
            setBestSales(products);
        })


    })
}



function showToast() {
    ToastAndroid.show('Image downloaded successfully!', ToastAndroid.SHORT);
}

const downloadAndSavePhoto = async (photoUrl: any, albumName: any) => {
    try {
        // Request storage permissions (only needed on Android)
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission Required',
                    message: 'App needs access to your storage to save photos.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Storage permission not granted.');
                Alert.alert('Permission Denied', 'Storage access is required to save photos.');
                return;
            }
        }

        // Generate a local file path to save the photo
        const downloadPath = `${RNFS.DocumentDirectoryPath}/downloaded_photo.jpg`;

        // Download the photo
        const downloadResult = await RNFS.downloadFile({
            fromUrl: photoUrl,
            toFile: downloadPath,
        }).promise;

        if (downloadResult.statusCode !== 200) {
            throw new Error('Failed to download the photo.');
        }

        // Save the photo to the gallery
        // await CameraRoll.save(downloadPath, { type: 'photo', album: albumName });

        console.log('Photo saved to gallery.');
        Alert.alert('Success', 'Photo has been saved to your gallery.');
    } catch (error) {
        console.error('Error while downloading and saving photo:', error);
        Alert.alert('Error', 'Failed to save the photo. Please try again.');
    }
};
const loadProduct = async (productId: any, setProduct: any) => {
    const productsRef = collection(firestore, "Products");
    const q = query(productsRef, where("id", "==", productId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        setProduct(doc.data());
    })
}

export {
    loadUser,
    loadAllCategories,
    loadShop,
    loadAllShopProducts,
    loadAllProducts,
    loadLikedProducts,
    loadDislikedProducts,
    loadAllShopsProfile,
    loadBestSales,
    COLORS,
    Languages,
    Categories,
    downloadAndSavePhoto,
    loadProduct,
};
export default user;
