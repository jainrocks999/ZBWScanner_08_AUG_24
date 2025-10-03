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
import Storage from '../src/components/LocalStorage';
import requestCameraPermission from '../src/Permission';
import axios from 'axios';
const LandingPage = () => {
  const navigation = useNavigation();

  const handleScan = async data => {
    const hasPermission = await requestCameraPermission();
    console.log('Opening QR scanner...', hasPermission);
    if (hasPermission) {
      navigation.navigate('QRCodeScanner', {data: data});
      console.log('Opening QR scanner...', hasPermission);
      // Your code to open the scanner goes here
    } else {
      // Alert.alert('Permission Denied', 'Camera access is required to scan QR codes.');
    }
  };

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
          onPress={() => handleScan('cauvihar')}
          style={{
            backgroundColor: '#FCDA64',

            paddingVertical: 10,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: -15,
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
        {false ? (
          <TouchableOpacity
            onPress={() => handleScan('vip')}
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
              Scan VIP/Guest QR
            </Text>
          </TouchableOpacity>
        ) : null}
        {false ? (
          <TouchableOpacity
            onPress={() => handleScan('dinner')}
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
              Scan Dinner Pass QR
            </Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          onPress={() => handleScan('genral')}
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
            General Scanner
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleScan('admin')}
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
            Admin Scanner
          </Text>
        </TouchableOpacity>
      </View>

      <StatusBar backgroundColor={'#000'} />
    </ImageBackground>
  );
};
export default LandingPage;
