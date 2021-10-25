import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, Button, TouchableOpacity } from 'react-native';

const DATA = [
    {
        id: "1",
        name: "Danil's Pizza",
        street: "Calle 1ra Norte",
        numExt: 10223,
        numInt: 2,
        colonia: "Centro",
        city: "Delicias",
        state: "Chihuahua"
    },
    {
        id: "2",
        name: "Pollos Hermanos",
        street: "Calle Libertad",
        numExt: 1021,
        numInt: 1,
        colonia: "Centro",
        city: "Chihuahua",
        state: "Chihuahua"
    },
    {
        id: "3",
        name: "Cindykery",
        street: "Calle Heroico Colegio Militar",
        numExt: 332,
        numInt: 1,
        colonia: "Vistas",
        city: "Chihuahua",
        state: "Chihuahua"
    },
    {
        id: "4",
        name: "The Moon Warriors",
        street: "Ave. Garza",
        numExt: 96210,
        numInt: 5,
        colonia: "Sur",
        city: "Chihuahua",
        state: "Chihuahua"
    },
]

const Item = ({ name, street, numExt }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.subtitle}>{street} #{numExt}</Text>
    </View>
  );

export default function Restaurants({navigation}) {
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate("Detalles", {
                    restaurante: item
                })
            }}>
                <View style={styles.item}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.subtitle}>{item.street} #{item.numExt}</Text>
                </View>
            </TouchableOpacity>
            )  
    }; 
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        alert("actualizando")
                    }}
                    title="Actualizar"
                    color="green"
                    accessibilityLabel="Actualizar"
                />
            </View>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: StatusBar.currentHeight || 0,
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
    buttonContainer: {
        marginBottom: 4
    },
    header: {
        fontSize: 24,
        marginBottom: 2,
        fontWeight: "bold",
        marginLeft: 20
    },
    title: {
        fontSize: 18,
        marginBottom: 2,
        fontWeight: "bold"
    },
    subtitle: {
        fontSize: 12
    }

});
