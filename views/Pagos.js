import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, StatusBar, Button, TouchableOpacity, SectionList } from 'react-native';

const appSettings = require('../app-settings.json');

export default function Pagos({ navigation, user }) {

    const [payments, setPayments] = useState([])

    useEffect(() => {
        axios.get(`${appSettings['backend-host']}/payments?customerId=${user.postgresId}`)
            .then(response => {
                setPayments(response.data)
            })
            .catch(error => alert(`There was an error retrieving the user payments. Error details ${error}`))
    }, [])
    
    const renderItem = ({ item }) => {

        return(
            <TouchableOpacity onPress={() => {
                navigation.navigate("Pago", {
                    item: item
                })
            }}>
                <View style={styles.item}>
                    <Text style={styles.title}>{item.Bill.Restaurant.name} - {`${item.paymentDate.slice(8,10)}/${item.paymentDate.slice(5,7)}/${item.paymentDate.slice(0,4)} ${item.paymentDate.slice(11,16)}`}</Text>
                    <Text style={styles.subtitle}>${item.Bill.total}</Text>
                    <Text style={styles.subtitle}>Reference number: {item.referenceId}</Text>
    
                </View>
            </TouchableOpacity>
        )
        

    };

    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
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
                data={payments}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: StatusBar.currentHeight || 0,
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
    subtite: {
        fontSize: 12
    }

});
