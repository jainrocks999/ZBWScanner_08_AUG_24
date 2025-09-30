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

const DinnerPassInfo = ({route}) => {
  const navigation = useNavigation();
  const {dinnerData} = route?.params || {};
  const data = dinnerData?.data;
  console.log('this is dat', data);

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
          <Text style={styles.headerTitle}>{'Dinner Pass'}</Text>
          <View style={{width: 24}} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {data?.member_profile ? (
            <View style={styles.profileImageContainer}>
              <FastImage
                resizeMode={FastImage.resizeMode.cover}
                source={
                  data?.member_profile
                    ? {uri: data?.member_profile}
                    : require('./assets/no_image.jpg')
                }
                style={styles.profileImage}
              />
            </View>
          ) : null}

          <View style={styles.infoCard}>
            <View style={{marginLeft: '2%'}}>
              <Text style={[styles.label, {marginTop: 15}]}>Name</Text>
              <Text style={styles.value}>{data?.name || 'N/A'}</Text>

              {data?.designation ? (
                <>
                  <Text style={styles.label}>Designation</Text>
                  <Text style={styles.value}>{data?.designation || 'N/A'}</Text>
                </>
              ) : null}

              <Text style={styles.label}>Exhibitor Name</Text>
              <Text style={styles.value}>
                {data?.owner_exhibitor_id?.name || 'N/A'}
              </Text>
              <Text style={styles.label}>Exhibitor Company Name</Text>
              <Text style={styles.value}>
                {data?.owner_exhibitor_id?.company_name || 'N/A'}
              </Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default DinnerPassInfo;
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
    paddingHorizontal: widthPercent(4),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    paddingBottom: widthPercent(6),
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
