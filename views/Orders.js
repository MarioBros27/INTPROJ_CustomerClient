import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, Button, Switch, TouchableOpacity } from 'react-native';
import axios from 'axios';


const appSettings = require('../app-settings.json');

export default function Reservaciones({navigation, user}) {

    const [orders, setOrders] = useState([])
    const [status, setStatus] = useState(false)
    const toggleSwitch = () => setStatus(!status)


    useEffect(() => {
        axios.get(`${appSettings['backend-host']}/bills?customerId=${user.postgresId}&isDone=${status}`)
            .then(response => {
                setOrders(response.data)
            })
            .catch(error => alert(error))
    }, [status])

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate("DetallesOrdenes", {
                    order: item
                })
            }}>
                <View style={styles.item}>
                    <Text style={styles.title}>{item.Restaurant.name}</Text>
                    <Text style={styles.subtitle}>Fecha y hora de apertura: {`${item.checkIn.slice(8,10)}/${item.checkIn.slice(5,7)}/${item.checkIn.slice(0,4)} ${item.checkIn.slice(11,16)}`}</Text>
                </View>
            </TouchableOpacity>
            )
    }; 
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <Text>Finished orders:</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={status ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={status}
                />
                <Button
                    onPress={() => {
                        alert("actualizando")
                    }}
                    title="Actualizar"
                    color="green"
                    accessibilityLabel="Actualizar"
                />
            </View>
            <FlatList
                data={orders}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
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
    }

});
