import React, { Component } from 'react';
import {
    StyleSheet, 
    View,
    Text,
    TouchableOpacity,
    Dimensions
  } from 'react-native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const Error = (props) => (
    <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{props.text}</Text>
    </View>
);

const styles = StyleSheet.create({
    errorContainer: {
        position: 'absolute',
        width: WIDTH - 60,
        backgroundColor: 'red',
        top: HEIGHT / 4,
        marginHorizontal: 30,
        borderRadius: 5,
        minHeight: 30,
        zIndex: 2
    },
    errorText: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '500',
        opacity: 0.8
    }
})

export default Error;