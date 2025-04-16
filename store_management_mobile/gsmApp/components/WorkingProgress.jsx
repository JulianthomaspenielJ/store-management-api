import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const WorkingProgress = () => {
  return (
    <View style={styles.workingProgress}>
      <Image
        style={styles.proccecingLogo}
        source={require('../imges/working1.png')}
      />
      {/* <Text>Working In Proggress</Text> */}
    </View>
  )
}

export default WorkingProgress

const styles = StyleSheet.create({
    workingProgress:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    proccecingLogo:{
        width: 170,
        height: 170,

    }
})