import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, ScrollView } from 'react-native';

export default function Payment({ navigation }) {

    const [ tip, setTip ] = React.useState("");

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
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => {
                            navigation.navigate("PagarStripe")
                        }}
                        title="Pagar en línea con tarjeta"
                        color="purple"
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
    },
});
