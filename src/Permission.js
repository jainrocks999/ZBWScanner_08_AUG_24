import { Alert, Platform } from 'react-native';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';

const requestCameraPermission = async () => {
  try {
    const permissionType = Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
    });

    const result = await request(permissionType);

    switch (result) {
      case RESULTS.GRANTED:
        console.log('Camera permission granted');
        return true;
      case RESULTS.DENIED:
        Alert.alert(
          'Camera Permission',
          'We need access to your camera to scan QR codes during the event.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Retry', onPress: requestCameraPermission },
          ]
        );
        return false;
      case RESULTS.BLOCKED:
        Alert.alert(
          'Camera Permission',
          'Camera access is essential to scan QR codes. Please enable it in settings.',
        );
        return false;
      case RESULTS.UNAVAILABLE:
        Alert.alert(
          'Camera Unavailable',
          'The camera is not available on this device.'
        );
        return false;
      default:
        return false;
    }
  } catch (error) {
    console.error('Failed to request camera permission', error);
    return false;
  }
};

export default requestCameraPermission;
