import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';

const appSettings = require('../app-settings.json');

export default function Pagos({ navigation, user }) {

    const [ payments, setPayments ] = useState([]);

    useEffect(() => {
        axios.get(`${appSettings['backend-host']}/payments?customerId=${user.postgresId}`)
            .then(response => {
                setPayments(response.data)
            })
            .catch(error => alert(`There was an error retrieving the user payments. Error details ${error}`))
    }, [])
    
    const renderItem = ({ item }) => {

        return(
            <View style={styles.item}>
                <View style={styles.rowContainer}>
                    <View style={[styles.leftContainer, { width: '60%' }]}>
                        <Text style={styles.title}>{item.Bill.Restaurant.name}</Text>
                    </View>
                    <View style={[styles.rightContainer, { width: '30%' } ]}>
                        <Text style={styles.price}>${item.Bill.total}</Text>
                    </View>
                </View>
                <Text style={styles.subtitle}><Text style={{fontWeight: 'bold'}}>Fecha y hora:</Text> {new Date(Date.parse(item.paymentDate)).toString().slice(4,21)}</Text>
                <Text style={styles.subtitle}><Text style={{fontWeight: 'bold'}}>Referencia:</Text> {item.referenceId} </Text>
            </View>
        )
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={payments}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        borderLeftColor: '#FF6F68',
        borderLeftWidth: 3,
        marginTop: 15,
        marginBottom: 10,
        marginHorizontal: 16,
        borderRadius: 10
    },

    price: {
        padding: 5,
        marginLeft: 5,
        borderRadius: 5,
        backgroundColor: "#8DD7BF",
        color: "#476930",
        fontWeight: 'bold'
    },

    title: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: "bold"
    },

    subtitle: {
        fontSize: 14
    },
    
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 3
    },

    leftContainer: {
        alignItems: 'flex-start'
    },

    rightContainer: {
        alignItems: 'flex-end',
        marginRight: 15
    }, 
});
