import React from 'react';
import { StyleSheet, View, Button, TextInput, Image } from 'react-native';
import logo from '../assets/logo.png'
import { AuthContext } from '../context'
import axios from 'axios'

const appSettings = require('../app-settings.json');

export default function LogIn({ navigation }) {
    const [ email, setEmail ] = React.useState("");
    const [ password, setPassword ] = React.useState("");
    const [ disableButton, setDisableButton ] = React.useState(false)

    const { logIn } = React.useContext(AuthContext);

    const handleLogin = () => {
        if (email.length == 0  || password.length == 0) {
            alert("No has completado todos los campos")
            return;
        }
        setDisableButton(true)
        const params = {
            "email": email,
            "password": password,
            "returnSecureToken": true
        }
        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDesU1w8wTTq4ErpwucFt4xrAOHzZH0djI", params)
            .then(function (response) {
                let token = response.data['localId']

                axios.get(`${appSettings['backend-host']}/customers/externalId/${token}`)
                    .then(response => {
                        let postgresId = response["data"]["id"]
                        let username = response["data"]["firstName"] + " " + response["data"]["lastName"]
                        logIn(token, postgresId, username)
                    })
                    .catch(error => {
                        setDisableButton(false)
                        alert(`There was an error logging in. Error details: ${error}`)
                    })

            })
            .catch(function (error) {
                setDisableButton(false)
                if (error) {
                    let code = error.response.data.error.code
                    if (code == 400) {
                        alert("El usuario y la contraseña no coinciden")
                    } else {
                        alert("Error, intentelo otra vez")
                    }
                }

            })
    }

    return (
        <View style={styles.container}>
            <Image style={styles.stretch} source={logo} />
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                secureTextEntry={true}
            />
            <View style={styles.buttonLogIn}>
                <Button
                    onPress={() => { handleLogin() }}
                    title="Log In"
                    color="#fc6c27"
                    accessibilityLabel="Log In"
                    disabled={disableButton}
                />
            </View>
            <View style={styles.buttonCreate}>
                <Button
                    onPress={() => {
                        navigation.navigate('SignUp')
                    }}
                    title="Crear cuenta"
                    color="#000"
                    accessibilityLabel="Crear cuenta"
                    disabled={disableButton}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    title: {
        marginBottom: "20%",
        fontFamily: "Menlo",
        fontSize: 200
    },
    stretch: {
        marginTop: '10%',
        marginBottom: '10%',
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    buttonLogIn: {
        width: "60%",
        marginTop: 40
    },
    buttonCreate: {
        width: "60%",
        marginTop: 20
    },
    input: {
        width: "100%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#fff"
    },
});
