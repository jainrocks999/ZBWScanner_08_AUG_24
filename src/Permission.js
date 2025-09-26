import { Alert, Platform, PermissionsAndroid } from 'react-native';
import { useCameraPermission, } from 'react-native-vision-camera';

const requestCameraPermission = async () => {
  // Skip permission request on iOS
  if (Platform.OS === 'ios') {
    const granted=true
    return granted;
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'We need access to your camera to scan QR codes during the event.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera permission granted');
      return true;
    } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
      Alert.alert(
        'Camera Permission',
        'Camera permission denied. You need it to scan QR codes.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Retry', onPress: requestCameraPermission },
        ]
      );
      return false;
    } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      Alert.alert(
        'Camera Permission',
        'Camera access is essential to scan QR codes. Please enable it in settings.'
      );
      return false;
    }

    return false;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export default requestCameraPermission;
