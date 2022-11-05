import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Heart from './data/Heart';
import Shoe from './data/Shoe';

export default ({ hr, stepState }) => {

//   useEffect(() => {
//     setAudio(uri)
//   }, [uri])

  return (
    <View style={styles.container}>
        <Heart hr={hr}></Heart>
        <Shoe stepState={stepState}></Shoe>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems:'center',
    height:'10%',
    width:'25%',
    paddingTop:'6%'
}
});
