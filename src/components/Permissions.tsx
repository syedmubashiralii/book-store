import {Platform} from 'react-native';
import {PERMISSIONS, request, check, RESULTS} from 'react-native-permissions';

const requestCameraPermission = async () => {
  const permission = Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
  }) ?? PERMISSIONS.ANDROID.CAMERA;

  const result = await request(permission);

  if (result === RESULTS.GRANTED) {
    console.log('Camera permission granted');
    return true;
  } else {
    console.log('Camera permission denied');
    return false;
  }
};

const requestPhotoLibraryPermission = async () => {
  const permission = Platform.select({
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  }) ?? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

  const result = await request(permission);

  if (result === RESULTS.GRANTED) {
    console.log('Photo Library permission granted');
    return true;
  } else {
    console.log('Photo Library permission denied');
    return false;
  }
};

export {requestCameraPermission, requestPhotoLibraryPermission};
