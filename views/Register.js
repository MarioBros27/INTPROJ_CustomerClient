import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, ScrollView } from 'react-native';

export default function Register() {

    const [ email, setEmail ] = React.useState("");
    const [ surname, setSurname ] = React.useState("");
    const [ names, setNames ] = React.useState("");

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.label}>Nombre(s)</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setNames}
                    value={names}
                />
                <Text style={styles.label}>Apellidos</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setSurname}
                    value={surname}
                />
                <Text style={styles.label}>Correo electrónico</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                />
                <Button
                    onPress={() => {}}
                    title="Registrarse"
                    color="green"
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    label: {
        fontWeight: "bold"
    },
    input: {
        width: "100%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#fff"
    },
});
