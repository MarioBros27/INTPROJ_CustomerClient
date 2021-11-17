import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';
import axios from 'axios';

const appSettings = require('../app-settings.json');

export default function Reservaciones({ user}) {

    const [ reservations, setReservations ] = useState([]);

    useEffect(() => {
        axios.get(`${appSettings['backend-host']}/reservations?customerId=${user.postgresId}`)
            .then(response => {
                setReservations(response.data)
            })
            .catch(error => alert(error))
    },[])

    const renderItem = ({ item }) => {
        const realDate = new Date(Date.parse(item.appointment)).toString();
        return (
            <View style={styles.item}>
                <Text style={styles.title}>{item.Restaurant.name}</Text>
                <Text style={styles.subtitle}>Fecha: {`${realDate.slice(4,15)}`}</Text>
                <Text style={styles.subtitle}>Hora: {`${realDate.slice(16,21)}`}</Text>
                <Text style={styles.subtitle}>Número de personas: {item.seats}</Text>
                <Text style={styles.subtitle}>Estado: {item.status}</Text>
            </View>
        )  
    }; 

    return (
        <SafeAreaView>
            <FlatList
                data={reservations}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 22
    },
    buttonContainer: {
        marginBottom: 4
    },
    header: {
        fontSize: 24,
        marginBottom: 2,
        fontWeight: "bold",
        marginLeft: 20
    },
    title: {
        fontSize: 18,
        marginBottom: 2,
        fontWeight: "bold"
    },
    subtitle: {
        fontSize: 12
    },
});
