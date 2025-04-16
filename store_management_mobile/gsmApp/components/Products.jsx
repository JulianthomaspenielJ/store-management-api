import React, {useEffect, useState} from 'react';
import {
  Text,
  FlatList,
  Image,
  View,
  Button,
  Linking,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Alert,
  Share,
  RefreshControl,
} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Url from '../envirolments/envirolments-prod';
export default function Products() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshLoading, setRefreshLoading] = useState(false);

  const [userId, setUserId] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    retrieveData();
  }, []);
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_id');
      const token = await AsyncStorage.getItem('token');
      if (value !== null) {
        console.log('ssss' + value + ' token=' + token);
        setUserId(value);
      } else {
        navigation.navigate('Profile');
      }
      if (token != '') {
        getProducts(token);
      } else {
        navigation.navigate('Profile');
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };
  const addCart = async itemNumber => {
    if (!userId) {
      return Alert.alert('Please Sign');
    }
    try {
      const apiUrl = Url.url + '/Carts/Create';

      // Make the POST request
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers here
        },
        body: JSON.stringify({
          itemNumber: itemNumber,
          userId: userId,
        }),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        // Parse the response JSON if needed
        const responseData = await response.json();
        console.log('API response:', responseData);
        if (response.status == 200) {
          Alert.alert(responseData);
        }
      } else {
        console.error('API request failed:', response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getProducts = async token => {
    setIsLoading(true);
    try {
      const apiUrl = Url.url + '/product/list';

      // Make the POST request
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
          // Add any additional headers here
        },
        body: JSON.stringify({pageIndex: 0, dataLength: 50}),
      });

      // Check if the request was successful (status code 2xx)

      // Parse the response JSON if needed
      const responseData = await response.json();
      console.log('API response:', JSON.stringify(responseData));
      setProduct(responseData.result.productData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const getRefreshProducts = async () => {
    setRefreshLoading(true);
    try {
      const apiUrl = Url.url + '/OfferProduct/All';

      // Make the POST request
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers here
        },
        body: JSON.stringify({}),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        // Parse the response JSON if needed
        const responseData = await response.json();
        // console.log('API response:',JSON.stringify(responseData.productData.result) );
        setProduct(responseData);
        setRefreshLoading(false);
      } else {
        console.error('API request failed:', response.status);
        setRefreshLoading(false);
      }
    } catch (error) {
      console.log(error);
      setRefreshLoading(false);
    }
  };
  const shareSocialMedia = async link => {
    try {
      const result = await Share.share({
        message: link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const searchNavigayion = () => {
    navigation.navigate('Search', {apiEndPoinr: 'OfferProduct'});
  };

  return (
    <View>
      <View style={styles.headingStyle}>
        <Text style={styles.logo}>GSM OFFERS</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 90,
          }}>
          {/* <Text style={styles.pageHeadingText}>Offer Products</Text> */}

          {/* <Icon name={'refresh'} size={22} color={'#fff'} onPress={() =>getProducts()}/> */}
          <Icon
            name={'search'}
            size={22}
            color={'#fff'}
            onPress={() => searchNavigayion()}
          />
          <Icon name={'notifications-none'} size={22} color={'#fff'} />
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshLoading}
            onRefresh={getRefreshProducts}></RefreshControl>
        }>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#008080"
            style={styles.loadingDidign}
          />
        ) : (
          <View>
            {/* {product.length >0 ? */}
            <FlatList
              data={product}
              // keyExtractor={({id},index)=>id}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View
                  style={{flexDirection: 'row', padding: 10, color: 'black'}}>
                  <View style={{width: '40%', height: 120, padding: 5}}>
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'stretch',
                      }}
                      source={{
                        uri:
                          Url.url +
                          '/images/' +
                          item.category_name +
                          '/' +
                          item.code +
                          '/' +
                          item.img_url +
                          '.jpg',
                      }}
                    />

                    {/* {{'https'+'://testsitegsm.000webhostapp.com/store_management_api/api/images/'+item.category_name+'/'+item.code+'/'+item.img_url+'.jpg'}} */}
                  </View>

                  <View style={{padding: 5, width: '60%', color: 'black'}}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flex: 1}}>
                        <Text style={{color: 'black'}}>Discount :10%</Text>
                        <Text style={{color: 'black'}}>
                          Price :₹{item.price}
                        </Text>
                        <Text>
                          <Text
                            style={{
                              backgroundColor: '#5F9EA0',
                              color: '#fff',
                              fontWeight: '600',
                            }}>
                            Offer Price :₹{item.price - 1}
                          </Text>
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                        }}>
                        <Pressable>
                          <Text>
                            {' '}
                            <Icon
                              name={'shopping-cart-checkout'}
                              size={22}
                              color={'#008080'}
                              onPress={e => addCart(item.itemNumber)}
                            />
                          </Text>
                        </Pressable>
                        <Pressable>
                          <Text>
                            {' '}
                            <Icon
                              name={'share'}
                              size={22}
                              color={'#008080'}
                              onPress={e => shareSocialMedia(item.productLink)}
                            />
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                    <Text style={{color: 'black'}}>{item.productName}</Text>
                    {/* <View style={{flexDirection: 'row'}}> */}
                    <Pressable>
                      <Button
                        title="Buy Amazon"
                        color="#008080"
                        onPress={() =>
                          Linking.openURL(item.productLink)
                        }></Button>
                    </Pressable>
                    {/* </View> */}
                  </View>
                </View>
              )}
            />
            {/* :<View style={{color:'black',justifyContent:'center',alignItems:'center',width:'100%',marginTop:'50%'}}><Text style={{color:'black'}}>Product Not Found</Text></View>} */}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  headingStyle: {
    padding: 10,
    backgroundColor: '#5F9EA0',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loadingDidign: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '70%',
  },
  pageHeadingText: {
    fontWeight: '600',
    color: '#ffffff',
    paddingRight: 10,
  },
  logo: {
    // padding: 10,
    fontWeight: '800',
    color: '#ffffff',
    // backgroundColor:'#5F9EA0'
  },
});
