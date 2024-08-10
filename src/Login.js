import React,{useState} from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView,StyleSheet,StatusBar } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ForwardArrow from "../src/assets/ForwardArrow.svg";
import Arrow from "../src/assets/Arrow.svg";
import Eye from "../src/assets/eye.svg"
import Eye1 from "../src/assets/eye1.svg"
import { useNavigation } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient';
import axios from "axios";
import Toast from "react-native-simple-toast";
import Loader from "../src/components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../src/components/LocalStorage";


const Login = () => {

  const navigation = useNavigation()
  const [mobile,setMobile]=useState('')
  const [password,setPassword]=useState('')
  const [loader,setLoader]=useState(false)
  const [visible,setVisible]=useState(true)

  const userLogin =()=>{
    if(mobile==''){
      Toast.show('Please enter your phone number')
    }
    else if(mobile.length<10){
      Toast.show('Please enter 10 digit phone number')
    }
    else if(password==''){
      Toast.show('Please enter your password')
    }
    else{
      setLoader(true)
    axios({
      method: 'post',
      url: 'https://zbwa.org/api/user/login',
      data: {
        "mobile": mobile,
        "action": "password",
        "password": password
      }
    })
    .then(function(response) {
      if(response.data.code=='200'){
        setLoader(false)
        console.log('this is resposs',response.data);
        Toast.show(response.data.message )
        AsyncStorage.setItem(Storage.user_id,response.data.data._id)
        AsyncStorage.setItem(Storage.username,response.data.data.name)
        AsyncStorage.setItem(Storage.user_token,response.data.data.token)
        navigation.replace('Home')
      }
      else{
        setLoader(false)
        Toast.show(response.data.message )
      }
    })
    .catch(function(error) {
      setLoader(false)
      console.log("error", error)
      Toast.show(error.response.data.message)
    })
   }
  }



  return (
    <LinearGradient colors={['#FFFBD3', '#FFFFFF', '#FFF8BA']} style={{ flex: 1 }}>
      {loader?<Loader/>:null}
      <ScrollView contentContainerStyle={{flexGrow:1,}}>
      <KeyboardAwareScrollView
       extraScrollHeight={Platform.OS=="android"?-200:100}
       enableOnAndroid={true}
       keyboardShouldPersistTaps="handled"
       behavior={Platform.OS === "ios" ? "padding" : "height"}
       contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{}}>
          <View style={styles.main}>
            <Image style={styles.logo} source={require('../src/assets/Zbwa.png')} />
          </View>
          <View style={[styles.container,{marginTop:30}]}>
            <View style={styles.yellow}>
              <View style={styles.view}>
                <View style={{ flexDirection: 'row' }}>
                 
                  <Text style={styles.free}>Login with mPIN</Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => navigation.navigate('LoginWithmPin')}
                  style={styles.arrowContainer}>
                  <ForwardArrow />
                </TouchableOpacity>
              </View>
              {/* <View style={{height:60}}/> */}
              <View style={{ alignItems: 'center' }}>
                <View style={styles.black}>
                  <View style={{ paddingHorizontal: 40, marginTop: 10 }}>
                    <Text style={styles.already}>Already Registered user?</Text>
                    <Text style={styles.login}>Login</Text>
                    <View style={styles.country}>
                      <Text style={styles.ninety}>+91</Text>
                      <TextInput style={styles.input}
                        placeholder="Phone Number"
                        placeholderTextColor={'#FFFFFF'}
                        value={mobile}
                        onChangeText={(val)=>setMobile(val)}
                        keyboardType="number-pad"
                        maxLength={10}
                      />
                    </View>
                    <View style={styles.inputContainer}>

                      <TextInput style={styles.pass}
                        placeholder="Password"
                        placeholderTextColor={'#FFFFFF'}
                        keyboardType="default"
                        value={password}
                        onChangeText={(val)=>setPassword(val)}
                        secureTextEntry={visible}
                      />
                     {visible? 
                     <TouchableOpacity style={{padding:6}} onPress={()=>setVisible(!visible)}>
                      <Eye/>
                      </TouchableOpacity>
                      :<TouchableOpacity style={{padding:6}} onPress={()=>setVisible(!visible)}>
                        <Eye1/>
                      </TouchableOpacity>
                      }
                    </View>
                    {/* <View style={{ marginTop: 10 }}> */}
                      {/* <Text
                        onPress={() => navigation.navigate('Forgot')}
                        style={styles.forgot}>Forgot Password?</Text> */}
                      {/* <Text
                        onPress={() => navigation.navigate('Pin')}
                        style={styles.mpin}>Login with mPIN</Text> */}
                    {/* </View> */}
                    <View style={{height:43}}/>
                  </View>
                  <View style={{ marginTop: 30, alignItems: 'flex-end' }}>
                    <TouchableOpacity
                      onPress={() => 
                        // navigation.replace('Home')
                        userLogin()
                      }
                      style={styles.button}>
                      <Text style={styles.text}>Login</Text>
                      <Arrow />
                    </TouchableOpacity>
                  </View>

                </View>
              </View>
            </View>
          </View>
          </View>
          <View style={{height:140}}/>
      </KeyboardAwareScrollView>
      </ScrollView>
      <StatusBar
        backgroundColor={'#000'}
        />
    </LinearGradient>
  )
}
export default Login;
const styles=StyleSheet.create({
    main:{ 
      alignItems: 'center', 
      justifyContent: 'center', 
      marginTop: 52 
    },
    logo:{
      height:315,
      width:315
    },
    container:{ 
      alignItems: 'center', 
      justifyContent: 'center', 
      marginTop: 0,
    },
    yellow:{ 
      height: 250, 
      width: '90%', 
      backgroundColor: '#FCDA64', 
      borderRadius: 40 
    },
    view:{
      paddingHorizontal: 40,
      paddingVertical: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    signup:{ 
      fontFamily: 'Montserrat-Bold', 
      fontSize: 18, 
      color: '#000' 
    },
    free:{ 
      fontFamily: 'Montserrat-Bold', 
      fontSize: 18, 
      color: '#fff' 
    },
    arrowContainer:{
      width: 42,
      height: 38,
      backgroundColor: '#000000',
      borderTopLeftRadius: 40,
      borderTopRightRadius: 80,
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 80,
      alignItems: 'center',
      justifyContent: 'center'
    },
    black:{
      backgroundColor: '#000000',
      width: '94%',
      height: 250,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 80,
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 80,
    },
    already:{ 
      color: '#FCDA64', 
      fontSize: 10, 
      fontFamily: 'Montserrat-Regular' 
    },
    login:{ 
      fontFamily: 'Montserrat-Bold', 
      color: '#fff', 
      fontSize: 18, 
      marginTop: 2 
    },
    country:{
      borderBottomWidth: 1,
      borderColor: '#FFFFFF',
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%',
      marginTop: 20,
      height: 30
    },
    ninety:{
      color: '#FFFFFF',
      fontSize: 12,
      fontFamily: 'Montserrat-Regular'
    },
    input:{
      color: '#FFFFFF',
      height: 35,
      borderColor: '#fff',
      marginTop: 4,
      width: '90%',
      marginLeft: 10,
      fontSize: 12,
      fontFamily: 'Montserrat-Regular'
    },
    inputContainer:{
      borderBottomWidth: 1,
      borderColor: '#FFFFFF',
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%',
      marginTop: 15,
      height: 30
    },
    pass:{
      color: '#FFFFFF',
      height: 35,
      borderColor: '#fff',
      marginTop: 4,
      width: '90%',
      fontSize: 12,
      fontFamily: 'Montserrat-Regular'
    },
    forgot:{ 
      color: '#FCDA64', 
      fontSize: 10, 
      fontFamily: 'Montserrat-Regular' 
    },
    mpin:{ 
      color: '#FCDA64', 
      fontSize: 10, 
      fontFamily: 'Montserrat-Regular', 
      marginTop: 10 
    },
    button:{
      height: 65,
      width: 130,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FCDA64',
      flexDirection: 'row',
    },
    text:{ 
      color: '#000000', 
      fontSize: 18, 
      fontFamily: 'Montserrat-Bold',
      marginRight: 14 
    }
  });
  