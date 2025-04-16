import { StyleSheet, Text, View,TextInput,Pressable,FlatList, ActivityIndicator,Image,Button } from 'react-native'
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Url from '../envirolments/envirolments-prod';
const Search = ({route,navigation}) => {
  const [product, setProduct] = useState([]);
  const[isLoading,setIsLoading]=useState(false)
  const apiEndPoint = route.params?.apiEndPoinr
  const onChangeText=async(e)=>{
    // console.log(apiEndPoint);
    setIsLoading(true)
    try {
      const apiUrl = Url.url+'/'+apiEndPoint+'/All';

      // Make the POST request
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers here
        },
        body: JSON.stringify({
          inputValue: e,
        }),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        // Parse the response JSON if needed
        const responseData = await response.json();
        // console.log('API response:', responseData);
        setProduct(responseData);
        setIsLoading(false)
      } else {
        console.error('API request failed:', response.status);
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  }
  return (
    <View>
    <View style={{flexDirection:'row'}}>
      <Icon name={'arrow-back-ios-new'} size={22} color={'black'} style={styles.backIcon} onPress={ () => {
                /* pass key down to *EditPage* */
                navigation.goBack(null);
            }}/>
   <TextInput 
        style={styles.input}
        onChangeText={(e)=>onChangeText(e)}
        // value={text}
        placeholder="Search Product"
      />
    </View>
    {isLoading?<ActivityIndicator size="large" color="#008080" style={styles.loadingDidign}/> :
      <View>
         {product.length >0 ? <FlatList
          data={product}
          // keyExtractor={({id},index)=>id}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={{flexDirection: 'row', padding: 10,color:'black'}}>
              <View style={{}}>
                <Image
                  style={{width: 110, height: 135,padding:5}}
                  source={{
                    uri: item.productImg,
                  }}
                />
              </View>
              <View style={{padding: 5,width:'72%',color:'black'}}>
               <View style={{flexDirection:'row'}}>
                <View  style={{flex:1}}>
                <Text style={{color: 'black'}}>Discount :{item.amazonDiscount}</Text>
                <Text style={{color: 'black'}}>Price :₹{item.productPrice}</Text>
                <Text ><Text style={{backgroundColor:'#5F9EA0',color:'#fff',fontWeight:'600'}}>Offer Price :₹{item.productOfferPrice}{" "}</Text></Text>
                </View>
                <View style={{flex:1,flexDirection:'row',justifyContent:'space-around'}}>
                <Pressable><Text> <Icon name={'shopping-cart-checkout'} size={22} color={'#008080'} onPress={(e)=>shareSocialMedia(item.productLink)} /></Text></Pressable>
                <Pressable><Text> <Icon name={'share'} size={22} color={'#008080'} onPress={(e)=>shareSocialMedia(item.productLink)} /></Text></Pressable>

                  </View>
                  </View>
                <Text style={{color: 'black'}}>{item.productName}</Text>
                {/* <View style={{flexDirection: 'row'}}> */}
                <Pressable>
                <Button
                  title="Buy Amazon"
                  color="#008080"
                  onPress={() => Linking.openURL(item.productLink)}></Button>
                  </Pressable>
             {/* </View> */}
              </View>
            </View>
          )}
        /> :<View style={{color:'black',justifyContent:'center',alignItems:'center',width:'100%',marginTop:'50%'}}><Text style={{color:'black'}}>Product Not Found</Text></View>}
       
      </View>}
    </View>
  )
}

export default Search

const styles = StyleSheet.create({input: {
  height: 40,
  margin: 12,
  borderWidth: 1,
  padding: 10,
  width:300,
  color:'#DFE1E5',
  borderRadius:15
},backIcon:{
  margin: 18,
},
loadingDidign:{
  flex:1,
  justifyContent:'center',
  alignItems:'center',
  marginTop:'80%'
    }})