import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ImageBackground,
  SafeAreaView,
  KeyboardAvoidingView,
  Pressable,
  CheckBox,
  ActivityIndicator,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import WorkingProgress from '../components/WorkingProgress';
import {useNavigation} from '@react-navigation/native';
import image from '../imges/background1.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileDetails from '../components/ProfileDetails';
import Url from '../envirolments/envirolments-prod';
import SelectDropdown from 'react-native-select-dropdown';
// import Icon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {log} from 'console';
// import {MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
function Login(props) {
  const navigation = useNavigation();
  const [loginPage, setLoginPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [roleId, setRoleId] = useState('');
  const [userId, setUserId] = useState('');

  const registerClick = () => {
    setLoginPage(false);
  };
  const loginCick = () => {
    setLoginPage(true);
  };
  useEffect(() => {
    console.log();
  }, []);

  const getRoles = async () => {
    try {
      const apiUrl = Url.url + '/role/list';
      console.log(apiUrl);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check if the request was successful (status code 2xx)

      // Parse the response JSON if needed
      const responseData = await response.json();
      console.log('API response:', responseData);

      if (response.code == 200) {
        // navigation.navigate('Home');
        setUserId(responseData.id);
        storeData(responseData.id);
      }

      // Alert.alert(responseData)

      // console.error('API request failed:', response.status);
    } catch (error) {
      console.log(error);

      // Alert.alert("Email and Password Incorrect")
    }
  };

  const resetClick = () => {
    setName('');
    setEmailId('');
    setPhoneNumber('');
    setPassword('');
    setConfirmPassword('');
  };
  const createUser = async () => {
    setIsLoading(true);
    if (!phoneNumber) {
      return Alert.alert('PhoneNumber is Required');
    }
    if (phoneNumber.length < 10 || phoneNumber.length > 10) {
      return Alert.alert('PhoneNumber is 10 Digit only Allowed');
    }
    if (!emailId) {
      return Alert.alert('EmailId is Required');
    }
    if (!emailId.endsWith('@gmail.com')) {
      return Alert.alert('Invalid EmailId');
    }
    if (!password) {
      return Alert.alert('Password is Required');
    }
    if (password.length < 6) {
      return Alert.alert('Password must be 6 Digit');
    }
    if (password != confirmPassword) {
      return Alert.alert('Password and Confirm Password is Not Same');
    }

    try {
      setIsLoading(true);
      const apiUrl = Url.url + '/register';
      console.log(apiUrl);
      // Make the POST request
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers here
        },
        body: JSON.stringify({
          type: 'user',
          userData: {
            name: name,
            emailId: emailId,
            password: password,
            confirmPassword: confirmPassword,
            phone: phoneNumber,
            role_id: '1',
          },
        }),
      });

      // Check if the request was successful (status code 2xx)

      // Parse the response JSON if needed
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.code == 200) {
        console.log('API response:', responseData);
        setIsLoading(false);
        Alert.alert(responseData.message);
      } else if (responseData.code == 401) {
        setIsLoading(false);
        Alert.alert(responseData.message);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log('dd');
      console.log(error);
      setIsLoading(false);
    }
  };
  const loginUser = async () => {
    if (!email) {
      return Alert.alert('EmailId is Required');
    }
    // if(!emailId.endsWith('.com')){
    //   return Alert.alert('Invalid EmailId');
    // }
    if (!password) {
      return Alert.alert('Password is Required');
    }
    console.log(email, password);
    setIsLoading(true);
    AsyncStorage.clear();
    try {
      const apiUrl = Url.url + '/login';
      console.log(apiUrl);
      // Make the POST request
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers here
        },
        body: JSON.stringify({
          loginType: 'user',
          userName: email,
          password: password,
        }),
      });

      // Check if the request was successful (status code 2xx)

      // Parse the response JSON if needed
      const responseData = await response.json();
      console.log('API response:', responseData);

      if (responseData.code == 200) {
        setUserId(responseData.responseData.userDetail.user_id);
        let id = responseData.responseData.userDetail.user_id;
        let token = responseData.responseData.token;
        await AsyncStorage.setItem('user_id', id.toString());
        await AsyncStorage.setItem('token', token.toString());
        await navigation.navigate('MainTab');
        // storeData(id, token)
        setIsLoading(false);
      } else {
        setIsLoading(false);
        Alert.alert(responseData.message.toString());
      }

      // Alert.alert(responseData)
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      Alert.alert('Network issue');
    }
  };
  const storeData = async (value, token) => {
    try {
      console.log('Data stored successfully!', token);
      // setUserId( value)
    } catch (error) {
      console.error('Error storing data:', error);
    }
    retrieveData();
  };
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_id');
      const token = await AsyncStorage.getItem('token');

      if (value !== null) {
        console.log('ssss' + value, '==token==', token);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };
  const handleChange = () => {
    setUserId('');
  };
  const searchNavigayion = () => {
    navigation.navigate('Register');
  };
  const handleLogin = () => {
    // props.changeLogin(false);
    navigation.navigate('Register');
  };
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#008080"
          style={styles.loadingDidign}
        />
      ) : (
        <>
          {/* <View>
        {userId != '' ? (
          <ProfileDetails parentCallback={handleChange} />
        ) : (
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={styles.backgroundImage}>
            {!loginPage ? (
              <View style={{padding: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    marginTop: 20,
                  }}>
                  <Text
                    style={{padding: 10, fontWeight: 'bold', color: 'black'}}>
                    Store
                  </Text>
                  <Text
                    style={{padding: 10, fontWeight: 'bold', color: 'black'}}>
                    Register
                  </Text>
                </View>
              
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <View style={{flex: 0.5}}>
                    <Text
                      style={{
                        padding: 5,
                        marginLeft: 10,
                        marginTop: 3,
                        color: 'black',
                      }}>
                      Name
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <TextInput
                      placeholder="Enter Name"
                      onChangeText={e => setName(e)}
                      value={name}
                      style={styles.input}
                    />
                  </View>
                </View>

           
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginTop: 20,
                  }}>
                  <View style={{flex: 0.5}}>
                    <Text
                      style={{
                        padding: 5,
                        marginLeft: 10,
                        marginTop: 3,
                        color: 'black',
                      }}>
                      Phone Number
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <TextInput
                      placeholder="Enter Phone Number"
                      keyboardType="numeric"
                      value={phoneNumber}
                      style={styles.input}
                      onChangeText={e => setPhoneNumber(e)}
                    />
                  </View>
                </View>

              
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginTop: 20,
                  }}>
                  <View style={{flex: 0.5}}>
                    <Text
                      style={{
                        padding: 5,
                        marginLeft: 10,
                        marginTop: 3,
                        color: 'black',
                      }}>
                      Email
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <TextInput
                      placeholder="Enter Email"
                      style={styles.input}
                      value={emailId}
                      onChangeText={e => setEmailId(e)}
                    />
                  </View>
                </View>
               
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginTop: 20,
                  }}>
                  <View style={{flex: 0.5}}>
                    <Text
                      style={{
                        padding: 5,
                        marginLeft: 10,
                        marginTop: 3,
                        color: 'black',
                      }}>
                      Password
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <TextInput
                      placeholder="Enter Password"
                      style={styles.input}
                      value={password}
                      onChangeText={e => setPassword(e)}
                    />
                  </View>
                </View>
                // Confirm Password 
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginTop: 20,
                  }}>
                  <View style={{flex: 0.5}}>
                    <Text
                      style={{
                        padding: 5,
                        marginLeft: 10,
                        marginTop: 3,
                        color: 'black',
                      }}>
                      Confirm Password
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <TextInput
                      placeholder="Enter Confirm Password"
                      style={styles.input}
                      value={confirmPassword}
                      onChangeText={e => setConfirmPassword(e)}
                    />
                  </View>
                </View>
               
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 20,
                  }}>
                  <Text style={{marginRight: 5}}>
                    {' '}
                    <Button
                      title="Submit"
                      color={'#008B8B'}
                      onPress={createUser}
                    />
                  </Text>
                  <Text>
                    <Button
                      title="Reset"
                      color={'#FA5035'}
                      onPress={resetClick}
                    />
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: '100%',
                    padding: 10,
                  }}>
                  <Text style={{fontWeight: '800', color: 'black'}}>
                    You Have an Account?{' '}
                  </Text>
                  <Text
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: '#008B8B',
                      color: 'black',
                    }}
                    onPress={loginCick}>
                    Login
                  </Text>
                </View>
                
                <View style={{margin: 10}}>
                  <Button title="Google SignIn" color={'#C94130'} />
                </View>
                <View style={{margin: 10}}>
                  <Button title="FaceBook SignIn" color={'#3A63BE'} />
                </View>
              </View>
            ) : (
              <View style={{padding: 10, marginTop: 110}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    marginTop: 20,
                  }}>
                  <Text
                    style={{padding: 10, fontWeight: 'bold', color: 'black'}}>
                    GSM
                  </Text>
                  <Text
                    style={{padding: 10, fontWeight: 'bold', color: 'black'}}>
                    Login
                  </Text>
                </View>
                
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginTop: 20,
                  }}>
                  <View style={{flex: 0.5}}>
                    <Text
                      style={{
                        padding: 5,
                        marginLeft: 10,
                        marginTop: 3,
                        color: 'black',
                      }}>
                      Email
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <TextInput
                      placeholder="Enter Email"
                      style={styles.input}
                      value={emailId}
                      onChangeText={e => setEmailId(e)}
                    />
                  </View>
                </View>
               
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginTop: 20,
                  }}>
                  <View style={{flex: 0.5}}>
                    <Text
                      style={{
                        padding: 5,
                        marginLeft: 10,
                        marginTop: 3,
                        color: 'black',
                      }}>
                      Password
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <TextInput
                      placeholder="Enter Password"
                      style={styles.input}
                      type={password}
                      value={password}
                      onChangeText={e => setPassword(e)}
                    />
                  </View>
                </View>
               
                <View
                  style={{
                    justifyContent: 'center',
                    marginTop: 20,
                    marginRight: 10,
                    marginLeft: 10,
                  }}>
                  <Button
                    title="Submit"
                    color={'#008B8B'}
                    onPress={loginUser}
                  />
                 
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: '100%',
                    padding: 10,
                  }}>
                  <Text style={{fontWeight: '800', color: 'black'}}>
                    You Don't Have an Account?{' '}
                  </Text>
                  <Text
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: '#008B8B',
                      color: 'black',
                    }}
                    onPress={registerClick}>
                    Register
                  </Text>
                </View>
               
                <View style={{margin: 10}}>
                  <Button title="Google SignIn" color={'#C94130'} />
                </View>
                <View style={{margin: 10}}>
                  <Button title="FaceBook SignIn" color={'#3A63BE'} />
                </View>
              </View>
            )}
          </ImageBackground>
        )}
      </View> */}
          <View style={{marginTop: 50}}>
            <Text
              style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}>
              Store App
            </Text>
          </View>

          <KeyboardAvoidingView>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: 'bold',
                  marginTop: 12,
                  color: 'red',
                }}>
                Log in to your account
              </Text>
            </View>

            <View style={{marginTop: 70}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  backgroundColor: '#E0E0E0',
                  paddingVertical: 5,
                  borderRadius: 5,
                  marginTop: 30,
                }}>
                <Icon
                  style={{marginLeft: 8}}
                  name="email"
                  size={24}
                  color="gray"
                />
                <TextInput
                  value={email}
                  onChangeText={text => setEmail(text)}
                  style={{color: 'gray', marginVertical: 10, width: 300}}
                  placeholder="enter your Email"
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  backgroundColor: '#E0E0E0',
                  paddingVertical: 5,
                  borderRadius: 5,
                  marginTop: 30,
                }}>
                <Icon
                  style={{marginLeft: 8}}
                  name="lock"
                  size={24}
                  color="gray"
                />
                <TextInput
                  value={password}
                  onChangeText={text => setPassword(text)}
                  style={{color: 'gray', marginVertical: 10, width: 300}}
                  placeholder="enter your password"
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 12,
              }}>
              <Text> Keep me Logged In</Text>
              <Text>Forgot Password</Text>
            </View>

            <Pressable
              onPress={loginUser}
              style={{
                width: 200,
                backgroundColor: '#fd5c63',
                borderRadius: 6,
                marginLeft: 'auto',
                marginRight: 'auto',
                padding: 15,
                marginTop: 50,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: 'white',
                }}>
                Login
              </Text>
            </Pressable>

            <Pressable onPress={() => handleLogin()} style={{marginTop: 15}}>
              <Text style={{textAlign: 'center', color: 'gray', fontSize: 16}}>
                Don't have an Account? Sign Up
              </Text>
            </Pressable>
          </KeyboardAvoidingView>
        </>
      )}
    </SafeAreaView>
  );
}

export default Login;

const styles = StyleSheet.create({
  input: {
    height: 40,
    // margin: 12,
    borderWidth: 0.5,
    padding: 10,
    marginRight: 10,
  },
  backgroundImage: {
    height: '100%',
  },
  loadingDidign: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: '20%',
  },
});
