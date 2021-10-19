import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Button, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import logo from '../assets/logo.png';

export default function Reservations({navigation}) {
    const [titleText, setTitleText] = useState("Danil's Pizza");
    const [username, setUsername] = useState("Daniel Nunez");
    const [status, setStatus] = useState("In Process");
    const [seats, setSeats] = useState(null);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [reservationDate, setReservationDate] = useState('Empty');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
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
                {titleText}
                
            </Text>
            <Image
                style={styles.stretch}
                source={logo}
            />
            <Text>Reservar a nombre de {username}</Text>
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
                <Button title='Fecha' onPress={() => showMode('date')}/>
            </View>
            <View style ={{margin:20}}>
                <Button title='Hora' onPress={() => showMode('time')}/>
            </View>
            <View style ={{margin:20}}>
                <Button title='Reservar'/>
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
