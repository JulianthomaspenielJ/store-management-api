import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SliderBox} from 'react-native-image-slider-box';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Url from '../envirolments/envirolments-prod';

const Carousel = props => {
  useEffect(() => {
    console.log(props);
  }, []);
  // const retrieveData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('user_id');
  //     const token = await AsyncStorage.getItem('token');

  //     if (value !== null) {
  //       console.log('ssss' + value, '==token==', token);

  //       getCarouselData(value, token);
  //     }
  //   } catch (error) {
  //     console.error('Error retrieving data:', error);
  //   }
  // };

  const images = [
    'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800',
  ];
  return (
    <View>
      {props.loading ? (
        <ActivityIndicator
          size="large"
          color="#008080"
          style={styles.loadingDidign}
        />
      ) : (
        <SliderBox
          images={props.data}
          autoplay
          circleLoop
          dotColor="#13274F"
          inactiveDotColor="#90A4AE"
          ImageComponentStyle={{
            borderRadius: 6,
            width: '94%',
            marginTop: 10,
          }}
        />
      )}
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  loadingDidign: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: '20%',
  },
});
