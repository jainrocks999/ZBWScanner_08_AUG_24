import React, {Fragment, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  LogBox,
  Button,
  Platform,
  
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import RootApp from './navigation';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = () => {


  return (
    <Fragment>
      {/* <SafeAreaView style={{backgroundColor:Platform.OS=='ios'?'#032e63':'#fff'}}/> */}
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Platform.OS == 'ios' ? "black" : 'black',
        }}>
          <RootApp />
        {/* <StatusBar /> */}
      </SafeAreaView>
    </Fragment>
  );
};

export default App;

