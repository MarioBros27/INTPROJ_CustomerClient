import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const appSettings = require('../app-settings.json');

export default function Restaurants({ navigation }) {

    const [ restaurants, setRestaurants ] = useState([]);

    useEffect(() => {
        axios.get(`${appSettings['backend-host']}/restaurants`)
            .then(response => {
                setRestaurants(response.data)
            })
            .catch(error => alert(error))
    },[])

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate("Detalles", {
                    restaurante: item
                })
            }}>
                <View style={styles.item}>
                    <View style={styles.rowContainer}>
                        <View style={[styles.leftContainer, { width: '85%' }]}>
                            <Text style={styles.title}>{item.name}</Text>
                        </View>
                        <View style={styles.rightContainer}>
                            { item.accountId != null && item.accountId != "" && 
                                <MaterialIcons name="star" color={"#FFD872"} size={25} />
                            }
                        </View>
                    </View>
                    <Text style={styles.subtitle}>{item.street} #{item.externalNumber}, {item.suburb}</Text>
                </View>
            </TouchableOpacity>
            )  
    }; 
    return (
        <SafeAreaView>
            <FlatList
                data={restaurants}
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
        borderLeftColor: '#FF96C5',
        borderLeftWidth: 3,
        marginTop: 15,
        marginHorizontal: 16,
        borderRadius: 10
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
