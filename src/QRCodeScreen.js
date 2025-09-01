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
  Alert,
  ImageBackground,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Arrow from '../src/assets/HeaderArrow.svg';
import axios from 'axios';
import Loading from './components/Loader';
import Toast from 'react-native-simple-toast';
import ToastModal from './ToastModel';
const QRCodeScannerScreen = ({route}) => {
  const [loading, setLoading] = useState(false);
  const data = route.params.data;
  const [isScannerActive, setScannerActive] = useState(true);
  const [flash, setFlash] = useState(false);
  const scannerRef = useRef(null);
  const [messege, setMessage] = useState('');
  const [isError,setIsError]=useState(false)
  const navigation = useNavigation();
  const onRead = async e => {
    try {
      if (data == 'cauvihar') {
        if (e.data.includes('chouvihar')) {
          const data = {
            app_token:
              'Jdk46c9wGr1tRnB9QwyvBwihSkP83KbBmffb64kmv1nT0xSqpHjxzGV2p28yYetStFJYr1waGQyHn8yNuhDAJ0gN7eVa9qAbu8JX3MNYrZf0YNY65Xn83MyA',
          };
          setLoading(true);
          let response = await axios({
            method: 'post',

            maxBodyLength: Infinity,
            url: e.data,
            data: data,
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log(response.data);

          if (response.data.code == 200)
            navigation.navigate('Chauvihar', {data: response?.data?.data});
          else {
            Toast.show(response.data.message);
          }
          setLoading(false);
        } else {
          Toast.show('Wrong QR Code!');
        }
      } else if (data == 'vip') {
        if (e.data.includes('swarn-mela/vip')) {
          setScannerActive(false);
          fetchVIPInfo(e.data);
        } else {
          Toast.show('Wrong QR Code!');
        }
      } else if (data == 'dinner') {
        if (e.data.includes('/dinner/pass/')) {
          setScannerActive(false);
          fetchVIPInfo(e.data);
        } else {
          Toast.show('Wrong QR Code');
        }
      }

      return;
      if (data) {
        console.log('Scanned Data:', e.data);
        navigation.replace('Details', {scannedData: e.data});
        setScannerActive(false);
      } else {
        if (e.data.includes('chouvihar')) {
          const data = {
            app_token:
              'Jdk46c9wGr1tRnB9QwyvBwihSkP83KbBmffb64kmv1nT0xSqpHjxzGV2p28yYetStFJYr1waGQyHn8yNuhDAJ0gN7eVa9qAbu8JX3MNYrZf0YNY65Xn83MyA',
          };
          setLoading(true);
          let response = await axios({
            method: 'post',

            maxBodyLength: Infinity,
            url: e.data,
            data: data,
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log(response.data);

          if (response.data.code == 200)
            navigation.navigate('Chauvihar', {data: response?.data?.data});
          else {
            Toast.show(response.data.message);
          }
          setLoading(false);
        } else {
          if (e.data.includes('swarn-mela/vip')) {
            setScannerActive(false);
            fetchVIPInfo(e.data);
          } else if (e.data.includes('/dinner/pass/')) {
            setScannerActive(false);
            fetchVIPInfo(e.data);
          } else {
            Toast.show('Wrong QR Code');
          }
        }
      }
    } catch (errr) {
      setLoading(false);
      console.log('th9s issisissiis', errr);
    }
  };
  const handleScanButtonPress = () => {
    setScannerActive(!isScannerActive);
  };

  async function fetchVIPInfo(url) {
    setIsError(false)
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      
      if (data.code==200) {
       setMessage(data.message);
      } else if(data.data==200) {
        setMessage(data.message);
      }else{
        setIsError(true)
        setMessage(data.message);
      }
    } catch (error) {
      Toast.show('Someting went wrong!');
      setMessage('');
      console.error('Error fetching VIP info:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: 10,
          marginLeft: 20,
          top: 10,
          height: 50,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Arrow />
          {/* <Image style={{width:24,height:18,tintColor:'#fff'}} source={require('../src/assets/arrow1.png')}/> */}
        </TouchableOpacity>
        <Text
          style={{
            color: 'white',
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 16,
          }}>
          {data=='cauvihar'? 'Scan Chauvihar QR Code':data=='vip'? "Scan VIP/Guest QR":"Scan Dinner Pass QR"}
        </Text>
        <TouchableOpacity
          style={{marginRight: 40}}
          onPress={() => setFlash(!flash)}>
          <Image
            style={{width: 20, height: 20, tintColor: '#fff'}}
            source={
              isScannerActive ? require('../src/assets/torch1.png') : null
            }
          />
        </TouchableOpacity>
      </View>
      <ImageBackground
        source={isScannerActive ? null : require('./assets/background.png')}
        style={{flex: 1}}>
        {loading && <Loading />}

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
            <TouchableOpacity
              onPress={handleScanButtonPress}
              style={{
                backgroundColor: '#FCDA64',

                paddingVertical: 10,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
                paddingHorizontal: '3%',
                width: '67%',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 16,
                }}>
                Scan Next QR Code
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <StatusBar backgroundColor={'#000'} />
        <ToastModal
        isError={isError}
          visible={messege.length}
          onHide={() => {
            setMessage('');
            setIsError(false)
          }}
          message={messege}
        />
      </ImageBackground>
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
