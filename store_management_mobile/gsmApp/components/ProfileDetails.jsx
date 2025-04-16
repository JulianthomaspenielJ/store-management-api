import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function ProfileDetails() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [login, setLogin] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    // profileData();
  }, []);

  return (
    <View>
      {/* {login ? (
        <Login changeLogin={handleLogin} />
      ) : (
        <Register changeLogin={handleLogin} />
      )} */}
    </View>
  );
}

export default ProfileDetails;

const styles = StyleSheet.create({});
