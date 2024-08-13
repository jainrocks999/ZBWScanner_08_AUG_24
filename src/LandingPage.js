import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from '../src/components/LocalStorage';
import requestCameraPermission from '../src/Permission'
import axios from 'axios';
const LandingPage = () => {
  const navigation = useNavigation();
 
  
  const handleScan = async (data) => {
    const hasPermission = await requestCameraPermission();
    console.log('Opening QR scanner...',hasPermission);
    if (hasPermission) {
      // Open the scanner here
      navigation.navigate('QRCodeScanner', {data: data})
      console.log('Opening QR scanner...',hasPermission);
      // Your code to open the scanner goes here
    } else {
    // Alert.alert('Permission Denied', 'Camera access is required to scan QR codes.');
    }
  };


 

const App1 =async()=>{


let res = await axios({
  method: 'get',
 
  url: 'http://45.79.123.102:49002/api/chouviharevent/scan/chouvihar/event/65f06399e2201e2308a1c92a/66b079c22f477781f7092eaa/1',
  headers: { 
    'Cookie': 'serv_app_zaveri=s%3AKKNe8SpAQcT8e7VgK9ndvWFBr_iovTaZ.NMBRNybn1JeuyY2jtrZB%2By2A0%2BctimOGHdZgbbBRGhc'
  }
})



  console.log('wgwsfsdfsd',JSON.stringify(res.data));

}


  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('./assets/background.png')}>
      <View
        style={{
          height: 50,
          width: '100%',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          backgroundColor: '#000000',
        }}></View>
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <TouchableOpacity
          onPress={() =>
              handleScan(true)
              // navigation.navigate('QRCodeScanner', {data: true})
          }
          style={{
            backgroundColor: '#FCDA64',

            paddingVertical: 10,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
            paddingHorizontal: '3%',
            width: '67%',
          }}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 16,
            }}>
            Scan QR for Events
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={() => navigation.navigate('QRCodeScanner', {data: true})}
          style={{
            backgroundColor: '#FCDA64',

            paddingVertical: 10,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
            paddingHorizontal: '3%',
            width: '67%',
          }}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 16,
            }}>
            Scan Membership QR
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() =>handleScan(false)}
          style={{
            backgroundColor: '#FCDA64',

            paddingVertical: 10,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
            paddingHorizontal: '3%',
            width: '67%',
          }}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 16,
            }}>
            Scan Chauvihar Event QR
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={() => {
            Alert.alert('Confirmation', 'Are you sure you want to sign out', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                  AsyncStorage.setItem(Storage.user_token, '');
                  navigation.replace('Login');
                },
              },
            ]);
          }}
          // onPress={()=>navigation.navigate('QRCodeScanner')}
          style={{
            backgroundColor: '#FCDA64',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
            width: '47%',
          }}>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 16,
            }}>
            Sign out
          </Text>
        </TouchableOpacity> */}
      </View>
      <StatusBar backgroundColor={'#000'} />
    </ImageBackground>
  );
};
export default LandingPage;
