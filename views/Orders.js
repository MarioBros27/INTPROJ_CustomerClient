import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';


const appSettings = require('../app-settings.json');

export default function Reservaciones({navigation, user}) {

    const [ orders, setOrders ] = useState([]);
    const [ status, setStatus ] = useState(false);
    const toggleSwitch = () => setStatus(!status);

    useEffect(() => {
        axios.get(`${appSettings['backend-host']}/bills?customerId=${user.postgresId}&isDone=${status}`)
            .then(response => {
                setOrders(response.data)
            })
            .catch(error => alert(error))
    }, [status])

    const renderItem = ({ item }) => {
        const realDate = new Date(Date.parse(item.checkIn)).toString();
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate("DetallesOrdenes", {
                    order: item
                })
            }}>
                <View style={styles.item}>
                    <Text style={styles.title}>{item.Restaurant.name}</Text>
                    <Text style={styles.subtitle}>Fecha y hora: {`${realDate.slice(4,21)}`}</Text>
                </View>
            </TouchableOpacity>
            )
    }; 

    return (
        <SafeAreaView style={styles.container}>
            <Text>{ status && "Ordenes finalizadas" }</Text>
            <Text>{ !status && "Ordenes no finalizadas" }</Text>
            <FlatList
                data={orders}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        toggleSwitch()
                    }}
                    title = {"Filter by another status"}
                    color="green"
                    accessibilityLabel="Actualizar"
                />
            </View>
        </SafeAreaView>
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
