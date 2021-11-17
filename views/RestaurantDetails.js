import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function RestaurantDetails({ navigation, route }) {
    
    const { restaurante } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{restaurante.name}</Text>
                <Text style={styles.subtitle}>{restaurante.description}</Text>
                <Text style={styles.subtitle}>Dirección: {restaurante.street} #{restaurante.externalNumber}, {restaurante.suburb}</Text>
                <Text style={styles.subtitle}>Ubicación: {restaurante.city}, {restaurante.state}</Text> 
                <Text style={styles.subtitle}>Capacidad: {restaurante.totalCapacity} personas</Text>
                { restaurante.phone1 != null &&
                    <Text style={styles.subtitle}>Teléfono: {restaurante.phone1}</Text>
                }
                { restaurante.phone2 != null &&
                    <Text style={styles.subtitle}>Teléfono: {restaurante.phone2}</Text>
                }
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        navigation.navigate("Menu", {
                            restaurante: restaurante
                        })
                    }}
                    title="Menú"
                    color="green"
                    accessibilityLabel="Menú"
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        navigation.navigate("Reservar", {
                            restaurante: restaurante
                        })
                    }}
                    title="Reservar"
                    color="blue"
                    accessibilityLabel="Reservar"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        padding: 20
    },
    item: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 22
    },
    infoContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 22
    },
    buttonContainer: {
        marginTop: 10,
        marginBottom: 10
    },
    header: {
        fontSize: 24,
        marginBottom: 2,
        fontWeight: "bold",
        marginLeft: 20
    },
    title: {
        fontSize: 24,
        marginBottom: 2,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 2,
    },
});