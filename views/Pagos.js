import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, StatusBar, Button, TouchableOpacity, SectionList } from 'react-native';
const DATA = [

    {
        title: "Pendientes:",
        data: [{
            id: "1",
            status: "pendiente",
            restaurante: "Pollos hermanos",
            fecha: "12-12-2021",
            hora: "14:30",
            total: "24000",
            propina: "20",
            referencia: "askjhkjh1-qsasaas-assaas-as"
        }]
    },
    {
        title: "Realizados:",
        data: [{
            id: "2",
            status: "pendiente",
            restaurante: "Pollos hermanos",
            fecha: "12-12-2021",
            hora: "14:30",
            total: "24000",
            propina: "20",
            referencia: "askjhkjh1-qsasaas-assaas-as"
        },
        {
            id: "3",
            status: "pendiente",
            restaurante: "Pollos hermanos",
            fecha: "12-12-2021",
            hora: "14:30",
            total: "24000",
            propina: "20",
            referencia: "askjhkjh1-qsasaas-assaas-as"
        },
        {
            id: "4",
            status: "pendiente",
            restaurante: "Pollos hermanos",
            fecha: "12-12-2021",
            hora: "14:30",
            total: "24000",
            propina: "20",
            referencia: "askjhkjh1-qsasaas-assaas-as"
        }]
    }

]


export default function Pagos({ navigation }) {
    
    const Item = ({ item }) => {

        if (item.status == "pendiente") {
            return (
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Pago", {
                        item: item
                    })
                }}>
                    <View style={styles.item}>
                        <Text style={styles.title}>{item.restaurante}</Text>
                        <Text style={styles.subtitle}>${item.total}</Text>
                        
                    </View>
                </TouchableOpacity>
            )
        } else {
            return(
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Pago", {
                        item: item
                    })
                }}>
                    <View style={styles.item}>
                        <Text style={styles.title}>{item.restaurante}</Text>
                        <Text style={styles.subtitle}>${item.total}</Text>
                        <Text style={styles.subtitle}>{item.fecha}</Text>
                        <Text style={styles.subtitle}>{item.hora}</Text>
        
                    </View>
                </TouchableOpacity>
            )
        }
        

    };

    const renderItem = ({ section,item }) => {
   
        if (section.title == "Pendientes:") {
            return (
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Pagar", {
                        bill: item
                    })
                }}>
                    <View style={styles.item}>
                        <Text style={styles.title}>{item.restaurante}</Text>
                        <Text style={styles.subtitle}>${item.total}</Text>
                        
                    </View>
                </TouchableOpacity>
            )
        } else {
            return(
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Pago", {
                        bill: item
                    })
                }}>
                    <View style={styles.item}>
                        <Text style={styles.title}>{item.restaurante}</Text>
                        <Text style={styles.subtitle}>${item.total}</Text>
                        <Text style={styles.subtitle}>Fecha: {item.fecha}</Text>
                        <Text style={styles.subtitle}>Hora: {item.hora}</Text>
        
                    </View>
                </TouchableOpacity>
            )
        }
        
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
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
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
    subtite: {
        fontSize: 12
    }

});
