import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, ScrollView } from 'react-native';

export default function Payment({ navigation }) {
    const [month, setMonth] = React.useState("")
    const [year, setYear] = React.useState("")
    const [cvv, setCVV] = React.useState("")
    const [number, setNumber] = React.useState("")
    const [names, setNames] = React.useState("")
    const [tip, setTip] = React.useState("")

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.label}>Total: $240</Text>
                <View style={styles.rowContainer}>
                    <Text style={styles.label}>Propina:</Text>
                    <TextInput
                        style={styles.smallerInput}
                        onChangeText={setTip}
                        value={tip}
                        keyboardType="numeric"
                    />
                </View>
                <Text style={styles.label}>Final: $240</Text>
                <Text style={styles.strongLabel}>Nombre como en la tarjeta</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setNames}
                    value={names}
                />
                <Text style={styles.strongLabel}>Número de tarjeta</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setNumber}
                    value={number}
                    keyboardType="numeric"
                />
                <View style={styles.rowContainer}>
                    <TextInput
                        style={styles.smallInput}
                        onChangeText={setMonth}
                        value={month}
                        keyboardType="numeric"
                        placeholder="Mes"
                    />
                    <TextInput
                        style={styles.smallInput}
                        onChangeText={setYear}
                        value={year}
                        keyboardType="numeric"
                        placeholder="Año"
                    />
                    <TextInput
                        style={styles.smallInput}
                        onChangeText={setCVV}
                        value={cvv}
                        keyboardType="numeric"
                        placeholder="CVV"
                    />

                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => {

                        }}
                        title="Pagar"
                        color="green"
                    />
                </View>
            </View>
        </ScrollView>
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
    rowContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    strongLabel: {
        fontWeight: "bold"
    },
    input: {
        width: "100%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#fff"
    },
    smallInput: {
        width: "30%",
        margin: 8,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#fff"
    },
    smallerInput: {
        width: "20%",
        margin: 8,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#fff"
    },
    label: {
        marginBottom: 14,
        fontSize: 24
    },
    buttonContainer: {
        marginTop: 20
    }

});
