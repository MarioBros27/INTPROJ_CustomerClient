import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Button, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import logo from '../assets/logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const appSettings = require('../app-settings.json');


export default function Reservations({navigation, route, user}) {
    const { restaurante } = route.params;

    const [status, setStatus] = useState("Creando");
    const [seats, setSeats] = useState(null);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [reservationDate, setReservationDate] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        setTimeout(async () => {

            try {
                let tokenT = await AsyncStorage.getItem('token');
                setId(tokenT)
            } catch (e) {
                console.log(e);
            }
        }, 0)
    }, [])


    const createReservation = () => {
        axios.post(`${appSettings['backend-host']}/reservations`, {
            restaurantId: restaurante.id,
            customerId: user.postgresId,
            appointment: Date.parse(reservationDate),
            seats: seats
        })
            .then(_ => alert('La reservación fue creada con éxito'))
            .catch(error => {
                console.log(error)
                alert(error)
            })
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        let tempDate = new Date(currentDate);
        let hour = tempDate.getHours();
        let minutes = tempDate.getMinutes();
        if(hour < 10){
            hour = '0' + hour;
        }
        if(minutes < 10){
            minutes = '0' + minutes;
        }
        setReservationDate(tempDate.toString());
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode)
    }

     return (

        <View style={styles.container}>
            <Text style={styles.titleText}>
                restaurant.name
            </Text>
            <Image
                style={styles.stretch}
                source={logo}
            />
            <Text>Reservar a nombre de {user.username}</Text>
            <Text>No. de personas: {seats}</Text>
            <TextInput
                style={styles.input}
                onChangeText={setSeats}
                value={seats}
                placeholder="No. de personas"
                keyboardType="numeric"
            />
            <Text>Estado de la reservación: {status}</Text>
            <Text>{reservationDate}</Text>
            <View style ={{margin:20}}>
                <Button title='Fecha de la reservación' onPress={() => showMode('date')}/>
            </View>
            <View style ={{margin:20}}>
                <Button title='Hora de la reservación' onPress={() => showMode('time')}/>
            </View>
            <View style ={{margin:20}}>
                <Button title='Reservar' onPress={() => createReservation() } />
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
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    stretch: {
        marginTop: '10%',
        marginBottom: '10%',
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
});
