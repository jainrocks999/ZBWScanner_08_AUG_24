import {useNavigation} from '@react-navigation/native';
import React, {useState, useRef, useMemo} from 'react';
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
  Dimensions,
} from 'react-native';
// import QRCodeScanner from 'react-native-qrcode-scanner';
// import {RNCamera} from 'react-native-camera';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import Arrow from '../src/assets/HeaderArrow.svg';
import axios from 'axios';
import Loading from './components/Loader';
import Toast from 'react-native-simple-toast';
import ToastModal from './ToastModel';
import {throttle} from './throttle';
const QRCodeScannerScreen = ({route}) => {
  const {height, width} = Dimensions.get('window');
  const cameraDevice = useCameraDevice('back');
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (codes.length > 0) {
        throttledOnRead({data: codes[0].value});
      }
    },
  });
  const throttledOnRead = useMemo(
    () =>
      throttle(codes => {
        setActive(false);
        onRead(codes);
      }, 4000), // 2 sec lock
    [onRead],
  );
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
  const routeData = route.params.data;
  const [isScannerActive, setScannerActive] = useState(true);
  const [flash, setFlash] = useState(false);
  const scannerRef = useRef(null);
  const [messege, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigation = useNavigation();
  const [isActive, setActive] = useState(true);
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

          if (response.data.code == 200) {
            setActive(true);
            navigation.navigate('Chauvihar', {data: response?.data?.data});
          } else {
            setActive(true);
            Toast.show(response.data.message);
          }
          setLoading(false);
        } else {
          setActive(true);
          Toast.show('Wrong QR Code!');
        }
      } else if (data == 'vip') {
        if (e.data.includes('swarn-mela/vip')) {
          // setScannerActive(false);
          fetchVIPInfo(e.data);
        } else {
          Toast.show('Wrong QR Code!');
          setActive(true);
        }
      } else if (data == 'dinner') {
        if (e.data.includes('/dinner/pass/')) {
          // setScannerActive(false);
          const data = await fetchVIPInfo(e.data);
          if (data) {
            navigation.navigate('DinnerPassInfo', {dinnerData: data});
          }
        } else {
          Toast.show('Wrong QR Code');
          setActive(true);
        }
      } else if (data == 'genral') {
        handleGenral(e.data);
      }else if(data == 'admin'){
        fetchVIPInfo(e.data,true);

      }  else {
        Toast.show('Wrong QR code');
        setActive(true);
      }
    } catch (errr) {
      setLoading(false);
      setActive(true);
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
    } finally {
      setActive(true);
    }
  };
  const handleScanButtonPress = () => {
    setScannerActive(!isScannerActive);
  };

  async function fetchVIPInfo(url,isAdmin = false) {
    setIsError(false);
    try {
      let url1 = url;
      if(isAdmin){
        url1 = url + queryString1;
      }else{
        url1 = url + queryString;
      }
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
      console.log('dinner Pass Data', data);

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
      setActive(true);
    }
  }
  if (!cameraDevice) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 16,
            color: '#000',
          }}>
          No Camera Device Found
        </Text>
      </View>
    );
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
          zIndex: 20,
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
            :data=='admin'?"Admin Scanner": 'Scan Dinner Pass QR'}
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
        style={{flex: 1, justifyContent: 'center'}}>
        {loading && <Loading />}

        {isScannerActive ? (
          <>
            {isActive ? (
              <Camera
                ref={scannerRef}
                device={cameraDevice}
                isActive={isActive}
                style={StyleSheet.absoluteFill}
                codeScanner={codeScanner}
                torch={flash ? 'on' : 'off'}
              />
            ) : null}
          </>
        ) : (
          // <QRCodeScanner
          //   onRead={onRead}
          //   flashMode={
          //     flash
          //       ? RNCamera.Constants.FlashMode.torch
          //       : RNCamera.Constants.FlashMode.off
          //   }
          //   showMarker={true}
          //   reactivate={true}
          //   reactivateTimeout={2000}
          //   markerStyle={styles.marker}
          //   cameraStyle={[styles.camera, {}]}
          //   ref={node => (scannerRef.current = node)}
          // />
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
        {isScannerActive && isActive ? (
          <View
            style={{
              height: height * 0.28,
              width: width * 0.6,
              position: 'absolute',
              zIndex: 10,
              borderWidth: 2,
              borderColor: 'white',
              alignSelf: 'center',
              borderRadius: 5,
            }}></View>
        ) : null}
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

const exhibitor_Data = {
  message: 'Exhibitor Details!',
  data: {
    location: {type: 'Point', coordinates: []},
    _id: '689c7d023de601889361e0a7',
    profile_photo:
      'https://zbwa-bucket.in-maa-1.linodeobjects.com/new/exibitors/b26fe6ca-f1b0-4be2-acb2-60c005867044.jpeg',
    company_logo:
      'https://zbwa-bucket.in-maa-1.linodeobjects.com/new/exibitors/f3d4ecbf-8a8d-4f35-9e09-62c370e00cf3.jpeg',
    name: 'Ram  test',
    account_email: '',
    account_company_pan: 'ABCDE1234F',
    account_gstn_holder: 'yes',
    account_company_gstn: '12ABCDE1234F1Z5',
    terms: 0,
    contact_designation: '',
    contact_mobile: '9074094699',
    contact_email: '',
    company_type: 'Proprietary',
    company_name: 'Atto',
    company_address: '',
    company_pincode: '',
    company_country: '',
    company_state: '',
    company_city: '',
    company_landline: '',
    company_mobile: '1234567890',
    company_google_map_link: '',
    company_business_nature: [],
    company_product_category: [],
    company_years_in_business: '',
    participation_package: 'ZBF - MAHARATHI',
    zbwa_id: '',
    specialized_in_tags: [],
    user_id: '689c7c913de601889361e056',
    promotional_banner:
      'https://zbwa-bucket.in-maa-1.linodeobjects.com/new/exibitors/3eb646b9-a41f-42b0-8b64-34418b5e5772.jpeg',
    intro_video: '',
    product_gallery: [
      {
        name: 'Pr1',
        image:
          'https://zbwa-bucket.in-maa-1.linodeobjects.com/new/exibitors/62022bed-06ad-4471-9582-c61e370aa414.jpeg',
      },
    ],
    qr_code: '',
    about_us: '',
    type: 'general',
    app_store_link: '',
    play_store_link: '',
    status: 'active',
    createdAt: '2025-08-13T11:54:42.476Z',
    updatedAt: '2025-08-13T11:54:42.476Z',
    __v: 1,
  },
  code: 200,
  success: true,
};

const visitorData = {
  message: 'Visitor Details!',
  data: {
    _id: '68ba8b0ac9868a101853834f',
    name: 'Rishabh Soni',
    designation: 'Owner',
    employees: [
      {
        name: 'Niket ',
        desgnation: 'Employee',
        phone: '8787585858',
        passport_photo:
          'https://zbwa-bucket.in-maa-1.linodeobjects.com/new/visitors_dev/20a823b5-468d-4f7c-bc17-83482ea2226a.jpeg',
        employee_recommendation_letter:
          'https://zbwa-bucket.in-maa-1.linodeobjects.com/new/visitors_dev/c90f392d-96a9-4a0b-9751-fbfa2646fbf0.pdf',
      },
    ],
    phone: '8989868686',
    email: 'rsornaments@gmail.com',
    company_details: {
      businessName: 'RS ornaments',
      address: '3/12, Maratha colony , Zaveri bazar ,kalbadevi,',
      zipCode: '400003',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
    },
    profile_photo:
      'https://zbwa-bucket.in-maa-1.linodeobjects.com/new/visitors_dev/6943bfd3-0be6-426e-ba28-8371f084bb90.jpeg',
    pan_card_image:
      'https://zbwa-bucket.in-maa-1.linodeobjects.com/new/visitors_dev/8635210a-64b4-424d-b1a1-82167f460134.jpeg',
    gst_certificate_image:
      'https://zbwa-bucket.in-maa-1.linodeobjects.com/new/visitors_dev/f22e4021-e928-4347-a883-bebd7605622b.pdf',
    recommendation_letter_image:
      'https://zbwa-bucket.in-maa-1.linodeobjects.com/new/visitors_dev/a9f90b32-3a7e-4684-82b5-d4d88a78d3bc.jpeg',
    interested_in_tags: [
      '68889fea0ce5feffc7e8a3f1',
      '689af06429482f2c3c352983',
      '6875fa2cb4ec7809d66b405e',
    ],
    user_id: '68ba897fc9868a10185382ee',
    no_of_outlets: 21,
    status: 'active',
    createdAt: '2025-09-05T07:02:34.691Z',
    updatedAt: '2025-09-05T07:03:16.496Z',
    __v: 0,
  },
  code: 200,
  success: true,
};
