import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, Pressable } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const appSettings = require('../app-settings.json');

export default function Reservaciones({ user}) {

    const [ reservations, setReservations ] = useState([]);
    const [ refresh, setRefresh ] = useState([]);

    useEffect(() => {
        axios.get(`${appSettings['backend-host']}/reservations?customerId=${user.postgresId}`)
            .then(response => {
                setReservations(response.data)
            })
            .catch(error => alert(error))
    },[refresh])

    const renderItem = ({ item }) => {
        const realDate = new Date(Date.parse(item.appointment)).toString();
        return (
            <View style={styles.item}>
                <View style={styles.rowContainer}>
                    <View style={[styles.leftContainer, {width: '60%'}]}>
                        <Text style={styles.title}>{item.Restaurant.name}</Text>
                    </View>
                    <View style={[styles.rightContainer, {width: '30%'}]}>
                        { item.status == 'waiting' && 
                            <Text style={styles.waitingReservation}>Pendiente</Text>
                        }
                        { item.status == 'canceled' && 
                            <Text style={styles.cancelledReservation}>Cancelada</Text>    
                        }
                        { item.status == 'accepted' &&
                            <Text style={styles.acceptedReservation}>Aceptada</Text>
                        }
                    </View>
                </View>
                <Text style={styles.subtitle}><Text style={{fontWeight: 'bold'}}>Fecha y hora:</Text> {`${realDate.slice(4,15)} ${realDate.slice(16,21)}`}</Text>
                <Text style={styles.subtitle}><Text style={{fontWeight: 'bold'}}>Número de personas:</Text> {item.seats}</Text>
            </View>
        )  
    }; 

    return (
        <SafeAreaView>
            <View style={{ marginTop: 15, marginRight: 15, alignItems: 'flex-end'}}>
                <Pressable
                    style={{ padding: 10, backgroundColor: '#00b0ba', borderRadius: 100}}
                    onPress={() => setRefresh(!refresh)}
                >
                    <MaterialIcons style={{color: '#fff'}} name="refresh" color={"#00CDAC"} size={20} />
                </Pressable>
            </View>
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
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        borderLeftColor: '#00b4d8',
        borderLeftWidth: 3,
        marginTop: 15,
        marginBottom: 10,
        marginHorizontal: 16,
        borderRadius: 10
    },

    waitingReservation: {
        padding: 5,
        marginLeft: 5,
        borderRadius: 5,
        backgroundColor: "#F8E473",
        color: "#C49102"
    },

    cancelledReservation: {
        padding: 5,
        marginLeft: 5,
        borderRadius: 5,
        backgroundColor: "#FBA490",
        color: "#B83253"
    },

    acceptedReservation: {
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
});
