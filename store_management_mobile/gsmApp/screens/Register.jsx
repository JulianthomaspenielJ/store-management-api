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
} from 'react-native';

import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
export default function Register(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Login');
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
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <View style={{marginTop: 50}}>
        <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}>
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
            Register to your account
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
              name="person"
              size={24}
              color="gray"
              style={{marginLeft: 8}}
            />
            <TextInput
              value={name}
              onChangeText={text => setName(text)}
              style={{color: 'gray', marginVertical: 10, width: 300}}
              placeholder="enter your Name"
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
            <Icon style={{marginLeft: 8}} name="email" size={24} color="gray" />
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
            <Icon style={{marginLeft: 8}} name="lock" size={24} color="gray" />
            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
              style={{color: 'gray', marginVertical: 10, width: 300}}
              placeholder="enter your password"
            />
          </View>
        </View>

        <Pressable
          onPress={createUser}
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
            Register
          </Text>
        </Pressable>

        <Pressable onPress={() => handleLogin()} style={{marginTop: 15}}>
          <Text style={{textAlign: 'center', color: 'gray', fontSize: 16}}>
            Already have an Account? Sign In
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
