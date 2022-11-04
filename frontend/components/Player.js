import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Icon } from "@rneui/base";

export default class Player extends React.Component {
   
    constructor (props) {
        super(props);
        this.state = {
            isPlaying: false,
        };
    }

    toggleStartStop = () => {
        this.setState({ isPlaying: !this.state.isPlaying });
    }
    
    render () {
        return <View>
           <Pressable onPress={this.toggleStartStop} style={ this.styles.btn }><Icon name={this.state.isPlaying ? "play" : "pause"} type="antdesign" color="#000" /></Pressable>
        </View>;
    }

    styles = StyleSheet.create({
        btn: {
            padding: 50,
            borderRadius: 100,
            backgroundColor: "#BEEDFD",
        }
    });
}
