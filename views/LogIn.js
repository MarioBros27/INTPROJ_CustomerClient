import React from 'react';
import { StyleSheet, View, Button, TextInput, Image } from 'react-native';
import logo from '../assets/logo.png'

export default function LogIn({navigation}) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    return (

        <View style={styles.container}>
            <Image style={styles.stretch} source={logo} />

            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
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
                    onPress={() => { }}
                    title="Log In"
                    color="#fc6c27"
                    accessibilityLabel="Log In"
                />
            </View>
            <View style={styles.buttonCreate}>
                <Button
                    onPress={() => navigation.navigate('SignUp')}
                    title="Crear cuenta"
                    color="#000"
                    accessibilityLabel="Crear cuenta"
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
