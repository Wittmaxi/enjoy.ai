import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Heart from './data/Heart';
import Shoe from './data/Shoe';

export default ({ hr, stepState }) => {

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
    alignItems: 'stretch',
    height:'20%',
    width:'25%',
    paddingTop:'4%'
}
});
