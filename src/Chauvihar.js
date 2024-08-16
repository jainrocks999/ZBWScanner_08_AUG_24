import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Arrow from '../src/assets/HeaderArrow.svg';
import {useNavigation} from '@react-navigation/native';
import {heightPercent, widthPrecent} from './components/responsive';
import isIos from './components/isIos';
const data = {
  userName: 'Raju',
  eventName: 'Test Event',
  membershipId: 'ZBW-243',
  selfie:
    'https://zbwa-bucket.in-maa-1.linodeobjects.com/media/placeholder_11~3e98.png',
  foods: [
    {e_date: '31-08-2024', selectedOption: '1', selectedTime: ''},
    {e_date: '01-09-2024', selectedOption: '2', selectedTime: 'Evening'},
    {e_date: '02-09-2024', selectedOption: '3', selectedTime: 'Morning'},
    {e_date: '03-09-2024', selectedOption: '3', selectedTime: 'Both'},
    {e_date: '04-09-2024', selectedOption: '', selectedTime: ''},
    {e_date: '05-09-2024', selectedOption: '', selectedTime: ''},
    {e_date: '06-09-2024', selectedOption: '', selectedTime: ''},
  ],
  phone: '9874563210',
};

const getOptionLabel = option => {
  switch (option) {
    case '1':
      return 'Ekasana';
    case '2':
      return 'Biyasana';
    case '3':
      return 'Chauvihar';
    default:
      return '-';
  }
};

const renderRow = ({item, index}) => (
  <View
    style={[
      styles.row,
      {borderBottomWidth: index === data.foods.length - 1 ? 0.5 : 0},
    ]}>
    <View style={styles.cell}>
      <Text style={styles.cellText}>{item.e_date}</Text>
    </View>
    <View style={styles.cell}>
      <Text style={styles.cellText}>{getOptionLabel(item.selectedOption)}</Text>
    </View>
    <View style={styles.cell}>
      <Text style={styles.cellText}>
        {item?.selectedTime === '' ? '-' : item?.selectedTime}
      </Text>
    </View>
  </View>
);

const renderHeader = () => (
  <View style={styles.header}>
    <View style={[styles.cell, {borderTopWidth: 0, borderBottomWidth: 0}]}>
      <Text style={styles.headerText}>Date</Text>
    </View>
    <View style={[styles.cell, {borderTopWidth: 0, borderBottomWidth: 0}]}>
      <Text style={styles.headerText}> </Text>
    </View>
    <View style={[styles.cell, {borderTopWidth: 0, borderBottomWidth: 0}]}>
      <Text style={styles.headerText}>Slots</Text>
    </View>
  </View>
);

const App = ({route}) => {
  const navigation = useNavigation();
  const [, setData] = useState([]);
  const {data} = route?.params;
  console.log(JSON.stringify(data));

  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = () => {
    return;
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: url,
      headers: {},
    };

    axios(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        setData(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('./assets/background.png')}>
      <TouchableOpacity
        style={{
          padding: 10,
          position: 'absolute',
          left: 0,
          top: 10,
          zIndex: 5,
        }}
        onPress={() => navigation.goBack()}>
        <Arrow />
      </TouchableOpacity>
      <ScrollView
        scrollEnabled={true}
        contentContainerStyle={{paddingBottom: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '95%',
            alignSelf: 'center',
            // marginTop: -2,
            // borderWidth: 1,
            height: heightPercent(17),
            // borderWidth: 1,
          }}>
          <View>
            <Image
              resizeMode="cover"
              style={styles.icon}
              source={require('./assets/jinendra/jainism2.png')}
            />

            {/* <Text style={styles.titleText}>जय जिनेन्द्र</Text> */}
          </View>
          <View style={{width: '40%'}}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.mainImage}
                resizeMode="stretch"
                source={require('./assets/jinendra/Logo2.png')}
              />
            </View>
            <Text style={styles.titleText}>|| जय जिनेन्द्र ||</Text>
          </View>
          <View>
            <Image
              resizeMode="contain"
              style={styles.icon}
              source={require('./assets/jinendra/jainism2.png')}
            />
            {/*  */}
          </View>
        </View>

        <View style={styles.container}>
          <View
            style={{
              // borderWidth: 1,
              width: heightPercent(13),
              alignSelf: 'center',
            }}>
            <Image
              resizeMode="cover"
              source={{uri: data?.selfie}}
              // source={require("./this.jpeg")}
              style={styles.image}
            />
          </View>
          <Text style={styles.title}>{data.eventName}</Text>
          <Text style={styles.subtitle}>User: {data?.userName}</Text>
          <Text style={styles.subtitle}>
            Membership ID:{' '}
            {data.membershipId === '' ? 'Not a Member' : data.membershipId}
          </Text>
          <Text style={styles.subtitle}>Phone: {data?.phone}</Text>
          <Text style={[styles.subtitle, styles.foodsTitle]}>Foods:</Text>
          <View>
            {renderHeader()}
            <FlatList
              data={data.foods}
              scrollEnabled={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderRow}
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    marginTop: 10,
    marginLeft: 20,
    top: 10,
  },
  container: {
    flex: 1,
    padding: 0,
    marginTop: heightPercent(isIos ? 1 : 3),
  },
  icon: {
    height: heightPercent(isIos ? 13 : 14), // 95, //heightPercent(15),
    width: heightPercent(isIos ? 13 : 14),
    alignSelf: 'center',
  },
  titleText: {
    alignSelf: 'center',
    fontFamily: 'Montserrat-Medium',
    color: '#00008B',
    fontSize: heightPercent(isIos ? 1.9 : 2),
    marginTop: heightPercent(-0.8),
    marginLeft: widthPrecent(-1.3),
  },
  imageContainer: {
    marginTop: heightPercent(-3),
    height: heightPercent(isIos ? 17 : 18),
    width: '100%',
    alignSelf: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    // position: 'absolute',
    zIndex: 10,
    top: heightPercent(1),
    // borderWidth: 1,
  },
  mainImage: {
    alignSelf: 'center',
    height: '100%',
    width: '100%',
  },
  image: {
    width: heightPercent(isIos ? 12 : 13),
    height: heightPercent(isIos ? 12 : 13),
    borderRadius: heightPercent(6.5),
    alignSelf: 'center',
    // marginBottom: 20,
    marginTop: heightPercent(1),
  },
  title: {
    fontSize: heightPercent(isIos ? 2.2 : 2.3),
    textAlign: 'center',
    color: 'black',
    marginBottom: 5,
    fontFamily: 'Montserrat-Bold',
    marginTop: 5,
  },
  subtitle: {
    fontSize: heightPercent(isIos ? 1.9 : 2),
    textAlign: 'center',
    marginBottom: 5,
    fontFamily: 'Montserrat-medium',
    color: 'black',
  },
  foodsTitle: {
    alignSelf: 'flex-start',
    fontSize: heightPercent(isIos ? 1.9 : 2),
    marginLeft: widthPrecent(2.2),
  },
  header: {
    flexDirection: 'row',
    // borderWidth: 1,
    borderColor: '#000',
    borderTopWidth: 1.2,
    borderBottomWidth: 0.5,
  },
  headerCell: {
    flex: 1,
    padding: heightPercent(isIos ? 1.2 : 1.3),
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1.2,
    borderColor: '#000',
  },
  headerText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: heightPercent(isIos ? 1.9 : 2),
    color: 'black',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#000',
    padding: heightPercent(isIos ? 1.2 : 1.3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: heightPercent(isIos ? 1.9 : 2),
  },
  touch1: {
    height: 43,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCDA64',
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 10,
  },
  text: {
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
    fontSize: 14,
  },
});

export default App;
