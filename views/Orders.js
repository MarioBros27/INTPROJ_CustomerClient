import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, Pressable, TouchableOpacity } from 'react-native';
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
                    <View style={styles.rowContainer}>
                        <View style={[styles.leftContainer, { width: '65%', marginRight: '5%' }]}>
                            <Text style={styles.title}>{item.Restaurant.name}</Text>
                        </View>
                        <View style={styles.rightContainer}>
                            { item.done && 
                                <Text style={ styles.done }>Pagada</Text>
                            }
                            { !item.done && 
                                <Text style={ styles.pending }>Pendiente</Text>
                            }
                        </View>
                    </View>
                    <Text style={styles.subtitle}><Text style={{ fontWeight: 'bold' }}>Fecha y hora: </Text>{`${realDate.slice(4,21)}`}</Text>
                </View>
            </TouchableOpacity>
            )
    }; 

    return (
        <SafeAreaView>
            <View style={styles.buttonContainer}>
                <Pressable
                    onPress={() => {
                        toggleSwitch()
                    }}
                    style={styles.button}
                    accessibilityLabel="Actualizar"
                >
                    <Text style={{ color: '#fff' }}>Filtrar por otro estado</Text>
                </Pressable>
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
    item: {
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        borderLeftColor: "#EEAE54",
        borderLeftWidth: 3,
        marginTop: 15,
        marginBottom: 10,
        marginHorizontal: 16,
        borderRadius: 10
    },

    pending: {
        padding: 5,
        marginLeft: 5,
        borderRadius: 5,
        backgroundColor: "#FBA490",
        color: "#B83253"
    },

    done: {
        padding: 5,
        marginLeft: 5,
        borderRadius: 5,
        backgroundColor: "#9DD7BF",
        color: "#315e26"
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

    buttonContainer: {
        alignItems: 'flex-end',
        marginRight: 16
    },

    button: {
        marginTop: 10,
        backgroundColor: "#EEAE54",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15
    }
});
