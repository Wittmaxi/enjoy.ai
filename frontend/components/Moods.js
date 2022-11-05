import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AnxiousButton from './mood_buttons/AnxiousButton';
import HappyButton from './mood_buttons/HappyButton';
import MotivatedButton from './mood_buttons/MotivatedButton';
import SadButton from './mood_buttons/SadButton';
import SleepyButton from './mood_buttons/SleepyButton';




export default ({ handleUpdate }) => {
  const values = ['Happy', 'Sad', 'Sleepy', 'Motivated', 'Anxious']
  const [selectedValue, setSelectedValue] = useState(values[0])

  function renderSwitch(emotion) {
    switch(emotion) {
      case 'Happy':
          return <HappyButton selected={selectedValue == emotion}></HappyButton>
      case 'Sad':
        return <SadButton selected={selectedValue == emotion}></SadButton>
      case 'Sleepy':
        return <SleepyButton selected={selectedValue == emotion}></SleepyButton>
      case 'Motivated':
        return <MotivatedButton selected={selectedValue == emotion}></MotivatedButton>
      case 'Anxious':
        return <AnxiousButton selected={selectedValue == emotion}></AnxiousButton>
      default:
        return <></>
    }
  }

  return (
    <View style={styles.container}>
      {values.map((value) => (
        <TouchableOpacity
          key={value}
          onPress={() => {
            setSelectedValue(value)
            handleUpdate(values.indexOf(value) + 1)
          }}
        >
            {renderSwitch(value, selectedValue)}
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "space-evenly",
    margin: 20,
  },
  textCenter: {
    alignContent: "center",
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 4,
    backgroundColor: "#BEEDFD",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "40%",
    textAlign: "center",
  },
  selected: {
    backgroundColor: "#000",
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
  },
  selectedLabel: {
    color: "white",
  },
  label: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 24,
  },
});

