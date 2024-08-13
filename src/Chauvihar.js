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
    <View style={styles.headerCell}>
      <Text style={styles.headerText}>Date</Text>
    </View>
    <View style={styles.headerCell}>
      <Text style={styles.headerText}> </Text>
    </View>
    <View style={styles.headerCell}>
      <Text style={styles.headerText}>Slots</Text>
    </View>
  </View>
);

const App = ({route}) => {
  const navigation = useNavigation();
  const [, setData] = useState([]);
  const {data} = route?.params;

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
        scrollEnabled={false}
        contentContainerStyle={{paddingBottom: 30}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '95%',
            alignSelf: 'center',
            marginTop: -2,
          }}>
          <View>
            <Image
              resizeMode="contain"
              style={styles.icon}
              source={require('./assets/jinendra/jainism2.png')}
            />

            {/* <Text style={styles.titleText}>जय जिनेन्द्र</Text> */}
          </View>

          <View>
            <Image
              resizeMode="contain"
              style={styles.icon}
              source={require('./assets/jinendra/jainism2.png')}
            />
            {/* <Text style={styles.titleText}>जय जिनेन्द्र</Text> */}
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.mainImage}
            resizeMode="contain"
            source={require('./assets/jinendra/Images.png')}
          />
        </View>

        <View style={styles.container}>
          <Image
            resizeMethod="cover"
            source={{uri: data?.selfie}}
            style={styles.image}
          />
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
    marginTop: '5%',
  },
  icon: {
    height: 95,
    width: 95,
    // marginTop: 10,
    alignSelf: 'center',
  },
  titleText: {
    alignSelf: 'center',
    fontFamily: 'Montserrat-Bold',
    color: 'black',
    fontSize: 10,
  },
  imageContainer: {
    marginTop: -30,
    height: '80%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    position: 'absolute',
  },
  mainImage: {
    alignSelf: 'center',
    height: '20%',
    width: '100%',
    marginTop: 30,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 60,
    alignSelf: 'center',
    // marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    marginBottom: 5,
    fontFamily: 'Montserrat-Bold',
    marginTop: 5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
    fontFamily: 'Montserrat-medium',
    color: 'black',
  },
  foodsTitle: {
    alignSelf: 'flex-start',
    marginTop: 0,
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#000',
  },
  headerCell: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#000',
  },
  headerText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
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
