import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function Pago({ route, navigation }) {
    const { bill } = route.params;

    return (//Hola

        <View style={styles.parentContainer}>
            <View style = {styles.infoContainer}>
            <Text style={styles.title}>{bill.restaurante}</Text>
            <Text style={styles.subtitle}>Total: ${bill.total}</Text>
            <Text style={styles.subtitle}>Propina: ${bill.propina}</Text>
            <Text style={styles.subtitle}>{bill.fecha}</Text>
            <Text style={styles.subtitle}>{bill.hora}</Text>
            <Text style={styles.subtitle}>Referencia: {bill.referencia}</Text>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    parentContainer: {
        // flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    infoContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 22
    },
    buttonContainer: {
        marginTop: 25
    },
    title: {
        fontSize: 24,
        marginBottom: 2,
        fontWeight: "bold"
    },
    subtite: {
        fontSize: 12
    }

});
