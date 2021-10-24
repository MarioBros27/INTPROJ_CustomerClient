import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Payments({route,navigation}) {
    const { bill } = route.params;

     return (

        <View style={styles.container}>
           
            <Text>Hello Ricardo</Text>
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
    }

});
