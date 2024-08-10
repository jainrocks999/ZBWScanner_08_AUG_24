import React, {useEffect} from 'react';
import {View, Text, Image, StatusBar, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    initial();
  }, []);

  const initial = async () => {
    // let Token = await AsyncStorage.getItem('user_token');
    if (true) {
      setTimeout(
        () =>
          //   navigation.replace('Login')
          navigation.reset({
            index: 0,
            routes: [{name: 'LandingPage'}],
          }),
        2000,
      );

      //   setTimeout(() => {
      //     navigation.replace('FirstPage')
      //   }, 2000);
    } else {
      setTimeout(
        () =>
          //   navigation.replace('Home')
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          }),
        2000,
      );
    }
  };
  return (
    <LinearGradient
      colors={['#FFFBD3', '#FFFFFF', '#FFF8BA']}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        style={{width: '99%', height: 256}}
        source={require('../src/assets/ZBW_black_logo-transformed.png')}
      />
      <StatusBar backgroundColor={'#000'} />
    </LinearGradient>
  );
};
export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFF8BA',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor:'#56bab5'
  },
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
    // paddingVertical:70,
    // marginTop:250,
  },
  image: {
    // height:90,width:'100%',
  },
});
