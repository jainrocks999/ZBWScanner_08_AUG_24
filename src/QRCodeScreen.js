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
  const data1 = {
    app_token:
      'Jdk46c9wGr1tRnB9QwyvBwihSkP83KbBmffb64kmv1nT0xSqpHjxzGV2p28yYetStFJYr1waGQyHn8yNuhDAJ0gN7eVa9qAbu8JX3MNYrZf0YNY65Xn83MyA',
  };
  const data2 = {
    app_token:
      'ILxiAh8QStFW5pr2ctSabn8Cb4rnc0WSBkN2ZyITZPgJpDJxCiI8D7o06f2UCfaBTTuwtcklXrMecKJmGu8JJR0rg9jTkuqMr2NU',
  };
  const queryString = `?app_token=${encodeURIComponent(data1.app_token)}`;
  const queryString1 = `?app_token=${encodeURIComponent(data2.app_token)}`;
  const [loading, setLoading] = useState(false);
  const data = route.params.data;
  const [isScannerActive, setScannerActive] = useState(true);
  const [flash, setFlash] = useState(false);
  const scannerRef = useRef(null);
  const [messege, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
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
          // setScannerActive(false);
          fetchVIPInfo(e.data);
        } else {
          Toast.show('Wrong QR Code!');
        }
      } else if (data == 'dinner') {
        if (e.data.includes('/dinner/pass/')) {
          // setScannerActive(false);
          const bool = await fetchVIPInfo(e.data);
          if (bool) {
            navigation.navigate('DinnerPassInfo', {dinnerData: bool});
          }
        } else {
          Toast.show('Wrong QR Code');
        }
      } else if (data == 'genral') {
        handleGenral(e.data);
      } else if (data == 'admin') {
        fetchVIPInfo(e.data, true);
      } else {
        Toast.show('Wrong QR code');
      }
    } catch (errr) {
      setLoading(false);
      console.log('th9s issisissiis', errr);
    }
  };

  const handleGenral = async (url = '') => {
    try {
      if (!url.includes('visitor/info') && !url.includes('exhibitor/info')) {
        Toast.show('Wrong QR code');
        return;
      }
      setLoading(true);
      const url1 = url + queryString;

      const response = await fetch(url1, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        Toast.show('There are some error');
        return;
      }
      const data = await response.json();
      const user = data.data;
      const isExhibitor = url.includes('exhibitor/info');
      let datatoShow = {
        isExhibitor: url.includes('exhibitor/info'),
        profile_image: user?.profile_photo,
        name: user?.name,
        company_name: isExhibitor
          ? user?.company_name
          : user?.company_details?.businessName,
        personal_contact_nu: isExhibitor ? user?.contact_mobile : user?.phone,
        address: isExhibitor
          ? user?.company_address
          : user?.company_details?.address,
        logo: isExhibitor ? user?.company_logo : '',
        exhibitorion_package: isExhibitor ? user?.participation_package : '',
      };
      navigation.push('Details', {data: datatoShow});
      setLoading(false);
    } catch (err) {
      console.log('errr', err);
      setLoading(false);
    }
  };
  const handleScanButtonPress = () => {
    setScannerActive(!isScannerActive);
  };

  async function fetchVIPInfo(url,isAdmin) {
    setIsError(false);
    try {
      let url1 = url
      if(isAdmin){
        url1 = url + queryString1
      }else{
        url1 = url + queryString
      }
      console.log('Fetching VIP info from:', url1);
      setLoading(true);
      const response = await fetch(url1, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.code == 200) {
        setMessage(data.message);
        return data;
      } else if (data.data == 200) {
        setMessage(data.message);
        return data;
      } else {
        setIsError(true);
        setMessage(data.message);
        return false;
      }
    } catch (error) {
      Toast.show('Something went wrong!');
      setMessage('');
      console.error('Error fetching VIP info:', error);
      return false;
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
          {data == 'cauvihar'
            ? 'Scan Chauvihar QR Code'
            : data == 'vip'
            ? 'Scan VIP/Guest QR'
            : data == 'genral'
            ? 'General Scanner'
            : data == 'admin'
            ? 'Admin Scanner'
            : 'Scan Dinner Pass QR'}
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
            setIsError(false);
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
