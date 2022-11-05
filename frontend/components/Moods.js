import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default () => {
  const values = ['Happy', 'Sad', 'Contempt', 'Frustrated', 'Anxious']
  const [selectedValue, setSelectedValue] = useState(values[0])

  return (
    <View style={styles.container}>
      {values.map((value) => (
        <TouchableOpacity
          key={value}
          onPress={() => setSelectedValue(value)}
          style={[
            styles.button,
            selectedValue === value && styles.selected,
          ]}
        >
          <Text
            style={[
              styles.buttonLabel,
              selectedValue === value && styles.selectedLabel,
            ]}
          >
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 20,
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

