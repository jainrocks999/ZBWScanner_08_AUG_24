import {useNavigation} from '@react-navigation/native';
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Arrow from '../src/assets/HeaderArrow.svg';
import axios from 'axios';
import Loading from './components/Loader';

const QRCodeScannerScreen = ({route}) => {
  const [loading, setLoading] = useState(false);
  const data = route.params.data;
  const [isScannerActive, setScannerActive] = useState(true);
  const [flash, setFlash] = useState(false);
  const scannerRef = useRef(null);
  const navigation = useNavigation();
  const onRead = e => {
    if (data) {
      console.log('Scanned Data:', e.data);
      navigation.replace('Details', {scannedData: e.data});
      setScannerActive(false);
    } else {
      if (e.data.includes('chouvihar')) {
        setLoading(true);
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: e.data,
          headers: {},
        };

        axios(config)
          .then(response => {
            console.log(JSON.stringify(response.data));
            if (response.status == 200)
              navigation.replace('Chauvihar', {data: response?.data?.data});
            else {
              ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
            }
            setLoading(false);
          })
          .catch(error => {
            console.log(error);
            setLoading(false);
            ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
          });
      } else {
        ToastAndroid.show('Wrong QR Code', ToastAndroid.SHORT);
      }
    }
  };
  const handleScanButtonPress = () => {
    setScannerActive(!isScannerActive);
  };

  return (
    <View style={styles.container}>
      {loading && <Loading />}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: 10,
          marginLeft: 20,
          top: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Arrow />
          {/* <Image style={{width:24,height:18,tintColor:'#fff'}} source={require('../src/assets/arrow1.png')}/> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginRight: 40}}
          onPress={() => setFlash(!flash)}>
          <Image
            style={{width: 20, height: 20, tintColor: '#fff'}}
            source={require('../src/assets/torch1.png')}
          />
        </TouchableOpacity>
      </View>
      {isScannerActive ? (
        <QRCodeScanner
          onRead={onRead}
          flashMode={
            flash
              ? RNCamera.Constants.FlashMode.torch
              : RNCamera.Constants.FlashMode.off
          }
          showMarker={true}
          reactivate={true}
          reactivateTimeout={2000}
          markerStyle={styles.marker}
          cameraStyle={[styles.camera, {}]}
          ref={node => (scannerRef.current = node)}
        />
      ) : (
        <View
          style={[
            styles.scanButtonContainer,
            {
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            },
          ]}>
          <Button title="Scan Again" onPress={handleScanButtonPress} />
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          marginLeft: 40,
          alignItems: 'center',
          marginBottom: 50,
        }}>
        <Text style={{color: '#fff'}}></Text>
      </View>
      <StatusBar backgroundColor={'#000'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  marker: {
    borderColor: '#FFF',
    borderRadius: 10,
    borderWidth: 2,
  },
  camera: {
    aspectRatio: 1, // Maintain a square aspect ratio
    backgroundColor: 'transparent',
  },
  scanButtonContainer: {
    margin: 20,
  },
});

export default QRCodeScannerScreen;
