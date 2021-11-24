import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function RestaurantDetails({ navigation, route }) {
    
    const { restaurante } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <Text style={styles.title}>{restaurante.name}</Text>
                <View style={styles.rowContainer}>
                    <MaterialIcons style={styles.icon} name="description" color={"#FF5768"} size={20} />
                    <Text style={styles.subtitle}>{restaurante.description}</Text>
                </View>
                <View style={styles.rowContainer}>
                    <MaterialIcons style={styles.icon} name="groups" color={"#FF5768"} size={20} />
                    <Text style={styles.subtitle}>{restaurante.totalCapacity} personas</Text>
                </View>
                <View style={styles.rowContainer}>
                    <MaterialIcons style={styles.icon} name="place" color={"#FF5768"} size={20} />
                    <Text style={styles.subtitle}>{restaurante.street} #{restaurante.externalNumber}, {restaurante.suburb}</Text>
                </View>
                <View style={styles.rowContainer}>
                    <MaterialIcons style={styles.icon} name="apartment" color={"#FF5768"} size={20} />
                    <Text style={styles.subtitle}>{restaurante.city}, {restaurante.state}</Text>
                </View>
                { restaurante.phone1 != null && restaurante.phone1 != "" &&
                    <View style={styles.rowContainer}>
                        <MaterialIcons style={styles.icon} name="call" color={"#FF5768"} size={20} />
                        <Text style={styles.subtitle}>{restaurante.phone1}</Text>
                    </View>
                }
                { restaurante.phone2 != null && restaurante.phone2 != "" &&
                    <View style={styles.rowContainer}>
                        <MaterialIcons style={styles.icon} name="call" color={"#FF5768"} size={20} />
                        <Text style={styles.subtitle}>{restaurante.phone2}</Text>
                    </View>
                }
            </View>
            <View style={styles.rowContainer}>
                <View style={[styles.leftContainer]}>
                    <Pressable
                        onPress={() => {
                            navigation.navigate("Menu", {
                                restaurante: restaurante
                            })
                        }}
                        style={[styles.buttonContainer, styles.secondaryButton]}
                        accessibilityLabel="Menú"
                    >
                        <Text style={{textAlign: 'center', color: '#FF5768'}}>Ver menú</Text>
                    </Pressable>
                </View>
                <View style={styles.rightContainer}>
                    <Pressable
                        onPress={() => {
                            navigation.navigate("Reservar", {
                                restaurante: restaurante
                            })
                        }}
                        style={[styles.buttonContainer, styles.primaryButton]}
                        accessibilityLabel="Reservar"
                    >
                        <Text style={{textAlign: 'center', color: "#fff"}}>Reservar</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        margin: 20
    },

    title: {
        fontSize: 24,
        marginBottom: 10,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 2,
    },

    item: {
        marginBottom: 10
    },

    rowContainer: {
        flexDirection: 'row',
        marginBottom: 3,
    },

    leftContainer: {
        width: '47%',
        marginRight: '6%',
        alignItems: 'flex-start'
    },

    rightContainer: {
        width: '47%',
        alignItems: 'flex-end'
    }, 

    icon: {
        marginRight: 5,
        marginTop: 2
    }, 

    buttonContainer: {
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 10,
        width: '100%',
    },
    
    secondaryButton: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#FF5768'
    },

    primaryButton: {
        backgroundColor: '#FF5768',
        borderWidth: 2,
        borderColor: '#FF5768'
    }
});