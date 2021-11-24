import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Pressable, TextInput } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const appSettings = require('../app-settings.json');

export default function OrderDetails({ navigation, route, user }) {
    const { order } = route.params;
    const [ tip, setTip ] = useState(0);
    const [ subtotal, setSubtotal ] = useState(0);
    
    const updateTip = (() => {
        axios.put(`${appSettings['backend-host']}/bills/${order.id}`,{
            tip: tip
        })
        .then(alert("Se actualizó la propina"))
        .catch(error => alert("Hubo un error al actualizar la propina"))
    })
    useEffect(() => {
        let total = 0;
        
        order.Items.forEach(item => {
            total = total + (item.price * item.ItemBill.quantity)
        })
        
        setSubtotal(total)
    }, [])
    
    const createPaymentIntent = () => {
        axios.put(`${appSettings['backend-host']}/bills/${order.id}/calculateTotal`)
        .then(_ => {
            axios.post(`${appSettings['backend-host']}/processPayment?billId=${order.id}&restaurantId=${order.restaurantId}`)
            .then(response => {
                navigation.navigate("PagoOrden", {
                    clientSecret: response.data.client_secret,
                    order: order,
                    total: subtotal + order.tip
                })
            })
            .catch(_ => alert('No fue posible generar el intento de pago'))
        })
        .catch(_ => alert('No fue posible procesar el total de la orden'))
    }
    
    const renderItem = ({ item }) => {
        return (
            <View style={styles.item}>
                <View style={styles.rowContainer}>
                    <View style={[styles.leftContainer, { width: '65%', marginRight: '5%'}]}>
                        <Text style={styles.plateTitle}>{item.ItemBill.quantity} - {item.name}</Text>
                    </View>
                    <View style={[styles.rightContainer, { width: '30%'}]}>
                        <Text style={styles.priceText}>${item.price}</Text>
                    </View>
                </View>
            </View>
            )
        }; 
        
        const realDate = new Date(Date.parse(order.checkIn)).toString();
        
        return (
            <View style={styles.container}>
                <View style={[styles.rowContainer, { marginBottom: 0 } ]}>
                    <View style={[styles.rightContainer, { width: '100%' }]}>
                        <View style={[ styles.rowContainer, { marginBottom: 0 } ]}>
                            { (order.Restaurant.accountId != "" && order.Restaurant.accountId != null && !order.done) &&
                                <View style={styles.buttonContainer}>
                                    <Pressable
                                        onPress={() => {
                                            createPaymentIntent()
                                        }}
                                        style={[ styles.button, styles.secondaryButton ]}
                                        accessibilityLabel="DetallesOrdenes"
                                    >
                                        <Text style={[ styles.buttonText, { color: '#00CDAC'} ]}>Proceder al pago</Text>
                                    </Pressable>  
                                </View>
                            }

                            { !order.done && 
                                <View style={styles.buttonContainer}>
                                    <Pressable
                                        onPress={() => {
                                            navigation.navigate("Agregar", {
                                                order: order
                                            })
                                        }}
                                        style={[ styles.button, styles.primaryButton, { marginLeft: "5%" }]}
                                        accessibilityLabel="Agregar Productos"
                                    >
                                        <Text style={[ styles.buttonText, { color: '#fff' } ]}>Agregar productos</Text>
                                    </Pressable>
                                </View>
                            }
                        </View>
                    </View>
                </View>
                <Text style={{ fontSize: 24, marginBottom: 10, fontWeight: "bold" }}>
                    {order.Restaurant.name}
                </Text>
                
                <View style={styles.rowContainer}>
                    <MaterialIcons style={styles.icon} name="event" color={"#00CDAC"} size={20} />
                    <Text style={styles.subtitle}><Text style={{ fontWeight: 'bold' }}>Fecha y hora: </Text>{`${realDate.slice(4,21)}`}</Text>
                </View>

                <View style={styles.rowContainer}>
                    <MaterialIcons style={styles.icon} name="bento" color={"#00CDAC"} size={20} />
                    <Text style={styles.subtitle}><Text style={{ fontWeight: 'bold' }}>Número de mesa: </Text> {order.tableNumber}</Text>
                </View>

                <View style={styles.rowContainer}>
                    <MaterialIcons style={styles.icon} name="money" color={"#00CDAC"} size={20} />
                    <Text style={styles.subtitle}><Text style={{ fontWeight: 'bold' }}>Subtotal: </Text> ${subtotal}</Text>
                </View>

                <View style={styles.rowContainer}>
                    <MaterialIcons style={styles.icon} name="redeem" color={"#00CDAC"} size={20} />
                    <Text style={styles.subtitle}><Text style={{ fontWeight: 'bold' }}>Propina: </Text>${order.tip}</Text>
                </View>

                { !order.done && 
                    <View style={styles.rowContainer}>
                        <View style={styles.rowContainer}>
                            <TextInput
                                style={[styles.input, { width: '50%', marginRight: "3%" }]}
                                onChangeText={setTip}
                                placeholder={"Editar propina"}
                                placeholderTextColor="#00CDAC"
                                keyboardType="numeric"
                                />
                            <Pressable
                                onPress={() => {
                                    updateTip()
                                }}
                                style={[ styles.button, styles.primaryButton, { width: '35%'} ]}
                                accessibilityLabel="Ingresar Propina"
                                >
                                <Text style={{ textAlign: 'center', color: '#fff' }}>Actualizar</Text>    
                            </Pressable>
                        </View>
                    </View>
                }

                <View style={styles.rowContainer}>
                    <MaterialIcons style={styles.icon} name="payments" color={"#00CDAC"} size={20} />
                    <Text style={styles.subtitle}><Text style={{ fontWeight: 'bold' }}>Total: </Text>${ subtotal + order.tip}</Text>
                </View>

                <View style={styles.rowContainer}>
                    <MaterialIcons style={styles.icon} name="list" color={"#00CDAC"} size={20} />
                    <Text style={styles.subtitle}><Text style={{ fontWeight: 'bold' }}>Lista de productos: </Text></Text>
                </View>
                
                <FlatList
                    data={order.Items}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    
    rowContainer: {
        flexDirection: 'row',
        marginBottom: 3,
    },
    
    leftContainer: {
        alignItems: 'flex-start'
    },
    
    rightContainer: {
        alignItems: 'flex-end'
    }, 
    
    icon: {
        marginRight: 5,
        marginTop: 2
    }, 
    
    item: {
        paddingBottom: 5,
        marginVertical: 5,
        marginLeft: 15,
        borderBottomWidth: 1,
        borderColor: "#ccc",
    },

    plateTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },

    priceText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#00CDAC"
    },

    subtitle: {
        fontSize: 18,
        marginBottom: 2,
    },

    input: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#00CDAC',
        paddingHorizontal: 10,
        backgroundColor: "#fff"
    },

    button: {
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 10,
        width: '100%',
    },
    
    secondaryButton: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#00CDAC'
    },

    primaryButton: {
        backgroundColor: '#00CDAC',
        borderWidth: 2,
        borderColor: '#00CDAC'
    },

    buttonText: {
        textAlign: 'center'
    }
});