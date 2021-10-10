import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import logo from '../assets/logo.png'

export default function Loading() {

    return (

        <View style={styles.container}>
            <Image style={styles.stretch} source={logo} />
            <Text style={styles.text}>Cargando...</Text>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    stretch: {
        marginTop: '10%',
        marginBottom: '10%',
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    text:{
        fontSize: 30
    }
});
