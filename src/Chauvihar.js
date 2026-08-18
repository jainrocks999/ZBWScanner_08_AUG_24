import React from 'react';
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
import Arrow from './assets/HeaderArrow.svg';
import {useNavigation} from '@react-navigation/native';
import {heightPercent, widthPrecent} from './components/responsive';
import isIos from './components/isIos';
import FoodClocheGold from './assets/ChauviharEvent/food-cloche-gold.svg';
import FoodClocheBlue from './assets/ChauviharEvent/food-cloche-blue.svg';

const FLOOR1_THEME = {
  key: 'floor1',
  borderColor: '#C9A227',
  backgroundColor: '#FFF5E6',
  textColor: '#9A7B1A',
  FoodIcon: FoodClocheGold,
};

const FLOOR2_THEME = {
  key: 'floor2',
  borderColor: '#1E5A8E',
  backgroundColor: '#EFF6FF',
  textColor: '#1E5A8E',
  FoodIcon: FoodClocheBlue,
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

const getTheme = data => {
  if (data?.floor2 === true) {
    return FLOOR2_THEME;
  }
  if (data?.floor1 === true) {
    return FLOOR1_THEME;
  }
  return FLOOR1_THEME;
};

const getMembershipLabel = data => {
  if (data?.membershipId === '' || data?.membershipId == null) {
    return 'Not a Member';
  }
  return data.membershipId;
};

const renderFoodInfo = data => {
  const theme = getTheme(data);
  const FoodIcon = theme.FoodIcon;
  const isFloor2 = theme.key === 'floor2';
  const infoPrefix = isFloor2
    ? data?.floor2_text_arr || 'Food arrangement on 2nd floor'
    : data?.floor1_text_arr || 'Food arrangement on 1st floor';
  const infoSuffix = isFloor2
    ? data?.floor2_text || 'Other Industries & Non-Primary Members / Guests'
    : data?.floor1_text || 'Gold Industry & Primary Member';
  const floorMatch = infoPrefix.match(/(1st floor|2nd floor)/i);

  return (
    <View
      style={[
        styles.infoBox,
        {
          borderColor: theme.borderColor,
          backgroundColor: theme.backgroundColor,
        },
      ]}>
      <FoodIcon width={heightPercent(isIos ? 5.5 : 6)} height={heightPercent(isIos ? 5.5 : 6)} />
      <View style={styles.infoTextWrap}>
        <Text style={[styles.infoText, {color: theme.textColor}]}>
          {floorMatch ? (
            <>
              {infoPrefix.split(floorMatch[0])[0]}
              <Text style={styles.infoTextBold}>{floorMatch[0]}</Text>
              {infoPrefix.split(floorMatch[0])[1]}
            </>
          ) : (
            infoPrefix
          )}
          {' for '}
          <Text style={styles.infoTextBold}>{infoSuffix}</Text>
        </Text>
      </View>
    </View>
  );
};

const renderRow = ({item, index, foodsLength}) => (
  <View
    style={[
      styles.row,
      {borderBottomWidth: index === foodsLength - 1 ? 0.5 : 0},
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
    <View style={[styles.cell, styles.headerCell]}>
      <Text style={styles.headerText}>Date</Text>
    </View>
    <View style={[styles.cell, styles.headerCell]}>
      <Text style={styles.headerText}> </Text>
    </View>
    <View style={[styles.cell, styles.headerCell]}>
      <Text style={styles.headerText}>Slots</Text>
    </View>
  </View>
);

const Chauvihar = ({route}) => {
  const navigation = useNavigation();
  const data = route?.params?.data || {};
  const foods = Array.isArray(data?.foods) ? data.foods : [];

  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('./assets/background.png')}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Arrow />
      </TouchableOpacity>
      <ScrollView
        scrollEnabled={true}
        contentContainerStyle={{paddingBottom: 20}}>
        <View style={styles.topHeader}>
          <View>
            <Image
              resizeMode="cover"
              style={styles.icon}
              source={require('./assets/jinendra/jainism2.png')}
            />
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
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.avatarWrap}>
            <Image
              resizeMode="cover"
              source={{uri: data?.selfie}}
              style={styles.image}
            />
          </View>
          <Text style={styles.title}>{data.eventName}</Text>
          <Text style={styles.subtitle}>User: {data?.userName}</Text>
          <Text style={styles.subtitle}>
            Membership ID: {getMembershipLabel(data)}
          </Text>
          <Text style={styles.subtitle}>Phone: {data?.phone}</Text>

          {renderFoodInfo(data)}

          <Text style={[styles.subtitle, styles.foodsTitle]}>Foods:</Text>
          <View>
            {renderHeader()}
            <FlatList
              data={foods}
              scrollEnabled={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) =>
                renderRow({item, index, foodsLength: foods.length})
              }
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backButton: {
    padding: 10,
    position: 'absolute',
    left: 0,
    top: 10,
    zIndex: 5,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    alignSelf: 'center',
    height: heightPercent(17),
  },
  container: {
    flex: 1,
    padding: 0,
    marginTop: heightPercent(isIos ? 1 : 3),
  },
  icon: {
    height: heightPercent(isIos ? 13 : 14),
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
    zIndex: 10,
    top: heightPercent(1),
  },
  mainImage: {
    alignSelf: 'center',
    height: '100%',
    width: '100%',
  },
  avatarWrap: {
    width: heightPercent(13),
    alignSelf: 'center',
  },
  image: {
    width: heightPercent(isIos ? 12 : 13),
    height: heightPercent(isIos ? 12 : 13),
    borderRadius: heightPercent(6.5),
    alignSelf: 'center',
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
  infoBox: {
    width: '92%',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: heightPercent(isIos ? 1.2 : 1.4),
    paddingHorizontal: widthPrecent(2.5),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: heightPercent(1.5),
    marginBottom: heightPercent(1.5),
  },
  infoTextWrap: {
    flex: 1,
    marginLeft: widthPrecent(2),
  },
  infoText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: heightPercent(isIos ? 1.7 : 1.8),
    lineHeight: heightPercent(isIos ? 2.4 : 2.6),
  },
  infoTextBold: {
    fontFamily: 'Montserrat-Bold',
    fontSize: heightPercent(isIos ? 1.7 : 1.8),
  },
  header: {
    flexDirection: 'row',
    borderColor: '#000',
    borderTopWidth: 1.2,
    borderBottomWidth: 0.5,
  },
  headerCell: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
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
});

export default Chauvihar;
