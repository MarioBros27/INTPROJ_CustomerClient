import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const appSettings = require('../app-settings.json');

export default function Reservations({route, user}) {
    const { restaurante } = route.params;

    const [seats, setSeats] = useState(null);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [reservationDate, setReservationDate] = useState('2021/01/01 00:00');


    const createReservation = () => {
        axios.post(`${appSettings['backend-host']}/reservations`, {
            restaurantId: restaurante.id,
            customerId: user.postgresId,
            appointment: reservationDate,
            seats: seats
        })
            .then(_ => alert('La reservación fue creada con éxito'))
            .catch(error => {
                alert(error)
            })
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        let tempDate = new Date(currentDate);
        let fDate = tempDate.getFullYear() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getDate();
        let hour = tempDate.getHours();
        let minutes = tempDate.getMinutes();
        if(hour < 10){
            hour = '0' + hour;
        }
        if(minutes < 10){
            minutes = '0' + minutes;
        }
        let fTime = hour + ':' + minutes;
        setReservationDate(fDate + ' ' + fTime);
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode)
    }

     return (

        <View style={styles.container}>
            <Text style={styles.titleText}>
                {restaurante.name}
            </Text>
            <View style={styles.rowContainer}>
                <MaterialIcons style={styles.icon} name="person" color={"#FF5768"} size={20} />
                <Text style={styles.subtitle}>{user.username} <Text style={{ fontWeight: "bold" }}> (Encargado)</Text></Text>
            </View>
            <View style={styles.rowContainer}>
                <View style={styles.leftContainer}>
                    <View style={styles.rowContainer}>
                        <MaterialIcons style={styles.icon} name="event" color={"#FF5768"} size={20} />
                        <Text style={styles.subtitle}>{new Date(Date.parse(reservationDate)).toString().slice(4, 21)}</Text>
                    </View>
                </View>
                <View style={styles.rightContainer}>
                    <Pressable
                        onPress={() => showMode('date')}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Editar fecha</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.rowContainer}>
                <View style={styles.leftContainer}>
                    <View style={styles.rowContainer}>
                        <MaterialIcons style={styles.icon} name="group" color={"#FF5768"} size={20} />
                        <TextInput
                            style={styles.input}
                            onChangeText={setSeats}
                            value={seats}
                            placeholder="No. de personas"
                            keyboardType="numeric"
                        />
                    </View>
                </View>
                <View style={styles.rightContainer}>
                    <Pressable
                        onPress={() => showMode('time')}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}> Editar hora </Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable 
                    style={styles.mainButton}
                    onPress={() => createReservation()}
                >
                    <Text style={styles.buttonText}>Reservar</Text>
                </Pressable>
            </View>
            {show && (
                <DateTimePicker
                testID='dateTimePicker'
                value={date}
                mode={mode}
                is24Hour={true}
                display='default'
                onChange={onChange}   
            />)}
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },

    titleText: {
        fontSize: 24,
        marginBottom: 10,
        fontWeight: "bold",
    },

    subtitle: {
        fontSize: 18,
        marginBottom: 2,
    },

    icon: {
        marginRight: 5,
        marginTop: 2
    }, 

    rowContainer: {
        flexDirection: 'row',
        marginBottom: 3,
    },

    leftContainer: {
        width: '65%',
        marginRight: '5%',
        alignItems: 'flex-start'
    },

    rightContainer: {
        alignItems: 'flex-end'
    }, 

    buttonContainer: {
        alignItems: 'center'
    },

    button: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
        backgroundColor: '#af0202',
    },

    mainButton: {
        marginTop: 15,
        width: '50%',
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 10,
        backgroundColor: '#FF5768',
        borderWidth: 2,
        borderColor: '#FF5768'
    },

    buttonText: {
        color: '#fff',
        textAlign: 'center'
    },

    input: {
        width: '75%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FF5768',
        paddingVertical: 2,
        paddingHorizontal: 10,
        color: '#FF5768'
    }
});