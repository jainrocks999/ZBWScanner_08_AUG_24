import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Arrow from '../src/assets/HeaderArrow.svg';
import {heightPercent, widthPercent} from './components/responsive';
import FastImage from 'react-native-fast-image';
import isIos from './components/isIos';

const Details = ({route}) => {
  const navigation = useNavigation();
  const {data} = route?.params || {};

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('./assets/background.png')}>
        <StatusBar backgroundColor={'#000'} barStyle="light-content" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Arrow />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {data?.isExhibitor ? 'Exhibitor Details' : 'Visitor Details'}
          </Text>
          <View style={{width: 24}} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Profile Image */}
          {data?.isExhibitor ? (
            <View style={styles.profileImageContainer}>
              <FastImage
                resizeMode={FastImage.resizeMode.cover}
                source={
                  data?.profile_image
                    ? {uri: data?.profile_image}
                    : require('./assets/no_image.jpg')
                }
                style={styles.profileImage}
              />
            </View>
          ) : null}

          {/* Member Info Card */}
          <View style={styles.infoCard}>
            <Text
              style={[
                styles.label,
                {
                  alignSelf: 'center',
                  marginTop: -2,
                  paddingBottom: 8,
                  textTransform: 'capitalize',
                },
              ]}>
              {/* {data?.exhibitorion_package} */}
              {data?.company_name}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FastImage
                 resizeMode={FastImage.resizeMode.cover}
                source={
                  data?.isExhibitor && data?.logo
                    ? {uri: data.logo}
                    : !data?.isExhibitor && data?.profile_image
                    ? {uri: data.profile_image}
                    : require('./assets/no_image.jpg')
                }
                style={styles.profileImage1}
              />

              <Text style={[styles.label, {marginLeft: 14}]}>{data?.name}</Text>
            </View>
            <View style={{marginLeft: '2%'}}>
              {data?.exhibitorion_package ? (
                <>
                  <Text style={[styles.label, {marginTop: 15}]}>Package</Text>
                  <Text style={styles.value}>
                    {data?.exhibitorion_package || 'N/A'}
                  </Text>
                </>
              ) : null}

              {/* <Text style={styles.value}>{data?.company_name || 'N/A'}</Text> */}
              {/* <Text style={styles.label}>Exhibition package</Text>
            <Text style={styles.value}>
              {data?.exhibitorion_package || 'N/A'}
            </Text> */}
              {data?.personal_contact_nu ? (
                <>
                  <Text style={styles.label}>Contact Number</Text>
                  <Text style={styles.value}>
                    {data?.personal_contact_nu || 'N/A'}
                  </Text>
                </>
              ) : null}
              {data?.address ? (
                <>
                  <Text style={styles.label}>Address</Text>
                  <Text style={styles.value}>{data?.address || 'N/A'}</Text>
                </>
              ) : null}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Details;
const styles = StyleSheet.create({
  header: {
    height: heightPercent(8),
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: widthPercent(4),
  },
  headerTitle: {
    fontSize: 18,
    color: '#FCDA64',
    fontFamily: 'Montserrat-Bold',
  },
  scrollContainer: {
    padding: widthPercent(5),
    alignItems: 'center',
  },
  profileImageContainer: {
    // borderWidth: 2,
    borderColor: '#FCDA64',
    borderRadius: heightPercent(8),
    padding: 5,
    marginVertical: heightPercent(3),
    // backgroundColor: '#fff',
  },
  profileImage: {
    width: heightPercent(16),
    height: heightPercent(16),
    borderRadius: heightPercent(8),
  },
  profileImage1: {
    width: 80,
    height: 80,
    borderRadius: 24,
    resizeMode: 'contain',
    // 9855598555
  },
  infoCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: widthPercent(4),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    // borderWidth: 0.4,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: '#000000',
    marginTop: heightPercent(1),
  },
  value: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
    marginTop: 0,
  },
});
