import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from '../components/Carousel';
import Categories from '../components/Categories';
import Hotel from '../components/Hotel';
import {BottomModal, SlideAnimation, ModalContent} from 'react-native-modals';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Url from '../envirolments/envirolments-prod';
const Home = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([
    {
      id: '1',
      featured_image:
        'https://b.zmtcdn.com/data/pictures/2/18820472/b07647252aae32993047faf13a1cccf4.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*',
      images: [
        {
          id: '2',
          image:
            'https://b.zmtcdn.com/data/pictures/chains/8/51828/68d04135bbac1e3d5ff5a87d45974da1.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
          description: 'Desi Burrito • Rs249',
        },
        {
          id: '3',
          image:
            'https://b.zmtcdn.com/data/pictures/chains/8/51828/1f8008fc1cec3cd7ea2b559c32b1e642.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
          description: 'Indain Burrito • Rs149',
        },
      ],
      name: 'Hauz Khas Social',
      cuisines: 'North Indian • Fast Food • 160 for one',
      time: '35 - 40 min • 1Km',
      average_cost_for_two: 1600,
      aggregate_rating: 4.3,
      adress: '9-A & 12, Hauz Khas Village, New Delhi',
      smalladress: 'Hauz Khas Village, New Delhi',
      offer: '₹80 OFF',
      no_of_Delivery: 1500,
      latitude: 12.9916,
      longitude: 77.5712,
    },

    {
      id: '1',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4rgOs6C9rJuwL_sjJB5n7CeGKEA-Xg2yxIYq025B7_7avmruQHZ0DPpJa8GiSzPkEfas&usqp=CAU',
      name: 'Qubitos - The Terrace Cafe',
      cuisines: 'Thai, European, Mexican',
      average_cost_for_two: 1500,
      aggregate_rating: 4.5,
      adress:
        'C-7, Vishal Enclave, Opposite Metro Pillar 417, Rajouri Garden, New Delhi',
      smalladress: 'Rajouri Garden, New Delhi',
      offer: '₹80 OFF',
      no_of_Delivery: 2500,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '44 min',
    },

    {
      id: '2',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTCYsmzl1yfX0MwTN-E_uHC-bk3p181VzjIA&usqp=CAU',
      name: 'The Hudson Cafe',
      cuisines: 'Cafe, Italian, Continental',
      average_cost_for_two: 850,
      aggregate_rating: 4.3,
      adress:
        '2524, 1st Floor, Hudson Lane, Delhi University-GTB Nagar, New Delhi',
      smalladress: 'Delhi University-GTB Nagar',
      offer: '₹60 OFF',
      no_of_Delivery: 1800,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '20 min',
    },

    {
      id: '3',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1wuHjGnvTD4Aewe_M2-_5OSwPiPv1kUvMljF-sqoPRzvoFxD06BK2ac2jV-ZmQG6lQTg&usqp=CAU',
      name: 'Summer House Cafe',
      cuisines: 'Italian, Continental',
      average_cost_for_two: 1850,
      aggregate_rating: 4.1,
      adress:
        '1st Floor, DDA Shopping Complex, Aurobindo Place, Hauz Khas, New Delhi',
      smalladress: 'Hauz Khas, New Delhi',
      offer: '₹50 OFF',
      no_of_Delivery: 1700,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '38 min',
    },

    {
      id: '4',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXumfbiH2jcIY8xq9QW6B1QGoh3OJ596SnpQ&usqp=CAU',
      name: '38 Barracks',
      cuisines: 'North Indian, Italian, Asian',
      average_cost_for_two: 1600,
      aggregate_rating: 4.4,
      adress: 'M-38, Outer Circle, Connaught Place, New Delhi',
      smalladress: 'Connaught Place, New Delhi',
      offer: '₹70 OFF',
      no_of_Delivery: 1230,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '51 min',
    },
    {
      id: '5',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREAW6AHZuQtR_1d9WPZn5mjK_jG-aAJxYfLQ&usqp=CAU',
      name: 'Terra Mayaa Restaurant',
      cuisines: 'North Indian, Continental, Italian',
      aggregate_rating: 3.5,
      adress: '6th Floor, Anil Plaza 2, G.S. Road, Christian Basti',
      smalladress: 'Anil Plaza 2, G.S. Road',
      offer: '₹55 OFF',
      no_of_Delivery: 500,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '42 min',
    },
    {
      id: '6',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLvPe-0FZVXXBJkBWf--jnjCcKN6PxD1Zgdw&usqp=CAU',
      name: 'Mocha Hotel',
      cuisines: 'Cafe, Italian',
      aggregate_rating: 4.2,
      adress: 'Christian Basti, Guwahati',
      smalladress: 'Christian Basti, Guwahati',
      offer: '₹90 OFF',
      no_of_Delivery: 1100,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '34 min',
    },
    {
      id: '7',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScVnb3JlCmtRJUTXo3Tj3dl_ZPjq2ScYFE6g&usqp=CAU',
      name: '4 Seasons',
      cuisines: 'Chinese, North Indian',
      aggregate_rating: 4.5,
      adress:
        'Opposite Institute of Social Science, Bhuban Road, Uzan Bazaar, Guwahati',
      smalladress: 'Bhuban Road, Uzan Bazaar, Guwahati',
      offer: '₹55 OFF',
      no_of_Delivery: 1500,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '30 min',
    },
    {
      id: '8',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsboAN558yvuCNpy0Lm40ZMT7iYZRkfbL6xA&usqp=CAU',
      name: 'Shanghai Salsa',
      cuisines: 'Continental, Fast Food, Chinese',
      aggregate_rating: 4.1,
      adress:
        '37, 1st Floor, Hatigarh Chariali, Mother Teresa Road, Zoo Tiniali Area, Zoo Tiniali, Guwahati',
      smalladress: 'Mother Teresa Road,Guwahati',
      offer: '₹75 OFF',
      no_of_Delivery: 1500,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '45 min',
    },
    {
      id: '9',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR30R3IntPKgz0A7WzeylvnDyM8EwmAfE2qXA&usqp=CAU',
      name: 'Underdoggs Sports Bar & Grill',
      cuisines: 'North Indian, Continental',
      aggregate_rating: 3.9,
      adress:
        '1st Floor, Central Mall, G.S. Road, Sree Nagar, Christian Basti, Guwahati',
      smalladress: 'Sree Nagar, Christian Basti, Guwahati',
      offer: '₹70 OFF',
      no_of_Delivery: 2500,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '33 min',
    },
    {
      id: '10',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVdGrJhslCsWFMNhndCotN4HNucd_pm9nQSA&usqp=CAU',
      name: 'Fat Belly',
      cuisines: 'Asian, Chinese, Tibetan',
      aggregate_rating: 4.5,
      adress:
        'Opposite Rabindra Bhawan, GNB Road, Ambari, Dighalipukhuri East, Uzan Bazaar, Guwahati',
      smalladress: 'Dighalipukhuri East, Guwahati',
      offer: '₹60 OFF',
      no_of_Delivery: 900,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '53 min',
    },
    {
      id: '11',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEO2PLGXFMmFjaR1Kj19mndyPl-Wh4Kbq0Hw&usqp=CAU',
      name: 'Makhan Fish and Chicken Corner',
      cuisines: 'Asian, Chinese',
      aggregate_rating: 4.5,
      adress:
        '21-A, Near Madaan Hospital, Majitha Road, Basant Nagar, Amritsar',
      smalladress: 'Basant Nagar, Amritsar',
      offer: '₹55 OFF',
      no_of_Delivery: 1200,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '43 min',
    },
    {
      id: '12',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzUsgy4YrizXUafeKLzAWasb93wvT_TSIvgw&usqp=CAU',
      name: 'Bharawan Da Dhaba',
      cuisines: 'North Indian, Fast Food',
      aggregate_rating: 3.6,
      adress: 'Near Amritsar Municipal Corporation, Town Hall, Amritsar',
      smalladress: 'Town Hall, Amritsar',
      offer: '₹70 OFF',
      no_of_Delivery: 1600,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '28 min',
    },
    {
      id: '13',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFXsKQIgGajlkt7qydP7TS6xpVD_gKY6ufnw&usqp=CAU',
      name: 'The Kulcha Land',
      cuisines: 'North Indian,Asian',
      aggregate_rating: 4.3,
      adress:
        'Opposite M.K Hotel, District Shopping Centre, Ranjit Avenue, Amritsar',
      smalladress: 'Ranjit Avenue, Amritsar',
      offer: '₹80 OFF',
      no_of_Delivery: 2600,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '32 min',
    },
    {
      id: '14',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu0iR3PZXGiNSyJf8XCMHuF13y9KL2owcNYQ&usqp=CAU',
      name: 'Brothers Dhaba',
      cuisines: 'North Indian',
      aggregate_rating: 4.6,
      adress:
        'Golden Temple Out Road, Opposite Amritsar Municipal Corporation, Town Hall, Amritsar',
      smalladress: 'Amritsar',
      offer: '₹65 OFF',
      no_of_Delivery: 1300,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '42 min',
    },
    {
      id: '15',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHbn8yLak8QNu-M5P4ttVPHFkvKwz4G48x7w&usqp=CAU',
      name: 'Charming Chicken',
      cuisines: 'North Indian',
      aggregate_rating: 4.6,
      adress:
        'Golden Temple Out Road, Opposite Amritsar Municipal Corporation, Town Hall, Amritsar',
      smalladress: 'Near Basant Nagar, Amritsar',
      offer: '₹45 OFF',
      no_of_Delivery: 700,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '28 min',
    },
    {
      id: '16',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsQSJX9mRckG3R7NfvYCRe-08s-z22tX-6nQ&usqp=CAU',
      name: 'Beera Chicken Corner',
      cuisines: 'North Indian',
      aggregate_rating: 4.4,
      adress:
        'Opposite Bandari Hospital, Sehaj Avenue, Majitha Road, Near White Avenue, Amritsar',
      smalladress: 'Near White Avenue, Amritsar',
      offer: '₹80 OFF',
      no_of_Delivery: 1400,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '34 min',
    },
    {
      id: '17',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDOJlhGwhda4tsD8Rgk1A97akTRV8QJJC4DA&usqp=CAU',
      name: "Brothers' Amritsari Dhaba",
      cuisines: 'North Indian',
      aggregate_rating: 4.2,
      adress: 'Phawara Chowk, Town Hall, Amritsar',
      smalladress: 'Town Hall, Amritsar',
      offer: '₹40 OFF',
      no_of_Delivery: 1600,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '40 min',
    },
    {
      id: '18',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjGqVUxo6HO-CtXn-AHgAin1tvN4l8_A0e1Q&usqp=CAU',
      name: 'La Roma Pizzeria',
      cuisines: 'Fast Food, Italian',
      aggregate_rating: 4.6,
      adress: ' Ranjit Avenue, Amritsar',
      smalladress: ' Ranjit Avenue, Amritsar',
      offer: '₹40 OFF',
      no_of_Delivery: 2200,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '46 min',
    },
    {
      id: '19',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkpI5t_Hgch4-I9edPRV4YNeZKgMX1iHtQng&usqp=CAU',
      name: 'Crystal Restaurant',
      cuisines: 'North Indian, Mughlai',
      aggregate_rating: 3.5,
      adress: ' Crystal Chowk, Queens Road, INA Colony, Amritsar',
      smalladress: 'INA Colony, Amritsar',
      offer: '₹80 OFF',
      no_of_Delivery: 2500,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '22 min',
    },
  ]);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'fetching your location ...',
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [catagory, setCatagory] = useState([]);
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [carsoursel, setCarouselData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // navigator.getLocation
    //   .getCurrentPosition({
    //     enableHighAccuracy: true,
    //     timeout: 60000,
    //   })
    //   .then(location => {
    //     console.log(location);
    //   })
    //   .catch(error => {
    //     const {code, message} = error;
    //     console.warn(code, message);
    //   });

    retrieveData();
  }, []);
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_id');
      const token = await AsyncStorage.getItem('token');

      if (value !== null) {
        console.log('ssss' + value, '==token==', token);
        setUserId(value);
        setToken(token);
        getCarouselData(value, token);
        getCatagory(value, token);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };
  const getCarouselData = async (value, token) => {
    try {
      console.log('token=====' + token);
      setIsLoading(true);
      const apiUrl = Url.url + '/carousel/list';
      console.log(apiUrl);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      const responseData = await response.json();
      console.log('API response:', responseData);
      if (responseData.code == 200) {
        console.log('asdad');
        var imgData = [];
        var data = responseData.result.carouselData;
        for (var i = 0; i < data.length; i++) {
          // console.log(data[i].img_url);
          let url =
            Url.url +
            '/images/carousel/' +
            data[i].folder_name +
            '/' +
            data[i].img_url +
            '.jpg';
          imgData.push(url);
        }
        setCarouselData(imgData);
        setIsLoading(false);
        // setCarouselData(responseData.result.carouselData);
        // setCartcartTotal(responseData.result.cartTotalCartPrice);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const getCatagory = async (value, token) => {
    // setIsLoading(true);
    try {
      const apiUrl = Url.url + '/category/list';

      // Make the POST request
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
          // Add any additional headers here
        },
        body: JSON.stringify({page_index: 0, data_length: 100}),
      });

      // Check if the request was successful (status code 2xx)

      // Parse the response JSON if needed
      const responseData = await response.json();
      console.log('API response:', JSON.stringify(responseData));
      if (responseData.code == 200) {
        setCatagory(responseData.result.categoryData);
      }
      // setIsLoading(false);
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
    }
  };
  const recommended = [
    {
      id: 1,
      name: 'Nandhana Palace',
      image:
        'https://b.zmtcdn.com/data/pictures/chains/3/50713/81d0735ce259a6bf800e16bb54cb9e5e.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
      time: '35 - 45',
      type: 'Andhra',
    },
    {
      id: 2,
      name: 'GFC Biriyani',
      image:
        'https://b.zmtcdn.com/data/pictures/0/20844770/f9582144619b80d30566f497a02e2c8d.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*',
      time: '10 - 35',
      type: 'North Indian',
    },
    {
      id: 3,
      name: 'Happiness Dhaba',
      image:
        'https://b.zmtcdn.com/data/reviews_photos/2f1/c66cf9c2c68f652db16f2c0a6188a2f1_1659295848.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
      time: '20 - 25',
      type: 'North Indian',
    },

    {
      id: 4,
      name: 'Happiness Dhaba',
      image:
        'https://b.zmtcdn.com/data/reviews_photos/2f1/c66cf9c2c68f652db16f2c0a6188a2f1_1659295848.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
      time: '20 - 25',
      type: 'North Indian',
    },
    {
      id: 5,
      name: 'Happiness Dhaba',
      image:
        'https://b.zmtcdn.com/data/reviews_photos/2f1/c66cf9c2c68f652db16f2c0a6188a2f1_1659295848.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
      time: '20 - 25',
      type: 'North Indian',
    },
  ];
  const items = [
    {
      id: '1',
      name: 'Offers',
      description: 'Upto 50% off',
      image: 'https://cdn-icons-png.flaticon.com/128/9356/9356378.png',
    },
    {
      id: '2',
      name: 'Legends',
      description: 'Across India',
      image: 'https://cdn-icons-png.flaticon.com/128/8302/8302686.png',
    },
    {
      id: '3',
      name: 'Gourmet',
      description: 'Selections',
      image: 'https://cdn-icons-png.flaticon.com/128/1065/1065715.png',
    },
    {
      id: '4',
      name: 'Healthy',
      description: 'Curated dishes',
      image: 'https://cdn-icons-png.flaticon.com/128/415/415744.png',
    },
    {
      id: '5',
      name: 'Gourmet',
      description: 'Selections',
      image: 'https://cdn-icons-png.flaticon.com/128/1065/1065715.png',
    },
    {
      id: '6',
      name: 'Healthy',
      description: 'Curated dishes',
      image: 'https://cdn-icons-png.flaticon.com/128/415/415744.png',
    },
  ];
  const hotels = [
    {
      id: '1',
      featured_image:
        'https://b.zmtcdn.com/data/pictures/2/18820472/b07647252aae32993047faf13a1cccf4.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*',
      images: [
        {
          id: '2',
          image:
            'https://b.zmtcdn.com/data/pictures/chains/8/51828/68d04135bbac1e3d5ff5a87d45974da1.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
          description: 'Desi Burrito • Rs249',
        },
        {
          id: '3',
          image:
            'https://b.zmtcdn.com/data/pictures/chains/8/51828/1f8008fc1cec3cd7ea2b559c32b1e642.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
          description: 'Indain Burrito • Rs149',
        },
      ],
      name: 'Hauz Khas Social',
      cuisines: 'North Indian • Fast Food • 160 for one',
      time: '35 - 40 min • 1Km',
      average_cost_for_two: 1600,
      aggregate_rating: 4.3,
      adress: '9-A & 12, Hauz Khas Village, New Delhi',
      smalladress: 'Hauz Khas Village, New Delhi',
      offer: '₹80 OFF',
      no_of_Delivery: 1500,
      latitude: 12.9916,
      longitude: 77.5712,
    },

    {
      id: '1',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4rgOs6C9rJuwL_sjJB5n7CeGKEA-Xg2yxIYq025B7_7avmruQHZ0DPpJa8GiSzPkEfas&usqp=CAU',
      name: 'Qubitos - The Terrace Cafe',
      cuisines: 'Thai, European, Mexican',
      average_cost_for_two: 1500,
      aggregate_rating: 4.5,
      adress:
        'C-7, Vishal Enclave, Opposite Metro Pillar 417, Rajouri Garden, New Delhi',
      smalladress: 'Rajouri Garden, New Delhi',
      offer: '₹80 OFF',
      no_of_Delivery: 2500,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '44 min',
    },

    {
      id: '2',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTCYsmzl1yfX0MwTN-E_uHC-bk3p181VzjIA&usqp=CAU',
      name: 'The Hudson Cafe',
      cuisines: 'Cafe, Italian, Continental',
      average_cost_for_two: 850,
      aggregate_rating: 4.3,
      adress:
        '2524, 1st Floor, Hudson Lane, Delhi University-GTB Nagar, New Delhi',
      smalladress: 'Delhi University-GTB Nagar',
      offer: '₹60 OFF',
      no_of_Delivery: 1800,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '20 min',
    },

    {
      id: '3',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1wuHjGnvTD4Aewe_M2-_5OSwPiPv1kUvMljF-sqoPRzvoFxD06BK2ac2jV-ZmQG6lQTg&usqp=CAU',
      name: 'Summer House Cafe',
      cuisines: 'Italian, Continental',
      average_cost_for_two: 1850,
      aggregate_rating: 4.1,
      adress:
        '1st Floor, DDA Shopping Complex, Aurobindo Place, Hauz Khas, New Delhi',
      smalladress: 'Hauz Khas, New Delhi',
      offer: '₹50 OFF',
      no_of_Delivery: 1700,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '38 min',
    },

    {
      id: '4',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXumfbiH2jcIY8xq9QW6B1QGoh3OJ596SnpQ&usqp=CAU',
      name: '38 Barracks',
      cuisines: 'North Indian, Italian, Asian',
      average_cost_for_two: 1600,
      aggregate_rating: 4.4,
      adress: 'M-38, Outer Circle, Connaught Place, New Delhi',
      smalladress: 'Connaught Place, New Delhi',
      offer: '₹70 OFF',
      no_of_Delivery: 1230,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '51 min',
    },
    {
      id: '5',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREAW6AHZuQtR_1d9WPZn5mjK_jG-aAJxYfLQ&usqp=CAU',
      name: 'Terra Mayaa Restaurant',
      cuisines: 'North Indian, Continental, Italian',
      aggregate_rating: 3.5,
      adress: '6th Floor, Anil Plaza 2, G.S. Road, Christian Basti',
      smalladress: 'Anil Plaza 2, G.S. Road',
      offer: '₹55 OFF',
      no_of_Delivery: 500,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '42 min',
    },
    {
      id: '6',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLvPe-0FZVXXBJkBWf--jnjCcKN6PxD1Zgdw&usqp=CAU',
      name: 'Mocha Hotel',
      cuisines: 'Cafe, Italian',
      aggregate_rating: 4.2,
      adress: 'Christian Basti, Guwahati',
      smalladress: 'Christian Basti, Guwahati',
      offer: '₹90 OFF',
      no_of_Delivery: 1100,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '34 min',
    },
    {
      id: '7',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScVnb3JlCmtRJUTXo3Tj3dl_ZPjq2ScYFE6g&usqp=CAU',
      name: '4 Seasons',
      cuisines: 'Chinese, North Indian',
      aggregate_rating: 4.5,
      adress:
        'Opposite Institute of Social Science, Bhuban Road, Uzan Bazaar, Guwahati',
      smalladress: 'Bhuban Road, Uzan Bazaar, Guwahati',
      offer: '₹55 OFF',
      no_of_Delivery: 1500,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '30 min',
    },
    {
      id: '8',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsboAN558yvuCNpy0Lm40ZMT7iYZRkfbL6xA&usqp=CAU',
      name: 'Shanghai Salsa',
      cuisines: 'Continental, Fast Food, Chinese',
      aggregate_rating: 4.1,
      adress:
        '37, 1st Floor, Hatigarh Chariali, Mother Teresa Road, Zoo Tiniali Area, Zoo Tiniali, Guwahati',
      smalladress: 'Mother Teresa Road,Guwahati',
      offer: '₹75 OFF',
      no_of_Delivery: 1500,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '45 min',
    },
    {
      id: '9',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR30R3IntPKgz0A7WzeylvnDyM8EwmAfE2qXA&usqp=CAU',
      name: 'Underdoggs Sports Bar & Grill',
      cuisines: 'North Indian, Continental',
      aggregate_rating: 3.9,
      adress:
        '1st Floor, Central Mall, G.S. Road, Sree Nagar, Christian Basti, Guwahati',
      smalladress: 'Sree Nagar, Christian Basti, Guwahati',
      offer: '₹70 OFF',
      no_of_Delivery: 2500,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '33 min',
    },
    {
      id: '10',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVdGrJhslCsWFMNhndCotN4HNucd_pm9nQSA&usqp=CAU',
      name: 'Fat Belly',
      cuisines: 'Asian, Chinese, Tibetan',
      aggregate_rating: 4.5,
      adress:
        'Opposite Rabindra Bhawan, GNB Road, Ambari, Dighalipukhuri East, Uzan Bazaar, Guwahati',
      smalladress: 'Dighalipukhuri East, Guwahati',
      offer: '₹60 OFF',
      no_of_Delivery: 900,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '53 min',
    },
    {
      id: '11',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEO2PLGXFMmFjaR1Kj19mndyPl-Wh4Kbq0Hw&usqp=CAU',
      name: 'Makhan Fish and Chicken Corner',
      cuisines: 'Asian, Chinese',
      aggregate_rating: 4.5,
      adress:
        '21-A, Near Madaan Hospital, Majitha Road, Basant Nagar, Amritsar',
      smalladress: 'Basant Nagar, Amritsar',
      offer: '₹55 OFF',
      no_of_Delivery: 1200,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '43 min',
    },
    {
      id: '12',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzUsgy4YrizXUafeKLzAWasb93wvT_TSIvgw&usqp=CAU',
      name: 'Bharawan Da Dhaba',
      cuisines: 'North Indian, Fast Food',
      aggregate_rating: 3.6,
      adress: 'Near Amritsar Municipal Corporation, Town Hall, Amritsar',
      smalladress: 'Town Hall, Amritsar',
      offer: '₹70 OFF',
      no_of_Delivery: 1600,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '28 min',
    },
    {
      id: '13',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFXsKQIgGajlkt7qydP7TS6xpVD_gKY6ufnw&usqp=CAU',
      name: 'The Kulcha Land',
      cuisines: 'North Indian,Asian',
      aggregate_rating: 4.3,
      adress:
        'Opposite M.K Hotel, District Shopping Centre, Ranjit Avenue, Amritsar',
      smalladress: 'Ranjit Avenue, Amritsar',
      offer: '₹80 OFF',
      no_of_Delivery: 2600,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '32 min',
    },
    {
      id: '14',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu0iR3PZXGiNSyJf8XCMHuF13y9KL2owcNYQ&usqp=CAU',
      name: 'Brothers Dhaba',
      cuisines: 'North Indian',
      aggregate_rating: 4.6,
      adress:
        'Golden Temple Out Road, Opposite Amritsar Municipal Corporation, Town Hall, Amritsar',
      smalladress: 'Amritsar',
      offer: '₹65 OFF',
      no_of_Delivery: 1300,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '42 min',
    },
    {
      id: '15',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHbn8yLak8QNu-M5P4ttVPHFkvKwz4G48x7w&usqp=CAU',
      name: 'Charming Chicken',
      cuisines: 'North Indian',
      aggregate_rating: 4.6,
      adress:
        'Golden Temple Out Road, Opposite Amritsar Municipal Corporation, Town Hall, Amritsar',
      smalladress: 'Near Basant Nagar, Amritsar',
      offer: '₹45 OFF',
      no_of_Delivery: 700,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '28 min',
    },
    {
      id: '16',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsQSJX9mRckG3R7NfvYCRe-08s-z22tX-6nQ&usqp=CAU',
      name: 'Beera Chicken Corner',
      cuisines: 'North Indian',
      aggregate_rating: 4.4,
      adress:
        'Opposite Bandari Hospital, Sehaj Avenue, Majitha Road, Near White Avenue, Amritsar',
      smalladress: 'Near White Avenue, Amritsar',
      offer: '₹80 OFF',
      no_of_Delivery: 1400,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '34 min',
    },
    {
      id: '17',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDOJlhGwhda4tsD8Rgk1A97akTRV8QJJC4DA&usqp=CAU',
      name: "Brothers' Amritsari Dhaba",
      cuisines: 'North Indian',
      aggregate_rating: 4.2,
      adress: 'Phawara Chowk, Town Hall, Amritsar',
      smalladress: 'Town Hall, Amritsar',
      offer: '₹40 OFF',
      no_of_Delivery: 1600,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '40 min',
    },
    {
      id: '18',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjGqVUxo6HO-CtXn-AHgAin1tvN4l8_A0e1Q&usqp=CAU',
      name: 'La Roma Pizzeria',
      cuisines: 'Fast Food, Italian',
      aggregate_rating: 4.6,
      adress: ' Ranjit Avenue, Amritsar',
      smalladress: ' Ranjit Avenue, Amritsar',
      offer: '₹40 OFF',
      no_of_Delivery: 2200,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '46 min',
    },
    {
      id: '19',
      featured_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkpI5t_Hgch4-I9edPRV4YNeZKgMX1iHtQng&usqp=CAU',
      name: 'Crystal Restaurant',
      cuisines: 'North Indian, Mughlai',
      aggregate_rating: 3.5,
      adress: ' Crystal Chowk, Queens Road, INA Colony, Amritsar',
      smalladress: 'INA Colony, Amritsar',
      offer: '₹80 OFF',
      no_of_Delivery: 2500,
      latitude: 12.9716,
      longitude: 77.5946,
      time: '22 min',
    },
  ];

  return (
    <>
      <ScrollView style={{flex: 1, backgroundColor: '#f8f8f8'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            padding: 10,
          }}>
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="location-on" size={24} color="#E52850" />
              <View>
                <Text style={{fontSize: 15, fontWeight: '500'}}>
                  Deliver To
                </Text>
                <Text style={{color: 'gray', fontSize: 16, marginTop: 3}}>
                  {displayCurrentAddress}
                </Text>
              </View>
            </View>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: '#6CB4EE',
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>S</Text>
          </Pressable>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: '#C0C0C0',
            paddingVertical: 8,
            paddingHorizontal: 10,
            borderRadius: 11,
            marginTop: 10,
            marginHorizontal: 10,
          }}>
          <TextInput placeholder="Search for food, hotels" />
          <Icon name="search" size={24} color="#E52B50" />
        </View>

        <Carousel data={carsoursel} loading={isLoading} />
        {catagory.length != 0 ? (
          <Categories data={catagory} />
        ) : (
          <Text>Loading</Text>
        )}

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recommended?.map((item, index) => (
            <View
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                margin: 10,
                borderRadius: 8,
              }}
              key={item.id}>
              <View>
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    resizeMode: 'cover',
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 7,
                  }}
                  source={{uri: item?.image}}
                />
              </View>
              <View style={{padding: 10, flexDirection: 'column'}}>
                <Text style={{fontSize: 15, fontWeight: '500'}}>
                  {item?.name}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    marginTop: 3,
                    color: 'gray',
                    fontWeight: '500',
                  }}>
                  {item?.type}
                </Text>

                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
                  <Icon name="access-time-filled" size={24} color="green" />
                  <Text>{item?.time} mins</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <Text
          style={{
            textAlign: 'center',
            marginTop: 7,
            letterSpacing: 4,
            marginBottom: 5,
            color: 'gray',
          }}>
          EXPLORE
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {items?.map((item, index) => (
            <View
              key={index}
              style={{
                width: 90,
                borderColor: '#E0E0E0',
                borderWidth: 1,
                paddingVertical: 5,
                paddingHorizontal: 1,
                borderRadius: 5,
                marginLeft: 10,
                marginVertical: 10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
              }}>
              <Image
                style={{width: 50, height: 50}}
                source={{uri: item?.image}}
              />

              <Text style={{fontSize: 13, fontWeight: '500', marginTop: 6}}>
                {item?.name}
              </Text>

              <Text style={{fontSize: 12, color: 'gray', marginTop: 3}}>
                {item?.description}
              </Text>
            </View>
          ))}
        </ScrollView>

        <Text
          style={{
            textAlign: 'center',
            marginTop: 7,
            letterSpacing: 4,
            marginBottom: 5,
            color: 'gray',
          }}>
          ALL RESTAURANTS
        </Text>

        <View style={{marginHorizontal: 8}}>
          {data?.map((item, index) => (
            <Hotel key={index} item={item} menu={item?.menu} />
          ))}
        </View>
      </ScrollView>
      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={['up', 'down']}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}>
        <ModalContent style={{width: '100%', height: 400}}>
          <View style={{marginBottom: 8}}>
            <Text style={{fontSize: 16, fontWeight: '500'}}>
              Choose your Location
            </Text>

            <Text style={{marginTop: 5, fontSize: 16, color: 'gray'}}>
              Select a delivery location to see product availabilty and delivery
              options
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* already added addresses */}
            {addresses?.map((item, index) => (
              <Pressable
                key={item.id}
                onPress={() => setSelectedAdress(item)}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: '#D0D0D0',
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 3,
                  marginRight: 15,
                  marginTop: 10,
                  backgroundColor:
                    selectedAddress === item ? '#FBCEB1' : 'white',
                }}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
                  <Text style={{fontSize: 13, fontWeight: 'bold'}}>
                    {item?.name}
                  </Text>
                  <Icon name="location-pin" size={24} color="red" />
                </View>

                <Text
                  numberOfLines={1}
                  style={{width: 130, fontSize: 13, textAlign: 'center'}}>
                  {item?.houseNo},{item?.landmark}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{width: 130, fontSize: 13, textAlign: 'center'}}>
                  {item?.street}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{width: 130, fontSize: 13, textAlign: 'center'}}>
                  India, Bangalore
                </Text>
              </Pressable>
            ))}

            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Address');
              }}
              style={{
                width: 140,
                height: 140,
                borderColor: '#D0D0D0',
                marginTop: 10,
                borderWidth: 1,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#0066b2',
                  fontWeight: '500',
                }}>
                Add an Address or pick-up point
              </Text>
            </Pressable>
          </ScrollView>

          <View style={{flexDirection: 'column', gap: 7, marginBottom: 30}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Icon name="location-pin" size={22} color="#0066b2" />
              <Text style={{color: '#0066b2', fontWeight: '400'}}>
                Enter an Indian pincode
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Icon name="my-location" size={22} color="#0066b2" />
              <Text style={{color: '#0066b2', fontWeight: '400'}}>
                Use My Currect location
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Icon name="language" size={22} color="#0066b2" />

              <Text style={{color: '#0066b2', fontWeight: '400'}}>
                Deliver outside India
              </Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default Home;
