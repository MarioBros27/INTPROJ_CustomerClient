import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';


const appSettings = require('../app-settings.json');

export default function Reservaciones({navigation, user}) {

    const [reservations, setReservations] = useState([])

    useEffect(() => {
        axios.get(`${appSettings['backend-host']}/reservations?customerId=${user.postgresId}`)
            .then(response => {
                setReservations(response.data)
            })
            .catch(error => alert(error))
    },[])

    const renderItem = ({ item }) => {
        return (
                <View style={styles.item}>
                    <Text style={styles.title}>{item.Restaurant.name}</Text>
                    <Text style={styles.subtitle}>Fecha: {`${item.appointment.slice(8,10)}/${item.appointment.slice(5,7)}/${item.appointment.slice(0,4)}`}</Text>
                    <Text style={styles.subtitle}>Hora: {`${item.appointment.slice(11,16)}`}</Text>
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
    }

});
