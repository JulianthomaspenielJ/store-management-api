import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Pressable,
  Button,
  FlatList,
  Image,
  Switch,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {log} from 'console';
import {useNavigation} from '@react-navigation/native';
import Url from '../envirolments/envirolments-prod';
import Navigation from './Navigation';

export default function Cart({router}) {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [cart, setCart] = useState([]);

  const [cartTotal, setCartTotal] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  // const params = useLocalSearchParams();
  // const router = useRouter();
  // const cart = useSelector((state) => state.cart.cart);
  // const dispatch = useDispatch();
  useEffect(() => {
    retrieveData();
  }, []);
  const retrieveData = async () => {
    try {
      const userId = await AsyncStorage.getItem('user_id');
      const token = await AsyncStorage.getItem('token');

      if (userId !== null) {
        console.log('ssss' + userId, '==token==', token);
        setUserId(userId);
        setToken(token);
        getCarts(userId, token);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };
  const updateCart = async (item, opretion) => {
    console.log(item);
    var opretor = '';
    if (opretion == 'sub') {
      if (item.quantity == 0) {
        return;
      } else {
        opretor = item.quantity - 1;
      }
    } else {
      opretor = item.quantity + 1;
    }
    try {
      const apiUrl = Url.url + '/cart/update';
      console.log(apiUrl);

      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          id: item.id,
          notification: item.notification,
          product_id: 2,
          is_add_to_cart: item.is_add_to_cart_list,
          quantity: opretor,
        }),
      });

      const responseData = await response.json();

      console.log('API response:', responseData);
      if (responseData.code == 200) {
        setCart(responseData.result.cartData);
        setCarTotal(responseData.result.cartTotalPrice);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getCarts = async (userId, token) => {
    try {
      setIsLoading(true);
      const apiUrl = Url.url + '/cart/list';
      console.log(apiUrl);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          pageIndex: '0',
          dataLength: '100',
        }),
      });

      const responseData = await response.json();
      console.log('API response:', responseData);
      if (responseData.code == 200) {
        setCart(responseData.result.cartData);
        setCartTotal(responseData.result.totalCartPrice);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // const cart = [
  //   {
  //     id: 1,
  //     name: 'MI Super Bass Bluetooth Wireless Headphones',
  //     quantity: 2,
  //     price: 300,
  //   },
  // ];
  const instructions = [
    {
      id: '1',
      name: 'Avoid Ringing',
      iconName: 'notifications-none',
    },
    {
      id: '2',
      name: 'Leave at the door',
      iconName: 'door-front',
    },
    {
      id: '3',
      name: 'directions to reach',
      iconName: 'directions',
    },
    {
      id: '4',
      name: 'Avoid Calling',
      iconName: 'local-phone',
    },
  ];

  //   ?.map((item) => item.quantity * item.price)
  //   .reduce((curr, prev) => curr + prev, 0);
  // console.log(cartTotal);
  return (
    <>
      <ScrollView style={{padding: 10, flex: 1, backgroundColor: '#F0F8FF'}}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          {/* <Icon name="arrow-back" size={24} color="black" />
          <Text>Cart</Text> */}
        </View>

        <View
          style={{
            backgroundColor: 'white',
            padding: 8,
            marginTop: 15,
            borderRadius: 8,
          }}>
          <Text>
            Delivery in <Text style={{fontWeight: '500'}}>35 - 40 mins</Text>
          </Text>
        </View>

        <View style={{marginVertical: 12}}>
          <Text
            style={{
              textAlign: 'center',
              letterSpacing: 3,
              fontSize: 15,
              color: 'gray',
            }}>
            ITEM(S) ADDED
          </Text>
        </View>

        <View>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="#008080"
              style={styles.loadingDidign}
            />
          ) : (
            <>
              {cart?.map((item, index) => (
                <Pressable
                  style={{
                    backgroundColor: 'white',
                    padding: 10,
                    // borderColor: 'gray',
                    borderWidth: 0.1,
                    borderRadius: 2,
                    marginBottom: 5,
                  }}
                  key={item.id}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{width: '30%'}}>
                      <Image
                        style={{
                          width: '100%',
                          height: 100,
                          resizeMode: 'stretch',
                          // borderRadius: 8,
                        }}
                        source={{
                          uri:
                            Url.url +
                            '/images/' +
                            item.productData.categoryData.name +
                            '/' +
                            item.productData.categoryData.code +
                            '/' +
                            item.productData.img_url +
                            '.jpg',
                        }}
                      />
                    </View>
                    <View
                      style={{
                        width: '40%',
                        justifyContent: 'center',
                        alignContent: 'center',
                        flex: 1,
                        paddingLeft: 5,
                      }}>
                      <View style={{marginTop: 1}}>
                        <Text style={{fontSize: 16, fontWeight: '600'}}>
                          {item?.productData.product_name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                          }}>
                          ₹{item.productData.price * item.quantity}
                        </Text>
                      </View>
                    </View>
                    <View style={{width: '30%'}}>
                      <View
                        style={{
                          // flexDirection: 'row',
                          alignItems: 'center',
                          // justifyContent: 'space-between',
                          marginVertical: 6,
                          marginTop: 17,
                        }}>
                        <Pressable
                          style={{
                            flexDirection: 'row',
                            paddingHorizontal: 15,
                            paddingVertical: 5,
                            // alignItems: 'center',
                            borderColor: '#BEBEBE',
                            borderWidth: 0.5,
                            borderRadius: 10,
                          }}>
                          <Pressable
                            onPress={e => {
                              updateCart(item, 'sub');
                            }}>
                            <Text
                              style={{
                                fontSize: 20,
                                color: 'green',
                                paddingHorizontal: 6,
                                fontWeight: '600',
                              }}>
                              -
                            </Text>
                          </Pressable>

                          <Pressable>
                            <Text
                              style={{
                                fontSize: 19,
                                color: 'green',
                                paddingHorizontal: 10,
                                fontWeight: '600',
                              }}>
                              {item.quantity}
                            </Text>
                          </Pressable>

                          <Pressable
                            onPress={e => {
                              updateCart(item, 'add');
                            }}>
                            <Text
                              style={{
                                fontSize: 20,
                                color: 'green',
                                paddingHorizontal: 6,
                                fontWeight: '600',
                              }}>
                              +
                            </Text>
                          </Pressable>
                        </Pressable>
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: '500',
                            marginRight: 22,
                            marginTop: 5,
                          }}>
                          Quantity : {item?.quantity}
                        </Text>
                      </View>

                      {/* <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                   
                  </View> */}
                    </View>
                  </View>
                </Pressable>
              ))}
            </>
          )}

          <View style={{marginVertical: 10}}>
            <Text style={{fontSize: 16, fontWeight: '600'}}>
              Delivery Instructions
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {instructions?.map((item, index) => (
                <Pressable
                  style={{
                    margin: 10,
                    borderRadius: 10,
                    padding: 10,
                    backgroundColor: 'white',
                  }}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name={item?.iconName} size={25} color={'gray'} />
                    <Text
                      style={{
                        width: 75,
                        fontSize: 13,
                        color: '#383838',
                        paddingTop: 10,
                        textAlign: 'center',
                      }}>
                      {item?.name}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
                <Icon name="add-circle-outline" size={24} color="black" />
                <Text>Add more Items</Text>
              </View>
              <Icon name="keyboard-arrow-right" size={20} color="black" />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
                <Icon name="sms" size={24} color="black" />
                <Text>Add more cooking instructions</Text>
              </View>
              <Icon name="keyboard-arrow-right" size={20} color="black" />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
                <Icon name="emoji-food-beverage" size={24} color="black" />
                <Text>Dont't send cultery with this order</Text>
              </View>
              <Icon name="keyboard-arrow-right" size={20} color="black" />
            </View>
          </View>

          <View>
            <View
              style={{
                padding: 10,
                backgroundColor: 'white',
                marginVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text>Feeding India Donation</Text>
                <Icon name="check-box" size={24} color="#fd5c63" />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <Text style={{color: 'gray'}}>
                  Working towards a manlutrition-free India
                </Text>
                <Text>Rs 3</Text>
              </View>
            </View>
          </View>

          <View style={{marginVertical: 10}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Billing Details
            </Text>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 7,
                padding: 10,
                marginTop: 14,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{fontSize: 15, fontWeight: '400', color: '#505050'}}>
                  Item cartTotal
                </Text>
                <Text
                  style={{fontSize: 15, fontWeight: '400', color: '#505050'}}>
                  ₹{cartTotal}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 8,
                }}>
                <Text
                  style={{fontSize: 15, fontWeight: '400', color: '#505050'}}>
                  Delivery Fee
                </Text>
                <Text
                  style={{fontSize: 15, fontWeight: '400', color: '#505050'}}>
                  ₹15.00
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{fontSize: 15, fontWeight: '400', color: '#505050'}}>
                  Delivery Partner Fee
                </Text>
                <Text
                  style={{fontSize: 15, fontWeight: '400', color: '#505050'}}>
                  ₹75
                </Text>
              </View>

              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 8,
                  }}>
                  <Text style={{fontWeight: 'bold', fontSize: 15}}>To pay</Text>
                  <Text>₹{cartTotal}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {cartTotal === 0 ? null : (
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 20,
            justifyContent: 'space-between',
            backgroundColor: 'white',
          }}>
          <View>
            <Text style={{fontSize: 16, fontWeight: '600'}}>
              Pay Using Cash
            </Text>
            <Text style={{marginTop: 7, fontSize: 15}}>Cash on Delivery</Text>
          </View>

          <Pressable
            onPress={() => {
              navigation.navigate('ConfirmOrder');
            }}
            style={{
              backgroundColor: '#fd5c63',
              padding: 10,
              width: 200,
              borderRadius: 6,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
            }}>
            <View>
              <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
                {cartTotal}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: 'white',
                  fontWeight: '500',
                  marginTop: 3,
                }}>
                cartTotal
              </Text>
            </View>
            <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>
              Place Order
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
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
    paddingright: 10,
  },
  logo: {
    // padding: 10,
    fontWeight: '800',
    color: '#ffffff',
    // backgroundColor:'#5F9EA0'
  },
  input: {
    height: 28,
    width: 100,
    margin: 1,
    borderWidth: 1,
    padding: 0,
    paddingLeft: 5,
    color: 'black',
    borderRadius: 2,
  },
  loadingDidign: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: '20%',
  },
});
